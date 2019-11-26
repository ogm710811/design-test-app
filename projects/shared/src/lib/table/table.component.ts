import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import * as uuidNS from 'uuid';
import {
  ColumnSettings,
  InputColumnSettings,
  TableColumn,
  TableColumnKind
} from './table-column';
import {GridService} from '../grid/grid.service';
import {BadgeSettings} from '../fox-badge/fox-badge-models/badge-settings';
import {BadgeTemplates} from '../fox-badge/fox-badge-enums/badge-templates.enum';
import {BadgeColors} from '../fox-badge/fox-badge-enums/badge-colors.enum';
import {BadgeIcons} from '../fox-badge/fox-badge-enums/badge-icons.enum';
import {BadgeIconPositions} from '../fox-badge/fox-badge-enums/badge-icon-positions.enum';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {TooltipMenuSettings} from '../fox-tooltip/fox-tooltip-models/tooltip-menu-settings';

const uuid = uuidNS;

export interface TableRowSelection {
  isAll: boolean;
  isChecked: boolean;
  index?: number;
}

@Component({
  selector: 'fox-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css'],
  providers: [GridService]
})
export class TableComponent implements OnChanges, OnInit {
  @Input() tableClass: string = '';
  @Input() tableData: any[] = [];
  @Input() tableColumns: TableColumn[] = [];
  @Input() parentHeaderColumns: TableColumn[] = [];
  @Input() zebraCells: boolean = false;

  @Input() selectable: string | boolean = false;
  @Input() selectableRight: boolean = false;
  @Input() selectableRows: string = '';
  @Input() selectableRowsRight: string = '';
  @Input() isSelectDisabled: boolean = false;

  @Input() fixedFirstColumn: boolean = false;
  @Input() fixedSecondColumn: boolean = false;
  @Input() expandable: boolean = false;
  @Input() isRowExpandableKey: string = '';
  @Input() fixedTextAreaColumn: boolean = false;
  @Input() textAreaCharLimit: number = 0;
  @Input() fixedHeader: boolean = false;
  @Input() searchBar: boolean = false;
  @Input() narrow: boolean = false;
  @Input() noBottomMargin: boolean = false;

  @Input() pillOptions: string[] = [];
  @Input() dropdownFilterOptions: string[] = [];
  @Input() complexFilter: boolean = false;
  @Input() exportOptions: string[] = [];
  @Input() reducedSecondColumn = false;

  @Input() sortByColumn: string = '';
  @Input() direction: number = 0;

  @Input() baseTableId = 'baseTableId';
  @Input() selectedKeepHeader = false;
  @Input() hasDoubleLineHeader = false;
  @Input() hasFreezeColumnSelect = false;
  @Input() disabledIndexes: number[] = [];
  @Input() isParentHeader = false;
  @Input() isWhiteSpaceWrap = false;

  @Input() emptyStateImage: string = 'assets/img/no-results.svg';
  @Input() emptyStateTitle: string = 'No active query';
  @Input() emptyStateSubtitle: string = 'Enter valid criteria above and select Search (S)';
  @Input() selectedIndexes: number[] = [];
  @Input() noWhiteSpace: boolean = false;
  @Input() noBorderTopHeader = false;
  @Input() centerText = false;
  @Input() lastRowBold = false;

  @ViewChildren('selectTable') selectTable?: HTMLInputElement;

  isDesc: boolean = false;
  searchVal: string = '';
  allChecked = false;
  expandedIndexes: number[] = [];
  selectedPill = 0;
  tableFormGroup: FormGroup;
  tableFormArray: FormArray;
  rows?: FormArray;
  activatedTd: any = [];

  Text = TableColumnKind.Text;
  Currency = TableColumnKind.Currency;
  CurrencyText = TableColumnKind.CurrencyText;
  Date = TableColumnKind.Date;
  Link = TableColumnKind.Link;
  MemberItem = TableColumnKind.MemberItem;
  IconItem = TableColumnKind.IconItem;
  Input = TableColumnKind.Input;
  CheckBox = TableColumnKind.CheckBox;
  Dynamic = TableColumnKind.Dynamic;
  Images = TableColumnKind.Images;
  NextLineText = TableColumnKind.NextLineText;
  Badges = TableColumnKind.Badges;
  tableWrap = '';
  tableTopNone = '';

  filterValue: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.greyColor,
    badgeClasses: ['bd-table-filter', 'bd-chip-clickable'],
    text: 'Filter & Value',
    iconClasses: [BadgeIcons.close],
    iconPosition: BadgeIconPositions.before
  };

  uniqueId = uuid();
  isF4913Enabled = false;

  @Output() private columnChanged = new EventEmitter<string>();
  @Output() private directionChanged = new EventEmitter<number>();
  @Output() private linkClicked = new EventEmitter<any>();
  @Output() private menuClicked = new EventEmitter<any>();
  @Output() private selectionChanged = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private featureFlagService: FeatureFlagService
  ) {
    this.tableFormArray = fb.array([]);
    this.tableFormGroup = fb.group({
      'rows': this.tableFormArray
    });
    this.isF4913Enabled = !featureFlagService.isFeatureDisabled('F4913');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('tableData' in changes || 'tableColumns' in changes) {
      this.buildFormControls();
    }
  }

  ngOnInit(): void {
    if (this.zebraCells) {
      this.tableClass += ' table-zebra';
    }
    if (this.fixedHeader) {
      this.tableClass += ' fixed-header';
    }
    if (this.isWhiteSpaceWrap) {
      this.tableWrap = ' table-wrap';
    }
    if (this.noBorderTopHeader) {
      this.tableTopNone = ' table-top-none';
    }

    if (this.tableColumns && this.tableColumns.length > 0) {
      const sortableColumns = this.tableColumns.filter(c => !!c.sortKey);
      if (sortableColumns.length) {
        this.sortByColumn = this.sortByColumn || this.tableColumns[0].sortKey!; // ! because filter does not type check nicely
        this.sort(this.sortByColumn);
      }
    }
  }

  buildFormControls(): void {
    if (this.tableFormArray && this.tableFormArray.controls) {
      for (let i = 0; i < this.tableFormArray.controls.length; i++) {
        this.tableFormArray.removeAt(i);
      }
    }

    if (this.tableData) {
      for (const datum of this.tableData) {
        const fg = this.fb.group({});
        for (const col of this.tableColumns) {
          if (col.kind === TableColumnKind.Input) {
            fg.addControl(col.formControlName || col.key, this.fb.control(datum[col.key]));
          }
        }
        this.tableFormArray.push(fg);
      }
    }
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.sortByColumn = property;
    this.direction = this.isDesc ? 1 : -1;
    this.columnChanged.emit(this.sortByColumn);
    this.directionChanged.emit(this.direction);
  }

  changeAllSelection(): void {
    this.allChecked = !this.allChecked;
    this.selectedIndexes = [];
    if (this.allChecked) {
      this.selectedIndexes = Array.from(Array(this.tableData.length).keys())
        .filter(x => !this.tableData[x].lockedBy);
    }
    this.selectionChanged.emit({isAll: true, isChecked: this.allChecked});
  }

  onSelectionChange(checkboxEvent: any, index: number, rowContent: any): void {
    const isChecked = checkboxEvent.target.checked;
    const selectedDcnIndex: number = this.selectedIndexes.indexOf(index);
    if (selectedDcnIndex > -1) {
      this.selectedIndexes.splice(selectedDcnIndex, 1);
    } else if (isChecked && !this.isRowDisabled(index)) {
      this.selectedIndexes.push(index);
    }
    this.selectionChanged.emit({isAll: false, isChecked, index, rowContent});
  }

  onExpandedChange(index: number): void {
    const expandedIndexFound: number = this.expandedIndexes.indexOf(index);
    if (expandedIndexFound > -1) {
      this.expandedIndexes.splice(expandedIndexFound, 1);
    } else {
      this.expandedIndexes.push(index);
    }
  }

  isSelected(index: number): boolean {
    return this.selectedIndexes.indexOf(index) > -1;
  }

  isRowDisabled(index: number): boolean {
    return this.disabledIndexes.indexOf(index) > -1;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndexes.indexOf(index) > -1;
  }

  linkClickEvent(event: any): void {
    this.linkClicked.emit(event);
  }

  menuClickEvent(event: any): void {
    this.menuClicked.emit(event);
  }

  clearSelection(): void {
    this.selectedIndexes = [];
    this.allChecked = false;
  }

  gridColNumOf(col: TableColumn): number {
    const inputCols = this.tableColumns.filter((x: ColumnSettings): x is InputColumnSettings => {
      return x.kind === TableColumnKind.Input;
    });
    return inputCols.findIndex((val: InputColumnSettings) => {
      return val.key === col.key;
    });
  }

  isActiveFocus(index: any, e: any): void {
    if (!this.activatedTd.length && e.target.hasChildNodes()) {
      e.target.classList.add('focus-within');
      this.activatedTd.push(e.target);
    } else {
      if (this.activatedTd.length) {
        if (e.target.hasChildNodes()) {
          this.activatedTd[0].classList.remove('focus-within');
          e.target.classList.add('focus-within');
          this.activatedTd[0] = e.target;
        } else {
          this.activatedTd[0].classList.remove('focus-within');
          if (!e.target.parentElement.classList.contains('focus-within')) {
            e.target.parentElement.classList.add('focus-within');
          }
        }
      }
    }
  }

  getToolTip(tooltipParams: TooltipMenuSettings, tooltipContent: any): any {
    return {
      templateType: tooltipParams.templateType,
      placement: tooltipParams.placement,
      text: tooltipContent,
      widthText: tooltipParams.widthText,
      paddingText: tooltipParams.paddingText,
      container: tooltipParams.container,
    };
  }

  checkReadOnlyRows(rowId: number, col: TableColumn, colId: number): TableColumnKind {
    if (!col.readOnlyRows) {
      return col.kind;
    }
    const result = col.readOnlyRows.find(row => {
      return +row.rowId === +rowId;
    });
    if (result && (!result.columnException || +result.columnException !== +colId) ) {
      return result.rowType;
    }
    return col.kind;
  }
}

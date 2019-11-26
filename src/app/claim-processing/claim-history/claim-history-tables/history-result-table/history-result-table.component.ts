import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';
import {ClaimHistoryApi} from '@fox/rest-clients';
import {
  claimProcessingUrlPrefixClaimDetails,
  TableColumnKind,
  TooltipTemplates
} from '@fox/shared';
import {TooltipDefinitionService} from '../../../shared/tooltip-definition.service';
import {BillLinesResultSet} from '../../claim-history-models/bill-lines-result.model';
import {ClaimHistoryResultSet} from '../../claim-history-models/claim-history-result.model';
import {BillLinesResultTableComponent} from '../bill-lines-table/bill-lines-table.component';

@Component({
  selector: 'fox-claim-history-results',
  templateUrl: './history-result-table.component.html',
  styleUrls: ['../../claim-history.component.css']
})

export class HistoryResultTableComponent implements OnChanges {

  @Input() claimHistoryResults: ClaimHistoryResultSet[] = [];
  @Input() isDesc: boolean = false;
  @Input() column: string = '';
  @Input() selectedClmHistList: string[] = [];
  @Input() isSelectDisabled: boolean = false;

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedRow: EventEmitter<number> = new EventEmitter<number>();
  @Output() isAllSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clmNumList: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() allClmNumList: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild('historyResultTable') historyResultTable;

  tableColumns: any[] = [
    {
      key: 'claimNumber',
      headerText: 'Claim #',
      border: false,
      kind: TableColumnKind.Link,
      preImage: 'claim-blue.svg',
      sortKey: 'clmNumFxdLen'
    },
    {
      key: 'status',
      headerText: 'status',
      border: false,
      kind: TableColumnKind.Text,
      preImage: 'information.svg',
      sortKey: 'status',
      preImageToolTipKey: {
        templateType: TooltipTemplates.content,
        placement: 'bottom',
        text: 'statusDescr',
        widthText: '103',
        paddingText: '3',
        container: 'body',
      }
    },
    {
      key: 'provider',
      headerText: 'Billing Provider',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'provider'
    },
    {
      key: 'dos',
      headerText: 'Date Of Service',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'dos'
    },
    {
      key: 'totalBenefit',
      headerText: 'Amount Plan Paid',
      border: false,
      kind: TableColumnKind.Currency,
      sortKey: 'amtPlanPaid'
    },
    {
      key: 'assignedImage',
      headerText: 'Assigned',
      border: false,
      kind: TableColumnKind.IconItem,
      sortKey: 'assigned'
    },
    {
      key: 'noPayImage',
      headerText: 'No pay',
      border: false,
      kind: TableColumnKind.IconItem,
      sortKey: 'noPay'
    },
    {
      key: 'combined',
      headerText: 'Combined',
      border: false,
      kind: TableColumnKind.Text,
      sortKey: 'combinedDescr',
      preImage: 'information.svg',
      preImageToolTipKey: {
        templateType: TooltipTemplates.content,
        placement: 'bottom',
        text: 'combinedDescr',
        widthText: '271',
        paddingText: '6',
        container: 'body',
      }
    }
  ];

  isBillLineDataDisplay: boolean = false;
  billLinesResults: BillLinesResultSet[] = [];
  isCollapse: boolean = false;
  arrow: string = 'right';
  rowClicked = -1;
  allChecked: boolean = false;
  isColumnChanged: boolean;

  get dataKeys(): string[] {
    return Object.keys(this.claimHistoryResults[0]);
  }

  constructor(private router: Router, private claimHistorySearchApi: ClaimHistoryApi, private toolTip: TooltipDefinitionService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('claimHistoryResults' in changes) {
      this.historyResultTable.expandedIndexes = [];
      this.claimHistoryResults = this.claimHistoryResults.map(r => {
        r.component = BillLinesResultTableComponent;
        return r;
      });
    }
    this.rowClicked = -1;
    this.allChecked = false;
  }

  sortByColumn(key: string): void {
    if (this.column !== key) {
      this.isDesc = false;
      this.isColumnChanged = true;
      this.sort(key);
    }
  }

  sortByDirection(direction): void {
    if ((this.isDesc && direction === -1) || (!this.isDesc && direction === 1) || this.isColumnChanged) {
      this.isColumnChanged = false;
      return;
    }
    this.isDesc = direction !== 1;
    this.sort(this.column);
  }

  sort(property: string): void {
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }

  getUrlForClaim(claimNum): void {
    const url = '..' + claimProcessingUrlPrefixClaimDetails + claimNum;
    this.router.navigate([url]);
  }

  onSelectionChange(clmNumber: string): void {
    if (this.selectedClmHistList.indexOf(clmNumber) > -1) {
      this.selectedClmHistList.splice(this.selectedClmHistList.indexOf(clmNumber), 1);
    } else {
      this.selectedClmHistList.push(clmNumber);
    }
    this.selectedRow.emit(this.selectedClmHistList.length);
    this.clmNumList.emit(this.selectedClmHistList);
    this.isAllSelected.emit(false);
  }

  changeAllSelection(): void {
    this.selectedClmHistList = [];
    if (this.allChecked) {
      this.claimHistoryResults.forEach(row => {
        if (row.claimNumber && row.status === 'D') {
          this.selectedClmHistList.push(row.claimNumber);
        }
      });
      this.isAllSelected.emit(true);
    }
    this.allClmNumList.emit(this.selectedClmHistList);
    this.selectedRow.emit(this.selectedClmHistList.length);
  }

  selectionChanged(row): void {
    if (row.isAll) {
      this.allChecked = row.isChecked;
      this.changeAllSelection();
    } else {
      const selectedRow = this.claimHistoryResults[row.index];
      this.onSelectionChange(selectedRow.claimNumber);
    }
  }

  linkClicked(link): void {
    const linkIdentifier = link && link.col && link.col.key;
    const linkData = link && link.data;
    switch (linkIdentifier) {
      case 'claimNumber':
        const url = '..' + claimProcessingUrlPrefixClaimDetails + linkData.claimNumber;
        this.router.navigate([url]).then();
        break;
    }
  }

  clearSelection(): void {
    this.historyResultTable.clearSelection();
  }
}

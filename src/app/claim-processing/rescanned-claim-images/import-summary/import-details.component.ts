import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {ImportDetailVO, ImportSummaryVO} from '@fox/rest-clients';
import {PaginatorNonMaterialComponent, TableColumnKind} from '@fox/shared';

export interface DataTableObject {
  'Row': string;
  'Status': string[];
  'Failure Reason': string;
  'Email': string;
  'Original DCN #': string;
  'New DCN #': string;
}

@Component({
  selector: 'fox-import-details',
  templateUrl: './import-details.component.html',
  styleUrls: ['./import-details.component.css']
})

export class ImportDetailsComponent implements AfterViewChecked, OnInit {
  @Input() childIdBase: string;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  @Input() isIndividualSelected: boolean;
  @Input() importSummary: ImportSummaryVO;
  @Input() importDetails: ImportDetailVO[];
  data: ImportDetailVO[];
  exportData: ImportDetailVO[];
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  succeeded: number;
  failed: number;
  viewData: ImportDetailVO[];
  pageSizeSelected = 20;
  dataLengthInput = 0;
  pageTotal = 0;
  currentPage = 0;
  allResult: boolean = true;
  succeededResult: boolean = true;
  failedResult: boolean = true;
  selectedStatus: string = '';
  totalRecords: number;
  noResult: boolean = true;
  allSelectedFlag: boolean = false;
  succeedSelectedFlag: boolean = false;
  failedSelectedFlag: boolean = false;
  @Output() importDetailsSwitch: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() localFileLocation = new EventEmitter<string>();
  @Output() isFileSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  title = 'Export';
  preIcon = 'export-icon.svg';
  tableColumnCurrentSortKey: string;
  tableColumnCurrentSortDirection: any;
  importDetailDataSource: DataTableObject[] = [];
  importDetailData: DataTableObject[] = [];
  tableColumns: any;
  rowNumber: number;
  multi: any[];
  view: any[] = [400, 50];
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#8FD08E', '#E99191']
  };
  isTableConstructed = false;

  ngOnInit(): void {
    this.totalRecords = Number(this.importSummary.total);
    this.succeeded = (Number(this.importSummary.successful) / this.totalRecords) * 100;
    this.failed = 100 - this.succeeded;
    if (this.succeeded !== 0 && Number(this.importSummary.failed) !== 0) {
      this.allResult = false;
    } else if (this.succeeded !== 0 && Number(this.importSummary.failed) === 0) {
      this.succeeded = 100;
      this.failed = 0;
      this.succeededResult = false;
      this.allResult = true;
    } else if (this.failed !== 0 && this.succeeded === 0) {
      this.failedResult = false;
    }
    this.multi = [
      {
        'name': 'Rows',
        'series': [
          {
            'name': 'Succeeded',
            'value': this.succeeded
          },
          {
            'name': 'Failed',
            'value': this.failed
          }
        ]
      }
    ];
    this.viewData = this.importDetails;
    this.data = this.viewData;
    this.selectedStatus = 'all';
    this.allSelectedFlag = true;
    this.setGlobalDataTableComponent(this.viewData);
    this.importDetailData = this.importDetailDataSource;
    if (!this.isIndividualSelected) {
      this.dataLengthInput = this.importDetailDataSource.length;
      this.importDetailDataSource = this.importDetailDataSource.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.importDetailDataSource.length / this.paginator.pageSize);
    }
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header2 = document.getElementById('header2');
      if (header2) {
        this.isTableConstructed = true;
      }
    }
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  calculateNewPage(): void {
    this.importDetailDataSource = this.importDetailData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.importDetailData.length / this.paginator.pageSize);
  }

  get dataKeys(): string[] {
    return Object.keys(this.data[0]);
  }

  csvFromJson(viewData): any {
    let csvString = '';
    const column = 'email' + ',' + 'claim number' + ',' + 'original dcn' + ',' + 'rescan dcn' + ',' + 'result' + ',' + 'message';
    csvString = csvString.substring(0, csvString.length - 1);
    csvString = csvString + '\n';
    csvString = column + '\n';
    let importSummaryStr = '';
    for (let j = 0; j < viewData.length; j++) {
      importSummaryStr += viewData[j].email + ',' + viewData[j].claimNumber + ',' + viewData[j].originalDcn + ',' + viewData[j].rescanDcn + ',' + viewData[j].result + ',' + viewData[j].message + ',';
      importSummaryStr = importSummaryStr.substring(0, importSummaryStr.length - 1);
      importSummaryStr = importSummaryStr + '\r\n';
    }
    csvString = '' + csvString + importSummaryStr + '\n';
    return csvString;
  }

  exportCSVIE(): boolean {
    const fileName = 'Import_Summary.csv';
    const strMimeType = 'application/octet-stream;charset=utf-8';
    if (this.allSelectedFlag === true) {
      this.exportData = this.data;
    } else if (this.succeedSelectedFlag === true) {
      this.exportData = this.data;
      const suceededExportList: ImportDetailVO[] = this.exportData.filter(row => row.result && row.result.toUpperCase() === 'SUCCESSFUL');
      this.exportData = suceededExportList;
    } else if (this.failedSelectedFlag === true) {
      this.exportData = this.data;
      const failedExportList: ImportDetailVO[] = this.exportData.filter(row => row.result && row.result.toUpperCase() === 'FAILED');
      this.exportData = failedExportList;
    }
    const csvStr = this.csvFromJson(this.exportData);
    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob(['\ufeff', csvStr], {
        type: strMimeType
      }), fileName);
    } else {
      const uri = 'data:application/csv;charset=utf-8,' + escape(csvStr);
      const link = document.createElement('a');
      link.href = uri;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return false;
  }

  onChangeSelectedStatus(event: string): void {
    this.allSelectedFlag = false;
    if (event.toUpperCase() === 'ALL') {
      this.noResult = true;
      this.allFilterApplied();
      this.allSelectedFlag = true;
      this.succeedSelectedFlag = false;
      this.failedSelectedFlag = false;
    } else if (event.toUpperCase() === 'SUCCEEDED') {
      if (this.succeeded === 0) {
        this.noResult = false;
      } else {
        this.noResult = true;
        this.succeededFilterApplied();
        this.succeedSelectedFlag = true;
        this.failedSelectedFlag = false;
      }
    } else if (event.toUpperCase() === 'FAILED') {
      if (this.failed === 0) {
        this.noResult = false;
      } else {
        this.noResult = true;
        this.failedFilterApplied();
        this.failedSelectedFlag = true;
        this.succeedSelectedFlag = false;
      }
    }
    this.selectedStatus = event;
  }

  allFilterApplied(): void {
    this.viewData = this.data;
    this.setGlobalDataTableComponent(this.viewData);
    if (!this.isIndividualSelected) {
      this.dataLengthInput = this.importDetailDataSource.length;
      this.importDetailDataSource = this.importDetailDataSource.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.importDetailDataSource.length / this.paginator.pageSize);
    }
  }

  succeededFilterApplied(): void {
    this.viewData = this.data;
    const suceededList: ImportDetailVO[] = this.viewData.filter(row => row.result && row.result.toUpperCase() === 'SUCCESSFUL');
    this.viewData = suceededList;
    this.setGlobalDataTableComponent(this.viewData);
    if (!this.isIndividualSelected) {
      this.dataLengthInput = this.importDetailDataSource.length;
      this.importDetailDataSource = this.importDetailDataSource.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.importDetailDataSource.length / this.paginator.pageSize);
    }
  }

  failedFilterApplied(): void {
    this.viewData = this.data;
    const failedList: ImportDetailVO[] = this.viewData.filter(row => row.result && row.result.toUpperCase() === 'FAILED');
    this.viewData = failedList;
    this.setGlobalDataTableComponent(this.viewData);
    if (!this.isIndividualSelected) {
      this.dataLengthInput = this.importDetailDataSource.length;
      this.importDetailDataSource = this.importDetailDataSource.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.importDetailDataSource.length / this.paginator.pageSize);
    }
  }

  routeUpload(): void {
    this.importDetailsSwitch.emit(false);
    this.localFileLocation.emit('No file chosen');
    this.isFileSelected.emit(false);
  }

  setGlobalDataTableComponent(dataToDisplay: ImportDetailVO[]): void {
    this.importDetailDataSource = [];
    this.rowNumber = 0;
    dataToDisplay.forEach((data, i) => {
      const dataTableObject: DataTableObject = {
        'Row': '',
        'Status': [''],
        'Failure Reason': '',
        'Email': '',
        'Original DCN #': '',
        'New DCN #': ''
      };
      if (data) {
        this.rowNumber = this.rowNumber + 1;
        dataTableObject['Row'] = String(this.rowNumber);
        dataTableObject['Status'] = data.result === 'successful' ? ['confirm-green.svg', 'Succeeded'] : ['deny-red.svg', 'Failed'];
        if (data.result === 'successful') {
          dataTableObject['Failure Reason'] = '';
        } else {
          dataTableObject['Failure Reason'] = data.message || '';
        }
        dataTableObject['Email'] = data.email ? data.email : '';
        dataTableObject['Original DCN #'] = data.originalDcn ? data.originalDcn : '';
        dataTableObject['New DCN #'] = data.rescanDcn ? data.rescanDcn : '';

      }
      this.importDetailDataSource.push(dataTableObject);
    });
    const tableHeaders = Object.keys(this.importDetailDataSource[0]);
    this.tableColumns = tableHeaders.map((key, idx) => {
      return {
        key: key,
        header: key,
        border: false,
        kind:
          1 === idx ? TableColumnKind.IconItem : TableColumnKind.Text,
        sortKey: key
      };
    });
  }

  private tableColumnWidth(): void {
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '180px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '180px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '220px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '220px';
    }
  }
}

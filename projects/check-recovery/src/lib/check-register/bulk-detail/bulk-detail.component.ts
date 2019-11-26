import {Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {
  PagedResourcesOfResourceOfCheckSummaryVO,
  PageMetadataVO,
  ResourceOfCheckSummaryVO,
  ResourceOfCheckVO
} from '@fox/rest-clients';
import {MessageBoxService, MessageBoxType, PaginatorNonMaterialComponent, TableColumnKind} from '@fox/shared';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
import {Subscription} from 'rxjs';

export interface BulkCheckItem {
  accountNumber?: string;
  insuredName?: string;
  claimNumber?: string;
  claimAmount?: number;
  complete?: string;
  checkId?: number;
}

export interface DataTableObject {
  'Member #': string;
  'Insured Name': string;
  'Claim #': string;
  'Claim Amount': number;
  'Completed': boolean;
}

@Component({
  selector: 'fox-ui-bulk-detail',
  templateUrl: './bulk-detail.component.html',
  styleUrls: ['./bulk-detail.component.css']
})
export class BulkDetailComponent implements OnInit {
  tableColumns: any = {};
  bulkCheckResultPageSize = 5;
  bulkCheckResultPageDataLength?: number;
  bulkCheckResultPageTotal = 0;
  currentBulkCheckPage = 0;
  lastPageIndex = 0;

  bulkDetailsAllData: BulkCheckItem[] = [];
  bulkDetailsTableData: DataTableObject[] = [];
  isDataDisplay: boolean = false;

  checkSeries: number = 0;
  checkNumber: number = 0;
  issueDate: string = '';
  status: string = '';
  checkAmount: number = 0;
  payeeName: string = '';
  sub: Subscription = new Subscription();
  downloadLink: SafeResourceUrl = '';
  downloadLinkIE: string = '';
  bulkDetails: ResourceOfCheckVO[] = [];
  completeIndices: number[] = [];

  tableColumnCurrentSortKey: string = '';
  tableColumnCurrentSortDirection: string = '';

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;

  constructor(
    private route: ActivatedRoute,
    private checkSvc: CheckRecoveryService,
    private sanitizer: DomSanitizer,
    private messageBoxSvc: MessageBoxService
  ) {
    this.lastPageIndex = this.bulkCheckResultPageSize;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['checkArguments']) {
        const argArray = params['checkArguments'].split('|');
        this.checkSeries = +argArray[0];
        this.checkNumber = +argArray[1];
        this.issueDate = argArray[2];
        this.status = argArray[3].replace(/_/g, ' ');
        this.checkAmount = argArray[4];
        this.payeeName = argArray[5];
        this.init(this.checkSeries.toString(), this.checkNumber, this.issueDate);
      }
    });
  }

  init(checkSeries: string, checkNumber: number, issueDate: string): void {
    if (checkSeries && checkNumber && issueDate) {
      this.checkSvc.getCheck('check_series', undefined, checkSeries, checkNumber, issueDate).subscribe(resDataA => {
        if (resDataA && resDataA._embedded && resDataA._embedded.items) {
          this.isDataDisplay = true;
          const bulkCheckData: ResourceOfCheckSummaryVO[] = resDataA._embedded.items;
          if (bulkCheckData.length > 0) {
            for (let i = 0; i < bulkCheckData.length; i++) {
              const bulkCheckItem: BulkCheckItem = this.getBulkCheckItem(bulkCheckData[i]);
              // check for indexing when data comes from endpoint service
              if (bulkCheckItem.complete === 'Y') {
                this.completeIndices.push(i);
              }
              this.bulkDetailsAllData.push(bulkCheckItem);
            }
          }
          this.processDataForTable(resDataA);
        }
      }, error => {
        this.isDataDisplay = false;
      });
    }
  }

  processDataForTable(bulkCheckResult: PagedResourcesOfResourceOfCheckSummaryVO): void {
    if (bulkCheckResult.page) {
      const bulkCheckResultPageData: PageMetadataVO = bulkCheckResult.page;
      this.bulkCheckResultPageDataLength = bulkCheckResultPageData.totalElements;
      this.currentBulkCheckPage = bulkCheckResultPageData.number || 0;
      this.bulkCheckResultPageTotal = bulkCheckResultPageData.totalPages || 1;

      if (this.paginator) {
        const dataToDisplay = this.bulkDetailsAllData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.setDataTableComponent(dataToDisplay);
        this.bulkCheckResultPageTotal = Math.ceil(this.bulkDetailsAllData.length / this.paginator.pageSize);
      }
    }
  }

  getBulkCheckItem(bulkCheckData: ResourceOfCheckSummaryVO): BulkCheckItem {
    const bulkCheckResultItem: BulkCheckItem = {};
    if (bulkCheckData) {
      bulkCheckResultItem.accountNumber = bulkCheckData.accountNumber ? this.createAccountNumber(bulkCheckData.accountNumber) : '';
      bulkCheckResultItem.claimAmount = bulkCheckData.claimAmount ? bulkCheckData.claimAmount : undefined;
      bulkCheckResultItem.claimNumber = bulkCheckData.claimNumber ? bulkCheckData.claimNumber : '';
      bulkCheckResultItem.complete = bulkCheckData.complete ? bulkCheckData.complete : undefined;
      bulkCheckResultItem.insuredName = bulkCheckData.insuredName ? bulkCheckData.insuredName : '';
      bulkCheckResultItem.checkId = bulkCheckData.checkId ? bulkCheckData.checkId : undefined;
    }
    return bulkCheckResultItem;
  }

  createAccountNumber(accountNumber: string): string {
    const numberLength = accountNumber.toString().length;
    if (numberLength <= 9) {
      const zeroField = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      zeroField.splice(0, numberLength);
      accountNumber = (zeroField.join('') + accountNumber);
    }
    return accountNumber;
  }

  setDataTableComponent(dataToDisplay: BulkCheckItem[]): void {
    this.bulkDetailsTableData = [];
    dataToDisplay.forEach(data => {
      const dataTableObject: DataTableObject = {
        'Member #': '',
        'Insured Name': '',
        'Claim #': '',
        'Claim Amount': 0,
        'Completed': false
      };
      if (data) {
        dataTableObject['Member #'] = data.accountNumber ? data.accountNumber : '';
        dataTableObject['Insured Name'] = data.insuredName ? data.insuredName : '';
        dataTableObject['Claim #'] = data.claimNumber ? data.claimNumber : '';
        dataTableObject['Claim Amount'] = data.claimAmount ? data.claimAmount : 0;
        dataTableObject['Completed'] = data.complete === 'Y';
      }
      this.bulkDetailsTableData.push(dataTableObject);
    });
    const tableHeaders = Object.keys(this.bulkDetailsTableData[0]);
    this.tableColumns = tableHeaders.map((key, idx) => {
      return {
        key: key,
        header: key,
        border: false,
        preImage:
          0 === idx ? 'member-blue.svg' :
            2 === idx ? 'claim-grey.svg' : null,
        kind:
          0 === idx ? TableColumnKind.MemberItem :
            3 === idx ? TableColumnKind.Currency :
              4 === idx ? TableColumnKind.CheckBox : TableColumnKind.Text,
        sortKey: key,
        isChecked: () => {
          return false;
        }
      };
    });
  }

  calculateResults(): void {
    if (!this.paginator) {
      return;
    }
    const dataToDisplay = this.bulkDetailsAllData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.completeIndices = [];
    dataToDisplay.forEach((bc, index) => {
      if (bc && bc.claimNumber && bc.complete === 'Y') {
        this.completeIndices.push(index);
      }
    });
    this.setDataTableComponent(dataToDisplay);
    this.bulkCheckResultPageTotal = Math.ceil(this.bulkDetailsAllData.length / this.paginator.pageSize);
  }

  csvExport(bulkCheckDetails: any): any {
    const csvStr = this.csvFromJson(bulkCheckDetails);
    if ((navigator.userAgent.indexOf('MSIE') !== -1) || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { // IF IE > 10
      this.downloadLinkIE = 'Its IE';
    } else {
      const linkRef = `data:application/octet-stream;base64,` + btoa(csvStr);
      this.downloadLink = this.sanitizer.bypassSecurityTrustResourceUrl(linkRef);
    }
  }

  exportCSVIE(): boolean {
    const csvStr = this.csvFromJson(this.bulkDetails);
    const fileName = 'Bulk_Checks.csv';
    const strMimeType = 'application/octet-stream;charset=utf-8';
    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob(['\ufeff', csvStr], {
        type: strMimeType
      }), fileName);
    }
    return false;
  }

  csvFromJson(bulkCheckDetails: any): any {
    let csvString = '';
    const columns = ['Account #',
      'Insured Name',
      'Claim #',
      'Claim Amount',
      'Completed?'
    ];
    for (let j = 0; j < columns.length; j++) {
      csvString = csvString + columns[j] + ',';
    }
    csvString = csvString.substring(0, csvString.length - 1);
    csvString = csvString + '\n';
    for (let j = 0; j < bulkCheckDetails.length; j++) {
      if (bulkCheckDetails[j].complete === undefined) {
        bulkCheckDetails[j].complete = 'N';
      }
      csvString = csvString + bulkCheckDetails[j].accountNumber + ',' + bulkCheckDetails[j].insuredName + ',' + bulkCheckDetails[j].claimNumber + ',' + bulkCheckDetails[j].claimAmount + ',' + bulkCheckDetails[j].complete + ',';
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + '\r\n';
    }
    console.log('cvs string', csvString);
    return csvString;
  }

  completeSave(): void {
    if (this.bulkDetailsAllData.length) {
      const selectedCheckIds: any[] = [];
      for (const k in this.bulkDetailsAllData) {
        if (this.bulkDetailsAllData[k]) {
          selectedCheckIds.push({
            'checkId': this.bulkDetailsAllData[k]['checkId'],
            'complete': (this.bulkDetailsAllData[k]['complete'] === 'Y')
          });
        }
      }
      const postData = {'completeChecks': selectedCheckIds};
      this.checkSvc.getComplete(postData).subscribe(res => {
        if (res) {
          this.messageBoxSvc.addMessageBox('Saved Successfully', MessageBoxType.SUCCESS, 'Your checkbox changes have been saved successfully', 5000);
        }
      }, error => {
        this.messageBoxSvc.addMessageBox('Error', MessageBoxType.ERROR, 'There was an error submitting your request, please try again', 5000);
      });
    }
   }

  selectionChanged(selectedRow: any): void {
    if (selectedRow.isAll) {
      this.bulkDetailsAllData.forEach(bc => {
        if (bc && bc.claimNumber) {
          bc.complete = 'Y';
        }
      });
    } else {
      this.bulkDetailsAllData.forEach(bc => {
        if (bc && bc.claimNumber) {
          if (bc.claimNumber === selectedRow['rowContent']['Claim #']) {
            bc.complete = 'Y';
          }
        }
      });
    }
  }
}

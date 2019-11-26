import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as momentConst from 'moment';
const moment = momentConst;
import {AccountMembershipResponseVO, ResourceOfPrescriptionSummaryVO} from '@fox/rest-clients';
import {IWriteLetterService} from '../../shared/iwrite-letter.service';
import {SearchClaimSummaryFormModel} from '../claims-summary-form/search-claim-summary-form.model';

@Component({
  selector: 'fox-drug-summary-results',
  templateUrl: './drug-summary-results.component.html',
  styleUrls: ['./drug-summary-results.component.css', '../eob-information.component.css']
})
export class DrugSummaryResultsComponent implements OnChanges, AfterViewInit {

  @Input() drugSummaryFormValues: SearchClaimSummaryFormModel = new SearchClaimSummaryFormModel();
  @Input() memberNumber: string = '';

  @Input() drugSummaryResults: ResourceOfPrescriptionSummaryVO[] = [];
  @Input() memberCardResults: AccountMembershipResponseVO[] = [];

  @Input() isDesc: boolean = false;
  @Input() column: string = 'dateOfService';

  @Input() totalDrugSummaryResults: ResourceOfPrescriptionSummaryVO[] = [];

  @Output() isDescChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() columnChange: EventEmitter<string> = new EventEmitter<string>();

  drugSummaryDateAndActionDataSource = new MatTableDataSource();
  displayedDrugSummaryDateAndActionColumns = ['serviceFromDate', 'serviceToDate', 'action'];

  downloadLink?: SafeResourceUrl;
  downloadLinkIE: string = '';
  csvStr: string = '';

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginatorObj?: MatPaginator;

  dataLength = 0;
  currentPage = 0;
  lastPageIndex = 0;
  pageSize = 5;

  totalAmt?: number;
  totalBenAmt?: number;
  totalDedAmt?: number;

  constructor(private sanitizer: DomSanitizer, private iWriteLetterSrv: IWriteLetterService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(): void {
    if (this.drugSummaryFormValues) {
      const drugFromToDate = {
        'serviceFromDate': this.reverseDrugSummaryDateString(this.drugSummaryFormValues.dateOfServiceFrom),
        'serviceToDate': this.reverseDrugSummaryDateString(this.drugSummaryFormValues.dateOfServiceTo)
      };
      this.drugSummaryDateAndActionDataSource.data = [drugFromToDate];
    }
    if (this.totalDrugSummaryResults && this.totalDrugSummaryResults.length > 0) {
      this.calculationPaidAmt();
      this.calculationBenfAmt();
      this.calculationDedAmt();
      this.csvExport(this.totalDrugSummaryResults);
    }
  }

  calculationPaidAmt(): void {
    const sum = this.totalDrugSummaryResults.map(t => t.amountApproved).reduce((acc, value) => acc! + value!, 0);
    this.totalAmt = sum;
  }

  calculationBenfAmt(): void {
    const sumBenfAmt = this.totalDrugSummaryResults.map(t => t.totalBenAmt).reduce((acc, value) => acc! + value!, 0);
    this.totalBenAmt = sumBenfAmt;
  }

  calculationDedAmt(): void {
    const sumDeductAmt = this.totalDrugSummaryResults.map(t => t.deductibleAmount).reduce((acc, value) => acc! + value!, 0);
    this.totalDedAmt = sumDeductAmt;
  }

  csvExport(drugSummaryDetails: any): any {
    this.csvStr = this.csvFromJson(drugSummaryDetails);
    if ((navigator.userAgent.indexOf('MSIE') !== -1) || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { // IF IE > 10
      this.downloadLinkIE = 'Its IE';
    } else {
      const linkRef = `data:application/octet-stream;base64,` + btoa(this.csvStr);
      this.downloadLink = this.sanitizer.bypassSecurityTrustResourceUrl(linkRef);
    }
  }

  exportCSVIE(): boolean {
    const fileName = 'RX_Drug_Summary.csv';
    const strMimeType = 'application/octet-stream;charset=utf-8';
    // IE10+
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(new Blob(['\ufeff', this.csvStr], {
        type: strMimeType
      }), fileName);
    }
    return false;
  }

// Create CSV Format from Data
  csvFromJson(drugSummaryDetails: any[]): any {
    let csvString = '';
    const headerStr = 'Prescription Summary Report';
    const memberCardStr = this.memberCardResults[0].fullName;
    const formDateOfServiceFrom = this.reverseDrugSummaryDateString(this.drugSummaryFormValues.dateOfServiceFrom);
    const formDateOfServiceTo = this.reverseDrugSummaryDateString(this.drugSummaryFormValues.dateOfServiceTo);
    if (drugSummaryDetails.length > 0) {
      const drugFromToDate = 'From Date' + ',' + 'To Date' + '\n' +
        formDateOfServiceFrom + ',' +
        formDateOfServiceTo;
      const column = 'Date of Service' + ',' + 'Prescription Name' + ',' + 'Amount Approved' + ',' + 'Total Benefit Amount' + ',' + 'Deductible Amount';
      csvString = csvString.substring(0, csvString.length - 1);
      csvString = csvString + '\n';
      csvString = headerStr + '\n' + memberCardStr + '\n' + drugFromToDate + '\n\n' + column + '\n';
      let drugSummaryStr = '';
      for (let j = 0; j < drugSummaryDetails.length; j++) {
        drugSummaryStr += moment(drugSummaryDetails[j].dateOfService).format('MM/DD/YYYY') + ',' + drugSummaryDetails[j].prescriptionName + ',' + drugSummaryDetails[j].amountApproved + ',' + drugSummaryDetails[j].totalBenAmt + ',' + drugSummaryDetails[j].deductibleAmount + ',';
        drugSummaryStr = drugSummaryStr.substring(0, drugSummaryStr.length - 1);
        drugSummaryStr = drugSummaryStr + '\r\n';
      }
      csvString = '' + csvString + drugSummaryStr + '\n' + '' + ',' + 'Summary' + ',' + this.totalAmt + ',' + this.totalBenAmt + ',' + this.totalDedAmt;
    }
    return csvString;
  }

  sortDrugSummary(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.isDescChange.emit(this.isDesc);

    this.column = property;
    this.columnChange.emit(this.column);
  }

  reverseDrugSummaryDateString(dateFormat: string): string {
    const splitArr = dateFormat.split('-');
    const newDateFormat = [splitArr[1], splitArr[2], splitArr[0]];
    return newDateFormat.join('/');
  }

  generateLetter(): void {
    this.iWriteLetterSrv.memberNumber = this.drugSummaryFormValues.memberNo;
    this.iWriteLetterSrv.generateLetter();
  }
}

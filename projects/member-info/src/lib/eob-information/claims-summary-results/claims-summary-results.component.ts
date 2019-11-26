import {Component, Input, OnChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ClaimMaterialSummaryVO} from '@fox/rest-clients';
import {IWriteLetterService} from '../../shared/iwrite-letter.service';
import {SearchClaimSummaryFormModel} from '../claims-summary-form/search-claim-summary-form.model';

@Component({
  selector: 'fox-claims-summary-results',
  templateUrl: './claims-summary-results.component.html',
  styleUrls: ['./claims-summary-results.component.css', '../eob-information.component.css']
})
export class ClaimsSummaryResultsComponent implements OnChanges {
  claimSummaryDataSource = new MatTableDataSource();
  displayedClaimSummaryColumns = ['dateOfServiceFrom', 'dateOfServiceTo', 'noOfClaimsPaid', 'noOfClaimsPending', 'totalBenfAmount', 'action'];
  dataLength: number = 0;
  @Input() claimSummaryResults: ClaimMaterialSummaryVO[] = [];

  private _claimSummaryFormValues: SearchClaimSummaryFormModel = {
    memberNo: '',
    dateOfServiceFrom: '',
    dateOfServiceTo: ''
  };
  @Input()
  set claimSummaryFormValues(claimSummaryFormModel: SearchClaimSummaryFormModel) {
    this._claimSummaryFormValues = claimSummaryFormModel;
  }

  get claimSummaryFormValues(): SearchClaimSummaryFormModel {
    return this._claimSummaryFormValues;
  }

  constructor(private iWriteLetterSrv: IWriteLetterService) {
  }

  ngOnChanges(): void {
    this.claimSummaryDataSource.data = this.claimSummaryResults;
    this.dataLength = this.claimSummaryResults.length;
  }

  generateLetter(): void {
    if (this.claimSummaryFormValues && this.claimSummaryFormValues.memberNo) {
      this.iWriteLetterSrv.memberNumber = this.claimSummaryFormValues.memberNo;
      this.iWriteLetterSrv.generateLetter();
    }
  }

}

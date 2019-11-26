import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as momentConst from 'moment';
import {FoxValidators} from '@fox/shared';
import {SearchClaimSummaryFormModel} from './search-claim-summary-form.model';
import memberNumberLengthValidator = FoxValidators.memberNumberLengthValidator;
import mmddyyyyValidator = FoxValidators.mmddyyyySlashDateValidator;

const moment = momentConst;

@Component({
  selector: 'fox-claims-summary-form',
  templateUrl: './claims-summary-form.component.html',
  styleUrls: ['./claims-summary-form.component.css', '../eob-information.component.css']
})
export class ClaimsSummaryFormComponent implements OnInit {

  @Output() submitClaimSummary: EventEmitter<SearchClaimSummaryFormModel> = new EventEmitter<SearchClaimSummaryFormModel>();

  @Output() submitDrugSummary: EventEmitter<SearchClaimSummaryFormModel> = new EventEmitter<SearchClaimSummaryFormModel>();
  claimSummarySearchFormGroup: FormGroup = this.fb.group({});

  dosToInput: string = '';
  dosFromInput: string = '';
  memberIdInput: string = '';

  constructor(private fb: FormBuilder) {
    this.claimSummarySearchFormGroup = this.fb.group({
      memberNo: [
        '',

        [
          Validators.required,
          Validators.pattern('^[0-9 ]+$'),
          memberNumberLengthValidator
        ]
      ],
      dateOfServiceFrom: ['', [Validators.required, mmddyyyyValidator]],
      dateOfServiceTo: ['', [Validators.required, mmddyyyyValidator]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const valuesClaimSearch = this.claimSummarySearchFormGroup.value;
    const memberNo = valuesClaimSearch.memberNo.replace(/\s/g, '');
    valuesClaimSearch.memberNo = memberNo;
    const dateOfServiceFromFormat = valuesClaimSearch.dateOfServiceFrom.slice(4, 8) + '-' + valuesClaimSearch.dateOfServiceFrom.slice(0, 2) + '-' + valuesClaimSearch.dateOfServiceFrom.slice(2, 4);
    const dateOfServiceToFormat = valuesClaimSearch.dateOfServiceTo.slice(4, 8) + '-' + valuesClaimSearch.dateOfServiceTo.slice(0, 2) + '-' + valuesClaimSearch.dateOfServiceTo.slice(2, 4);
    if (valuesClaimSearch.dateOfServiceFrom && valuesClaimSearch.dateOfServiceFrom.length === 8) {
      const dateOfServiceFrom = moment(dateOfServiceFromFormat).format('YYYY-MM-DD');
      valuesClaimSearch.dateOfServiceFrom = dateOfServiceFrom;
    } else {
      const dateOfServiceFrom = moment(valuesClaimSearch.dateOfServiceFrom).format('YYYY-MM-DD');
      valuesClaimSearch.dateOfServiceFrom = dateOfServiceFrom;
    }

    if (valuesClaimSearch.dateOfServiceTo && valuesClaimSearch.dateOfServiceTo.length === 8) {
      const dateOfServiceTo = moment(dateOfServiceToFormat).format('YYYY-MM-DD');
      valuesClaimSearch.dateOfServiceTo = dateOfServiceTo;
    } else {
      const dateOfServiceTo = moment(valuesClaimSearch.dateOfServiceTo).format('YYYY-MM-DD');
      valuesClaimSearch.dateOfServiceTo = dateOfServiceTo;
    }
    this.submitClaimSummary.emit(valuesClaimSearch);
  }

  onSubmitForDrug(): void {
    const valuesDrugSearch = this.claimSummarySearchFormGroup.value;
    const memberNo = valuesDrugSearch.memberNo.replace(/\s/g, '');
    valuesDrugSearch.memberNo = memberNo;
    const dateOfServiceFromFormat = valuesDrugSearch.dateOfServiceFrom.slice(4, 8) + '-' + valuesDrugSearch.dateOfServiceFrom.slice(0, 2) + '-' + valuesDrugSearch.dateOfServiceFrom.slice(2, 4);
    const dateOfServiceToFormat = valuesDrugSearch.dateOfServiceTo.slice(4, 8) + '-' + valuesDrugSearch.dateOfServiceTo.slice(0, 2) + '-' + valuesDrugSearch.dateOfServiceTo.slice(2, 4);
    if (valuesDrugSearch.dateOfServiceFrom && valuesDrugSearch.dateOfServiceFrom.length === 8) {
      const dateOfServiceFrom = moment(dateOfServiceFromFormat).format('YYYY-MM-DD');
      valuesDrugSearch.dateOfServiceFrom = dateOfServiceFrom;
    } else {
      const dateOfServiceFrom = moment(valuesDrugSearch.dateOfServiceFrom).format('YYYY-MM-DD');
      valuesDrugSearch.dateOfServiceFrom = dateOfServiceFrom;
    }

    if (valuesDrugSearch.dateOfServiceTo && valuesDrugSearch.dateOfServiceTo.length === 8) {
      const dateOfServiceTo = moment(dateOfServiceToFormat).format('YYYY-MM-DD');
      valuesDrugSearch.dateOfServiceTo = dateOfServiceTo;
    } else {
      const dateOfServiceTo = moment(valuesDrugSearch.dateOfServiceTo).format('YYYY-MM-DD');
      valuesDrugSearch.dateOfServiceTo = dateOfServiceTo;
    }
    this.submitDrugSummary.emit(valuesDrugSearch);
  }

}

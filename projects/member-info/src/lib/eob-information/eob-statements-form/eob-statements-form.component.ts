import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as momentConst from 'moment';
import {FoxValidators} from '@fox/shared';
import {SearchEobStatementFormModel} from './search-eob-statements-form.model';
import memberNumberLengthValidator = FoxValidators.memberNumberLengthValidator;
import mmddyyyyValidator = FoxValidators.mmddyyyySlashDateValidator;

const moment = momentConst;

@Component({
  selector: 'fox-eob-statements-form',
  templateUrl: './eob-statements-form.component.html',
  styleUrls: ['./eob-statements-form.component.css', '../eob-information.component.css']
})
export class EobStatementsFormComponent implements OnInit {

  @Input() memberIdInput: string = '';
  @Input() dosFromInput: string = '';
  @Input() dosToInput: string = '';

  @Output() submitEobStatement: EventEmitter<SearchEobStatementFormModel> = new EventEmitter<SearchEobStatementFormModel>();
  eobStatementSearchFormGroup: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.eobStatementSearchFormGroup = this.fb.group({
      memberNo: [
        '',

        [
          Validators.required,
          Validators.pattern('^[0-9 ]+$'),
          memberNumberLengthValidator
        ]
      ],
      statementDateFrom: ['', [Validators.required, mmddyyyyValidator]],
      statementDateTo: ['', [Validators.required, mmddyyyyValidator]]
    });
  }

  onSubmit(): void {
    const valuesEobSearch = this.eobStatementSearchFormGroup.value;
    const memberNo = valuesEobSearch.memberNo.replace(/\s/g, '');
    valuesEobSearch.memberNo = memberNo;
    const statementDateFrom = valuesEobSearch.statementDateFrom.slice(4, 8) + '-' + valuesEobSearch.statementDateFrom.slice(0, 2) + '-' + valuesEobSearch.statementDateFrom.slice(2, 4);
    const statementDateTo = valuesEobSearch.statementDateTo.slice(4, 8) + '-' + valuesEobSearch.statementDateTo.slice(0, 2) + '-' + valuesEobSearch.statementDateTo.slice(2, 4);
    if (valuesEobSearch.statementDateFrom && valuesEobSearch.statementDateFrom.length === 8) {
      const dateOfServiceFrom = moment(statementDateFrom).format('YYYY-MM-DD');
      valuesEobSearch.statementDateFrom = dateOfServiceFrom;
    } else {
      const dateOfServiceFrom = moment(valuesEobSearch.statementDateFrom).format('YYYY-MM-DD');
      valuesEobSearch.statementDateFrom = dateOfServiceFrom;
    }

    if (valuesEobSearch.statementDateTo && valuesEobSearch.statementDateTo.length === 8) {
      const dateOfServiceTo = moment(statementDateTo).format('YYYY-MM-DD');
      valuesEobSearch.statementDateTo = dateOfServiceTo;
    } else {
      const dateOfServiceTo = moment(valuesEobSearch.statementDateTo).format('YYYY-MM-DD');
      valuesEobSearch.statementDateTo = dateOfServiceTo;
    }
    this.submitEobStatement.emit(valuesEobSearch);
  }

}

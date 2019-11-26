import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ReferencesApi, ReferenceValueVO} from '@fox/rest-clients';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FindDepositTrcComponent} from '../find-deposit-trc.component';
import {FindDepositTrcService} from '../find-deposit-trc.service';
import {FindTrcFormModel} from './find-trc-form.model';

@Component({
  selector: 'fox-find-trc-form',
  templateUrl: './find-trc-form.component.html',
  styleUrls: ['../find-deposit-trc.component.css']
})
export class FindTrcFormComponent implements OnInit {

  @Output() submitTrc: EventEmitter<FindTrcFormModel> = new EventEmitter<FindTrcFormModel>();
  trcFormGroup: FormGroup = this.fb.group({});
  atLeastOneField?: ValidatorFn;
  trcCategoryDescriptions: ReferenceValueVO[] = [];

  num: FormControl = new FormControl();
  dateCreated: FormControl = new FormControl();
  status: FormControl = new FormControl();
  category: FormControl = new FormControl();
  createdBy: FormControl = new FormControl();

  constructor(private fb: FormBuilder, private depositTrcService: FindDepositTrcService, private referencesSvc: ReferencesApi) {
    this.atLeastOneField = (c: AbstractControl): ValidationErrors | null => {
      let isAtLeastOneFieldFilled: boolean = false;
      if (c && c.value) {
        if (typeof c.value === 'object') {
          const formMap: object = <object>c.value;
          const formKeys: string[] = Object.keys(formMap);
          // @ts-ignore
          const valuedFormKeys: string[] = formKeys.filter((key) => !!formMap[key]);
          isAtLeastOneFieldFilled = ((!!valuedFormKeys) && (valuedFormKeys.length > 0));
        } else {
          isAtLeastOneFieldFilled = true;
        }
      }

      return isAtLeastOneFieldFilled ? null : {'atLeastOneField': 'no'};
    };

    this.num = new FormControl('');
    this.dateCreated = new FormControl('');
    this.status = new FormControl('');
    this.category = new FormControl('');
    this.createdBy = new FormControl('');

    this.trcFormGroup = this.fb.group( {
      num: this.num,
      dateCreated: this.dateCreated,
      status: this.status,
      category: this.category,
      createdBy: this.createdBy
    }, {
      validator: this.atLeastOneField
    });

  }

  ngOnInit(): void {
    if (this.depositTrcService.trcSearchResultCache) {
      const fg = this.trcFormGroup;
      fg.patchValue({
        category: this.depositTrcService.trcFormValuesCache.category,
        dateCreated: this.depositTrcService.trcFormValuesCache.dateCreated ? FindDepositTrcComponent.formatDateToCST(this.depositTrcService.trcFormValuesCache.dateCreated) || '' : '',
        createdBy: this.depositTrcService.trcFormValuesCache.createdBy,
        num: this.depositTrcService.trcFormValuesCache.num,
        status: this.depositTrcService.trcFormValuesCache.status
      });
    }
    this.getTrcCategory();
  }

  onSubmit(): void {
    const formValues: FindTrcFormModel = new FindTrcFormModel();
    const fg = this.trcFormGroup;

    formValues.category = fg.controls['category'].value;
    formValues.dateCreated = fg.controls['dateCreated'].value ? FindDepositTrcComponent.convertDateToISO(fg.controls['dateCreated'].value) : '';
    formValues.createdBy = fg.controls['createdBy'].value;
    formValues.num = fg.controls['num'].value;
    formValues.status = fg.controls['status'].value;
    this.submitTrc.emit(formValues);
  }

  getTrcCategory(): void {
    this.trcCategoryDescriptions = [];
    const obs = this.referencesSvc.listCategoryCodes('TRC_CATEGORY', uuid());
    if (obs) {
      obs.subscribe(obj => {
        this.trcCategoryDescriptions = obj;
      });
    }
  }

}

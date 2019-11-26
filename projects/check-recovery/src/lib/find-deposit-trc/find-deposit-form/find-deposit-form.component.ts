import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReferencesApi, ReferenceValueVO} from '@fox/rest-clients';
import {FoxValidators} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FindDepositTrcComponent} from '../find-deposit-trc.component';
import {FindDepositTrcService} from '../find-deposit-trc.service';
import {FindDepositFormModel} from './find-deposit-form.model';

@Component({
  selector: 'fox-find-deposit-form',
  templateUrl: './find-deposit-form.component.html',
  styleUrls: ['../find-deposit-trc.component.css']
})
export class FindDepositFormComponent implements OnInit {

  @Output() submitDeposit: EventEmitter<FindDepositFormModel> = new EventEmitter<FindDepositFormModel>();
  model: FindDepositFormModel;
  depositDateFormControl = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);
  depositSources: ReferenceValueVO[];
  fieldModelOptions: any = {updateOn: 'blur'};

  constructor(private referencesSvc: ReferencesApi, private depositService: FindDepositTrcService) {
    this.model = new FindDepositFormModel();
    this.depositSources = [];
  }

  ngOnInit(): void {
    if (this.depositService.depositSearchResultCache) {
      this.model = this.depositService.depositFormValuesCache;
    }
    this.getDepositSources();
  }

  keyDownFunction(event: KeyboardEvent): void {
    if (event.keyCode && event.keyCode === 13 && this.checkIfDepositFormFilled()) {
      this.submitDeposit.emit(this.model);
    }
  }

  checkIfDepositFormFilled(): boolean {
    return !!((FindDepositTrcComponent.removeWhitespace(this.model.depositDateVal) || FindDepositTrcComponent.removeWhitespace(this.model.depositNumberVal) ||
      this.model.depositCheckAmountVal || this.model.depositCheckNumberVal || this.model.depositSourceVal) && !this.depositDateFormControl.invalid);
  }

  getDepositSources(): void {
    this.referencesSvc.listCategoryCodes('DEPOSIT_SOURCE', uuid()).subscribe(obj => {

      obj.forEach(elem => {
        if (elem['description'] !== 'Exela Paper NonClaim') {
          this.depositSources.push(elem);
        }
      });
    });
  }
}

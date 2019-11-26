import {Directive, Input} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {RefundFutureDateValidator} from './refund-future-date-validator';

@Directive({
  selector: '[foxRefundFutureDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RefundFutureDateValidatorDirective, multi: true }]
})
export class RefundFutureDateValidatorDirective implements Validator {
  validator: { [key: string]: any } | null = null;

  @Input('foxRefundFutureDateValidator') providerInsuredValue: string = '';
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.validator = RefundFutureDateValidator.checkInputDate(control, this.providerInsuredValue);
    return this.validator;
   }
}

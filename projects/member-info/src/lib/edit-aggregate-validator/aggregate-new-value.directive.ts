import {Directive, Input} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {AggregateNewValueValidator} from './aggregate-new-value.validator';

@Directive({
  selector: '[foxAggregateCurrentValue]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AggregateNewValueDirective, multi: true }]
})
export class AggregateNewValueDirective implements Validator {
  @Input('foxAggregateCurrentValue') aggregateCurrentValue: string = '';
  validator: { [key: string]: any } | null = null;

  validate(control: AbstractControl): ValidationErrors | null {
    this.validator = AggregateNewValueValidator.checkInputValue(control, this.aggregateCurrentValue);
    return this.validator;
  }
}

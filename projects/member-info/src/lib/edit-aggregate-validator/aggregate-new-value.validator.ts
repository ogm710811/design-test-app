// custom validator to check if different between new value and current value in aggregates is zero
import {AbstractControl} from '@angular/forms';

export class AggregateNewValueValidator {

  static checkInputValue(control: AbstractControl, currentValue: string): { [key: string]: any } | null {
    if (control) {
      const inValid = (control.value === currentValue);
      return inValid ? {'invalidInput': true} : null;
    }
    return null;
  }
}

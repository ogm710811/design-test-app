import {AbstractControl, ValidationErrors} from '@angular/forms';
import * as momentConst from 'moment';
const moment = momentConst;

export function FormDateGreaterThanCurrentDate(control: AbstractControl): ValidationErrors | null {

  const formDateMoment = moment(control.value, 'MM/DD/YYYY', true);

  if (removeWhitespace(control.value) && !formDateMoment.isValid()) {
    return {date: 'Please enter in MM/DD/YYYY format'};
  }

  if (removeWhitespace(control.value) && formDateMoment.isValid()) {

    if (formDateMoment.isAfter(moment())) {

      return {dateIsGreaterThanCurrentDate: 'true'};

    }
  }

  return null;
}

export function DepositDateIsBeforeDateReceived(depositDatesGrp: AbstractControl): ValidationErrors | null {

  const dateReceivedCtrl = depositDatesGrp.get('dateReceived');
  const depositDateCtrl = depositDatesGrp.get('depositDate');

  let depositDateMoment: any = {};
  let dateReceivedDateMoment: any = {};

  if (depositDateCtrl && dateReceivedCtrl) {

    if (removeWhitespace(depositDateCtrl.value) && removeWhitespace(dateReceivedCtrl.value)) {

      depositDateMoment = moment(depositDateCtrl.value, 'MM/DD/YYYY', true);
      dateReceivedDateMoment = moment(dateReceivedCtrl.value, 'MM/DD/YYYY', true);

      if (depositDateMoment.isValid() && dateReceivedDateMoment.isValid()) {

        const errors = depositDateCtrl.errors;

        if (depositDateMoment.isBefore(dateReceivedDateMoment)) {

          let newErrors = {depositDateIsBeforeDateReceived: 'true'};

          if (errors) {
            newErrors = Object.assign(errors, newErrors);
          }

          depositDateCtrl.setErrors(newErrors);

          return newErrors;

        } else {

          if (depositDateCtrl.errors && depositDateCtrl.hasError('depositDateIsBeforeDateReceived')) {

            delete depositDateCtrl.errors['depositDateIsBeforeDateReceived'];
            depositDateCtrl.updateValueAndValidity();
          }
        }
      }
    }
  }

  return null;
}

export function removeWhitespace(sourceString: string): string | null {
  if (sourceString) {
    return sourceString.trim();
  } else {
    return null;
  }
}

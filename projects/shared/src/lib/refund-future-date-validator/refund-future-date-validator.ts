import {AbstractControl} from '@angular/forms';
import * as momentNS from 'moment';
const moment = momentNS;

export class RefundFutureDateValidator {
  static checkInputDate(control: AbstractControl, providerInssuredValue: string): { [key: string]: any } | null  {
    if (control && control.value && providerInssuredValue !== '') {
      const edate = moment(control.value, 'MMDDYY', true);
      if (!edate.isValid()) {
        return {'invalid': true};
      }
      const future = edate.isAfter();
      return future ? {'futureDate': true} : null;
    }
    return null;
  }

}

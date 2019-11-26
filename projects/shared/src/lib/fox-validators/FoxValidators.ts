import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export namespace FoxValidators {
  function patternAndErrorValidator(pattern: RegExp, errKey: string, errMsg: string): ValidatorFn {
    return (ctl: AbstractControl): ValidationErrors | null => {
      if (!ctl || !ctl.value || (typeof ctl.value) !== 'string') {
        return null;
      }
      const strMatch = (<string>ctl.value).match(pattern);
      if (strMatch && strMatch.length) {
        return null;
      }
      const obj: {[errkey: string]: string} = {};
      obj[errKey] = errMsg;
      return obj;
    };
  }

  export function memberNumberLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if (value.replace(/ /g, '').length !== 11) {
      return {memberNumberLengthValidator: true};
    }
    return null;
  }

  export const usdRegex = /^([-]?\d+(\.\d{1,2})?|\.\d{1,2})$/;
  export const usdErrorKey = 'dollar';
  export const usdErrorValue = 'Dollar Amount must be entered in format XX.XX';
  export const usdValidator = patternAndErrorValidator(usdRegex, usdErrorKey, usdErrorValue);

  export const dateErrorKey = 'date';

  export const isoDateRegex = /^(19\d{2}|2\d{3})-(0\d|1[0-2])-([0-2]\d|3[0-1])/;
  export const isoDateErrorValue = 'Please enter in YYYY-MM-DD format';
  export const isoDateValidator: ValidatorFn = patternAndErrorValidator(isoDateRegex, dateErrorKey, isoDateErrorValue);

  export const mmddyyyySlashDateRegex = /^(0\d|1[0-2])\/([0-2]\d|3[0-1])\/(19\d{2}|2\d{3})$/;
  export const mmddyyyySlashDateErrorValue = 'Please enter in MM/DD/YYYY format';
  export const mmddyyyySlashDateValidator: ValidatorFn = patternAndErrorValidator(mmddyyyySlashDateRegex, dateErrorKey, mmddyyyySlashDateErrorValue);

  // When we want to type mm/dd/yyyy but get yyyy-mm-dd we validate the yyyy-mm-dd, but present the mm/dd/yyyy error message
  export const mmddyyyyToIsoDateValidator: ValidatorFn = patternAndErrorValidator(isoDateRegex, dateErrorKey, mmddyyyySlashDateErrorValue);

  // When we want to type yyyy-mm-dd but get mm/dd/yyyy we validate the mm/dd/yyyy but present the yyyy-mm-dd, error message
  export const isoToMmddyyyyDateValidator: ValidatorFn = patternAndErrorValidator(mmddyyyySlashDateRegex, dateErrorKey, isoDateErrorValue);

  export const mmddyyyyToIsoDateRangeRegex = /^(19\d{2}|2\d{3})-(0\d|1[0-2])-([0-2]\d|3[0-1])\s\|\s(19\d{2}|2\d{3})-(0\d|1[0-2])-([0-2]\d|3[0-1])/;
  export const mmddyyyyToIsoDateRangeErrorKey = 'date-range';
  export const mmddyyyyToIsoDateRangeErrorValue = 'Please enter in MM/DD/YYYY - MM/DD/YYYY format';
  export const mmddyyyyToIsoDateRangeValidator: ValidatorFn = multiValidator([patternAndErrorValidator(mmddyyyyToIsoDateRangeRegex, mmddyyyyToIsoDateRangeErrorKey, mmddyyyyToIsoDateRangeErrorValue), foxValidationDateRange()]);

  export const mmddyyyyOptionalSlashDateRegex = /^(0\d|1[0-2])\/?([0-2]\d|3[0-1])\/?(19|20)\d{2}$/;
  export const mmddyyyyOptionalSlashDateErrorKey = 'date';
  export const mmddyyyyOptionalSlashDateErrorValue = 'Required field. Enter in MMDDYYYY OR MM/DD/YYYY';
  export const mmddyyyyDateErrorValue = 'Required field. Please Enter MMDDYYYY';
  export const mmddyyyyOptionalSlashDateValidator: ValidatorFn = patternAndErrorValidator(mmddyyyyOptionalSlashDateRegex, dateErrorKey, mmddyyyyOptionalSlashDateErrorValue);
  export const mmddyyyyDateValidator: ValidatorFn = patternAndErrorValidator(mmddyyyyOptionalSlashDateRegex, dateErrorKey, mmddyyyyDateErrorValue);

  export const mmddyyyyWithoutSlashDateRegex = /^(0\d|1[0-2])([0-2]\d|3[0-1])(19|20)\d{2}$/;
  export const mmddyyyyWithoutSlashErrorValue = 'Please enter in MMDDYYYY format';
  export const mmddyyyyWithoutSlashDateValidator = patternAndErrorValidator(mmddyyyyWithoutSlashDateRegex, dateErrorKey, mmddyyyyWithoutSlashErrorValue);
  export const mmddyyyyToDateValidator: ValidatorFn = patternAndErrorValidator(mmddyyyyWithoutSlashDateRegex, dateErrorKey, mmddyyyyWithoutSlashErrorValue );

  export const mmddyyDateRegex = /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/;
  export const mmddyyDateErrorValue = 'Please enter in MM/DD/YYYY format';
  export const mmddyyDateValidator = patternAndErrorValidator(mmddyyDateRegex, dateErrorKey, mmddyyDateErrorValue);

  export const mmyySlashDateRegex = /^(0\d|1[0-2])\/\d{2}$/;
  export const mmyySlashDateErrorValue = 'Please enter in MMYY format';
  export const mmyySlashDateValidator: ValidatorFn = patternAndErrorValidator(mmyySlashDateRegex, dateErrorKey, mmyySlashDateErrorValue);

  export const mmyyDateRegex = /^(0\d|1[0-2])\d{2}$/;
  export const mmyyDateErrorValue = 'Please enter in MMYY format';
  export const mmyyDateValidator: ValidatorFn = patternAndErrorValidator(mmyyDateRegex, dateErrorKey, mmyyDateErrorValue);

  export const mmyyoptionalSlashDateRegex = /^(0\d|1[0-2])\d{2}$/;
  export const mmyyoptionalSlashDateErrorValue = 'Please enter in MM/YY format';
  export const mmyyoptionalSlashDateValidator: ValidatorFn = patternAndErrorValidator(mmyyoptionalSlashDateRegex, dateErrorKey, mmyyoptionalSlashDateErrorValue);

  export const zipRegex = /^\d{5}(\d{4})?$/;

  function multiValidator(validators: ValidatorFn[]): ValidatorFn {
    let retVal: ValidationErrors | null = null;
    return (ctl: AbstractControl): ValidationErrors | null => {
      retVal = null;
      validators.forEach(execute => {
        const validationResult = execute(ctl);
        if (validationResult) {
          if (!retVal) {
            retVal = {...validationResult};
          } else {
            retVal = {...retVal, ...validationResult};
          }
        }
      });
      return retVal;
    };
  }

  function foxValidationDateRange(): ValidatorFn {
    return (ctl: AbstractControl): ValidationErrors | null => {
      if (ctl && ctl.value && ctl.value.length >= 32) {
        const error: {[errKey: string]: string} = {};
        error['date-range-invalid'] = 'Invalid format for date range';
        const rangeDates = ctl.value.trim().split('|');
        const dateCmp1 = rangeDates[0] ? rangeDates[0].split('-') : [];
        const dateCmp2 = rangeDates[1] ? rangeDates[1].split('-') : [];

        // In this case the initial year must be equals or less than another year.
        if (+dateCmp1[0] > +dateCmp2[0]) {
          return error;
        } else if (+dateCmp1[0] === +dateCmp2[0]) {
          // For the equals year we need validate the mounths
          if (+dateCmp1[1] > +dateCmp2[1]) {
            return error;
          } else if (+dateCmp1[1] === +dateCmp2[1]) {
            // If Year and mounths are equals we need chacke the days
            if (+dateCmp1[2] >= +dateCmp2[2]) {
              return error;
            }
          }
        }
      }
      return null;
    };
  }

}

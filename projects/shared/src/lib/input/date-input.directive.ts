import {ChangeDetectorRef, Directive, forwardRef, Input, OnInit, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {FoxValidators} from '../fox-validators/FoxValidators';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  // <fox-input type="fox-date"> will have this code applied
  selector: 'fox-input[type="fox-date"]',
  providers: [
    {
      // When this directive is applied we want the code in this directive to be the
      // ControlValueAccessor
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputDirective),
      multi: true
    },
    {
      // When this directive is applied we want the code in this directive to be the Validator
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputDirective),
      multi: true
    }
  ]
})
export class DateInputDirective extends AbstractInputDirective implements OnInit, Validator {

  @Input() before: string = '';
  @Input() after: string = '';
  @Input() displayFormat: 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'MM/YY' | 'MM/DD' | 'MMDDYY' | 'MMDDYYYY' = 'MM/DD/YYYY';
  @Input() programmaticFormat: 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'MM/YY' | 'MMYY' | 'MMDD' | 'MMDDYY' | 'MMDDYYYY' = 'YYYY-MM-DD';

  @Input() twoDigitYearCutoff: string = ((new Date()).getFullYear() + 1).toString().substr(2, 2);

  get displayFormatMaxLength(): number {
    return this.displayFormat.length;
  }

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  /**
   * @description
   * Insert slashes into an 8-digit string to get it to MM/DD/YYYY format
   *
   * @param date in MMDDYYYY format
   *
   * @return date in MM/DD/YYYY format
   */
  static digitsToMmDdYyyy(digits: string): string {
    let retVal = '';

    // Up to the first two digits
    retVal += digits.slice(0, 2);
    // if there are two or more digits, write the slash after the first two digits
    retVal += (digits.length >= 2) ? '/' : '';
    // the third and fourth digit if present (slice returns empty string if out of bounds)
    retVal += digits.slice(2, 4);
    // if there are four or more digits, write the slash after the 4th digit
    retVal += (digits.length >= 4) ? '/' : '';
    // write as many of digits five through eight if present
    retVal += digits.slice(4, 8);

    return retVal;
  }

  /**
   * @description
   * Insert slashes into an 4-digit string to get it to MM/YY format
   *
   * @param date in MMYY format
   *
   * @return date in MM/YY format
   */
  static digitsToMmYy(digits: string): string {
    let retVal = '';

    // Up to the first two digits
    retVal += digits.slice(0, 2);
    // if there are two or more digits, write the slash after the first two digits
    retVal += (digits.length >= 2) ? '/' : '';
    // the third and fourth digit if present (slice returns empty string if out of bounds)
    retVal += digits.slice(2, 4);

    return retVal;
  }

  static digitsToMmDd(digits: string): string {
    let retVal = '';

    // Up to the first two digits
    retVal += digits.slice(0, 2);
    // if there are two or more digits, write the slash after the first two digits
    retVal += (digits.length >= 2) ? '/' : '';
    // the third and fourth digit if present (slice returns empty string if out of bounds)
    retVal += digits.slice(2, 4);

    return retVal;
  }

  /**
   * @description
   * Convert a date in YYYY-MM-DD to MM/DD/YYYY
   *
   * @param date in ISO YYYY-MM-DD format
   * @return date in MM/DD/YYYY format
   */
  toDisplayFormat(programmaticValue: string): string {
    if (this.displayFormat === this.programmaticFormat) {
      return programmaticValue;
    }

    if (this.displayFormat === 'MM/DD/YYYY' && this.programmaticFormat === 'YYYY-MM-DD') {
      // get rid of anything but digits and dashes
      const valTrim = programmaticValue.trim().replace(/[^\d-]+/g, '');
      // if there are digits
      if (valTrim.replace(/-/g, '').length) {
        // get the components of date
        const dateCmp = valTrim.split('-');
        // set the appropriate value
        return `${dateCmp.length >= 2 ? dateCmp[1].padStart(2, '0') : ''}/` +
          `${dateCmp.length >= 3 ? dateCmp[2].padStart(2, '0') : ''}/` +
          `${dateCmp.length >= 1 ? dateCmp[0] : ''}`;
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/DD/YYYY' && this.programmaticFormat === 'MMDDYY') {
      // get rid of anything but digits
      const valTrim = programmaticValue.trim();
      // if there are digits
      if (valTrim.length) {
        let valDigits = valTrim;
        if (valDigits.length >= 4) {
          const mmdd = valDigits.substr(0, 4);
          let lastTwoDigitsOfYear = '';
          if (valDigits.length >= this.programmaticFormat.length) {
            lastTwoDigitsOfYear = valDigits.substr(-2, 2);
          } else {
            lastTwoDigitsOfYear = '0' + valDigits.substr(-1, 1);
          }
          if (+lastTwoDigitsOfYear < +this.twoDigitYearCutoff) {
            valDigits = mmdd + '20' + lastTwoDigitsOfYear;
          } else {
            valDigits = mmdd + '19' + lastTwoDigitsOfYear;
          }
        }

        return DateInputDirective.digitsToMmDdYyyy(valDigits);
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/YY' && this.programmaticFormat === 'MMYY') {
      // get rid of anything but digits
      const valTrim = programmaticValue.trim();
      // if there are digits
      if (valTrim.length) {
        let valDigits = valTrim;
        if (valDigits.length >= 4) {
          const mmdd = valDigits.substr(0, 4);
          let lastTwoDigitsOfYear = '';
          if (valDigits.length >= this.programmaticFormat.length) {
            lastTwoDigitsOfYear = valDigits.substr(-2, 2);
          } else {
            lastTwoDigitsOfYear = '0' + valDigits.substr(-1, 1);
          }
          if (+lastTwoDigitsOfYear < +this.twoDigitYearCutoff) {
            valDigits = mmdd + '20' + lastTwoDigitsOfYear;
          } else {
            valDigits = mmdd + '19' + lastTwoDigitsOfYear;
          }
        }
        return DateInputDirective.digitsToMmYy(valDigits);
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/DD' && this.programmaticFormat === 'MMDD') {
      // get rid of anything but digits
      const valTrim = programmaticValue.trim();
      // if there are digits
      if (valTrim.length) {
        let valDigits = valTrim;
        if (valDigits.length >= 4) {
          const mmdd = valDigits.substr(0, 4);
          let lastTwoDigitsOfYear = '';
          if (valDigits.length >= this.programmaticFormat.length) {
            lastTwoDigitsOfYear = valDigits.substr(-2, 2);
          } else {
            lastTwoDigitsOfYear = '0' + valDigits.substr(-1, 1);
          }
          if (+lastTwoDigitsOfYear < +this.twoDigitYearCutoff) {
            valDigits = mmdd + '20' + lastTwoDigitsOfYear;
          } else {
            valDigits = mmdd + '19' + lastTwoDigitsOfYear;
          }
        }
        return DateInputDirective.digitsToMmDd(valDigits);
      } else {
        return '';
      }
    }

    return programmaticValue;
  }

  /**
   * @description
   * Convert a date in MM/DD/YYYY to YYYY-MM-DD
   *
   * @param date in MM/DD/YYYY format
   *
   * @return date in ISO YYYY-MM-DD format
   */
  toProgrammaticFormat(displayValue: string): string | undefined {
    if (this.displayFormat === this.programmaticFormat) {
      if (!displayValue) {
        return undefined;
      }
      return displayValue;
    }

    if (this.displayFormat === 'MM/DD/YYYY' && this.programmaticFormat === 'YYYY-MM-DD') {
      // get rid of anything but digits and slashes
      const valTrim = displayValue.trim().replace(/[^\d/]+/g, '');
      // if there are digits
      if (valTrim.replace(/\//g, '').length) {
        // get the components of date
        const dateCmp = valTrim.split('/');
        // set the appropriate value
        return `${dateCmp.length >= 3 ? dateCmp[2] : ''}-` +
          `${dateCmp.length >= 1 ? dateCmp[0].padStart(2, '0') : ''}-` +
          `${dateCmp.length >= 2 ? dateCmp[1].padStart(2, '0') : ''}`;
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/DD/YYYY' && this.programmaticFormat === 'MMDDYY') {
      // get rid of anything but digits and slashes
      const valTrim = displayValue.trim().replace(/[^\d/]+/g, '');
      // if there are digits
      if (valTrim.replace(/\//g, '').length) {
        // get the components of date
        const dateCmp = valTrim.split('/');
        // set the appropriate value
        return `${dateCmp.length >= 1 ? dateCmp[0].padStart(2, '0') : ''}` +
          `${dateCmp.length >= 2 ? dateCmp[1].padStart(2, '0') : ''}` +
          `${dateCmp.length >= 3 ? (dateCmp[2].length > 2 ? dateCmp[2].substr(-2, 2) : dateCmp) : ''}`;
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/YY' && this.programmaticFormat === 'MMYY') {
      // get rid of anything but digits and slashes
      const valTrim = displayValue.trim().replace(/[^\d/]+/g, '');
      // if there are digits
      if (valTrim.replace(/\//g, '').length) {
        // get the components of date
        const dateCmp = valTrim.split('/');
        // set the appropriate value
        return `${dateCmp.length >= 1 ? dateCmp[0].padStart(2, '0') : ''}` +
          `${dateCmp.length >= 2 ? dateCmp[1] : ''}`;
      } else {
        return '';
      }
    } else if (this.displayFormat === 'MM/DD' && this.programmaticFormat === 'MMDD') {
      // get rid of anything but digits and slashes
      const valTrim = displayValue.trim().replace(/[^\d/]+/g, '');
      // if there are digits
      if (valTrim.replace(/\//g, '').length) {
        // get the components of date
        const dateCmp = valTrim.split('/');
        // set the appropriate value
        return `${dateCmp.length >= 1 ? dateCmp[0].padStart(2, '0') : ''}` +
          `${dateCmp.length >= 2 ? dateCmp[1] : ''}`;
      } else {
        return '';
      }
    }
    return displayValue;
  }

  ngOnInit(): void {
    // Insert the default icon
    if (this.foxInput.isReadOnly) {
      this.foxInput.preIconUrl = 'assets/img/calendar-252c37.svg';
    } else {
      this.foxInput.postIconUrl = 'assets/img/calendar-252c37.svg';
    }
    this.foxInput.placeholder = this.displayFormat;
  }

  onChange(event: Event): void {
    const value = event && event.target && event.target instanceof HTMLInputElement ? event.target.value : '';
    let val = value;
    if (this.displayFormat === 'MM/DD/YYYY') {
      val = value.replace(/[^\d]/g, '');
      val = DateInputDirective.digitsToMmDdYyyy(val);
      this.domValue = val;
    } else if (this.displayFormat === 'MM/YY') {
      val = value.replace(/[^\d]/g, '');
      val = DateInputDirective.digitsToMmYy(val);
      this.domValue = val;
    } else if (this.displayFormat === 'MM/DD') {
      val = value.replace(/[^\d]/g, '');
      val = DateInputDirective.digitsToMmYy(val);
      this.domValue = val;
    }
    this.changeValueTo(this.toProgrammaticFormat(val));
  }

  onInput(event: Event): void {
  }

  /**
   * @description
   * Register a function to run on changing validator. No-op in this class
   *
   * @see Validator
   *
   * @param fn A function that reacts to a validator change
   */
  registerOnValidatorChange(fn: () => void): void {
  }

  /**
   * @description
   * Validates the field
   *
   * @see Validator
   *
   * @param the control
   */
  validate(control: AbstractControl): ValidationErrors | null {
    switch (this.displayFormat) {
      case 'MM/DD/YYYY':
        switch (this.programmaticFormat) {
          case 'YYYY-MM-DD':
            return FoxValidators.mmddyyyyToIsoDateValidator(control);
          case 'MM/DD/YYYY':
            return FoxValidators.mmddyyyyDateValidator(control);
          default:
            return null;
        }
      case 'MMDDYYYY':
        switch (this.programmaticFormat) {
          case 'MM/DD/YYYY':
            return FoxValidators.mmddyyyyToDateValidator(control);
          case 'MMDDYYYY':
            return FoxValidators.mmddyyyyWithoutSlashDateValidator(control);
          default:
            return null;
        }
      case 'YYYY-MM-DD':
        switch (this.programmaticFormat) {
          case 'YYYY-MM-DD':
            return FoxValidators.isoDateValidator(control);
          case 'MM/DD/YYYY':
            return FoxValidators.isoToMmddyyyyDateValidator(control);
          default:
            return null;
        }
      case 'MM/YY':
        switch (this.programmaticFormat) {
          case 'MM/YY':
            return FoxValidators.mmyySlashDateValidator(control);
          case 'MMYY':
            return FoxValidators.mmyyoptionalSlashDateValidator(control);
          default:
            return null;
        }
      default:
        return null;
    }
  }

  /**
   * @description
   * Transforms an ISO string to MM/DD/YYYY when it is bound to a field
   *
   * @param programmaticVal
   */
  transformToDomValue(programmaticVal: string | number | any[] | object): any {
    if (typeof programmaticVal === 'string') {
      // Convert an ISO date string to mm/dd/yyyy string
      return this.toDisplayFormat(programmaticVal);
    } else if (programmaticVal) {
      // If it's not a string, we kind of give up and let the validator call it incorrect
      return programmaticVal.toString();
    } else {
      return '';
    }
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    const val = this.domValue;
    if (keyEvent.keyCode !== 8 && keyEvent.keyCode !== 37 && keyEvent.keyCode !== 39) {
      if (!this.isValidChar(keyEvent.key)) {
        keyEvent.preventDefault();
      } else if ((this.displayFormat === 'MM/DD/YYYY' || this.displayFormat === 'MM/YY' || this.displayFormat === 'MM/DD') && keyEvent.key === '/') {
        // We want to take note of when the user inserts a slash keystroke. It means that a single-digit number directly before it should have
        // a zero-padding added
        if (val.match(/^\d$/) && this.cursorPosition === val.length) {
          this.domValue = val.replace(/^(\d)$/, '0$1');
        } else if (val.match(/^\d{2}\/\d$/) && this.cursorPosition === val.length) {
          this.domValue = val.replace(/^(\d{2})\/(\d)$/, '$1/0$2');
        } else if (val.match(/^\d\/\d$/) && this.cursorPosition === val.length) {
          this.domValue = val.replace(/^(\d)\/(\d)$/, '0$1/0$2');
        } else {
          keyEvent.preventDefault();
        }
      } else if (val.length >= this.displayFormatMaxLength && keyEvent.key !== 'Enter') {
        keyEvent.preventDefault();
      }
    }
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    let val = this.domValue;

    // We don't want to keep re-inserting stuff they're deleting, so ignore deletion keystrokes for updating the dom.
    // It will get fixed on change or next keyup. Still update the value to the rest of the program, though.
    if (keyEvent.key === 'Delete' || keyEvent.key === 'Backspace') {
      this.changeValueTo(this.toProgrammaticFormat(val));
      return;
    }

    // We want to process changes if it's a valid keypress that isn't a control key
    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      if (this.displayFormat === 'MM/DD/YYYY' || this.displayFormat === 'MM/YY' || this.displayFormat === 'MM/DD') {
        const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;

        // Get where the cursor should be if we were to delete all the slashes
        let adjustedCursorPos = 8;
        if (initialCursorPos > 10) {
          adjustedCursorPos = 8;
        } else if (initialCursorPos > 5) {
          adjustedCursorPos = initialCursorPos - 2;
        } else if (initialCursorPos > 2) {
          adjustedCursorPos = initialCursorPos - 1;
        } else {
          adjustedCursorPos = initialCursorPos;
        }

        // Strip slashes and put them in the right places
        val = val.replace(/[^\d]/g, '');
        if (this.displayFormat === 'MM/YY') {
          val = DateInputDirective.digitsToMmYy(val);
        } else if (this.displayFormat === 'MM/DD') {
          val = DateInputDirective.digitsToMmDd(val);
        } else {
          val = DateInputDirective.digitsToMmDdYyyy(val);
        }
        // Set the new slash position in the DOM
        this.domValue = val;

        // Get the proper cursor position now that slashes are back
        if (adjustedCursorPos > 8) {
          this.cursorPosition = 10;
        } else if (adjustedCursorPos >= 4) {
          this.cursorPosition = adjustedCursorPos + 2;
        } else if (adjustedCursorPos >= 2) {
          this.cursorPosition = adjustedCursorPos + 1;
        } else {
          this.cursorPosition = adjustedCursorPos;
        }
      }
      // Call the change listener
      this.changeValueTo(this.toProgrammaticFormat(val));
    }
  }

  private isValidChar(theChar: string): boolean {
    if (this.displayFormat === 'MM/DD/YYYY' || this.displayFormat === 'MM/YY' || this.displayFormat === 'MM/DD') {
      return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', 'Enter'].find(x => x === theChar);
    } else if (this.displayFormat === 'YYYY-MM-DD') {
      return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'Enter'].find(x => x === theChar);
    } else if (this.displayFormat === 'MMDDYY' || this.displayFormat === 'MMDDYYYY') {
      return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'].find(x => x === theChar);
    }
    return true;
  }
}

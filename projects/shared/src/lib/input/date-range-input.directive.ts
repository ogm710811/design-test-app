import {ChangeDetectorRef, Directive, forwardRef, Input, OnInit, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {FoxValidators} from '../fox-validators/FoxValidators';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  // <fox-input type="fox-date"> will have this code applied
  selector: 'fox-input[type="fox-date-range"]',
  providers: [
    {
      // When this directive is applied we want the code in this directive to be the
      // ControlValueAccessor
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeInputDirective),
      multi: true
    },
    {
      // When this directive is applied we want the code in this directive to be the Validator
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateRangeInputDirective),
      multi: true
    }
  ]
})
export class DateRangeInputDirective extends AbstractInputDirective implements OnInit, Validator {

  @Input() before?: string = '';
  @Input() after?: string = '';

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  /**
   * @description
   * Convert a date in YYYY-MM-DD to MM/DD/YYYY
   *
   * @param date in ISO YYYY-MM-DD format
   * @return date in MM/DD/YYYY format
   */
  static isoToMmDdYyyy(iso: string): string {
    // get rid of anything but digits and slashes
    const valTrim = iso.trim().replace(/[^\d-/]+/g, '');
    // if there are digits
    if (valTrim.replace(/\//g, '').length) {
      // get the components of date
      const rangeDates = valTrim.split('-');
      const dateCmp1 = rangeDates[0] ? rangeDates[0].split('/') : [];
      const dateCmp2 = rangeDates[1] ? rangeDates[1].split('/') : [];
      // set the appropriate value
      return `${dateCmp1.length >= 3 ? dateCmp1[2] : ''}/` +
        `${dateCmp1.length >= 1 ? dateCmp1[0].padStart(2, '0') : ''}/` +
        `${dateCmp1.length >= 2 ? dateCmp1[1].padStart(2, '0') : ''} | ` +
        `${dateCmp2.length >= 3 ? dateCmp2[2] : ''}/` +
        `${dateCmp2.length >= 1 ? dateCmp2[0].padStart(2, '0') : ''}/` +
        `${dateCmp2.length >= 2 ? dateCmp2[1].padStart(2, '0') : ''}
        `;
    } else {
      return '';
    }
  }

  /**
   * @description
   * Convert a date in MM/DD/YYYY - MM/DD/YYYY to YYYY-MM-DD | YYYY-MM-DD
   *
   * @param date in MM/DD/YYYY - MM/DD/YYYY format
   *
   * @return date in ISO YYYY-MM-DD | YYYY-MM-DD format
   */
  static mmDdYyyyToIso(mmDdYyyy: string): string {
    // get rid of anything but digits and slashes
    const valTrim = mmDdYyyy.trim().replace(/[^\d-/]+/g, '');
    // if there are digits
    if (valTrim.replace(/\//g, '').length) {
      // get the components of date
      const rangeDates = valTrim.split('-');
      const dateCmp1 = rangeDates[0] ? rangeDates[0].split('/') : [];
      const dateCmp2 = rangeDates[1] ? rangeDates[1].split('/') : [];
      // set the appropriate value
      return `${dateCmp1.length >= 3 ? dateCmp1[2] : ''}-` +
        `${dateCmp1.length >= 1 ? dateCmp1[0].padStart(2, '0') : ''}-` +
        `${dateCmp1.length >= 2 ? dateCmp1[1].padStart(2, '0') : ''} | ` +
        `${dateCmp2.length >= 3 ? dateCmp2[2] : ''}-` +
        `${dateCmp2.length >= 1 ? dateCmp2[0].padStart(2, '0') : ''}-` +
        `${dateCmp2.length >= 2 ? dateCmp2[1].padStart(2, '0') : ''}
        `;
    } else {
      return '';
    }
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
    retVal += (digits.length >= 8) ? ' - ' : '';
    retVal += digits.slice(8, 10);
    retVal += (digits.length >= 10) ? '/' : '';
    retVal += digits.slice(10, 12);
    retVal += (digits.length >= 12) ? '/' : '';
    retVal += digits.slice(12, 16);
    return retVal;
  }

  ngOnInit(): void {
    // Inser the default icon
    if (this.foxInput.isReadOnly) {
      this.foxInput.preIconUrl = 'assets/img/calendar-252c37.svg';
    } else {
      this.foxInput.postIconUrl = 'assets/img/calendar-252c37.svg';
    }
  }

  onChange(event: Event): void {
    const value = event && event.target && event.target instanceof HTMLInputElement ? event.target.value : '';
    let val = value.replace(/[^\d]/g, '');
    val = DateRangeInputDirective.digitsToMmDdYyyy(val);
    this.domValue = val;
    this.changeValueTo(DateRangeInputDirective.mmDdYyyyToIso(val));
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
    return FoxValidators.mmddyyyyToIsoDateRangeValidator(control);
  }

  /**
   * @description
   * Transforms an ISO string to MM/DD/YYYY when it is bound to a field
   *
   * @param programmaticVal
   */
  transformToDomValue(programmaticVal: string | number | any[]): any {
    if (typeof programmaticVal === 'string') {
      // Convert an ISO date string to mm/dd/yyyy string
      return DateRangeInputDirective.isoToMmDdYyyy(programmaticVal);
    } else if (programmaticVal) {
      // If it's not a string, we kind of give up and let the validator call it incorrect
      return programmaticVal.toString();
    } else {
      return '';
    }
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    const val = this.domValue;
    if (!this.isValidChar(keyEvent.key)) {
      keyEvent.preventDefault();
    } else if (keyEvent.key === '/') {
      // We want to take note of when the user inserts a slash keystroke. It means that a single-digit number directly before it should have
      // a zero-padding added
      if (val.match(/^\d$/) && this.cursorPosition === val.length) {
        this.domValue = val.replace(/^(\d)$/, '0$1');
      } else if (val.match(/^\d{2}\/\d$/) && this.cursorPosition === val.length) {
        this.domValue = val.replace(/^(\d{2})\/(\d)$/, '$1/0$2');
      } else if (val.match(/^\d{2}\/\d{2}\/\d{4}\s\-\s\d$/) && this.cursorPosition === val.length) {
        this.domValue = val.replace(/^(\d{2})\/(\d{2})\/(\d{4})\s\-\s(\d)$/, '$1/$2/$3 - 0$4');
      } else if (val.match(/^\d{2}\/\d{2}\/\d{4}\s\-\s\d{2}\/\d$/) && this.cursorPosition === val.length) {
        this.domValue = val.replace(/^(\d{2})\/(\d{2})\/(\d{4})\s\-\s(\d{2})\/(\d)$/, '$1/$2/$3 - $4/0$5');
      } else if (val.match(/^\d\/\d$/) && this.cursorPosition === val.length) {
        this.domValue = val.replace(/^(\d)\/(\d)$/, '0$1/0$2');
      } else {
        keyEvent.preventDefault();
      }
    } else if (val.length >= 23) {
      keyEvent.preventDefault();
    }
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    let val = this.domValue;

    // We don't want to keep re-inserting stuff they're deleting, so ignore deletion keystrokes for updating the dom.
    // It will get fixed on change or next keyup. Still update the value to the rest of the program, though.
    if (keyEvent.key === 'Delete' || keyEvent.key === 'Backspace') {
      this.changeValueTo(DateRangeInputDirective.mmDdYyyyToIso(val));
      return;
    }

    // We want to process changes if it's a valid keypress that isn't a control key
    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;

      // Get where the cursor should be if we were to delete all the slashes
      let adjustedCursorPos = 20;
      if (initialCursorPos > 23) {
        adjustedCursorPos = 20;
      } else if (initialCursorPos >= 20) {
        adjustedCursorPos = initialCursorPos - 2;
      } else if (initialCursorPos >= 14) {
        adjustedCursorPos = initialCursorPos - 2;
      } else if (initialCursorPos >= 10) {
        adjustedCursorPos = initialCursorPos;
      } else if (initialCursorPos > 6) {
        adjustedCursorPos = initialCursorPos - 2;
      } else if (initialCursorPos > 5) {
        adjustedCursorPos = initialCursorPos - 2;
      } else if (initialCursorPos > 2) {
        adjustedCursorPos = initialCursorPos - 1;
      } else {
        adjustedCursorPos = initialCursorPos;
      }
      // Strip slashes and put them in the right places
      val = val.replace(/[^\d]/g, '');
      val = DateRangeInputDirective.digitsToMmDdYyyy(val);
      // Set the new slash position in the DOM
      this.domValue = val;

      // Get the proper cursor position now that slashes are back
      if (adjustedCursorPos >= 20) {
        this.cursorPosition = adjustedCursorPos + 3;
      } else if (adjustedCursorPos >= 14) {
        this.cursorPosition = adjustedCursorPos + 3;
      } else if (adjustedCursorPos >= 10) {
        this.cursorPosition = adjustedCursorPos + 3;
      } else if (adjustedCursorPos >= 6) {
        this.cursorPosition = adjustedCursorPos + 2;
      } else if (adjustedCursorPos >= 4) {
        this.cursorPosition = adjustedCursorPos + 2;
      } else if (adjustedCursorPos >= 2) {
        this.cursorPosition = adjustedCursorPos + 1;
      } else {
        this.cursorPosition = adjustedCursorPos;
      }

      // Call the change listener
      this.changeValueTo(DateRangeInputDirective.mmDdYyyyToIso(val));
    }
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/'].find(x => x === theChar);
  }
}

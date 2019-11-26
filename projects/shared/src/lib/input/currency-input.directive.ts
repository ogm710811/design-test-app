import {ChangeDetectorRef, Directive, forwardRef, Input, OnInit, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  selector: 'fox-input[type="fox-currency"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true
    }
  ]
})
export class CurrencyInputDirective extends AbstractInputDirective implements Validator, OnInit {

  @Input() maxDollarDigits = 0;

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  static stripNonDigitsAndDots(str: string): string {
    if (str) {
      return str.replace(/[^\d.]/g, '').replace(/(\d*\.\d*)(\.[\d\.]*)/g, '$1');
    } else {
      return '';
    }
  }

  /**
   * @description
   * Puts a number into a comma-by-thousands formatted string
   *
   * @param a number representing a dollar amount
   */
  static numberToFormattedString(num: number, suppressTrailingZero = false): string {
    const dollarsAndCents = num.toString().split('.');
    if (dollarsAndCents.length) {
      let dollars = dollarsAndCents[0];

      const cents = dollarsAndCents.length > 1 ? dollarsAndCents[1].slice(0, 2) : '';

      let formattedDollars = '';

      while (dollars.length > 3) {
        formattedDollars = ',' + dollars.slice(-3) + formattedDollars;
        dollars = dollars.slice(0, -3);
      }
      formattedDollars = dollars + formattedDollars;
      return `${formattedDollars}${cents ? '.' : ''}${cents.length === 1 && !suppressTrailingZero ? cents + '0' : cents}`;
    }
    return '';
  }

  /**
   * @description
   * Puts a comma-by-thousands formatted string to a number
   *
   * @param the formatted string to convert to a number
   */
  static formattedStringToNumber(str: string): number | undefined {
    if (!this.stripNonDigitsAndDots(str)) {
      return undefined;
    }
    return +this.stripNonDigitsAndDots(str);
  }

  ngOnInit(): void {
    if (!this.foxInput.preIconUrl) {
      this.foxInput.preIconUrl = 'assets/img/currency-black.svg';
    }
    if (this.maxDollarDigits > 3) {
      this.foxInput.length = Math.floor(+this.maxDollarDigits / 3) + this.maxDollarDigits;
    } else if (this.maxDollarDigits > 0 || this.maxDollarDigits < 4) {
      this.foxInput.length = this.maxDollarDigits;
    }
  }

  /**
   * @description
   * Convert a number or string to formatted string for DOM value
   *
   * @param programmaticVal the value we get from Angular to transform to the DOM
   */
  transformToDomValue(programmaticVal: string | number | any[] | object): any {
    if (typeof programmaticVal === 'string') {
      const digitOrDotString = programmaticVal.replace(/[^\d\.]/g, '');
      if (isNaN(+digitOrDotString)) {
        // case of multiple dots, we keep them all there
        return digitOrDotString;
      } else {
        return CurrencyInputDirective.numberToFormattedString(+digitOrDotString);
      }
    } else if (typeof programmaticVal === 'number') {
      return CurrencyInputDirective.numberToFormattedString(programmaticVal);
    } else {
      return programmaticVal.toString();
    }
  }

  onKeypress(keyEvent: KeyboardEvent): void {

    if (keyEvent.key === '.' && !this.foxInput.hasMaxLengthIncreased) {
      let tempLength = +this.foxInput.length;
      tempLength += 3;
      this.foxInput.length = tempLength;
      this.foxInput.hasMaxLengthIncreased = true;
    }

    const decimalPointIndex = this.domValue ? this.domValue.toString().indexOf('.') : -1;
    if (!this.isValidChar(keyEvent.key)) {
      keyEvent.preventDefault();
    } else if (keyEvent.key === '.' && decimalPointIndex > -1) {
      keyEvent.preventDefault();
    } else if (this.cursorPosition !== undefined && decimalPointIndex > -1) {
      // if the cursor is after the decimal point
      if ((this.cursorPosition > decimalPointIndex) &&
        // and there are not still decimal places to be added
        this.domValue && this.domValue.length - 3 >= decimalPointIndex) {
        keyEvent.preventDefault();
      }
    }
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    // Convert DOM value to number
    let val = this.domValue;

    const bumpCursor = val.indexOf('.') === 0;
    const numVal = CurrencyInputDirective.formattedStringToNumber(val);
    // We don't want to keep re-inserting stuff they're deleting, nor do we want to immediately
    // erase a decimal point before we get the chance to add numbers behidn it,
    // so ignore these keystrokes. It will get fixed on change or next keyup
    if (keyEvent.key === '.' || keyEvent.key === 'Delete' || keyEvent.key === 'Backspace') {
      this.changeValueTo(numVal);
      return;
    }

    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;
      let adjustedCursorPos = val.length;

      // Figure out the cursor position if we remove all commas
      const dollarsVsCents = val.split('.');

      if (dollarsVsCents.length) {
        const commaSeparated = dollarsVsCents[0].split(',');
        let idx = 0;
        let runningDigitCount = commaSeparated[idx].length;
        // Every time we see a comma before the cursor, subtract one for the cursor position on the
        // number without commas
        while (initialCursorPos > (runningDigitCount + idx) && (idx + 1 < commaSeparated.length)) {
          idx++;
          runningDigitCount += commaSeparated[idx].length;
        }
        adjustedCursorPos = initialCursorPos - idx;
      }

      const domVal = (this.domValue || '').toString();
      // Set the DOM string
      val = (numVal && !isNaN(numVal))
        ? CurrencyInputDirective.numberToFormattedString(numVal, (this.cursorPosition === domVal.length && keyEvent.key !== '0'))
        : domVal;

      let commaIdx = 0;
      // Figure out our ending cursor position after we've updated the formatting of the DOM
      const newDollarsAndCents = val.split('.');
      if (newDollarsAndCents.length) {
        const newCommaSeparated = newDollarsAndCents[0].split(',');
        if (newCommaSeparated.length) {
          let runningDigitCount = newCommaSeparated[commaIdx].length;
          while (adjustedCursorPos > (runningDigitCount - commaIdx) && (commaIdx + 1 < newCommaSeparated.length)) {
            commaIdx++;
            runningDigitCount += newCommaSeparated[commaIdx].length;
          }
        }
      }

      let newCents = '';
      if (newDollarsAndCents.length === 2) {
        newCents = newDollarsAndCents[1].toString();
      }

      let oldCents = '';
      if (dollarsVsCents.length === 2) {
        oldCents = dollarsVsCents[1].toString();
      }

      if (dollarsVsCents.length === 2 && newDollarsAndCents.length === 2) {
        val = val.replace('.' + newCents, '.' + oldCents);
      } else if (dollarsVsCents.length === 2 && newDollarsAndCents.length === 1) {
        val = val + '.' + oldCents;
      }

      const origDomValue = this.domValue;
      // If the cursor is at the end and
      this.domValue = val;
      this.cursorPosition = adjustedCursorPos + commaIdx;
      // If we're going to get the 0 left hand side added, bump the cursor by one
      if (this.cursorPosition !== undefined && ((this.cursorPosition + 1) <= (origDomValue || '').toString().length) && bumpCursor) {
        this.cursorPosition++;
      }
      // Call the listeners
      this.changeValueTo(numVal);
    }
  }

  onChange(event: Event): void {
    let value = event && event.target && event.target instanceof HTMLInputElement ? event.target.value : '';
    const numVal = CurrencyInputDirective.formattedStringToNumber(value);
    value = (numVal && !isNaN(numVal)) ? CurrencyInputDirective.numberToFormattedString(numVal) : (numVal ? this.domValue : '');
    this.domValue = value;
    this.changeValueTo(numVal);
  }

  onInput(): void {
    if (this.foxInput.hasMaxLengthIncreased && !this.foxInput.inputValue.includes('.')) {
      let tempLength = +this.foxInput.length;
      tempLength -= 3;
      this.foxInput.length = tempLength;
      this.foxInput.hasMaxLengthIncreased = false;
    }
    return;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control && control.value && typeof control.value === 'string') {
      const numVal = CurrencyInputDirective.formattedStringToNumber(control.value);
      if (numVal === undefined || isNaN(numVal)) {
        return {
          currency: 'Currency Value Is Invalid, Enter a Number with Two Decimal Places'
        };
      }
    }
    return null;
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Del'].find(x => x === theChar);
  }
}

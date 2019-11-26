import {ChangeDetectorRef, Directive, forwardRef, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  selector: 'fox-input[type="fox-phone"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneNumInputDirective),
      multi: true
    }
  ]
})
export class PhoneNumInputDirective extends AbstractInputDirective implements Validator {

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  static formattedString(str: string): string | undefined {
    if (!this.stripNonDigits(str)) {
      return undefined;
    }
    return this.stripNonDigits(str);
  }

  static generatePhoneNum(num: string): string {
    if (num.length > 3 && num.length < 7) {
      return num.replace(/(\d{3})(\d)/, '$1-$2');
    } else if (num.length > 6 && num.length < 9) {
      return  num.replace(/(\d{3})(\d)/, '$1-$2');
    } else if (num.length > 8) {
      num = num.replace(/-/g, '');
      return num.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');
    } else {
      return num;
    }
  }

  static stripNonDigits(str: string): string {
    str.replace(/[^\d]/g, '');
    return str;
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    if (keyEvent.key === 'Backspace' || keyEvent.key === 'Delete') {
      this.changeValueTo(PhoneNumInputDirective.formattedString(this.domValue));
      return;
    }
    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      let val = this.domValue.replace(/ /g, '');
      // Get where the cursor should be if we were to delete all the slashes
      const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;
      const numVal = PhoneNumInputDirective.formattedString(val);
      val = numVal ? PhoneNumInputDirective.generatePhoneNum(numVal) : '';
      this.changeVal(val);
      this.domValue = val.slice(0, 12);
      this.changeValueTo(numVal);
    }
  }

  onChange(event: Event): void {
    const value = event && event.target && event.target instanceof HTMLInputElement ? event.target.value : '';
    let val = value.replace(/[^\d]/g, '');
    const numVal = PhoneNumInputDirective.formattedString(val);
    val = numVal ? PhoneNumInputDirective.generatePhoneNum(numVal) : '';
    this.domValue = val;
    this.changeValueTo(PhoneNumInputDirective.formattedString(this.domValue));
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control && control.value && (typeof control.value === 'string')) {
      const value = control.value.replace(/-/g, '');
      if (value.match(/\d{10}/)) {
        return null;
      }
      return {
        'phone-number': 'Phone Number must be ten digits'
      };
    }
    return null;
  }

  onInput(event: Event): void {
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    if (!this.isValidChar(keyEvent.key)) {
      keyEvent.preventDefault();
    } else if (this.domValue.length >= 12 && this.cursorPosition !== undefined && this.cursorPosition >= 12) {
      keyEvent.preventDefault();
    }
  }

  transformToDomValue(programmaticVal: string | number | any[] | object): any {
    return typeof programmaticVal === 'string' ? PhoneNumInputDirective.generatePhoneNum(programmaticVal) : '';
  }

  changeVal(val: string): any {
    val = val.replace(/-/g, '');
    val = val.slice(0, 10);

    if (val.length > 3 && val.length < 7) {
      return val.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (val.length > 6) {
      return val.replace(/(\d{3})(\d{3})(\d{4})(\d*)/, '$1-$2-$3');
    } else {
      return val;
    }
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].find(x => x === theChar);
  }
}

import {ChangeDetectorRef, Directive, forwardRef, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  selector: 'fox-input[type="fox-claim"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClaimNoInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClaimNoInputDirective),
      multi: true
    }
  ]
})
export class ClaimNoInputDirective extends AbstractInputDirective implements Validator {

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput?: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  static formattedString(str: string): string | undefined {
    if (!this.stripNonDigits(str)) {
      return undefined;
    }
    return this.stripNonDigits(str);
  }

  static generateClaimNum(num: string): string {
    if (num.length >= 12) {
      return num.replace(/(\d{5})(\d{6})(\d)(\d*)/, '$1-$2-$3');
    } else if (num.length > 5) {
      return num.replace(/(\d{5})(\d)/, '$1-$2');
    } else {
      return num;
    }
    return '';
  }

  static stripNonDigits(str: string): string {
    str.replace(/[^\d]/g, '');
    return str;
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    if (keyEvent.key === 'Backspace' || keyEvent.key === 'Delete') {
      this.changeValueTo(ClaimNoInputDirective.formattedString(this.domValue));
      return;
    }
    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      let val = this.domValue.replace(/ /g, '');
      const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;
      const numVal = ClaimNoInputDirective.formattedString(val);
      val = numVal ? ClaimNoInputDirective.generateClaimNum(numVal) : '';
      this.domValue = val;
      this.cursorPosition = initialCursorPos === 6 ? 7 : initialCursorPos === 13 ? 14 : initialCursorPos;
      this.changeValueTo(numVal);
    }
  }

  onChange(event: Event): void {
    const value = event && event.target && event.target instanceof HTMLInputElement ? event.target.value : '';
    let val = value.replace(/[^\d]/g, '');
    const numVal = ClaimNoInputDirective.formattedString(val);
    val = numVal ? ClaimNoInputDirective.generateClaimNum(numVal) : '';
    this.domValue = val;
    this.changeValueTo(numVal);
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control && control.value && (typeof control.value === 'string')) {
      if (control.value.match(/\d{11}/)) {
        return null;
      }
      if (control.value.match(/\d{12}/)) {
        return null;
      }
      if (this.foxInput && this.foxInput.isCrossReferenceField) {
        return {
          'cross-ref-number': 'Cross reference Number must be eleven digits'
        };
      }
      return {
        'claim-number': 'Claim Number must be eleven or twelve digits'
      };
    }
    return null;
  }

  onInput(event: Event): void {
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    if (!this.isValidChar(keyEvent.key)) {
      keyEvent.preventDefault();
    } else if (this.domValue.length >= 14 && this.cursorPosition !== undefined && this.cursorPosition >= 14) {
      keyEvent.preventDefault();
    }
  }

  transformToDomValue(programmaticVal: string | number | any[] | object): any {
    return typeof programmaticVal === 'string' ? ClaimNoInputDirective.generateClaimNum(programmaticVal) : '';
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].find(x => x === theChar);
  }
}

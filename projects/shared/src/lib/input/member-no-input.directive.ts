import {ChangeDetectorRef, Directive, forwardRef, Optional, Renderer2} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  selector: 'fox-input[type="fox-membership"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MemberNoInputDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MemberNoInputDirective),
      multi: true
    }
  ]
})
export class MemberNoInputDirective extends AbstractInputDirective implements Validator {

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  static stripNonDigits(str: string): string {
    str.replace(/[^\d]/g, '');
    return str;
  }

  static formattedString(str: string): string | undefined {
    if (!this.stripNonDigits(str)) {
      return undefined;
    }
    return this.stripNonDigits(str);
  }

  static generateMemberNum(num: string): string {
    if (num.length >= 11) {
      return num.replace(/(\d{9})(\d)(\d)(\d*)/, '$1 $2 $3');
    } else if (num.length === 10) {
      return num.replace(/(\d{9})(\d)/, '$1 $2');
    } else {
      return num;
    }
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    if (keyEvent.key === 'Backspace' || keyEvent.key === 'Delete') {
      this.changeValueTo(MemberNoInputDirective.formattedString(this.domValue));
      return;
    }
    if (!keyEvent.altKey && !keyEvent.ctrlKey && this.isValidChar(keyEvent.key)) {
      let val = this.domValue.replace(/ /g, '');
      // Get where the cursor should be if we were to delete all the slashes
      const initialCursorPos = this.cursorPosition === undefined ? val.length : this.cursorPosition;
      const numVal = MemberNoInputDirective.formattedString(val);
      val = numVal ? MemberNoInputDirective.generateMemberNum(numVal) : '';
      this.domValue = val;
      this.cursorPosition = initialCursorPos === 10 ? 11 : initialCursorPos === 12 ? 13 : initialCursorPos;
      this.changeValueTo(numVal);
    }
  }

  onChange(event: Event): void {
    let value = event && event.target && event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement ? event.target.value : '';

    const numVal = MemberNoInputDirective.formattedString(value);
    value = numVal ? MemberNoInputDirective.generateMemberNum(numVal) : '';
    this.domValue = value;
    this.changeValueTo(numVal);
  }

  onInput(event: Event): void {
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    if (keyEvent.keyCode !== 8 && keyEvent.keyCode !== 13 && keyEvent.keyCode !== 9) {
      if (!this.isValidChar(keyEvent.key)) {
        keyEvent.preventDefault();
      } else if (this.domValue.length >= 13 && this.cursorPosition !== undefined && this.cursorPosition >= 13) {
        keyEvent.preventDefault();
      }
    }
  }

  transformToDomValue(programmaticVal: string | number | any[] | object): any {
    return typeof programmaticVal === 'string' ? MemberNoInputDirective.generateMemberNum(programmaticVal) : '';
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control && control.value && (typeof control.value === 'string')) {
      if (control.value.match(/\d{9,11}/)) {
        return null;
      }
      return {
        'member-number': 'Member Number must be 9-11 digits'
      };
    }
    return null;
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].find(x => x === theChar);
  }
}

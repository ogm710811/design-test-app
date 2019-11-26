import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgControl, NgForm, ValidationErrors} from '@angular/forms';
import * as uuidNS from 'uuid';

const uuid = uuidNS;

@Component({
  selector: 'fox-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements AfterViewInit {
  @Input() id?: string = uuid();
  @Input() autoFocus?: boolean;
  @Input() name?: string;
  @Input() labelText?: string;
  @Input() labelExtraText?: string;
  @Input() type: 'fox-date' | 'fox-date-range' | 'fox-currency' | 'fox-membership' | 'fox-claim' | 'fox-phone' | 'fox-number' | 'text' | 'textarea' = 'text';
  @Input() assistiveText?: string;
  @Input() placeholder?: string = '';
  @Input() size?: number;
  @Input() preIconUrl?: string;
  @Input() postIconUrl?: string;
  @Input() inputValue?: any;
  @Input() length = 1000;
  @Input() isReadOnly = false;
  @Input() isReadOnlyNoPaddingLeftRight = false;
  @Input() textareaHasStyle ?: boolean;
  @Input() isCrossReferenceField: boolean = false;
  @Input() isFullHeight = false;
  @Input() isWarningState = false;
  @Input() largerTextArea: boolean = false;
  @Input() textAreaWidth?: number;
  @Input() textareaRows: number = 7;

  @Output() keypress: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() keyup: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() input: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() disabledState: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputField') inputField?: ElementRef;

  isDisabled: boolean = false;
  hasFocus: boolean = false;
  hasMaxLengthIncreased = false;
  private _control?: AbstractControl;

  get errors(): ValidationErrors | null {
    // If there's no control, we can't get at any errors, so we assumer there's none.
    if (!this._control) {
      return null;
    }
    // We don't want to show errors when we have focus because we want the user to finish
    // interacting first
    if (this.hasFocus) {
      return null;
    }
    // If the control's untouched, we move on to checking top-level form submission status
    if (this._control.untouched) {
      // If there's no top-level form, we don't worry about submitted status, and since we're
      // already untouched, we return null, because we only want to display errors for touched
      // or submitted fields
      if (!this.formGroupDirective && !this.ngForm) {
        return null;
      }
      // If we've got a formGroupDirective and it hasn't been submitted, we suppress errors
      if (this.formGroupDirective && !this.formGroupDirective.submitted) {
        return null;
      }
      // If we've got an ngForm and it hasn't been submitted, we suppress errors
      if (this.ngForm && !this.ngForm.submitted) {
        return null;
      }
    }
    return this._control ? this._control.errors : null;
  }

  get errorKeys(): string[] {
    return Object.keys(this.errors || {});
  }

  get value(): any {
    if (this.inputField && this.inputField.nativeElement) {
      return this.inputField.nativeElement.value;
    }
    return undefined;
  }

  set value(val: any) {
    this.cdRef.markForCheck();
    if (this.inputField && this.inputField.nativeElement) {
      this.inputField.nativeElement.value = val;
    }
  }

  constructor(
    private injector: Injector,
    private cdRef: ChangeDetectorRef,
    @Optional() private formGroupDirective?: FormGroupDirective,
    @Optional() private ngForm?: NgForm
  ) {
  }

  ngAfterViewInit(): void {
    // Inject the ngControl (FormControl or NgModel) once it exists (after html exists) so that we
    // can get at the errors for the control
    // Focus when autoFocus = true
    this.length = (!this.length || this.length === 0) ? 10000 : this.length;
    if (this.autoFocus && this.inputField && this.inputField.nativeElement) {
      this.inputField.nativeElement.focus();
    }
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this._control = ngControl.control as FormControl;
      if (this._control.status === 'DISABLED' || this._control.status === 'PENDING') {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
      this.disabledState.emit(this._control.status);
      this.cdRef.detectChanges();

      this._control.statusChanges.subscribe(statusChanges => {
        if (statusChanges === 'DISABLED' || statusChanges === 'PENDING') {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
        this.disabledState.emit(statusChanges);
        this.cdRef.detectChanges();
      });
      if (this.autoFocus && this.inputField && this.inputField.nativeElement) {
        this.inputField.nativeElement.focus();
      }
    }
  }

  getControl(): AbstractControl | undefined {
    return this._control;
  }

  // Pass these events from the child <input> element through
  onInputChange(event: Event): void {
    this.change.emit(event);
  }

  onInputKeypress(keyEvent: KeyboardEvent): void {
    this.keypress.emit(keyEvent);
  }

  onInputKeyup(keyEvent: KeyboardEvent): void {
    this.keyup.emit(keyEvent);
  }

  onInputFocus(focusEvent: FocusEvent): void {
    this.hasFocus = true;
    this.focus.emit(focusEvent);
  }

  onInputBlur(focusEvent: FocusEvent): void {
    this.hasFocus = false;
    this.blur.emit(focusEvent);
  }

  onInputInput(event: Event): void {
    this.input.emit(event);
  }

  showErrors(errorKey: string): string | null {
    const error = this.errors && errorKey in this.errors && this.errors[errorKey] ? this.errors[errorKey] : null;
    if (error === null) {
      return error;
    }
    if (typeof error === 'string') {
      return error;
    } else {
      return this.getError(errorKey, error);
    }
  }

  getError(errorKey: string, error: any): string {
    let errorMessage = '';
    errorKey = errorKey.toLowerCase();
    switch (errorKey) {
      case 'required': {
        errorMessage = ' is required';
        break;
      }
      case 'minlength': {
        errorMessage = ' must have at least ' + error.requiredLength + ' characters';
        break;
      }
      case 'maxlength': {
        errorMessage = ' cannot have more than ' + error.requiredLength + ' characters';
        break;
      }
      case 'pattern': {
        if (error.requiredPattern.match('^[a-zA-Z0-9]*$') || error.requiredPattern.match('^[a-zA-Z0-9\\,?\\s?]*$')) {
          errorMessage = ' must be alphanumeric';
        } else {
          errorMessage = ' is not in the correct format';
        }
        break;
      }
      default: {
        errorMessage = ' is invalid';
        break;
      }
    }
    return (this.labelText || 'Field') + errorMessage;
  }
}

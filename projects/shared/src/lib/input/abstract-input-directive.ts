import {AfterViewInit, ChangeDetectorRef, Renderer2} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {InputComponent} from './input.component';

/**
 * Base class for directives that modify the behavior of the fox-input component
 * @see InputComponent
 */
export abstract class AbstractInputDirective implements ControlValueAccessor, AfterViewInit {

  // Wrap DOM updates for shortcuts & clarity
  get domValue(): any {
    return this.foxInput ? this.foxInput.value : undefined;
  }

  set domValue(x: any) {
    if (this.foxInput) {
      this.foxInput.value = x;
    }
  }

  // Store change and blur listeners of ControlValueAccessor so we don't need to repeat it in child
  // classes
  protected changeListener: (x: any) => void;

  protected blurListener: () => void;

  protected previousValue: string = '';

  /************************************************************************************************
   * @description
   * Parent constructor
   *
   * @param The fox-input component that will be injected by the child directive
   *        The child must call this constructor.
   ***********************************************************************************************/
  protected constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    protected foxInput?: InputComponent
  ) {
    this.changeListener = () => {
    };
    this.blurListener = () => {
    };
  }

  changeValueTo(x: any): void {
    if (x !== this.previousValue) {
      this.changeListener(x);
      this.previousValue = x;
    }
  }

  /************************************************************************************************
   * @description
   * Shortcut getter for the underlying fox-input's input field.
   * @return The actual HTML input element of the fox-input modified by this directive
   ***********************************************************************************************/
  get inputElement(): HTMLInputElement | HTMLTextAreaElement | null {
    return this.foxInput && this.foxInput.inputField && this.foxInput.inputField.nativeElement ? this.foxInput.inputField.nativeElement : null;
  }

  /************************************************************************************************
   * @description
   * The current start of the selection area within the fox-input component that is being modified
   * by this directive
   *
   * @return The starting cursor caret position or null if there is no selection
   ***********************************************************************************************/
  get selectionStart(): number | null {
    return this.inputElement ? this.inputElement.selectionStart : null;
  }

  /************************************************************************************************
   * @description
   * The current end of the selection area within the fox-input component that is being modified
   * by this directive
   *
   * @return The ending cursor caret position or null if there is no selection
   ***********************************************************************************************/
  get selectionEnd(): number | null {
    return this.inputElement ? this.inputElement.selectionEnd : null;
  }

  /************************************************************************************************
   * @description
   * The cursor position of the fox-input. The cursor position is only returned when the selection
   * start and end are both present and are equal. Otherwise there is no cursor-position per-se
   * because the user would overwrite the selection.
   *
   * @return The ending cursor caret position or null if there is no selection
   ***********************************************************************************************/
  get cursorPosition(): number | undefined {
    if (this.selectionStart !== null && this.selectionEnd !== null && this.selectionStart !== this.selectionEnd) {
      return undefined;
    }

    let cursorPos = 0;

    if (this.selectionStart || this.selectionStart === 0) {
      cursorPos = this.selectionStart;
    }

    return cursorPos;
  }

  set cursorPosition(cursorPos: number | undefined) {
    if (cursorPos === undefined) {
      return;
    }

    const elem = this.inputElement;

    if (elem != null) {
      if (elem.selectionStart) {
        elem.focus();
        elem.setSelectionRange(cursorPos, cursorPos);
      } else {
        elem.focus();
      }
      this.cdRef.markForCheck();
    }
  }

  /*************************************************************************************************
   * @description
   * Implementation of the ControlValueAccessor registerOnChange function. Saves this function to
   * be executed when the value output from this field changes.
   *
   * @see ControlValueAccessor
   *
   * @param fn A void function that is fired when the value changes
   ************************************************************************************************/
  registerOnChange(fn: (x: any) => void): void {
    this.changeListener = fn;
  }

  /*************************************************************************************************
   * @description
   * Implementation of the ControlValueAccessor registerOnTouched function. Saves this function to
   * be executed when the field is touched.
   *
   * @see ControlValueAccessor
   *
   * @param fn A void function that is fired when the field is touched
   ************************************************************************************************/
  registerOnTouched(fn: any): void {
    this.blurListener = fn;
  }

  /*************************************************************************************************
   * @description
   * Implementation of the ControlValueAccessor setDisabled function. Sets the DOM element's
   * disabled state
   *
   * @see ControlValueAccessor
   *
   * @param New disabled state for DOM element
   ************************************************************************************************/
  setDisabledState(isDisabled: boolean): void {
    if (this.foxInput && this.foxInput.inputField && this.foxInput.inputField.nativeElement) {
      this.renderer.setProperty(this.foxInput.inputField.nativeElement, 'disabled', isDisabled);
      this.cdRef.markForCheck();
    }
  }

  /*************************************************************************************************
   * @description
   * Implementation of the ControlValueAccessor writeValue function. Takes a value set
   * programmatically in Angular and puts it into the DOM with appropriate transformations
   *
   * @see ControlValueAccessor
   *
   * @param The value from Angular to write to the DOM
   ************************************************************************************************/
  writeValue(val: any): void {
    if (typeof val === 'undefined' || (typeof val === 'number' && isNaN(val)) || (typeof val === 'object' && val === null)) {
      this.domValue = '';
    } else {
      this.domValue = this.transformToDomValue(val);
    }
    this.cdRef.markForCheck();
  }

  /*************************************************************************************************
   * @description
   * Implementation of the AfterViewInit lifecycle hook. Executes after the DOM has loaded for the
   * Angular component. Here it subscribes to the fox-input's various underlying input listeners
   *
   * @see AfterViewInit
   ************************************************************************************************/
  ngAfterViewInit(): void {
    if (this.foxInput) {
      this.foxInput.keyup.subscribe((ke: KeyboardEvent) => {
        this.onKeyup(ke);
      });
      this.foxInput.change.subscribe((e: Event) => {
        this.onChange(e);
      });
      this.foxInput.blur.subscribe((fe: FocusEvent) => {
        this.onBlur(fe);
      });
      this.foxInput.input.subscribe((e: Event) => {
        this.onInput(e);
      });
      this.foxInput.keypress.subscribe((ke: KeyboardEvent) => {
        this.onKeypress(ke);
      });
      this.foxInput.disabledState.subscribe((disabledEnabled: string) => {
        this.setDisabledState(disabledEnabled === 'DISABLED' ? true : false);
      });
    }
  }

  /*************************************************************************************************
   * @description
   * Default listener for the blur event of the fox-input. Calls the blurListener set in
   * registerOnTouched
   *
   * @see registerOnTouched
   *
   * @param The FocusEvent from the DOM
   ************************************************************************************************/
  onBlur(focusEvent: FocusEvent): void {
    if (this.blurListener) {
      this.blurListener();
    }
  }

  /*************************************************************************************************
   * @description
   * Abstract method requiring a keypress handler for a fox-input directive
   *
   * @see InputComponent
   *
   * @param The KeyboardEvent from the DOM
   ************************************************************************************************/
  abstract onKeypress(keyEvent: KeyboardEvent): void;

  /*************************************************************************************************
   * @description
   * Abstract method requiring a keyup handler for a fox-input directive
   *
   * @see InputComponent
   *
   * @param The KeyboardEvent from the DOM
   ************************************************************************************************/
  abstract onKeyup(keyEvent: KeyboardEvent): void;

  /*************************************************************************************************
   * @description
   * Abstract method requiring a change handler for a fox-input directive
   *
   * @see InputComponent
   *
   * @param The Event from the DOM
   ************************************************************************************************/
  abstract onChange(event: Event): void;

  /*************************************************************************************************
   * @description
   * Abstract method requiring a input handler for a fox-input directive
   *
   * @see InputComponent
   *
   * @param The Event from the DOM
   ************************************************************************************************/
  abstract onInput(event: Event): void;

  /*************************************************************************************************
   * @description
   * Takes the value from Angular and returns the value as we wish it to appear in the DOM. To be
   * implemented by children based upon the content and representation in Angular that we wish to
   * see.
   *
   * @param programmaticVal Value from Angular we wish to transform
   *         Note: the type will have been checked for undefined or null at this point.
   ************************************************************************************************/
  abstract transformToDomValue(programmaticVal: string | number | any[] | object): any;
}

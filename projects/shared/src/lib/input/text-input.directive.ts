import {ChangeDetectorRef, Directive, forwardRef, Optional, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'fox-input[type="text"],fox-input:not([type]),fox-input[type="textarea"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputDirective),
      multi: true
    }
  ]
})
export class TextInputDirective extends AbstractInputDirective {

  constructor(
    @Optional()
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    protected foxInput?: InputComponent,
  ) {
    super(renderer, cdRef, foxInput);
  }

  onKeypress(keyEvent: KeyboardEvent): void {
  }

  onInput(event: Event): void {
    const inputField: HTMLInputElement | HTMLTextAreaElement | undefined =
      event.target ?
        (this.foxInput && this.foxInput.type === 'textarea' ?
          event.target as HTMLTextAreaElement :
          event.target as HTMLInputElement) : undefined;
    if (inputField) {
      this.changeValueTo(inputField.value);
    }
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    return;
  }

  onChange(event: Event): void {
    return;
  }

  transformToDomValue(programmaticVal: string | number | any[] | object): string {
    return programmaticVal.toString();
  }

}

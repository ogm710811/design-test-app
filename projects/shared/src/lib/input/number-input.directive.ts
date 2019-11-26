import {ChangeDetectorRef, Directive, forwardRef, Optional, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractInputDirective} from './abstract-input-directive';
import {InputComponent} from './input.component';

@Directive({
  selector: 'fox-input[type="fox-number"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputDirective),
      multi: true
    }
  ]
})
export class NumberInputDirective extends AbstractInputDirective {

  constructor(
    protected renderer: Renderer2,
    protected cdRef: ChangeDetectorRef,
    @Optional() protected foxInput: InputComponent
  ) {
    super(renderer, cdRef, foxInput);
  }

  onKeypress(keyEvent: KeyboardEvent): void {
    if (!this.isValidChar(keyEvent.key)) {
      keyEvent.preventDefault();
    }
  }

  onInput(event: Event): void {
    const inputField: HTMLInputElement | undefined = event.target ? event.target as HTMLInputElement : undefined;
    this.changeValueTo(inputField ? inputField.value : null);
  }

  onKeyup(keyEvent: KeyboardEvent): void {
    return;
  }

  onChange(event: Event): void {
    return;
  }

  transformToDomValue(programmaticVal: string | number): number {
    return Number(programmaticVal);
  }

  private isValidChar(theChar: string): boolean {
    return !!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].find(x => x === theChar);
  }

}

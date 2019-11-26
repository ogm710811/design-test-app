import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[foxNumbers]'
})
export class NumbersDirective {

  constructor(public el: ElementRef) {

    this.el.nativeElement.onkeypress = (evt: KeyboardEvent) => {
      const charCode = (evt.which) ? evt.which : evt.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      }
    };
  }
}

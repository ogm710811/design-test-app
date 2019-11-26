import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[foxFormatMemberDirective]'
})
export class FormatMemberDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown') onBlur(): void {
    const value: string = this.el.nativeElement.value.replace(/ /g, '');
    this.el.nativeElement.value = value.replace(/^(.{9})(.{1})(.*)$/, '$1 $2 $3');
  }

}

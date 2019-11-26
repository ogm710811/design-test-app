import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[foxHeaderSubtitle]',
})
export class PageHeaderSubtitleDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[foxHeaderRight]',
})
export class PageHeaderRightDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[foxTableExpandRow]',
})
export class TableExpandRowDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

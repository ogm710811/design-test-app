import { ElementRef, ViewChild } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap';

export abstract class TooltipMenuBase {
  @ViewChild('tooltip') public tooltip?: TooltipDirective = undefined;
  @ViewChild('tooltip', { read: ElementRef })
  public tooltipElem!: ElementRef;

  public close(e?: FocusEvent): void {
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }
}

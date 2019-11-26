import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[foxCdkDetailRow]'
})
export class CdkDetailRowDirective implements OnChanges {
  private row: any = {};
  private tRef?: TemplateRef<any>;

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return !!this.row;
  }

  @Input()
  set foxCdkDetailRow(value: any) {
    if (value !== this.row) {
      this.row = value;
    }
  }

  @Input('cdkDetailRowTpl')
  set template(value: TemplateRef<any>) {
    if (value !== this.tRef) {
      this.tRef = value;
    }
  }

  constructor(public vcRef: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && (changes.foxCdkDetailRow || changes.cdkDetailRowTpl)) {
      this.render();
    }
  }

  private render(): void {
    this.vcRef.clear();
    if (this.tRef && this.row) {
      this.vcRef.createEmbeddedView(this.tRef, {$implicit: this.row});
    }
  }
}

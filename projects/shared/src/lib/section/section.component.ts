import {Component, Input} from '@angular/core';

@Component({
  selector: 'fox-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() drawRectangleNoBottomPadding = false;
  @Input() paddingBottom23px = false;
  @Input() drawRectangle = !this.drawRectangleNoBottomPadding && !this.paddingBottom23px;
  @Input() bootstrapRow = false;
  @Input() noPadding = false;
  @Input() borderLeftBlue = false;
  @Input() borderTopBlue = false;
  @Input() overflowDisabled = false;
  @Input() noOverFlowX = false;

  constructor() {
  }
}

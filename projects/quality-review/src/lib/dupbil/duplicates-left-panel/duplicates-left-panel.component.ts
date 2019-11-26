import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'fox-duplicates-left-panel',
  templateUrl: './duplicates-left-panel.component.html',
  styleUrls: ['./duplicates-left-panel.component.css']
})
export class DuplicatesLeftPanelComponent implements OnChanges {
  @Input() claimNumber: number = 0;
  @Input() incomingChargeData: any = [];
  @Input() leftPanelCount: number = 0;

  mapped: any = {};
  count: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('incomingChargeData' in changes || 'leftPanelCount' in changes) {
      if (this.incomingChargeData) {
        if (this.leftPanelCount < this.incomingChargeData.length) {
          this.mapped = Object.keys(this.incomingChargeData[this.leftPanelCount]).map(key => ({
            type: key,
            value: this.incomingChargeData[this.leftPanelCount][key]
          }));
        }
      }
    }
  }

  leftPanel(mapped: any): any {
   return mapped.value;
  }
}

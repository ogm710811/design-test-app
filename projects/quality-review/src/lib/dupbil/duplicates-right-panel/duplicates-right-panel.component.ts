import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'fox-duplicates-right-panel',
  templateUrl: './duplicates-right-panel.component.html',
  styleUrls: ['./duplicates-right-panel.component.css']
})
export class DuplicatesRightPanelComponent implements OnChanges {
  @Input() claimNumber: number = 0;
  @Input() tableData: any = {};
  tableDataArr: any = [];
  selectedVal: number = 0;
  claimNumberVal: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('tableData' in changes) {
      this.tableDataArr = [];
      if (this.tableData) {
        this.tableData.forEach((key: string, value: any) => {
          this.tableDataArr.push(Object.values(key));
        });
      }
    }
  }

  getRightData(ind: number): void {
    this.selectedVal = ind ;
    this.claimNumberVal = ind === this.selectedVal ? this.claimNumber.toString() : '';
  }
}

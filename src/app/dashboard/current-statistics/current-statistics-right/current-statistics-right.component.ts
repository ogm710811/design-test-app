import {Component, Input} from '@angular/core';
import {PageHeaderRightComponent} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';

@Component({
  selector: 'fox-current-statistics-right',
  templateUrl: './current-statistics-right.component.html',
  styleUrls: ['./current-statistics-right.component.css']
})
export class CurrentStatisticsRightComponent implements PageHeaderRightComponent {

  @Input() data: any;
  constructor(
    private pageHeaderService: PageHeaderService
  ) {}

  clickBtn(item: string): void {
    this.pageHeaderService.emitBtnClickEvent(item);
  }
}

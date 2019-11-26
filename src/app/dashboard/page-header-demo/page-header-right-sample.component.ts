import {Component, Input} from '@angular/core';
import {PageHeaderRightComponent, PageHeaderService} from '@fox/shared';

@Component({
  templateUrl: './page-header-right-sample.component.html',
  styleUrls: ['./page-header-right-sample.component.css'],
})

export class PageHeaderRightSampleComponent implements PageHeaderRightComponent {
  @Input() data: any;

  constructor (private pageHeaderService: PageHeaderService) {
  }

  clickBtn(item): void {
    this.pageHeaderService.emitBtnClickEvent(item);
  }
}

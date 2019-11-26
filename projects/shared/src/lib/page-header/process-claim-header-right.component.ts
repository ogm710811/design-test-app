import {Component, Input} from '@angular/core';
import {PageHeaderService} from './page-header.service';

@Component({
  templateUrl: './process-claim-header-right.component.html',
  styleUrls: ['./process-claim-header-right.component.css'],
})

export class ProcessClaimHeaderRightComponent {
  @Input() data: any;

  constructor (private pageHeaderService: PageHeaderService) {
  }

  clickBtn(item: any): void {
    this.pageHeaderService.emitBtnClickEvent(item);
  }
}

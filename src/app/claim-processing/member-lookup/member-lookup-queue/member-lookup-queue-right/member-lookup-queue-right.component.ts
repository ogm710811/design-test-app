import {Component, Input} from '@angular/core';
import {PageHeaderRightComponent, PageHeaderService} from '@fox/shared';

@Component({
  selector: 'fox-member-lookup-queue-right',
  templateUrl: './member-lookup-queue-right.component.html',
  styleUrls: ['./member-lookup-queue-right.component.css']
})
export class MemberLookupQueueRightComponent implements PageHeaderRightComponent {

  @Input() data: any;
  constructor(
    private pageHeaderService: PageHeaderService
  ) {}

  clickBtn(item: string): void {
    this.pageHeaderService.emitBtnClickEvent(item);
  }

}

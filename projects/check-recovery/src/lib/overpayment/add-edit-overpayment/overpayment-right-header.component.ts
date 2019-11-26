import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {PageHeaderRightComponent, PageHeaderService} from '@fox/shared';

@Component({
  templateUrl: './overpayment-right-header.component.html',
  styleUrls: ['./overpayment-right-header.component.css'],
})

export class OverpaymentHeaderRightComponent implements PageHeaderRightComponent {
  @Input() data: any = {};
  @Output() deleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  refundHistClicked: boolean = false;

  constructor(private pageHeaderService: PageHeaderService,
              private router: Router) {
  }

  async getRefundHistory(): Promise<void> {
    this.pageHeaderService.pageHeaderAlert.next('refund');
  }

  deleteOverpayment(): void {
    console.log(`Delete Clicked`);
    this.pageHeaderService.pageHeaderAlert.next('delete');
  }
}

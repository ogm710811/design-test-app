import {Component, OnInit} from '@angular/core';
import {memberInformationUrlPrefixMemberProfile} from '@fox/shared';

@Component({
  selector: 'fox-overpayment-refund-hist-subtitle',
  templateUrl: './overpayment-refund-hist-subtitle.component.html',
  styleUrls: ['./overpayment-refund-hist-subtitle.component.css']
})
export class OverpaymentRefundHistSubtitleComponent implements OnInit {

  data: any = {};
  memberName: string = '';
  account: string = '';
  memberProfUrl: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.memberName = this.data.memberName;
    this.account = this.data.account;
  }

  getUrl(account: string): string {
    if (account) {
      this.memberProfUrl = memberInformationUrlPrefixMemberProfile + account;
    }
    return this.memberProfUrl;
  }

}

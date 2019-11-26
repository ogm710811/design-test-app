import {Component, OnInit} from '@angular/core';
import {memberInformationUrlPrefixMemberProfile} from '@fox/shared';

@Component({
  templateUrl: './claim-overpayment-selection-subtitle.html',
  styleUrls: ['./claim-overpayment-selection-subtitle.css'],
})

export class ClaimOverpaymentSelectionSubtitleComponent implements OnInit {
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

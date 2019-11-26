import {Component, Input, OnChanges} from '@angular/core';
import {AccountMembershipResponseVO} from '@fox/rest-clients';
import {memberInformationUrlPrefixMemberProfile} from '@fox/shared';

@Component({
  selector: 'fox-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css', '../eob-information.component.css']
})
export class MemberCardComponent implements OnChanges {

  @Input() memberCardResults: AccountMembershipResponseVO[] = [];

  constructor() {
  }

  ngOnChanges(): void {
  }

  getUrlForMember(membershipNo: string): string {
    let url = '';
    if (membershipNo) {
      const membershipNumber = membershipNo;
      url = memberInformationUrlPrefixMemberProfile + membershipNumber;
    }
    return url;
  }

}

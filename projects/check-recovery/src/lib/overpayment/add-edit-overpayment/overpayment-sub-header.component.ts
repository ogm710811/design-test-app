import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {
  memberInformationUrlPrefixMemberProfile,
  PageHeaderSubtitleComponent
} from '@fox/shared';

@Component({
  templateUrl: './overpayment-sub-header.component.html',
  styleUrls: ['./overpayment-sub-header.component.css'],
})

export class OverpaymentSubHeaderComponent implements PageHeaderSubtitleComponent {
  @Input() data: any = {};
  memberNumberLinkClicked: boolean = false;

  constructor(
    private router: Router
  ) {
  }

  async getMemberProfile(): Promise<void> {
    if (this.memberNumberLinkClicked) {
      return;
    }
    let url = '';
    let memberNum = '';
    if (this.data && this.data.memberNumber) {
      memberNum = this.data.memberNumber.replace(/\s/g, '');
    }
    if (memberNum) {
      this.memberNumberLinkClicked = true;
      url = `/#/${memberInformationUrlPrefixMemberProfile}${memberNum}`;
      await this.router.navigate([]).then(res => {
        window.open(url, '_blank');
      });
      this.memberNumberLinkClicked = false;
    }
  }
}

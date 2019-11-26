import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingUrlPrefixClaimDetails,
  memberInformationUrlPrefixMemberProfile,
  PageHeaderRightComponent,
  PageHeaderService
} from '@fox/shared';

@Component({
  templateUrl: './misc-info-page-header-right.component.html',
  styleUrls: ['./misc-info-page-header-right.component.css'],
})

export class MiscInfoPageHeaderRightComponent implements PageHeaderRightComponent {
  public data: any = {};

  constructor(private pageHeaderService: PageHeaderService,
              private router: Router) {
  }

  exitReview(): void {
    this.pageHeaderService.buttonClickedCallback.next('exitReview');
  }

  getUrlForMember(): void {
    let url = '';
    if (this.data.memberNumber) {
      url = memberInformationUrlPrefixMemberProfile + this.data.memberNumber.replace(/\s/g, '');
      this.router.navigate([url]);
    }
  }

  getUrlForClaim(): void {
    let url = '';
    if (this.data.claimNumber) {
      url = claimProcessingUrlPrefixClaimDetails + this.data.claimNumber.replace(/-/g, '');
      this.router.navigate([url]);
    }
  }
}

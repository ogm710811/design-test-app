import {Component, OnInit} from '@angular/core';
import {PageHeaderSubtitleComponent} from './page-header-subtitle.component';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {memberInformationUrlPrefixMemberProfile} from '../constants/member-information.constants';

@Component({
  templateUrl: './process-claim-subheader.component.html',
  styleUrls: ['./process-claim-subheader.component.css']
})
export class ProcessClaimSubheaderComponent implements PageHeaderSubtitleComponent, OnInit {
  data: any;
  memberName: string = '';
  account: string = '';
  claimNumb: string = '';
  details: string = '';
  memberProfUrl: string = '';
  communication: string = '';
  quality: string = '';
  dateOfBirth: string = '';
  plans: string = '';

  constructor(private featureFlagService: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.memberName = this.data['memberName'];
    this.account = this.data['account'];
    this.claimNumb = this.data['claim'];
    this.details = this.data['details'];
    this.communication = this.data['communication'];
    this.quality = this.data['quality'];
    this.dateOfBirth = this.data['dateOfBirth'];
    this.plans = this.data['plans'];
  }

  getUrl(account: string): string {
    if (account) {
      this.memberProfUrl = memberInformationUrlPrefixMemberProfile + account;
    }
    return this.memberProfUrl;
  }

  isFeatureDisabled(feature: any): boolean {
    return this.featureFlagService.isFeatureDisabled(feature);
  }
}

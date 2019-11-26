import {Component, OnInit} from '@angular/core';
import {memberInformationUrlPrefixMemberProfile} from '@fox/shared';
import {QualityReviewInfoSubtitle} from '../model/quality-review-info-subtitle.model';

@Component({
  selector: 'fox-quality-review-info-subtitle',
  templateUrl: './quality-review-info-subtitle.component.html',
  styleUrls: ['./quality-review-info-subtitle.component.css']
})
export class QualityReviewInfoSubtitleComponent implements OnInit {
  data: QualityReviewInfoSubtitle = new QualityReviewInfoSubtitle();
  memberName: string = '';
  account: string = '';
  memberProfUrl: string = '';
  communication: string = '';
  quality: string = '';

  constructor() {
  }

  ngOnInit(): void {
    this.memberName = this.data.memberName;
    this.account = this.data.account;
    this.communication = this.data.communication;
    this.quality = this.data.quality;
  }

  getUrl(account: string): string {
    if (account) {
      this.memberProfUrl = memberInformationUrlPrefixMemberProfile + account;
    }
    return this.memberProfUrl;
  }

}

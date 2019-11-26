import {Component, Input, OnInit} from '@angular/core';
import {FeatureFlagService} from '../feature-flag-service/feature-flag.service';
import {memberInformationUrlPrefixMemberProfile} from '../constants/member-information.constants';

@Component({
  selector: 'fox-member-profile-format-table',
  templateUrl: './member-profile-format-table.component.html',
  styleUrls: ['./member-profile-format-table.component.css']
})
export class MemberProfileFormatTableComponent implements OnInit {
  @Input() target?: string = '_self';
  memberName?: string;
  memberNumber: string | number = '';
  isF4913Enabled = false;
  private _item: string | number | MemberNameAndNumber = '';

  get itemToFormat(): string | number | MemberNameAndNumber {
    return this._item || '';
  }

  @Input() set itemToFormat(item: string | number | MemberNameAndNumber) {
    this._item = item;
    this.memberName = typeof item === 'string' || typeof item === 'number' ? undefined : item.name;
    this.memberNumber = typeof item === 'string' || typeof item === 'number' ? item : item.number;
  }

  constructor(private featureFlagService: FeatureFlagService) {
    this.isF4913Enabled = !featureFlagService.isFeatureDisabled('F4913');
  }

  ngOnInit(): void {
  }

  getUrlForMember(): string {
    let url = '';
    if (this.memberNumber) {
      url = memberInformationUrlPrefixMemberProfile + this.memberNumber;
    }
    return url;
  }
}

export interface MemberNameAndNumber {
  name: string;
  number: string | number;
}

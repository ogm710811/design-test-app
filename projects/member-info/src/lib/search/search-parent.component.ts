import {Component} from '@angular/core';
import {FeatureFlagService} from '@fox/shared';

@Component({
  selector: 'fox-member-search-parent',
  templateUrl: './search-parent.component.html',
  styleUrls: ['./search-parent.component.css']
})

export class SearchParentComponent {
  get toggleMemberSearchVersionFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4235');
  }
  constructor(private featureFlagSvc: FeatureFlagService) {}
}

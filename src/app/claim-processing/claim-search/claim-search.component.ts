import {Component} from '@angular/core';
import {FeatureFlagService} from '@fox/shared';

@Component({
  selector: 'fox-claim-search',
  templateUrl: './claim-search.component.html',
  styleUrls: ['./claim-search.component.css']
})
export class ClaimSearchComponent {

  get isF2752Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F2752');
  }

  constructor(private featureFlagSvc: FeatureFlagService) { }

}

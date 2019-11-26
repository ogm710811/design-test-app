import {Component, Input} from '@angular/core';
import {FeatureFlagService} from '@fox/shared';

@Component({
  selector: 'fox-member-enrollment-info-insurance-parent',
  templateUrl: './info-insurance-parent.component.html',
  styleUrls: ['./info-insurance-parent.component.css']
})
export class InfoInsuranceParentComponent {
  @Input() membershipNumber: string = '';

  get toggleMemberEnrollmentVersionFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4015');
  }

  constructor(private featureFlagSvc: FeatureFlagService) {}
}

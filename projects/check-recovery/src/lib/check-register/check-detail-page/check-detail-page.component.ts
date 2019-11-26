import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {ResourceOfCheckVO} from '@fox/rest-clients';
import {
  checkRecoveryRoutePathArgCheckDetail,
  checkRecoveryUrlFindCheckRegister,
  CommonService, FeatureFlagService,
  LoginService
} from '@fox/shared';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fox-check-detail-page',
  templateUrl: './check-detail-page.component.html',
})
export class CheckDetailPageComponent implements OnInit {

  checkIds: number[] = [];
  checkDetails?: ResourceOfCheckVO = new ResourceOfCheckVO();
  private sub?: Subscription = new Subscription();

  get toggleCheckReplacementVersionFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4554');
  }

  constructor(
      private route: ActivatedRoute,
      private commonSvc: CommonService,
      private router: Router,
      private loginSvc: LoginService,
      private featureFlagSvc: FeatureFlagService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params.hasOwnProperty(checkRecoveryRoutePathArgCheckDetail) && params[checkRecoveryRoutePathArgCheckDetail]) {
        const checkIdsRouteParam: Params = params[checkRecoveryRoutePathArgCheckDetail];
        this.checkIds = checkIdsRouteParam.split(',').map((str: string) => parseInt(str, 10)).filter((id: number) => !isNaN(id));
      }
    });
  }

  onCheckDetailsChange(newDetails: ResourceOfCheckVO): void {
    this.checkDetails = newDetails;
  }

  goBack(): void {
    this.commonSvc.isBack = !(!!this.checkDetails && this.checkDetails.isBulk && this.commonSvc.checkRegisterPayload.dropdownOptions === 'check_series');
    this.router.navigate([checkRecoveryUrlFindCheckRegister]);
  }

  // Access to Screen for these Groups
  grantedAccessToRVScreen(): boolean {
    return this.loginSvc.hasOpAuthorizePaymentRole || this.loginSvc.hasOpMaintainPaymentRole;
  }

}

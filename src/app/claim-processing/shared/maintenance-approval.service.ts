import {Injectable} from '@angular/core';
import {Event as RouterEvent, NavigationEnd, Router} from '@angular/router';
import {ClaimHistMaintRequestUpdateVO} from '@fox/rest-clients';
import {
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingUrlPrefixClaimDetails,
  memberInformationUrlPrefixMemberProfile
} from '@fox/shared';
import {MemberInformationService} from '@fox/member-info';
import {MemberCardSet} from '../claim-history/claim-history-models/member-card.model';
import {MaintenanceApprovalParamsModel} from '../maintenance-approval/maintenance-approval-models/maintenance-approval-params-model';
import {RequestResultSet} from '../maintenance-approval/maintenance-approval-models/maintenance-request-result.model';
import ActionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum;

@Injectable({
  providedIn: 'root'
})
export class MaintenanceApprovalService {

  parametersUsed: MaintenanceApprovalParamsModel[] = [];
  savedResult: Array<RequestResultSet> = [];

  requestResultPageSize: number;
  requestResultDataLengthInput: number;
  requestResultPageTotal: number;
  currentRequestResultPage: number;
  requestDetailVisited = false;

  constructor(private router: Router, private memberSvc: MemberInformationService) {
    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        if (this.requestDetailVisited && ev.url.indexOf(claimProcessingRoutePathMaintenanceApproval) === -1) {
          this.resetCache();
        }
      }
    });
  }

  resetCache(): void {
    this.requestDetailVisited = false;
    this.parametersUsed = [];
  }

  getStatusText(data): string {
    let statusText: string = '';
    switch (data) {
      case 'Pending':
        statusText = 'Pending Approval';
        break;
      case 'Approved':
        statusText = 'Request Approved';
        break;
      case 'Denied':
        statusText = 'Request Denied';
        break;
      default:
        statusText = '';
    }
    return statusText;
  }

  getRedirectUrl(data, type): string {
    let url = '';
    if (type === 'Member') {
      url = memberInformationUrlPrefixMemberProfile + data;
    } else if (type === 'Claim') {
      url = claimProcessingUrlPrefixClaimDetails + data;
    }
    return url;
  }

  getName(data): MemberCardSet {
    const empName: MemberCardSet = new MemberCardSet();
    this.memberSvc.getMemberByMemberNumber(data).subscribe(memberResult => {
      if (memberResult && memberResult.memberDetails) {
        if (memberResult.memberDetails.memberName) {
          empName.lastName = memberResult.memberDetails.memberName.lastName ? memberResult.memberDetails.memberName.lastName : '';
          empName.firstName = memberResult.memberDetails.memberName.firstName ? memberResult.memberDetails.memberName.firstName : '';
        }
      }
    }, (e) => {
      empName.lastName = '';
      empName.firstName = '';
    });
    return empName;
  }

  getActionCode(data): ActionTypeEnum {
    let actionTypeEnum;
    switch (data) {
      case 'CROSSREFMAINT':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.CROSSREFMAINT;
        break;
      case 'TRANSFERCLAIM':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.TRANSFERCLAIM;
        break;
      case 'DELETECLAIM':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.DELETECLAIM;
        break;
      case 'REACTIVATECLAIM':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.REACTIVATECLAIM;
        break;
      case 'UPDATEEOB':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.UPDATEEOB;
        break;
      case 'SPHMAINT':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.SPHMAINT;
        break;
      case 'ACCOUNTTRANSFER':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.ACCOUNTTRANSFER;
        break;
      case 'MEMBERAGGRMAINT':
        actionTypeEnum = ClaimHistMaintRequestUpdateVO.ActionTypeEnum.MEMBERAGGRMAINT;
        break;
    }
    return actionTypeEnum;
  }

  splitMemberNum(memberNum): string {
    const memNum = memberNum.substring(0, 9);
    const asscociationCode = memberNum.substring(9, 10);
    const houseId = memberNum.substring(10, 11);
    return memNum + ' ' + asscociationCode + ' ' + houseId;
  }
}

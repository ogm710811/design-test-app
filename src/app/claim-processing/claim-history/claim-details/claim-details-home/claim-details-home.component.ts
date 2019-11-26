import {Component, Input, ViewChild} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import * as moment from 'moment-timezone';
import {
  ClaimHistoryAchPaymentVO,
  ClaimHistoryApi,
  PagedResourcesofCombinedClaimVO,
  ResourceOfClaimHistoryClaimMessagesVO,
  ResourceOfClaimHistoryDetailVO
} from '@fox/rest-clients';
import {
  checkRecoveryRoutePathFindCheckRegister,
  checkRecoveryRoutePathRoot,
  claimProcessingUrlPrefixClaimDetails,
  FeatureFlagService,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot,
  memberInformationUrlPrefixMemberProfile,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent
} from '@fox/shared';
import * as uuid from 'uuid';
import {ScrollTopService} from '../../../shared/scroll-top.service';
import {PreConditionCheckMsg} from '../../claim-history-enums/combined-claim-msg';
import {CombinedClaimsResultSet} from '../../claim-history-models/combined-claims-result.model';
import {MemberCardSet} from '../../claim-history-models/member-card.model';
import CombinedClaimTypeEnum = PagedResourcesofCombinedClaimVO.CombinedClaimTypeEnum;

@Component({
  selector: 'fox-claim-details-home',
  templateUrl: './claim-details-home.component.html',
  styleUrls: ['../../claim-history.component.css']
})

export class ClaimDetailsHomeComponent {

  @Input() claimDetails: ResourceOfClaimHistoryDetailVO;
  @Input() memberDetails: MemberCardSet;
  @Input() isDataDisplay: boolean = false;
  @Input() isAchPayment: boolean = false;
  @Input() claimNumber: string;
  @Input() dos: string;
  @Input() noOFClaims: string;
  @Input() claimMessagesResult: ResourceOfClaimHistoryClaimMessagesVO[] = [];
  @Input() viewData: ResourceOfClaimHistoryClaimMessagesVO[] = [];
  @Input() dataLengthInput: number = 0;
  @Input() pageTotal: number = 0;
  @Input() isMemberDataDisplay: boolean;

  achPaymentDetail: ClaimHistoryAchPaymentVO;
  achPaymentModalVisible: boolean = false;

  combinedClaimsResult: CombinedClaimsResultSet[] = [];
  combinedClaimsResultLength: number;
  combinedClaimModalVisible: boolean = false;
  combinedClaimType: CombinedClaimTypeEnum;
  combinedSendDate: string;

  isPaperImage: boolean = false;
  isEmptyRelatedSources: boolean = false;

  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeSelected: number = 10;
  address: string;
  isF5191Disabled: boolean = false;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;

  constructor(
    private router: Router,
    private scrollTop: ScrollTopService,
    private claimHistorySearchApi: ClaimHistoryApi,
    private messageBoxService: MessageBoxService,
    private featureFlagService: FeatureFlagService) {
    this.isF5191Disabled = this.featureFlagService.isFeatureDisabled('F5191');
  }

  onTabChange(tab): void {
    if (tab && tab.index === 1) {
      this.getAddressDetails();
    }
  }

  getAddressDetails(): void {
    if (this.claimDetails) {
      this.address = '';
      this.address += this.claimDetails.billingProvAddressLn1 || '';
      this.address += this.claimDetails.billingProvAddressLn2 ? ', ' + this.claimDetails.billingProvAddressLn2 : '';
      this.address += this.claimDetails.billingProvAddressCty ? ', ' + this.claimDetails.billingProvAddressCty : '';
      this.address += this.claimDetails.billingProvAddressSt ? ', ' + this.claimDetails.billingProvAddressSt : '';
      this.address += this.claimDetails.billingProvAddressZipCd ? ', ' + this.claimDetails.billingProvAddressZipCd : '';
    }
  }

  getMemberProfile(): void {

    let url = '';
    let memberNum = '';
    if (this.memberDetails.memberNumber) {
      memberNum = this.memberDetails.memberNumber;
    }
    if (memberNum != null || memberNum !== '') {
      url = '../..' + memberInformationUrlPrefixMemberProfile + memberNum;
      this.router.navigate([url]);
    }
  }

  calculateNewPage(): void {
    this.viewData = this.claimMessagesResult.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.claimMessagesResult.length / this.paginator.pageSize);
  }

  getAchPayment(): void {
    this.achPaymentModalVisible = false;
    const res = this.claimHistorySearchApi.viewAchPayment(
      +this.claimNumber,
      uuid());

    res.subscribe(achPayment => {
      if (achPayment) {
        this.achPaymentDetail = achPayment;
        this.achPaymentModalVisible = true;
      }
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('ACH Payment', MessageBoxType.ERROR, 'Record not found.');
      }
      this.achPaymentModalVisible = false;
    });

  }

  isToggleFeature(feature: string): boolean {
    return !this.featureFlagService.isFeatureDisabled(feature);
  }

  routeEOB(): void {
    const downloadEobUrl = memberInformationRoutePathRoot + '/' + memberInformationRoutePathEobInfo;
    let param: NavigationExtras = {};
    let memberNum = '';
    if (this.claimDetails) {
      if (this.claimDetails.claimHistoryMember && this.claimDetails.claimHistoryMember.aarpMembershipNumber) {
        memberNum = this.claimDetails.claimHistoryMember.aarpMembershipNumber;
      }
      if (this.claimDetails.claimDosFromDate && this.claimDetails.claimDosToDate) {
        param = {
          queryParams: {
            dosFrom: this.claimDetails.claimDosFromDate,
            dosTo: this.claimDetails.claimDosToDate,
            memberNum: memberNum
          }
        };
      }
    }
    this.router.navigate([downloadEobUrl], param);
  }

  routeProviderSearch(): void {
    const proverSearchUrl = memberInformationRoutePathRoot + '/' + memberInformationRoutePathProviderSearch;
    let tin = '';
    let npi = '';
    if (this.claimDetails) {
      tin = (this.claimDetails.billingProvTin) ? (this.claimDetails.billingProvTin) : '';
      npi = (this.claimDetails.billingProvNpi) ? (this.claimDetails.billingProvNpi) : '';
    }
    const params: NavigationExtras = {queryParams: {tin: tin, npi: npi}};
    this.router.navigate([proverSearchUrl], params);
  }

  routeCheckRegistry(): void {
    const checkRegistryUrl = checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathFindCheckRegister;
    const params: NavigationExtras = {queryParams: {claimNumber: this.claimNumber}};
    this.router.navigate([checkRegistryUrl], params);
  }

  getCombinedClaims(combinedClaimType): void {
    if (!this.isF5191Disabled) {
      this.scrollTop.setScrollTop();
      this.combinedClaimModalVisible = false;
      this.combinedClaimType = combinedClaimType;
      const res = this.claimHistorySearchApi.getCombinedClaims(uuid(), +this.claimNumber, combinedClaimType);
      res.subscribe(combinedClaimResult => {
        if (combinedClaimResult) {
          this.processCombinedClaimsResult(combinedClaimResult);
        }
      }, (e) => {
        if (e.status === 404) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Combined Claims', MessageBoxType.ERROR, 'Record not found.');
        }
        if (e.status === 412) {
          const errMsg = e.headers.get('message');
          if (Object.values(PreConditionCheckMsg).includes(errMsg)) {
            this.messageBoxService.reset();
            this.messageBoxService.addMessageBox('Combined Claims', MessageBoxType.ERROR, errMsg);
          }
        }
        this.combinedClaimModalVisible = false;
      });
    }
  }

  processCombinedClaimsResult(combinedClaimResult: PagedResourcesofCombinedClaimVO): void {
    if (combinedClaimResult && combinedClaimResult.items) {

      this.combinedClaimsResult = [];

      combinedClaimResult.items.forEach(item => {
        const mappedItem: CombinedClaimsResultSet = new CombinedClaimsResultSet();

        mappedItem.claimNum = item.claimNumber ? item.claimNumber : '';
        mappedItem.dos = '';
        mappedItem.amtPlanPaid = item.amtPlanPaid ? +item.amtPlanPaid : 0.0;

        if (item.claimDosFromDate && item.claimDosToDate) {
          mappedItem.dos = moment.tz(item.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
            moment.tz(item.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
        }

        this.combinedClaimsResult.push(mappedItem);

      });
      this.combinedClaimsResultLength = combinedClaimResult.numOfCombinedClaims ? combinedClaimResult.numOfCombinedClaims : 0;
      this.combinedSendDate = combinedClaimResult.sendDate ? combinedClaimResult.sendDate : '';

      this.combinedClaimModalVisible = true;
    }
  }

  cancelCombinedClaimModal(): void {
    this.combinedClaimModalVisible = false;
  }

  routeClaimDetails(adjClmNum: String): void {
    let url = '';
    url = '..' + claimProcessingUrlPrefixClaimDetails + adjClmNum;
    this.router.navigate([url]);
    window.scrollTo(0, 0);
  }

}

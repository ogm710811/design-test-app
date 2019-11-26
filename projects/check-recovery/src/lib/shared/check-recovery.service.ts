import {Injectable} from '@angular/core';
import {
  CheckActionDetailVO,
  CheckActionVO,
  CheckDetailsApi,
  CheckIdsVO,
  CheckCompleteReq,
  DepositApi,
  FindAndBrowseCheckRegisterApi,
  MemberApi,
  PagedResourcesOfResourceOfCheckSummaryVO,
  PagedResourcesOfResourceOfCheckVO,
  PagedResourcesOfResourceOfProviderVO,
  PagedResourcesOfResourceOfSearchMemberVO,
  ProviderApi,
  ReplaceOrVoidCheckApi,
  ResourceOfCheckVO,
  ResourceOfManualDepositVO,
  ResourceOfProviderVO,
  ResourceOfPurgeCheckVO,
  ResourcesListOfResourceOfCheckSummaryVO,
  CheckReplaceVO
} from '@fox/rest-clients';
import {BehaviorSubject, Observable} from 'rxjs';
import * as uuidConst from 'uuid';
const uuid = uuidConst;

@Injectable({
  providedIn: 'root'
})
export class CheckRecoveryService {
  checkActionFormGroupBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  checkIds: CheckIdsVO = new CheckIdsVO();

  constructor(
    private checkApi: FindAndBrowseCheckRegisterApi,
    private detailApi: CheckDetailsApi,
    private replaceOrVoidApi: ReplaceOrVoidCheckApi,
    private providerApi: ProviderApi,
    private searchMemberApi: MemberApi,
    private depositApi: DepositApi) {
  }

  getCheck(searchBy: string, accountNumber: number | undefined, checkSeries: string, checkNumber: number, issueDate: string, claimNumber?: string, tin?: number, npi?: number): Observable<PagedResourcesOfResourceOfCheckSummaryVO> {
    return this.checkApi.apiPaymentCheckGet(searchBy, uuid(), undefined || checkSeries, undefined || checkNumber, undefined || issueDate, undefined || accountNumber, undefined || claimNumber, undefined || tin, undefined || npi, undefined);
  }

  getCheckDetail(checkId: number): Observable<ResourceOfCheckVO> {
    return this.detailApi.apiPaymentCheckCheckIdGet(checkId, uuid());
  }

  getPurgeCheck(purgeId: number): Observable<ResourceOfPurgeCheckVO> {
    return this.detailApi.apiPaymentPurgeCheckPurgeIdGet(purgeId, uuid());
  }

  getMultipleChecks(checkIds: CheckIdsVO): Observable<PagedResourcesOfResourceOfCheckVO> {
    return this.detailApi.apiPaymentCheckMultiplePost(checkIds, uuid());
  }

  getReplaceApproval(checkId: number): Observable<CheckActionDetailVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCheckIdReplacementApprovalPost(checkId, uuid());
  }

  getReplaceDenial(checkId: number): Observable<CheckActionDetailVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCheckIdReplacementDenialPost(checkId, uuid());
  }

  getReplace(actionDetails: CheckActionVO): Observable<CheckActionDetailVO[]> {
    return this.replaceOrVoidApi.apiPaymentCheckReplacementPost(actionDetails, uuid());
  }

  submitReplaceRequest(requestCorrelationId: string, actionDetails: CheckReplaceVO): Observable<CheckActionDetailVO[]> {
    return this.replaceOrVoidApi.submitReplaceRequest(requestCorrelationId, actionDetails);
  }

  getVoidApproval(checkId: number): Observable<CheckActionDetailVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCheckIdVoidApprovalPost(checkId, uuid());
  }

  getVoidDenial(checkId: number): Observable<CheckActionDetailVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCheckIdVoidDenialPost(checkId, uuid());
  }

  getVoid(checkId: number, actionDetails: CheckActionVO): Observable<CheckActionDetailVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCheckIdVoidPost(checkId, actionDetails, uuid());
  }

  getComplete(checkComplete: CheckCompleteReq): Observable<ResourcesListOfResourceOfCheckSummaryVO> {
    return this.replaceOrVoidApi.apiPaymentCheckCompletePost(checkComplete, uuid());
  }

  getProvider(providerId: number): Observable<ResourceOfProviderVO> {
    return this.providerApi.getProvider(providerId, uuid());
  }

  getProviderLookup(tin: number, npi?: number): Observable<PagedResourcesOfResourceOfProviderVO> {
    return this.providerApi.findProvider(uuid(), tin, npi);
  }

  getSearchMember(membershipNumber: string, minScore: string): Observable<PagedResourcesOfResourceOfSearchMemberVO> {
    return this.searchMemberApi.searchMember(minScore, membershipNumber, undefined, undefined, undefined, undefined, undefined, undefined, uuid());
  }

  submitManualDeposit(deposit: ResourceOfManualDepositVO): Observable<ResourceOfManualDepositVO> {
    return this.depositApi.createManualDeposit(deposit, uuid());
  }

}

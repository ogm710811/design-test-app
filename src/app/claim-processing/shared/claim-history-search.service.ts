import {Injectable} from '@angular/core';
import {Event as RouterEvent, NavigationEnd, Router} from '@angular/router';
import {
  ClaimHistoryApi,
  ClaimNoteApi,
  ClaimNoteVO,
  PagedResourcesOfResourceOfClaimBillLineDetailsVO,
  ResourceOfClaimHistoryDetailVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import {claimProcessingRoutePathHistory} from '@fox/shared';
import * as uuid from 'uuid';
import {ClaimHistoryResultSet} from '../claim-history/claim-history-models/claim-history-result.model';
import {ClaimHistorySearchParameterModel} from '../claim-history/claim-history-models/claim-history-search-parameter.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimHistorySearchService {

  parametersUsed: ClaimHistorySearchParameterModel[] = [];
  savedClaimHistoryResult: Array<ClaimHistoryResultSet> = [];

  historyPageSize: number;
  historyDataLengthInput: number;
  historyPageTotal: number;
  currentHistoryPage: number;
  claimDetailVisited = false;
  historyRecCount: number;

  reqData = {
    'ppsClaimId': '',
    'membershipId': '',
    'dosFrom': '',
    'dosTo': '',
    'serviceType': '',
    'npi': '',
    'status': '',
    'sortBy': '',
    'orderBy': ''
  };

  constructor(private claimHistorySearchApi: ClaimHistoryApi, private claimNotesApi: ClaimNoteApi, private router: Router) {
    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        if (this.claimDetailVisited && ev.url.indexOf(claimProcessingRoutePathHistory) === -1) {
          this.resetCache();
        }
      }
    });
  }

  resetCache(): void {
    this.claimDetailVisited = false;
  }

  getSingleClaimDetails(claimNumber): Observable<ResourceOfClaimHistoryDetailVO> {
    return this.claimHistorySearchApi.getClaimHistory(claimNumber, uuid());
  }

  getClaimNotes(claimNoteId): Observable<ClaimNoteVO> {
    return this.claimNotesApi.getClaimNote(claimNoteId, uuid());
  }

  getBillLines(claimNumber, eobType, billLineType, size, page, sortBy, orderBy): Observable<PagedResourcesOfResourceOfClaimBillLineDetailsVO> {
    return this.claimHistorySearchApi.listBillLineDetails(
      claimNumber,
      eobType,
      billLineType,
      uuid(),
      size,
      page,
      sortBy,
      orderBy);
  }
}

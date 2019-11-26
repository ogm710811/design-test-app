import {Injectable} from '@angular/core';
import {
  ClaimApi,
  ClaimStatusVO,
  PagedResourcesOfResourceOfClaimSummaryVO,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClaimProcessingService {

  constructor(private claimSearchApi: ClaimApi,
              private referenceApi: ReferencesApi) {
  }

  getClaimSearch(ppsClaimId, membershipId, mbi, firstName, lastName, dob, billNpi, billTin, dosFrom, dosTo,
                 recdateFrom, recdateTo, status, size): Observable<PagedResourcesOfResourceOfClaimSummaryVO> {

    return this.claimSearchApi.findClaim(uuid(),
      ppsClaimId || undefined,
      membershipId || undefined,
      mbi || undefined,
      firstName || undefined,
      lastName || undefined,
      dob || undefined,
      billNpi || undefined,
      billTin || undefined,
      dosFrom || undefined,
      dosTo || undefined,
      recdateFrom || undefined,
      recdateTo || undefined,
      status || undefined,
      size || undefined);
  }

  getClaimHistory(ppsClaimId): Observable<ClaimStatusVO[]> {
    return this.claimSearchApi.listClaimStatus(ppsClaimId || undefined, uuid());
  }

  getReferencesService(name: string): Observable<ReferenceValueVO[]> {
    return this.referenceApi.listCategoryCodes(name, uuid());
  }

}

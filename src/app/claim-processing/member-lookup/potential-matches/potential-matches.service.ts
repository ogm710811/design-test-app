import {EventEmitter, Injectable} from '@angular/core';
import {
  BypassApi,
  ClaimMemberLookupRequestVO,
  ClaimMemberLookupResultVO,
  MemberApi,
  MemberLookupTaskVO,
  MemberValidationApi,
  OtherApi,
  PagedResourcesOfMemberLookupProcessInfoVO,
  ResourceOfMemberLookupProcessInfo,
  ResourceOfMemberLookupTaskVO
} from '@fox/rest-clients';
import {LoginService, MessageBoxService, MessageBoxType} from '@fox/shared';
import {Observable, of as observableOf, Subscription} from 'rxjs';
import * as uuid from 'uuid';
import {ClaimData} from './claim-data.model';
import {PotentialMatch} from './potential-match.model';

@Injectable({
  providedIn: 'root'
})
export class PotentialMatchesService {

  claims: ClaimData[] = [];
  selfBypassedClaims: ClaimData[] = [];
  claim: ClaimData = new ClaimData({});
  matchesChange: EventEmitter<PotentialMatch[]> = new EventEmitter<PotentialMatch[]>();
  previousClaimNumber: string | undefined;
  private _nextClaimSubscription: Subscription;
  private _nextBypassSubscription: Subscription;

  private _matches: PotentialMatch[] = [];

  get matches(): PotentialMatch[] {
    return this._matches;
  }

  set matches(matches: PotentialMatch[]) {
    this._matches = matches;
    this.matchesChange.emit(this._matches);
  }

  constructor(
    private loginSvc: LoginService,
    private bpmSvc: MemberValidationApi,
    private bypassSvc: BypassApi,
    private mdmSvc: MemberApi,
    private otherApi: OtherApi,
    private messageBoxService: MessageBoxService
  ) {
  }

  clearTable(): void {
    this.claim = new ClaimData({});
    this.matches = [];
  }

  noMatch(): Observable<ResourceOfMemberLookupTaskVO> {
    if (this.claim && this.claim.processId) {
      this.previousClaimNumber = this.claim.claimTrackingId;
      const taskVo: MemberLookupTaskVO = {
        bypassReason: '',
        isBypass: false,
        isMemberMatched: false,
        processId: this.claim.processId.toString(),
        assignedTo: this.loginSvc.loginState.username
      };
      return this.bpmSvc.completeAction(this.claim.processId.toString(), taskVo, uuid());
    } else {
      return observableOf({});
    }
  }

  match(selection: PotentialMatch): Observable<ResourceOfMemberLookupTaskVO> {
    if (this.claim && this.claim.processId) {
      this.previousClaimNumber = this.claim.claimTrackingId;
      const taskVo: MemberLookupTaskVO = {
        bypassReason: '',
        isBypass: false,
        isMemberMatched: true,
        processId: this.claim.processId.toString(),
        assignedTo: this.loginSvc.loginState.username,
        memRecNo: selection.mdmRecordNumber
      };
      return this.bpmSvc.completeAction(this.claim.processId.toString(), taskVo, uuid());
    } else {
      return observableOf({});
    }
  }

  manualMatch(mdmRecNo: string): Observable<ResourceOfMemberLookupTaskVO> {
    if (this.claim && this.claim.processId) {
      this.previousClaimNumber = this.claim.claimTrackingId;
      const memberLookupTaskVO: MemberLookupTaskVO = {
        bypassReason: '',
        isBypass: false,
        isMemberMatched: true,
        processId: this.claim.processId.toString(),
        assignedTo: this.loginSvc.loginState.username,
        memRecNo: mdmRecNo
      };
      return this.bpmSvc.completeAction(this.claim.processId.toString(), memberLookupTaskVO, uuid());
    } else {
      return observableOf({});
    }
  }

  bypassClaim(bypassReason: string): Observable<ResourceOfMemberLookupTaskVO> {
    if (this.claim && this.claim.processId) {
      const memberLookupTask: MemberLookupTaskVO = {};
      memberLookupTask.processId = String(this.claim.processId);
      memberLookupTask.assignedTo = this.loginSvc.loginState.username;
      memberLookupTask.bypassReason = bypassReason;
      memberLookupTask.isBypass = true;
      return this.bypassSvc.bypass(String(this.claim.processId), memberLookupTask, uuid());
    } else {
      return observableOf({});
    }
  }

  doLocalBypass(reason: string): void {
    this.claim.bypassReason = reason;
    this.selfBypassedClaims.push(this.claim);
  }

  cancelClaim(): Observable<ResourceOfMemberLookupProcessInfo> {
    if (this.claim && this.claim.processId) {
      return this.bpmSvc.cancelTask(this.claim.processId, uuid());
    } else {
      return observableOf({});
    }
  }

  findBypassbyTransId(transId: string): Subscription {
    return this.bypassSvc.getBypass(transId, uuid()).subscribe((rawClaim) => {
      this.onNextClaimResponse(rawClaim);
      if ((rawClaim && rawClaim.memberLookupProcess && rawClaim.memberLookupProcess.memberLookupObject &&
        rawClaim.memberLookupProcess.memberLookupObject.member)) {
        this.onNextClaimResponse(rawClaim);
      } else {
        this.messageBoxService.addMessageBox('Cannot locate Transaction ID', MessageBoxType.ERROR,
          'Please enter a new Transaction ID or select a queue');
      }
    }, (e) => {
      this.messageBoxService.addMessageBox('Cannot locate Transaction ID', MessageBoxType.ERROR,
        'Please enter a new Transaction ID or select a queue');
    });
  }

  fetchNextClaim(): Subscription {
    return this.subscribeToNextClaim();
  }

  fetchNextBypassClaimForUser(user: string): Subscription {
    if (!user) {
      return observableOf({}).subscribe();
    }
    this.claim.bypassReason = '';
    const obs: Observable<PagedResourcesOfMemberLookupProcessInfoVO> = this.bypassSvc.nextBypass(user, uuid());
    return obs.subscribe((rawClaim: PagedResourcesOfMemberLookupProcessInfoVO) => {
      if (rawClaim && rawClaim._embedded && rawClaim._embedded.items) {
        this.claims = rawClaim._embedded.items.map((clm: ResourceOfMemberLookupProcessInfo) => {
          return new ClaimData(clm);
        });

        // If we're fetching the next bypass from our own queuue
        if (this.loginSvc.username === user) {
          // get the list of self-bypassed claim IDs
          const selfBypassedClaimIds: string[] = this.selfBypassedClaims.map((srvClm: ClaimData) => {
            return srvClm.claimTrackingId || '';
          });

          // define a function for determining if a claim is pristine (not yet bypassed this session)
          const isClaimPristine: (ClaimData) => boolean = (serverClaim: ClaimData) => {
            const bypassedClaimsMatchingServerClaim = selfBypassedClaimIds.filter(
              (bypassedClaimId: string) => {
                return bypassedClaimId === serverClaim.claimTrackingId;
              });
            return bypassedClaimsMatchingServerClaim.length <= 0;
          };

          // Get the list of pristine claims by filtering
          const pristineClaims = this.claims.filter((serverClaim: ClaimData) => {
            return isClaimPristine(serverClaim);
          });

          // Set the current claim from pristine if there are any
          if (pristineClaims.length > 0) {
            this.claim = pristineClaims[0];
            // otherwise we go back to the ones we've already bypassed this session
          } else if (this.selfBypassedClaims.length > 0) {
            this.claim = this.selfBypassedClaims[0];
            // remove the claim[0] from the list when we show it.
            if (this.selfBypassedClaims.length > 1) {
              this.selfBypassedClaims = this.selfBypassedClaims.slice(1);
            } else {
              this.selfBypassedClaims = [];
            }
            // and if we've cleared the queue, return an empty claim
          } else {
            this.claim = new ClaimData({});
            this.claim.bypassReason = '';
          }
        } else if (this.claims.length > 0) {
          this.claim = this.claims[0];
        } else {
          this.claim = new ClaimData({});
          this.claim.bypassReason = '';
        }
        this.fetchPotentialMatchesForClaim(this.claim);
      } else {
        this.claim = new ClaimData({});
        this.matches = [];
      }
      // call for Bypass Reason
      if (this.claim && this.claim.processId) {
        this.fetchBypassReason(this.claim);
      }
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Error (404): No Items in Queue');
        window.scrollTo(0, 0);
      }
    });
  }

  private onNextClaimResponse(rawClaim: ResourceOfMemberLookupProcessInfo): void {
    if (rawClaim && rawClaim.memberLookupProcess && rawClaim.memberLookupProcess.memberLookupObject &&
      rawClaim.memberLookupProcess.memberLookupObject.member) {
      this.claim = new ClaimData(rawClaim);
      this.fetchPotentialMatchesForClaim(this.claim);
      if (rawClaim.memberLookupProcess.processID) {
        this.fetchBypassReason(this.claim);
      }
    } else {
      this.claim = new ClaimData({});
      this.matches = [];
      console.log('error on getting next claim');
    }
  }

  private unsubscribeFromNextClaim(): void {
    if (this._nextClaimSubscription) {
      this._nextClaimSubscription.unsubscribe();
    }
  }

  private subscribeToNextClaim(): Subscription {
    this.unsubscribeFromNextClaim();
    return this.bpmSvc.claimTask(uuid()).subscribe((rawClaim) => {
      this.onNextClaimResponse(rawClaim);
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Error (404): No Items in Queue');
        window.scrollTo(0, 0);
      }
      console.log('Error is happening in claim task: ' + e.toString());
    });
  }

  private fetchPotentialMatchesForClaim(claim: ClaimData): Subscription {
    if (claim && claim.claimSource) {
      const lookup: ClaimMemberLookupRequestVO = <ClaimMemberLookupRequestVO>{
        firstName: claim.firstName,
        lastName: claim.lastName,
        dateOfBirth: claim.dateOfBirth,
        gender: claim.gender,
        medicareId: claim.medicareId,
        addressLine1: claim.addressLine1,
        addressLine2: claim.addressLine2,
        city: claim.city,
        zip: claim.zip,
        state: claim.state,
        country: claim.country,
        membershipNumber: claim.membershipNumber,
        serviceDate: claim.startDate,
        serviceEndDate: claim.endDate,
        source: claim.claimSource.toString().toUpperCase() === 'CROSSOVER' ? 'CMS' : claim.claimSource.toString().toUpperCase()
      };

      const obs: Observable<ClaimMemberLookupResultVO> =
        this.mdmSvc.claimMemberLookup(lookup, uuid());
      return obs.subscribe((results: ClaimMemberLookupResultVO) => {
        this.matches = results && results.candidateMatches ? results.candidateMatches.map(vo => {
          return new PotentialMatch(vo);
        }) : [];
      });
    }

    return observableOf(null).subscribe(o => {
    });
  }

  private fetchBypassReason(claim: ClaimData): Subscription {
    claim.bypassReason = '';
    if (claim && claim.processId) {
      const obs: Observable<ResourceOfMemberLookupTaskVO> = this.otherApi.getTask(claim.processId.toString(), uuid());
      return obs.subscribe((lookupInfo: ResourceOfMemberLookupTaskVO) => {
        if (lookupInfo && lookupInfo.memberLookupTask && lookupInfo.memberLookupTask.bypassReason) {
          // this.reason = new BypassReason(lookupInfo.memberLookupTask.bypassReason);
          this.claim.bypassReason = lookupInfo.memberLookupTask.bypassReason;
        }
      });
    }
    return observableOf(null).subscribe(o => {
    });

  }
}

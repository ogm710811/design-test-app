import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ResourceOfMemberLookupProcessInfo, ResourceOfMemberLookupTaskVO} from '@fox/rest-clients';
import {dashboardUrlDefault, LoginService} from '@fox/shared';
import {LoginReduxState} from '@fox/state-management';
import {Store} from '@ngrx/store';
import {Observable, of as observableOf, Subscription} from 'rxjs';
import {ClaimData} from './claim-data.model';
import {PotentialMatch} from './potential-match.model';
import {PotentialMatchesOriginalService} from './potential-matches-original.service';

@Component({
  selector: 'fox-potential-matches-original',
  templateUrl: './potential-matches-original.component.html',
  styleUrls: ['./potential-matches-original.component.less']
})
export class PotentialMatchesOriginalComponent implements OnInit {

  @Input() queueType: string;
  @Input() trackingId: string;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  showDialog: boolean = false;
  showBypassModal: boolean = false;
  showBypassReasonRequiredAlert = false;
  bypassReasonText: string = '';
  bypassReasonDropdown = 'none';
  result: any;
  loginState: Observable<boolean>;
  canViewImage: boolean = false;
  displayedMatches: PotentialMatch[] = [];
  @ViewChild('noMatch') noMatch: ElementRef;
  private userVal = '';

  @Input()
  get user(): string {
    return this.userVal;
  }

  set user(u: string) {
    this.userVal = u;
    this.fetchNextClaim();
  }

  get previousClaimNumber(): string | undefined {
    return this.potentialMatchSvc.previousClaimNumber;
  }

  get pdfUrlText(): string {
    return 'api/membervalidation/claim/' + this.claim.claimTrackingId + '/image?token=' + this.loginSvc.loginState.access_token;
  }

  get claim(): ClaimData {
    return this.potentialMatchSvc.claim;
  }

  constructor(
    private potentialMatchSvc: PotentialMatchesOriginalService,
    private router: Router,
    private loginSvc: LoginService,
    private store: Store<LoginReduxState>
  ) {

    this.loginState = store.select('loggedIn');
    this.loginState.subscribe(loggedIn => {
      if (!loggedIn) {
        this.potentialMatchSvc.previousClaimNumber = '';
      }
    });
  }

  ngOnInit(): void {
    this.potentialMatchSvc.matchesChange.subscribe((matches) => {
      this.displayedMatches = [0, 1, 2].map((idx) => {
        if (idx < matches.length) {
          return matches[idx];
        } else {
          return new PotentialMatch();
        }
      });
    });
    this.fetchNextClaim();
    this.potentialMatchSvc.claims = [];
    this.potentialMatchSvc.selfBypassedClaims = [];
    this.canViewImage = this.loginSvc.hasOpViewClaimImageRole;
  }

  processSaveBypass(): void {
    if (this.bypassReasonDropdown === 'none') {
      this.showBypassReasonRequiredAlert = true;
    } else if (this.bypassReasonDropdown === 'Other' && this.bypassReasonText.length === 0) {
      this.showBypassReasonRequiredAlert = true;
    } else {
      this.bypassClaim();
      this.showBypassModal = !this.showBypassModal;
    }
  }

  bypassModal(): void {
    this.showBypassModal = true;
    this.showBypassReasonRequiredAlert = false;
    this.bypassReasonText = '';
    this.bypassReasonDropdown = 'none';
  }

  bypassClaim(): void {
    let reason: string = '';
    if (this.bypassReasonDropdown === 'Other') {
      reason = this.bypassReasonText;
    } else {
      reason = this.bypassReasonDropdown;
    }

    if ('BYPASS' === this.queueType) {
      this.potentialMatchSvc.doLocalBypass(reason);
    }

    const obs: Observable<ResourceOfMemberLookupTaskVO> = this.potentialMatchSvc.bypassClaim(reason);
    if (obs) {
      obs.subscribe(() => {
        this.fetchNextClaim();
      });
    }
  }

  onClickMatch(selection: number): void {
    const obs: Observable<ResourceOfMemberLookupTaskVO> = this.potentialMatchSvc.match(this.displayedMatches[selection - 1]);
    if (obs) {
      obs.subscribe(() => {
        this.fetchNextClaim();
      });
    }
  }

  onClickNoMatch(): void {
    const obs: Observable<ResourceOfMemberLookupTaskVO> = this.potentialMatchSvc.noMatch();
    if (obs) {
      obs.subscribe(() => {
        this.fetchNextClaim();
      });
    }
    this.trackingId = '';
    this.noMatch.nativeElement.blur();
  }

  onClickCancel(): void {
    let obs: Observable<ResourceOfMemberLookupProcessInfo> = observableOf({});

    if ('MAIN' === this.queueType) {
      obs = this.potentialMatchSvc.cancelClaim();
    }

    obs.subscribe(() => {
      this.router.navigateByUrl(dashboardUrlDefault).then();
    });
    this.trackingId = '';
  }

  goToDashboard(): void {
    this.router.navigate([dashboardUrlDefault]).then();
  }

  getPDF(trackingId: string | undefined): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'api/membervalidation/claim/' + trackingId + '/image', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.loginSvc.loginState.access_token);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function (): void {
      if (xhr.readyState === 4) {
        if (xhr.status >= 400) {
          console.log('Failed in getting PDF');
        } else {
          const url = URL.createObjectURL(xhr.response);
          const win = window.open('_blank');
          if (win) {
            win.location.assign(url);
          }
        }
      }
    };
    xhr.send(null);
  }

  findByTransId(transId: string): Subscription {
    this.trackingId = '';
    return this.potentialMatchSvc.findBypassbyTransId(transId);
  }

  matchEquals(index: number, item: PotentialMatch): string {
    return JSON.stringify(item);
  }

  private fetchNextClaim(): Subscription {
    this.potentialMatchSvc.clearTable();
    if (this.queueType) {
      switch (this.queueType) {
        case ('BYPASS'):
          return this.potentialMatchSvc.fetchNextBypassClaimForUser(this.user);
        case ('MAIN'):
          return this.potentialMatchSvc.fetchNextClaim();
        default:
          break;
      }
    }
    return observableOf({}).subscribe();
  }

}

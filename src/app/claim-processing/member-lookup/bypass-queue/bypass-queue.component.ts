import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ConfiguserApi,
  PagedResourcesOfResourceOfUserVO,
  ReferencesApi,
  ReportDetailVO,
  ResourceOfUserVO
} from '@fox/rest-clients';
import {FeatureFlagService, LoginService, ModalService, reportsFeature} from '@fox/shared';
import {AppState} from '@fox/state-management';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as uuid from 'uuid';
import {MemberLookupService} from '../member-lookup-queue/member-lookup-queue.service';
import {PotentialMatchesActionsComponent} from '../potential-matches-actions/potential-matches-actions.component';
import {PotentialMatchesComponent} from '../potential-matches/potential-matches.component';
import {PotentialMatchesService} from '../potential-matches/potential-matches.service';

@Component({
  selector: 'fox-bypass-queue',
  templateUrl: 'bypass-queue.component.html',
  styleUrls: ['../member-lookup-queue/member-lookup-btn.css', 'bypass-queue.component.css']
})
export class BypassQueueComponent implements OnInit, OnDestroy {

  @ViewChild('transid') transIdElRef?: ElementRef | null;
  @ViewChild(PotentialMatchesComponent) transIdFromBypass: PotentialMatchesComponent;
  @ViewChild('potentialMatchesActions') potentialMatchesActions: PotentialMatchesActionsComponent;

  userList: string[] = [];
  selectedUser: string = '';
  trackingIdInput: string = '';
  trackingId: string = '';
  findMode = false;
  apiMessage: Observable<string>;

  loggedInUserSubscription: Subscription;
  userListSubscription: Subscription;

  showNotFoundAlert = false;

  msReports: ReportDetailVO[] | undefined;
  nasReports: ReportDetailVO[] | undefined;
  innerWidth: number;
  queueTotals: any[] = [];
  errorMessage: Observable<string>;

  get loggedInUser(): string {
    return this.loginSvc.username;
  }

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  get hasReleaseEnableReports(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled(reportsFeature);
  }

  get hasNoMatches(): boolean {
    return this.potentialMatchesSvc.matches.length === 0 && !!this.potentialMatchesSvc.claim.claimTrackingId;
  }

  constructor(
    private userSvc: ConfiguserApi,
    private memberLookupSvc: MemberLookupService,
    private loginSvc: LoginService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private referencesSvc: ReferencesApi,
    private modalService: ModalService,
    private potentialMatchesSvc: PotentialMatchesService,
    private featureFlagSvc: FeatureFlagService
  ) {
  }

  ngOnInit(): void {
    this.trackingIdInput = '';
    this.trackingId = '';
    // Get the logged in user
    this.userSvc.getUser(this.loggedInUser, uuid())
      .subscribe((userResource: ResourceOfUserVO) => {
        const loggedInUsersTeamCode = userResource.team ? userResource.team.code || '' : '';

        // Find up to 50 users on the same team as the logged in user
        this.userSvc.findUser(uuid(), undefined, undefined, loggedInUsersTeamCode, undefined, 50)
          .subscribe(
            // Do plumbing to get the string list
            (usr: PagedResourcesOfResourceOfUserVO) => {
              let userResList: ResourceOfUserVO[] = [];
              if (usr && usr._embedded && usr._embedded.items) {
                userResList = usr._embedded.items;
              }

              // Assign the string list to the variable that appears in the template
              this.userList = userResList.map(u => u.userName || '');

              // Assign selected user from the userlist
              const usernameIndex: number = this.userList.findIndex((candidateUserName: string) => {
                return candidateUserName === this.loggedInUser;
              });
              if (usernameIndex >= 0) {
                this.selectedUser = this.userList[usernameIndex];
              }
            });
      });

    this.route.queryParams.pipe(filter(params => params.transid))
      .subscribe(params => {
        if (params.transid) {
          this.trackingIdInput = params.transid;
          if (this.transIdElRef && this.transIdElRef.nativeElement) {
            this.transIdElRef.nativeElement.focus();
          }
        }
      });

    this.referencesSvc.listOperationalReport(uuid(), 'MLK', 'body', false).subscribe(res => {
      this.msReports = res.microStrategyReport;
      this.nasReports = res.nasDriveReport;
    });
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.trackingIdInput = '';
    this.trackingId = '';
  }

  findBypass(): void {
    this.trackingId = this.trackingIdInput;
    this.showNotFoundAlert = false;
    this.findMode = true;
    if (this.trackingId && this.trackingId.trim().length > 0) {
      this.transIdFromBypass.findByTransId(this.trackingId);
    }
    this.trackingIdInput = '';
  }

  onChangeSelectedUser(event: string): void {
    this.findMode = false;
    this.showNotFoundAlert = false;
    this.trackingIdInput = '';
    this.trackingId = '';
    this.selectedUser = event;
  }

  childEventClicked(event: Event): void {
    this.potentialMatchesActions.modalView = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;
  }

}

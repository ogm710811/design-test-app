import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ConfiguserApi,
  PagedResourcesOfResourceOfUserVO,
  ReferencesApi,
  ReportDetailVO,
  ResourceOfUserVO
} from '@fox/rest-clients';
import {LoginService, ModalService} from '@fox/shared';
import {AppState} from '@fox/state-management';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as uuid from 'uuid';
import {MemberLookupService} from '../member-lookup-queue/member-lookup-queue.service';
import {PotentialMatchesOriginalComponent} from '../potential-matches-original/potential-matches-original.component';

@Component({
  selector: 'fox-bypass-queue',
  templateUrl: 'bypass-queue.component.html',
  styleUrls: ['../member-lookup-queue/member-lookup-btn.css', 'bypass-queue.component.css']
})
export class BypassQueueComponent implements OnInit, OnDestroy {

  @ViewChild('transid') transIdElRef?: ElementRef | null;
  @ViewChild('potentialMatchesComponent') transIdFromBypass: PotentialMatchesOriginalComponent;

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
  queueTotals: any[] = [];
  errorMessage: Observable<string>;

  /*get hasReleaseEnableReports(): boolean {
    return !this.loginSvc.hasPageEnabled(reportsFeature);
  }*/

  get loggedInUser(): string {
    return this.loginSvc.username;
  }

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  constructor(private userSvc: ConfiguserApi, private memberLookupSvc: MemberLookupService,
              private loginSvc: LoginService, private route: ActivatedRoute, private store: Store<AppState>,
              private referencesSvc: ReferencesApi, private modalService: ModalService) {
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

              console.log(this.userList);

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

}

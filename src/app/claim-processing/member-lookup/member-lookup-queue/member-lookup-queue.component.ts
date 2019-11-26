import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ReferencesApi, ReportDetailVO} from '@fox/rest-clients';
import {Subscription} from 'rxjs';
import {
  FeatureFlagService,
  HeaderRightItem,
  ModalService,
  PageHeaderService,
  reportsFeature
} from '@fox/shared';
import * as uuid from 'uuid';
import {PotentialMatchesActionsComponent} from '../potential-matches-actions/potential-matches-actions.component';
import {PotentialMatchesService} from '../potential-matches/potential-matches.service';
import {MemberLookupQueueRightComponent} from './member-lookup-queue-right/member-lookup-queue-right.component';

@Component({
  selector: 'fox-member-lookup-queue',
  templateUrl: 'member-lookup-queue.component.html',
  styleUrls: ['./member-lookup-btn.css', 'member-lookup-queue.component.css']
})
export class MemberLookupQueueComponent implements OnInit, OnDestroy {

  msReports: ReportDetailVO[] | undefined;
  nasReports: ReportDetailVO[] | undefined;
  @ViewChild('potentialMatchesActions') potentialMatchesActions: PotentialMatchesActionsComponent;
  innerWidth: number;
  buttonClickedSubscription: Subscription;
  isHeaderSet = false;

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  get hasNoMatches(): boolean {
    return this.potentialMatchesSvc.matches.length === 0 && !!this.potentialMatchesSvc.claim.claimTrackingId;
  }

  get hasReleaseEnableReports(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled(reportsFeature);
  }

  constructor(
    private referencesSvc: ReferencesApi,
    private modalService: ModalService,
    private featureFlagSvc: FeatureFlagService,
    private potentialMatchesSvc: PotentialMatchesService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  ngOnInit(): void {
    this.referencesSvc.listOperationalReport(uuid(), 'MLK', 'body', false).subscribe(res => {
      this.msReports = res.microStrategyReport;
      this.nasReports = res.nasDriveReport;
    });
    this.innerWidth = window.innerWidth;
    this.pageHeaderService.customTitle = 'Member Lookup Queue';

    this.buttonClickedSubscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      if (item === 'reports_button') {
        this.reportModalVisible = true;
      }
    });

    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      MemberLookupQueueRightComponent,
      {
        reportsBtn: {
          identifier: 'reports_button',
          display: 'Reports',
          disabled: !this.hasReleaseEnableReports
        }
      },
      this.componentFactoryResolver,
      this.injector);
  }

  childEventClicked(event: Event): void {
    this.potentialMatchesActions.modalView = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.buttonClickedSubscription.unsubscribe();
  }
}

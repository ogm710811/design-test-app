import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Router} from '@angular/router';
import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  claimProcessingUrlPrefixClaimDetails,
  CommunicationCommarea,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathRoot,
  HeaderRightItem,
  HeaderSubtitleItem,
  memberInformationUrlPrefixMemberProfile,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';

import {QltyRvwClmCmnctInfoContainer} from './model/qlty-rvw-clm-cmnct-info-container.model';
import {QltyRvwClmCmnctInfo} from './model/qlty-rvw-clm-cmnct-info.model';
import {QualityReviewInfoRightComponent} from './quality-review-info-right/quality-review-info-right.component';
import {QualityReviewInfoSubtitleComponent} from './quality-review-info-subtitle/quality-review-info-subtitle.component';

/**
 * Component/View
 * Qualified name:
 * com::uhc::aarp::fox::online::qltyrvwclmcmnctinfo::qltyrvwclmcmnctinfo::qltyrvwclmcmnctinfo
 */
@Component({
  selector: 'fox-quality-review-info',
  templateUrl: './quality-review-info.component.html',
  styleUrls: ['./quality-review-info.component.css']
})
export class QualityReviewInfoComponent implements OnInit {
  screen = new QltyRvwClmCmnctInfo();
  commonCommunication = new CommunicationCommarea();
  memberProfUrl: string = '';
  memberMigrated: BadgeSettings = new BadgeSettings();
  memberNumber: string = '';

  qualityReplies = [
    {id: 1, label: 'Approve'},
    {id: 2, label: 'Suspend'},
    {id: 3, label: 'Bypass Claim'}
  ];
  continueStatus = 'Submit';

  // Modal
  @Input() qualityReviewInfoVisible: boolean = false;
  @Output() cancelQualityReviewInfoModal: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();
  @Output() enterClicked: EventEmitter<any> = new EventEmitter();

  url: string = '../' + communicationRoutePathQualityReviewComm;
  claimUrl: string = claimProcessingUrlPrefixClaimDetails;

  public constructor(
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private messageBoxService: MessageBoxService
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.loadFromQualitReview();
  }

  loadFromQualitReview(): void {

    let container = new QltyRvwClmCmnctInfoContainer();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.commonCommunication = data['commonCommunication'];
    this.commonCommunication = this.commonCommunication === undefined ? this.commonCommunication = new CommunicationCommarea() : this.commonCommunication;
    this.qltyRvwClmCmnctInfoServiceInitProcess(this.commonCommunication).subscribe(res => {
      container = res;
      this.screen = container.screen;
      this.commonCommunication = container.commonArea;
      this.memberNumber = this.screen.m87ins.split(' ')[0];
      data = this.transferSrv.getData();

      this.memberMigrated = {
        templateType: BadgeTemplates.iconText,
        backgroundColor: BadgeColors.memberMigrated,
        badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
        text: this.screen.m87ins.split('    ')[1],
        iconClasses: [BadgeIcons.memberMigrated],
        iconPosition: BadgeIconPositions.before
      };

      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(QualityReviewInfoSubtitleComponent, {
        memberName: this.screen.m87ins1,
        account: this.memberNumber,
        communication: this.screen.m87cn,
        quality: this.screen.m87qn
      }, this.componentFactoryResolver, this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(QualityReviewInfoRightComponent, {}, this.componentFactoryResolver, this.injector);
    });
  }

  /**
   * Event action ReplyEventClick
   */
  replyEventClick(): void {
    let container = new QltyRvwClmCmnctInfoContainer();
    const screen = new QltyRvwClmCmnctInfo();
    this.continueStatus = 'Working...';

    container.commonArea = this.commonCommunication;
    container.screen = this.screen;

    this.qltyRvwClmCmnctInfoServiceReply(container).subscribe(res => {
      container = res;
      this.screen = container.screen;
      this.commonCommunication = container.commonArea;
      this.enterClicked.emit({'msg': container.screen.m87msg1});
      const message: string = this.screen.m87msg1;
      if (message && message.includes('QUAL')) {
        this.messageBoxService.addMessageBox('Review Communication', MessageBoxType.SUCCESS, message, 3000);
        this.continueStatus = 'Success!';
        this.router.navigate([communicationRoutePathRoot, communicationRoutePathQualityReviewComm]);
      } else if (message) {
        this.continueStatus = 'Failed';
        this.messageBoxService.addMessageBox('Review Communication', MessageBoxType.ERROR, message);
      }
      setTimeout(() => this.continueStatus = 'Submit', 3000);
    }, error => {
      this.continueStatus = 'Failed';
      setTimeout(() => this.continueStatus = 'Submit', 3000);
    });
  }

  getUrl(): string {
    if (this.memberNumber) {
      this.memberProfUrl = memberInformationUrlPrefixMemberProfile + this.memberNumber;
    }
    return this.memberProfUrl;
  }

  /**
   * Back end calls reply
   */
  private qltyRvwClmCmnctInfoServiceReply(qltyRvwClmCmnctInfoContainer: QltyRvwClmCmnctInfoContainer): Observable<QltyRvwClmCmnctInfoContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<QltyRvwClmCmnctInfoContainer>('/api/overpayment/services/qltyrvwclmcmnctinfo/qltyrvwclmcmnctinfoservice/reply', JSON.stringify(qltyRvwClmCmnctInfoContainer), options);

  }

  /**
   * Back end calls initProcess
   */
  private qltyRvwClmCmnctInfoServiceInitProcess(commonArea: CommunicationCommarea): Observable<QltyRvwClmCmnctInfoContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<QltyRvwClmCmnctInfoContainer>('/api/overpayment/services/qltyrvwclmcmnctinfo/qltyrvwclmcmnctinfoservice/initprocess', JSON.stringify(commonArea), options);

  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {
  claimProcessingUrlPrefixClaimDetails,
  communicationRouteCommandEditCommInfo,
  HeaderRightItem,
  ModalService,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  ReadOnlyTypeEnum,
  RvwCmnctHistCommonArea,
  TransferSrvService
} from '@fox/shared';
import {Observable, Subscription} from 'rxjs';
import {Rpdmb56Container} from './model/rpdmb56-container.model';
import {Rpdmb56} from './model/rpdmb56.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwcmncthistmiscinfo::rvwcmncthistmiscinfo::rvwcmncthistmiscinfo
 */
@Component({
  selector: 'fox-review-communication',
  templateUrl: './review-communication.component.html',
  styleUrls: ['./review-communication.component.css']
})
export class ReviewCommunicationComponent implements OnInit {
  screen = new Rpdmb56();
  reviewCommArea = new RvwCmnctHistCommonArea();
  communicationId: string = '';
  isHeaderOn = false;
  memberName: string = '';
  commStatus: string = '';
  subscription: Subscription = new Subscription();
  btnAction: string = '';
  readonlyTypes = ReadOnlyTypeEnum;

  public constructor(
    protected httpClient: HttpClient,
    protected transferSrv: TransferSrvService,
    protected activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private pageHeaderService: PageHeaderService,
    protected router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe((item: string) => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'm') {
        this.pf8EventClick();
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['commId']) {
        this.communicationId = params['commId'];
      }
      let container = new Rpdmb56Container();
      let data = this.transferSrv.getData();
      this.reviewCommArea = data['reviewCommArea'];
      this.commStatus = this.getCommunicationStatus(this.reviewCommArea);
      this.reviewCommArea = this.reviewCommArea === undefined ? new RvwCmnctHistCommonArea() : this.reviewCommArea;
      if (this.reviewCommArea.commNbr === '') {
        this.reviewCommArea.commNbr = this.communicationId;
      }
      this.rvwCmnctHistMiscInfoServiceScreenMap(this.reviewCommArea).subscribe(resp => {
        container = resp;
        data = this.transferSrv.getData();
        this.screen = container.screenbean;
        this.reviewCommArea = container.commonArea;
        if (this.commStatus === 'Suspended') {
          this.pageHeaderService.headerRightItem = new HeaderRightItem(
            ProcessClaimHeaderRightComponent,
            {
              suspendBtn: {
                display: 'Edit Suspended Comm (M)', identifier: 'm', tab: 'alt+m'
              }
            },
            this.componentFactoryResolver,
            this.injector
          );
        }
        this.pageHeaderService.customTitle = 'Review Communication Information';
        this.pageHeaderService.headerSubtitleItem = new HeaderRightItem(
          ProcessClaimSubheaderComponent,
          {
            memberName: this.screen.m56name,
            account: this.screen.m56acct,
            communication: this.communicationId,
          },
          this.componentFactoryResolver,
          this.injector
        );
      });
    });
    this.modalService.routeValidationModalVisible = false;
  }

  /**
   * Event action nextCommunicationEventClick
   */
  nextCommunicationEventClick(): void {
    let container = new Rpdmb56Container();
    container.screenbean = this.screen;
    container.commonArea = this.reviewCommArea;
    this.rvwCmnctHistMiscInfoServiceNextLetter(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.reviewCommArea = container.commonArea;
      this.commStatus = this.getCommunicationStatus(this.reviewCommArea);
    });
  }

  /**
   * Event action previousCommunicationEventClick
   */
  previousCommunicationEventClick(): void {
    let container = new Rpdmb56Container();
    container.screenbean = this.screen;
    container.commonArea = this.reviewCommArea;
    this.rvwCmnctHistMiscInfoServicePrevLetter(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.reviewCommArea = container.commonArea;
      this.commStatus = this.getCommunicationStatus(this.reviewCommArea);
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {
  }

  /**
   * Event action pf8EventClick
   */
  pf8EventClick(): void {
    let param: NavigationExtras = {};
    param = {
      queryParams: {
        commId: this.communicationId,
        command: communicationRouteCommandEditCommInfo,
      }
    };
    this.router.navigate(['/communication/communication-info'], param);
  }

  getCommunicationStatus(common: RvwCmnctHistCommonArea): string {
    let status = '';
    if (common) {
      const bmScreenInd = common.comComm.bmScreenInd;
      common.correspondenceTable.corresItems.forEach((item, index) => {
        if (bmScreenInd === (index + 1).toString()) {
          status = item.corresFileInd === 'S' ? 'Suspended' : item.corresFileInd === 'C' ? 'Completed' : item.corresFileInd === 'E' ? 'E' : item.corresFileInd === 'X' ? 'X' : '';
        }
      });
    }
    return status;
  }

  linkClicked(claimNumber: string): void {
    this.router.navigate([claimProcessingUrlPrefixClaimDetails, claimNumber]);
  }

  setPhoneNumber(area: string, phone1: string, phone2: string, ext: string): string {
    const areaCode = area ? area : '';
    const p1 = phone1 ? '-' + phone1 : '';
    const p2 = phone2 ? '-' + phone2 : '';
    const ex = ext ? ', ' + ext : '';
    return areaCode + p1 + p2 + ex;
  }

  /**;
   * Back end calls nextLetter
   */
  private rvwCmnctHistMiscInfoServiceNextLetter(container: Rpdmb56Container): Observable<Rpdmb56Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpdmb56Container>('/api/overpayment/services/rvwcmncthistmiscinfo/rvwcmncthistmiscinfoservice/nextletter', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenMap
   */
  private rvwCmnctHistMiscInfoServiceScreenMap(common: RvwCmnctHistCommonArea): Observable<Rpdmb56Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpdmb56Container>('/api/overpayment/services/rvwcmncthistmiscinfo/rvwcmncthistmiscinfoservice/screenmap', JSON.stringify(common), options);
  }

  /**
   * Back end calls prevLetter
   */
  private rvwCmnctHistMiscInfoServicePrevLetter(container: Rpdmb56Container): Observable<Rpdmb56Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpdmb56Container>('/api/overpayment/services/rvwcmncthistmiscinfo/rvwcmncthistmiscinfoservice/prevletter', JSON.stringify(container), options);

  }
}

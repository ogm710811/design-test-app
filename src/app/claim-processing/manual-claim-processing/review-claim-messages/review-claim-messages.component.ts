import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathProcessClaimMessages,
  claimProcessingRoutePathRoot,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimSubheaderComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './model/container.model';
import {RvwClmMsgText} from './model/rvw-clm-msg-text.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwclmmsgtext::rvwclmmsgtext::rvwclmmsgtext
 */
@Component({
  selector: 'fox-app-rvwclmmsgtext',
  templateUrl: './review-claim-messages.component.html',
  styleUrls: ['./review-claim-messages.component.css']
})
export class ReviewClaimMessagesComponent implements OnInit, AfterViewChecked {
  screen = new RvwClmMsgText();
  common = new Dfhcommarea();
  isHeaderSet: boolean = false;
  claimMessageArray: string[] = [];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let data: any = undefined;
    let container = new Container();

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.rvwClmMsgTextServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screenbean;
    this.common = container.dfhcomm;
    this.screen.rpdmb34Tabs.forEach(singleMessage => {
      if (singleMessage.mb34Dtl) {
        this.claimMessageArray.push(singleMessage.mb34Dtl);
      }
    });
    if (this.screen.mb34ErrMsg) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.mb34ErrMsg);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderSet) {
      this.pageHeaderService.customTitle = 'Review Claim Message Text';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: this.common.processClaimCommarea.nameCompressed ? this.common.processClaimCommarea.nameCompressed : 'N/A',
          account: this.common.processClaimCommarea.membershipNumber ? this.common.processClaimCommarea.membershipNumber : 'N/A',
          claim: this.common.processClaimCommarea.claimNumber ? this.common.processClaimCommarea.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderSet = true;
      }
    }
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screen;
    let data: any = undefined;
    container.dfhcomm = this.common;
    container = await this.rvwClmMsgTextServiceF1Operation(container).toPromise();

    this.screen = container.screenbean;
    this.common = container.dfhcomm;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.workStorage.wsReturnPgm = 'RPD06O54') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimMessages]);
    }
    return true;
  }

  /**
   * Event action F7EventClick
   */
  async F7EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screen;
    container.dfhcomm = this.common;
    container = await this.rvwClmMsgTextServiceF7Operation(container).toPromise();
    this.screen = container.screenbean;
    this.common = container.dfhcomm;
    return true;
  }

  /**
   * Event action F8EventClick
   */
  async F8EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screen;
    container.dfhcomm = this.common;
    container = await this.rvwClmMsgTextServiceF8Operation(container).toPromise();
    this.screen = container.screenbean;
    this.common = container.dfhcomm;
    return true;
  }

  /**
   * Back end calls editCommandLine
   */
  private rvwClmMsgTextServiceF8Operation(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwclmmsgtext/rvwclmmsgtextservice/f8operation', JSON.stringify(container), options);
  }

  private rvwClmMsgTextServiceF7Operation(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwclmmsgtext/rvwclmmsgtextservice/f7operation', JSON.stringify(container), options);
  }

  private rvwClmMsgTextServiceF1Operation(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwclmmsgtext/rvwclmmsgtextservice/f1operation', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOperation
   */
  private rvwClmMsgTextServiceMainOperation(dfhcomm: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/rvwclmmsgtext/rvwclmmsgtextservice/mainoperation', JSON.stringify(dfhcomm), options);
  }
}

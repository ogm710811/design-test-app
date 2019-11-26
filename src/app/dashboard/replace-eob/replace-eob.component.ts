import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  dashboardRoutePathCurrentStats,
  dashboardRoutePathRoot,
  Dfhcommarea,
  EligibilityIoArea,
  MessageBoxService,
  PaginatorNonMaterialComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {EobRepl} from './model/eob-repl.model';
import {TenClaimLines} from './model/ten-claim-lines.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::eobrepl::eobrepl::eobrepl
 */
@Component({
  selector: 'fox-replace-eob',
  templateUrl: './replace-eob.component.html',
  styleUrls: ['./replace-eob.component.css']
})
export class ReplaceEobComponent implements OnInit {

  @ViewChild('memberid') memberIdElRef?: ElementRef | null;
  @ViewChild('claimNumid') claimIdElRef?: ElementRef | null;
  membershipId: string = '';
  claimNum: string = '';

  screen = new EobRepl();
  common = new Dfhcommarea();
  container = new Container();
  page: number = 1;
  titleName: string = '';
  addr: string = '';
  replAll: string = '';

  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  viewData: TenClaimLines[];
  pageTotal = 0;
  pageSizeSelected = 17;
  currentPage = 0;
  pageSizeDropdownOption = [17, 34, 51];

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.tenClaimLines) ? this.screen.tenClaimLines.length : 0) : 0;
  }

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private activatedRoute: ActivatedRoute,
                     protected messageBoxService: MessageBoxService,
                     protected opMaintenance: OpMaintenanceService,
                     private titlecasePipe: TitleCasePipe) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.messageBoxService.reset();
    this.formReplaceEobRequest();
    let data: any = undefined;
    data = this.transferSrv.getData();

    this.common = data['dfhComarea'];
    this.common = undefined ? new Dfhcommarea() : this.common;
    this.container.dfhCommArea = this.common;

    const eligibilityIoArea = data['eligibilityIoArea'];
    this.container.eligibilityIoArea = eligibilityIoArea;

    if (this.membershipId !== '' || this.claimNum !== '') {
      this.container = await this.rvwOperatorStatServiceMainProcess(this.container).toPromise();
    }
    this.screen = this.container.screen;
    this.titleName = this.screen.m35head;

    this.titleName = this.doUppercaseEob(this.titlecasePipe.transform(this.titleName.substring(2, this.titleName.length - 3)));
    this.replAll = this.doUppercaseEob(this.titlecasePipe.transform(this.screen.m35repl.substring(0, this.screen.m35repl.length - 1)));

    this.calculatePage();
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action ClearEventClick
   */
  async ClearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.container = await this.rvwOperatorStatServiceShowFreshMap(this.container).toPromise();
    this.screen = this.container.screen;
    this.calculatePage();
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async EnterEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.container.screen = this.screen;
    console.log(this.container.screen.tenClaimLines);
    console.log('++this.container.screen repInd 0' + this.container.screen.tenClaimLines[0].repInd);
    this.container = await this.rvwOperatorStatServiceScreenData(this.container).toPromise();
    this.screen = this.container.screen;
    this.calculatePage();
    if (this.screen.m35err1) {
      this.opMaintenance.displayMessage(this.screen.m35err1);
    }
    if (this.screen.m35err2) {
      this.opMaintenance.displayMessage(this.screen.m35err2);
    }
    console.log(' this.container.dfhCommArea.commComm.returnModule ==' + this.container.dfhCommArea.commComm.returnModule);
    if (this.container.dfhCommArea.commComm.returnModule === 'RPD07O01') {
      this.router.navigate(['/']);
    }
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action CancelEventClick
   */
  async CancelEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.container = await this.operSelectionServiceCancelBrowse(this.container).toPromise();
    this.transferSrv.set('dfhComarea', this.container.dfhCommArea);
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathCurrentStats]);
    return true;
  }

  calculatePage(): void {
    this.viewData = this.screen.tenClaimLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.tenClaimLines.length / this.paginator.pageSize);
  }

  /**
   * Back end calls mainProcess
   */
  private rvwOperatorStatServiceMainProcess(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/eobrepl/eobreplservice/mainprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private rvwOperatorStatServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/eobrepl/eobreplservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private rvwOperatorStatServiceScreenData(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/eobrepl/eobreplservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancelBrowse
   */
  private operSelectionServiceCancelBrowse(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/eobrepl/eobreplservice/return_830', JSON.stringify(container), options);

  }

  private getHeaderParams(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['memberid'] && params['memberid'] !== '') {
        this.membershipId = params['memberid'];
        if (this.memberIdElRef && this.memberIdElRef.nativeElement) {
          this.memberIdElRef.nativeElement.focus();
        }
      } else {
        this.membershipId = '';
      }

      if (params['claimNumid'] && params['claimNumid'] !== '') {
        this.claimNum = params['claimNumid'];
        if (this.claimIdElRef && this.claimIdElRef.nativeElement) {
          this.claimIdElRef.nativeElement.focus();
        }
      } else {
        this.claimNum = '';
      }
    });
  }

  private formReplaceEobRequest(): void {
    this.getHeaderParams();
    const data = this.transferSrv.getData();
    this.common = data['dfhComarea'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;

    this.common.commComm.membershipId = Number(this.membershipId);
    this.common.commComm.claimNumber = Number(this.claimNum);
    this.common.eibTrnId = 'RPD07O01';
    this.common.commComm.mem1I = 're';
    this.common.commComm.cno1I = '';
    this.common.commComm.currentDate = '181030';
    this.common.eibTermId = 'RPF2';

    // MOCK RPD05O45 - COMPASS
    const eligibilityIoArea = new EligibilityIoArea();

    eligibilityIoArea.returnStatusArea.returnCd = '0';
    eligibilityIoArea.compasReplyArea.exPaymentPlanSeg.edMemberInsuredCode = '1';

    if (this.membershipId === '31847773111') {
      this.common.commComm.ionsId = '4096';
    } else {
      this.common.commComm.ionsId = '10440';
    }

    this.transferSrv.set('dfhComarea', this.common);
    this.transferSrv.set('eligibilityIoArea', eligibilityIoArea);
  }

  private doUppercaseEob(data: string): string {
    if (data.toLowerCase().includes('eob')) {
      data = data.replace('Eob', 'EOB');
    }
    return data;
  }

}

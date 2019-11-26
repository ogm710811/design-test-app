import {HttpClient} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorAuthPlanOne,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  HeaderRightItem,
  MessageBoxService,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {opAuthLimitVerifyMsg} from '../../operator-maintenance.constants';
import {Container} from './model/container.model';
import {Rpdma73o} from './model/rpdma73o.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operauthlimit::operauthlimit::operauthlimit
 */
@Component({
  selector: 'fox-operauthlimit',
  templateUrl: './op-auth-limit.component.html',
  styleUrls: ['./op-auth-limit.component.css']
})
export class OpAuthLimitComponent implements OnInit, OnDestroy {
  screenBean = new Rpdma73o();
  common = new Dfhcommarea();
  buttonStatus: string = ButtonStatus.SUBMIT;
  subscription: Subscription;
  btnAction: string;
  inputData: any;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private injector: Injector,
                     public pageHeaderService: PageHeaderService,
                     private opMaintenance: OpMaintenanceService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {

    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.operAuthLimitServiceOperationOnload(this.common).toPromise();
    data = this.transferSrv.getData();
    this.inputData = {...container.rpdma73o};
    this.screenBean = container.rpdma73o;
    this.common = container.dfhcommarea;
    if (this.screenBean.m73erro) {
      this.opMaintenance.displayMessageBox(this.screenBean.m73erro, opAuthLimitVerifyMsg);
    }
    if (this.screenBean.m73err2o) {
      this.opMaintenance.displayMessageBox(this.screenBean.m73err2o, opAuthLimitVerifyMsg);
    }
    this.pageHeaderService.customTitle = 'Operator Authority Limit ' + this.titleCase(this.screenBean.m73titlo);
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        suspendBtn: {
          display: 'Plan Screen (M)', identifier: 'm', tab: 'alt+m'
        }
      },
      this.componentFactoryResolver,
      this.injector);
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'm') {
        this.F2EventClick();
      }
    });

    return true;
  }

  /**
   * Event action ClearEventClick
   */
  async ClearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.screenBean.m73decio = '';
    this.screenBean.m73excpo = '';
    this.screenBean.m73fopro = '';
    this.screenBean.m73payao = '';
    this.screenBean.m73wapro = '';
    this.screenBean.m73msexo = '';
    this.screenBean.m73clago = '';
    this.screenBean.m73stayo = '';
    this.screenBean.m73snfdo = '';
    this.screenBean.m73pdnfo = '';
    this.screenBean.m73pupbo = '';
    this.screenBean.m73shifo = '';
    this.screenBean.m73plano = '';
    for (let i = 0; i < this.screenBean.dfhms1s.length; i++) {
      this.screenBean.dfhms1s[i].m73cauto = '';
    }

    return true;
  }

  onEventChange(key, $event, warning): void {
    if ($event && $event.target) {
      if (this.inputData[key] === $event.target.value) {
        this.screenBean[warning] = 'N';
      } else {
        this.screenBean[warning] = 'Y';
      }
    }
  }

  /**
   * Event action EnterEventClick
   */
  async EnterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      let container = new Container();
      let data: any = undefined;
      container.rpdma73o = this.screenBean;
      container.dfhcommarea = this.common;
      container = await this.operAuthLimitServiceMainRunMethod(container).toPromise();
      this.screenBean = container.rpdma73o;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screenBean.m73erro) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screenBean.m73erro, opAuthLimitVerifyMsg);
      }
      if (this.screenBean.m73err2o) {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screenBean.m73err2o, opAuthLimitVerifyMsg);
      }
      if (this.screenBean.m73erro.match('YYY')) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
    return true;
  }

  /**
   * Event action ReturnEventClick
   */
  async ReturnEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.rpdma73o = this.screenBean;
    const common = new Dfhcommarea();
    container.dfhcommarea = common;
    container = await this.operAuthLimitServiceReturnControl(container).toPromise();
    this.screenBean = container.rpdma73o;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Event action f2CallPlanScreen
   */
  async F2EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    const return_object = new Container();
    container.rpdma73o = this.screenBean;
    container.dfhcommarea = this.common;
    container = await this.operAuthLimitServiceF2CallPlanScreen(container).toPromise();
    this.screenBean = container.rpdma73o;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (this.common.callingProgram.trim() === 'RPD05O76') {
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthPlanOne]);
    }
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls operationOnload
   */
  private operAuthLimitServiceOperationOnload(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlimit/operauthlimitservice/operationonload', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls clearShowFreshMap
   */
  private operAuthLimitServiceClearShowFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlimit/operauthlimitservice/clearshowfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnControl
   */
  private operAuthLimitServiceReturnControl(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlimit/operauthlimitservice/returncontrol', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunMethod
   */
  private operAuthLimitServiceMainRunMethod(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlimit/operauthlimitservice/mainrunmethod', JSON.stringify(container), options);

  }

  /**
   * Back end calls f2CallPlanScreen
   */
  private operAuthLimitServiceF2CallPlanScreen(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlimit/operauthlimitservice/f2callplanscreen', JSON.stringify(container), options);

  }
}

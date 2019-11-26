import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathOperatorTransSecurityOne,
  dashboardRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {opTransSecurityVerifyMsg} from '../../../operator-maintenance.constants';
import {Container} from '../model/container.model';
import {OperTransSecur2} from '../model/oper-trans-secur2.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::opertranssecur::opertranssecur2::opertranssecur2
 */
@Component({
  selector: 'fox-op-trans-security-two',
  templateUrl: './op-trans-security-two.component.html',
  styleUrls: ['./op-trans-security-two.component.css']
})

export class OpTransSecurityTwoComponent implements OnInit {

  screenBean2 = new OperTransSecur2();
  common = new Dfhcommarea();
  activeMsg: string = 'PLEASE VERIFY TRANSACTION SECURITY';
  buttonStatus = ButtonStatus.SUBMIT;
  lastMaintenanceDate: string;
  inputData = new OperTransSecur2();

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     protected headerMaintenance: HeaderMaintenanceService,
                     private pageHeaderService: PageHeaderService,
                     private requestDate: DateFormatService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    const screenBean2 = new OperTransSecur2();
    const common = new Dfhcommarea();

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    container = await this.operTransSecurServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screenBean2 = container.screenbean2;
    this.inputData = {...this.screenBean2};
    this.common = container.dfhcommonarea;

    if (this.screenBean2.m76err) {
      this.opMaintenance.displayMessageBox(this.screenBean2.m76err, opTransSecurityVerifyMsg);
    }
    if (this.screenBean2.m76err2) {
      this.opMaintenance.displayMessageBox(this.screenBean2.m76err2, opTransSecurityVerifyMsg);
    }

    this.pageHeaderService.customTitle = this.titleCase(this.screenBean2.m76titl) + ' Operator Transaction Security Maintenance S2';

    this.lastMaintenanceDate = this.requestDate.getCcyyFormatedDateIE(this.screenBean2.m76mdat.replace(/\//g, ''));

    return true;
  }

  /**
   * Event action CLEAREventClick
   */
  async CLEAREventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    const container = new Container();
    const common = new Dfhcommarea();
    const screenBean2 = new OperTransSecur2();

    container.screenbean2 = this.screenBean2;
    container.dfhcommonarea = this.common;
    this.operTransSecurServiceShowFreshMapS2(container).toPromise();
    this.screenBean2 = container.screenbean2;
    this.common = container.dfhcommonarea;
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async EnterEventClick(): Promise<boolean> {
    this.buttonStatus = ButtonStatus.WORKING;
    this.messageBoxService.reset();
    let container = new Container();
    const common = new Dfhcommarea();
    const screenBean2 = new OperTransSecur2();
    let data: any = undefined;
    container.screenbean2 = this.screenBean2;
    container.dfhcommonarea = this.common;
    try {
      container = await this.operTransSecurServiceMainRunS2(container).toPromise();
      this.screenBean2 = container.screenbean2;
      this.common = container.dfhcommonarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screenBean2.m76err) {
        this.opMaintenance.displayMessageBox(this.screenBean2.m76err, opTransSecurityVerifyMsg);
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
      }
      if (this.screenBean2.m76err2) {
        this.opMaintenance.displayMessageBox(this.screenBean2.m76err2, opTransSecurityVerifyMsg);
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
      }
      if (container.workstorage.trnCompleted === 'Y') {
        this.successState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
      }
      window.scrollTo(0, 0);
      return true;
    } catch {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }
  }

  /**
   * Event action F1EventClick
   */
  async F1EventClick(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new OperTransSecur2();
    let data: any = undefined;
    container.screenbean2 = this.screenBean2;
    container.dfhcommonarea = this.common;
    container = await this.operTransSecurServiceCancel(container).toPromise();
    this.screenBean2 = container.screenbean2;
    this.common = container.dfhcommonarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Event action F4EventClick
   */
  async PF4EventClick(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new OperTransSecur2();
    let data: any = undefined;

    container.screenbean2 = this.screenBean2;
    container.dfhcommonarea = this.common;
    container = await this.operTransSecurServicePageBackward(container).toPromise();
    this.screenBean2 = container.screenbean2;
    this.common = container.dfhcommonarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorTransSecurityOne]);
    return true;
  }

  onEventChange(key, event, warning): void {
    if (event && event.target) {
      this.screenBean2[key] = this.screenBean2[key].length > 0 ? this.screenBean2[key].toUpperCase() : this.screenBean2[key];
      if (this.inputData[key] === event.target.value.toUpperCase()) {
        this.screenBean2[warning] = 'N';
      } else {
        this.screenBean2[warning] = 'Y';
      }
    }
  }

  private successState(): void {
    this.buttonStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls showFreshMapS2
   */
  private operTransSecurServiceShowFreshMapS2(container: Container): Observable<void> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/operator/services/opertranssecur/opertranssecurservice/showfreshmaps2', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private operTransSecurServiceCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/cancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunS2
   */
  private operTransSecurServiceMainRunS2(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/mainruns2', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOperation
   */
  private operTransSecurServiceMainOperation(dfhcommonarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/mainoperation', JSON.stringify(dfhcommonarea), options);

  }

  /**
   * Back end calls pageBackward
   */
  private operTransSecurServicePageBackward(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/pagebackward', JSON.stringify(container), options);

  }
}

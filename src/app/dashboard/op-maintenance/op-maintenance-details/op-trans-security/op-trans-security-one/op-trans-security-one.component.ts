import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  dashboardRoutePathOperatorFile,
  dashboardRoutePathOperatorTransSecurityTwo,
  dashboardRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  MessageBoxService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {PageHeaderService} from '@fox/shared';
import {OpMaintenanceService} from '@fox/shared';
import {opTransSecurityVerifyMsg} from '../../../operator-maintenance.constants';
import {Container} from '../model/container.model';
import {OperTransSecur1} from '../model/oper-trans-secur1.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::opertranssecur::opertranssecur1::opertranssecur1
 */
@Component({
  selector: 'fox-op-trans-security-one',
  templateUrl: './op-trans-security-one.component.html',
  styleUrls: ['./op-trans-security-one.component.css']
})

export class OpTransSecurityOneComponent implements OnInit {

  screenBean1 = new OperTransSecur1();
  common = new Dfhcommarea();
  buttonStatus = 'Submit';
  lastMaintenanceDate: string;
  inputData = new OperTransSecur1();

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService,
                     private requestDate: DateFormatService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    const screenBean1 = new OperTransSecur1();
    let data: any = undefined;
    const common = new Dfhcommarea();

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    container = await this.operTransSecurServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screenBean1 = container.screenbean1;
    this.inputData = {...this.screenBean1};
    this.common = container.dfhcommonarea;
    if (this.screenBean1.m75err1) {
      this.opMaintenance.displayMessageBox(this.screenBean1.m75err1, opTransSecurityVerifyMsg);
    }
    if (this.screenBean1.m75err2) {
      this.opMaintenance.displayMessageBox(this.screenBean1.m75err2, opTransSecurityVerifyMsg);
    }

    this.pageHeaderService.customTitle = this.titleCase(this.screenBean1.m75titl) + 'Operator Transaction Security Maintenance S1';

    this.lastMaintenanceDate = this.requestDate.getCcyyFormatedDateIE(this.screenBean1.m75mdat.replace(/\//g, ''));

    return true;
  }

  /**
   * Event action CLEAREventClick
   */
  async CLEAREventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    const container = new Container();
    const common = new Dfhcommarea();
    const screenBean1 = new OperTransSecur1();

    container.screenbean1 = this.screenBean1;
    container.dfhcommonarea = this.common;
    this.operTransSecurServiceShowFreshMapS1(container).toPromise();
    this.screenBean1 = container.screenbean1;
    this.common = container.dfhcommonarea;
    return true;
  }

  /**
   * Event action EnterEventClick.
   */
  async EnterEventClick(): Promise<boolean> {
    this.buttonStatus = 'Working...';
    this.messageBoxService.reset();
    let container = new Container();
    let data: any = undefined;
    const common = new Dfhcommarea();
    const screenBean1 = new OperTransSecur1();
    container.screenbean1 = this.screenBean1;
    container.dfhcommonarea = this.common;
    try {
      container = await this.operTransSecurServiceMainRunS1(container).toPromise();
      this.screenBean1 = container.screenbean1;
      this.common = container.dfhcommonarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.screenBean1.m75err1) {
        this.opMaintenance.displayMessageBox(this.screenBean1.m75err1, opTransSecurityVerifyMsg);
        this.buttonStatus = 'Failed';
        this.resetState();
      }
      if (this.screenBean1.m75err2) {
        this.opMaintenance.displayMessageBox(this.screenBean1.m75err2, opTransSecurityVerifyMsg);
        this.buttonStatus = 'Failed';
        this.resetState();
      }
      if (container.workstorage.trnCompleted === 'Y') {
        this.successState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
      }
      window.scrollTo(0, 0);

      return true;
    } catch {
      this.buttonStatus = 'Failed';
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
    const screenBean1 = new OperTransSecur1();
    let data: any = undefined;
    container.screenbean1 = this.screenBean1;
    container.dfhcommonarea = this.common;

    container = await this.operTransSecurServiceCancel(container).toPromise();
    this.screenBean1 = container.screenbean1;
    this.common = container.dfhcommonarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Event action F3EventClick
   */
  async PF3EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    const common = new Dfhcommarea();
    const screenBean1 = new OperTransSecur1();

    container.screenbean1 = this.screenBean1;
    container.dfhcommonarea = this.common;

    container = await this.operTransSecurServicePageForward(container).toPromise();
    this.screenBean1 = container.screenbean1;
    this.common = container.dfhcommonarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorTransSecurityTwo]);
    return true;
  }

  onEventChange(key, event, warning): void {
    if (event && event.target) {
      this.screenBean1[key] = this.screenBean1[key].length > 0 ? this.screenBean1[key].toUpperCase() : this.screenBean1[key];
      if (this.inputData[key] === event.target.value.toUpperCase()) {
        this.screenBean1[warning] = 'N';
      } else {
        this.screenBean1[warning] = 'Y';
      }
    }
  }

  private successState(): void {
    this.buttonStatus = 'Success!';
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls showFreshMapS1
   */
  private operTransSecurServiceShowFreshMapS1(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/showfreshmaps1', JSON.stringify(container), options);

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
   * Back end calls pageForward
   */
  private operTransSecurServicePageForward(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/pageforward', JSON.stringify(container), options);

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
   * Back end calls mainRunS1
   */
  private operTransSecurServiceMainRunS1(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecur/opertranssecurservice/mainruns1', JSON.stringify(container), options);

  }
}

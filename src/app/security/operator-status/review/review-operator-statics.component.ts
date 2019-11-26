import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  ButtonStatus,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  HeaderMaintenanceService,
  securityRoutePathOperatorStatistics,
  securityRoutePathOperatorStatisticsTotals,
  securityRoutePathRoot,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './models/container.model';
import {Rpdma97} from './models/rpdma97.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwoperatorstat::rvwoperatorstat::rvwoperatorstat
 */
@Component({
  selector: 'fox-review-operator-statics',
  templateUrl: './review-operator-statics.component.html',
  styleUrls: ['./review-operator-statics.component.css']
})
export class ReviewOperatorStaticsComponent implements OnInit {
  screenBean = new Rpdma97();
  common = new Dfhcommarea();
  showOtherSearchMethods = false;
  continueStatus = ButtonStatus.SUBMIT;
  specifyDateDay = '';
  specifyDateWeek = '';

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected headerMaintenance: HeaderMaintenanceService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.rvwOperatorStatServiceMainProcess(this.common).subscribe(resp => {
      container = resp;
      /**  data = this.transferSrv.getData();*/
      this.screenBean = container.screenbean;
      this.common = container.dfhCommarea;
    });

  }

  /**
   * Event action btnClearEventClick
   */
  btnClearEventClick(): void {
    let container1 = new Container();
    const container = new Container();
    container.screenbean = this.screenBean;
    container.dfhCommarea = this.common;
    this.rvwOperatorStatServiceShowFreshMap(container).subscribe(resp => {
      container1 = resp;
      this.screenBean = container1.screenbean;
      this.common = container1.dfhCommarea;

      for (const key in this.screenBean) {
        if (this.screenBean.hasOwnProperty(key)) {
          this.screenBean[key] = '';
        }
      }

      this.specifyDateDay = '';
      this.specifyDateWeek = '';
    });

  }

  /**
   * Event action btnEnterEventClick
   */
  btnEnterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.screenBean.m97comrole = 'O';
    this.screenBean.m97loc = this.screenBean.m97comloc;
    this.screenBean.m97day = this.convertDate(this.specifyDateDay);
    this.screenBean.m97week = this.convertDate(this.specifyDateWeek);
    container.screenbean = this.screenBean;
    container.dfhCommarea = this.common;
    this.continueStatus = ButtonStatus.WORKING;
    this.rvwOperatorStatServiceScreenData(container).subscribe(resp => {
      container = resp;
      this.screenBean = container.screenbean;
      this.common = container.dfhCommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (container.nextProgram === 'RPD05O93') {
        this.setSuccess();
        this.router.navigate(['/security/operation-status-security']);
      }
      if (container.nextProgram === 'RPD05O95') {
        this.setSuccess();
        this.router.navigate([securityRoutePathRoot + '/' + securityRoutePathOperatorStatistics]);
      }
      if (container.nextProgram === 'RPD05O99') {
        this.setSuccess();
        this.router.navigate(['/quality-review/operator-statistics']);
      }
      if (container.nextProgram === 'RPD05O98') {
        this.setSuccess();
        this.router.navigate([securityRoutePathRoot + '/' + securityRoutePathOperatorStatisticsTotals]);
      }

      this.pushAlert(this.screenBean.m97err1);
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    }, error1 => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  /**
   * Event action btnF1EventClick
   */
  btnF1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screenBean;
    container.dfhCommarea = this.common;
    this.rvwOperatorStatServiceReturnControl(container).subscribe(resp => {
      container = resp;
      this.screenBean = container.screenbean;
      this.common = container.dfhCommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
    });
  }

  showOtherSearchMethodsFunction(): void {
    this.showOtherSearchMethods = !this.showOtherSearchMethods;
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();

  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  private convertDate(date: string): string {
    const dayArr =  date.slice(2, 10).split('-');
    return dayArr.length > 1 ? dayArr[1] + dayArr[2] + dayArr[0] : '';
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Review Operator Statistics', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls screenData
   */
  private rvwOperatorStatServiceScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwoperatorstat/rvwoperatorstatservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcess
   */
  private rvwOperatorStatServiceMainProcess(dfhCommarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwoperatorstat/rvwoperatorstatservice/mainprocess', JSON.stringify(dfhCommarea), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private rvwOperatorStatServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwoperatorstat/rvwoperatorstatservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnControl
   */
  private rvwOperatorStatServiceReturnControl(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwoperatorstat/rvwoperatorstatservice/returncontrol', JSON.stringify(container), options);

  }
}

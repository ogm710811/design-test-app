import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageBoxService, MessageBoxType, PlanInfoCmnArea, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdma11} from './model/rpdma11.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::plnstatetosmnt::plnstatetosmnt::plnstatetosmnt
 */
@Component({
  selector: 'fox-plan-state-type-of-service-maintenance',
  templateUrl: './plan-state-type-of-service-maintenance.component.html'
})
export class PlanStateTypeOfServiceMaintenanceComponent implements OnInit {
  screen = new Rpdma11();
  common = new PlanInfoCmnArea();
  container = new Container();

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
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
      this.common = new PlanInfoCmnArea();
    }
    // onLoadEvent
    this.plnStateTosMntServiceOnLoadProcess(this.common).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen = container.screenbean;
      this.common = container.commonArea;
    });

  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    let container = new Container();

    container.screenbean = this.screen;

    container.commonArea = this.common;
    // ClearEvent
    this.plnStateTosMntServiceShowFreshMap(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.common = container.commonArea;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  ENTEREventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screen;

    container.commonArea = this.common;
    // EnterButton

    this.plnStateTosMntServiceMainProcess(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.common = container.commonArea;
      this.container = container;
      this.pushAlert(this.screen.m11err1);
      data = this.transferSrv.getData();
      data['common'] = container.dfhCommArea;
      if (this.container.dfhCommArea.callingProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;

    container.screenbean = this.screen;

    container.commonArea = this.common;
    // PF1Button
    this.plnStateTosMntServiceCancel(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.common = container.commonArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.container.dfhCommArea.callingProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('PLEASE')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Type Of Service', MessageBoxType.ACTIVE, message);
    } else if (message) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Type Of Service', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls showFreshMap
   */
  private plnStateTosMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plnstatetosmnt/plnstatetosmntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcess
   */
  private plnStateTosMntServiceMainProcess(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plnstatetosmnt/plnstatetosmntservice/mainprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private plnStateTosMntServiceCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plnstatetosmnt/plnstatetosmntservice/cancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls onLoadProcess
   */
  private plnStateTosMntServiceOnLoadProcess(commonArea: PlanInfoCmnArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plnstatetosmnt/plnstatetosmntservice/onloadprocess', JSON.stringify(commonArea), options);

  }
}

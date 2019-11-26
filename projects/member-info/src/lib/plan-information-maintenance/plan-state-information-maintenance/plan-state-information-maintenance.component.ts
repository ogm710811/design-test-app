import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, PlanStateInformationExceptionRecordPO, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {PlanStateInfoMnt} from './model/plan-state-info-mnt.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::planstateinfomnt::planstateinfomnt::planstateinfomnt
 */
@Component({
  selector: 'fox-plan-state-info-maintenance.component',
  templateUrl: './plan-state-information-maintenance.component.html',
  styleUrls: ['./plan-state-information-maintenance.component.css']
})

export class PlanStateInfoMaintenanceComponent implements OnInit {
  common = new Dfhcommarea();
  screenBean = new PlanStateInfoMnt();

  // container = new Container();

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
    if (!this.common) {
      this.common = new Dfhcommarea();
    }
    this.planStateInfoMntServiceMainRoutine(this.common).subscribe(res => {
      container = res;
      this.screenBean = container.planstateinfomnt;
      this.common = container.dfhCommarea;
    });
  }

  /**
   * Event action CANCELEventClick
   */
  CANCELEventClick(): void {
    const screenBean = new PlanStateInfoMnt();
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    container.planstateinfomnt = this.screenBean;
    container.dfhCommarea = this.common;
    this.planStateInfoMntServiceCancel(container).subscribe(res => {
      container = res;
      this.screenBean = container.planstateinfomnt;
      this.common = container.dfhCommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.common.nextProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    const screenBean = new PlanStateInfoMnt();
    let container = new Container();
    const planStateExcept = new PlanStateInformationExceptionRecordPO();
    container.planstateinfomnt = this.screenBean;
    container.dfhCommarea = this.common;
    this.planStateInfoMntServiceShowFreshScreen(container, planStateExcept).subscribe(res => {
      container = res;
      this.screenBean = container.planstateinfomnt;
      this.common = container.dfhCommarea;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  ENTEREventClick(): void {
    const screenBean = new PlanStateInfoMnt();
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    // container = this.container;
    container.planstateinfomnt = this.screenBean;
    container.dfhCommarea = this.common;
    this.planStateInfoMntServiceMainRunRpdma27(container).subscribe(res => {
      container = res;
      this.screenBean = container.planstateinfomnt;
      this.common = container.dfhCommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.pushAlert(this.screenBean.errorMsg);
      if (this.common.nextProgram === 'RPD05O23') {
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      }
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('PLEASE')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Information Maintenance', MessageBoxType.ACTIVE, message);
    } else if (message) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Information Maintenance', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls showFreshScreen
   */
  private planStateInfoMntServiceShowFreshScreen(container: Container, planStateExcept: PlanStateInformationExceptionRecordPO): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planstateinfomnt/PlanStateInfoMntService/showfreshscreen', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunRpdma27
   */
  private planStateInfoMntServiceMainRunRpdma27(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planstateinfomnt/PlanStateInfoMntService/mainrunrpdma27', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private planStateInfoMntServiceCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planstateinfomnt/PlanStateInfoMntService/cancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private planStateInfoMntServiceMainRoutine(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planstateinfomnt/PlanStateInfoMntService/mainroutine', JSON.stringify(dfhCommArea), options);

  }
}

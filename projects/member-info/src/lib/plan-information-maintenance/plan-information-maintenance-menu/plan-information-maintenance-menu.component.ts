import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, FoxValidators, MessageBoxService, MessageBoxType, PlanInfoCmnArea, TransferSrvService} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdma36} from './model/rpdma36.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::planinfomntmenu::planinfomntmenu::planinfomntmenu
 */
@Component({
  selector: 'fox-plan-info-maintenance-menu',
  templateUrl: './plan-information-maintenance-menu.component.html',
  styleUrls: ['./plan-information-maintenance-menu.component.css']
})
export class PlanInfoMaintenanceMenuComponent implements OnInit {
  screen = new Rpdma36();
  common = new PlanInfoCmnArea();
  dfhComm = new Dfhcommarea();
  container = new Container();
  stopDateTOS = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);
  stopDateTOSCopy = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);
  endDateMedCare = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);
  endDateMedCareCopy = new FormControl('', [FoxValidators.mmddyyyySlashDateValidator]);

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
    this.dfhComm = data['common'];
    if (this.dfhComm !== undefined && this.dfhComm.planInfoCmnArea !== undefined) {
      this.common = this.dfhComm.planInfoCmnArea;
    }
    if (this.common === undefined) {
      this.common = new PlanInfoCmnArea();
    }
    // OnLoad
    this.planInfoMntMenuServiceOnLoadProcess(this.common).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen = container.screenBean;
      this.common = container.commonArea;
      this.container = container;
      this.pushAlert(this.screen.m36err1);

    });

  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    container.screenBean = this.screen;
    container.commonArea = this.common;

    // CLEAR
    this.planInfoMntMenuServiceClearScreen(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenBean;
      this.common = container.commonArea;
      this.container = container;

    });

  }

  /**
   * Event action ENTEREventClick
   */
  ENTEREventClick(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    container.screenBean = this.screen;
    container.commonArea = this.common;

    this.screen.m36sdt = this.screen.m36sdt ? moment(this.screen.m36sdt).format('YYYYMMDD') : '';
    this.screen.m36csdt = this.screen.m36csdt ? moment(this.screen.m36csdt).format('YYYYMMDD') : '';

    this.screen.m36edt = this.screen.m36edt ? moment(this.screen.m36edt).format('YYYYMMDD') : '';
    this.screen.m36cedt = this.screen.m36cedt ? moment(this.screen.m36cedt).format('YYYYMMDD') : '';

    // ENTER
    this.planInfoMntMenuServiceEnterProcess(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenBean;
      this.common = container.commonArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.pushAlert(this.screen.m36err1);
      if (this.container.workStorage.wsProgram === 'RPD05O24') {
        this.router.navigate(['/security/plan-tos-1']);
      }
      if (this.container.dfh.callingProgram === 'RPD05O28') {
        data['common'] = container.dfh;
        if (this.common.medConstRecordType === 1) {
          this.router.navigate(['/member-information/medicare-file-maintenance-1']);
        }
        if (this.common.medConstRecordType === 2) {
          this.router.navigate(['/member-information/medicare-file-maintenance-2']);
        }
        if (this.common.medConstRecordType === 3) {
          this.router.navigate(['/member-information/medicare-constant-oop']);
        }
      }
      if (this.container.workStorage.wsProgram === 'RPD05O27') {
        data['common'] = container.dfh;
        this.router.navigate(['/member-information/plan-state-information-maintenance']);
      }
      if (this.container.workStorage.wsProgram === 'RPD05O29') {
        this.router.navigate(['/member-information/plan-state-type-of-service']);
      }

      this.screen.m36sdt = this.screen.m36sdt ? moment(this.screen.m36sdt).format('MM/DD/YYYY') : '';
      this.screen.m36csdt = this.screen.m36csdt ? moment(this.screen.m36csdt).format('MM/DD/YYYY') : '';

      this.screen.m36edt = this.screen.m36edt ? moment(this.screen.m36edt).format('MM/DD/YYYY') : '';
      this.screen.m36cedt = this.screen.m36cedt ? moment(this.screen.m36cedt).format('MM/DD/YYYY') : '';
    });
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screenBean = this.screen;
    container.commonArea = this.common;

    // F1
    this.planInfoMntMenuServiceXctlPepCommandModule(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenBean;
      this.common = container.commonArea;

      data = this.transferSrv.getData();
      data['common'] = this.common;
    });
  }

  private pushAlert(message: string): void {

    if (message.includes('COMPLETED') || message.includes('DELETED')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Information Maintenance Menu', MessageBoxType.SUCCESS, message, 3000);
    } else if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Plan Information Maintenance Menu', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls enterProcess
   */
  private planInfoMntMenuServiceEnterProcess(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planinfomntmenu/planinfomntmenuservice/enterprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls clearScreen
   */
  private planInfoMntMenuServiceClearScreen(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planinfomntmenu/planinfomntmenuservice/clearscreen', JSON.stringify(container), options);

  }

  /**
   * Back end calls onLoadProcess
   */
  private planInfoMntMenuServiceOnLoadProcess(common: PlanInfoCmnArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planinfomntmenu/planinfomntmenuservice/onloadprocess', JSON.stringify(common), options);

  }

  /**
   * Back end calls xctlPepCommandModule
   */
  private planInfoMntMenuServiceXctlPepCommandModule(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/planinfomntmenu/planinfomntmenuservice/xctlpepcommandmodule', JSON.stringify(container), options);

  }
}

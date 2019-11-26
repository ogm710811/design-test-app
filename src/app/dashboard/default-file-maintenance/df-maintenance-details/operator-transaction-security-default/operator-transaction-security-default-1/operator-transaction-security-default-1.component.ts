import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonStatus, DateFormatService, Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {PageHeaderService} from '@fox/shared';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from '../model/container.model';
import {Rpdma87} from '../model/rpdma87.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::opertranssecurdflt::opertranssecurdflt::opertranssecurdflt
 */
@Component({
  selector: 'fox-oper-trans-secur-default-1',
  templateUrl: './operator-transaction-security-default-1.component.html',
  styleUrls: ['./operator-transaction-security-default-1.component.css']
})
export class OperatorTransactionSecDefault1Component implements OnInit {
  screen1 = new Rpdma87();
  common = new Dfhcommarea();
  container = new Container();
  buttonStatus: string = ButtonStatus.SUBMIT;
  lastMaintenanceDate: string;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     protected opMaintenance: OpMaintenanceService,
                     private requestDate: DateFormatService,
                     private pageHeaderService: PageHeaderService) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    const common = new Dfhcommarea();

    let data: any = undefined;
    const return_object = new Container();

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operTransSecurDfltServiceMainRoutine(this.common).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen1 = container.screen1;
      this.lastMaintenanceDate = this.requestDate.getCcyyFormatedDateIE(this.screen1.m87mdat.replace(/\//g, ''));
      this.pageHeaderService.customTitle = this.titleCase(this.screen1.m87utyp) + ' Transaction Security ' + this.titleCase(this.screen1.m87ttyp) + ' - S1';
      this.common = container.dfhComm;
    });
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    let common = new Dfhcommarea();
    let screen = new Rpdma87();
    container.screen1 = screen;
    container.dfhComm = common;
    this.operTransSecurDfltServiceShowFreshS1(container).subscribe(resp => {
      container = resp;
      screen = container.screen1;
      common = container.dfhComm;
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      let container = new Container();
      container.screen1 = this.screen1;
      let data: any = undefined;
      container.dfhComm = this.common;
      this.operTransSecurDfltServiceMainRunS1(container).subscribe(resp => {
        container = resp;

        this.screen1 = container.screen1;
        this.common = container.dfhComm;
        this.container.workStorage = container.workStorage;
        data = this.transferSrv.getData();
        data['common'] = this.common;

        if (this.container.workStorage.callingProgram.match('RPD05O68')) {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate(['/dfltovrdpendverfservice']);
        } else if (this.container.workStorage.callingProgram.match('RPD05O82')) {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate(['/dashboard/operator-default-file']);
        }

        this.pushAlert(this.screen1.m87err);
      });
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }

  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  clearButtonClick(): void {
    let tempScreen1 = new Rpdma87();
    tempScreen1 = {...this.screen1};
    this.screen1 = new Rpdma87();
    this.screen1.m87alev = tempScreen1.m87alev;
    this.screen1.m87alev = tempScreen1.m87alev;
    this.screen1.m87mdat = tempScreen1.m87mdat;
    this.screen1.m87mion = tempScreen1.m87mion;
    this.screen1.m87pos = tempScreen1.m87pos;
    this.screen1.m87ttyp = tempScreen1.m87ttyp;
    this.screen1.m87utyp = tempScreen1.m87utyp;
    tempScreen1 = new Rpdma87();
  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let container = new Container();
    container.screen1 = this.screen1;
    let data: any = undefined;
    container.dfhComm = this.common;

    this.operTransSecurDfltServiceCancel(container).subscribe(resp => {
      container = resp;

      this.screen1 = container.screen1;
      this.common = container.dfhComm;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.common.callingProgram.match('RPD05O68')) {
        console.log('5068 Call ');
        this.router.navigate(['/dfltovrdpendverfservice']);
      } else {
        console.log('Else Part 5O82 call ');
        this.router.navigate(['/dashboard/operator-default-file']);
      }
    });
  }

  /**
   * Event action F1EventClick
   */
  f3EventClick(): void {
    let container = new Container();
    container.screen1 = this.screen1;
    let data: any = undefined;
    container.dfhComm = this.common;

    this.operTransSecurDfltServiceNextScreenEventClick(container).subscribe(resp => {
      container = resp;
      this.screen1 = container.screen1;
      this.common = container.dfhComm;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/dashboard/oper-trans-sec-dflt-2']);
    });
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.buttonStatus = ButtonStatus.SUCCESS;
      this.resetState();
      this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ACTIVE, message);
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ERROR, message);
      }
    }
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls mainRoutine
   */
  private operTransSecurDfltServiceMainRoutine(dfhComm: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/mainroutine', JSON.stringify(dfhComm), options);

  }

  /**
   * Back end calls mainRunS1
   */
  private operTransSecurDfltServiceMainRunS1(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/mainruns1', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private operTransSecurDfltServiceCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/cancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshS1
   */
  private operTransSecurDfltServiceShowFreshS1(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/showfreshs1', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshS1
   */
  private operTransSecurDfltServiceNextScreenEventClick(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/nextScreen', JSON.stringify(container), options);

  }
}

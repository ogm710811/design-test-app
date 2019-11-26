import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  DateFormatService,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from '../model/container.model';
import {Rpdma88} from '../model/rpdma88.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::opertranssecurdflt::opertranssecurdflt1::opertranssecurdflt1
 */
@Component({
  selector: 'fox-oper-trans-secur-default-2',
  templateUrl: './operator-transaction-security-default-2.component.html',
  styleUrls: ['./operator-transaction-security-default-2.component.css']
})
export class OperatorTransactionSecDefault2Component implements OnInit {
  screen2 = new Rpdma88();
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

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operTransSecurDfltServiceMainRoutine(this.common).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screen2 = container.screen2;
      this.common = container.dfhComm;
      this.pageHeaderService.customTitle = this.titleCase(this.screen2.m88utyp) + ' Transaction Security ' + this.titleCase(this.screen2.m88ttyp) + ' - S2';
      this.lastMaintenanceDate = this.requestDate.getCcyyFormatedDateIE(this.screen2.m88mdat.replace(/\//g, ''));
    });
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new Rpdma88();

    let data: any = undefined;
    container.screen2 = this.screen2;
    container.dfhComm = this.common;
    this.operTransSecurDfltServiceShowFreshS2(container).subscribe(res => {
      container = res;
      this.screen2 = container.screen2;
      this.common = container.dfhComm;
      data = this.transferSrv.getData();
      data['common'] = this.common;
    });

  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      let container = new Container();
      const common = new Dfhcommarea();
      const screen = new Rpdma88();

      let data: any = undefined;
      container.screen2 = this.screen2;
      container.dfhComm = this.common;
      this.operTransSecurDfltServiceMainRunS2(container).subscribe(res => {
        container = res;
        this.screen2 = container.screen2;
        this.common = container.dfhComm;
        this.container.workStorage = container.workStorage;
        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (this.container.workStorage.callingProgram.match('RPD05O68')) {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate(['/dashboard/default-override-pending-verification']);
        } else if (this.container.workStorage.callingProgram.match('RPD05O82')) {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate(['/dashboard/operator-default-file']);
        }
        this.pushAlert(this.screen2.m88err);
      });
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
    }
  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let container = new Container();
    let common = new Dfhcommarea();
    let screen = new Rpdma88();
    let data: any = undefined;
    container.screen2 = this.screen2;
    container.dfhComm = this.common;

    this.operTransSecurDfltServiceCancel(container).subscribe(res => {
      container = res;
      screen = container.screen2;
      common = container.dfhComm;
      data = this.transferSrv.getData();
      data['common'] = common;

      if (this.common.callingProgram.match('RPD05O68')) {
        this.router.navigate(['/dfltovrdpendverfservice']);
      } else {
        this.router.navigate(['/dashboard/operator-default-file']);
      }
    });

  }

  /**
   * Event action F4EventClick
   */
  f4EventClick(): void {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new Rpdma88();
    let data: any = undefined;
    container.screen2 = this.screen2;

    container.dfhComm = this.common;

    this.operTransSecurDfltServicePageBack(container).subscribe(res => {
      container = res;
      this.screen2 = container.screen2;
      this.common = container.dfhComm;
      this.container.workStorage = container.workStorage;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/dashboard/oper-trans-sec-dflt-1']);
    });
  }

  clearButtonClick(): void {
    let tempScreen2 = new Rpdma88();
    tempScreen2 = {...this.screen2};
    this.screen2 = new Rpdma88();
    this.screen2.m88alev = tempScreen2.m88alev;
    this.screen2.m88alev = tempScreen2.m88alev;
    this.screen2.m88mdat = tempScreen2.m88mdat;
    this.screen2.m88mion = tempScreen2.m88mion;
    this.screen2.m88pos = tempScreen2.m88pos;
    this.screen2.m88ttyp = tempScreen2.m88ttyp;
    this.screen2.m88utyp = tempScreen2.m88utyp;
    tempScreen2 = new Rpdma88();
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.buttonStatus = ButtonStatus.SUCCESS;
      this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ACTIVE, message);
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ERROR, message);
      }
    }
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
   * Back end calls cancel
   */
  private operTransSecurDfltServiceCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/cancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshS2
   */
  private operTransSecurDfltServiceShowFreshS2(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/showfreshs2', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunS2
   */
  private operTransSecurDfltServiceMainRunS2(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/mainruns2', JSON.stringify(container), options);

  }

  /**
   * Back end calls pageBack
   */
  private operTransSecurDfltServicePageBack(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/opertranssecurdflt/opertranssecurdfltservice/pageBack', JSON.stringify(container), options);

  }

}

import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathElectronicClaimVerfMaint,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {switchMap} from 'rxjs/operators';
import {ContainerEcVer} from './model/container.model';
import {EcVerfSuspProc} from './model/ec-verf-susp-proc.model';
import {WorkStorage} from './model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ecverfsuspproc::ecverfsuspproc::ecverfsuspproc
 */
@Component({
  selector: 'fox-app-ecverfsuspproc',
  templateUrl: './electronic-claim-verf-susp-process.component.html',
  styleUrls: ['./electronic-claim-verf-susp-process.component.css']
})
export class ElectronicClaimVerfSuspProcessComponent implements OnInit {
  common = new Dfhcommarea();
  screen = new EcVerfSuspProc();
  serviceDate: any;
  workStorage = new WorkStorage();
  buttonStatus: string = 'Submit';
  container = new ContainerEcVer();
  cardTitle = 'Enter the following information';
  cardSubTitle = 'Tab to navigate and update fields. Click "Submit" (or use Alt + S or Enter) to proceed.';

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private activatedRoute: ActivatedRoute,
                     private pageHeaderService: PageHeaderService,
                     protected headerMaintenance: HeaderMaintenanceService) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.pageHeaderService.customTitle = '';
    let container = new ContainerEcVer();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    this.common.eibTrnId = 'RPC1';
    this.activatedRoute.queryParams.pipe(
      switchMap(params => {
        if (params['command'] && params['command'] !== '') {
          this.common.commComm.command = (params['command']) ? params['command'].toUpperCase() : '';
          this.common.commComm.claimNumber = params['claimNumid'];
        }
        return this.ecVerfSuspProcServiceMainProcess(this.common);
      })
    ).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screen = container.ecVerfSuspProc;
      this.serviceDate = this.screen.m43date;
      this.common = container.dfhcommarea;
      this.workStorage = container.workStorage;
      if (this.screen.m43err) {
        this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m43err);
      }
      this.pageHeaderService.customTitle = 'Electronic Claim - ' + this.screen.m43hdg + ' Process';
    });
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action EnterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new ContainerEcVer();
      container = this.container;
      container.ecVerfSuspProc = this.screen;
      if (this.serviceDate !== '') {
        container.ecVerfSuspProc.m43date = this.serviceDate.slice(2, 4) + this.serviceDate.slice(8, 11);
      }
      let data: any = undefined;
      container.dfhcommarea = this.common;
      container.workStorage = this.workStorage;
      container = await this.ecVerfSuspProcServiceScreenData(container).toPromise();
      this.screen = container.ecVerfSuspProc;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.m43err) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m43err);
      }
      if (container.dfhcommarea.nextProgram === 'RPD08O54') {
        this.buttonStatus = 'Success!';
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfMaint]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O02') {
        this.buttonStatus = 'Success!';
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
      }
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    const container = new ContainerEcVer();
    container.ecVerfSuspProc = this.screen;
    container.dfhcommarea = this.common;
    this.ecVerfSuspProcServiceReturnControl(container).toPromise();
    this.screen = container.ecVerfSuspProc;
    this.common = container.dfhcommarea;
    return true;
  }

  btnClearClick(): void {
    this.screen = new EcVerfSuspProc();
    this.messageBoxService.reset();
    window.scrollTo(0, 0);
  }

  /**
   * Back end calls mainProcess
   */
  private ecVerfSuspProcServiceMainProcess(dfhcommarea: Dfhcommarea): Observable<ContainerEcVer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<ContainerEcVer>('/api/manual/adjudication/services/ecverfsuspproc/ecverfsuspprocservice/mainprocess', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls screenData
   */
  private ecVerfSuspProcServiceScreenData(container: ContainerEcVer): Observable<ContainerEcVer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<ContainerEcVer>('/api/manual/adjudication/services/ecverfsuspproc/ecverfsuspprocservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls returnControl
   */
  private ecVerfSuspProcServiceReturnControl(container: ContainerEcVer): Observable<ContainerEcVer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<ContainerEcVer>('/api/manual/adjudication/services/ecverfsuspproc/ecverfsuspprocservice/returncontrol', JSON.stringify(container), options);

  }
}

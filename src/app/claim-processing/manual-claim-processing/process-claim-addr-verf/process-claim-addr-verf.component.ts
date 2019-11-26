import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  ButtonStatus,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathClaimSuspendClm,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessEndofClaim,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
  claimProcessingRoutePathTypeOfService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderRightItem,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {Screen} from './model/screen.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmaddrverf::procclmaddrverf::procclmaddrverf
 */
@Component({
  selector: 'fox-app-procclmaddrverf',
  templateUrl: './process-claim-addr-verf.component.html',
  styleUrls: ['./process-claim-addr-verf.component.css']
})

export class ProcclmaddrverfComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  altAddrCheck: boolean = false;
  screen = new Screen();
  container = new Container();
  common = new Dfhcommarea();
  screeBean = new Rpdmb22();
  buttonStatus = ButtonStatus.DISABLED;
  isHeaderOn = false;
  subscription: Subscription;
  btnAction: string;
  items: Items[] = [{id: 'N', name: 'No'}, {id: 'Y', name: 'Yes'}];

  public constructor(
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private manualCalimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  public extracted(): void {
    if (this.screen.m36acor) {
      if (this.screen.m36acor.toUpperCase() === 'N') {
        this.altAddrCheck = true;
      } else if (this.screen.m36acor.toUpperCase() === 'Y') {
        this.altAddrCheck = false;
      }
    }
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {

    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      this.pf6EventClick();
    });

    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.mProcClmAddrVerfServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    this.container = container;

    this.extracted();
    if (this.screen.m36err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m36err1);
    }
    if (this.screen.m36err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m36err2);
    }
    return true;
  }

  ngAfterViewInit(): void {
    this.screen.m36acor = 'N';
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Address Verification';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: (this.manualCalimService.screenBean && this.manualCalimService.screenBean.m22nam) ? this.manualCalimService.screenBean.m22nam : 'N/A',
          account: (this.manualCalimService.screenBean && this.manualCalimService.screenBean.m22memn) ? this.manualCalimService.screenBean.m22memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'EOB Screen', identifier: '', tab: ''
          }
        },
        this.componentFactoryResolver,
        this.injector);

      const btnSuspend = document.getElementsByClassName('btn-suspend');
      if (btnSuspend && btnSuspend[0] && btnSuspend[0].textContent && btnSuspend[0].textContent.length > 5) {
        this.isHeaderOn = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.buttonStatus = ButtonStatus.WORKING;
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.dfhcommarea = this.common;
    container.screen = this.screen;
    try {
      container = await this.mProcClmAddrVerfServiceScreenData(container).toPromise();
      this.screen = container.screen;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhcommarea.nextProgram === 'RPD06O17') {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessEndofClaim]);
      }
      if (container.dfhcommarea.nextProgram === 'NO USER RECORD FOUND') {
        this.screen.m36err1 = 'NO USER RECORD FOUND';
        this.setSuccess();
      }
      if (this.screen.m36err1) {
        this.setSuccess();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m36err1);
      }
      if (this.screen.m36err2) {
        this.setSuccess();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m36err2);
      }
      this.setFailure();
      return true;
    } catch {
      this.setFailure();
      return false;
    }
  }

  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.dfhcommarea = this.common;
    container.screen = this.screen;
    container = await this.mProcClmAddrVerfServicePf1Return(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.dfhcommarea.nextProgram === 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O11') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O02') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  async pf6EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;

    container.dfhcommarea = this.common;
    container.screen = this.screen;
    container = await this.mProcClmAddrVerfServicePf6ReturnToEob(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.dfhcommarea.nextProgram === 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O11') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O12') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O14') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O16') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O25') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
    }
    return true;
  }

  clearEventClick(): void {
    this.screen.m36acor = 'N';
    this.screen.m36hicn = '';
    this.screen.m36ins1 = '';
    this.buttonStatus = ButtonStatus.DISABLED;
  }

  onChangeSelect(event): void {
    if (event.id === 'Y') {
      this.buttonStatus = ButtonStatus.SUBMIT;
    } else {
      this.buttonStatus = ButtonStatus.DISABLED;
    }
  }

  private setSuccess(): void {
    this.buttonStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private setFailure(): void {
    this.buttonStatus = ButtonStatus.FAILED;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.buttonStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  /**
   * Back end calls mainOperation
   */
  private mProcClmAddrVerfServiceMainOperation(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddrverf/mprocclmaddrverfservice/mainoperation', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls screenData
   */
  private mProcClmAddrVerfServiceScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddrverf/mprocclmaddrverfservice/screendata', JSON.stringify(container), options);
  }

  /**
   * Back end calls F1Return
   */
  private mProcClmAddrVerfServicePf1Return(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddrverf/mprocclmaddrverfservice/pf1return', JSON.stringify(container), options);
  }

  /**
   * Back end calls F6Return
   */
  private mProcClmAddrVerfServicePf6ReturnToEob(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddrverf/mprocclmaddrverfservice/pf6returntoeob', JSON.stringify(container), options);
  }
}

interface Items {
  id: string;
  name: string;
}

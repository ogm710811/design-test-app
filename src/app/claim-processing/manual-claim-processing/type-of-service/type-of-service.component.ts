import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ManualClaimDetailVO} from '@fox/rest-clients';
import {
  claimProcessingRoutePathClaimEligibility,
  claimProcessingRoutePathClaimSuspendClm,
  claimProcessingRoutePathElectronicClaimVerfSuspProcess,
  claimProcessingRoutePathProcessClaimNopay,
  claimProcessingRoutePathRoot,
  claimProcessingUrlProviderValidation,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {HeaderRightItem} from '@fox/shared';
import {HeaderSubtitleItem} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {ProcessClaimHeaderRightComponent} from '@fox/shared';
import {ProcessClaimSubheaderComponent} from '@fox/shared';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Container} from './model/container.model';
import {Rpdmb22} from './model/rpdmb22.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmtos::procclmtos::procclmtos
 */
@Component({
  selector: 'fox-app-procclmtos',
  templateUrl: './type-of-service.component.html',
  styleUrls: ['./type-of-service.component.css']
})
export class TypeOfServiceComponent implements OnInit, AfterViewChecked, OnDestroy {
  screenBean = new Rpdmb22();
  common = new Dfhcommarea();
  buttonStatus: string = 'Submit';
  isHeaderSet: boolean = false;
  suscription: Subscription;
  btnAction: string;

  options: OptionType[] = [
    {
      key: 'Alt + O',
      tab: 'alt+o',
      identifier: 'o',
      display: 'No Pay',
      class: ''
    },
    {
      key: 'Alt + B',
      tab: 'alt+b',
      identifier: 'b',
      display: 'EC Bypass',
      class: ''
    },
    {
      key: 'Alt + M',
      tab: 'alt+m',
      identifier: 'm',
      display: 'Ben Mod',
      class: 'hasBorder'
    },
    {
      key: 'Alt + Y',
      tab: 'alt+y',
      identifier: 'y',
      display: 'Abort Claim',
      class: 'afterBorder'
    }
  ];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private manualClaimService: ManualClaimService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {

    this.suscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'o') {
        this.pf5EventClick();
      } else if (this.btnAction && this.btnAction === 'b') {
        this.pf8EventClick();
      } else if (this.btnAction && this.btnAction === 'm') {
        this.pf8EventClick();
      } else if (this.btnAction && this.btnAction === 'y') {
        this.abortEventClick();
      } else if (this.btnAction && this.btnAction === 's') {
        this.pf4EventClick();
      }
    });

    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    if (this.common.commComm.command === 'ZV' || this.common.commComm.command === 'ZS') {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['command'] && params['command'] !== '') {
          this.common.commComm.command = params['command'];
          this.common.commComm.claimNumber = params['claimNumid'];
          this.common.eibTrnId = params['eibTrnId'];
        }
      });
      this.common.eibTrnId = 'RPC1';
      this.common.commComm.command = this.common.commComm.command.toUpperCase();
    }
    container = await this.procClmTosServiceProgramEntry(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screenBean = container.screenbean;
    this.manualClaimService.screenBean = this.screenBean;

    this.common = container.dfhCommonArea;
    if (!this.manualClaimService.data) {
      this.manualClaimService.data = <ManualClaimDetailVO>{};
    }
    this.manualClaimService.data.claimNumber = this.screenBean.m22cnd1;
    this.manualClaimService.data.memberNumber = this.screenBean.m22memn;

    if (this.screenBean.m22err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err1);
    }
    if (this.screenBean.m22err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err2);
    }
    if (this.screenBean.m22err3) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err3);
    }
    if (this.screenBean.m22err4) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err4);
    }
    window.scrollTo(0, 0);
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderSet) {
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          buttonTitle: 'Claim Options',
          options: this.options,
          suspendBtn: {
            display: 'Suspend (F9)', identifier: 's', tab: 'ctrl+f9'
          }
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.customTitle = 'Type of Service';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: (this.screenBean) ? this.screenBean.m22nam : 'N/A',
          account: (this.screenBean) ? this.screenBean.m22memn : 'N/A',
          claim: this.common.commComm ? this.common.commComm.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderSet = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  /**
   * Event action submitEventClick
   */

  async submitEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();

      container.screenbean = this.screenBean;

      container.dfhCommonArea = this.common;
      container = await this.procClmTosServiceScreenData(container).toPromise();
      this.screenBean = container.screenbean;
      this.common = container.dfhCommonArea;
      this.transferSrv.set('common', this.common);
      if (this.screenBean.m22err1.trim()) {
        if (this.screenBean.m22err1.includes('CAUTION') || this.screenBean.m22err1.includes('WARNING') || this.screenBean.m22err1.includes('REQUIRES')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err1);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err1);
          this.buttonStatus = 'Failed';
          this.resetState();
          window.scrollTo(0, 0);
          return true;
        }
      }
      if (this.screenBean.m22err2.trim()) {
        if (this.screenBean.m22err2.includes('CAUTION') || this.screenBean.m22err2.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err2);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err2);
          this.buttonStatus = 'Failed';
          this.resetState();
          window.scrollTo(0, 0);
          return true;
        }
      }
      if (this.screenBean.m22err3.trim()) {
        if (this.screenBean.m22err3.includes('CAUTION') || this.screenBean.m22err3.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err3);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err3);
          this.buttonStatus = 'Failed';
          this.resetState();
          window.scrollTo(0, 0);
          return true;
        }
      }
      if (this.screenBean.m22err4.trim()) {
        if (this.screenBean.m22err4.includes('CAUTION') || this.screenBean.m22err4.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m22err4);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err4);
          this.buttonStatus = 'Failed';
          this.resetState();
          window.scrollTo(0, 0);
          return true;
        }
      }

      const firstServiceSelected = +this.common.processClaimCommarea.saveTypeCharge.substring(0, 1);

      if (this.screenBean.m22srv1.length > 0) {
        if ('' === this.common.processClaimCommarea.saveTypeCharge) {
          container = await this.procClmTosServiceProgramEntry(this.common).toPromise();
        } else if ((1 === firstServiceSelected && this.screenBean.m22typ1.trim() !== '')
          || (3 === firstServiceSelected && this.screenBean.m22typ3.trim() !== '')
          || (4 === firstServiceSelected && this.screenBean.m22typ4.trim() !== '')
          || (5 === firstServiceSelected && this.screenBean.m22typ5.trim() !== '')
          || (6 === firstServiceSelected && this.screenBean.m22typ6.trim() !== '')
          || (7 === firstServiceSelected && this.screenBean.m22typ7.trim() !== '')
          || (8 === firstServiceSelected && this.screenBean.m22typ8.trim() !== '')
          || (9 === firstServiceSelected && this.screenBean.m22typ9.trim() !== '')) {
          this.buttonStatus = 'Success!';
          this.resetState();
          this.manualClaimService.firstSelectedService = firstServiceSelected;
          this.router.navigate([claimProcessingUrlProviderValidation]);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'INVALID SELECTION');
          this.buttonStatus = 'Failed';
          this.resetState();
        }
      }
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action resetEventClick
   */
  async resetEventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screenBean;

    container.dfhCommonArea = this.common;
    container = await this.procClmTosServiceClearScreen(container).toPromise();
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    this.messageBoxService.reset();
    window.scrollTo(0, 0);
    return true;
  }

  clearForm(): void {
    this.screenBean.m22chg = '';
    this.screenBean.m22srv1 = '';
    this.screenBean.m22srv2 = '';
    this.screenBean.m22dead = '';
    this.screenBean.m22purg = '';
  }

  /**
   * Event action pf4EventClick
   */
  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screenBean;
    container.dfhCommonArea = this.common;
    container = await this.procClmTosServicePf4Suspend(container).toPromise();
    this.screenBean = container.screenbean;
    data = this.transferSrv.getData();
    this.common = container.dfhCommonArea;
    data['common'] = this.common;
    if (container.dfhCommonArea.nextProgram === 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    return true;
  }

  /**
   * Event action pf5EventClick
   */
  async pf5EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screenBean;
    container.dfhCommonArea = this.common;
    container = await this.procClmTosServiceNoPayProcess(container).toPromise();
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    this.transferSrv.set('common', this.common);
    if (container.dfhCommonArea.nextProgram === 'RPD06O04') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopay]);
    }
    return true;
  }

  /**
   * Event action pf6EventClick
   */
  async pf6EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screenBean;

    container.dfhCommonArea = this.common;
    if ('Y' === this.common.processClaimCommarea.electClaimSuspenseInd) {
      container = await this.procClmTosServiceBypassElectClaim(container).toPromise();
    } else {
      container = await this.procClmTosServiceInvalidKey(container).toPromise();
    }
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    if (container.dfhCommonArea.nextProgram === 'RPD08O53') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfSuspProcess]);
    }
    if (container.dfhCommonArea.nextProgram === 'RPD06O01') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimEligibility]);
    }
    if (this.screenBean.m22err1.trim()) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err1);
      window.scrollTo(0, 0);
      return true;
    }
    return true;
  }

  /**
   * Event action f7EventClick
   */
  async f7EventClick(): Promise<boolean> {
    const container = new Container();
    container.screenbean = this.screenBean;

    container.dfhCommonArea = this.common;
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Event action pf8EventClick
   */
  async pf8EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenbean = this.screenBean;
    container.dfhCommonArea = this.common;

    if ('Y' === container.workArea.benModIndicator) {
      container = await this.procClmTosServiceDisplayBenModMap(container).toPromise();
    } else {
      container = await this.procClmTosServiceInvalidKey(container).toPromise();
    }
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    if (this.screenBean.m22err1) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m22err1);
      window.scrollTo(0, 0);
      return true;
    }
    return true;
  }

  /**
   * Event action pf9EventClick
   */
  async pf9EventClick(): Promise<boolean> {
    const container = new Container();
    container.screenbean = this.screenBean;
    container.dfhCommonArea = this.common;
    this.screenBean = container.screenbean;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Even action abortEventClick
   */
  async abortEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.screenbean = this.screenBean;

    container.dfhCommonArea = this.common;

    container = await this.procClmTosServiceAbortOut(container).toPromise();
    this.screenBean = container.screenbean;
    data = this.transferSrv.getData();
    this.common = container.dfhCommonArea;
    data['claimCommarea'] = this.common;
    if (container.dfhCommonArea.nextProgram === 'RPD06O01') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimEligibility]);
    } else if (container.dfhCommonArea.eibTaskN === 'RPRD') {
      this.router.navigate(['/dummydata']);

    }
    return true;
  }

  /**
   * Back end calls abortOut
   */
  private procClmTosServiceAbortOut(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/abortout', JSON.stringify(container), options);

  }

  /**
   * Back end calls programEntry
   */
  private procClmTosServiceProgramEntry(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/programentry', JSON.stringify(this.common), options);

  }

  /**
   * Back end calls screenData
   */
  private procClmTosServiceScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/screendata', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearScreen
   */
  private procClmTosServiceClearScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/clearscreen', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf4Suspend
   */
  private procClmTosServicePf4Suspend(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/pf4suspend', JSON.stringify(container), options);

  }

  /**
   * Back end calls noPayProcess
   */
  private procClmTosServiceNoPayProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/nopayprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls bypassElectClaim
   */
  private procClmTosServiceBypassElectClaim(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/bypasselectclaim', JSON.stringify(container), options);

  }

  /**
   * Back end calls invalidKey
   */
  private procClmTosServiceInvalidKey(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/invalidkey', JSON.stringify(container), options);
  }

  /**
   * Back end calls displayBenModMap
   */
  private procClmTosServiceDisplayBenModMap(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmtos/procclmtosservice/displaybenmodmap', JSON.stringify(container), options);

  }
}

interface OptionType {
  key: string;
  tab: string;
  identifier: string;
  display: string;
  class: string;
}

import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathElectronicClaimVerfBillLine,
  claimProcessingRoutePathElectronicClaimVerfDrugBillLine,
  claimProcessingRoutePathElectronicClaimVerfSuspProcess,
  claimProcessingRoutePathRoot,
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
import {Container} from './model/container.model';
import {Rpdma44} from './model/rpdma44.model';
import {WorkStorage} from './model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ecverfmnt::ecverfmntScreen44::ecverfmntScreen44
 */
@Component({
  selector: 'fox-app-ecverfmnt-screen44',
  templateUrl: './electronic-claim-verf-maint.component.html',
  styleUrls: ['./electronic-claim-verf-maint.component.css']
})
export class ElectronicClaimVerfMaintComponent implements OnInit, AfterViewChecked, OnDestroy {
  screenBean = new Rpdma44();
  common = new Dfhcommarea();
  container = new Container();
  workStorage = new WorkStorage();
  replyItems = [
    {id: 1, name: '1 - Complete'},
    {id: 2, name: '2 - Bypass'},
    {id: 3, name: '3 - Delete'},
    {id: 4, name: '4 - Manual'}
  ];
  buttonStatus: string = 'Submit';
  isHeaderOn = false;
  subscription: Subscription;
  btnAction: string;
  demographicInfo: any;
  demographicAddress: any;
  demographicDetails: any;
  textEntered: any;
  countRemaining: any;
  counter: number;
  replyItemsId: string = '';

  public constructor(
    protected httpClient: HttpClient, protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private manualClaimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'm') {
        this.pf6EventClick();
      }
      if (this.btnAction && this.btnAction === 'k') {
        this.pf3EventClick();
      }
    });
    let container = new Container();
    const data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.ecVerfMntServiceOnloadProcess(this.common).toPromise();
    this.screenBean = container.screenbean44;
    this.replyItemsId = this.screenBean.m44repl;
    this.demographicInfo = [
      {
        'key': 'Name:',
        'value': this.screenBean.m44ign
      },
      {
        'key': 'Last Name:',
        'value': this.screenBean.m44iln
      },
      {
        'key': 'First Initial:',
        'value': this.screenBean.m44ifi
      },
      {
        'key': 'Sex:',
        'value': this.screenBean.m44isex
      },
      {
        'key': 'Date of Birth:',
        'value': this.screenBean.m44idob
      },
      {
        'key': 'Date of Death:',
        'value': this.screenBean.m44idod
      },
    ];

    this.demographicAddress = [
      {
        'key': 'Address 1:',
        'value': this.screenBean.m44iad1
      },
      {
        'key': 'Address 2:',
        'value': this.screenBean.m44iad2
      },
      {
        'key': 'Address 3:',
        'value': this.screenBean.m44iad3
      },
      {
        'key': 'Medicare ID:',
        'value': this.screenBean.m44ihic
      },
      {
        'key': 'Cross Ref #:',
        'value': this.screenBean.m44icrn
      },
      {
        'key': 'Errors:',
        'value': this.screenBean.m44ercd
      },
    ];

    this.demographicDetails = [
      {
        'key': 'Member #:',
        'value': this.screenBean.m44imem
      },
      {
        'key': 'Association:',
        'value': this.screenBean.m44iasc
      },
      {
        'key': 'Insured Code:',
        'value': this.screenBean.m44icod
      },
      {
        'key': 'AARP Assignment Ind:',
        'value': this.screenBean.m44asni ? this.screenBean.m44asni : '-'
      },
      {
        'key': 'Medicare Assignment Ind:',
        'value': this.screenBean.m44pmai ? this.screenBean.m44pmai : '-'
      },
      {
        'key': 'Bill Line Errors:',
        'value': this.screenBean.m44berr ? this.screenBean.m44berr : '-'
      },
    ];
    this.container = container;
    this.workStorage = container.workStorage;
    this.common = container.dfhCommonArea;
    if (this.screenBean.m44err) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m44err);
    }
    if (this.screenBean.m44pdel) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m44pdel);
    }
    window.scrollTo(0, 0);
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Verification File Maintenance - Ins Info';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          claim: this.common.commComm ? this.common.commComm.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'Bill Lines (K)', identifier: 'k', tab: 'alt+k'
          },
          secondButton: {
            display: 'RNF Letter / Delete (M)', identifier: 'm', tab: 'alt+m'
          }
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementsByClassName('btn-suspend');
      if (subheadertitle.length > 0) {
        this.isHeaderOn = true;
      }
    }
  }

  countCharacters(e): void {
    this.textEntered = document.getElementById('textarea');
    this.counter = (200 - (this.textEntered.value.length));
    this.countRemaining = document.getElementById('charactersRemaining');
    this.countRemaining.textContent = this.counter;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    const screen = new Rpdma44();
    container.screenbean44 = screen;
    container.dfhCommonArea = this.common;
    container = await this.ecVerfMntServiceClearKeyProcess(container).toPromise();
    this.screenBean = container.screenbean44;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();
      container = this.container;
      let data: any = undefined;
      this.screenBean.m44repl = this.replyItemsId;
      container.screenbean44 = this.screenBean;
      container = await this.ecVerfMntServiceEnterKeyProcess(container).toPromise();
      this.container = container;
      this.screenBean = container.screenbean44;

      this.common = container.dfhCommonArea;
      if ('RPD08O54' === this.common.callingProgram) {
        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (this.screenBean.m44err) {
          this.buttonStatus = 'Failed';
          this.resetState();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.m44err);
        }
        if (this.screenBean.m44pdel) {
          this.resetState();
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.m44pdel);
        }
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfSuspProcess]);
      } else {
        this.buttonStatus = 'Failed';
        this.resetState();
      }
      window.scrollTo(0, 0);
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
    let container = new Container();
    const screen = new Rpdma44();
    container.screenbean44 = screen;
    container.dfhCommonArea = this.common;
    container = await this.ecVerfMntServicePf1KeyProcess(container).toPromise();
    this.screenBean = container.screenbean44;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Event action pf3EventClick
   */
  async pf3EventClick(): Promise<boolean> {
    this.screenBean.m44repl = this.replyItemsId;
    this.container.dfhCommonArea = this.common;
    this.container = await this.ecVerfMntServicePf3KeyProcess(this.container).toPromise();
    this.screenBean = this.container.screenbean44;
    this.common = this.container.dfhCommonArea;
    if (this.container.screenbean49.m49clo1) {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfDrugBillLine]);
    } else {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfBillLine]);
    }
    return true;
  }

  /**
   * Event action pf4EventClick
   */
  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    const screen = new Rpdma44();
    container.screenbean44 = screen;
    container.dfhCommonArea = this.common;
    container = await this.ecVerfMntServicePf4KeyProcess(container).toPromise();
    this.screenBean = container.screenbean44;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Event action pf6EventClick
   */
  async pf6EventClick(): Promise<boolean> {
    let container = new Container();
    container = this.container;
    this.screenBean.m44repl = this.replyItemsId;
    container.screenbean44 = this.screenBean;
    container = await this.ecVerfMntServicePf6KeyProcess(container).toPromise();
    this.container = container;
    this.screenBean = container.screenbean44;
    this.common = container.dfhCommonArea;
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Back end calls pf3KeyProcess
   */
  private ecVerfMntServicePf3KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf3keyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls clearKeyProcess
   */
  private ecVerfMntServiceClearKeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/clearkeyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf4KeyProcess
   */
  private ecVerfMntServicePf4KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf4keyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf6KeyProcess
   */
  private ecVerfMntServicePf6KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf6keyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1KeyProcess
   */
  private ecVerfMntServicePf1KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/pf1keyprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls enterKeyProcess
   */
  private ecVerfMntServiceEnterKeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/enterkeyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls onloadProcess
   */
  private ecVerfMntServiceOnloadProcess(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/ecverfmnt/ecverfmntservice/onloadprocess', JSON.stringify(common), options);

  }
}

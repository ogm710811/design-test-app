import {LowerCasePipe, TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultAuthComb,
  dashboardRoutePathDefaultAuthLimit,
  dashboardRoutePathDefaultSetQlty,
  dashboardRoutePathOperTransSecDflt1,
  dashboardRoutePathRoot,
  dashboardRoutePathSetQualityCombinationMaintenance,
  dashboardRoutePathSetQualityCombinationOverride,
  dashboardRoutePathSetQualityOverride,
  dashboardRoutePathSetQualityTempAssign,
  dashboardRoutePathSetQualityTempExclusions,
  dashboardRoutePathTempAuthComb,
  dashboardRoutePathTempSetQltyTemplate,
  Dfhcommarea,
  HeaderRightItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable, Subscription} from 'rxjs';
import {OpMaintenanceService} from '@fox/shared';
import {copySuccessMessage} from '@fox/shared';
import {Container} from './model/container.model';
import {OperDfltMntMenu} from './model/oper-dflt-mnt-menu.model';

@Component({
  selector: 'fox-default-file-maintenance-menu',
  templateUrl: './default-maintenance-menu.component.html',
  styleUrls: ['./default-maintenance-menu.component.css']
})

export class DefaultMaintenanceMenuComponent implements OnInit {
  screen = new OperDfltMntMenu();
  common = new Dfhcommarea();
  level: string = '';
  position: string = '';
  disableInputField: boolean = true;
  subscription: Subscription;
  buttonStatus: string = ButtonStatus.SUBMIT;
  maintInput = {paramInput: '', paramLabel: ''};

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    protected lowerCasePipe: LowerCasePipe,
    protected titlecasePipe: TitleCasePipe,
    private messageBoxService: MessageBoxService,
    protected opMaintenance: OpMaintenanceService,
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      if (item === 'y') {
        this.verificationEventClick();
      }
    });
    let data: any = undefined;
    let container = new Container();
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.operDfltMntMenuServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.operDfltMntMenu;
    this.common = container.dfhcommarea;
    if (this.screen.m82err1) {
      if (this.screen.m82err1.includes('TRANSACTION PENDING')) {
        this.messageBoxService.addMessageBox('Default File Maintenance', MessageBoxType.ACTIVE, this.screen.m82err1);
      } else {
        this.messageBoxService.addMessageBox(this.screen.m82err1, MessageBoxType.ERROR, '');
      }
      this.opMaintenance.displayMessage(this.screen.m82err1);
    }
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        secondButton: {
          display: 'Verification (Y)', identifier: 'y', tab: 'alt+y'
        }
      },
      this.componentFactoryResolver,
      this.injector);
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.messageBoxService.reset();
    let container = new Container();
    container.operDfltMntMenu = this.screen;
    container.dfhcommarea = this.common;
    this.disableInputField = true;
    this.screen.m82tem = '';
    this.operDfltMntMenuServiceClearScreen_5200(container).subscribe(res => {
      container = res;
      this.screen = container.operDfltMntMenu;
      this.common = container.dfhcommarea;
    });

  }

  /**
   * Event action EnterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      this.level = this.screen.m82lev;
      this.position = this.screen.m82pos;
      let container = new Container();
      let data: any = undefined;
      container.operDfltMntMenu = this.screen;
      container.dfhcommarea = this.common;
      container = await this.operDfltMntMenuServiceEnterProcess_1000(container).toPromise();
      this.screen = container.operDfltMntMenu;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.m82pos) {
        this.maintInput.paramInput = this.screen.m82pos;
        this.maintInput.paramLabel = 'Position';
      }
      if (this.screen.m82loc) {
        this.maintInput.paramInput = this.screen.m82loc;
        this.maintInput.paramLabel = 'Location';
      }
      if (this.screen.m82div) {
        this.maintInput.paramInput = this.screen.m82div;
        this.maintInput.paramLabel = 'Division';
      }
      if (container.workStorage.wsProgram === 'RPD05O83') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        let param: NavigationExtras = {};
        param = {
          queryParams: {
            maintInputLabel: this.maintInput.paramLabel
          }
        };
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultAuthLimit], param);
      }
      if (container.workStorage.wsProgram === 'RPD05O84') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultAuthComb]);
      }
      if (container.workStorage.wsProgram === 'RPD05O85') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultSetQlty]);
      }
      if (container.workStorage.wsProgram === 'RPD05O86') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        let param: NavigationExtras = {};
        param = {
          queryParams: {
            maintInputLabel: this.maintInput.paramLabel,
            maintInputValue: this.maintInput.paramInput
          }
        };
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityCombinationMaintenance], param);
      }
      if (container.workStorage.wsProgram === 'RPD05O87') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperTransSecDflt1]);
      }
      if (container.workStorage.wsProgram === 'RPD05O89') {
        let param: NavigationExtras = {};
        param = {
          queryParams: {
            wsProgram: 'RPD05O89',
            maintInputLabel: this.maintInput.paramLabel,
            maintInputValue: this.maintInput.paramInput
          }
        };
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultAuthLimit], param);
      }
      if (container.workStorage.wsProgram === 'RPD05O90') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathTempAuthComb]);
      }
      if (container.workStorage.wsProgram === 'RPD05O91') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityOverride]);
      }
      if (container.workStorage.wsProgram === 'RPD05O92') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityCombinationOverride]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD05O79') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathTempSetQltyTemplate]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD05O43') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityTempExclusions]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD05O42') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityTempAssign]);
      }
      if (this.screen.m82err1) {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        let errorMsg = this.screen.m82err1;
        if (errorMsg.indexOf(copySuccessMessage) !== -1) {
          errorMsg = this.getSuccessMsg(errorMsg);
          this.messageBoxService.addMessageBox('Success', MessageBoxType.SUCCESS, errorMsg);
        } else {
          errorMsg = this.titlecasePipe.transform(this.screen.m82err1);
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, errorMsg);
        }
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
    return true;
  }

  async F1EventClick(): Promise<boolean> {
    let container = new Container();
    container.operDfltMntMenu = this.screen;
    container.dfhcommarea = this.common;
    container = await this.operDfltMntMenuServiceReturnOrCancel(container).toPromise();
    this.screen = container.operDfltMntMenu;
    this.common = container.dfhcommarea;
    this.router.navigate(['/clmprocsysmenu']);
    return true;
  }

  getSuccessMsg(data): string {
    const lowerCaseTxt = this.lowerCasePipe.transform(data);
    const formatErr = lowerCaseTxt.substr(0, lowerCaseTxt.length - 2);
    const modifiedStr = formatErr + ' ' + this.titlecasePipe.transform(this.position);
    return modifiedStr;
  }

  onChangeSelectedAction(value: string): void {
    this.disableInputField = !(value === 'F');
    this.screen.m82clev = '';
    this.screen.m82cpos = '';
  }

  /**
   * Event action VerificationEventClick
   */
  async verificationEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.dfhcommarea = this.common;
    container = await this.operDfltMntMenuServiceXctlVerificationModule_5100(container).toPromise();
    this.screen = container.operDfltMntMenu;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate(['/dashboard/default-override-pending-verification']);
    return true;
  }

  /**
   * Back end calls enterProcess_1000
   */
  private operDfltMntMenuServiceEnterProcess_1000(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operdfltmntmenu/operdfltmntmenuservice/enterprocess_1000', JSON.stringify(container), options);
  }

  /**
   * Back end calls returnOrCancel
   */
  private operDfltMntMenuServiceReturnOrCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operdfltmntmenu/operdfltmntmenuservice/returnorcancel', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private operDfltMntMenuServiceMainProcess(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operdfltmntmenu/operdfltmntmenuservice/mainprocess', JSON.stringify(dfhCommArea), options);
  }

  /**
   * Back end calls CLEARScreen_5200
   */
  private operDfltMntMenuServiceClearScreen_5200(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operdfltmntmenu/operdfltmntmenuservice/clearscreen_5200', JSON.stringify(container), options);
  }

  /**
   * Back end calls xctlVerificationModule_5100
   */
  private operDfltMntMenuServiceXctlVerificationModule_5100(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operdfltmntmenu/operdfltmntmenuservice/xctlVerificationModule_5100', JSON.stringify(container), options);
  }
}

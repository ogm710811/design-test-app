import {HttpClient} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  HeaderRightItem,
  MessageBoxService,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable, Subscription} from 'rxjs';
import {OpMaintenanceService} from '@fox/shared';
import {dftAuthLimitVerifyMsg} from '@fox/shared';
import {Container} from './model/container.model';
import {MapCautions} from './model/map-cautions.model';
import {Rpdma83} from './model/rpdma83.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operauthlmtdflt::operauthlmtdflt::operauthlmtdflt
 */
@Component({
  selector: 'fox-op-dft-auth-limit',
  templateUrl: './op-dft-auth-limit.component.html',
  styleUrls: ['./op-dft-auth-limit.component.css']
})
export class OpDftAuthLimitComponent implements OnInit, OnDestroy {
  rpdma83 = new Rpdma83();
  dfhcommarea = new Dfhcommarea();
  container = new Container();
  inputData = new Rpdma83();
  inputDataCaution: MapCautions[] = [];
  subscription: Subscription;
  continueStatus = ButtonStatus.SUBMIT;
  isPageOverride = false;
  maintInputField = {
    label: '',
    value: ''
  };

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private injector: Injector) {

  }
  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.maintInputField.label = this.activatedRoute.snapshot.queryParamMap['params']['maintInputLabel'];
    this.maintInputField.value = this.activatedRoute.snapshot.queryParamMap['params']['maintInputValue'];
    if (this.activatedRoute.snapshot.queryParamMap['params']['wsProgram'] === 'RPD05O89') {
      this.pageHeaderService.customTitle = 'Operator Authority Limit Override';
      this.isPageOverride = true;
    } else {
      this.pageHeaderService.customTitle = 'Operator Authority Limit Default';
    }
    this.defaultPageLoad();
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(() => {
      this.nextEventClick();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    if (this.rpdma83.m83func === 'UPDATE') {
      this.messageBoxService.reset();
      const container = new Container();
      container.rpdma83 = this.rpdma83;
      container.dfhcommarea = this.dfhcommarea;

      for (const key in this.rpdma83) {
        if (this.rpdma83.hasOwnProperty(key) && ((key !== 'm83func' || key.includes('Ind'))
          && key !== 'mapCautions')
          && key !== 'm83autv'
          && key !== 'm83posv'
          && key !== 'm83mion'
          && key !== 'm83mdat'
          && key !== 'm83autl'
          && key !== 'm83posl') {
          this.rpdma83[key] = '';
        }
      }

      this.rpdma83.mapCautions.forEach((m, index) => {
        for (const key in m) {
          if (m.hasOwnProperty(key) && key !== 'warning') {
            m[key] = '';
            this.onEventChangeCaution(index, {target: {value: m[key]}});
          }
        }
      });
    }
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    this.continueStatus = ButtonStatus.WORKING;
    this.messageBoxService.reset();
    let container = new Container();
    const dfhcommarea = new Dfhcommarea();
    let data: any = undefined;
    this.container.rpdma83 = this.rpdma83;
    this.container.dfhcommarea = this.dfhcommarea;
    if (this.isPageOverride) {
      this.overrideEnterEvent(container, data);
    } else {
      this.operAuthLmtDfltServiceMainRun(this.container).subscribe((resp) => {
        container = resp;

        this.rpdma83 = container.rpdma83;
        this.dfhcommarea = container.dfhcommarea;
        this.container = container;

        if (this.rpdma83.m83err) {
          this.opMaintenance.displayMessageBox(this.rpdma83.m83err, dftAuthLimitVerifyMsg);
          this.continueStatus = ButtonStatus.FAILED;
          this.resetState();
        }

        if (container.rpdma83.trnCompleted === 'Y') {
          data = this.transferSrv.getData();
          data['common'] = container.dfhcommarea;
          if (this.dfhcommarea.callingProgram.match('RPD05O68')) {
            this.router.navigate(['/dashboard/default-override-pending-verification']);
          } else {
            this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
          }
          this.setSuccess();
        }
        this.resetState();
        window.scrollTo(0, 0);
      }, error1 => {
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
      });
    }
  }

  /**
   * Event action F1EventClick
   */
  returnEventClick(): void {
    let container = new Container();
    container.rpdma83 = this.rpdma83;

    let data: any = undefined;
    container.dfhcommarea = this.dfhcommarea;
    this.operAuthLmtDfltServiceReturnControl(container).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      data['common'] = container.dfhcommarea;
      if (this.dfhcommarea.callingProgram.match('RPD05O68')) {
        this.router.navigate(['/dashboard/default-override-pending-verification']);
      } else {
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      }
    });
  }

  /**
   * Event action F2EventClick
   */
  nextEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.container.rpdma83 = this.rpdma83;
    this.container.dfhcommarea = this.dfhcommarea;

    this.operAuthLmtDfltServicePlanModule(this.container).subscribe((resp) => {
      container = resp;
      this.rpdma83 = container.rpdma83;
      this.dfhcommarea = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = container.dfhcommarea;
      if (this.dfhcommarea.callingProgram === 'RPD05O67') {
        this.router.navigate(['/dashboard/op-auth-plan-one']);
      }
    });

  }

  onEventChange(key, event, warning): void {
    if (event && event.target) {
      this.rpdma83[key] = this.rpdma83[key].length > 0 ? this.rpdma83[key].toUpperCase() : this.rpdma83[key];
      if (this.inputData[key] === event.target.value.toUpperCase()) {
        this.rpdma83[warning] = 'Y';
      } else {
        this.rpdma83[warning] = 'N';
      }
    }
  }

  onEventChangeCaution(index, event): void {
    if (event && event.target) {
      if (this.inputDataCaution[index].cauD === event.target.value.toUpperCase()) {
        this.rpdma83.mapCautions[index].warning = 'Y';
      } else {
        this.rpdma83.mapCautions[index].warning = 'N';
      }
    }
  }

  private defaultPageLoad(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();

    this.dfhcommarea = data['common'];
    if (this.dfhcommarea === undefined) {
      this.dfhcommarea = new Dfhcommarea();
    }
    this.operAuthLmtDfltServiceMainRoutine(this.dfhcommarea).subscribe((res) => {
      container = res;
      data = this.transferSrv.getData();
      this.rpdma83 = container.rpdma83;
      this.inputData = {...this.rpdma83};
      this.inputDataCaution = this.rpdma83.mapCautions.map(obj => ({...obj}));
      this.dfhcommarea = container.dfhcommarea;
      this.container = container;
      if (this.maintInputField.label === 'Position') {
        this.maintInputField.value = this.rpdma83.m83posv;
      }
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'Plan Screen (N)', identifier: 'n', tab: 'alt+n'
          }
        },
        this.componentFactoryResolver,
        this.injector);
    });
  }

  private overridePageLoad(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();

    this.dfhcommarea = data['common'];
    if (this.dfhcommarea === undefined) {
      this.dfhcommarea = new Dfhcommarea();
    }
    this.operAuthLmtOvrdServiceFreshMap(this.container).subscribe((res) => {
      container = res;
      data = this.transferSrv.getData();
      this.rpdma83 = container.rpdma83;
      this.inputData = {...this.rpdma83};
      this.inputDataCaution = this.rpdma83.mapCautions.map(obj => ({...obj}));
      this.dfhcommarea = container.dfhcommarea;
      this.container = container;
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'Plan Screen (N)', identifier: 'n', tab: 'alt+n'
          }
        },
        this.componentFactoryResolver,
        this.injector);
    });
  }

  private overrideEnterEvent(container, data): void {
    this.operAuthLmtOvrdServiceReply(this.container).subscribe((resp) => {
      container = resp;

      this.rpdma83 = container.rpdma83;
      this.dfhcommarea = container.dfhcommarea;
      this.container = container;

      if (this.rpdma83.m83err) {
        this.opMaintenance.displayMessageBox(this.rpdma83.m83err, dftAuthLimitVerifyMsg);
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
      }

      if (container.rpdma83.trnCompleted === 'Y') {
        data = this.transferSrv.getData();
        data['common'] = container.dfhcommarea;
        if (this.dfhcommarea.callingProgram.match('RPD05O68')) {
          this.router.navigate(['/dashboard/default-override-pending-verification']);
        } else {
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
        }
        this.setSuccess();
      }
      this.resetState();
      window.scrollTo(0, 0);
    }, error1 => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls returnControl
   */
  private operAuthLmtDfltServiceReturnControl(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtdflt/operauthlmtdfltservice/returncontrol', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private operAuthLmtDfltServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtdflt/operauthlmtdfltservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls planModule
   */
  private operAuthLmtDfltServicePlanModule(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtdflt/operauthlmtdfltservice/planmodule', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainRoutine
   */
  private operAuthLmtDfltServiceMainRoutine(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtdflt/operauthlmtdfltservice/mainroutine', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls mainRun
   */
  private operAuthLmtDfltServiceMainRun(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtdflt/operauthlmtdfltservice/mainRun', JSON.stringify(container), options);

  }

  private operAuthLmtOvrdServiceFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtovrd/operauthlmtovrdservice/freshmap', JSON.stringify(container), options);
  }

  private operAuthLmtOvrdServiceReply(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthlmtovrd/operauthlmtovrdservice/reply', JSON.stringify(container), options);
  }
}

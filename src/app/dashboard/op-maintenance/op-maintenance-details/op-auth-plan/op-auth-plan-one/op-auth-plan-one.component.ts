import {HttpClient} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorAuthLimit,
  dashboardRoutePathOperatorAuthPlanTwo,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {opAuthPlanVerifyMsg} from '../../../operator-maintenance.constants';
import {Container} from '../model/container.model';
import {Rpdma67} from '../model/rpdma67.model';
import {WorkStorage} from '../model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 * com::uhc::aarp::fox::online::operplnauth::OperdfltOvrdplnauthmntOne::OperdfltOvrdplnauthmntOne
 */
@Component({
  selector: 'fox-op-auth-plan-one',
  templateUrl: './op-auth-plan-one.component.html',
  styleUrls: ['./op-auth-plan-one.component.css']
})
export class OpAuthPlanOneComponent implements OnInit {
  screen = new Rpdma67();
  common = new Dfhcommarea();
  workStorage = new WorkStorage();
  container = new Container();
  data: any;

  medSuplementPlans: PlanArray[];
  hospIdemnityPlans: PlanArray[];
  allMsSelect: boolean = false;
  allHsSelect: boolean = false;
  medReadOnlyPermissions: string[];
  medReadOnlyDenials: string[];
  hosReadOnlyPermissions: string[];
  hosReadOnlyDenials: string[];

  continueStatus: string = ButtonStatus.SUBMIT;
  isWorking: boolean = false;

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.msList) ? this.screen.msList.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private pageHeaderService: PageHeaderService) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    const workStorage = new WorkStorage();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operPlnAuthServiceMainOperation(this.common).subscribe(resp => {
      this.container = resp;
      data = this.transferSrv.getData();
      this.screen = this.container.screenbean1;
      this.common = this.container.dfhcommonarea;
      this.workStorage = this.container.workstorage;
      if (this.screen.map67Title1 === 'UPDATE') {
        this.medSuplementPlans = this.screen.msList;
        this.hospIdemnityPlans = this.screen.hipList;
      }
      if (this.screen.map67Title1 === 'REVIEW') {
        const msReadOnly = this.setReadOnlyArray('MS', this.screen.msList);
        const hsReadOnly = this.setReadOnlyArray('HP', this.screen.hipList);
        this.medReadOnlyPermissions = this.chunkArray(msReadOnly[0], 12);
        this.medReadOnlyDenials = this.chunkArray(msReadOnly[1], 12);
        this.hosReadOnlyPermissions = this.chunkArray(hsReadOnly[0], 12);
        this.hosReadOnlyDenials = this.chunkArray(hsReadOnly[1], 12);
      }
      if (this.screen.map67Err1) {
        this.opMaintenance.displayMessageBox(this.screen.map67Err1, opAuthPlanVerifyMsg);
      }
      if (this.screen.map67MoreMsg) {
        this.opMaintenance.displayMessageBox(this.screen.map67MoreMsg, opAuthPlanVerifyMsg);
      }
      const titleOne = this.screen.map67Title1 ? this.titleCase(this.screen.map67Title1) : '';
      const titleTwo = ' Plan Authority Limits One ';
      const titleThree = this.screen.map67Title2 ? this.titleCase(this.screen.map67Title2) : '';
      this.pageHeaderService.customTitle = titleOne + titleTwo + titleThree;
    });
  }

  titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  changeSingleSelect(event, msInjoObj): void {
    msInjoObj.map67MsAuth = event.target.checked ? '' : 'N';
  }

  changeSingleHsSelect(event, hsInjoObj): void {
    hsInjoObj.map67HipAuth = event.target.checked ? '' : 'N';
  }

  changeAllMsSelect(event, checkedValue): void {
    this.allMsSelect = !checkedValue;
    for (let i = 0; i < this.medSuplementPlans.length; i++) {
      for (let j = 0; j < 13; j++) {
        const planCheck = this.medSuplementPlans[i][j];
        if (planCheck) {
          if (this.allMsSelect) {
            this.medSuplementPlans[i][j].map67MsAuth = '';
          } else {
            this.medSuplementPlans[i][j].map67MsAuth = 'N';
          }
        }
      }
    }
  }

  changeAllHsSelect(event, checkedValue): void {
    this.allHsSelect = !checkedValue;
    for (let i = 0; i < this.hospIdemnityPlans.length; i++) {
      for (let j = 0; j < 13; j++) {
        const planCheck = this.hospIdemnityPlans[i][j];
        if (planCheck) {
          if (this.allHsSelect) {
            this.hospIdemnityPlans[i][j].map67HipAuth = '';
          } else {
            this.hospIdemnityPlans[i][j].map67HipAuth = 'N';
          }
        }
      }
    }
  }

  setReadOnlyArray(type, inputArray: []): any {
    const permissionArray: string[] = [];
    const denialArray: string[] = [];
    const planAuthInput: string = type === 'MS' ? 'map67MsAuth' : 'map67HipAuth';
    const planNameInput: string = type === 'MS' ? 'map67MsPlan' : 'map67HipPlan';

    if (inputArray.length > 0) {
      for (let i = 0; i < inputArray.length; i++) {
        for (let j = 0; j < 13; j++) {
          const planCheck = inputArray[i][j];
          if (planCheck) {
            if (planCheck[planAuthInput] === 'N') {
              denialArray.push(planCheck[planNameInput]);
            } else {
              permissionArray.push(planCheck[planNameInput]);
            }
          }
        }
      }
    }
    return [permissionArray, denialArray];
  }

  chunkArray(arrayObj, rowSize: number): string[] {
    const length = arrayObj.length;
    const rowArray: string[] = [];
    for (let i = 0; i < length; i += rowSize) {
      const myChunk = arrayObj.slice(i, i + rowSize);
      rowArray.push(myChunk);
    }
    return rowArray;
  }

  /**
   * Event action CLEAREventClick
   */
  CLEAREventClick(): void {
    this.messageBoxService.reset();
    this.container.screenbean1 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.operPlnAuthServiceClearKey(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean1;
      this.common = this.container.dfhcommonarea;
    });
  }

  /**
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    this.messageBoxService.reset();
    const workStorage = new WorkStorage();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.container.screenbean1 = this.screen;
    this.container.workstorage = this.workStorage;
    this.container.dfhcommonarea = this.common;
    this.continueStatus = ButtonStatus.WORKING;
    this.isWorking = true;
    this.operPlnAuthServiceEnterKey(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean1;
      this.workStorage = this.container.workstorage;
      this.common = this.container.dfhcommonarea;
      this.medSuplementPlans = this.screen.msList;
      this.hospIdemnityPlans = this.screen.hipList;
      if (this.screen.map67Err1) {
        this.opMaintenance.displayMessageBox(this.screen.map67Err1, opAuthPlanVerifyMsg);
      }
      if (this.screen.map67MoreMsg) {
        this.opMaintenance.displayMessageBox(this.screen.map67MoreMsg, opAuthPlanVerifyMsg);
      }
      if (this.common.nextProgram === 'RPD05O73') {
        this.common.nextProgram = '';
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
        this.setSuccess();
      }
      this.setSuccess();
      window.scrollTo(0, 0);
    }, err => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  /**
   * Event action CancelEventClick
   */
  cancelEventClick(): void {
    let data: any = undefined;
    this.container.screenbean1 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.operPlnAuthServiceCancel(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean1;
      this.common = this.container.dfhcommonarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
    });
  }

  /**
   * Event action NextScreenClick
   */
  nextScreenClick(): void {
    let data: any = undefined;
    this.container.screenbean1 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.operPlnAuthServiceNextScreen(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean1;
      this.common = this.container.dfhcommonarea;

      if (this.screen.map67Err1 === '') {
        data = this.transferSrv.getData();
        data['common'] = this.container.dfhcommonarea;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthPlanTwo]);
      }
    });
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
      this.isWorking = false;
    }, 2500);
  }

  /**
   * Back end calls cancel
   */
  private operPlnAuthServiceCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/cancel', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearKey
   */
  private operPlnAuthServiceClearKey(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/clearkey', JSON.stringify(container), options);
  }

  /**
   * Back end calls enterKey
   */
  private operPlnAuthServiceEnterKey(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/enterkey', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private operPlnAuthServiceMainOperation(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/mainoperation', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls nextScreen
   */
  private operPlnAuthServiceNextScreen(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/nextscreen', JSON.stringify(container), options);
  }

}

interface Plan {
  map67MsAuth: string;
  map67MsPlan: string;
}

interface PlanArray {
  planSet: Plan[];
}

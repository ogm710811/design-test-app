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
  dashboardRoutePathOperatorAuthPlanOne,
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
import {Rpdma90} from '../model/rpdma90.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operplnauth::OperdfltOvrdplnauthmntTwo::OperdfltOvrdplnauthmntTwo
 */
@Component({
  selector: 'fox-op-auth-plan-two',
  templateUrl: './op-auth-plan-two.component.html',
  styleUrls: ['./op-auth-plan-two.component.css']
})

export class OpAuthPlanTwoComponent implements OnInit {

  screen = new Rpdma90();
  common = new Dfhcommarea();
  container = new Container();
  data: any;

  longTermPlans: PlanArray[];
  cpgWrapPlans: PlanArray[];
  riderPlans: PlanArray[];

  allLtcSelect: boolean = false;
  allcpgWrapSelect: boolean = false;
  allridersSelect: boolean = false;

  longTermReadOnlyPermissions: string[];
  cpgWrapReadOnlyPermissions: string[];
  ridersReadOnlyPermissions: string[];

  longTermReadOnlyDenials: string[];
  cpgWrapReadOnlyDenials: string[];
  ridersReadOnlyDenials: string[];

  continueStatus: string = ButtonStatus.SUBMIT;
  isWorking: boolean = false;

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
    const common = new Dfhcommarea();
    const screen = new Rpdma90();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operPlnAuthServiceMainOperation(this.common).subscribe(resp => {
      this.container = resp;
      data = this.transferSrv.getData();
      this.screen = this.container.screenbean2;
      this.common = this.container.dfhcommonarea;

      if (this.screen.map90Title1 === 'UPADTE' || this.screen.map90Title1 === 'UPDATE') {
        this.longTermPlans = this.screen.ltcList;
        this.cpgWrapPlans = this.screen.cpgList;
        this.riderPlans = this.screen.riderList;
      }
      if (this.screen.map90Title1 === 'REVIEW') {
        const ltcReadOnly = this.setReadOnlyArray('LTC', this.screen.ltcList);
        const cpgReadOnly = this.setReadOnlyArray('CPG', this.screen.cpgList);
        const ridersReadOnly = this.setReadOnlyArray('RID', this.screen.riderList);

        this.longTermReadOnlyPermissions = this.chunkArray(ltcReadOnly[0], 12);
        this.longTermReadOnlyDenials = this.chunkArray(ltcReadOnly[1], 12);
        this.cpgWrapReadOnlyPermissions = this.chunkArray(cpgReadOnly[0], 12);
        this.cpgWrapReadOnlyDenials = this.chunkArray(cpgReadOnly[1], 12);
        this.ridersReadOnlyPermissions = this.chunkArray(ridersReadOnly[0], 12);
        this.ridersReadOnlyDenials = this.chunkArray(ridersReadOnly[1], 12);
      }

      if (this.screen.map90Err1) {
        this.opMaintenance.displayMessageBox(this.screen.map90Err1, opAuthPlanVerifyMsg);
      }
      if (this.screen.map90MoreMsg) {
        this.opMaintenance.displayMessageBox(this.screen.map90MoreMsg, opAuthPlanVerifyMsg);
      }
      const titleOne = this.screen.map90Title1 === 'UPADTE' ? 'Update' : this.screen.map90Title1 ? this.titleCase(this.screen.map90Title1) : '';
      const titleTwo = ' Plan Authority Limits Two ';
      const titleThree = this.screen.map90Title2 ? this.titleCase(this.screen.map90Title2) : '';
      this.pageHeaderService.customTitle = titleOne + titleTwo + titleThree;
    });
  }

  titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  changeSingleLtcSelect(event, msInjoObj): void {
    msInjoObj.map90LtcAuth = event.target.checked ? '' : 'N';
  }

  changeSingleCpgSelect(event, hsInjoObj): void {
    hsInjoObj.map90CpgAuth = event.target.checked ? '' : 'N';
  }

  changeSingleRidersSelect(event, hsInjoObj): void {
    hsInjoObj.map90RiderAuth = event.target.checked ? '' : 'N';
  }

  changeAllLtcSelect(event, checkedValue): void {
    this.allLtcSelect = !checkedValue;
    for (let i = 0; i < this.longTermPlans.length; i++) {
      for (let j = 0; j < 13; j++) {
        const planCheck = this.longTermPlans[i][j];
        if (planCheck) {
          if (this.allLtcSelect) {
            this.longTermPlans[i][j].map90LtcAuth = '';
          } else {
            this.longTermPlans[i][j].map90LtcAuth = 'N';
          }
        }
      }
    }
  }

  changeAllCpgSelect(event, checkedValue): void {
    this.allcpgWrapSelect = !checkedValue;
    for (let i = 0; i < this.cpgWrapPlans.length; i++) {
      for (let j = 0; j < 13; j++) {
        const planCheck = this.cpgWrapPlans[i][j];
        if (planCheck) {
          if (this.allcpgWrapSelect) {
            this.cpgWrapPlans[i][j].map90CpgAuth = '';
          } else {
            this.cpgWrapPlans[i][j].map90CpgAuth = 'N';
          }
        }
      }
    }
  }

  changeAllRidersSelect(event, checkedValue): void {
    this.allridersSelect = !checkedValue;
    for (let i = 0; i < this.riderPlans.length; i++) {
      for (let j = 0; j < 13; j++) {
        const planCheck = this.riderPlans[i][j];
        if (planCheck) {
          if (this.allridersSelect) {
            this.riderPlans[i][j].map90RiderAuth = '';
          } else {
            this.riderPlans[i][j].map90RiderAuth = 'N';
          }
        }
      }
    }
  }

  setReadOnlyArray(type, inputArray: []): any {
    const permissionArray: string[] = [];
    const denialArray: string[] = [];
    const planAuthInput: string = type === 'LTC' ? 'map90LtcAuth' : type === 'CPG' ? 'map90CpgAuth' : 'map90RiderAuth';
    const planNameInput: string = type === 'LTC' ? 'map90LtcPlan' : type === 'CPG' ? 'map90CpgPlan' : 'map90Rider';

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
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    this.messageBoxService.reset();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.container.screenbean2 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.continueStatus = ButtonStatus.WORKING;
    this.isWorking = true;
    this.operPlnAuthServiceEnterKey(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean2;
      this.common = this.container.dfhcommonarea;
      this.longTermPlans = this.screen.ltcList;
      this.cpgWrapPlans = this.screen.cpgList;
      this.riderPlans = this.screen.riderList;

      if (this.screen.map90Err1) {
        this.opMaintenance.displayMessageBox(this.screen.map90Err1, opAuthPlanVerifyMsg);
      }
      if (this.screen.map90MoreMsg) {
        this.opMaintenance.displayMessageBox(this.screen.map90MoreMsg, opAuthPlanVerifyMsg);
      }
      if (this.common.nextProgram === 'RPD05O73') {
        this.common.nextProgram = '';
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
      }
      this.setSuccess();
      window.scrollTo(0, 0);
    }, err => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  /**
   * Event action F1EventClick
   */
  cancelEventClick(): void {
    let data: any = undefined;
    this.container.screenbean2 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.operPlnAuthServiceCancel(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean2;
      this.common = this.container.dfhcommonarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
    });
  }

  /**
   * Event action PrevScreenClick
   */
  previousScreenEventClick(): void {
    let data: any = undefined;
    this.container.screenbean2 = this.screen;
    this.container.dfhcommonarea = this.common;
    this.operPlnAuthServicePrevScreen(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.screenbean2;
      this.common = this.container.dfhcommonarea;
      if (this.screen.map90Err1 === '') {
        data = this.transferSrv.getData();
        data['common'] = this.container.dfhcommonarea;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthPlanOne]);
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
   * Back end calls prevScreen
   */
  private operPlnAuthServicePrevScreen(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operplnauth/operplnauthservice/prevscreen', JSON.stringify(container), options);

  }
}

interface Plan {
  map90LtcAuth: string;
  map90LtcPlan: string;
}

interface PlanArray {
  planSet: Plan[];
}

import {Observable} from 'rxjs/Observable';
import {Container as DeftContainer} from './model/container.model';
import {Container as OverrideContainer} from '../set-quality-combination-overrides/model/container.model';
import {Rpdma86 as OverrideScreen} from '../set-quality-combination-overrides/model/rpdma86.model';
import {SetQltyCombDfltOvrd} from './model/set-qlty-comb-dflt-ovrd.model';
import {Subscription} from 'rxjs/index';
import {filter, map} from 'rxjs/operators';
import {Mcombos} from './model/mcombos.model';
import {M86combos} from '../set-quality-combination-overrides/model/m86combos.model';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathDefaultOverridePendingVerification,
  dashboardRoutePathRoot,
  Dfhcommarea,
  HeaderRightItem,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  ProcessClaimHeaderRightComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltycombdflt::setqltycombdflt::setqltycombdflt
 */
@Component({
  selector: 'fox-set-quality-comb-default',
  templateUrl: './set-quality-comb-default.component.html',
  styleUrls: ['./set-quality-comb-default.component.css']
})
export class SetQualityCombDefaultComponent implements OnInit, AfterViewChecked {
  deftScreen = new SetQltyCombDfltOvrd();
  overrideScreen = new OverrideScreen();
  common = new Dfhcommarea();
  container = new DeftContainer();
  overrideContainer = new OverrideContainer();

  @ViewChild('inputTable') inputTable: TableComponent;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  data: any;
  viewData: any[];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  buttonStatus: string = ButtonStatus.SUBMIT;
  subscription: Subscription;
  setQltyCombTableData: object = [];
  setQltyCombColumn: object = [];
  tableHeader: string[];
  resultCurrentSortKey: string;
  resultSortDirection: string;
  isTableConstructed: boolean = false;
  isEditable: boolean = false;
  isModified: boolean = false;
  updatedTableData: Mcombos[] = [];
  updatedOverrideTable: M86combos[] = [];
  actionValue: string = '';
  isOverrideOption: boolean;
  isOverrideReview: boolean;
  maintInputField = {
    label: '',
    value: ''
  };

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private loginService: LoginService,
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.actionValue = (this.activatedRoute.snapshot.data['action']);
    this.isOverrideOption = (this.actionValue === 'OptionK');
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      if (item === 'q') {
      }
    });
    let data: any = undefined;
    let deftcontainer = new DeftContainer();
    let overridecontainer = new OverrideContainer();
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    if (this.isOverrideOption) {
      overridecontainer = await this.setQltyCombOvrdServiceMainProcedure(this.common).toPromise();
      this.overrideScreen = overridecontainer.rpdma86;
      this.common = overridecontainer.dfhcommarea;
    } else {
      this.maintInputField.label = this.activatedRoute.snapshot.queryParamMap['params']['maintInputLabel'];
      this.maintInputField.value = this.activatedRoute.snapshot.queryParamMap['params']['maintInputValue'];
      deftcontainer = await this.setQltyCombDfltServiceMainProcedure(this.common).toPromise();
      this.deftScreen = deftcontainer.setQltyCombDfltOvrd;
      this.common = deftcontainer.dfhcommarea;
    }
    this.viewData = this.isOverrideOption ? this.overrideScreen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize) : this.deftScreen.mcombos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.setQltyCombTableData = this.isOverrideOption ? this.viewData : this.viewData.map((result) => {
      return {
        'Line #': result.mlineNo,
        Percent: result.mpercent,
        State: result.mstate,
        Plan: result.mplan,
        TOS: result.mtos,
        'Start Date': result.mstartmm + result.mstartdd + result.mstartyy,
        'End Date': result.menddd + result.mendmm + result.mendyy,
        Caution: result.mcaution,
        'Acceptability Code': result.maccCode,
      };
    });

    this.tableHeader = ['Line #', 'Percent', 'State', 'Plan', 'TOS', 'Start Date', 'End Date', 'Caution', 'Acceptability Code'];
    this.isEditable = (this.deftScreen.m86hed2 === 'UPDATE') || (this.overrideScreen.m86hed2f === 'UPDATE');
    this.isOverrideReview = (this.overrideScreen.m86hed2f === 'REVIEW');
    this.setQltyCombColumn = this.isEditable ? Object.keys(this.setQltyCombTableData[0]).map((key, index) => {
      return {
        key: key,
        headerText: this.tableHeader[index],
        kind: (index === 0) ? Number(TableColumnKind.Text) : TableColumnKind.Input,
        inputType: (index === 5 || index === 6) ? 'fox-date' : 'text',
      };
    }) : Object.keys(this.setQltyCombTableData[0]).map((key, index) => {
      return {
        key: key,
        headerText: this.tableHeader[index],
        kind: (index === 0) ? Number(TableColumnKind.Text) : (index === 5 || index === 6) ? TableColumnKind.Date : TableColumnKind.Text,
        sortKey: key,
      };
    });
    this.pageTotal = this.isOverrideOption ? Math.ceil(this.overrideScreen.m86comboTable.m86combos.length / this.paginator.pageSize) : Math.ceil(this.deftScreen.mcombos.length / this.paginator.pageSize);
    this.pageHeaderService.customTitle = 'Set Quality Combinations ' + this.titleCase(this.isOverrideReview ? this.overrideScreen.m86hed2f : this.deftScreen.m86hed2);
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        secondButton: {
          display: 'Set Quality (Q)', identifier: 'q', tab: 'alt+q'
        }
      },
      this.componentFactoryResolver,
      this.injector);
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.isOverrideOption ? this.mapData().subscribe(data => {
        this.updatedOverrideTable = data;
        this.updatedOverrideTable = this.viewData.map((item, index) => {
          if (data.length === this.viewData.length) {
            data[index].m86tLineNo = item.m86tLineNo;
          }
          return data[index];
        });
      }) : this.mapDeftData().subscribe(data => {
        this.updatedTableData = data;
        this.updatedTableData = this.viewData.map((item, index) => {
          if (data.length === this.viewData.length) {
            data[index].mlineNo = item.mlineNo;
          }
          return data[index];
        });
      });
    }

    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header1 = document.getElementById('header1');
      const stickyCells = document.getElementsByClassName('column-sticky');
      if (header1 && stickyCells.length > 0) {
        this.isTableConstructed = true;
      }
    }
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  async clearEventClick(): Promise<boolean> {
    const container = new DeftContainer();
    const overrideCont = new OverrideContainer();
    let data: any = undefined;
    this.common = container.dfhcommarea;
    this.container = container;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.inputTable.tableFormGroup.reset();
    this.messageBoxService.reset();
    window.scrollTo(0, 0);
    return true;
  }

  calculateNewPage(): void {
    this.isTableConstructed = false;
    this.viewData = this.isOverrideOption ? this.overrideScreen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize) : this.deftScreen.mcombos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.setQltyCombTableData = this.isOverrideOption ? this.viewData : this.viewData.map((result) => {
      return {
        'Line #': result.mlineNo,
        Percent: result.mpercent,
        State: result.mstate,
        Plan: result.mplan,
        TOS: result.mtos,
        'Start Date': result.mstartmm + result.mstartdd + result.mstartyy,
        'End Date': result.menddd + result.mendmm + result.mendyy,
        Caution: result.mcaution,
        'Acceptability Code': result.maccCode,
      };
    });
    this.pageTotal = this.isOverrideOption ? Math.ceil(this.overrideScreen.m86comboTable.m86combos.length / this.paginator.pageSize) : Math.ceil(this.deftScreen.mcombos.length / this.paginator.pageSize);
  }

  get dataLengthInput(): number {
    return (!!this.deftScreen) ? ((!!this.deftScreen.mcombos) ? this.deftScreen.mcombos.length : 0) : 0;
  }

  /**
   * Event action AnykeyEventClick
   */
  anykeyEventClick(): void {
    const data: any = undefined;
    let container = new DeftContainer();
    container.setQltyCombDfltOvrd = this.deftScreen;
    container.dfhcommarea = this.common;
    this.setQltyCombDfltServiceInvalidKey_0100(container).subscribe(res => {
      container = res;
      this.deftScreen = container.setQltyCombDfltOvrd;
      this.common = container.dfhcommarea;
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      let data: any = undefined;
      let defltContainer = new DeftContainer();
      let overrideCont = new OverrideContainer();
      this.container.setQltyCombDfltOvrd = this.deftScreen;
      this.container.dfhcommarea = this.common;
      this.overrideContainer.rpdma86 = this.overrideScreen;
      this.overrideContainer.dfhcommarea = this.common;
      this.isOverrideOption ? this.setQltyCombOvrdServiceProcessTrans(this.overrideContainer).subscribe(res => {
        overrideCont = res;
        this.overrideContainer = overrideCont;
        this.overrideScreen = overrideCont.rpdma86;
        this.common = overrideCont.dfhcommarea;

        data = this.transferSrv.getData();
        data['container'] = overrideCont;
        if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
        } else {
          this.buttonStatus = ButtonStatus.FAILED;
          this.resetState();
          data['common'] = this.common;
          this.router.navigate(['/' + dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
        }
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.pushAlert(this.overrideScreen.m86err1f);
      }) : this.setQltyCombDfltServiceMainRun_2100(this.container).subscribe(res => {
        defltContainer = res;
        this.container = defltContainer;
        this.deftScreen = defltContainer.setQltyCombDfltOvrd;
        this.common = defltContainer.dfhcommarea;

        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (defltContainer.dfhcommarea.nextProgram === 'RPD05O68') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate(['/' + dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultOverridePendingVerification]);
        }
        if (defltContainer.dfhcommarea.nextProgram === 'RPD05O82') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.resetState();
          this.router.navigate(['/' + dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
        }
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.pushAlert(this.deftScreen.m86err1);
      });
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
  }

  /**
   * Event action PF1EventClick
   */
  f1EventClick(): void {
    let container = new DeftContainer();
    let overrideCont = new OverrideContainer();
    let data: any = undefined;
    container.setQltyCombDfltOvrd = this.deftScreen;
    container.dfhcommarea = this.common;
    overrideCont.rpdma86 = this.overrideScreen;
    overrideCont.dfhcommarea = this.common;
    this.isOverrideOption ? this.setQltyCombOvrdServiceCancelTrans(this.overrideContainer).subscribe(res => {
      overrideCont = res;
      this.overrideScreen = overrideCont.rpdma86;
      this.common = overrideCont.dfhcommarea;

      data = this.transferSrv.getData();
      data['container'] = overrideCont;
      if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
      } else {
        data['common'] = this.common;
        this.router.navigate(['/' + dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      }
    }) : this.setQltyCombDfltServiceCancel_0050(this.container).subscribe(res => {
      container = res;
      this.container = container;
      this.deftScreen = container.setQltyCombDfltOvrd;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/' + dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    });
  }

  private tableColumnWidth(): void {
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '104px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '130px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '120px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '135px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '189px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '189px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '110px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '146px';
    }
    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = '94px';
      } else {
        stickyCells[i]['style'].width = '94px';
        stickyCells[i]['style'].height = '58px';
        stickyCells[i]['style'].paddingTop = '15px';
      }
    }
    const tableScrollerVertical = document.getElementsByClassName('table-scroller-vertical');
    if (tableScrollerVertical[0]) {
      tableScrollerVertical[0]['style'].marginLeft = '94px';
    }
  }

  private mapDeftData(): Observable<Mcombos[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      filter((data: object): data is {rows: Array<any>} => {
        return data.hasOwnProperty('rows');
      }),
      map((data: {rows: any[]}) => {
        return data.rows.map((results: any): Mcombos => {
          return {
            mlineNo: results['Line #'],
            mpercent: results['Percent'],
            mpercentR: 0,
            mstate: results['State'],
            mplan: results['Plan'],
            mtos: results['TOS'],
            mstartmm: results['Start Date'].substring(0, 2),
            mstartdd: results['Start Date'].substring(2, 4),
            mstartyy: results['Start Date'].substring(4),
            mendmm: results['End Date'].substring(0, 2),
            menddd: results['End Date'].substring(2, 4),
            mendyy: results['End Date'].substring(4),
            mcaution: results['Caution'],
            maccCode: results['Acceptability Code'],
          };
        });
      })
    );
  }

  private mapData(): Observable<M86combos[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      filter((data: object): data is {rows: Array<any>} => {
        return data.hasOwnProperty('rows');
      }),
      map((data: {rows: any[]}) => {
        return data.rows.map(results => {
          return {
            m86tLineNo: results['Line #'],
            m86tPct: results['Percent'],
            m86tState: results['State'],
            m86tPlan: results['Plan'],
            m86tTos: results['TOS'],
            m86tFromDate: results['Start Date'],
            m86tToDate: results['End Date'],
            m86tCaution: results['Caution'],
            m86tAcceptCode: results['Acceptability Code'],
          };
        });
      })
    );
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  private pushAlert(message: string): void {
    if (message.includes('QUAL')) {
      this.messageBoxService.addMessageBox('Set Quality Combination Default', MessageBoxType.SUCCESS, message, 3000);
    } else if (message !== '') {
      this.messageBoxService.addMessageBox('Set Quality Combination Default', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainRun_2100
   */
  private setQltyCombDfltServiceMainRun_2100(container: DeftContainer): Observable<DeftContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<DeftContainer>('/api/operator/services/setqltycombdflt/setqltycombdfltservice/mainrun_2100', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcedure
   */
  private setQltyCombDfltServiceMainProcedure(dfhCommonArea: Dfhcommarea): Observable<DeftContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<DeftContainer>('/api/operator/services/setqltycombdflt/setqltycombdfltservice/mainprocedure', JSON.stringify(dfhCommonArea), options);
  }

  /**
   * Back end calls invalidKey_0100
   */
  private setQltyCombDfltServiceInvalidKey_0100(container: DeftContainer): Observable<DeftContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<DeftContainer>('/api/operator/services/setqltycombdflt/setqltycombdfltservice/invalidkey_0100', JSON.stringify(container), options);
  }

  /**
   * Back end calls cancel_0050
   */
  private setQltyCombDfltServiceCancel_0050(container: DeftContainer): Observable<DeftContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<DeftContainer>('/api/operator/services/setqltycombdflt/setqltycombdfltservice/cancel_0050', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcedure
   */
  private setQltyCombOvrdServiceMainProcedure(common: Dfhcommarea): Observable<OverrideContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<OverrideContainer>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/mainprocedure', JSON.stringify(common), options);
  }

  /**
   * Back end calls processTrans
   */
  private setQltyCombOvrdServiceProcessTrans(container: OverrideContainer): Observable<OverrideContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<OverrideContainer>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/processtrans', JSON.stringify(container), options);
  }

  /**
   * Back end calls cancelTrans
   */
  private setQltyCombOvrdServiceCancelTrans(container: OverrideContainer): Observable<OverrideContainer> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};
    return this.httpClient.post<OverrideContainer>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/canceltrans', JSON.stringify(container), options);
  }
}

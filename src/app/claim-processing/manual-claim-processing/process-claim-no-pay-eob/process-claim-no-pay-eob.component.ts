import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathClaimSuspendClm,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderRightItem,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs/index';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Container} from './model/container.model';
import {NopayBillLines} from './model/nopay-bill-lines.model';
import {NoPayEOBFoxTable} from './model/proc-clm-no-pay-eob-fox-table-model';
import {EOBFoxSingleSelect} from './model/proc-clm-no-pay-eob-selection';
import {ProcClmNoPayEob} from './model/proc-clm-no-pay-eob.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmnopayeob::procclmnopayeob::procclmnopayeob
 */
@Component({
  selector: 'fox-app-procclmnopayeob',
  templateUrl: './process-claim-no-pay-eob.component.html',
  styleUrls: ['./process-claim-no-pay-eob.component.css']
})
export class ProcessClaimNoPayEobComponent implements OnInit, AfterViewChecked, OnDestroy {
  screen = new ProcClmNoPayEob();
  common = new Dfhcommarea();
  container = new Container();
  @ViewChild('inputTable') inputTable: TableComponent;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  data: NopayBillLines;
  viewData: NopayBillLines[];
  pageSizeSelected = 13;
  isHeaderOn = false;
  isModified = false;
  buttonStatus: string = 'Submit';
  subscription: Subscription;
  btnAction: string;
  isTableConstructed = false;
  indicatorSelectOptions: EOBFoxSingleSelect[] = [
    {key: 'Y', value: 'Yes'},
    {key: ' ', value: ' '}
  ];
  EobTableColumns: NoPayEOBFoxTable[] =
    [
      {
        key: 'serialNo',
        headerText: '#',
        kind: TableColumnKind.Text
      },
      {
        key: 'screenAssign',
        headerText: 'Assign. Ind',
        kind: TableColumnKind.Input,
        inputType: 'fox-select-single',
        dropDownOptions: this.indicatorSelectOptions
      },
      {
        key: 'screenPlanCode',
        headerText: 'Plan',
        kind: TableColumnKind.Text
      },
      {
        key: 'screenTosCode',
        headerText: 'Type of Service',
        kind: TableColumnKind.Text
      },
      {
        key: 'screenProvider',
        headerText: 'Provider',
        kind: TableColumnKind.Text
      },
      {
        key: 'screenFdos',
        headerText: 'Service Dates',
        kind: TableColumnKind.Text
      },
      {
        key: 'screenAmt',
        headerText: 'Charge',
        kind: TableColumnKind.Text
      }
    ];
  NoPayEobTableData: NopayBillLines[] = [];
  NoPayEobModifiedTableData: NopayBillLines[] = [];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private requestDate: DateFormatService,
    protected headerMaintenance: HeaderMaintenanceService,
    private manualCalimService: ManualClaimService,
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
      if (this.btnAction && this.btnAction === 's') {
        this.pf4EventClick();
      }
    });
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.procClmNoPayEobServiceOnLoad(this.common).toPromise();
    this.container = container;
    data = this.transferSrv.getData();
    this.screen = container.screenBean;
    this.viewData = container.screenBean.nopayBillLines;
    this.NoPayEobTableData = this.screen.nopayBillLines.filter((item) => item.screenPlanCode.trim().length > 0);
    this.NoPayEobTableData = this.NoPayEobTableData.map((item, index) => {
      item.serialNo = index + 1;
      item.validateFdos = item.screenFdos + ' - ' + item.screenTdos;
      item.screenAssign = item.screenAssign === 'Yes' ? 'Y' : ' ';
      item.screenAmt = item.screenAmt ? '$' + item.screenAmt : '';
      return item;
    });
    this.NoPayEobModifiedTableData = this.NoPayEobTableData;
    this.common = container.dfhcommarea;
    if (container && container.screenBean && container.screenBean.nopayBillLines) {
      for (const index of Object.keys(container.screenBean.nopayBillLines)) {
        if (container.screenBean.nopayBillLines[index].screenFdos) {
          container.screenBean.nopayBillLines[index].screenFdos
            = this.requestDate.getFormatedDate(container.screenBean.nopayBillLines[index].screenFdos);
          container.screenBean.nopayBillLines[index].validateFdos = container.screenBean.nopayBillLines[index].screenFdos;
        }
        if (container.screenBean.nopayBillLines[index].screenTdos) {
          container.screenBean.nopayBillLines[index].screenTdos
            = this.requestDate.getFormatedDate(container.screenBean.nopayBillLines[index].screenTdos);
          container.screenBean.nopayBillLines[index].validateTdos = container.screenBean.nopayBillLines[index].screenTdos;
        }
      }
    }
    if (this.screen.screenErr.trim()) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'No Pay EOB';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screen) ? this.screen.wholeName : 'N/A',
          account: (this.screen) ? this.screen.accountNo : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
    }
    this.pageHeaderService.headerRightItem = new HeaderRightItem(ProcessClaimHeaderRightComponent,
      {
        suspendBtn: {
          display: 'Suspend (F9)', identifier: 's', tab: 'ctrl+f9'
        }
      },
      this.componentFactoryResolver,
      this.injector);

    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.NoPayEobModifiedTableData = this.NoPayEobModifiedTableData.map((item, index) => {
          if (data.length === this.NoPayEobModifiedTableData.length) {
            item.screenAssign = data[index].screenAssign === 'Y' ? 'Y' : '';
          }
          return item;
        });
      });
    }
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header3 = document.getElementById('header3');
      const columnSecondSticky = document.getElementsByClassName('column-second-sticky');
      if (header3 && columnSecondSticky.length > 0) {
        this.isTableConstructed = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Event action CLEAREventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container.dfhcommarea = this.common;
    container = await this.procClmNoPayEobServiceClearScreen(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhcommarea;
    return true;
  }

  /**
   * Event action ENTEREventClick
   */
  async enterEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhcommarea = this.common;
    this.screen.nopayBillLines = this.NoPayEobModifiedTableData;
    if (container && container.screenBean && container.screenBean.nopayBillLines) {
      for (const index of Object.keys(container.screenBean.nopayBillLines)) {
        if (container.screenBean.nopayBillLines[index].validateFdos) {
          container.screenBean.nopayBillLines[index].screenFdos = container.screenBean.nopayBillLines[index].validateFdos;
        }
        if (container.screenBean.nopayBillLines[index].validateTdos) {
          container.screenBean.nopayBillLines[index].screenTdos = container.screenBean.nopayBillLines[index].validateTdos;
        }
      }
    }
    if (container && container.screenBean && container.screenBean.nopayBillLines) {
      for (const index of Object.keys(container.screenBean.nopayBillLines)) {
        if (container.screenBean.nopayBillLines[index].screenFdos) {
          container.screenBean.nopayBillLines[index].screenFdos =
            container.screenBean.nopayBillLines[index].screenFdos.split('/').join('');
        }
        if (container.screenBean.nopayBillLines[index].screenTdos) {
          container.screenBean.nopayBillLines[index].screenTdos =
            container.screenBean.nopayBillLines[index].screenTdos.split('/').join('');
        }
      }
    }
    if (this.container && this.container.screenBean && this.container.screenBean.nopayBillLines) {
      for (const index of Object.keys(this.container.screenBean.nopayBillLines)) {
        if (this.container.screenBean.nopayBillLines[index].screenAmt) {
          this.container.screenBean.nopayBillLines[index].screenAmt =
            this.container.screenBean.nopayBillLines[index].screenAmt.substring(1, this.container.screenBean.nopayBillLines[index].screenAmt.length);
        }
        if (this.container.screenBean.nopayBillLines[index].serialNo) {
          delete this.container.screenBean.nopayBillLines[index].serialNo;
        }
      }
    }

    try {
      this.buttonStatus = 'Working...';
      container = await this.procClmNoPayEobServiceMainProcess(this.container).toPromise();
      this.screen = container.screenBean;
      data = this.transferSrv.getData();
      this.common = container.dfhcommarea;
      data['common'] = this.common;
      if (container && container.screenBean && container.screenBean.nopayBillLines) {
        for (const index of Object.keys(container.screenBean.nopayBillLines)) {
          if (container.screenBean.nopayBillLines[index].screenFdos) {
            container.screenBean.nopayBillLines[index].screenFdos
              = this.requestDate.getFormatedDate(container.screenBean.nopayBillLines[index].screenFdos);
          }
          if (container.screenBean.nopayBillLines[index].screenTdos) {
            container.screenBean.nopayBillLines[index].screenTdos
              = this.requestDate.getFormatedDate(container.screenBean.nopayBillLines[index].screenTdos);
          }
        }
      }
      if (this.screen.screenErr.trim()) {
        if (this.screen.screenErr.includes('CAUTION') || this.screen.screenErr.includes('VERIFY')) {
          this.buttonStatus = 'Failed';
          this.resetState();
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr);
        } else {
          this.buttonStatus = 'Failed';
          this.resetState();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr);
        }
      }
      if (container.dfhcommarea.nextProgram = 'RPD06O51') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
      }
      this.buttonStatus = 'Failed';
      this.resetState();
      return true;
    } catch {
      this.buttonStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action F1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhcommarea = this.common;
    container = await this.procClmNoPayEobServicePf1Return(this.container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  /**
   * Event action F4EventClick
   */
  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhcommarea = this.common;
    container = await this.procClmNoPayEobServiceSuspendClaimMod(this.container).toPromise();
    this.screen = container.screenBean;
    data = this.transferSrv.getData();
    this.common = container.dfhcommarea;
    data['common'] = this.common;
    if (container.dfhcommarea.nextProgram = 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    return true;
  }

  /**
   * Back end calls onLoad
   */
  private procClmNoPayEobServiceOnLoad(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopayeob/procclmnopayeobservice/onload', JSON.stringify(common), options);
  }

  /**
   * Back end calls pf1Return
   */
  private procClmNoPayEobServicePf1Return(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopayeob/procclmnopayeobservice/pf1return', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearScreen
   */
  private procClmNoPayEobServiceClearScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopayeob/procclmnopayeobservice/clearscreen', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private procClmNoPayEobServiceMainProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopayeob/procclmnopayeobservice/mainprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls suspendClaimMod
   */
  private procClmNoPayEobServiceSuspendClaimMod(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopayeob/procclmnopayeobservice/suspendclaimmod', JSON.stringify(container), options);
  }

  private mapBackTheData(): Observable<NopayBillLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenAssign: results['screenAssign']
          };
        });
      })
    );
  }

  private tableColumnWidth(): void {
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '65px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '135px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '320px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '336px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '183px';
    }
  }
}

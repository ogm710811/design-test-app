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
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderRightItem,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Container} from './model/container.model';
import {ProcClmHospSnfEob} from './model/proc-clm-hosp-snf-eob.model';
import {HospSnfFoxTable} from './model/proc-clm-hosp-snf-fox-table.model';
import {HospSnfFoxSingleSelect} from './model/proc-clm-hosp-snf-select-single.model';
import {ServiceBillLines} from './model/service-bill-lines.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmhospsnfeob::procclmhospsnfeob::procclmhospsnfeob
 */
@Component({
  selector: 'fox-app-procclmhospsnfeob',
  templateUrl: './process-claim-hosp-snf-eob.component.html',
  styleUrls: ['./process-claim-hosp-snf-eob.component.css']
})
export class ProcessClaimHospSnfEobComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('inputTable') inputTable: TableComponent;
  screenBean = new ProcClmHospSnfEob();
  common = new Dfhcommarea();
  container = new Container();
  billLines: ServiceBillLines[];
  detailsCardTitle = 'EOB Details';
  detailsCardSubTitle = 'Use Alt + K to copy an Assign. Ind value down to the rows below.';
  summaryCardTitle = 'EOB Summary';
  summaryCardSubTitle = 'Tab to navigate and update fields. Click “Continue” (or use Alt + L or Enter) to proceed.';
  isHeaderOn = false;
  isModified = false;
  indicatorSelectOptions: HospSnfFoxSingleSelect[] = [
    {key: 'Y', value: 'Yes'},
    {key: 'N', value: ' '}
  ];
  hospSnfEobTableColumns: HospSnfFoxTable[] =
    [
      {
        key: 'serialNo',
        headerText: '#',
        kind: TableColumnKind.Text
      },
      {
        key: 'assignInd',
        headerText: 'Assign. Ind',
        kind: TableColumnKind.Input,
        inputType: 'fox-select-single',
        dropDownOptions: this.indicatorSelectOptions
      },
      {
        key: 'hoPlanCode',
        headerText: 'Plan',
        kind: TableColumnKind.Text
      },
      {
        key: 'serviceCode',
        headerText: 'Type of Service',
        kind: TableColumnKind.Text
      },
      {
        key: 'providerName',
        headerText: 'Provider',
        kind: TableColumnKind.Text
      },
      {
        key: 'dateOfService',
        headerText: 'Service Dates',
        kind: TableColumnKind.Text
      },
      {
        key: 'noOfDays',
        headerText: '# of Days',
        kind: TableColumnKind.Text
      },
      {
        key: 'dailyBenefit',
        headerText: 'Daily Benefit',
        kind: TableColumnKind.Text
      },
      {
        key: 'benefit',
        headerText: 'Benefit',
        kind: TableColumnKind.Text
      }
    ];
  hospSnfEobTableData: ServiceBillLines[] = [];
  hospSnfEobModifiedTableData: ServiceBillLines[] = [];
  buttonStatus: string = 'Submit';
  suscription: Subscription;
  btnAction: string;

  public constructor(
    protected activatedRoute: ActivatedRoute,
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

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    this.suscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
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
    container = await this.procClmHospSnfEobServiceProgramEntry(this.common).toPromise();
    data = this.transferSrv.getData();
    this.billLines = container.procClmHospSnfEob.serviceBillLines;
    this.screenBean = container.procClmHospSnfEob;
    this.hospSnfEobTableData = this.screenBean.serviceBillLines.filter((item) => item.hoPlanCode.trim().length > 0);
    this.hospSnfEobTableData = this.hospSnfEobTableData.map((item, index) => {
      item.serialNo = index + 1;
      item.dateOfService = item.dos1 + ' - ' + item.dos2;
      item.assignInd = item.assignInd === 'Y' ? 'Y' : 'N';
      return item;
    });
    this.hospSnfEobModifiedTableData = this.hospSnfEobTableData;
    this.common = container.dfhCommArea;
    this.container = container;
    if (this.screenBean.errLine.trim()) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.errLine);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.hospSnfEobModifiedTableData = this.hospSnfEobModifiedTableData.map((item, index) => {
          if (data.length === this.hospSnfEobModifiedTableData.length) {
            item.assignInd = data[index].assignInd === 'Y' ? 'Y' : '';
          }
          return item;
        });
      });
      const header2 = document.getElementById('header2');
      if (header2 && header2.style.minWidth !== '65px') {
        this.tableColumnWidth();
      }
    }
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Hospital / SNF Confinement EOB';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screenBean) ? this.screenBean.wholeName : 'N/A',
          account: (this.screenBean) ? this.screenBean.membNumber : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'Suspend (F9)', identifier: 's', tab: 'ctrl+f9'
          }
        },
        this.componentFactoryResolver,
        this.injector);
      const subHeaderTitle = document.getElementById('subheadertitle');
      if (subHeaderTitle) {
        this.isHeaderOn = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  /**
   * Event action ClearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    container.procClmHospSnfEob = this.screenBean;
    container.dfhCommArea = this.common;
    container = await this.procClmHospSnfEobServiceClearTheScreen(container).toPromise();
    this.screenBean = container.procClmHospSnfEob;
    this.common = container.dfhCommArea;
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();
      let data: any = undefined;
      container = this.container;
      this.screenBean.serviceBillLines = this.hospSnfEobModifiedTableData;
      container.procClmHospSnfEob = this.screenBean;
      container.dfhCommArea = this.common;
      container = await this.procClmHospSnfEobServiceMainRun(container).toPromise();
      this.screenBean = container.procClmHospSnfEob;
      this.common = container.dfhCommArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screenBean.errLine.trim()) {
        if (this.screenBean.errLine.includes('CAUTION') || this.screenBean.errLine.includes('VERIFY')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.errLine);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.errLine);
        }
        this.buttonStatus = 'Failed';
        this.resetState();
      }
      if (container.procClmHospSnfEob.isAssignAmt === true) {
        if (container.dfhCommArea.nextProgram === 'RPD06O51') {
          this.buttonStatus = 'Success!';
          this.resetState();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
        }
      }
      window.scrollTo(0, 0);
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
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.procClmHospSnfEob = this.screenBean;
    container.dfhCommArea = this.common;
    container = await this.procClmHospSnfEobServiceCancelAndReturn(container).toPromise();
    this.screenBean = container.procClmHospSnfEob;
    this.common = container.dfhCommArea;
    this.container = container;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.dfhCommArea.nextProgram === 'RPD06O02') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  /**
   * Event action F4EventClick
   */
  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.procClmHospSnfEob = this.screenBean;

    container.dfhCommArea = this.common;
    container = await this.procClmHospSnfEobServiceSuspendClaimMod(container).toPromise();
    this.screenBean = container.procClmHospSnfEob;
    this.common = container.dfhCommArea;
    this.container = container;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.dfhCommArea.nextProgram === 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    return true;
  }

  clearBtnEventClick(): void {
    this.screenBean.adjustment = '';
    this.screenBean.adjClmNum = '';
    this.screenBean.assgneeTotBene = '';
    this.screenBean.assigneeAdj = '';
    this.screenBean.irsBuwAmt = '';
    this.screenBean.maxAmtAssignee = '';
    this.screenBean.subTotal = '';
    this.screenBean.totalBene = '';
  }

  /**
   * Back end calls cancelAndReturn
   */
  private procClmHospSnfEobServiceCancelAndReturn(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospsnfeobservice/procclmhospsnfeobservice/cancelandreturn', JSON.stringify(container), options);
  }

  /**
   * Back end calls suspendClaimMod
   */
  private procClmHospSnfEobServiceSuspendClaimMod(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospsnfeobservice/procclmhospsnfeobservice/suspendclaimmod', JSON.stringify(container), options);
  }

  /**
   * Back end calls programEntry
   */
  private procClmHospSnfEobServiceProgramEntry(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospsnfeobservice/procclmhospsnfeobservice/programentry', JSON.stringify(dfhCommArea), options);
  }

  /**
   * Back end calls mainRun
   */
  private procClmHospSnfEobServiceMainRun(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospsnfeobservice/procclmhospsnfeobservice/mainrun', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearTheScreen
   */
  private procClmHospSnfEobServiceClearTheScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospsnfeobservice/procclmhospsnfeobservice/clearthescreen', JSON.stringify(container), options);
  }

  private mapBackTheData(): Observable<ServiceBillLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            assignInd: results['assignInd']
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
      header4.style.minWidth = '274px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '193px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '120px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '144px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '134px';
    }
  }
}

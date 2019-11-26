import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
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
import {ProcClmSrvcEob} from './model/proc-clm-srvc-eob.model';
import {ServiceBillLines} from './model/service-bill-lines.model';
import {ServiceEobFoxTable} from './model/service-eob-fox-table.model';
import {ServiceEobFoxSingleSelect} from './model/service-eob-select-single.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmsrvceob::procclmsrvceob::procclmsrvceob
 */
@Component({
  selector: 'fox-app-procclmsrvceob',
  templateUrl: './service-eob.component.html',
  styleUrls: ['./service-eob.component.css']
})
export class ServiceEobComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screenBean = new ProcClmSrvcEob();
  common = new Dfhcommarea();
  container = new Container();
  serviceBillLines: ServiceBillLines[];
  detailsCardTitle = 'EOB Details';
  detailsCardSubTitle = 'Use Alt + K to copy an Assign. Ind value down to the rows below.';
  summaryCardTitle = 'EOB Summary';
  summaryCardSubTitle = 'Tab to navigate and update fields. Click “Continue” (or use Alt + L or Enter) to proceed.';
  isHeaderOn = false;
  isModified = false;
  indicatorSelectOptions: ServiceEobFoxSingleSelect[] = [
    {key: '', value: ' '},
    {key: 'Y', value: 'Yes'}
  ];
  serviceEobTableColumns: ServiceEobFoxTable[] = [
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
      key: 'plan',
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
      key: 'noOfServ',
      headerText: '# of Services',
      kind: TableColumnKind.Text
    },
    {
      key: 'charge',
      headerText: 'Charge',
      kind: TableColumnKind.Currency
    },
    {
      key: 'covExp',
      headerText: 'Covered Expense',
      kind: TableColumnKind.Currency
    },
    {
      key: 'dedSatisfied',
      headerText: 'Deductible',
      kind: TableColumnKind.Currency
    },
    {
      key: 'copayAmt',
      headerText: 'Copay',
      kind: TableColumnKind.Currency
    },
    {
      key: 'benefit',
      headerText: 'Benefit',
      kind: TableColumnKind.Currency
    }
  ];
  serviceEobTableData: ServiceBillLines[] = [];
  serviceEobModifiedTableData: ServiceBillLines[] = [];
  buttonStatus: string = ButtonStatus.SUBMIT;
  suscription: Subscription;
  btnAction: string;

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
    container = await this.procClmSrvcEobServiceProgramEntry(this.common).toPromise();
    data = this.transferSrv.getData();
    this.serviceBillLines = container.procClmSrvcEob.serviceBillLines;
    this.screenBean = container.procClmSrvcEob;
    this.serviceEobTableData = this.screenBean.serviceBillLines.filter((item) => item.plan.trim().length > 0);
    if (container && container.procClmSrvcEob && container.procClmSrvcEob.serviceBillLines) {
      for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
        if (container.procClmSrvcEob.serviceBillLines[index].dos1) {
          container.procClmSrvcEob.serviceBillLines[index].dos1 = this.requestDate.getFormatedDate(container.procClmSrvcEob.serviceBillLines[index].dos1);
          container.procClmSrvcEob.serviceBillLines[index].validateFdos = container.procClmSrvcEob.serviceBillLines[index].dos1;
        } else {
          container.procClmSrvcEob.serviceBillLines[index].validateFdos = '';
        }
        if ('4' !== this.common.processClaimCommarea.saveTypeCharge.substring(0, 1)) {
          if (container.procClmSrvcEob.serviceBillLines[index].dos2) {
            container.procClmSrvcEob.serviceBillLines[index].dos2
              = this.requestDate.getFormatedDate(container.procClmSrvcEob.serviceBillLines[index].dos2);
            container.procClmSrvcEob.serviceBillLines[index].validateTdos = container.procClmSrvcEob.serviceBillLines[index].dos2;
          } else {
            container.procClmSrvcEob.serviceBillLines[index].validateTdos = '';
          }
        }
      }
    }
    this.screenBean = container.procClmSrvcEob;
    this.container = container;
    if (container.dfhcommarea.nextProgram === 'RPD06O27') {
    }
    this.serviceEobTableData = this.serviceEobTableData.map((item, index) => {
      item.serialNo = index + 1;
      if (item.validateTdos) {
        item.dateOfService = item.validateFdos + ' - ' + item.validateTdos;
      } else {
        item.dateOfService = item.validateFdos + ' - ';
      }
      item.assignInd = item.assignInd === 'Y' ? 'Y' : 'N';
      return item;
    });

    this.serviceEobModifiedTableData = this.serviceEobTableData;
    if (this.screenBean.errLine.trim()) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.errLine);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.serviceEobModifiedTableData = this.serviceEobModifiedTableData.map((item, index) => {
          if (data.length === this.serviceEobModifiedTableData.length) {
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
      this.pageHeaderService.customTitle = 'Service EOB';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent, {
          memberName: (this.screenBean) ? this.screenBean.wholeName : 'N/A',
          account: (this.screenBean) ? this.screenBean.membNumber : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          suspendBtn: {
            display: 'Suspend (F9)', identifier: 's', tab: 'ctrl+f9'
          }
        },
        this.componentFactoryResolver,
        this.injector);
    }
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    container.procClmSrvcEob = this.screenBean;
    container = this.container;
    container = await this.procClmSrvcEobServiceClearTheScreen(container).toPromise();
    this.screenBean = container.procClmSrvcEob;
    this.container = container;
    return true;
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      let container = new Container();
      let data: any = undefined;
      this.screenBean.serviceBillLines = this.serviceEobModifiedTableData;
      container.procClmSrvcEob = this.screenBean;
      container = this.container;
      for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
        if (container.procClmSrvcEob.serviceBillLines[index].validateFdos) {
          container.procClmSrvcEob.serviceBillLines[index].dos1 = container.procClmSrvcEob.serviceBillLines[index].validateFdos;
        }
        if (container.procClmSrvcEob.serviceBillLines[index].validateTdos) {
          container.procClmSrvcEob.serviceBillLines[index].dos2 = container.procClmSrvcEob.serviceBillLines[index].validateTdos;
        }
        container.procClmSrvcEob.serviceBillLines[index].assignInd = container.procClmSrvcEob.serviceBillLines[index].assignInd;
      }
      for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
        if (container.procClmSrvcEob.serviceBillLines[index].dos1) {
          container.procClmSrvcEob.serviceBillLines[index].dos1 =
            container.procClmSrvcEob.serviceBillLines[index].dos1.split('/').join('');
        }
        if (container.procClmSrvcEob.serviceBillLines[index].dos2) {
          container.procClmSrvcEob.serviceBillLines[index].dos2 =
            container.procClmSrvcEob.serviceBillLines[index].dos2.split('/').join('');
        }
        container.procClmSrvcEob.serviceBillLines[index].assignInd = container.procClmSrvcEob.serviceBillLines[index].assignInd;
      }
      container = await this.procClmSrvcEobServiceMainRun(container).toPromise();
      this.screenBean = container.procClmSrvcEob;
      this.container = container;
      data = this.transferSrv.getData();
      this.common = container.dfhcommarea;
      data['common'] = this.common;
      if (this.screenBean.errLine.trim()) {
        if (this.screenBean.errLine.includes('VERIFY') || this.screenBean.errLine.includes('WARNING')
          || this.screenBean.errLine.includes('CAUTION')) {

          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screenBean.errLine);
          this.buttonStatus = ButtonStatus.SUCCESS;
          return true;
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screenBean.errLine);
          this.buttonStatus = ButtonStatus.FAILED;
        }
      }
      for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
        if (container.procClmSrvcEob.serviceBillLines[index].dos1) {
          container.procClmSrvcEob.serviceBillLines[index].dos1 = this.requestDate.getFormatedDate(container.procClmSrvcEob.serviceBillLines[index].dos1);
          container.procClmSrvcEob.serviceBillLines[index].validateFdos = container.procClmSrvcEob.serviceBillLines[index].dos1;
        }
        if ('4' !== this.common.processClaimCommarea.saveTypeCharge.substring(0, 1)) {
          if (container.procClmSrvcEob.serviceBillLines[index].dos2) {
            container.procClmSrvcEob.serviceBillLines[index].dos2
              = this.requestDate.getFormatedDate(container.procClmSrvcEob.serviceBillLines[index].dos2);
            container.procClmSrvcEob.serviceBillLines[index].validateTdos = container.procClmSrvcEob.serviceBillLines[index].dos2;
          }
        }
      }
      this.screenBean = container.procClmSrvcEob;
      window.scrollTo(0, 0);
      if (container.dfhcommarea.nextProgram === 'RPD06O51') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
    }
    return true;
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.procClmSrvcEob = this.screenBean;
    container = this.container;
    for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
      if (container.procClmSrvcEob.serviceBillLines[index].dos1) {
        container.procClmSrvcEob.serviceBillLines[index].dos1 =
          container.procClmSrvcEob.serviceBillLines[index].dos1.split('/').join('');
      }
      if (container.procClmSrvcEob.serviceBillLines[index].dos2) {
        container.procClmSrvcEob.serviceBillLines[index].dos2 =
          container.procClmSrvcEob.serviceBillLines[index].dos2.split('/').join('');
      }
    }
    this.screenBean = container.procClmSrvcEob;
    this.container = container;
    data = this.transferSrv.getData();
    this.common = container.dfhcommarea;
    data['common'] = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  /**
   * Event action pf4EventClick
   */
  async pf4EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.procClmSrvcEob = this.screenBean;
    container = this.container;
    for (const index of Object.keys(container.procClmSrvcEob.serviceBillLines)) {
      if (container.procClmSrvcEob.serviceBillLines[index].dos1) {
        container.procClmSrvcEob.serviceBillLines[index].dos1 =
          container.procClmSrvcEob.serviceBillLines[index].dos1.split('/').join('');
      }
      if (container.procClmSrvcEob.serviceBillLines[index].dos2) {
        container.procClmSrvcEob.serviceBillLines[index].dos2 =
          container.procClmSrvcEob.serviceBillLines[index].dos2.split('/').join('');
      }
    }
    container = await this.procClmSrvcEobServiceSuspendClaimMod(container).toPromise();
    this.screenBean = container.procClmSrvcEob;
    this.container = container;
    data = this.transferSrv.getData();
    this.common = container.dfhcommarea;
    data['common'] = this.common;
    if (container.dfhcommarea.nextProgram === 'RPD06O39') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }
    return true;
  }

  /**
   * Back end calls suspendClaimMod
   */
  private procClmSrvcEobServiceSuspendClaimMod(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsrvceob/procclmsrvceobservice/suspendclaimmod', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearTheScreen
   */
  private procClmSrvcEobServiceClearTheScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsrvceob/procclmsrvceobservice/clearthescreen', JSON.stringify(container), options);
  }

  /**
   * Back end calls programEntry
   */
  private procClmSrvcEobServiceProgramEntry(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsrvceob/procclmsrvceobservice/programentry', JSON.stringify(common), options);
  }

  /**
   * Back end calls mainRun
   */
  private procClmSrvcEobServiceMainRun(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsrvceob/procclmsrvceobservice/mainrun', JSON.stringify(container), options);
  }

  /**
   * Back end calls cancelAndReturn
   */
  private procClmSrvcEobServiceCancelAndReturn(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsrvceob/procclmsrvceobservice/cancelandreturn', JSON.stringify(container), options);
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
      header2.style.minWidth = '15px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '15px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '50px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '26px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '23px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '20px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '20px';
    }
    const header9 = document.getElementById('header9');
    if (header9) {
      header9.style.minWidth = '23px';
    }
    const header10 = document.getElementById('header10');
    if (header10) {
      header10.style.minWidth = '38px';
    }
  }
}

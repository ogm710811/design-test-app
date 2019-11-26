import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathProcessClaimMessages,
  claimProcessingRoutePathRoot,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimSubheaderComponent,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {BLSpecMemo} from './model/blspec-memo.model';
import {Container} from './model/container.model';
import {Rpdmaa4Tab1} from './model/rpdmaa4-tab1.model';
import {WorkStorage} from './model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::blspecmemo::blspecmemo::blspecmemo
 */
@Component({
  selector: 'fox-app-blspecmemo',
  templateUrl: './bill-line-special-memo.component.html',
  styleUrls: ['./bill-line-special-memo.component.css']
})
export class BillLineSpecialMemoComponent implements OnInit, AfterViewChecked {
  screen = new BLSpecMemo();
  common = new Dfhcommarea();
  container = new Container();
  workStorage = new WorkStorage();
  continueStatus = 'Submit';
  isHeaderOn = false;
  state: string = '';
  screeBeanData = new Rpdmb22();
  tableData: TableData[] = [];
  billLineTableResult: TableData[];
  billLineTableData: Rpdmaa4Tab1[] = [];
  billLineTableColumns: Object;
  billLineTableSortKey: any;
  billLineTableSortDirection: any;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private pageHeaderService: PageHeaderService,
    private manualClaimService: ManualClaimService,
    private requestDate: DateFormatService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.screeBeanData = this.manualClaimService.screenBean;
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.bLSpecMemoServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screen;
    this.container = container;
    this.workStorage = container.workstorage;
    this.common = container.dfhcommarea;
    this.state = this.common.processClaimCommarea.insState;
    this.billLineTableData = container.screen.rpdmaa4Tab1s.filter((item) => item.aa4planCode.trim().length > 0);
    this.tableData = this.billLineTableData.map((result, index) => {
      return {
        '#': (index + 1).toString(),
        'Special Memo': this.screen.aa4dt01,
        'Plan': result['aa4planCode'],
        'Provider': result['aa4provider'],
        'DOS From': result['aa4fromDate'] === '' ? '' : result['aa4fromDate'].split('/').length > 0 ? result['aa4fromDate'] : this.requestDate.getCcyyFormatedDate(result['aa4fromDate']),
        'Charge': result['aa4charge'],
        'CPT Code': result['aa4Cpt'],
        'No Pay': result['aa4np'],
        'Pattern Paragraph': result['aa4pp']
      };
    });
    this.billLineTableColumns = Object.keys(this.tableData[0]).map((key, idx) => {
      return {
        key: key,
        header: key,
        sortKey: 1 !== idx ? key : null,
        border: false,
        kind:
          1 === idx ?
            TableColumnKind.Input :
            4 === idx ?
              TableColumnKind.Date :
              5 === idx ?
                TableColumnKind.Currency :
                TableColumnKind.Text,
        inputType: 'textarea'
      };
    });
    this.billLineTableResult = this.tableData;
    this.billLineTableSortKey = this.billLineTableColumns[0].sortKey;
    this.billLineTableSortDirection = 'ASC';
    if (this.screen.aa4err) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.aa4err);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Bill Line Special Memo';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.container) ? this.container.dfhcommarea['previousScreenHospSnfEob'].membNumber : 'N/A',
          account: (this.container) ? this.container.dfhcommarea['previousScreenHospSnfEob'].wholeName : 'N/A',
          claim: this.manualClaimService.data ? this.manualClaimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
    }
  }

  async EnterEventClick(): Promise<boolean> {
    let container = new Container();
    container = this.container;
    let data: any = undefined;
    try {
      this.continueStatus = 'Working...';
      container = await this.bLSpecMemoServiceEnterRequest(container).toPromise();
      this.screen = container.screen;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.aa4err) {
        this.continueStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.aa4err);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O54') {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimMessages]);
      }
      return true;
    } catch {
      this.continueStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  /**
   * Event action F1EventClick
   */
  async F1EventClick(): Promise<boolean> {
    let container = new Container();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    container = await this.bLSpecMemoServicePf1Request(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    return true;
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.screen.aa4dt01 = '';
    this.screen.aa4dt02 = '';
    this.screen.aa4dt03 = '';
    this.screen.aa4dt04 = '';
    this.screen.aa4dt05 = '';
    this.screen.aa4dt06 = '';
    this.screen.aa4dt07 = '';
    this.screen.aa4dt08 = '';
    this.screen.aa4dt09 = '';
    this.screen.aa4dt10 = '';
    this.screen.aa4dt11 = '';
    this.screen.aa4dt12 = '';
    this.screen.aa4dt13 = '';
    this.screen.aa4dt14 = '';
    this.screen.aa4dt15 = '';
    this.screen.aa4dt16 = '';
    this.screen.aa4dt17 = '';
    this.screen.aa4dt18 = '';
    this.screen.aa4dt19 = '';
    this.screen.aa4dt20 = '';
  }

  /**
   * Event action F5EventClick
   */
  async F5EventClick(): Promise<boolean> {
    let container = new Container();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    container = await this.bLSpecMemoServicePf5Request(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    return true;
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    const container = new Container();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
    return true;
  }

  /**
   * Event action F7EventClick
   */
  async F7EventClick(): Promise<boolean> {
    let container = new Container();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    container = await this.bLSpecMemoServicePf7Request(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    return true;
  }

  /**
   * Event action F8EventClick
   */
  async F8EventClick(): Promise<boolean> {
    let container = new Container();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    container = await this.bLSpecMemoServicePf8Request(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    return true;
  }

  private setSuccess(): void {
    this.continueStatus = 'Success!';
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = 'Submit';
    }, 2500);
  }

  /**
   * Back end calls pf8Request
   */
  private bLSpecMemoServicePf8Request(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/pf8request', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1Request
   */
  private bLSpecMemoServicePf1Request(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/pf1request', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf5Request
   */
  private bLSpecMemoServicePf5Request(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/pf5request', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf7Request
   */
  private bLSpecMemoServicePf7Request(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/pf7request', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcess
   */
  private bLSpecMemoServiceMainProcess(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/mainprocess', JSON.stringify(common), options);

  }

  /**
   * Back end calls enterRequest
   */
  private bLSpecMemoServiceEnterRequest(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/blspecmemo/blspecmemoservice/enterrequest', JSON.stringify(container), options);

  }
}

interface TableData {
  '#': string;
  'Special Memo': string;
  'Plan': string;
  'Provider': string;
  'DOS From': string;
  'Charge': string;
  'CPT Code': string;
  'No Pay': string;
  'Pattern Paragraph': string;
}

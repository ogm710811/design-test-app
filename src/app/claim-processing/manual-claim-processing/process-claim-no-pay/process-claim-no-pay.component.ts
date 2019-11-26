import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathClaimDrugEob,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessClaimNopayEob,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
  claimProcessingRoutePathTypeOfService,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimSubheaderComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {RPDMAA1} from './model/rpdmaa1.model';
import {ScreenChargeLines} from './model/screen-charge-lines.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmnopaychrg::procclmnopaychrgscreen::procclmnopaychrgscreen
 */
@Component({
  selector: 'fox-process-claim-no-pay',
  templateUrl: './process-claim-no-pay.component.html',
  styleUrls: ['./process-claim-no-pay.component.css']
})
export class ProcessClaimNoPayComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new RPDMAA1();
  screenBeanData = new Rpdmb22();
  common = new Dfhcommarea();
  data: ScreenChargeLines;
  viewData: ScreenChargeLines[];
  pageSizeSelected = 13;
  buttonStatus: string = 'Submit';
  inputColumns: any = [];
  isTableConstructed = false;
  isModified = false;
  isHeaderOn = false;
  isWorking = false;
  tableData: TableData[] = [];
  result: TableData[];

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
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    if (container && container.screenBean && container.screenBean.screenChargeLines) {
      for (const index of Object.keys(container.screenBean.screenChargeLines)) {
        if (container.screenBean.screenChargeLines[index].validateFromDate) {
          container.screenBean.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.screenBean.screenChargeLines[index].validateFromDate);
        }
        if (container.screenBean.screenChargeLines[index].validateToDate) {
          container.screenBean.screenChargeLines[index].screenSerTo = this.requestDate.getValidateDate(container.screenBean.screenChargeLines[index].validateToDate);
        }
      }
    }
    container = await this.procClmNoPayChrgServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    data['container'] = container;
    if (container && container.screenBean && container.screenBean.screenChargeLines) {
      for (const index of Object.keys(container.screenBean.screenChargeLines)) {
        if (container.screenBean.screenChargeLines[index].screenSerFrom) {
          container.screenBean.screenChargeLines[index].validateFromDate
            = this.requestDate.getCcyyFormatedDate(container.screenBean.screenChargeLines[index].screenSerFrom);
        }
        if (container.screenBean.screenChargeLines[index].screenSerTo) {
          container.screenBean.screenChargeLines[index].validateToDate
            = this.requestDate.getCcyyFormatedDate(container.screenBean.screenChargeLines[index].screenSerTo);
        }
      }
    }
    this.screen = container.screenBean;
    this.common = container.dfhcommarea;
    this.screenBeanData = this.manualCalimService.screenBean;

    this.tableData = container.screenBean.screenChargeLines.map((result, index) => {
      return {
        '#': index + 1,
        'Plan': result['screenPlan'],
        'Provider': result['screenProvider'],
        'TOS': result['screenTos'],
        'Service From Date': result['validateFromDate'],
        'Service To Date': result['validateToDate'],
        'Charge': result['screenCharge'],
        'CPT Code': result['screenCpt']
      };
    });
    this.inputColumns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: (index === 1 || index === 2 || index === 3 || index === 7) ? 'text' :
          (index === 4) ? 'fox-date' : (index === 5) ? 'fox-date-mmdd' : 'fox-currency'
      };
    });
    this.result = this.tableData;
    this.viewData = container.screenBean.screenChargeLines;

    if (this.screen.ma1err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.ma1err1);
    }
    if (this.screen.ma1err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.ma1err2);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapData().subscribe(data => {
        this.screen.screenChargeLines = data;
      });
    }

    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - No Pay';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screen) ? this.screen.ma1name : 'N/A',
          account: (this.screen) ? this.screen.ma1memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }

    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header2 = document.getElementById('header2');
      if (header2) {
        this.isTableConstructed = true;
      }
    }
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container.dfhcommarea = this.common;
    container = await this.procClmNoPayChrgServiceClearScreen(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhcommarea;
    this.screen.ma1icd1 = '';
    this.screen.ma1icd2 = '';
    this.screen.ma1icd3 = '';
    this.inputTable.tableFormGroup.reset();
    return true;
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.screen.screenChargeLines.forEach(response => {
      response.screenPlan = response.screenPlan || '';
      response.screenProvider = response.screenProvider || '';
      response.screenTos = response.screenTos || '';
      response.validateFromDate = response.validateFromDate || '';
      response.validateToDate = response.validateToDate || '';
      response.screenCharge = response.screenCharge || '';
      response.screenCpt = response.screenCpt || '';
    });

    try {
      this.buttonStatus = 'Working...';
      this.isWorking = true;
      let container = new Container();
      let data: any = undefined;
      container.screenBean = this.screen;
      container.dfhcommarea = this.common;
      if (container && container.screenBean && container.screenBean.screenChargeLines) {
        for (const index of Object.keys(container.screenBean.screenChargeLines)) {
          if (container.screenBean.screenChargeLines[index].validateFromDate) {
            container.screenBean.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(moment(container.screenBean.screenChargeLines[index].validateFromDate).format('MM-DD-YYYY'));
          }
          if (container.screenBean.screenChargeLines[index].validateToDate) {
            container.screenBean.screenChargeLines[index].screenSerTo = this.requestDate.getValidateDate(moment(container.screenBean.screenChargeLines[index].validateToDate).format('MM-DD-YYYY'));
          }
        }
      }
      container = await this.procClmNoPayChrgServiceProcess(container).toPromise();
      this.screen = container.screenBean;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      if (container && container.screenBean && container.screenBean.screenChargeLines) {
        for (const index of Object.keys(container.screenBean.screenChargeLines)) {
          if (container.screenBean.screenChargeLines[index].screenSerFrom) {
            container.screenBean.screenChargeLines[index].screenSerFrom
              = this.requestDate.getFormatedDate(container.screenBean.screenChargeLines[index].screenSerFrom);
          }
          if (container.screenBean.screenChargeLines[index].screenSerTo) {
            container.screenBean.screenChargeLines[index].screenSerTo
              = this.requestDate.getFormatedDate(container.screenBean.screenChargeLines[index].screenSerTo);
          }
        }
      }
      data['common'] = this.common;
      if (this.screen.ma1err1) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.ma1err1);
      }
      if (this.screen.ma1err2) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.ma1err2);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O21') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopayEob]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O11') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O13') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O12') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O22') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimDrugEob]);
      }
      window.scrollTo(0, 0);
      this.buttonStatus = 'Failed';
      this.resetState();
      return true;
    } catch {
      this.buttonStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  buttonClick(event): void {
    this.enterEventClick();
  }

  resetState(): void {
    setTimeout(() => {
      this.buttonStatus = 'Submit';
      this.isWorking = false;
    }, 2500);
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container.dfhcommarea = this.common;
    container = await this.procClmNoPayChrgServicePf1Return(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhcommarea;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private mapData(): Observable<ScreenChargeLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenPlan: results['Plan'],
            screenProvider: results['Provider'],
            validateFromDate: results['Service From Date'],
            validateToDate: results['Service To Date'],
            screenCpt: results['CPT Code'],
            screenCharge: results['Charge'],
            screenTos: results['TOS']
          };
        });
      })
    );
  }

  private tableColumnWidth(): void {
    const header0 = document.getElementById('header0');
    if (header0) {
      header0.style.minWidth = '50px';
    }
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '110px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '220px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '140px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '190px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '150px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '170px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '180px';
    }
    const tableScrollerVertical = document.getElementsByClassName('table-scroller-vertical');
    if (tableScrollerVertical[0]) {
      tableScrollerVertical[0]['style'].marginLeft = '0';
    }
    const columnStickyBorder = document.getElementsByClassName('column-sticky-border');
    if (columnStickyBorder) {
      for (let i = 0; i < columnStickyBorder.length; i++) {
        columnStickyBorder[i]['style'].position = 'static';
      }
    }
  }

  /**
   * Back end calls mainProcess
   */
  private procClmNoPayChrgServiceMainProcess(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopaychrg/procclmnopaychrgservice/mainprocess', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls process
   */
  private procClmNoPayChrgServiceProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopaychrg/procclmnopaychrgservice/process', JSON.stringify(container), options);
  }

  /**
   * Back end calls pf1Return
   */
  private procClmNoPayChrgServicePf1Return(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopaychrg/procclmnopaychrgservice/pf1return', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearScreen
   */
  private procClmNoPayChrgServiceClearScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnopaychrg/procclmnopaychrgservice/clearscreen', JSON.stringify(container), options);
  }
}

interface TableData {
  '#': number;
  'Charge': string;
  'Service From Date': string;
  'Plan': string;
  'Provider': string;
  'Service To Date': string;
  'CPT Code': string;
  'TOS': string;
}

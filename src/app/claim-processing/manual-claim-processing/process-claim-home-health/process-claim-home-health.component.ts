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
  ScreenProcclmTos,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {ScreenChargeLines} from '../process-claim-no-pay/model/screen-charge-lines.model';
import {Rpdmd28Container} from './model/rpdmd28-container.model';
import {ScreenChargeLine} from './model/screen-charge-line.model';
import {ScreenSaveArea} from './model/screen-save-area.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmhhcoohfgncov::procclmhhcoohfgncov::procclmhhcoohfgncov
 */
@Component({
  selector: 'fox-app-procclmhhcoohfgncov',
  templateUrl: './process-claim-home-health.component.html',
  styleUrls: ['./process-claim-home-health.component.css']
})
export class ProcessClaimHomeHealthComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new ScreenSaveArea();
  common = new Dfhcommarea();
  screenProcclmTos = new ScreenProcclmTos();
  container = new Rpdmd28Container();
  data: ScreenChargeLines;
  pageSizeSelected = 8;
  tableData: TableData[] = [];
  columns: Object;
  result: TableData[];
  isTableConstructed: boolean = false;
  isModified = false;
  isHeaderOn = false;
  continueStatus = 'Submit';
  tripStartDate: any;
  isWorking = false;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private requestDate: DateFormatService,
    protected headerMaintenance: HeaderMaintenanceService,
    private pageHeaderService: PageHeaderService,
    private manualCalimService: ManualClaimService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Rpdmd28Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    for (const index of Object.keys(container.screen.screenChargeLines)) {
      if (container.screen.screenChargeLines[index].validateFromDate) {
        container.screen.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.screen.screenChargeLines[index].validateFromDate);
      }
      if (container.screen.screenChargeLines[index].validateToDate) {
        container.screen.screenChargeLines[index].screenSerTo = this.requestDate.getValidateDate(container.screen.screenChargeLines[index].validateToDate);
      }
    }
    container = await this.mProcClmHhcOohFgnCovServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    for (const index of Object.keys(container.screen.screenChargeLines)) {
      if (container.screen.screenChargeLines[index].screenSerFrom) {
        container.screen.screenChargeLines[index].validateFromDate
          = this.requestDate.getCcyyFormatedDate(container.screen.screenChargeLines[index].screenSerFrom);
      }
      if (container.screen.screenChargeLines[index].screenSerTo) {
        container.screen.screenChargeLines[index].validateToDate
          = this.requestDate.getCcyyFormatedDate(container.screen.screenChargeLines[index].screenSerTo);
      }
    }
    if (container.screen.m28tsdt) {
      this.tripStartDate = container.screen.m28tsdt;
      container.screen.m28tsdt = this.requestDate.getFormatedDate(container.screen.m28tsdt);
    }
    container.screen.m28tsdt = '';
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    this.container = container;
    this.screenProcclmTos = container.dfhcommarea.screenProcclmTos;
    this.tableData = this.screen.screenChargeLines.map((result, index) => {
      return {
        '#': index + 1,
        'Provider': result['screenProvider'],
        'Type Of Service': result['screenServiceCode'],
        'Service Date From': result['validateFromDate'],
        'Service Date To': result['screenSerTo'],
        'SVC': result['screenNos'],
        'Charge': result['screenCharge'],
        'Eligible Charge': result['screenElCharge'],
      };
    });
    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: (index === 1 || index === 2 || index === 5) ? 'text' :
          (index === 3) ? 'fox-date' : (index === 4) ? 'fox-date-mmdd' : 'fox-currency'
      };
    });
    this.result = this.tableData;
    if (this.screen.m28err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m28err1);
    }
    if (this.screen.m28err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m28err2);
    }
    window.scrollTo(0, 0);
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.screenChargeLines = data;
      });
    }
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header1 = document.getElementById('header1');
      if (header1) {
        this.isTableConstructed = true;
      }
    }

    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - Home Health, Out of Hospital, Foreign Coverage';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screenProcclmTos) ? this.screenProcclmTos.m22nam : 'N/A',
          account: (this.screenProcclmTos) ? this.screenProcclmTos.m22memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }

  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.screen.screenChargeLines.forEach(res => {
      res.screenProvider = res.screenProvider === null ? '' : res.screenProvider;
      res.screenServiceCode = res.screenServiceCode === null ? '' : res.screenServiceCode;
      res.validateFromDate = res.validateFromDate === null ? '' : res.validateFromDate;
      res.screenSerTo = res.screenSerTo === null ? '' : res.screenSerTo;
      res.screenNos = res.screenNos === null ? '' : res.screenNos;
      res.screenCharge = res.screenCharge === null ? '' : res.screenCharge;
      res.screenElCharge = res.screenElCharge === null ? '' : res.screenElCharge;

    });
    let container = new Rpdmd28Container();
    let data: any = undefined;
    container = this.container;
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    this.screen.screenChargeLines.forEach(result => {
      result.validateFromDate = result.validateFromDate.replace('/undefined-/g', '');
      result.validateFromDate = result.validateFromDate.replace('/-undefined/g', '');
      result.validateFromDate = result.validateFromDate.replace(/\//g, '-');
      if (result.validateFromDate !== undefined && result.validateFromDate) {
        const temp = result['validateFromDate'].split('-');
        if (result['validateFromDate']) {
          result['validateFromDate'] = temp[1] + '/' + temp[2] + '/' + temp[0];
        }
      }
    });

    for (const index of Object.keys(container.screen.screenChargeLines)) {
      if (container.screen.screenChargeLines[index].validateFromDate && container.screen.screenChargeLines[index].validateFromDate !== undefined) {
        container.screen.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.screen.screenChargeLines[index].validateFromDate);
      }
      if (container.screen.screenChargeLines[index].validateToDate && container.screen.screenChargeLines[index].validateToDate !== undefined) {
        container.screen.screenChargeLines[index].screenSerTo = this.requestDate.getValidateDate(container.screen.screenChargeLines[index].validateToDate);
      }
    }
    if (this.tripStartDate !== undefined && this.tripStartDate) {
      container.screen.m28tsdt = this.tripStartDate;
      const temp = container.screen.m28tsdt.split('-');
      container.screen.m28tsdt = temp[1] + '' + temp[2] + '' + temp[0].slice(2, 4);
    }
    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.mProcClmHhcOohFgnCovServiceScreenData(container).toPromise();
      data = this.transferSrv.getData();
      this.screen = container.screen;
      this.common = container.dfhcommarea;
      data['common'] = this.common;
      if (this.screen.m28err1) {
        this.continueStatus = 'Failed';
        this.resetState();
        if (this.screen.m28err1.includes('CAUTION') || this.screen.m28err1.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m28err1);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m28err1);
        }
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O13') {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
      } else {
        this.resetState();
        for (const index of Object.keys(container.screen.screenChargeLines)) {
          if (container.screen.screenChargeLines[index].screenSerFrom) {
            container.screen.screenChargeLines[index].screenSerFrom
              = this.requestDate.getFormatedDate(container.screen.screenChargeLines[index].screenSerFrom);
          }
          if (container.screen.screenChargeLines[index].screenSerTo) {
            container.screen.screenChargeLines[index].screenSerTo
              = this.requestDate.getFormatedDate(container.screen.screenChargeLines[index].screenSerTo);
          }
        }
        if (container.screen.m28tsdt) {
          container.screen.m28tsdt = this.requestDate.getFormatedDate(container.screen.m28tsdt);
        }
      }
      window.scrollTo(0, 0);
      return true;
    } catch {
      this.continueStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  async pf1EventClick(): Promise<boolean> {
    let container = new Rpdmd28Container();
    let data: any = undefined;
    container = this.container;
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    container = await this.mProcClmHhcOohFgnCovServiceTransTos(container).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    data['common'] = this.common;
    if (container.dfhcommarea.nextProgram === 'RPD06O02') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  async clearEventClick(): Promise<boolean> {
    const container = new Rpdmd28Container();
    this.screen.screenChargeLines = [];
    container.screen = this.screen;
    this.inputTable.tableFormGroup.reset();
    this.screen.m28icd1 = '';
    this.screen.m28icd2 = '';
    this.screen.m28icd3 = '';
    this.screen.m28xpa1 = '';
    this.screen.m28tsdt = '';
    this.screen.m28atrm = '';
    this.tripStartDate = '';
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private setSuccess(): void {
    this.continueStatus = 'Success!';
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = 'Submit';
      this.isWorking = false;
    }, 2500);
  }

  private tableColumnWidth(): void {
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '240px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '140px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '200px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '200px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '95px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '171px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '178px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = '53px';
      } else {
        stickyCells[i]['style'].width = '53px';
        stickyCells[i]['style'].height = '71px';
        stickyCells[i]['style']['padding-top'] = '17px';
      }
    }
    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      this.isTableConstructed = (sve[0]['style'].marginLeft === '52px') ? true : false;
      sve[0]['style'].marginLeft = '52px';
    }
  }

  private mapBackTheData(): Observable<ScreenChargeLine[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenProvider: results['Provider'],
            screenServiceCode: results['Type Of Service'],
            validateFromDate: results['Service Date From'],
            screenSerTo: results['Service Date To'],
            screenNos: results['SVC'],
            screenCharge: results['Charge'],
            screenElCharge: results['Eligible Charge']
          };
        });
      })
    );
  }

  /**
   * Back end calls mainOperation
   */
  private mProcClmHhcOohFgnCovServiceMainOperation(dfhcommarea: Dfhcommarea): Observable<Rpdmd28Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpdmd28Container>('/api/manual/adjudication/services/procclmhhcoohfgncov/procclmhhcoohfgncovservice/onload', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls screenData
   */
  private mProcClmHhcOohFgnCovServiceScreenData(container: Rpdmd28Container): Observable<Rpdmd28Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpdmd28Container>('/api/manual/adjudication/services/procclmhhcoohfgncov/procclmhhcoohfgncovservice/screendata', JSON.stringify(container), options);
  }

  private mProcClmHhcOohFgnCovServiceTransTos(container: Rpdmd28Container): Observable<Rpdmd28Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpdmd28Container>('/api/manual/adjudication/services/procclmhhcoohfgncov/procclmhhcoohfgncovservice/transtos', JSON.stringify(container), options);
  }
}

interface TableData {
  '#': number;
  Provider: string;
  'Type Of Service': string;
  'Service Date From': string;
  'Service Date To': string;
  'SVC': string;
  'Charge': string;
  'Eligible Charge': string;
}

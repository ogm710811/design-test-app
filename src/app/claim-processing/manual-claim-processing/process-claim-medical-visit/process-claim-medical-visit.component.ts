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
  claimProcessingRoutePathDrugChrg,
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathProcessClaiHospSnf,
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
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {ProcClmMedVisitChrg} from './model/proc-clm-med-visit-chrg.model';
import {Rpd06O05MContainer} from './model/rpd06-o05-mcontainer.model';
import {ScreenChargeLine} from './model/screen-charge-line.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmmedvisitchrg::procclmmedvisitchrg::procclmmedvisitchrg
 */
@Component({
  selector: 'fox-app-procclmmedvisitchrg',
  templateUrl: './process-claim-medical-visit.component.html',
  styleUrls: ['./process-claim-medical-visit.component.css']
})
export class ProcessClaimMedicalVisitComponent implements OnInit, AfterViewChecked {
  screen = new ProcClmMedVisitChrg();
  common = new Dfhcommarea();
  screeBean = new Rpdmb22();
  container = new Rpd06O05MContainer();

  columns: Object;
  tableData: TableData[] = [];
  result: TableData[];

  isModified = false;
  istableConstructed: boolean = false;
  isHeaderSet: boolean = false;
  continueStatus: string = 'Submit';
  isWorking: boolean = false;

  @ViewChild('inputTable') inputTable: TableComponent;

  selections = [
    {id: 1, value: 'Visit In-Hospital'},
    {id: 2, value: 'Visit Office'},
    {id: 3, value: 'Visit Home'},
    {id: 6, value: 'Visit N/H'},
    {id: 7, value: 'Cons. In-Hospital'},
    {id: 8, value: 'Cons. Out-Hospital'}
  ];

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
    let container = new Rpd06O05MContainer();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;

    if (container && container.rpdmb25 && container.rpdmb25.screenChargeLines) {
      for (const index of Object.keys(container.rpdmb25.screenChargeLines)) {
        if (container.rpdmb25.screenChargeLines[index].validateFromDate) {
          container.rpdmb25.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.rpdmb25.screenChargeLines[index].validateFromDate);
        }
      }
    }

    container = await this.mProcClmMedVisitChrgServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    data['container'] = container;
    if (container && container.rpdmb25 && container.rpdmb25.screenChargeLines) {
      for (const index of Object.keys(container.rpdmb25.screenChargeLines)) {
        if (container.rpdmb25.screenChargeLines[index].screenSerFrom) {
          container.rpdmb25.screenChargeLines[index].validateFromDate
            = this.requestDate.getCcyyFormatedDate(container.rpdmb25.screenChargeLines[index].screenSerFrom);
        }
      }
    }
    this.screen = container.rpdmb25;

    this.tableData = this.screen.screenChargeLines.map((result, index) => {
      return {
        '#': index + 1,
        Provider: result['screenProvider'],
        Type: result['screenType'],
        'Service Date From': result['validateFromDate'],
        'Service Date To': result['validateToDate'],
        '# of Visits': result['screenNov'],
        'Charge': result['screenCharge'],
        'CPT Code': result['screenCpt'],
        'No Pay Ind': result['screenNoPayInd'],
        'PL': result['screenNoPayPl'],
        'Covered Expense': result['screenCoinsInd'],
        'Pre - Exists': result['screenPreExist']
      };
    });

    const singleSelectOptions: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: 'N', value: 'No'},
      {key: '', value: ' '}
    ];

    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        dropDownOptions: singleSelectOptions,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: (index === 6 || index === 10) ? 'fox-currency' : index === 3 ? 'fox-date' : index === 4 ? 'fox-date-mmdd' : index === 8 ? 'fox-select-single' : 'text'
      };
    });
    this.result = this.tableData;
    this.common = container.dfhcommarea;
    this.screeBean = this.manualCalimService.screenBean;
    if (this.screen.m25err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m25err1);
    }
    if (this.screen.m25err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m25err2);
    }
    if (this.screen.m25err3) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m25err3);
    }

    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.screenChargeLines = data;
      });
    }

    if (!this.istableConstructed) {
      this.tableColumnWidth();
    }

    if (!this.isHeaderSet) {
      this.pageHeaderService.customTitle = 'Process Claim - Medical Visit';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screeBean) ? this.screeBean.m22nam : 'N/A',
          account: (this.screeBean) ? this.screeBean.m22memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderSet = true;
      }

    }

  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    const container = new Rpd06O05MContainer();
    this.screen.screenChargeLines = [];
    container.rpdmb25 = this.screen;
    container.dfhcommarea = this.common;
    this.screen.m25icd1 = '';
    this.screen.m25icd2 = '';
    this.screen.m25icd3 = '';
    this.screen.m25atrm = '';
    this.screen.m25xpa1 = '';
    this.inputTable.tableFormGroup.reset();
    this.messageBoxService.reset();
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action enterEventClick
   */

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  async enterEventClick(): Promise<boolean> {
    let container = new Rpd06O05MContainer();
    let data: any = undefined;

    container.rpdmb25 = this.screen;
    container.dfhcommarea = this.common;

    this.screen.screenChargeLines.forEach(result => {
      if (result.validateFromDate) {
        const temp = result['validateFromDate'].split('-');
        if (result['validateFromDate']) {
          result['validateFromDate'] = temp[1] + '-' + temp[2] + '-' + temp[0];
        }
      }
    });
    if (container && container.rpdmb25 && container.rpdmb25.screenChargeLines) {
      for (const index of Object.keys(container.rpdmb25.screenChargeLines)) {
        if (container.rpdmb25.screenChargeLines[index].validateFromDate) {
          container.rpdmb25.screenChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.rpdmb25.screenChargeLines[index].validateFromDate);
        }
      }
    }

    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.mProcClmMedVisitChrgServiceScreenData_300(container).toPromise();
      data = this.transferSrv.getData();
      if (container && container.rpdmb25 && container.rpdmb25.screenChargeLines) {
        for (const index of Object.keys(container.rpdmb25.screenChargeLines)) {
          if (container.rpdmb25.screenChargeLines[index].screenSerFrom) {
            container.rpdmb25.screenChargeLines[index].screenSerFrom
              = this.requestDate.getFormatedDate(container.rpdmb25.screenChargeLines[index].screenSerFrom);
          }
          if (container.rpdmb25.screenChargeLines[index].screenSerTo) {
            container.rpdmb25.screenChargeLines[index].screenSerTo
              = this.requestDate.getFormatedDate(container.rpdmb25.screenChargeLines[index].screenSerTo);
          }
        }
      }
      this.screen = container.rpdmb25;
      this.common = container.dfhcommarea;
      data['common'] = this.common;
      if (this.screen.m25err1) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m25err1);
      }
      if (this.screen.m25err2) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m25err2);
      }
      if (this.screen.m25err3) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m25err3);
      }
      let dupScreenInd = false;
      if (container.dfhcommarea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.dfhcommarea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines && incBillLine.potentialDuplicateBillLines.length > 0) {
            dupScreenInd = true;
          }
        }
      }
      if (dupScreenInd) {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupClaimCheck]);
        this.setSuccess();
      } else {
        if (container.dfhcommarea.nextProgram === 'RPD06O13') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
          this.setSuccess();
        } else if (container.dfhcommarea.nextProgram === 'RPD06O11') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
          this.setSuccess();
        } else if (container.dfhcommarea.nextProgram === 'RPD06O07') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDrugChrg]);
          this.setSuccess();
        }
      }
      window.scrollTo(0, 0);
      this.setSuccess();
      return true;
    } catch {
      this.continueStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Rpd06O05MContainer();
    container.rpdmb25 = this.screen;
    container.dfhcommarea = this.common;
    if (container && container.rpdmb25 && container.rpdmb25.screenChargeLines) {
      for (const index of Object.keys(container.rpdmb25.screenChargeLines)) {
        if (container.rpdmb25.screenChargeLines[index].screenSerFrom) {
          container.rpdmb25.screenChargeLines[index].screenSerFrom =
            container.rpdmb25.screenChargeLines[index].screenSerFrom.split('/').join('');
        }
        if (container.rpdmb25.screenChargeLines[index].screenSerTo) {
          container.rpdmb25.screenChargeLines[index].screenSerTo =
            container.rpdmb25.screenChargeLines[index].screenSerTo.split('/').join('');
        }
      }
    }
    container = await this.mProcClmMedVisitChrgServiceTransTos_500(container).toPromise();
    const data = this.transferSrv.getData();
    this.screen = container.rpdmb25;
    this.common = container.dfhcommarea;
    data['common'] = this.common;
    this.container = container;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  private mapBackTheData(): Observable<ScreenChargeLine[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenProvider: results['Provider'],
            screenType: results['Type'],
            validateFromDate: results['Service Date From'],
            validateToDate: results['Service Date To'],
            screenNov: results['# of Visits'],
            screenCharge: results['Charge'],
            screenCpt: results['CPT Code'],
            screenNoPayInd: results['No Pay Ind'],
            screenNoPayPl: results['PL'],
            screenCoinsInd: results['Covered Expense'],
            screenPreExist: results['Pre - Exists']
          };
        });
      })
    );
  }

  private tableColumnWidth(): void {

    const numbWidth: string = '53px';
    const xsWidth: string = '120px';
    const mdWidth: string = '220px';
    const smWidth: string = '185px';
    const lgWidth: string = '300px';

    for (let i = 1; i < 12; i++) {
      const header = document.getElementById('header' + i);
      if (header && i === 0) {
        header.style.width = numbWidth;
      } else if (header && i === 1) {
        header.style.minWidth = lgWidth;
      } else if (header && (i === 2 || i === 5 || i === 8 || i === 9 || i === 11)) {
        header.style.minWidth = xsWidth;
      } else if (header && (i === 3 || i === 4)) {
        header.style.minWidth = smWidth;
      } else if (header) {
        header.style.minWidth = mdWidth;
      }
    }

    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = numbWidth;
      } else {
        stickyCells[i]['style'].width = numbWidth;
        stickyCells[i]['style'].height = '71px';
        stickyCells[i]['style']['padding-top'] = '17px';
      }
    }

    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      this.istableConstructed = (sve[0]['style'].marginLeft === '52px') ? true : false;
      sve[0]['style'].marginLeft = '52px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
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

  /**
   * Back end calls screenData_300
   */
  private mProcClmMedVisitChrgServiceScreenData_300(rpd06O05MContainer: Rpd06O05MContainer): Observable<Rpd06O05MContainer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpd06O05MContainer>('/api/manual/adjudication/services/procclmmedvisitchrg/mprocclmmedvisitchrgservice/screendata_300', JSON.stringify(rpd06O05MContainer), options);
  }

  /**
   * Back end calls mainProcess
   */
  private mProcClmMedVisitChrgServiceMainProcess(dfhcommarea: Dfhcommarea): Observable<Rpd06O05MContainer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpd06O05MContainer>('/api/manual/adjudication/services/procclmmedvisitchrg/mprocclmmedvisitchrgservice/mainprocess', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls transTos_500
   */
  private mProcClmMedVisitChrgServiceTransTos_500(rpd06O05MContainer: Rpd06O05MContainer): Observable<Rpd06O05MContainer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpd06O05MContainer>('/api/manual/adjudication/services/procclmmedvisitchrg/mprocclmmedvisitchrgservice/transtos_500', JSON.stringify(rpd06O05MContainer), options);
  }

  /**
   * Back end calls clearScreen
   */
  private mProcClmMedVisitChrgServiceClearScreen(rpd06O05MContainer: Rpd06O05MContainer): Observable<Rpd06O05MContainer> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Rpd06O05MContainer>('/api/manual/adjudication/services/procclmmedvisitchrg/mprocclmmedvisitchrgservice/clearscreen', JSON.stringify(rpd06O05MContainer), options);
  }
}

interface TableData {
  '#': number;
  Provider: string;
  Type: string;
  'Service Date From': string;
  'Service Date To': string;
  '# of Visits': number;
  'Charge': string;
  'CPT Code': string;
  'No Pay Ind': string;
  'PL': string;
  'Covered Expense': string;
  'Pre - Exists': string;
}

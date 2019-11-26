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
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathProcessClaimException,
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
import {Subscription} from 'rxjs/index';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {ScreenDrugChargeLines} from './model/screen-drug-charge-lines.model';
import {Screenbean} from './model/screenbean.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmdrugchrg::procclmdrugchrg::procclmdrugchrg
 */
@Component({
  selector: 'fox-app-procclmdrugchrg',
  templateUrl: './procclmdrugchrg.component.html',
  styleUrls: ['./procclmdrugchrg.component.css']
})
export class ProcclmdrugchrgComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new Screenbean();
  common = new Dfhcommarea();
  screeBeanData = new Rpdmb22();
  container = new Container();
  isHeaderOn = false;
  suscription: Subscription;
  btnAction: string;
  continueStatus = 'Submit';
  isWorking = false;
  isModified = false;
  istableConstructed: boolean = false;
  columns: Object;
  tableData: TableData[] = [];
  result: TableData[];
  data: ScreenDrugChargeLines;
  viewData: ScreenDrugChargeLines[];
  pageSizeSelected = 13;
  selections = [
    {id: 0, value: 'US Pharmacy'},
    {id: 1, value: 'AARP Pharmacy'},
    {id: 4, value: 'Canadian Pharmacy'},
    {id: 5, value: 'Other Foreign Pharmacy'}
  ];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private requestDate: DateFormatService,
    private manualClaimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    protected headerMaintenance: HeaderMaintenanceService,
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
      if (this.btnAction && this.btnAction === 'm') {
        this.pf8EventClick();
      }
    });
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container.dfhCommonArea = this.common;
    for (const index of Object.keys(container.screenbean.screenDrugChargeLines)) {
      if (container.screenbean.screenDrugChargeLines[index].validateFromDate) {
        container.screenbean.screenDrugChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.screenbean.screenDrugChargeLines[index].validateFromDate);
      }
      if (container.screenbean.screenDrugChargeLines[index].validateToDate) {
        container.screenbean.screenDrugChargeLines[index].screenSerTo = this.requestDate.getValidateDate(container.screenbean.screenDrugChargeLines[index].validateToDate);
      }
    }
    container = await this.mProcClmDrugChrgServiceMainProcess(container).toPromise();
    data = this.transferSrv.getData();
    for (const index of Object.keys(container.screenbean.screenDrugChargeLines)) {
      if (container.screenbean.screenDrugChargeLines[index].screenSerFrom) {
        container.screenbean.screenDrugChargeLines[index].validateFromDate
          = this.requestDate.getCcyyFormatedDate(container.screenbean.screenDrugChargeLines[index].screenSerFrom);
      }
      if (container.screenbean.screenDrugChargeLines[index].screenSerTo) {
        container.screenbean.screenDrugChargeLines[index].validateToDate
          = this.requestDate.getCcyyFormatedDate(container.screenbean.screenDrugChargeLines[index].screenSerTo);
      }
    }
    this.screen = container.screenbean;
    this.viewData = container.screenbean.screenDrugChargeLines;
    this.common = container.dfhCommonArea;
    this.screeBeanData = this.manualClaimService.screenBean;
    this.container = container;
    this.tableData = container.screenbean.screenDrugChargeLines.map((result, index) => {
      return {
        '#': index + 1,
        'Provider': result['screenProvider'],
        'Pharmacy Type': result['screenPharmacy'],
        'Service Date From': result['validateFromDate'] === '' ? '' : result['validateFromDate'].split('/').length > 0 ? result['validateFromDate'] : this.requestDate.getCcyyFormatedDate(result['validateFromDate']),
        'Service Date To': result['validateToDate'],
        'Charge': result['screenCharge'],
        'NDC Name': result['screenNdc'],
        'No Pay Ind.': result['screenNoPayInd']
      };
    });
    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: (index === 1 || index === 2 || index === 6 || index === 7) ? 'text' : (index === 3) ? 'fox-date' : (index === 4) ? 'fox-date-mmdd' : 'fox-currency'
      };
    });
    this.result = this.tableData;
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.screenDrugChargeLines = data;
      });
    }
    if (!this.istableConstructed) {
      this.tableColumnWidth();
    }
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - Drug Charges';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screeBeanData) ? this.screeBeanData.m22nam : 'N/A',
          account: (this.screeBeanData) ? this.screeBeanData.m22memn : 'N/A',
          claim: this.manualClaimService.data ? this.manualClaimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(ProcessClaimHeaderRightComponent,
        {
          buttonTitle: 'Benefit Module',
          suspendBtn: {
            display: 'Benefit Module', identifier: 'm', tab: 'alt+k'
          }
        },
        this.componentFactoryResolver,
        this.injector);
      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }
    const header2 = document.getElementById('header2');
    if (header2 && header2.style.minWidth !== '300px') {
      this.tableColumnWidth();
    }
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    const container = new Container();
    container.screenbean = this.screen;
    container.dfhCommonArea = this.common;
    this.mProcClmDrugChrgServiceScreenData_0300(container).toPromise();
    this.screen = container.screenbean;
    this.common = container.dfhCommonArea;
    this.inputTable.tableFormGroup.reset();
    return true;
  }

  async enterEventClick(): Promise<boolean> {
    this.screen.screenDrugChargeLines.forEach(res => {
      res.screenProvider = res.screenProvider === null ? '' : res.screenProvider;
      res.screenPharmacy = res.screenPharmacy === null ? '' : res.screenPharmacy;
      res.validateFromDate = res.validateFromDate === null ? '' : res.validateFromDate;
      res.validateToDate = res.validateToDate === null ? '' : res.validateToDate;
      res.screenCharge = res.screenCharge === null ? '' : res.screenCharge;
      res.screenNdc = res.screenNdc === null ? '' : res.screenNdc;
      res.screenNoPayInd = res.screenNoPayInd === null ? '' : res.screenNoPayInd;
    });
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screenbean = this.screen;
    container.dfhCommonArea = this.common;
    this.screen.screenDrugChargeLines.forEach(result => {
      if (result.validateFromDate) {
        result.validateFromDate = result.validateFromDate.replace('/undefined-/g', '');
        result.validateFromDate = result.validateFromDate.replace('/-undefined/g', '');
        result.validateFromDate = result.validateFromDate.replace(/\//g, '-');

        const temp = result['validateFromDate'].split('-');
        if (result['validateFromDate']) {
          result['validateFromDate'] = temp[1] + '-' + temp[2] + '-' + temp[0];
        }
      }
    });

    for (const index of Object.keys(container.screenbean.screenDrugChargeLines)) {
      if (container.screenbean.screenDrugChargeLines[index].validateFromDate) {
        container.screenbean.screenDrugChargeLines[index].screenSerFrom = this.requestDate.getValidateDate(container.screenbean.screenDrugChargeLines[index].validateFromDate);
      }
      if (container.screenbean.screenDrugChargeLines[index].validateToDate) {
        container.screenbean.screenDrugChargeLines[index].screenSerTo = this.requestDate.getValidateDate(container.screenbean.screenDrugChargeLines[index].validateToDate);
      }
    }
    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.mProcClmDrugChrgServiceScreenData_0300(container).toPromise();
      this.screen = container.screenbean;
      this.common = container.dfhCommonArea;
      this.container = container;
      data = this.transferSrv.getData();
      data['container'] = container;
      data['common'] = this.common;
      if (this.screen.screenErr1) {
        this.continueStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox(container.screenbean.screenErr1, MessageBoxType.ERROR, '');
      }
      if (this.screen.screenErr2) {
        this.continueStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox(container.screenbean.screenErr2, MessageBoxType.ERROR, '');
      }
      if (this.screen.screenErr3) {
        this.continueStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox(container.screenbean.screenErr3, MessageBoxType.ERROR, '');
      }
      let dupScreenInd = false;
      if (container.dfhCommonArea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.dfhCommonArea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines && incBillLine.potentialDuplicateBillLines.length > 0) {
            dupScreenInd = true;
          }
        }
      }
      if (dupScreenInd) {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupClaimCheck]);
      } else {
        if (!this.screen.screenErr1 && container.dfhCommonArea.nextProgram === 'RPD06O22') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimDrugEob]);
        } else if (!this.screen.screenErr1 && container.dfhCommonArea.nextProgram === 'RPD06O10') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimException]);
        } else {
          for (const index of Object.keys(container.screenbean.screenDrugChargeLines)) {
            if (container.screenbean.screenDrugChargeLines[index].screenSerFrom) {
              container.screenbean.screenDrugChargeLines[index].screenSerFrom
                = this.requestDate.getFormatedDate(container.screenbean.screenDrugChargeLines[index].screenSerFrom);
            }
            if (container.screenbean.screenDrugChargeLines[index].screenSerTo) {
              container.screenbean.screenDrugChargeLines[index].screenSerTo
                = this.requestDate.getFormatedDate(container.screenbean.screenDrugChargeLines[index].screenSerTo);
            }
          }
          this.continueStatus = 'Failed';
          this.resetState();
        }
      }
      window.scrollTo(0, 0);
      this.continueStatus = 'Failed';
      this.resetState();
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
    const container = new Container();
    container.screenbean = this.screen;
    container.dfhCommonArea = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.enterEventClick();
    }
  }

  /**
   * Event action pf8EventClick
   */
  async pf8EventClick(): Promise<boolean> {
    const container = new Container();
    container.screenbean = this.screen;
    container.dfhCommonArea = this.common;
    this.mProcClmDrugChrgServiceScreenData_0300(container).toPromise();
    this.screen = container.screenbean;
    this.common = container.dfhCommonArea;
    return true;
  }

  private mapBackTheData(): Observable<ScreenDrugChargeLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenProvider: results['Provider'],
            screenPharmacy: results['Pharmacy Type'],
            validateFromDate: results['Service Date From'],
            validateToDate: results['Service Date To'],
            screenCharge: results['Charge'],
            screenNdc: results['NDC Name'],
            screenNoPayInd: results['No Pay Ind.'],
          };
        });
      })
    );
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
      header4.style.minWidth = '152px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '170px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '150px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '123px';
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
    const tableScrollerVertical = document.getElementsByClassName('table-scroller-vertical');
    if (tableScrollerVertical[0]) {
      tableScrollerVertical[0]['style'].marginLeft = '52px';
    }
  }

  /**
   * Back end calls screenData_0300
   */
  private mProcClmDrugChrgServiceScreenData_0300(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmdrugchrg/mprocclmdrugchrgservice/screendata_0300', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private mProcClmDrugChrgServiceMainProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmdrugchrg/mprocclmdrugchrgservice/mainprocess', JSON.stringify(container), options);
  }
}

interface TableData {
  '#': number;
  'Provider': string;
  'Pharmacy Type': string;
  'Service Date From': string;
  'Service Date To': string;
  'Charge': string;
  'NDC Name': string;
  'No Pay Ind.': string;
}

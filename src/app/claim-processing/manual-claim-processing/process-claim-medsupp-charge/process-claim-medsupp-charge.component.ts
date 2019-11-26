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
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathMedSuppChargeB,
  claimProcessingRoutePathProcessClaimException,
  claimProcessingRoutePathProcessClaimNopayEob,
  claimProcessingRoutePathRoot,
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
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {ScreenChargeLine} from './model/screen-charge-line.model';
import {ScreenSaveArea} from './model/screen-save-area.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmmedsupptbchrg::procclmmedsupptbchrg::ProcClmMedSupChrgLn
 */
@Component({
  selector: 'fox-app-procclmmedsupptbchrg',
  templateUrl: './process-claim-medsupp-charge.component.html',
  styleUrls: ['./process-claim-medsupp-charge.component.css']
})
export class ProcClmMedSupChrgLnComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new ScreenSaveArea();
  common = new Dfhcommarea();
  container = new Container();
  screeBean = new Rpdmb22();
  subscription: Subscription;
  nextProgram = '';
  isModified = false;
  isHeaderOn = false;
  continueStatus = 'Submit';
  isWorking = false;
  columns: Object;
  tableData: TableData[] = [];
  result: TableData[];

  selections = [
    {id: 1, value: 'In Patient'},
    {id: 2, value: 'Out Patient'},
    {id: 3, value: 'Both'},
    {id: 6, value: '62.5% Psych'},
    {id: 7, value: 'Rental'},
    {id: 8, value: 'Manual'},
    {id: 9, value: '100%'}
  ];

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked],
    iconPosition: BadgeIconPositions.before
  };

  queue: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.queue,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.queue,
    iconClasses: [BadgeIcons.queue],
    iconPosition: BadgeIconPositions.before
  };

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
    for (const index in container.screenSaveArea.screenChargeLines) {
      if (container.screenSaveArea.screenChargeLines[index].validateFromDate) {
        container.screenSaveArea.screenChargeLines[index].screenSerFrom =
          this.requestDate.getValidateDate(container.screenSaveArea.screenChargeLines[index].validateFromDate);
      }
    }
    container = await this.procClmMedSupPtBChrgServiceMainProcess_maual(this.common).toPromise();
    data = this.transferSrv.getData();
    for (const index in container.screenSaveArea.screenChargeLines) {
      if (container.screenSaveArea.screenChargeLines[index].screenSerFrom) {
        container.screenSaveArea.screenChargeLines[index].validateFromDate
          = this.requestDate.getCcyyFormatedDate(container.screenSaveArea.screenChargeLines[index].screenSerFrom);
      }
    }

    this.screen = container.screenSaveArea;
    this.common = container.commonArea;
    this.container = container;

    this.screeBean = this.manualCalimService.screenBean;

    this.tableData = this.screen.screenChargeLines.map((result, index) => {

      const temp = result['screenSerFrom'] ? '' : this.requestDate.getCcyyFormatedDate(result['screenSerFrom']);

      return {
        '#': index + 1,
        'Assign. Ind': result['screenMaInd'] === '' ? ' ' : result['screenMaInd'],
        Provider: result['screenProvider'],
        Type: result['screenType'],
        'Service Date From': result['validateFromDate'] === '' ? '' : result['validateFromDate'].split('/').length > 0 ? result['validateFromDate'] : this.requestDate.getCcyyFormatedDate(result['validateFromDate']),
        'Service Date To': result['screenSerTo'],
        'Billed Amount': result['screenAmtBld'],
        'Approved Amount': result['screenAmtAprv'],
        'Medicare Deductible': result['screenMedDed'],
        'Paid Amount': result['screenMedPay'],
        'CPT Code': result['screenCpt'],
        'No Pay Ind': result['screenNoPayInd'] === '' ? ' ' : result['screenNoPayInd'],
        'Coins Ind': result['screenCoinsInd'] === '' ? ' ' : result['screenCoinsInd']
      };
    });

    const singleSelectOptions: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: ' ', value: ' '}
    ];

    const singleSelectAssignInd: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: 'N', value: 'No'},
      {key: ' ', value: ' '}
    ];

    this.columns = Object.keys(this.tableData[0]).map((column, index) => {
      return {
        key: column,
        header: column,
        boarder: false,
        dropDownOptions: (column === 'Assign. Ind') ? singleSelectAssignInd : singleSelectOptions,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: (index === 1 || column === 'Coins Ind' || index === 11) ? 'fox-select-single' : (index === 2 || index === 3 || index === 10) ? 'text' :
          (index === 4) ? 'fox-date' : (index === 5) ? 'fox-date-mmdd' : 'fox-currency'
      };
    });

    this.result = this.tableData;

    if (this.screen.m29err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m29err1);
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

    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - Medicare Supplement Screen A';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screeBean) ? this.screeBean.m22nam : 'N/A',
          account: (this.screeBean) ? this.screeBean.m22memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
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
  clearEventClick(): void {
    this.screen.screenIcdCodes = '';
    this.screen.scrnIcdCode2 = '';
    this.screen.scrnIcdCode3 = '';
    this.screen.screenExclPlan1 = '';
    this.screen.screenAfterTermPlan = '';
    this.inputTable.tableFormGroup.reset();
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {

    this.screen.screenChargeLines.forEach(res => {
      res.screenMaInd = res.screenMaInd === null ? ' ' : res.screenMaInd;
      res.screenProvider = res.screenProvider === null ? '' : res.screenProvider;
      res.screenType = res.screenType === null ? '' : res.screenType;
      res.validateFromDate = res.validateFromDate === null ? '' : res.validateFromDate;
      res.screenSerTo = res.screenSerTo === null ? '' : res.screenSerTo;
      res.screenAmtBld = res.screenAmtBld === null ? '' : res.screenAmtBld;
      res.screenAmtAprv = res.screenAmtAprv === null ? '' : res.screenAmtAprv;
      res.screenMedPay = res.screenMedPay === null ? '' : res.screenMedPay;
      res.screenCpt = res.screenCpt === null ? '' : res.screenCpt;
      res.screenNoPayInd = res.screenNoPayInd === null ? ' ' : res.screenNoPayInd;
      res.screenCoinsInd = res.screenCoinsInd === null ? ' ' : res.screenCoinsInd;
      res.screenMaInd = res.screenMaInd === 'N' ? ' ' : res.screenMaInd;
      res.screenNoPayInd = res.screenNoPayInd === '' ? ' ' : res.screenNoPayInd;
      res.screenCoinsInd = res.screenCoinsInd === '' ? ' ' : res.screenCoinsInd;
    });

    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.commonArea = this.common;
    container.screenSaveArea = this.screen;

    this.screen.screenChargeLines.forEach(result => {
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

    for (const index in container.screenSaveArea.screenChargeLines) {
      if (container.screenSaveArea.screenChargeLines[index].validateFromDate) {
        container.screenSaveArea.screenChargeLines[index].screenSerFrom =
          this.requestDate.getValidateDate(container.screenSaveArea.screenChargeLines[index].validateFromDate);
      }
    }

    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.procClmMedSupPtBChrgServiceEnterKeyProcess(container).toPromise();
      this.screen = container.screenSaveArea;
      this.common = container.commonArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      data['container'] = container;
      if (this.screen.m29err1.trim()) {
        if (this.screen.m29err1.includes('CAUTION') || this.screen.m29err1.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m29err1);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m29err1);
        }
      }
      this.nextProgram = container.commonArea.nextProgram;
      data['nextProgram'] = this.nextProgram;
      let dupScreenInd = false;
      if (container.commonArea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.commonArea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines.length > 0) {
            dupScreenInd = true;
          }
        }
      }
      if (dupScreenInd === true) {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupClaimCheck]);
        this.setSuccess();
      } else {
        container = await this.procClmMedSupPtBChrgServiceEnterKeyProcess(container).toPromise();
        this.screen = container.screenSaveArea;
        this.common = container.commonArea;
        data['common'] = this.common;
        data['container'] = container;
        if (container.commonArea.nextProgram === 'RPD06O12') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
          this.setSuccess();
        } else if (container.commonArea.nextProgram === 'RPD06O29') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppChargeB]);
          this.setSuccess();
        } else if (container.commonArea.nextProgram === 'RPD06O10') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimException]);
          this.setSuccess();
        } else if (container.commonArea.nextProgram === 'RPD06O21') {
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopayEob]);
          this.setSuccess();
        } else {
          for (const index in container.screenSaveArea.screenChargeLines) {
            if (container.screenSaveArea.screenChargeLines[index].screenSerFrom) {
              container.screenSaveArea.screenChargeLines[index].screenSerFrom
                = this.requestDate.getFormatedDate(container.screenSaveArea.screenChargeLines[index].screenSerFrom);
            }
          }
          this.setSuccess();
        }
        this.continueStatus = 'Failed';
        this.resetState();
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

    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screenSaveArea = this.screen;
    container.commonArea = this.common;
    container = await this.procClmMedSupPtBChrgServicePf1KeyProcess(container).toPromise();
    this.screen = container.screenSaveArea;
    this.container = container;
    data = this.transferSrv.getData();
    this.common = container.commonArea;
    data['common'] = this.common;
    if (container.commonArea.nextProgram === 'RPD06O02') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private mapBackTheData(): Observable<ScreenChargeLine[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            screenMaInd: results['Assign. Ind'],
            screenProvider: results['Provider'],
            screenType: results['Type'],
            validateFromDate: results['Service Date From'],
            screenSerTo: results['Service Date To'],
            screenAmtBld: results['Billed Amount'],
            screenAmtAprv: results['Approved Amount'],
            screenMedDed: results['Medicare Deductible'],
            screenMedPay: results['Paid Amount'],
            screenCpt: results['CPT Code'],
            screenNoPayInd: results['No Pay Ind'],
            screenCoinsInd: results['Coins Ind']
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
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '300px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '120px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '185px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '185px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '220px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '220px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '220px';
    }
    const header9 = document.getElementById('header9');
    if (header9) {
      header9.style.minWidth = '220px';
    }
    const header10 = document.getElementById('header10');
    if (header10) {
      header10.style.minWidth = '220px';
    }
    const header11 = document.getElementById('header11');
    if (header11) {
      header11.style.minWidth = '120px';
    }
    const header12 = document.getElementById('header12');
    if (header12) {
      header12.style.minWidth = '120px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  /**
   * Back end calls mainProcess
   */
  private procClmMedSupPtBChrgServiceMainProcess_maual(commonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrg/procclmmedsupptbchrgservice/mainProcess_maual', JSON.stringify(commonArea), options);
  }

  /**
   * Back end calls enterKeyProcess
   */
  private procClmMedSupPtBChrgServiceEnterKeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrg/procclmmedsupptbchrgservice/enterkeyprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls pf1KeyProcess
   */
  private procClmMedSupPtBChrgServicePf1KeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrg/procclmmedsupptbchrgservice/pf1keyprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearKeyProcess
   */
  private procClmMedSupPtBChrgServiceClearKeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrg/procclmmedsupptbchrgservice/clearkeyprocess', JSON.stringify(container), options);
  }
}

interface TableData {
  '#': number;
  'Billed Amount': string;
  'Service Date From': string;
  'Assign. Ind': string;
  'No Pay Ind': string;
  'Approved Amount': string;
  Provider: string;
  Type: string;
  'Coins Ind': string;
  'Service Date To': string;
  'Paid Amount': string;
  'CPT Code': string;
  'Medicare Deductible': string;
}

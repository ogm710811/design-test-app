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
  ButtonStatus,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathMedSuppCharge,
  claimProcessingRoutePathProcessEndofClaim,
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
  TableComponent,
  TransferSrvService
} from '@fox/shared';
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
 *   com::uhc::aarp::fox::online::procclmmedsupptbchrgb::procclmmedsupptbchrgb::procclmmedsupptbchrgb
 */

@Component({
  selector: 'fox-app-procclmmedsupptbchrgb',
  templateUrl: './process-claim-medsupp-chargeb.component.html',
  styleUrls: ['./process-claim-medsupp-chargeb.component.css']
})
export class ProcessClaimMedsuppChargebComponent implements OnInit, AfterViewChecked {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new ScreenSaveArea();
  dfhcommarea = new Dfhcommarea();
  container = new Container();
  screeBean = new Rpdmb22();
  columns: Object;
  results: TableData[];
  isModified = false;
  isHeaderOn = false;
  continueStatus = ButtonStatus.SUBMIT;
  isWorking = false;
  tableData: TableData[];
  memberName = '';
  accountNumb = '';
  numberOfTableRows = 0;

  selections = [
    {id: 1, value: 'In Patient'},
    {id: 2, value: 'Out Patient'},
    {id: 3, value: 'Both'},
    {id: 6, value: '62.5% Psych'},
    {id: 7, value: 'Rental'},
    {id: 8, value: 'Manual'},
    {id: 9, value: '100%'}
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
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.dfhcommarea = data['common'];
    for (const index in container.screenSaveArea.screenChargeLines) {
      if (container.screenSaveArea.screenChargeLines[index].validateFromDate) {
        container.screenSaveArea.screenChargeLines[index].screenSerFrom =
          this.requestDate.getValidateDate(container.screenSaveArea.screenChargeLines[index].validateFromDate);
      }
    }
    container = await this.procClmMedSupPtBChrgBServiceMainProcess(this.dfhcommarea).toPromise();
    data = this.transferSrv.getData();
    data['container'] = container;
    for (const index in container.screenSaveArea.screenChargeLines) {
      if (container.screenSaveArea.screenChargeLines[index].screenSerFrom) {
        container.screenSaveArea.screenChargeLines[index].validateFromDate
          = this.requestDate.getCcyyFormatedDate(container.screenSaveArea.screenChargeLines[index].screenSerFrom);
      }
    }
    this.screen = container.screenSaveArea;
    this.dfhcommarea = container.dfhcommarea;
    this.container = container;

    this.screeBean = this.manualCalimService.screenBean;
    this.memberName = this.screeBean.m22nam;
    this.accountNumb = this.screeBean.m22memn;

    const singleSelectOptions: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: ' ', value: ' '}
    ];

    this.tableData = this.screen.screenChargeLines.map((result, index) => {
      return {
        '#': index + 1,
        Coinsurance: result['screenCoinsAmt'],
        'Assign. Ind': result['screenMaInd'] === '' ? ' ' : result['screenMaInd'],
        Provider: result['screenProvider'],
        Type: result['screenType'],
        'Service Date From': result['validateFromDate'] === '' ? '' :
          result['validateFromDate'].split('/').length > 0 ? result['validateFromDate'] :
            this.requestDate.getCcyyFormatedDate(result['validateFromDate']),
        'Service Date To': result['screenSerTo'],
        'Billed Amount': result['screenAmtBld'],
        'Approved Amount': result['screenAmtAprv'],
        'Medicare Deductible': result['screenMedDed'],
        'Paid Amount': result['screenMedPay']
      };
    });

    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        dropDownOptions: singleSelectOptions,
        isDisabled: index !== 1,
        textLength: index === 1 ? 9 : 1000,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: this.getInputType(key)
      };
    });
    this.numberOfTableRows = this.tableData.length;
    this.results = this.tableData;

    if (this.screen.screenErr1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
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
      this.pageHeaderService.customTitle = 'Process Claim - Medicare Supplement Screen B';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.memberName) ? this.memberName : 'N/A',
          account: (this.accountNumb) ? this.accountNumb : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle && this.memberName.length > 4) {
        this.isHeaderOn = true;
      }
    }

    const tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
      if (tds[i].style.width !== '220px') {
        this.tableColumnWidth();
      }
    }

    const temp = document.getElementsByClassName('container-input');
    if (temp) {
      temp[0]['style'].boarder = 'none';
    }
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.screen.screenChargeLines.forEach(res => {
      res.screenCoinsAmt = res.screenCoinsAmt === null ? '' : res.screenCoinsAmt;
    });

    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screenSaveArea = this.screen;
    container.dfhcommarea = this.dfhcommarea;

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
      this.continueStatus = ButtonStatus.WORKING;
      this.isWorking = true;
      container = await this.procClmMedSupPtBChrgBServiceEnterKeyProcess(container).toPromise();
      this.screen = container.screenSaveArea;
      this.dfhcommarea = container.dfhcommarea;
      for (const index in container.screenSaveArea.screenChargeLines) {
        if (container.screenSaveArea.screenChargeLines[index].screenSerFrom) {
          container.screenSaveArea.screenChargeLines[index].screenSerFrom
            = this.requestDate.getFormatedDate(container.screenSaveArea.screenChargeLines[index].screenSerFrom);
        }
      }
      data = this.transferSrv.getData();
      data['dfhcommarea'] = this.dfhcommarea;
      if (this.screen.screenErr1.trim()) {
        if (this.screen.screenErr1.includes('CAUTION') || this.screen.screenErr1.includes('WARNING')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr1);
        }
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O17') {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessEndofClaim]);
        this.setSuccess();
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O12') {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
        this.setSuccess();
      }
      window.scrollTo(0, 0);
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
      return true;
    } catch {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }
  }

  clear(): void {
    this.screen.screenExclPlan1 = '';
    this.screen.screenAfterTermPlan = '';
    this.tableData.forEach((rest, index) => {
      this.inputTable.tableFormArray.controls[index].patchValue({
        Coinsurance: null
      });
    });
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screenSaveArea = this.screen;
    container.dfhcommarea = this.dfhcommarea;
    container = await this.procClmMedSupPtBChrgBServicePf1KeyProcess(container, this.dfhcommarea).toPromise();
    this.screen = container.screenSaveArea;
    this.container = container;
    data = this.transferSrv.getData();
    this.dfhcommarea = container.dfhcommarea;
    data['dfhcommarea'] = this.dfhcommarea;
    if (container.dfhcommarea.nextProgram === 'RPD06O09') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppCharge]);
    }
    return true;
  }

  private mapBackTheData(): Observable<ScreenChargeLine[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(result => {
          return {
            screenCoinsAmt: result['Coinsurance'],
            screenMaInd: result['Assign. Ind'],
            screenProvider: result['Provider'],
            screenType: result['Type'],
            validateFromDate: result['Service Date From'],
            screenSerTo: result['Service Date To'],
            screenAmtBld: result['Billed Amount'],
            screenAmtAprv: result['Approved Amount'],
            screenMedDed: result['Medicare Deductible'],
            screenMedPay: result['Paid Amount']
          };
        });
      })
    );
  }

  private getInputType(key: string): string | null {
    if (key === 'Coinsurance'
      || key === 'Billed Amount'
      || key === 'Approved Amount'
      || key === 'Medicare Deductible'
      || key === 'Paid Amount') {
      return 'fox-currency';
    } else if (key === 'Assign. Ind') {
      return 'fox-select-single';
    } else if (key === 'Service Date From') {
      return 'fox-date';
    } else if (key === 'Service Date To') {
      return 'fox-date-mmyy';
    } else {
      return 'text';
    }
  }

  private tableColumnWidth(): void {
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '220px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '300px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '120px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '185px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '185px';
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
      header11.style.minWidth = '185px';
    }

    /*this is the one that move the line */
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '220px';
    }

    const tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) {
      tds[i].style.width = '220px';
      tds[i].style.height = '100%';
    }
    // end

    // this is for the vertical scroll
    const sve = document.getElementsByClassName('table-scroller-vertical-extra');
    if (sve && sve.length > 0) {
      sve[0]['style'].marginLeft = '273px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable && containerTable.length > 0) {
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
      this.isWorking = false;
    }, 2500);
  }

  /**
   * Back end calls mainProcess
   */
  private procClmMedSupPtBChrgBServiceMainProcess(commonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrgb/procclmmedsupptbchrgbservice/mainprocess', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls enterKeyProcess
   */
  private procClmMedSupPtBChrgBServiceEnterKeyProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrgb/procclmmedsupptbchrgbservice/enterkeyprocess', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1KeyProcess
   */
  private procClmMedSupPtBChrgBServicePf1KeyProcess(container: Container, dfhcommArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsupptbchrgb/procclmmedsupptbchrgbservice/pf1keyprocess', JSON.stringify(container), options);

  }
}

interface TableData {
  Type: string;
  '#': number;
  Coinsurance: string;
  'Service Date To': string;
  'Billed Amount': string;
  'Paid Amount': string;
  'Service Date From': string;
  'Assign. Ind': string;
  'Approved Amount': string;
  'Medicare Deductible': string;
  Provider: string;
}

import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  OnDestroy,
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
  InputComponent,
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
import {MedSuppEobMap} from './model/med-supp-eob-map.model';
import {ServiceBillLines} from './model/service-bill-lines.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmmedsuppartbeob::procclmmedsuppartbeob::procclmmedsuppartbeob
 */
@Component({
  selector: 'fox-app-procclmmedsuppartbeob',
  templateUrl: './process-claim-medsupp-eob.component.html',
  styleUrls: ['./process-claim-medsupp-eob.component.css']
})
export class ProcessClaimMedsuppEobComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('inputTest') inputTest: InputComponent;
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new MedSuppEobMap();
  common = new Dfhcommarea();
  container = new Container();
  billLines: ServiceBillLines[];
  isHeaderOn = false;
  continueStatus = ButtonStatus.SUBMIT;
  columns?: Object;
  results: TableData[];
  tableData: TableData[];
  subscription = new Subscription();
  isWorking = false;
  memberName = '';
  accountNumb = '';
  isModified = false;

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
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.procClmMedSupPartBEobServiceProgramEntry(this.common).toPromise();
    data = this.transferSrv.getData();
    for (const index in container.screen.serviceBillLines) {
      if (container.screen.serviceBillLines[index].dos1) {
        container.screen.serviceBillLines[index].dos1
          = this.requestDate.getFormatedDate(container.screen.serviceBillLines[index].dos1);
        container.screen.serviceBillLines[index].validateFdos
          = container.screen.serviceBillLines[index].dos1;
      }
    }
    this.screen = container.screen;
    this.common = container.dfhCommArea;
    this.container = container;

    const singleSelectOptions: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: ' ', value: 'No'},
    ];

    this.memberName = this.screen.wholeName;
    this.accountNumb = this.screen.membNumber;

    this.screen.serviceBillLines = this.screen.serviceBillLines.filter(p => this.isEmptyObject(p));

    if (this.screen.serviceBillLines.length > 0) {
      this.tableData = this.screen.serviceBillLines.map((result, index) => {
        return {
          '#': index + 1,
          'Assign Ind': (result['msPlanCode']) ? ' ' : result['assignInd'],
          Plan: result['msPlanCode'],
          'Type Of Service': result['typeOfService'],
          Provider: result['providerName'],
          'Service Dates': {
            firstLine: this.requestDate.getCcyyFormatedDateIE(result['validateFdos'].replace(/\//g, '')) + ' - ',
            secondLine: this.requestDate.getCcyyFormatedDateIE(result['dos2']) === 'Invalid date' ? '' : this.requestDate.getCcyyFormatedDateIE(result['dos2'])
          },
          'Amount Billed': result['amtBilled'],
          'Amount Med Approved': result['amtApproved'],
          'Amount Med Paid': result['medicarePaid'],
          'Med Deduct': result['medicareDed'],
          'Copay / Deduct': result['aarpDed'],
          'AARP Benefit': result['benefit'],
          MA: (result['medicareAssn'] === 'Y') ? ['confirm-green.svg', 'Y'] : ['deny-red.svg', 'N']
        };
      });

      this.columns = Object.keys(this.tableData[0]).map((key, index) => {
        return {
          key: key,
          header: key,
          boarder: false,
          isDoubleLine: !(key === '#' || key === 'Plan' || key === 'Assign Ind' || key === 'Provider' || key === 'Service Dates' || key === 'MA'),
          hasDoubleLine: true,
          dropDownOptions: singleSelectOptions,
          textLength: index === 1 ? 9 : 1000,
          kind: index === 1 ? TableColumnKind.Input :
            (key === 'MA') ? TableColumnKind.IconItem :
              (key === 'Service Dates') ? TableColumnKind.NextLineText :
                (key === 'Amount Billed'
                  || key === 'Amount Med Approved'
                  || key === 'Amount Med Paid'
                  || key === 'Med Deduct'
                  || key === 'Med Deduct'
                  || key === 'AARP Benefit') ? TableColumnKind.CurrencyText : TableColumnKind.Text,
          inputType: 'fox-select-single'
        };
      });

      this.results = this.tableData;
    }

    if (this.screen.errLine) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.errLine);
    }

    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(() => {
      this.pf4EventClick();
    });

    return true;
  }

  ngAfterViewChecked(): void {

    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.serviceBillLines = data;
      });
    }

    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Medicare Supplement EOB';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: this.memberName ? this.memberName : 'N/A',
          account: this.accountNumb ? this.accountNumb : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        ProcessClaimHeaderRightComponent,
        {
          buttonTitle: 'buttonTitle',
          suspendBtn: {
            display: 'Suspend (F9)', identifier: 's', tab: 'ctrl+f9'
          }
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (this.accountNumb.length > 0 && subheadertitle) {
        this.isHeaderOn = true;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clear(): void {
    this.tableData.forEach((rest, index) => {
      this.inputTable.tableFormArray.controls[index].patchValue({
        'Assign Ind': ' '
      });
    });
    this.screen.maxAmtAssignee = '';
    this.screen.assigneeAdj = '';
    this.screen.adjClmNum = '';
    this.screen.adjustment = '';
  }

  /**
   * Event action CLEAREventClick
   */
  async clearEventClick(): Promise<boolean> {
    this.container = await this.procClmMedSupPartBEobServiceClearTheScreen(this.container).toPromise();
    return true;
  }

  /**
   * Event action ENTEREventClick
   */
  async enterEventClick(): Promise<boolean> {

    this.screen.serviceBillLines.forEach(res => {
      res.assignInd = res.assignInd === null ? ' ' : res.assignInd.toUpperCase() === 'N' ? ' ' : res.assignInd;
    });

    this.screen.maxAmtAssignee = this.screen.maxAmtAssignee === '0' ? '' : this.screen.maxAmtAssignee;
    this.screen.assigneeAdj = this.screen.assigneeAdj === '0' ? '' : this.screen.assigneeAdj;
    this.screen.adjClmNum = this.screen.adjClmNum === '0' ? '' : this.screen.adjClmNum;
    this.screen.adjustment = this.screen.adjustment === '0' ? '' : this.screen.adjustment;

    this.screen.serviceBillLines.forEach(result => {
      if (result.validateFdos) {
        result.validateFdos = result.validateFdos.replace(/\//g, '-');
        result.dos2 = result.dos2.length > 0 ? result.dos2.slice(0, 2) + '-' + result.dos2.slice(2, 4) + '-' + result.dos2.slice(4, 6) : result.dos2;
        const temp = result['validateFdos'].split('-');
        if (result['validateFdos']) {
          result['validateFdos'] = temp[1] + '-' + temp[2] + '-' + temp[0];
        }
      }
    });

    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screen = this.screen;
    container.dfhCommArea = this.common;
    for (const index in container.screen.serviceBillLines) {
      if (container.screen.serviceBillLines[index].validateFdos) {
        container.screen.serviceBillLines[index].dos1 = container.screen.serviceBillLines[index].validateFdos;
      }
    }
    for (const index in container.screen.serviceBillLines) {
      if (container.screen.serviceBillLines[index].dos1) {
        container.screen.serviceBillLines[index].dos1 =
          container.screen.serviceBillLines[index].dos1.split('/').join('');
      }
    }

    try {
      this.continueStatus = ButtonStatus.WORKING;
      this.isWorking = true;
      container = await this.procClmMedSupPartBEobServiceMainProcess(container).toPromise();
      this.screen = container.screen;
      this.container = container;
      data = this.transferSrv.getData();
      this.common = container.dfhCommArea;
      data['common'] = this.common;
      if (this.screen.errLine) {
        if (this.screen.errLine.includes('CAUTION') || this.screen.errLine.includes('WARNING') || this.screen.errLine.includes('VERIFY')) {
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.errLine);
          this.setSuccess();
          return true;
        } else {
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.errLine);
        }
        this.setSuccess();
      }
      if (container.dfhCommArea.nextProgram === 'RPD06O51') {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
      } else {
        for (const index in container.screen.serviceBillLines) {
          if (container.screen.serviceBillLines[index].dos1) {
            container.screen.serviceBillLines[index].dos1
              = this.requestDate.getFormatedDate(container.screen.serviceBillLines[index].dos1);
          }
        }
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
      }
    } catch {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }

    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action F1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.screen = this.screen;
    container = this.container;
    container = await this.procClmMedSupPartBEobServiceCancelAndReturn(this.container).toPromise();
    this.screen = container.screen;
    this.container = container;
    data = this.transferSrv.getData();
    this.common = container.dfhCommArea;
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
    container.screen = this.screen;
    try {
      container = await this.procClmMedSupPartBEobServiceSuspendClaimMod(this.container).toPromise();
      this.screen = container.screen;
      this.container = container;
      this.common = container.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhCommArea.nextProgram === 'RPD06O39') {
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
      }
    } catch {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimSuspendClm]);
    }

    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private mapBackTheData(): Observable<ServiceBillLines[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            assignInd: results['Assign Ind'],
            msPlanCode: results['Plan'],
            typeOfService: results['Type Of Service'],
            providerName: results['Provider'],
            validateFdos: results['Service Dates'],
            dos2: results['Service Dates'],
            amtBilled: results['Amount Billed'],
            amtApproved: results['Amount Med Approved'],
            medicarePaid: results['Amount Med Paid'],
            medicareDed: results['Med Deduct'],
            aarpDed: results['Copay / Deduct'],
            benefit: results['AARP Benefit'],
            medicareAssn: results['MA']
          };
        });
      })
    );
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

  private isEmptyObject(obj: any): string {
    let hasValue = '';
    Object.keys(obj).forEach(key => {
      hasValue = (obj[key]);
    });
    return hasValue;
  }

  /**
   * Back end calls cancelAndReturn
   */
  private procClmMedSupPartBEobServiceCancelAndReturn(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsuppartbeob/procclmmedsuppartbeobservice/cancelandreturn', JSON.stringify(container), options);
  }

  /**
   * Back end calls clearTheScreen
   */
  private procClmMedSupPartBEobServiceClearTheScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsuppartbeob/procclmmedsuppartbeobservice/clearthescreen', JSON.stringify(container), options);
  }

  /**
   * Back end calls suspendClaimMod
   */
  private procClmMedSupPartBEobServiceSuspendClaimMod(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsuppartbeob/procclmmedsuppartbeobservice/suspendclaimmod', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private procClmMedSupPartBEobServiceMainProcess(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsuppartbeob/procclmmedsuppartbeobservice/mainprocess', JSON.stringify(container), options);
  }

  /**
   * Back end calls programEntry
   */
  private procClmMedSupPartBEobServiceProgramEntry(dfhCommonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmedsuppartbeob/procclmmedsuppartbeobservice/programentry', JSON.stringify(dfhCommonArea), options);
  }
}

interface TableData {
  '#': number;
  Plan: string;
  'Med Deduct': string;
  Provider: string;
  'Type Of Service': string;
  'Amount Med Approved': string;
  'Amount Med Paid': string;
  MA: string[];
  'Assign Ind': string;
  'AARP Benefit': string;
  'Amount Billed': string;
  'Copay / Deduct': string;
  'Service Dates': {};
}

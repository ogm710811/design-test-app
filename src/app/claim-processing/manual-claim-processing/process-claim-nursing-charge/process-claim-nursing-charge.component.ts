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
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
  claimProcessingRoutePathTypeOfService,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  MessageBoxService,
  MessageBoxType,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {HeaderSubtitleItem} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {ProcessClaimSubheaderComponent} from '@fox/shared';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {MapLines1s} from './model/mapLines1s.model';
import {ProcClmNursingChrgService} from './model/proc-clm-nursing-chrg-service.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmnursingchrg::procclmnursingchrg::procclmnursingchrg
 */
@Component({
  selector: 'fox-app-procclmnursingchrg',
  templateUrl: './process-claim-nursing-charge.component.html',
  styleUrls: ['./process-claim-nursing-charge.component.css']
})
export class ProcessClaimNursingChargeComponent implements OnInit, AfterViewChecked {
  screen = new ProcClmNursingChrgService();
  common = new Dfhcommarea();
  screeBean = new Rpdmb22();
  container = new Container();

  columns: Object;
  tableData: TableData[] = [];
  result: TableData[];

  isModified = false;
  istableConstructed: boolean = false;
  isHeaderSet: boolean = false;
  continueStatus: string = 'Submit';
  isWorking: boolean = false;

  @ViewChild('inputTable') inputTable: TableComponent;

  public constructor(
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
    const common = new Dfhcommarea();
    const screen = new ProcClmNursingChrgService();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (container && container.procClmNursingChrgService && container.procClmNursingChrgService.mapLines1s) {
      for (const index of Object.keys(container.procClmNursingChrgService.mapLines1s)) {
        if (container.procClmNursingChrgService.mapLines1s[index].validateFromDate) {
          container.procClmNursingChrgService.mapLines1s[index].m26sr = this.requestDate.getValidateDate(container.procClmNursingChrgService.mapLines1s[index].validateFromDate);
        }
      }
    }
    container = await this.procClmNursingChrgServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    data['container'] = container;
    this.screen = container.procClmNursingChrgService;
    this.common = container.dfhcommarea;

    if (container && container.procClmNursingChrgService && container.procClmNursingChrgService.mapLines1s) {
      for (const index of Object.keys(container.procClmNursingChrgService.mapLines1s)) {
        if (container.procClmNursingChrgService.mapLines1s[index].m26sr) {
          container.procClmNursingChrgService.mapLines1s[index].validateFromDate
            = this.requestDate.getCcyyFormatedDate(container.procClmNursingChrgService.mapLines1s[index].m26sr);
        }
      }
    }
    this.container = container;

    this.tableData = this.screen.mapLines1s.map((result, index) => {
      return {
        '#': index + 1,
        Provider: result['m26pro'],
        Type: result['m26typ'],
        'Service Date From': result['validateFromDate'],
        'Service Date To': result['validateToDate'],
        '# of Shifts': result['m26nos'],
        '# of Hours': result['m26noh'],
        'Charge': result['m26chg'],
        'CPT Code': result['m26cpt'],
        'No Pay Ind': result['m26np'],
        'PL': result['m26pl'],
        'Pre - Exists': result['m26pre']
      };
    });

    const singleSelectOptions: any[] = [
      {key: 'Y', value: 'Yes'},
      {key: '', value: ' '}
    ];

    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        dropDownOptions: singleSelectOptions,
        kind: index !== 0 ? TableColumnKind.Input : TableColumnKind.Text,
        inputType: index === 7 ? 'fox-currency' : index === 3 ? 'fox-date' : index === 4 ? 'fox-date-mmdd' : index === 9 ? 'fox-select-single' : 'text'
      };
    });
    this.result = this.tableData;
    this.screeBean = this.manualCalimService.screenBean;

    if (this.screen.m26err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m26err1);
      window.scrollTo(0, 0);
    }
    if (this.screen.m26err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m26err2);
      window.scrollTo(0, 0);
    }
    if (this.screen.m26err3) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m26err3);
      window.scrollTo(0, 0);
    }
    return true;
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.procClmNursingChrgService = this.screen;
    container.dfhcommarea = this.common;
    container = await this.procClmNursingChrgServiceClearScreen(container).toPromise();
    this.screen = container.procClmNursingChrgService;
    this.common = container.dfhcommarea;
    this.container = container;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.screen.m26icd1 = '';
    this.screen.m26icd2 = '';
    this.screen.m26icd3 = '';
    this.screen.m26atrm = '';
    this.screen.m26xpa1 = '';
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

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    let businessError = false;
    container.procClmNursingChrgService = this.screen;
    container.dfhcommarea = this.common;
    this.screen.mapLines1s.forEach(result => {
      if (result.validateFromDate) {
        const temp = result['validateFromDate'].split('-');
        if (temp && temp.length > 1) {
          result['validateFromDate'] = temp[1] + '-' + temp[2] + '-' + temp[0];
        }
      }
    });
    if (container && container.procClmNursingChrgService && container.procClmNursingChrgService.mapLines1s) {
      for (const index of Object.keys(container.procClmNursingChrgService.mapLines1s)) {
        if (container.procClmNursingChrgService.mapLines1s[index].validateFromDate) {
          container.procClmNursingChrgService.mapLines1s[index].m26sr = this.requestDate.getValidateDate(container.procClmNursingChrgService.mapLines1s[index].validateFromDate);
        }
      }
    }
    try {
      this.continueStatus = 'Working...';
      this.isWorking = true;
      container = await this.procClmNursingChrgServiceScreenData(container).toPromise();
      this.screen = container.procClmNursingChrgService;
      this.common = container.dfhcommarea;
      if (container && container.procClmNursingChrgService && container.procClmNursingChrgService.mapLines1s) {
        for (const index of Object.keys(container.procClmNursingChrgService.mapLines1s)) {
          if (container.procClmNursingChrgService.mapLines1s[index].m26sr) {
            container.procClmNursingChrgService.mapLines1s[index].m26sr
              = this.requestDate.getFormatedDate(container.procClmNursingChrgService.mapLines1s[index].m26sr);
          }
          if (container.procClmNursingChrgService.mapLines1s[index].m26sr21) {
            container.procClmNursingChrgService.mapLines1s[index].m26sr21
              = this.requestDate.getFormatedDate(container.procClmNursingChrgService.mapLines1s[index].m26sr21);
          }
        }
      }
      this.container = container;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.screen.m26err1) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err1);
        businessError = true;
      }
      if (this.screen.m26err2) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err2);
        businessError = true;
      }
      if (this.screen.m26err3) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err3);
        businessError = true;
      }

      data['nextProgram'] = container.dfhcommarea.nextProgram;
      let dupScreenInd = false;
      if (container.dfhcommarea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.dfhcommarea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines.length > 0) {
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
        }
      }
      window.scrollTo(0, 0);
      if (businessError) {
        this.continueStatus = 'Failed';
        this.resetState();
      } else {
        this.setSuccess();
      }
      return true;
    } catch {
      this.continueStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.mapLines1s = data;
      });
    }
    if (!this.istableConstructed) {
      this.tableColumnWidth();
    }
    if (!this.isHeaderSet) {
      this.pageHeaderService.customTitle = 'Process Claim - Nursing Care Charge';
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
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    if (container && container.procClmNursingChrgService && container.procClmNursingChrgService.mapLines1s) {
      for (const index of Object.keys(container.procClmNursingChrgService.mapLines1s)) {
        if (container.procClmNursingChrgService.mapLines1s[index].m26sr) {
          container.procClmNursingChrgService.mapLines1s[index].m26sr
            = container.procClmNursingChrgService.mapLines1s[index].m26sr.split('/').join('');
        }
        if (container.procClmNursingChrgService.mapLines1s[index].validateFromDate) {
          const temp = container.procClmNursingChrgService.mapLines1s[index].validateFromDate;
          container.procClmNursingChrgService.mapLines1s[index].validateFromDate
            = temp[2] + '-' + temp[0] + '-' + temp[1];
        }
      }
    }
    container = await this.procClmNursingChrgServiceTransTos(container).toPromise();
    this.screen = container.procClmNursingChrgService;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.container = container;
    if (this.screen.m26err1) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err1);
      window.scrollTo(0, 0);
    }
    if (this.screen.m26err2) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err2);
      window.scrollTo(0, 0);
    }
    if (this.screen.m26err3) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m26err3);
      window.scrollTo(0, 0);
    }
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  private mapBackTheData(): Observable<MapLines1s[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            m26pro: results['Provider'],
            m26typ: results['Type'],
            validateFromDate: results['Service Date From'],
            validateToDate: results['Service Date To'],
            m26nos: results['# of Shifts'],
            m26noh: results['# of Hours'],
            m26chg: results['Charge'],
            m26cpt: results['CPT Code'],
            m26np: results['No Pay Ind'],
            m26pl: results['PL'],
            m26pre: results['Pre - Exists']
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
      } else if (header && (i === 2 || i === 5 || i === 6 || i === 8 || i === 9 || i === 10 || i === 11)) {
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
   * Back end calls transTos
   */
  private procClmNursingChrgServiceTransTos(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnursingchrgservice/procclmnursingchrgservice/transtos', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private procClmNursingChrgServiceMainOperation(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnursingchrgservice/procclmnursingchrgservice/mainoperation', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls clearScreen
   */
  private procClmNursingChrgServiceClearScreen(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnursingchrgservice/procclmnursingchrgservice/clearscreen', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenData
   */
  private procClmNursingChrgServiceScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmnursingchrgservice/procclmnursingchrgservice/screendata', JSON.stringify(container), options);
  }
}

interface TableData {
  '#': number;
  Provider: string;
  Type: string;
  'Service Date From': string;
  'Service Date To': string;
  '# of Shifts': string;
  '# of Hours': string;
  'Charge': string;
  'CPT Code': string;
  'No Pay Ind': string;
  'PL': string;
  'Pre - Exists': string;
}

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
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathMedicalVisit,
  claimProcessingRoutePathMedSuppCharge,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
  DateFormatService,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcClmHospChrg,
  ProcClmHospChrgLatestBenLine,
  ProcClmHospChrgMapLines1,
  ProcClmHospChrgMapLines2,
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

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmhospchrg::procclmhospchrg::procclmhospchrg
 */
@Component({
  selector: 'fox-app-procclmhospchrg',
  templateUrl: './process-claim-hospital-charge.component.html',
  styleUrls: ['./process-claim-hospital-charge.component.css']
})
export class ProcessClaimHospitalChargeComponent implements OnInit, AfterViewChecked {
  @ViewChild('providerInputTable') providerInputTable: TableComponent;
  @ViewChild('hospitalInputTable') hospitalInputTable: TableComponent;
  screen = new ProcClmHospChrg();
  common = new Dfhcommarea();
  container = new Container();
  data: ProcClmHospChrgMapLines1;
  providerTableData: ProcClmHospChrgMapLines1[] = [];
  hospitalTableData: ProcClmHospChrgMapLines2[] = [];
  planTableData: ProcClmHospChrgLatestBenLine[] = [];
  nextProgram = '';
  pageTotal = 0;
  pageSizeSelected = 2;
  screenBeanData = new Rpdmb22();
  isHeaderOn = false;
  providerIsModified = false;
  hospitalIsModified = false;
  isPlanTableConstructed = false;
  isHospitalTableConstructed = false;
  isProviderTableConstructed = false;
  buttonStatus: string = 'Submit';
  providerInputColumns: any[] = [
    {
      key: 'prn',
      headerText: 'Provider TIN/NPI ZIP/Name',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'prt',
      headerText: 'Type',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'validateFromDate',
      headerText: 'Service From Date',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'validateToDate',
      headerText: 'Service To Date',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date-mmdd'
    },
    {
      key: 'srd',
      headerText: 'No. Of Days',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'pre',
      headerText: 'Pre Exists',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ifr',
      headerText: 'ICU From Date',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'ito',
      headerText: 'ICU To Date',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date-mmdd'
    }
  ];
  planTableColumns: any[] = [
    {
      key: 'lne1Plan',
      headerText: 'Plan',
      kind: TableColumnKind.Text,
      border: false,
    },
    {
      key: 'lne1From',
      headerText: 'From Date',
      kind: TableColumnKind.Text,
      border: false,
    },
    {
      key: 'lne1To',
      headerText: 'To Date',
      kind: TableColumnKind.Text,
      border: false,
    },
    {
      key: 'lne1HospPos',
      headerText: 'Hospital Days',
      kind: TableColumnKind.Text,
      border: false,
    },
    {
      key: 'lne1SnfPos',
      headerText: 'SNF Days',
      kind: TableColumnKind.Text,
      border: false,
    }
  ];
  columnsHeader = [
    {
      headerText: 'Hospital - Medicare',
      colSpanValue: '5',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '1',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '1',
      border: true
    },
    {
      headerText: 'SNF - Medicare',
      colSpanValue: '3',
      border: true
    },
    {
      headerText: 'Excluded',
      colSpanValue: '2',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '1',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '1',
      border: true
    },
    {
      headerText: '',
      colSpanValue: '1',
      border: true
    }
  ];
  hospitalInputColumns: any[] = [
    {
      key: 'ihd',
      headerText: '1',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ho2',
      headerText: '2-60',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ho6',
      headerText: '61-90',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'hog',
      headerText: '>90',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ltr',
      headerText: 'Ltr',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'chg',
      headerText: 'Eligible Charge',
      isDoubleLine: true,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-currency'
    },
    {
      key: 'opt',
      headerText: 'Letter Opt',
      isDoubleLine: true,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'sn1',
      headerText: '1-20',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'sn2',
      headerText: '21-100',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'sng',
      headerText: '>100',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ex1',
      headerText: 'Plan1',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'ex2',
      headerText: 'Plan2',
      boarder: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'dcb',
      headerText: 'Discharge Recovery',
      border: false,
      isDoubleLine: true,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'noPayInd',
      headerText: 'NoPay Indicator',
      border: false,
      isDoubleLine: true,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'noPayPln',
      headerText: 'NoPay Plan',
      border: false,
      isDoubleLine: true,
      kind: TableColumnKind.Input,
      inputType: 'text'
    }
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
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    if (container && container.screenbean && container.screenbean.mapLines1s) {
      for (const index of Object.keys(container.screenbean.mapLines1s)) {
        if (container.screenbean.mapLines1s[index].validateFromDate !== '') {
          container.screenbean.mapLines1s[index].srf
            = this.requestDate.getValidateDate(container.screenbean.mapLines1s[index].validateFromDate);
        }
        if (container.screenbean.mapLines1s[index].validateToDate !== '') {
          container.screenbean.mapLines1s[index].srt
            = this.requestDate.getValidateDate(container.screenbean.mapLines1s[index].validateToDate);
        }
      }
    }
    container = await this.procClmHospChrgServiceOnloadProcess(this.common).toPromise();
    container.screenbean.isOnload = false;
    data = this.transferSrv.getData();

    if (container && container.screenbean && container.screenbean.mapLines1s) {
      for (const index of Object.keys(container.screenbean.mapLines1s)) {
        if (container.screenbean.mapLines1s[index].srf) {
          container.screenbean.mapLines1s[index].validateFromDate
            = this.requestDate.getCcyyFormatedDate(container.screenbean.mapLines1s[index].srf);
        }
        if (container.screenbean.mapLines1s[index].srt) {
          container.screenbean.mapLines1s[index].validateToDate
            = this.requestDate.getCcyyFormatedDate(container.screenbean.mapLines1s[index].srt);
        }
      }
    }
    this.providerTableData = container.screenbean.mapLines1s;
    this.hospitalTableData = container.screenbean.mapLines2s;
    this.planTableData = container.screenbean.latestBens.latestBenLine;
    this.planTableData = this.planTableData.filter((item) => item.lne1Plan.trim().length > 0);
    this.screen = container.screenbean;
    console.log(this.screen);
    this.common = container.dfhCommonArea;
    this.container = container;
    this.screenBeanData = this.manualCalimService.screenBean;
    if (this.screen.m23err) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m23err);
    }
    if (this.screen.m23err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m23err1);
    }
    if (this.screen.m23err2) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m23err2);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - Hospital Confinement';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: (this.screen) ? this.screen.m23name : 'N/A',
          account: (this.screen) ? this.screen.m23memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subHeaderTitle = document.getElementById('subheadertitle');
      if (subHeaderTitle) {
        this.isHeaderOn = true;
      }
    }
    if (this.providerInputTable && !this.providerIsModified) {
      this.providerIsModified = true;
      this.providerMapData().subscribe(data => {
        this.screen.mapLines1s = data;
      });
    }

    if (this.hospitalInputTable && !this.hospitalIsModified) {
      this.hospitalIsModified = true;
      this.hospitlMapData().subscribe(data => {
        this.screen.mapLines2s = data;
      });
    }
    if (!this.isHospitalTableConstructed) {
      this.tableHospitalColumnWidth();
      const headerParent0 = document.getElementById('headerParent0');
      if (headerParent0) {
        this.isHospitalTableConstructed = true;
      }
    }
    if (!this.isProviderTableConstructed) {
      this.tableProviderColumnWidth();
      const header5 = document.getElementById('header5');
      if (header5) {
        this.isProviderTableConstructed = true;
      }
    }
    if (!this.isPlanTableConstructed) {
      this.tablePlanColumnWidth();
      const parentDOM: any = document.querySelector('.planTable .header0');
      if (parentDOM) {
        this.isPlanTableConstructed = true;
      }
    }
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    let isErrorReported = false;
    container = this.container;
    if (container && container.screenbean && container.screenbean.mapLines1s) {
      for (const index of Object.keys(container.screenbean.mapLines1s)) {
        if (container.screenbean.mapLines1s[index].validateFromDate !== '') {
          container.screenbean.mapLines1s[index].validateFromDate =
            moment(container.screenbean.mapLines1s[index].validateFromDate).format('MM/DD/YYYY');
          container.screenbean.mapLines1s[index].srf =
            this.requestDate.getValidateDate(container.screenbean.mapLines1s[index].validateFromDate);
        }
        if (container.screenbean.mapLines1s[index].validateToDate !== '') {
          container.screenbean.mapLines1s[index].srt =
            container.screenbean.mapLines1s[index].validateToDate + (container.screenbean.mapLines1s[index].srf).slice(4, 6);
        }
      }
    }
    try {
      this.buttonStatus = 'Working...';
      container = await this.procClmHospChrgServiceScreenData(container).toPromise();
      container.screenbean.isOnload = true;
      data = this.transferSrv.getData();
      data['container'] = container;
      if (container && container.screenbean && container.screenbean.mapLines1s) {
        for (const index of Object.keys(container.screenbean.mapLines1s)) {
          if (container.screenbean.mapLines1s[index].srf !== '') {
            container.screenbean.mapLines1s[index].srf
              = this.requestDate.getFormatedDate(container.screenbean.mapLines1s[index].srf);
          }
          if (container.screenbean.mapLines1s[index].srt !== '') {
            container.screenbean.mapLines1s[index].srt
              = this.requestDate.getFormatedDate(container.screenbean.mapLines1s[index].srt);
          }
        }
      }
      this.screen = container.screenbean;
      this.common = container.dfhCommonArea;
      data['common'] = this.common;
      this.container = container;
      if (this.screen.m23err.trim()) {
        if (this.screen.m23err.includes('CAUTION') || this.screen.m23err.includes('WARNING') ||
          this.screen.m23err.includes('BENEFIT CALCULATION') || this.screen.m23err.includes('CAUT-PROVIDER')) {
          this.buttonStatus = 'Failed';
          this.resetState();
          this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m23err);
          isErrorReported = false;
        } else {
          this.buttonStatus = 'Failed';
          this.resetState();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m23err);
          isErrorReported = true;
        }
      }
      if (this.screen.m23err1) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m23err1);
        isErrorReported = true;
      }
      if (this.screen.m23err2) {
        this.buttonStatus = 'Failed';
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m23err2);
        isErrorReported = true;
      }
      if (isErrorReported) {
        this.buttonStatus = 'Failed';
        this.resetState();
        isErrorReported = false;
        window.scrollTo(0, 0);
        return true;
      }
      this.nextProgram = container.dfhCommonArea.nextProgram;
      data['nextProgram'] = this.nextProgram;
      let dupScreenInd = false;
      if (container.dfhCommonArea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.dfhCommonArea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines && incBillLine.potentialDuplicateBillLines.length > 0) {
            dupScreenInd = true;
          }
        }
      }
      if (dupScreenInd) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupClaimCheck]);
      } else {
        if (container.dfhCommonArea.nextProgram === 'RPD06O11') {
          this.buttonStatus = 'Success!';
          this.resetState();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
        } else if (container.dfhCommonArea.nextProgram === 'RPD06O09') {
          this.buttonStatus = 'Success!';
          this.resetState();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppCharge]);
        } else if (container.dfhCommonArea.nextProgram === 'RPD06O05') {
          this.buttonStatus = 'Success!';
          this.resetState();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedicalVisit]);
        }
      }
      this.buttonStatus = 'Success!';
      this.resetState();
      return true;
    } catch {
      this.buttonStatus = 'Failed';
      this.resetState();
      return false;
    }
  }

  resetState(): void {
    setTimeout(() => {
      this.buttonStatus = 'Submit';
    }, 2500);
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    this.screen.icd = '';
    this.screen.icd2 = '';
    this.screen.icd3 = '';
    this.providerInputTable.tableFormGroup.reset();
    this.hospitalInputTable.tableFormGroup.reset();
    return true;
  }

  /**
   * Event action returnEventClick
   */
  async returnEventClick(): Promise<boolean> {
    let container = new Container();
    container = this.container;
    container = await this.procClmHospChrgServiceTransTos_0500(container).toPromise();
    const data = this.transferSrv.getData();
    this.screen = container.screenbean;
    this.common = container.dfhCommonArea;
    data['common'] = this.common;
    this.container = container;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  /**
   * Back end calls onloadProcess
   */
  private procClmHospChrgServiceOnloadProcess(commonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospchrg/procclmhospchrgservice/onloadprocess', JSON.stringify(commonArea), options);
  }

  /**
   * Back end calls screenData
   */
  private procClmHospChrgServiceScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospchrg/procclmhospchrgservice/screendata', JSON.stringify(container), options);
  }

  /**
   * Back end calls transTos_0500
   */
  private procClmHospChrgServiceTransTos_0500(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmhospchrg/procclmhospchrgservice/transtos_0500', JSON.stringify(container), options);
  }

  private providerMapData(): Observable<ProcClmHospChrgMapLines1[]> {
    return this.providerInputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(result => {
          return {
            prn: result['prn'],
            prt: result['prt'],
            validateFromDate: result['validateFromDate'],
            validateToDate: result['validateToDate'],
            srd: result['srd'],
            pre: result['pre'],
            ife: result['ife'],
            ito: result['ito'],
          };
        });
      })
    );
  }

  private hospitlMapData(): Observable<ProcClmHospChrgMapLines2[]> {
    return this.hospitalInputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(result => {
          return {
            ihd: result['ihd'],
            ho2: result['ho2'],
            ho6: result['ho6'],
            hog: result['hog'],
            ltr: result['ltr'],
            chg: result['chg'],
            opt: result['opt'],
            sn1: result['sn1'],
            sn2: result['sn2'],
            sng: result['sng'],
            ex1: result['ex1'],
            ex2: result['ex2'],
            dcb: result['dcb'],
            noPayInd: result['noPayInd'],
            noPayPln: result['noPayPln'],
          };
        });
      })
    );
  }

  private tablePlanColumnWidth(): void {
    const header0: any = document.querySelector('.planTable #header0');
    if (header0) {
      header0.style.minWidth = '112px';
    }
    const header1: any = document.querySelector('.planTable #header1');
    if (header1) {
      header1.style.minWidth = '132px';
    }
    const header2: any = document.querySelector('.planTable #header2');
    if (header2) {
      header2.style.minWidth = '132px';
    }
    const header3: any = document.querySelector('.planTable #header3');
    if (header3) {
      header3.style.minWidth = '135px';
    }
    const header4: any = document.querySelector('.planTable #header4');
    if (header4) {
      header4.style.minWidth = '675px';
    }
  }

  private tableHospitalColumnWidth(): void {
    const headerParent0 = document.getElementById('headerParent0');
    if (headerParent0) {
      headerParent0.style.minWidth = '600px';
    }
    const headerParent1 = document.getElementById('headerParent1');
    if (headerParent1) {
      headerParent1.style.minWidth = '150px';
    }
    const headerParent2 = document.getElementById(
      'headerParent2');
    if (headerParent2) {
      headerParent2.style.minWidth = '120px';
    }
    const headerParent3 = document.getElementById('headerParent3');
    if (headerParent3) {
      headerParent3.style.minWidth = '400px';
    }
    const headerParent4 = document.getElementById('headerParent4');
    if (headerParent4) {
      headerParent4.style.minWidth = '300px';
    }
    const headerParent5 = document.getElementById('headerParent5');
    if (headerParent5) {
      headerParent5.style.minWidth = '150px';
    }
    const headerParent6 = document.getElementById('headerParent6');
    if (headerParent6) {
      headerParent6.style.minWidth = '150px';
    }
    const headerParent7 = document.getElementById('headerParent7');
    if (headerParent7) {
      headerParent7.style.minWidth = '150px';
    }
  }

  private tableProviderColumnWidth(): void {
    const header0 = document.getElementById('header0');
    if (header0) {
      header0.style.minWidth = '239px';
    }
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '120px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '190px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '160px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '108px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '108px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '190px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '160px';
    }
  }
}

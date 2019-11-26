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
  claimProcessingRoutePathClaimDrugEob,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathDupClaimCheck,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessClaimExceptionB,
  claimProcessingRoutePathProcessClaimNopay,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
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
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {ProcClmXcptScrnDtl} from './model/proc-clm-xcpt-scrn-dtl.model';
import {ProcClmXcpt} from './model/proc-clm-xcpt.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmxcptchrg::procclmxcptchrg::procclmxcptchrg
 */
@Component({
  selector: 'fox-app-procclmxcptchrg',
  templateUrl: './process-claim-exception.component.html',
  styleUrls: ['./process-claim-exception.component.css']
})
export class ProcessClaimExceptionComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('inputTable') inputTable: TableComponent;
  screen = new ProcClmXcpt();
  common = new Dfhcommarea();
  screenBeanData = new Rpdmb22();
  isHeaderOn = false;
  columns?: Object;
  continueStatus = ButtonStatus.SUBMIT;
  btnStatus = ButtonStatus.SUBMIT;
  isWorking = false;
  isTableConstructed: boolean = false;
  isModified = false;
  tableData: TableData[] = [];
  result?: TableData[];
  subscription: Subscription = Subscription.EMPTY;
  btnAction: string;
  data: ProcClmXcptScrnDtl;
  container = new Container();
  nextProgram = '';

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
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction === 'm') {
        this.eventBenifitLookupClick();
      }
    });
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].validateFromDate) {
          container.screenBean.scrnDtls[index].scrnSerFrom = this.requestDate.getValidateDate(container.screenBean.scrnDtls[index].validateFromDate);
        }
        if (container.screenBean.scrnDtls[index].validateToDate) {
          container.screenBean.scrnDtls[index].scrnSerTo = this.requestDate.getValidateDate(container.screenBean.scrnDtls[index].validateToDate);
        }
      }
    }
    container = await this.procClmXcptChrgServiceMainProcess(this.common).toPromise();
    data = this.transferSrv.getData();
    data['container'] = container;
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].scrnSerFrom) {
          container.screenBean.scrnDtls[index].validateFromDate
            = this.requestDate.getCcyyFormatedDate(container.screenBean.scrnDtls[index].scrnSerFrom);
        }
        if (container.screenBean.scrnDtls[index].scrnSerTo) {
          container.screenBean.scrnDtls[index].validateToDate
            = this.requestDate.getCcyyFormatedDate(container.screenBean.scrnDtls[index].scrnSerTo);
        }
      }
    }
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.screenBeanData = this.manualClaimService.screenBean;
    this.container = container;
    this.tableData = container.screenBean.scrnDtls.map((result, index) => {
      return {
        'Plan': result['scrnPlan'],
        'Provider': result['scrnProv'],
        'Type': result['scrnTosCode'],
        'Service Date From': result['validateFromDate'],
        'Service Date To': result['validateToDate'],
        'Service Visits #': result['scrnNo'],
        'Charge': result['scrnSubmit'],
        'Percent': result['scrnPer'],
        'CPT Code': result['scrnCpt'],
        'Eligible Charge': result['scrnEligChrg'],
        'Benifit Amt.': result['scrnBen'],
      };
    });
    this.columns = Object.keys(this.tableData[0]).map((key, index) => {
      return {
        key: key,
        header: key,
        boarder: false,
        kind: TableColumnKind.Input,
        inputType: (index === 0 || index === 1 || index === 2 || index === 5 || index === 7 || index === 8) ? 'text' : (index === 3) ? 'fox-date' : (index === 4) ? 'fox-date-mmdd' : 'fox-currency'
      };
    });
    this.screenEnable(this.tableData);
    this.result = this.tableData;
    if (this.screen.screenErr1.includes('VERIFY') || this.screen.screenErr1.includes('WARNING')
      || this.screen.screenErr1.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
    }
    if (this.screen.screenErr2.includes('VERIFY') || this.screen.screenErr2.includes('WARNING')
      || this.screen.screenErr2.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr2);
    }
    if (this.screen.screenErr3.includes('VERIFY') || this.screen.screenErr3.includes('WARNING')
      || this.screen.screenErr3.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr3);
    }
    if (this.screen.screenErr4.includes('VERIFY') || this.screen.screenErr4.includes('WARNING')
      || this.screen.screenErr4.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr4);
    }
    window.scrollTo(0, 0);
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapBackTheData().subscribe(data => {
        this.screen.scrnDtls = data;
      });
    }
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Process Claim - Exceptions A';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screenBeanData) ? this.screenBeanData.m22nam : 'N/A',
          account: (this.screenBeanData) ? this.screenBeanData.m22memn : 'N/A',
          claim: this.manualClaimService.data ? this.manualClaimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(ProcessClaimHeaderRightComponent,
        {
          buttonTitle: 'Benefit Lookup',
          suspendBtn: {
            display: 'Benefit Lookup', identifier: 'm', tab: 'alt+k'
          }
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
      const header1 = document.getElementById('header1');
      if (header1) {
        this.isTableConstructed = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Event action EventbenifitLookupClick
   */
  async eventBenifitLookupClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container = this.container;
    container = await this.procClmXcptChrgServiceBenefitLookUp(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.container = container;
    if (this.screen.screenErr1.includes('VERIFY') || this.screen.screenErr1.includes('WARNING')
      || this.screen.screenErr1.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
    } else if (this.screen.screenErr1.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr1);
    }
    if (this.screen.screenErr2.includes('VERIFY') || this.screen.screenErr2.includes('WARNING')
      || this.screen.screenErr2.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr2);
    } else if (this.screen.screenErr2.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr2);
    }
    if (this.screen.screenErr3.includes('VERIFY') || this.screen.screenErr3.includes('WARNING')
      || this.screen.screenErr3.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr3);
    } else if (this.screen.screenErr3.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr3);
    }
    if (this.screen.screenErr4.includes('VERIFY') || this.screen.screenErr4.includes('WARNING')
      || this.screen.screenErr4.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr4);
    } else if (this.screen.screenErr4.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr4);
    }
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action cancelEventClick
   */
  async cancelEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container = this.container;
    container.screenBean = this.screen;
    container.dfhCommArea = this.common;
    container = await this.procClmXcptChrgServiceProcessCancel(container).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.container = container;
    data['common'] = this.common;
    if (container.dfhCommArea.nextProgram === 'RPD06O02') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    }
    return true;
  }

  /**
   * Event action clearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container.dfhCommArea = this.common;
    container = this.container;
    container = await this.procClmXcptChrgServiceProcessClear(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.container = container;
    this.screen.scrnIcdCode = '';
    this.screen.scrnIcdCode2 = '';
    this.screen.scrnIcdCode3 = '';
    this.inputTable.tableFormGroup.reset();
    this.messageBoxService.reset();
    window.scrollTo(0, 0);
    return true;
  }

  async enterEventClick(): Promise<boolean> {
    this.screen.scrnDtls.forEach(res => {
      res.scrnPlan = res.scrnPlan === null ? '' : res.scrnPlan;
      res.scrnProv = res.scrnProv === null ? '' : res.scrnProv;
      res.scrnTosCode = res.scrnTosCode === null ? '' : res.scrnTosCode;
      res.validateFromDate = res.validateFromDate === null ? '' : res.validateFromDate;
      res.validateToDate = res.validateToDate === null ? '' : res.validateToDate;
      res.scrnNo = res.scrnNo === null ? '' : res.scrnNo;
      res.scrnSubmit = res.scrnSubmit === null ? '' : res.scrnSubmit;
      res.scrnPer = res.scrnPer === null ? '' : res.scrnPer;
      res.scrnCpt = res.scrnCpt === null ? '' : res.scrnCpt;
      res.scrnEligChrg = res.scrnEligChrg === null ? '' : res.scrnEligChrg;
      res.scrnBen = res.scrnBen === null ? '' : res.scrnBen;
    });
    let container = new Container();
    let data: any = undefined;
    container.screenBean = this.screen;
    container.dfhCommArea = this.common;
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].validateFromDate !== '') {
          container.screenBean.scrnDtls[index].validateFromDate = moment(container.screenBean.scrnDtls[index].validateFromDate).format('MM/DD/YYYY');
          container.screenBean.scrnDtls[index].scrnSerFrom = this.requestDate.getValidateDate(container.screenBean.scrnDtls[index].validateFromDate);
        }
        if (container.screenBean.scrnDtls[index].validateToDate !== '') {
          container.screenBean.scrnDtls[index].scrnSerTo = container.screenBean.scrnDtls[index].validateToDate + (container.screenBean.scrnDtls[index].scrnSerFrom).slice(4, 6);
        }
      }
    }
    try {
      this.continueStatus = ButtonStatus.WORKING;
      this.isWorking = true;
      container = await this.procClmXcptChrgServiceDfhEnter(container).toPromise();
      data = this.transferSrv.getData();
      this.screen = container.screenBean;
      this.common = container.dfhCommArea;
      this.container = container;
      data['common'] = this.common;
      if (this.screen.screenErr1.includes('VERIFY') || this.screen.screenErr1.includes('WARNING')
        || this.screen.screenErr1.includes('CAUTION')) {
        this.resetState();
        this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
      } else if (this.screen.screenErr1.trim().length > 0) {
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr1);
      }
      if (this.screen.screenErr2.includes('VERIFY') || this.screen.screenErr2.includes('WARNING')
        || this.screen.screenErr2.includes('CAUTION')) {
        this.resetState();
        this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr2);
      } else if (this.screen.screenErr2.trim().length > 0) {
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr2);
      }
      if (this.screen.screenErr3.includes('VERIFY') || this.screen.screenErr3.includes('WARNING')
        || this.screen.screenErr3.includes('CAUTION')) {
        this.resetState();
        this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr3);
      } else if (this.screen.screenErr3.trim().length > 0) {
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr3);
      }
      if (this.screen.screenErr4.includes('VERIFY') || this.screen.screenErr4.includes('WARNING')
        || this.screen.screenErr4.includes('CAUTION')) {
        this.resetState();
        this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr4);
      } else if (this.screen.screenErr4.trim().length > 0) {
        this.continueStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr4);
      }
      this.nextProgram = container.dfhCommArea.nextProgram;
      data['nextProgram'] = this.nextProgram;
      let dupScreenInd = false;
      if (container.dfhCommArea.dupCheckBillLineResponseVO) {
        for (const incBillLine of container.dfhCommArea.dupCheckBillLineResponseVO.chargeLines) {
          if (incBillLine.potentialDuplicateBillLines.length > 0) {
            dupScreenInd = true;
          }
        }
      }
      if (dupScreenInd === true) {
        this.setSuccess();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupClaimCheck]);
      } else {
        if (container.dfhCommArea.nextProgram === 'RPD06O13') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
        } else if (container.dfhCommArea.nextProgram === 'RPD06O04') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopay]);
        } else if (container.dfhCommArea.nextProgram === 'RPD06O11') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
        } else if (container.dfhCommArea.nextProgram === 'RPD06O12') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
        } else if (container.dfhCommArea.nextProgram === 'RPD06O22') {
          this.setSuccess();
          this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimDrugEob]);
        } else {
          if (container && container.screenBean && container.screenBean.scrnDtls) {
            for (const index of Object.keys(container.screenBean.scrnDtls)) {
              if (container.screenBean.scrnDtls[index].scrnSerFrom !== '') {
                const serviceFromDate = container.screenBean.scrnDtls[index].scrnSerFrom;
                const dateOfServiceFromFormat = serviceFromDate.slice(0, 2) + '/' + serviceFromDate.slice(2, 4) + '/' + serviceFromDate.slice(4, 6);
                container.screenBean.scrnDtls[index].scrnSerFrom
                  = moment(dateOfServiceFromFormat).format('MM/DD/YY');
              }
              if (container.screenBean.scrnDtls[index].scrnSerTo !== '') {
                const serviceToDate = container.screenBean.scrnDtls[index].scrnSerTo;
                const dateOfServiceToFormat = serviceToDate.slice(0, 2) + '/' + serviceToDate.slice(2, 4) + '/' + serviceToDate.slice(4, 6);
                container.screenBean.scrnDtls[index].scrnSerTo
                  = moment(dateOfServiceToFormat).format('MM/DD/YY');
              }
            }
          }
          this.screen = container.screenBean;
        }
      }
      window.scrollTo(0, 0);
      this.continueStatus = ButtonStatus.SUBMIT;
      return true;
    } catch {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }
  }

  /**
   * Event action SCREEN_BEventClick
   */
  screenBeventClick(): void {
    this.btnStatus = ButtonStatus.WORKING;
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimExceptionB]);
    window.scrollTo(0, 0);
  }

  /**
   * Event action SCREEN_AEventClick
   */
  async screenAeventClick(): Promise<boolean> {
    let container = new Container();
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    container = this.container;
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].validateFromDate) {
          container.screenBean.scrnDtls[index].scrnSerFrom =
            this.requestDate.getValidateDate(container.screenBean.scrnDtls[index].validateFromDate);
        }
        if (container.screenBean.scrnDtls[index].validateToDate) {
          container.screenBean.scrnDtls[index].scrnSerTo =
            this.requestDate.getValidateDate(container.screenBean.scrnDtls[index].validateToDate);
        }
      }
    }
    container = await this.procClmXcptChrgServiceScreenA(this.container).toPromise();
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].scrnSerFrom) {
          container.screenBean.scrnDtls[index].validateFromDate =
            this.requestDate.getCcyyFormatedDate(container.screenBean.scrnDtls[index].scrnSerFrom);
        }
        if (container.screenBean.scrnDtls[index].scrnSerTo) {
          container.screenBean.scrnDtls[index].validateToDate =
            this.requestDate.getCcyyFormatedDate(container.screenBean.scrnDtls[index].scrnSerTo);
        }
      }
    }
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.container = container;
    if (this.screen.screenErr1.includes('VERIFY') || this.screen.screenErr1.includes('WARNING')
      || this.screen.screenErr1.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr1);
    } else if (this.screen.screenErr1.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr1);
    }
    if (this.screen.screenErr2.includes('VERIFY') || this.screen.screenErr2.includes('WARNING')
      || this.screen.screenErr2.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr2);
    } else if (this.screen.screenErr2.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr2);
    }
    if (this.screen.screenErr3.includes('VERIFY') || this.screen.screenErr3.includes('WARNING')
      || this.screen.screenErr3.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr3);
    } else if (this.screen.screenErr3.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr3);
    }
    if (this.screen.screenErr4.includes('VERIFY') || this.screen.screenErr4.includes('WARNING')
      || this.screen.screenErr4.includes('CAUTION')) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.screenErr4);
    } else if (this.screen.screenErr4.trim().length > 0) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.screenErr4);
    }
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action pf6EventClick
   */
  async pf6EventClick(): Promise<boolean> {
    let container = new Container();
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    if (container && container.screenBean && container.screenBean.scrnDtls) {
      for (const index of Object.keys(container.screenBean.scrnDtls)) {
        if (container.screenBean.scrnDtls[index].scrnSerFrom !== '') {
          container.screenBean.scrnDtls[index].scrnSerFrom =
            container.screenBean.scrnDtls[index].scrnSerFrom.split('/').join('');
        }
        if (container.screenBean.scrnDtls[index].scrnSerTo !== '') {
          container.screenBean.scrnDtls[index].scrnSerTo =
            container.screenBean.scrnDtls[index].scrnSerTo.split('/').join('');
        }
      }
    }
    container = await this.procClmXcptChrgServicePF6(this.container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhCommArea;
    this.container = container;
    return true;
  }

  @HostListener('document:keypress', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter' && !this.isWorking) {
      this.enterEventClick();
    }
  }

  private mapBackTheData(): Observable<ProcClmXcptScrnDtl[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            scrnPlan: results['Plan'],
            scrnProv: results['Provider'],
            scrnTosCode: results['Type'],
            validateFromDate: results['Service Date From'],
            validateToDate: results['Service Date To'],
            scrnNo: results['Service Visits #'],
            scrnSubmit: results['Charge'],
            scrnPer: results['Percent'],
            scrnCpt: results['CPT Code'],
            scrnEligChrg: results['Eligible Charge'],
            scrnBen: results['Benefit Amt.'],
          };
        });
      })
    );
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
      this.isWorking = false;
    }, 2500);
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private tableColumnWidth(): void {
    const header0 = document.getElementById('header0');
    if (header0) {
      header0.style.minWidth = '113px';
    }
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '240px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '113px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '180px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '180px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '140';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '171px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '113px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '171px';
    }
    const header9 = document.getElementById('header9');
    if (header9) {
      header9.style.minWidth = '171px';
    }
    const header10 = document.getElementById('header10');
    if (header10) {
      header10.style.minWidth = '171px';
    }
  }

  private screenEnable(plansList: TableData[]): void {
    if (plansList.length > 4) {
      this.btnStatus = ButtonStatus.SUBMIT;
    } else {
      plansList.forEach(planObj => {
        if (!planObj.Plan) {
          this.btnStatus = ButtonStatus.DISABLED;
        }
      });
    }
  }
  /**
   * Back end calls processCancel
   */
  private procClmXcptChrgServiceProcessCancel(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/processcancel', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenB
   */
  private procClmXcptChrgServiceScreenB(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/screenb', JSON.stringify(container), options);
  }

  /**
   * Back end calls screenA
   */
  private procClmXcptChrgServiceScreenA(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/screena', JSON.stringify(container), options);
  }

  /**
   * Back end calls dfhEnter
   */
  private procClmXcptChrgServiceDfhEnter(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/dfhenter', JSON.stringify(container), options);
  }

  /**
   * Back end calls processClear
   */
  private procClmXcptChrgServiceProcessClear(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/processclear', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainProcess
   */
  private procClmXcptChrgServiceMainProcess(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/mainprocess', JSON.stringify(common), options);
  }

  /**
   * Back end calls benefitLookUp
   */
  private procClmXcptChrgServiceBenefitLookUp(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/benefitlookup', JSON.stringify(container), options);
  }

  /**
   * Back end calls PF6
   */
  private procClmXcptChrgServicePF6(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmxcptchrg/procclmxcptchrgservice/pf6', JSON.stringify(container), options);
  }
}

interface TableData {
  'Plan': string;
  'Provider': string;
  'Type': string;
  'Service Date From': string;
  'Service Date To': string;
  'Service Visits #': string;
  'Charge': string;
  'Percent': string;
  'CPT Code': string;
  'Eligible Charge': string;
  'Benifit Amt.': string;
}

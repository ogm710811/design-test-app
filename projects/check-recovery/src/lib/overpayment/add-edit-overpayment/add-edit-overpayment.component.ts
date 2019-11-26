import {Location} from '@angular/common';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  Claimprocsysmenu,
  HeaderRightItem,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  PageHeaderService,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/operator/catch';
import {Container} from '../model/container.model';
import {OverpaymentAmountsTable} from '../model/op-amounts-table.model';
import {OvpaymentCommonArea} from '../model/ovpayment-common-area.model';
import {Ovpayment} from '../model/ovpayment.model';
import {overpaymentErrors} from './overpayment-error.constants';
import {OverpaymentHeaderRightComponent} from './overpayment-right-header.component';
import {OverpaymentSubHeaderComponent} from './overpayment-sub-header.component';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ovpaymnt::OvpayMnt::OvpayMnt.
 */
@Component({
  selector: 'fox-add-edit-overpayment',
  templateUrl: './add-edit-overpayment.component.html',
  styleUrls: ['./add-edit-overpayment.component.css'],
  entryComponents: [OverpaymentHeaderRightComponent, OverpaymentSubHeaderComponent]
})
export class AddOrEditOverPaymentComponent implements OnInit, OnDestroy {
  screen = new Ovpayment();
  common = new OvpaymentCommonArea();
  claimprocsysmenu = new Claimprocsysmenu();
  title = 'Overpayment';
  mippa = [
    {id: 1, label: 'Yes'}, {id: 2, label: ''}
  ];
  overpaymentErrors = overpaymentErrors;
  tableHeaders: string[] = [];
  tableColumns: any = {};
  tableData: OverpaymentAmountsTable[] = [];
  pageHeaderAlertSub: Subscription = new Subscription();
  loadingStatus: ButtonStatus = ButtonStatus.SUBMIT;
  cleanContainer: Container = new Container();

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private location: Location,
    private modalService: ModalService
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['command']) {
        this.modalService.routeValidationModalVisible = false;
      }

      if (params['claimNumid'] || params['memberid']) {
        this.claimprocsysmenu.claimNo = params['claimNumid'];
        this.claimprocsysmenu.membershipId = params['memberid'];
      }
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        OverpaymentSubHeaderComponent,
        {memberNumber: this.common.commComm.membershipId, name: ``},
        this.componentFactoryResolver,
        this.injector);

      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        OverpaymentHeaderRightComponent,
        {},
        this.componentFactoryResolver,
        this.injector);

      let container = new Container();
      let data: any = undefined;

      data = this.transferSrv.getData();
      this.common = data['common'];
      const isCommonData = this.common ? true : false;
      this.common = this.common === undefined ? new OvpaymentCommonArea() : this.common;

      if (!this.claimprocsysmenu.claimNo) {
        this.claimprocsysmenu.claimNo = this.common.commComm.claimNumber.toString();
      }

      if (!this.claimprocsysmenu.membershipId) {
        this.claimprocsysmenu.membershipId = this.common.commComm.membershipId.toString();
      }

      if (isCommonData) {
        this.ovpaymntServiceInitilization(this.common).subscribe(resp => {
          container = resp;
          this.cleanContainer = resp;
          this.screen = container.screen;
          this.common = container.commonArea;
          this.cleanupDates();
          this.buildTableData(this.screen);
          if (data['common'] !== undefined && data['common'].errorCodeSel !== null) {
            this.screen.m15erco = data['common'].errorCodeSel;
          }
          this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
            OverpaymentSubHeaderComponent,
            {memberNumber: this.screen.m15mbr1, name: ``},
            this.componentFactoryResolver,
            this.injector);

          this.pageHeaderService.headerRightItem = new HeaderRightItem(
            OverpaymentHeaderRightComponent,
            {memberNumber: this.screen.m15mbr1},
            this.componentFactoryResolver,
            this.injector);
        });
      } else {
        this.claimProcSysMenuServiceLoadOverpayCommonArea(this.claimprocsysmenu).subscribe(res => {
          this.common = res;
          this.ovpaymntServiceInitilization(this.common).subscribe(resp => {
            this.cleanContainer = resp;
            container = resp;
            this.screen = container.screen;
            this.common = container.commonArea;
            this.cleanupDates();
            this.buildTableData(this.screen);
            if (data['common'] !== undefined && data['common'].errorCodeSel !== null) {
              this.screen.m15erco = data['common'].errorCodeSel;
            }
            this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
              OverpaymentSubHeaderComponent,
              {memberNumber: this.screen.m15mbr1, name: ``},
              this.componentFactoryResolver,
              this.injector);

              this.pageHeaderService.headerRightItem = new HeaderRightItem(
                OverpaymentHeaderRightComponent,
                {memberNumber: this.screen.m15mbr1},
                this.componentFactoryResolver,
                this.injector);
          });
        });
      }
    });

    this.pageHeaderAlertSub = this.pageHeaderService.pageHeaderAlert.subscribe( (ev: string) => {
      if (ev === 'delete') {
        this.DeleteOPEventClick();
      } else if (ev === 'refund') {
        this.OverpaymentHistEventClick();
      }
    });
  }

  cleanupDates(): void {
    this.screen.m15resd = this.formatDateToCST(this.screen.m15resd);
    this.screen.m15frmd = this.formatDateToCST(this.screen.m15frmd);
    this.screen.m15tod = this.formatDateToCST(this.screen.m15tod);
    this.screen.m15disc = this.formatDateToCST(this.screen.m15disc);
  }

  reformatDates(): void {
    this.screen.m15resd = this.formatDateToScreenBean(this.screen.m15resd);
    this.screen.m15frmd = this.formatDateToScreenBean(this.screen.m15frmd);
    this.screen.m15tod = this.formatDateToScreenBean(this.screen.m15tod);
    this.screen.m15disc = this.formatDateToScreenBean(this.screen.m15disc);
  }

  ngOnDestroy(): void {
    if (this.pageHeaderAlertSub) {
      this.pageHeaderAlertSub.unsubscribe();
    }
  }

  cancelLinkClicked(): void {
    this.location.back();
  }

  buildTableData(screen: Ovpayment): void {
    const data = [{
      'fixedColumnNames': 'Repaid',
      'provider': +screen.m15repp,
      'insured': +screen.m15repi
    }, {
      'fixedColumnNames': 'Unresolved',
      'provider': +screen.m15unrp ? +screen.m15unrp : 0,
      'insured': +screen.m15unri ? +screen.m15unri : 0
    }, {
      'fixedColumnNames': 'Waived',
      'provider': +screen.m15waip ? +screen.m15waip : 0,
      'insured': +screen.m15waii ? +screen.m15waii : 0
    }];
    this.tableHeaders = Object.keys(data[0]);
    this.tableColumns = this.tableHeaders.map((key, idx) => {
      return {
        key: key,
        header: key,
        headerText: idx === 0 ? ' ' : idx === 1 ? 'Provider' : 'Insured',
        border: idx === 0,
        kind: idx === 0 ? TableColumnKind.Text : TableColumnKind.Input,
        inputType: 'fox-currency',
        hideHeaderColumnBorder: true,
        readOnlyRows: [{
          rowId: '0',
          rowType: TableColumnKind.CurrencyText,
          columnException: '0'
        }]
      };
    });
    this.tableData = data;
  }

  /**
   * Event action CancelEventClick
   */
  CancelEventClick(): void {
    this.updateUserAboutTransaction(MessageBoxType.ERROR, 'Transaction was cancelled');
  }

  /**
   * Event action DeleteOPEventClick
   */
  DeleteOPEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.screen = this.screen;
    if ('PRESS DELETE OP TO CONFIRM DELETE' === this.screen.m15err) {
      container.isWrite = true;
    }
    container.commonArea = <OvpaymentCommonArea>this.common;
    this.ovpaymntServiceDeleteRec(container).subscribe(resp => {
      container = resp;
      if (container.screen.m15err === 'OVERPAYMENT DATA DELETED') {
        data = this.transferSrv.getData();
        data['errMsg'] = container.screen.m15err;
        this.updateUserAboutTransaction(MessageBoxType.SUCCESS, 'The overpayment was deleted.');
      }
      this.screen = container.screen;
      this.common = container.commonArea;
      if (container.screen.m15err !== 'OVERPAYMENT DATA DELETED') {
        this.updateUserAboutTransaction(MessageBoxType.ACTIVE, 'The overpayment will be deleted. Press Delete again.');
      }
    });
  }

  formatDateToCST(originalFormat: string, standardDate?: boolean): string {
    if (!originalFormat) {
      return '';
    }
    let formattedString = originalFormat;
    if (!standardDate) {
      formattedString = originalFormat.substring(0, 2) + '/' + originalFormat.substring(2, 4) + '/' + originalFormat.substr(4);
    }
    return moment(formattedString).format('MM/DD/YYYY');
  }

  formatDateToScreenBean(dateToFormat: string): string {
    if (!dateToFormat) {
      return '';
    }
    let returnDate: string = '';
    returnDate = dateToFormat.substring(0, 2) + dateToFormat.substring(3, 5) + dateToFormat.substring(8);
    return returnDate;
  }

  OverpaymentHistEventClick(): void {
    let data: any = undefined;
    let container = new Container();
    this.reformatDates();
    container.screen = this.screen;
    container.commonArea = this.common;
    if (this.screen.m15oion === '' && this.common.ovPayCmnArea.comOpMisc.comOpUpdateType === 'U') {
      this.screen.m15err = 'OWNER IONS MUST BE ENTERED';
      this.updateUserAboutTransaction(MessageBoxType.ERROR, 'The owner ions must be entered.');
      this.cleanupDates();
    } else {
      this.ovpaymntServiceScreenToCommon(container).subscribe(resp => {
        container = resp;
        this.common = container.commonArea;
        data = this.transferSrv.getData();
        this.transferSrv.set('common', this.common);
        this.router.navigate(['/check-recovery/overpayment-refund-hist']);
      });
    }
  }

  RvwErrorCodeEventClick(): void {
    let data: any = undefined;
    let container = new Container();
    container.screen = this.screen;
    container.commonArea = this.common;
    this.ovpaymntServiceScreenToCommon(container).subscribe(resp => {
      container = resp;
      this.common = container.commonArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/check-recovery/overpayment-error']);
    });

  }

  calculateOverpaymentData(): void {
    this.screen.m15unrp = this.tableData[1].provider.toString();
    this.screen.m15unri = this.tableData[1].insured.toString();
    this.screen.m15waip = this.tableData[2].provider.toString();
    this.screen.m15waii = this.tableData[2].insured.toString();
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.calculateOverpaymentData();
    this.reformatDates();
    container.screen = this.screen;
    container.commonArea = this.common;
    this.loadingStatus = ButtonStatus.WORKING;
    if ('PRESS ENTER TO CONFIRM CHANGES' === this.screen.m15err) {
      container.isWrite = true;
    }
    try {
      this.ovpaymntServiceProcessTrans(container).subscribe(resp => {
        container = resp;
        if (container.screen.m15err === 'OVERPAYMENT DATA ADDED' || container.screen.m15err === 'OVERPAYMENT DATA UPDATED') {
          const msg = container.screen.m15err === 'OVERPAYMENT DATA ADDED' ? 'The overpayment was added.' : 'The overpayment was updated.';
          data = this.transferSrv.getData();
          data['errMsg'] = container.screen.m15err;
          this.screen = container.screen;
          this.updateUserAboutTransaction(MessageBoxType.SUCCESS, msg);
          this.loadingStatus = ButtonStatus.SUCCESS;
        } else if (container.screen.m15err !== 'OVERPAYMENT DATA ADDED' && container.screen.m15err !== 'OVERPAYMENT DATA UPDATED') {
          this.updateUserAboutTransaction(MessageBoxType.ACTIVE, (container.screen.m15err.charAt(0).toUpperCase() + container.screen.m15err.slice(1).toLocaleLowerCase()));
          this.loadingStatus = ButtonStatus.FAILED;
        } else {
          this.updateUserAboutTransaction(MessageBoxType.ERROR, container.screen.m15err ? container.screen.m15err : 'Submit failed');
          this.loadingStatus = ButtonStatus.FAILED;
        }
        this.screen = container.screen;
        this.common = container.commonArea;
        this.cleanupDates();
      }, (err: HttpErrorResponse) => {
        this.cleanupDates();
        this.updateUserAboutTransaction(MessageBoxType.ERROR, err ? `${err.status}: ${err.error.error}` : 'Submit failed');
        this.loadingStatus = ButtonStatus.FAILED;
      });
    } catch (error) {
      this.cleanupDates();
      this.updateUserAboutTransaction(MessageBoxType.ERROR, error ? error : 'Submit failed');
      this.loadingStatus = ButtonStatus.FAILED;
    }
  }

  clearEventClick(): void {
    this.screen.m15pcde = '';
    this.screen.m15mipa = '';
    this.screen.m15tos = '';
    this.screen.m15errt = '';
    this.screen.m15erco = '';
    this.screen.m15oion = '';
    this.screen.m15not1 = '';
    this.screen.m15frmd = '';
    this.screen.m15tod = '';
    this.screen.m15disc = '';
    this.screen.m15amt = '';
    this.screen.m15unri = '';
    this.screen.m15unrp = '';
    this.screen.m15waii = '';
    this.screen.m15waip = '';
    this.buildTableData(this.screen);
    this.loadingStatus = ButtonStatus.SUBMIT;
  }

  /**
   * Back end calls processTrans
   */
  private ovpaymntServiceProcessTrans(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/ovpaymnt/ovpaymntservice/processtrans', JSON.stringify(container), options);
  }

  /**
   * Back end calls initilization
   */

  private ovpaymntServiceInitilization(commonArea: OvpaymentCommonArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/ovpaymnt/ovpaymntservice/initilization', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls deleteRec
   */
  private ovpaymntServiceDeleteRec(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/ovpaymnt/ovpaymntservice/deleterec', JSON.stringify(container), options);

  }

  private ovpaymntServiceScreenToCommon(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/ovpaymnt/ovpaymntservice/screentocommon', JSON.stringify(container), options);

  }

  /**
   * Back end calls loadOverpayCommonArea
   */
  private claimProcSysMenuServiceLoadOverpayCommonArea(screen: Claimprocsysmenu): Observable<OvpaymentCommonArea> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<OvpaymentCommonArea>('/api/overpayment/services/claimprocsysmenu/claimprocsysmenuservice/loadoverpaycommonarea', JSON.stringify(screen), options);

  }

  private updateUserAboutTransaction(type: MessageBoxType, message: string): void {
    this.messageBoxService.empty();
    this.messageBoxService.addMessageBox(this.title, type, message);
    window.scrollTo(0, 0);
  }

}

import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import {OvpaymentCommonArea} from '../model/ovpayment-common-area.model';
import {Container} from './model/container.model';
import {Ovpayrefundhist} from './model/ovpayrefundhist.model';
import {Rpdma1bMapLine} from './model/rpdma1b-map-line.model';
import {OverpaymentRefundHistSubtitleComponent} from './overpayment-refund-hist-subtitle/overpayment-refund-hist-subtitle.component';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ovpayrefundhist::ovpayrefundhist::ovpayrefundhist
 */
@Component({
  selector: 'fox-overpayment-refund-hist',
  templateUrl: './overpayment-refund-hist.component.html',
  styleUrls: ['./overpayment-refund-hist.component.css']
})
export class OverpaymentRefundHistComponent implements OnInit, AfterViewChecked {
  screenBean = new Ovpayrefundhist();
  common = new OvpaymentCommonArea();

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  viewData: Rpdma1bMapLine[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  dataLengthInput = 0;
  currentPage = 0;
  isTableConstructed = false;
  mapLines: Rpdma1bMapLine[] = [];
  updatedMaplines: Rpdma1bMapLine[] = [];
  isWorking = false;
  typeDropdownOptions = [
    {
      label: '',
      value: ''
    },
    {
      label: 'Provider',
      value: 'P'
    },
    {
      label: 'Insured',
      value: 'I'
    }
  ];
  refundColumns =
    [
      {
        key: 'ma1bType',
        headerText: 'Type',
        kind: TableColumnKind.Input,
        border: false,
        inputType: 'fox-dropdown',
        dropDownOptions: this.typeDropdownOptions,
        dropDownLabel: 'label',
        dropDownBindValue: 'value'
      },
      {
        key: 'ma1bRfam',
        headerText: 'Refund Amount',
        kind: TableColumnKind.Input,
        border: false,
        inputType: 'fox-currency'
      },
      {
        key: 'ma1bRfdt',
        headerText: 'Refund Date',
        kind: TableColumnKind.Input,
        border: false,
        inputType: 'fox-date'
      },
      {
        key: 'ma1bChek',
        headerText: 'Refund Claim',
        kind: TableColumnKind.Input,
        border: false,
        inputType: 'fox-claim'
      },
      {
        key: 'ma1b',
        headerText: 'Follow Up Completed',
        kind: TableColumnKind.Input,
        border: false,
      },
      {
        key: 'ma1bAdj',
        headerText: 'Adjust Ind',
        kind: TableColumnKind.Input,
        border: false,
      },
      {
        key: 'ma1bIon',
        headerText: 'Operator IONs',
        kind: TableColumnKind.Text,
        border: false,
      }
    ];
  currentPageValue = 0;
  previousPageValue = 0;
  @ViewChild('inputTable') inputTable?: TableComponent;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('document:keydown.enter', ['$event']) keyEvent(event: KeyboardEvent): void {
    if (!this.isWorking) {
      this.EnterEventClick();
    }
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new OvpaymentCommonArea() : this.common;
    this.ovpayRefundHistServiceMainRoutine(this.common).subscribe(resp => {
      container = resp;
      this.screenBean = container.screen;
      this.dataLengthInput = this.screenBean.mapLines.length;
      this.calculateNewPage();
      this.common = container.commonArea;
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(OverpaymentRefundHistSubtitleComponent, {
        account: this.screenBean.ma1bAcct,
        memberName: ''
      }, this.componentFactoryResolver, this.injector);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      const header3 = document.getElementById('header3');
      if (header3) {
        this.isTableConstructed = true;
      }
      this.setTableColumnWidth();
    }
  }

  /**
   * Event action EnterEventClick
   */
  EnterEventClick(): void {
    if (this.inputTable && this.inputTable.tableFormGroup.value && this.inputTable.tableFormGroup.value.rows ) {
      this.updatedMaplines = this.getUpdatedMapLines();
      this.updateMaplines(this.currentPageValue);
    }

    let container = new Container();
    let data: any = undefined;
    container.screen = this.screenBean;
    container.commonArea = this.common;
    this.isWorking = true;
    this.ovpayRefundHistServiceProcessEnterKey(container).subscribe(resp => {
      container = resp;
      this.isWorking = false;
      if ('' === container.screen.ma1bErrmsg) {
        data = this.transferSrv.getData();
        this.common = container.commonArea;
        data['common'] = this.common;
        this.router.navigate(['/check-recovery/add-edit-overpayment']);
      } else {
        this.messageBoxService.addMessageBox('Confirm', MessageBoxType.ERROR, container.screen.ma1bErrmsg);
        this.screenBean = container.screen;
        this.common = container.commonArea;
      }
    }, error => {
      this.isWorking = false;
    });
  }

  CancelEventClick(): void {
    this.router.navigate(['/check-recovery/add-edit-overpayment']);
  }

  calculateNewPage(): void {
    if (this.currentPageValue !== this.previousPageValue) {
      this.previousPageValue = this.currentPageValue;
    } else if (this.paginator) {
      this.currentPageValue = this.paginator.currentPage;
      if (this.currentPageValue !== this.previousPageValue) {
        this.updatedMaplines = this.getUpdatedMapLines();
        this.updateMaplines(this.previousPageValue);
      }
    }
    if (this.paginator) {    this.viewData = this.screenBean.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.viewData = this.viewData.map(r => {
        r.ma1bRfdt = r.ma1bRfdt && moment(r.ma1bRfdt).format('MM/DD/YYYY');
        return r;
      });
      this.pageTotal = Math.ceil(this.screenBean.mapLines.length / this.paginator.pageSize);
    }
  }

  updateMaplines(previousPage: number): void {
    if (!this.paginator) {
      return;
    }
    const fromValue = ((previousPage * this.paginator.pageSize) + this.paginator.pageSize) - this.paginator.pageSize;
    const toValue = ((previousPage * this.paginator.pageSize) + this.paginator.pageSize) - 1;
    this.screenBean.mapLines = this.screenBean.mapLines.map((item, index) => {
      if (index >= fromValue && index <= toValue) {
        Object.assign(item, this.updatedMaplines[index]);
      }
      return item;
    });
  }

  getUpdatedMapLines(): any {
    if (!this.inputTable) {
      return;
    }
    return this.inputTable.tableFormGroup.value.rows;
  }

  /**
   * Back end calls mainRoutine
   */
  private ovpayRefundHistServiceMainRoutine(commonarea: OvpaymentCommonArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/overpayment/services/ovpayrefundhist/ovpayrefundhistservice/mainroutine', JSON.stringify(commonarea), options);
  }

  private ovpayRefundHistServiceProcessEnterKey(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/overpayment/services/ovpayrefundhist/ovpayrefundhistservice/processenterkey', JSON.stringify(container), options);
  }

  private setTableColumnWidth(): void {
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '200px';
    }
  }

}

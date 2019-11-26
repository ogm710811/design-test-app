import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginatorNonMaterialComponent, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {OvpaymentCommonArea} from '../model/ovpayment-common-area.model';
import {ErrorList} from './model/error-list.model';
import {OvpayErrCodes} from './model/ovpay-err-codes.model';
import {WorkStorage} from './model/work-storage.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::ovpayerrorcodes::ovpayerrorcodes::ovpayerrorcodes
 */
@Component({
  selector: 'fox-overpayment-error',
  templateUrl: './overpayment-error.component.html'
})
export class OverpaymentErrorComponent implements OnInit {
  screenBean = new OvpayErrCodes();
  common = new OvpaymentCommonArea();

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  data: ErrorList = new ErrorList();
  viewData: ErrorList[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;

  public constructor(protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let workStorage = new WorkStorage();

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new OvpaymentCommonArea() : this.common;
    this.ovPayErrorCodesServiceEnter(this.common).subscribe(resp => {
      workStorage = resp;
      data = this.transferSrv.getData();
      this.screenBean = workStorage.ovpayerrcode;
      this.common = workStorage.common;
      if (this.paginator) {
        this.viewData = this.screenBean.errorList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.pageTotal = Math.ceil(this.screenBean.errorList.length / this.paginator.pageSize);
      }
    });
  }

  get dataLengthInput(): number {
    return (!!this.screenBean) ? ((!!this.screenBean.errorList) ? this.screenBean.errorList.length : 0) : 0;
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    this.common.errorCodeSel = this.screenBean.ma1sel1;
    this.transferSrv.set('common', this.common);
    this.router.navigate(['/check-recovery/add-edit-overpayment']);
  }

  cancelEventClick(): void {
    this.router.navigate(['/check-recovery/add-edit-overpayment']);
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.screenBean.errorList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screenBean.errorList.length / this.paginator.pageSize);
    }
  }

  /**
   * Back end calls enter
   */
  private ovPayErrorCodesServiceEnter(commonArea: OvpaymentCommonArea): Observable<WorkStorage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<WorkStorage>('/api/overpayment/services/ovpayerrorcodes/ovpayerrorcodesservice/enter', JSON.stringify(commonArea), options);

  }
}

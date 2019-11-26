import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultAuthLimit,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdma66} from './model/rpdma66.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::dfltovrdpendverfservice::DfltOvrdPendVerfService::DfltOvrdPendVerfService
 */
@Component({
  selector: 'fox-app-dflt-ovrd-pend-verf-service',
  templateUrl: './default-override-pending-verification.component.html',
  styleUrls: ['./default-override-pending-verification.component.css']

})
export class DfltOvrdPendVerfServiceComponent implements OnInit {
  screenBean = new Rpdma66();
  common = new Dfhcommarea();
  container = new Container();

  @ViewChild('paginator') paginator: PaginatorNonMaterialComponent;
  data: any;
  viewData: any[];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  tableData: any[] = [];
  columns: Object;
  continueStatus = ButtonStatus.SUBMIT;

  get dataLengthInput(): number {
    return (!!this.screenBean) ? ((!!this.screenBean.mapPendingVerif.mapVerifs) ? this.screenBean.mapPendingVerif.mapVerifs.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private opMaintenance: OpMaintenanceService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;
    const result = new Container();
    const common = new Dfhcommarea();

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.dfltOvrdPendVerfServiceOperationOnLoad(this.common).subscribe((resp) => {
      container = resp;
      this.container = container;
      data = this.transferSrv.getData();
      this.screenBean = container.rpdma66;
      this.screenBean.mapPendingVerif.mapVerifs.forEach((mapVerif) => {
        const tableColumn = mapVerif.verifD.split(/ {5,}/g);
        const tableRow: string[] = [];
        tableColumn.forEach((res) => {
          tableRow.push(res);
        });
        this.tableData.push(tableRow);
      });

      this.setTable();

      this.columns = Object.keys(this.tableData[0]).map((key, index) => {
        return {
          key: key,
          header: key
        };
      });
      this.common = container.dfhCommonArea;
      this.pushAlert(this.screenBean.scmsgD);
      this.viewData = this.screenBean.mapPendingVerif.mapVerifs.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.tableData = this.tableData.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screenBean.mapPendingVerif.mapVerifs.length / this.paginator.pageSize);
    });
  }

  calculateNewPage(): void {
    this.viewData = this.screenBean.mapPendingVerif.mapVerifs.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.setTableData();
    this.pageTotal = Math.ceil(this.screenBean.mapPendingVerif.mapVerifs.length / this.paginator.pageSize);
  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    container.workStorage = this.container.workStorage;
    container.rpdma66 = this.screenBean;

    container.dfhCommonArea = this.common;
    this.dfltOvrdPendVerfServiceClearFreshMap(container).subscribe((resp) => {
      container = resp;
      this.screenBean = container.rpdma66;
      this.common = container.dfhCommonArea;
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    let container = new Container();

    let data: any = undefined;
    container.workStorage = this.container.workStorage;
    container.rpdma66 = this.screenBean;
    container.dfhCommonArea = this.common;
    this.continueStatus = ButtonStatus.WORKING;
    this.dfltOvrdPendVerfServiceOperation_Reply(container).subscribe((resp) => {
      container = resp;
      this.screenBean = container.rpdma66;
      this.common = container.dfhCommonArea;
      this.container.workStorage = container.workStorage;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.common.callingProgram.match('RPD05O83')) {
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultAuthLimit]);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O84')) {
        this.router.navigate(['/dashboard/op-dft-auth-comb']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O85')) {
        this.router.navigate(['/setqltydflt']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O86')) {
        this.router.navigate(['/dashboard/set-quality-comb-default']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O87')) {
        this.router.navigate(['/dashboard/oper-trans-sec-dflt-1']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O89')) {
        this.router.navigate(['/operauthlmtovrd']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O90')) {
        this.router.navigate(['/operauthcombovrd']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O91')) {
        this.router.navigate(['/dashboard/set-quality-temp-exc']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O92')) {
        this.router.navigate(['/setqltycombovrd']);
        this.setSuccess();
      } else if (this.common.callingProgram.match('RPD05O79')) {
        this.router.navigate(['/setqltytmplt']);
        this.setSuccess();
      }
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    }, error1 => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  /**
   * Event action ReturnEventClick
   */
  returnEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.rpdma66 = this.screenBean;

    container.dfhCommonArea = this.common;
    this.dfltOvrdPendVerfServiceReturnBackScreen(container).subscribe((resp) => {
      container = resp;
      this.screenBean = container.rpdma66;
      this.common = container.dfhCommonArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      this.router.navigate(['/dashboard/operator-default-file']);
    });
  }

  private setTableData(): void {
    this.tableData = [];
    this.viewData.forEach((result) => {
      const tableColumn = result.verifD.split(/ {5,}/g);
      const tableRow: string[] = [];
      tableColumn.forEach(res => {
        tableRow.push(res);
      });
      this.tableData.push(tableRow);
    });
    this.setTable();
  }

  private setTable(): void {
    this.tableData = this.tableData.map(res => {
      return {
        'Line #': res['0'],
        'Maintenance Description': res['1'],
        Type: res['2'],
        'Last Date': res['3'] + ' ' + res['4'],
        'Maintenance Ions': 'Value',
        'Verify Ions': res['5']
      };
    });
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('NO PENDING VERIFICATION MAINTENANCE FOUND')) {
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ACTIVE, message);
      } else {
        this.messageBoxService.addMessageBox('Operator Transaction Security Default', MessageBoxType.ERROR, message);
      }
    }
  }

  private setSuccess(): void {
    this.continueStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  /**
   * Back end calls operationOnLoad
   */
  private dfltOvrdPendVerfServiceOperationOnLoad(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/dfltovrdpendverfservice/dfltovrdpendverfservice/operationonload', JSON.stringify(common), options);

  }

  /**
   * Back end calls returnBackScreen
   */
  private dfltOvrdPendVerfServiceReturnBackScreen(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/dfltovrdpendverfservice/dfltovrdpendverfservice/returnbackscreen', JSON.stringify(container), options);

  }

  /**
   * Back end calls clearFreshMap
   */
  private dfltOvrdPendVerfServiceClearFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/dfltovrdpendverfservice/dfltovrdpendverfservice/clearfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls operation_Reply
   */
  private dfltOvrdPendVerfServiceOperation_Reply(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/dfltovrdpendverfservice/dfltovrdpendverfservice/operation_reply', JSON.stringify(container), options);

  }
}

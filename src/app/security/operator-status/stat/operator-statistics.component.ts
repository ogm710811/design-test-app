import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  HeaderMaintenanceService,
  TableColumnKind,
  TransferSrvService,
  ButtonStatus,
  PaginatorNonMaterialComponent
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './models/container.model';
import {OperStat} from './models/oper-stat.model';
/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operstat::operstat::operstat
 */
@Component({
  selector: 'fox-operator-statistics',
  templateUrl: './operator-statistics.component.html',
  styleUrls: ['./operator-statistics.component.css']
})
export class OperatorStatisticsComponent implements AfterViewInit, AfterViewChecked {
  screen = new OperStat();
  common = new Dfhcommarea();
  container = new Container();
  @Input() isIndividualSelected: boolean;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  isTableConstructed = false;
  pageSizeSelected = 10;
  dataLengthInput = 0;
  pageTotal = 0;
  currentPage = 0;
  tableDataSortKey = 'name';
  tableDataDirection = 'ASC';
  columns?: Object;
  tableData: TableData[] = [];
  viewData: any[] = [];
  results?: TableData[];
  continueStatus = ButtonStatus.SUBMIT;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private headerMaintenance: HeaderMaintenanceService) {

  }

  ngAfterViewInit(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operStatServiceOnload(this.common).subscribe(res => {
      container = res;
      this.container = container;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;
      this.screen.mapInputDatas = this.screen.mapInputDatas.filter( (obj) => this.isObjectEmpty(obj));
      this.screen.mapAttStaffWeeks = this.screen.mapAttStaffWeeks.filter( (obj) => this.isObjectEmpty(obj));
      this.screen.mapProdStaffWeeks = this.screen.mapProdStaffWeeks.filter( (obj) => this.isObjectEmpty(obj));

      this.dataLengthInput = this.screen.mapInputDatas.length;
      this.viewData = this.screen.mapInputDatas.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.setTableData();
      this.columns = Object.keys(this.tableData[0]).map( (column, index) => {
        return {
          key: column,
          header: column,
          border: false,
          sortKey: (index !== 0) ? column : null,
          kind: (column === 'Action') ? TableColumnKind.Link : TableColumnKind.Text
        };
      });
      this.results = this.tableData;
      this.tableDataSortKey = this.columns[0].sorKey;
      this.tableDataDirection = 'ASC';
      this.pageTotal = Math.ceil(this.screen.mapInputDatas.length / this.paginator.pageSize);
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
    }
    const sticky = document.getElementsByClassName('column-sticky');
    if (sticky && sticky[1] && sticky[1]['style'].width === '87px') {
      this.isTableConstructed = true;
    } else {
      this.isTableConstructed = false;
    }
  }

  /**
   * Event action PF1EventClick
   */
  PF1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.operstat = this.screen;

    container.dfhcommarea = this.common;
    this.container.operstat = container.operstat;
    this.operStatServiceCheckPf1(this.container).subscribe(res => {
      container = res;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;

      if (container.transferTo === '97') {
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate(['/security/review-operator-statistics']);
      }
    });

  }

  /**
   * Event action PF3EventClick
   */
  PF3EventClick(): void {
    let container = new Container();

    container.operstat = this.screen;

    container.dfhcommarea = this.common;
    this.operStatServiceCheckPf3(container).subscribe(res => {
      container = res;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;
    });
  }

  /**
   * Event action PF4EventClick
   */
  PF4EventClick(): void {
    let container = new Container();

    container.operstat = this.screen;

    container.dfhcommarea = this.common;
    this.operStatServiceCheckPf4(container).subscribe(res => {
      container = res;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    const data: any = undefined;
    container.operstat = this.screen;

    container.dfhcommarea = this.common;

    this.operStatServiceCheckClear(this.container).subscribe(res => {
      container = res;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.operstat = this.screen;

    container.dfhcommarea = this.common;
    this.container.operstat = container.operstat;
    this.continueStatus = ButtonStatus.WORKING;
    this.operStatServiceCheckEnter(this.container).subscribe(res => {
      container = res;
      this.screen = container.operstat;
      this.common = container.dfhcommarea;

      if (container.transferTo === '98') {
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.setSuccess();
      }

      this.pushAlert(this.screen.m95err1);
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    }, error1 => {
      this.continueStatus = ButtonStatus.FAILED;
      this.resetState();
    });
  }

  setTableData(): void {
    this.tableData = this.viewData.map( (result) => {
      return {
        'Line #': result.miOpNum,
        Name: result.miOperator,
        IONS: result.miIons,
        Level: result.miLevel,
        'Total Hours': result.miHours,
        'Avg Closed / Hour': result.miAvgClaims,
        Pays: result.miPays,
        'No Pays': result.miNoPays,
        Disbursed: result.miDisb,
        '# Suspend': result.miSusp,
        '# To QR': result.miToQual,
        Action: 'View Op'
      };
    });

    this.tableData.push(
      {
        'Line #': 'Total',
        'Total Hours': this.screen.m95tohr,
        'Avg Closed / Hour': this.screen.m95toav,
        Pays: this.screen.m95topa,
        'No Pays': this.screen.m95tonp,
        Disbursed: this.screen.m95todb,
        '# Suspend': this.screen.m95tosp,
        '# To QR': this.screen.m95toqr
      }
    );
  }

  calculateNewPage(): void {
    this.viewData = this.screen.mapInputDatas.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.setTableData();
    this.results = this.tableData;
    this.pageTotal = Math.ceil(this.screen.mapInputDatas.length / this.paginator.pageSize);
  }

  navigateTo(event): void {
    this.screen.m95rvno = event.data['Line #'];
    this.enterEventClick();
  }

  isObjectEmpty(object): boolean | undefined {
    for (const key in object) {
      if (object[key].length !== 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  private tableColumnWidth(): void {
    const numbWidth: string = '87px';

    const header = document.getElementById('header5');
    if (header) {
      header.style.width = '100%';
    }

    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = numbWidth;
        stickyCells[i]['style'].paddingLeft = '20px';

      } else {
        stickyCells[i]['style'].width = numbWidth;
        stickyCells[i]['style'].height = '71px';
        stickyCells[i]['style'].paddingLeft = '20px';
      }
    }

    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      sve[0]['style'].marginLeft = '86px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
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
    }, 2500);
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Operator Statistics', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls onload
   */
  private operStatServiceOnload(common: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/onload', JSON.stringify(common), options);

  }

  /**
   * Back end calls checkPf1
   */
  private operStatServiceCheckPf1(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/checkpf1', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkClear
   */
  private operStatServiceCheckClear(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/checkclear', JSON.stringify(container), options);
  }

  /**
   * Back end calls checkEnter
   */
  private operStatServiceCheckEnter(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/checkenter', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkPf4
   */
  private operStatServiceCheckPf4(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/checkpf4', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkPf3
   */
  private operStatServiceCheckPf3(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstat/operstatservice/checkpf3', JSON.stringify(container), options);

  }

}

interface TableData {
  'No Pays': string | number;
  Action?: string;
  'Avg Closed / Hour': string | number;
  Disbursed: string | number;
  name?: string;
  IONS?: string | number;
  '# Suspend': string | number;
  Level?: string;
  'Line #': string | number;
  'Total Hours': string;
  Pays: string | number;
  '# To QR': string | number;
}

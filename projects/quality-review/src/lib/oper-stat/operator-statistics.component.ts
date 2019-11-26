import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DateFormatService,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType, PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './model/container.model';
import {Rpdma99} from './model/rpdma99.model';
import {MapLine} from './model/map-line.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwoperstat::QltyRvwOperStat::QltyRvwOperStat
 */
@Component({
  selector: 'fox-operator-statistics',
  templateUrl: './operator-statistics.component.html',
  styleUrls: ['./operator-statistics.component.css']
})
export class OperatorStatisticsComponent implements OnInit, AfterViewChecked {
  screen = new Rpdma99();
  common = new Dfhcommarea();
  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  previousPage = 0;
  isModified = false;
  currentPageValue: number = 0;
  previousPageValue: number = 0;
  viewData: MapLine[] = [];
  isTableConstructed = false;
  pageSizeDropdownOption = [10, 20, 30];
  tableSortKey: string = '';
  tableSortDirection: any;
  beginDate: string = '';
  endDate: string = '';
  inputColumns: any[] = [
    {
      key: 'slno',
      headerText: 'Line #',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'ions',
      headerText: 'IONS ID',
      sortKey: 'ions',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'name',
      headerText: 'Name',
      sortKey: 'name',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'salLevel',
      headerText: 'Salary Level',
      sortKey: 'salLevel',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'totalHrs',
      headerText: 'Total Hours',
      sortKey: 'totalHrs',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'avgClmHr',
      headerText: 'Av. Calls/Hr',
      sortKey: 'avgClmHr',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'remPerHhs',
      headerText: 'REM/ SUS',
      sortKey: 'remPerHhs',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'clmsRvwd',
      headerText: 'REV',
      sortKey: 'clmsRvwd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'clmsSusp',
      headerText: 'SUSP',
      sortKey: 'clmsSusp',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'percentageSusp',
      headerText: '% SUSP',
      sortKey: 'percentageSusp',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'errRMvd',
      headerText: 'Errors Removed',
      sortKey: 'errRMvd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'errChgd',
      headerText: 'Errors Changed',
      sortKey: 'errChgd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'qltyExpd',
      headerText: 'Quality Expd',
      sortKey: 'qltyExpd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    }
  ];

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     public pageHeaderService: PageHeaderService,
                     private requestDate: DateFormatService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new Rpdma99();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.qltyRvwOperStatServiceMainOperation(this.common).subscribe(res => {
      container = res;
      data = this.transferSrv.getData();
      this.screen = container.screen;
      this.beginDate = this.requestDate.getCcyyFormatedDateIE(this.screen.m99bdat.replace(/\//g, ''));
      if (this.screen.m99edat) {
        this.endDate = this.requestDate.getCcyyFormatedDateIE(this.screen.m99edat.replace(/\//g, ''));
      }

      this.common = container.dfhcommarea;
      this.viewData = this.screen.mapLines;
      this.viewData = this.viewData.map((item, index) => {
        item.slno = index + 1;
        return item;
      });
      if (this.paginator) {
        this.viewData = this.screen.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      }
      this.viewData.push({
          avgClmHr: this.screen.m99tav1,
          clmsRvwd: this.screen.m99trv1,
          clmsSusp: this.screen.m99tsp1,
          errChgd: this.screen.m99tec1,
          errRMvd: this.screen.m99tnr1,
          ions: '',
          name: '',
          percentageSusp: this.screen.m99tps1,
          qltyExpd: this.screen.m99tqe1,
          remPerHhs: this.screen.m99trs1,
          salLevel: '',
          slno: 'Total',
          totalHrs: this.screen.m99thr1
      });
      if (this.paginator) {
        this.pageTotal = Math.ceil(this.screen.mapLines.length / this.paginator.pageSize);
      }
    });
    this.pageHeaderService.customTitle = 'Quality Review Examiner Statistics';
  }
  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
    }
    const sticky: any = document.getElementsByClassName('column-sticky');
    if (sticky && sticky[1] && sticky[1]['style'].width === '87px') {
      this.isTableConstructed = true;
    } else {
      this.isTableConstructed = false;
    }
  }
  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    const common = new Dfhcommarea();
    const screen = new Rpdma99();
    const container = new Container();

    container.screen = screen;

    container.dfhcommarea = common;
    this.qltyRvwOperStatServiceCheckClear_1000(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    const common = new Dfhcommarea();
    const screen = new Rpdma99();
    let container = new Container();
    let data: any = undefined;

    container.screen = this.screen;
    container.dfhcommarea = this.common;
    this.qltyRvwOperStatServiceCheckEnter_1100(container).subscribe(res => {
      container = res;
      this.screen = container.screen;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
    });
    data['common'] = this.common;
    this.pushAlert(this.screen.m99err1);
  }

  /**
   * Event action f1EventClick
   */
  f1EventClick(): void {
    const common = new Dfhcommarea();
    const screen = new Rpdma99();
    const container = new Container();

    container.screen = screen;

    container.dfhcommarea = common;
    this.qltyRvwOperStatServiceCheckPf1_1300(container).toPromise();
    this.router.navigate(['/security/review-operator-statistics']);
    this.screen = container.screen;
    this.common = container.dfhcommarea;
  }

  calculateNewPage(): void {
    if (this.currentPageValue !== this.previousPageValue) {
      this.previousPageValue = this.currentPageValue;
    }
    if (this.paginator) {
      this.currentPageValue = this.paginator.currentPage;
      this.viewData = this.screen.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screen.mapLines.length / this.paginator.pageSize);
    }
    this.calculatePageArray(this.previousPageValue);
    this.isTableConstructed = false;
    this.isModified = false;
  }

  calculatePageArray(currentPage: any): void {
    if (this.paginator) {
      const fromValue = ((currentPage * this.paginator.pageSize) + this.paginator.pageSize) - this.paginator.pageSize;
      const toValue = ((currentPage * this.paginator.pageSize) + this.paginator.pageSize) - 1;
    }
  }

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.mapLines) ? this.screen.mapLines.length : 0) : 0;
  }

  private tableColumnWidth(): void {

    const numbWidth: string = '87px';

    const header = document.getElementById('header5');
    if (header) {
      header.style.width = '100%';
    }

    const stickyCells: any = document.getElementsByClassName('column-sticky');
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

    const sve: any = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      sve[0]['style'].marginLeft = '86px';
    }

    const containerTable: any = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Quality Review Operator Statistics', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls checkEnter_1100
   */
  private qltyRvwOperStatServiceCheckEnter_1100(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwoperstat/qltyrvwoperstatservice/checkenter_1100', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOperation
   */
  private qltyRvwOperStatServiceMainOperation(commonArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwoperstat/qltyrvwoperstatservice/mainoperation', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls checkPf1_1300
   */
  private qltyRvwOperStatServiceCheckPf1_1300(container: Container): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/qualityrvw/services/qltyrvwoperstat/qltyrvwoperstatservice/checkpf1_1300', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkClear_1000
   */
  private qltyRvwOperStatServiceCheckClear_1000(container: Container): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<void>('/api/qualityrvw/services/qltyrvwoperstat/qltyrvwoperstatservice/checkclear_1000', JSON.stringify(container), options);

  }
}

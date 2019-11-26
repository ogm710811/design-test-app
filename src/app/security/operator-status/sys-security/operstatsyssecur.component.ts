import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TableColumnKind, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './models/container.model';
import {Rpdma93} from './models/rpdma93.model';
import {MapData} from './models/map-data.model';
import {PaginatorNonMaterialComponent} from '@fox/shared';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operstatsyssecur::operstatsyssecur::operstatsyssecur
 */
@Component({
  selector: 'fox-operstatsyssecur',
  templateUrl: './operstatsyssecur.component.html',
  styleUrls: ['./operstatsyssecur.component.css']
})
export class OperstatsyssecurComponent implements OnInit, AfterViewChecked {
  screen = new Rpdma93();
  container = new Container();
  common = new Dfhcommarea();
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  previousPage = 0;
  isModified = false;
  pageSizeDropdownOption = [10, 20, 30];
  viewData: MapData[] = [];
  tableDataSortKey: string = 'mapIons';
  tableDataDirection: string = 'ASC';
  isTableConstructed = false;
  columns: TableColumn[] = [
    {
      key: 'mapIons',
      headerText: 'IONS ID',
      sortKey: 'mapIons',
      border: false,
      kind: TableColumnKind.Text,
    },
    {
      key: 'mapOper',
      headerText: 'Name',
      sortKey: 'mapOper',
      border: false,
      kind: TableColumnKind.Text,
    },
    {
      key: 'mapAveClHour',
      headerText: 'Avg. Calls/Hr',
      sortKey: 'mapAveClHour',
      border: false,
      kind: TableColumnKind.Text,
    },
    {
      key: 'mapSignon',
      headerText: 'Sign-On',
      sortKey: 'mapSignon',
      border: false,
      kind: TableColumnKind.Text,
    },
    {
      key: 'mapSignoff',
      headerText: 'Sign-Off',
      sortKey: 'mapSignoff',
      border: false,
      kind: TableColumnKind.Text,
    },
    {
      key: 'mapElapsedTime',
      headerText: 'Elapsed Time',
      sortKey: 'mapElapsedTime',
      border: false,
      kind: TableColumnKind.Text,
    }
  ];

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.mapDatas) ? this.screen.mapDatas.length : 0) : 0;
  }

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.operStatSysSecurServiceMainOperation(this.common).subscribe(resp => {
      this.container = resp;
      data = this.transferSrv.getData();
      this.screen = this.container.rpdma93;
      this.common = this.container.dfhComArea;
      this.screen.mapDatas = this.container.workStorage.mapDatas;
      this.viewData = this.screen.mapDatas;
      if (this.paginator) {
        this.viewData = this.screen.mapDatas.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
        this.pageTotal = Math.ceil(this.screen.mapDatas.length / this.paginator.pageSize);
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
    }
  }

  /**
   * Event action CLEAREventClick
   */
  clearEventClick(): void {
    this.container.dfhComArea = this.common;
    this.container.workStorage.clearInd = 'Y';
    this.operStatSysSecurServiceShowFreshMap(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.rpdma93;
      this.container.workStorage.clearInd = '';
      this.common = this.container.dfhComArea;
      this.screen.mapDatas = this.container.workStorage.mapDatas;
      this.screen.m93err1 = '';
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    let data: any = undefined;
    this.container.rpdma93 = this.screen;
    this.container.rpdma93 = this.screen;
    this.container.dfhComArea = this.common;
    this.operStatSysSecurServiceScreenDataEntered(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.rpdma93;
      this.common = this.container.dfhComArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;

      if (this.common.nextProgram === 'RPD07O01') {
        this.screen = new Rpdma93();
        this.router.navigate(['/security/review-operator-statics']);
      }
      this.screen.mapDatas = this.container.workStorage.mapDatas;
      this.pushAlert(this.screen.m93err1);
    });
  }

  /**
   * Event action PF1EventClick
   */
  pf1EventClick(): void {
    let data: any = undefined;
    this.container.rpdma93 = this.screen;
    this.container.dfhComArea = this.common;
    this.operStatSysSecurServiceReturnControl(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.rpdma93;
      this.common = this.container.dfhComArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.common.nextProgram === 'RPD05O97') {
        this.router.navigate(['/security/review-operator-statistics']);
      }
    });
  }

  /**
   * Event action PF3EventClick
   */
  pf3EventClick(): void {
    this.container.rpdma93 = this.screen;
    this.container.dfhComArea = this.common;
    this.operStatSysSecurServiceCheckPf3Next(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.rpdma93;
      this.common = this.container.dfhComArea;
      this.screen.mapDatas = this.container.workStorage.mapDatas;
    });
  }

  /**
   * Event action PF4EventClick
   */
  pf4EventClick(): void {
    this.container.rpdma93 = this.screen;
    this.container.dfhComArea = this.common;
    this.operStatSysSecurServiceCheckPf4Prev(this.container).subscribe(resp => {
      this.container = resp;
      this.screen = this.container.rpdma93;
      this.common = this.container.dfhComArea;
      this.screen.mapDatas = this.container.workStorage.mapDatas;
    });

  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.screen.mapDatas.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screen.mapDatas.length / this.paginator.pageSize);
    }
  }

  private tableColumnWidth(): void {
    const numbWidth: string = '140px';
    const smWidth: string = '184px';
    const lgWidth: string = '344px';

    for (let i = 1; i < 12; i++) {
      const header = document.getElementById('header' + i);
      if (header && i === 0) {
        header.style.width = numbWidth;
      } else if (header && i === 1) {
        header.style.minWidth = lgWidth;
      } else if (header && (i === 2 || i === 3 || i === 4 || i === 5)) {
        header.style.minWidth = smWidth;
      }
    }

    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = numbWidth;
      } else {
        stickyCells[i]['style'].width = numbWidth;
      }
    }
    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      this.isTableConstructed = (sve[0]['style'].marginLeft === '139px') ? true : false;
      sve[0]['style'].marginLeft = '139px';
    }
    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Operator Statistics Sys Security', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls returnControl
   */
  private operStatSysSecurServiceReturnControl(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/returncontrol', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenDataEntered
   */
  private operStatSysSecurServiceScreenDataEntered(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/screendataentered', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkPf3Next
   */
  private operStatSysSecurServiceCheckPf3Next(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/checkpf3next', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private operStatSysSecurServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkPf4Prev
   */
  private operStatSysSecurServiceCheckPf4Prev(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/checkpf4prev', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOperation
   */
  private operStatSysSecurServiceMainOperation(dfhComArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/operstatsyssecur/operstatsyssecurservice/mainoperation', JSON.stringify(dfhComArea), options);

  }
}

interface TableColumn {
  key: string;
  headerText: string;
  sortKey: string;
  border: boolean;
  kind: number;
}

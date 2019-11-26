import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  OperDfltAuthCombOvAuthorityCombinationPO,
  OperDfltOvrdCvAuthorityCombinationPO,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {filter, map} from 'rxjs/operators';
import {OpMaintenanceService} from '@fox/shared';
import {authLimitComboVerify} from '@fox/shared';
import {ComboTable} from './model/combo-table.model';
import {Container} from './model/container.model';
import {OperAuthCombDflt} from './model/oper-auth-comb-dflt.model';

@Component({
  selector: 'fox-op-dft-auth-comb',
  templateUrl: './op-dft-auth-comb.component.html',
  styleUrls: ['./op-dft-auth-comb.component.css']
})

export class OpDftAuthCombComponent implements OnInit, AfterViewChecked {
  screen = new OperAuthCombDflt();
  common = new Dfhcommarea();
  container = new Container();
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  @ViewChild('inputTable') inputTable: TableComponent;
  data: ComboTable;
  viewData: ComboTable[];
  updatedTableData: ComboTable[] = [];
  tableDataMapCombo: ComboTable[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  pageSizeDropdownOption = [10, 20, 30];
  isReadOnly: boolean;
  tableSortKey: string;
  tableSortDirection: any;
  isTableConstructed = false;
  buttonStatus: string = ButtonStatus.SUBMIT;
  inputColumns: any[] = [];
  currentPageValue: number = 0;
  previousPageValue: number = 0;
  isModified = false;
  inputColumnsEditable: any[] = [
    {
      key: 'serialNumber',
      headerText: 'Line #',
      sortKey: 'serialNumber',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'process',
      headerText: 'Process (Y/N)',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'state',
      headerText: 'State',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'plan',
      headerText: 'Plan',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'tos',
      headerText: 'TOS',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'startDate',
      headerText: 'Start Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'endDate',
      headerText: 'End Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'caution',
      headerText: 'Caution',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'acceptCode',
      headerText: 'Acceptability Code',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    }
  ];
  inputColumnsReadOnly: any[] = [
    {
      key: 'serialNumber',
      headerText: 'Line #',
      sortKey: 'serialNumber',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'process',
      headerText: 'Process',
      sortKey: 'process',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'state',
      headerText: 'State',
      sortKey: 'state',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'plan',
      headerText: 'Plan',
      sortKey: 'plan',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'tos',
      headerText: 'TOS',
      sortKey: 'tos',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'startDate',
      headerText: 'Start Date',
      sortKey: 'startd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'endDate',
      headerText: 'End Date',
      sortKey: 'endDate',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'caution',
      headerText: 'Caution',
      sortKey: 'caution',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'acceptCode',
      headerText: 'Acceptability Code',
      sortKey: 'acceptCode',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    }
  ];

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.comboTable) ? this.screen.comboTable.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     public pageHeaderService: PageHeaderService) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.operAuthCombDfltServiceMainMethod(this.common).toPromise();
    data = this.transferSrv.getData();
    container.dfhCommArea = this.common;
    this.screen = container.operAuthCombDflt;
    this.tableDataMapCombo = this.screen.comboTable;
    this.viewData = this.screen.comboTable;
    this.viewData = this.viewData.map((item, index) => {
      item.serialNumber = index + 1;
      return item;
    });
    this.viewData = this.screen.comboTable.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.comboTable.length / this.paginator.pageSize);
    this.isReadOnly = (this.screen.func === 'UPDATE');
    this.inputColumns = this.isReadOnly ? this.inputColumnsEditable : this.inputColumnsReadOnly;
    this.pageHeaderService.customTitle = this.titleCase(this.screen.func) + ' Authority Combinations ' + this.titleCase(this.screen.desc);

    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapData().subscribe(data => {
        this.updatedTableData = data;
        this.updatedTableData = this.viewData.map((item, index) => {
          if (data.length === this.viewData.length) {
            data[index].authCombId = item.authCombId;
          }
          return data[index];
        });
      });
    }

    if (!this.isTableConstructed) {
      this.tableColumnWidth();
      const header1 = document.getElementById('header1');
      if (header1) {
        this.isTableConstructed = true;
      }
    }
  }

  calculateNewPage(): void {
    if (this.currentPageValue !== this.previousPageValue) {
      this.previousPageValue = this.currentPageValue;
    }
    this.currentPageValue = this.paginator.currentPage;
    this.viewData = this.screen.comboTable.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.comboTable.length / this.paginator.pageSize);
    console.log(this.updatedTableData);
    this.calculatePageArray(this.previousPageValue);
    this.updatedTableData = [];
    this.isTableConstructed = false;
    this.isModified = false;
  }

  /**
   * Event action CancelEventClick
   */
  async cancelEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.operAuthCombDflt = this.screen;
    container.dfhCommArea = this.common;
    container = await this.operAuthCombDfltServiceCancelTrans(container).toPromise();
    this.screen = container.operAuthCombDflt;
    this.common = container.dfhCommArea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (container.dfhCommArea.callingProgram === 'RPD05O82') {
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    } else if (container.dfhCommArea.callingProgram === 'RPD05O68') {
      this.router.navigate(['/dashboard/operator-default-file']);
    }
    return true;
  }

  /**
   * Event action ClearEventClick
   */
  async clearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let container = new Container();
    container.operAuthCombDflt = this.screen;
    container.dfhCommArea = this.common;
    this.inputTable.tableFormGroup.reset();
    container = await this.operAuthCombDfltServiceShowFreshMap(container).toPromise();
    this.screen = container.operAuthCombDflt;
    this.common = container.dfhCommArea;
    this.viewData = this.screen.comboTable;
    this.viewData = this.viewData.map((item, index) => {
      item.serialNumber = index + 1;
      return item;
    });
    this.viewData = this.screen.comboTable.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.comboTable.length / this.paginator.pageSize);
    this.isTableConstructed = false;
    this.updatedTableData = [];
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let container = new Container();
    let data: any = undefined;
    const operDfltAuthCombOvAuthCombo = new OperDfltAuthCombOvAuthorityCombinationPO();
    const operDfltOvrdCvAuthCombo = new OperDfltOvrdCvAuthorityCombinationPO();
    container.operAuthCombDflt = this.screen;
    container.dfhCommArea = this.common;
    console.log(this.updatedTableData);
    this.calculatePageArray(this.paginator.currentPage);
    container.operAuthCombDflt.comboTable = this.tableDataMapCombo;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      container = await this.operAuthCombDfltServiceProcessTrans(container, operDfltAuthCombOvAuthCombo, operDfltOvrdCvAuthCombo).toPromise();
      this.screen = container.operAuthCombDflt;
      this.common = container.dfhCommArea;
      if (this.screen.errMsg) {
        this.opMaintenance.displayMessageBox(this.screen.errMsg, authLimitComboVerify);
      }
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhCommArea.callingProgram === 'RPD05O82') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      } else if (container.dfhCommArea.callingProgram === 'RPD05O68') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.router.navigate(['/dashboard/default-override-pending-verification']);
      }
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
      window.scrollTo(0, 0);
      return true;
    } catch {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }
  }

  resetState(): void {
    setTimeout(() => {
      this.buttonStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  calculatePageArray(currentPage): void {
    const fromValue = ((currentPage * this.paginator.pageSize) + this.paginator.pageSize) - this.paginator.pageSize;
    const toValue = ((currentPage * this.paginator.pageSize) + this.paginator.pageSize) - 1;
    this.tableDataMapCombo = this.tableDataMapCombo.map((item, index) => {
      if (index >= fromValue && index <= toValue) {
        item = this.updatedTableData[index];
      }
      return item;
    });
  }

  private tableColumnWidth(): void {
    const header0 = document.getElementById('header0');
    if (header0) {
      header0.style.minWidth = '40px';
    }
    const header1 = document.getElementById('header1');
    if (header1) {
      header1.style.minWidth = '120px';
    }
    const header2 = document.getElementById('header2');
    if (header2) {
      header2.style.minWidth = '120px';
    }
    const header3 = document.getElementById('header3');
    if (header3) {
      header3.style.minWidth = '120px';
    }
    const header4 = document.getElementById('header4');
    if (header4) {
      header4.style.minWidth = '120px';
    }
    const header5 = document.getElementById('header5');
    if (header5) {
      header5.style.minWidth = '180px';
    }
    const header6 = document.getElementById('header6');
    if (header6) {
      header6.style.minWidth = '180px';
    }
    const header7 = document.getElementById('header7');
    if (header7) {
      header7.style.minWidth = '100px';
    }
    const header8 = document.getElementById('header8');
    if (header8) {
      header8.style.minWidth = '100px';
    }
    const stickyCells = document.getElementsByClassName('column-sticky');
    for (let i = 0; i < stickyCells.length; i++) {
      if (stickyCells[i].id === 'header0') {
        stickyCells[i]['style'].width = '100px';
      } else {
        stickyCells[i]['style'].width = '100px';
        stickyCells[i]['style'].height = '60px';
        stickyCells[i]['style']['padding-top'] = '15px';
      }
    }
    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      sve[0]['style'].marginLeft = '100px';
    }
    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls mainMethod
   */
  private operAuthCombDfltServiceMainMethod(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthcombdflt/operauthcombdfltservice/mainmethod', JSON.stringify(common), options);
  }

  /**
   * Back end calls showFreshMap
   */
  private operAuthCombDfltServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthcombdflt/operauthcombdfltservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancelTrans
   */
  private operAuthCombDfltServiceCancelTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthcombdflt/operauthcombdfltservice/canceltrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls processTrans
   */
  private operAuthCombDfltServiceProcessTrans(container: Container, operDfltAuthCombOvAuthCombo: OperDfltAuthCombOvAuthorityCombinationPO, operDfltOvrdCvAuthCombo: OperDfltOvrdCvAuthorityCombinationPO): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthcombdflt/operauthcombdfltservice/processtrans', JSON.stringify(container), options);

  }

  private mapData(): Observable<ComboTable[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      filter((data: object): data is {rows: Array<any>} => {
        return data.hasOwnProperty('rows');
      }),
      map((data: {rows: Array<any>}) => {
        return data.rows.map(results => {
          return {
            authCombId: results['authCombId'],
            process: results['process'],
            state: results['state'],
            plan: results['plan'],
            tos: results['tos'],
            startDate: results['startDate'],
            endDate: results['endDate'],
            caution: results['caution'],
            acceptCode: results['acceptCode']
          };
        });
      })
    );
  }
}

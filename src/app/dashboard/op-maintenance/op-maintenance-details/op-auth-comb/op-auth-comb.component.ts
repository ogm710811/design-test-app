import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {OpMaintenanceService} from '@fox/shared';
import {opAuthCombVerifyMsg} from '../../operator-maintenance.constants';
import {Container} from './model/container.model';
import {MapCombo} from './model/map-combo.model';
import {MapCombos} from './model/map-combos.model';
import {Rpdma74} from './model/rpdma74.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::operauthcomb::operauthcomb::operauthcomb
 */
@Component({
  selector: 'fox-opauthcomb',
  templateUrl: './op-auth-comb.component.html',
  styleUrls: ['./op-auth-comb.component.css']
})
export class OpAuthCombComponent implements OnInit, AfterViewChecked {
  screen = new Rpdma74();
  common = new Dfhcommarea();
  container = new Container();
  titleName: string = '';
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  @ViewChild('inputTable') inputTable: TableComponent;
  data: MapCombo;
  viewData: MapCombo[];
  updatedTableData: MapCombo[] = [];
  tableDataMapCombo: MapCombo[] = [];
  tempMapComo: MapCombos;
  tableMapComboList: any = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  previousPage = 0;
  isModified = false;
  pageSizeDropdownOption = [10, 20, 30];
  isReadOnly: boolean;
  tableSortKey: string;
  tableSortDirection: any;
  isTableConstructed = false;
  buttonStatus: string = ButtonStatus.SUBMIT;
  inputColumns: any[] = [];
  currentPageValue: number = 0;
  previousPageValue: number = 0;
  inputColumnsEditable: any[] = [
    {
      key: 'slno',
      headerText: 'Line #',
      sortKey: 'slno',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'proc',
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
      key: 'startd',
      headerText: 'Start Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'endd',
      headerText: 'End Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'cau',
      headerText: 'Caution',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'acep',
      headerText: 'Acceptability Code',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    }
  ];
  inputColumnsReadOnly: any[] = [
    {
      key: 'slno',
      headerText: 'Line #',
      sortKey: 'slno',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'proc',
      headerText: 'Process',
      sortKey: 'proc',
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
      key: 'startd',
      headerText: 'Start Date',
      sortKey: 'startd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'endd',
      headerText: 'End Date',
      sortKey: 'endd',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'cau',
      headerText: 'Caution',
      sortKey: 'cau',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'acep',
      headerText: 'Acceptability Code',
      sortKey: 'acep',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    }
  ];

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.mapComboList) ? this.screen.mapComboList.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected titlecasePipe: TitleCasePipe,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     public pageHeaderService: PageHeaderService) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    this.container = await this.operAuthCombServiceOnLoad(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = this.container.screenBean;
    this.common = this.container.dfhCommArea;
    this.titleName = this.titlecasePipe.transform(this.screen.m74titl);
    this.tableDataMapCombo = this.screen.mapComboList;
    this.viewData = this.screen.mapComboList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.mapComboList.length / this.paginator.pageSize);
    this.isReadOnly = (this.screen.m74titl === 'UPDATE');
    this.inputColumns = this.isReadOnly ? this.inputColumnsEditable : this.inputColumnsReadOnly;
    this.pageHeaderService.customTitle = 'Operator Authority Combinations ' + this.titleCase(this.screen.m74titl);
    if (this.screen.scmsg) {
      this.opMaintenance.displayMessageBox(this.screen.scmsg, opAuthCombVerifyMsg);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapData().subscribe(data => {
        this.updatedTableData = data;
        this.updatedTableData = this.viewData.map((item, index) => {
          if (data.length === this.viewData.length) {
            data[index].combn = item.combn;
            data[index].slno = item.slno;
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
    this.viewData = this.screen.mapComboList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.mapComboList.length / this.paginator.pageSize);
    this.calculatePageArray(this.previousPageValue);
    this.updatedTableData = [];
    this.isTableConstructed = false;
    this.isModified = false;
  }

  /**
   * Event action ClearEventClick
   */
  async ClearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.container = await this.operAuthCombServiceFreshMap_125(this.container).toPromise();
    this.screen = this.container.screenBean;
    this.common = this.container.dfhCommArea;
    this.viewData = this.screen.mapComboList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.mapComboList.length / this.paginator.pageSize);
    this.inputTable.tableFormGroup.reset();
    this.updatedTableData = [];
    this.isTableConstructed = false;
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async EnterEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.calculatePageArray(this.paginator.currentPage);
    this.tempMapComo = {
      mapCombos: this.tableDataMapCombo
    };
    this.container.screenBean.mapCombos = this.tempMapComo;
    this.tableMapComboList = this.tableDataMapCombo;
    this.container.screenBean.mapComboList = this.tableMapComboList;

    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.container = await this.operAuthCombServiceReply_025(this.container).toPromise();
      this.screen = this.container.screenBean;
      this.common = this.container.dfhCommArea;
      if (this.screen.scmsg) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screen.scmsg, opAuthCombVerifyMsg);
      }
      if (this.container.workStorage.trnCompleted === 'Y') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.resetState();
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
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

  /**
   * Event action F1EventClick
   */
  async F1EventClick(): Promise<boolean> {
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.container = await this.operAuthCombServiceReturn_050(this.container).toPromise();
    this.screen = this.container.screenBean;
    this.common = this.container.dfhCommArea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Back end calls return_050
   */
  private operAuthCombServiceReturn_050(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operauthcomb/operauthcombservice/return_050', JSON.stringify(container), options);

  }

  private tableColumnWidth(): void {
    const header0 = document.getElementById('header0');
    if (header0) {
      header0.style.width = '100px';
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
   * Back end calls freshMap_125
   */
  private operAuthCombServiceFreshMap_125(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operauthcomb/operauthcombservice/freshmap_125', JSON.stringify(container), options);

  }

  /**
   * Back end calls onLoad
   */
  private operAuthCombServiceOnLoad(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operauthcomb/operauthcombservice/onload', JSON.stringify(common), options);

  }

  /**
   * Back end calls reply_025
   */
  private operAuthCombServiceReply_025(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/operauthcomb/operauthcombservice/reply_025', JSON.stringify(container), options);

  }

  private mapData(): Observable<MapCombo[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      map(data => {
        return data.rows.map(results => {
          return {
            combn: results['combn'],
            proc: results['proc'],
            state: results['state'],
            plan: results['plan'],
            tos: results['tos'],
            startd: results['startd'],
            endd: results['endd'],
            cau: results['cau'],
            acep: results['acep'],
            slno: results['slno']
          };
        });
      })
    );
  }
}

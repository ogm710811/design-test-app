import {HttpClient} from '@angular/common/http';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  Dfhcommarea,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TableComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {filter, map} from 'rxjs/operators';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {MCombos} from './model/mcombos.model';
import {Rpdma78} from './model/rpdma78.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltycomb::setqltycomb::setqltycomb
 */
@Component({
  selector: 'fox-set-quality-comb-maint',
  templateUrl: './set-quality-combination-maintenance.component.html',
  styleUrls: ['./set-quality-combination-maintenance.component.css']
})
export class SetQualityCombinationComponent implements OnInit, AfterViewChecked {
  screen = new Rpdma78();
  container = new Container();
  common = new Dfhcommarea();

  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  @ViewChild('inputTable') inputTable: TableComponent;
  data: any;
  viewData: MCombos[] = [];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  previousPage = 0;
  isModified = false;
  pageSizeDropdownOption = [10, 20, 30];
  updatedTableData: MCombos[] = [];
  tableDataMapCombo: MCombos[] = [];
  tempMapComo;
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
      key: 'mlineNo',
      headerText: 'Line #',
      sortKey: 'mlineNo',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'mpercent',
      headerText: 'Percent',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'mstate',
      headerText: 'State',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'mplan',
      headerText: 'Plan',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'mtos',
      headerText: 'TOS',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'mstartDate',
      headerText: 'Start Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'mendDate',
      headerText: 'End Date',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'fox-date'
    },
    {
      key: 'mcaution',
      headerText: 'Caution',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    },
    {
      key: 'maccCode',
      headerText: 'Acceptability Code',
      sortKey: null,
      border: false,
      kind: TableColumnKind.Input,
      inputType: 'text'
    }
  ];
  inputColumnsReadOnly: any[] = [
    {
      key: 'mlineNo',
      headerText: 'Line #',
      sortKey: 'mlineNo',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'mpercent',
      headerText: 'Process',
      sortKey: 'mpercent',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'mstartDate',
      headerText: 'State',
      sortKey: 'mstartDate',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'mplan',
      headerText: 'Plan',
      sortKey: 'mplan',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'mtos',
      headerText: 'TOS',
      sortKey: 'mtos',
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
      key: 'mendDate',
      headerText: 'End Date',
      sortKey: 'mendDate',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'fox-date'
    },
    {
      key: 'mcaution',
      headerText: 'Caution',
      sortKey: 'mcaution',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    },
    {
      key: 'maccCode',
      headerText: 'Acceptability Code',
      sortKey: 'maccCode',
      border: false,
      kind: TableColumnKind.Text,
      inputType: 'text'
    }
  ];

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private opMaintenance: OpMaintenanceService,
                     public pageHeaderService: PageHeaderService) {

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
    this.setQltyCombServiceOnLoad(this.common).subscribe(res => {
      this.container = res;
      data = this.transferSrv.getData();
      this.screen = this.container.screenBean;
      this.common = this.container.dfhCommArea;
      this.tableDataMapCombo = this.screen.mcombosList;
      this.viewData = this.screen.mcombosList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screen.mcombosList.length / this.paginator.pageSize);
      this.isReadOnly = (this.screen.m78titl === 'UPDATE');
      this.inputColumns = this.isReadOnly ? this.inputColumnsEditable : this.inputColumnsReadOnly;
      this.pageHeaderService.customTitle = 'Set Quality Operator Combinations ' + this.titleCase(this.screen.m78titl);

    });
  }

  ngAfterViewChecked(): void {
    if (this.inputTable && !this.isModified) {
      this.isModified = true;
      this.mapData().subscribe(data => {
        this.updatedTableData = data;
        this.updatedTableData = this.viewData.map((item, index) => {
          if (data.length === this.viewData.length) {
            data[index].mlineNo = item.mlineNo;
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

  get dataLengthInput(): number {
    return (!!this.container) ? ((!!this.screen.mcombosList) ? this.screen.mcombosList.length : 0) : 0;
  }

  calculateNewPage(): void {
    if (this.currentPageValue !== this.previousPageValue) {
      this.previousPageValue = this.currentPageValue;
    }
    this.currentPageValue = this.paginator.currentPage;
    this.viewData = this.screen.mcombosList.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.mcombosList.length / this.paginator.pageSize);
    this.calculatePageArray(this.previousPageValue);
    this.updatedTableData = [];
    this.isTableConstructed = false;
    this.isModified = false;
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
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.setQltyCombServiceShowFreshMap_1000(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.screenBean;
      this.common = this.container.dfhCommArea;

    });
    this.inputTable.tableFormGroup.reset();
    this.updatedTableData = [];
    this.isTableConstructed = false;
  }

  /**
   * Event action EnterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.calculatePageArray(this.paginator.currentPage);
    this.tempMapComo = {
      mapCombos: this.tableDataMapCombo
    };
    this.container.screenBean.mcomboTable = this.tempMapComo;
    this.container.screenBean.mcombosList = this.tempMapComo.mapCombos;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.container = await this.setQltyCombServiceMainRun_2100(this.container).toPromise();
      this.screen = this.container.screenBean;
      this.common = this.container.dfhCommArea;
      if (this.container.workStorage.trnCompleted === 'Y') {
        this.buttonStatus = ButtonStatus.SUBMIT;
        this.resetState();
        data = this.transferSrv.getData();
        data['common'] = this.common;
        this.router.navigate(['/dashboard/operator-file']);
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
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

  /**
   * Event action PF1EventClick
   */
  f1EventClick(): void {
    let data: any = undefined;
    this.container.screenBean = this.screen;
    this.container.dfhCommArea = this.common;
    this.setQltyCombServiceCancel_0050(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.screenBean;
      this.common = this.container.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/dashboard/operator-file']);
    });

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

  /**
   * Back end calls mainRun_2100
   */
  private setQltyCombServiceMainRun_2100(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltycomb/setqltycombservice/mainrun_2100', JSON.stringify(container), options);

  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls showFreshMap_1000
   */
  private setQltyCombServiceShowFreshMap_1000(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltycomb/setqltycombservice/showfreshmap_1000', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel_0050
   */
  private setQltyCombServiceCancel_0050(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltycomb/setqltycombservice/cancel_0050', JSON.stringify(container), options);

  }

  /**
   * Back end calls onLoad
   */
  private setQltyCombServiceOnLoad(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltycomb/setqltycombservice/onload', JSON.stringify(common), options);

  }

  private mapData(): Observable<MCombos[]> {
    return this.inputTable.tableFormGroup.valueChanges.pipe(
      filter((data: object): data is {rows: Array<any>} => {
        return data.hasOwnProperty('rows');
      }),
      map((data: {rows: Array<any>}) => {
        return data.rows.map(results => {
          return {
            mlineNo: results['mlineNo'],
            mpercent: results['mpercent'],
            mstate: results['mstate'],
            mplan: results['mplan'],
            mtos: results['mtos'],
            mstartDate: results['mstartDate'],
            mendDate: results['mendDate'],
            mcaution: results['mcaution'],
            maccCode: results['maccCode']
          };
        });
      })
    );
  }
}

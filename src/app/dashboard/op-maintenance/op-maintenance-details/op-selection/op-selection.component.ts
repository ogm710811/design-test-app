import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorAuthComb,
  dashboardRoutePathOperatorAuthLimit,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathOperatorInfo,
  dashboardRoutePathOperatorSetQuality,
  dashboardRoutePathOperatorTransSecurityOne,
  dashboardRoutePathRoot,
  dashboardRoutePathSetQualityCombinationMaintenance,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {PageHeaderService} from '@fox/shared';
import {OpMaintenanceService} from '@fox/shared';
import {opSelectionVerifyMsg} from '../../operator-maintenance.constants';
import {Container} from './model/container.model';
import {Rpdma71} from './model/rpdma71.model';

@Component({
  selector: 'fox-operator-selection',
  templateUrl: './op-selection.component.html',
  styleUrls: ['./op-selection.component.css']
})

export class OperatorSelectionComponent implements OnInit {

  screen = new Rpdma71();
  common = new Dfhcommarea();
  container = new Container();
  buttonStatus: string = ButtonStatus.SUBMIT;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  lineNumber: any[];
  tableColumnCurrentSortKey: string;
  tableColumnCurrentSortDirection: any;
  isWorking: boolean = false;
  viewData: any;
  pageTotal = 0;
  pageSizeSelected = 15;
  currentPage = 0;
  pageSizeDropdownOption = [15];
  dataObject: any;
  displayedColumns = [
    {
      key: 'lineNumber',
      headerText: 'Line #',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'lineNumber'
    },
    {
      key: 'm71namet',
      headerText: 'Name',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'm71namet'
    },
    {
      key: 'm71ionst',
      headerText: 'IONS ID',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'm71ionst'
    },
    {
      key: 'm71loct',
      headerText: 'Location',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'm71loct'
    },
    {
      key: 'm71post',
      headerText: 'Position',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'm71post'
    },
    {
      key: 'selectUser',
      headerText: 'Action',
      kind: TableColumnKind.Link,
      border: false,
      sortKey: 'selectUser'
    }
  ];

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.rpdma71ts) ? this.screen.rpdma71ts.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     public pageHeaderService: PageHeaderService,
                     protected opMaintenance: OpMaintenanceService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.operSelectionServiceMainProc(this.common).toPromise();
    this.screen = container.rpdma71;
    this.common = container.dfhCommonArea;
    this.dataObject = this.screen.rpdma71ts;
    this.dataObject = this.dataObject.map((item, index) => {
      item.selectUser = 'Select User';
      item.lineNumber = index + 1;
      return item;
    });
    if (this.screen && this.dataObject) {
      this.viewData = this.dataObject;

      this.viewData = this.dataObject.slice(this.paginator.currentPage * this.paginator.pageSize,
        (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.dataObject.length / this.paginator.pageSize);
    }
    if (this.screen.m71erra.trim() !== '') {
      this.messageBoxService.addMessageBox(this.screen.m71erra, MessageBoxType.ERROR, '');
    }
    this.pageHeaderService.customTitle = 'Operator File Selection';
    return true;
  }

  calculateNewPage(): void {
    this.viewData = this.dataObject.slice(this.paginator.currentPage * this.paginator.pageSize,
      (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.rpdma71ts.length / this.paginator.pageSize);
  }

  /**
   * Event action ClearEventClick
   */
  async ClearEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let container = new Container();
    const common = new Dfhcommarea();
    const rpdma71 = new Rpdma71();

    container.rpdma71 = this.screen;

    container.dfhCommonArea = this.common;
    container = await this.operSelectionServiceClearKey(container).toPromise();
    this.screen = container.rpdma71;
    this.common = container.dfhCommonArea;
    return true;
  }

  /**
   * Event action EnterEventClick
   */
  async EnterEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let container = new Container();
    const common = new Dfhcommarea();
    const rpdma71 = new Rpdma71();
    let data: any = undefined;
    container.rpdma71 = this.screen;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      container.dfhCommonArea = this.common;
      container.rpdma71.m71seli = this.getSelectedIndex();
      container = await this.operSelectionServiceProcessSelection(container).toPromise();
      this.screen = container.rpdma71;
      this.common = container.dfhCommonArea;

      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.m71erra) {
        this.buttonStatus = ButtonStatus.FAILED;
        this.messageBoxService.addMessageBox(this.screen.m71erra, MessageBoxType.ERROR, '');
      }
      if (container.workStorage.program === 'RPD05O72') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorInfo]);
      }
      if (container.workStorage.program === 'RPD05O73') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
      }
      if (container.workStorage.program === 'RPD05O74') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthComb]);
      }

      if (container.workStorage.program === 'RPD05O77') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorSetQuality]);
      }

      if (container.workStorage.program === 'RPD05O78') {
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathSetQualityCombinationMaintenance]);

        this.messageBoxService.reset();
        container = new Container();
        container.rpdma71 = this.screen;
        container.dfhCommonArea = this.common;
        container = await this.operSelectionServiceProcessSelection(container).toPromise();
        this.screen = container.rpdma71;
        this.common = container.dfhCommonArea;
        if (this.screen.scmsg) {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.opMaintenance.displayMessageBox(this.screen.scmsg, opSelectionVerifyMsg);
        }

        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (this.screen.m71erra) {
          this.buttonStatus = ButtonStatus.FAILED;
          this.messageBoxService.addMessageBox(this.screen.m71erra, MessageBoxType.ERROR, '');
        }

        if (container.workStorage.program === 'RPD05O72') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorInfo]);
        }

        if (container.workStorage.program === 'RPD05O73') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthLimit]);
        }

        if (container.workStorage.program === 'RPD05O74') {
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorAuthComb]);
        }

        if (container.workStorage.program === 'RPD05O77') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorSetQuality]);
        }

        if (container.workStorage.program === 'RPD05O78') {
        }

        if (container.workStorage.program === 'RPD05O70') {
          this.buttonStatus = ButtonStatus.SUCCESS;
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorTransSecurityOne]);
        }
        this.buttonStatus = ButtonStatus.FAILED;
      }
    } catch (err) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.messageBoxService.addMessageBox(err.statusText, MessageBoxType.ERROR, '');
    }
    return true;
  }

  /**
   * Event action F1EventClick
   */
  async F1EventClick(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    const rpdma71 = new Rpdma71();
    let data: any = undefined;
    container.rpdma71 = this.screen;

    container.dfhCommonArea = common;
    container = await this.operSelectionServiceCancelBrowse(container).toPromise();
    this.screen = container.rpdma71;
    this.common = container.dfhCommonArea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Event action F4EventClick
   */

  async F4EventClick(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    const rpdma71 = new Rpdma71();

    container.rpdma71 = this.screen;
    container.dfhCommonArea = common;
    container = await this.operSelectionServicePf4Browse(container).toPromise();
    this.screen = container.rpdma71;
    this.common = container.dfhCommonArea;
    return true;
  }

  getPageEvent($event): number {

    this.screen.pageNo = $event + 1;

    return this.screen.pageNo;
  }

  getSelectedIndex(): string {
    return ((Number(this.screen.m71seli) % this.pageSizeSelected) || this.pageSizeSelected).toString();
  }

  linkClicked(linkData): void {
    const rowIdentifier = linkData && linkData.col && linkData.col.key;
    const ions = linkData && linkData.data && linkData.data.m71ionst;
    switch (rowIdentifier) {
      case 'selectUser':
        this.viewData.lineNumber = linkData.index;
        this.screen.m71seli = (this.viewData.lineNumber + 1).toString();
        this.EnterEventClick();
        break;
      case 'm71ionst':
        this.router.navigate([dashboardRoutePathOperatorFile, ions]);
        break;
    }
  }

  /**
   * Back end calls pf4Browse
   */
  private operSelectionServicePf4Browse(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operselection/operselectionservice/pf4browse', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancelBrowse
   */
  private operSelectionServiceCancelBrowse(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operselection/operselectionservice/cancelbrowse', JSON.stringify(container), options);

  }

  /**
   * Back end calls clearKey
   */
  private operSelectionServiceClearKey(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operselection/operselectionservice/clearkey', JSON.stringify(container), options);
  }

  /**
   * Back end calls processSelection
   */
  private operSelectionServiceProcessSelection(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operselection/operselectionservice/processselection', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProc
   */
  private operSelectionServiceMainProc(dfhComm: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/operselection/operselectionservice/mainproc', JSON.stringify(dfhComm), options);

  }
}

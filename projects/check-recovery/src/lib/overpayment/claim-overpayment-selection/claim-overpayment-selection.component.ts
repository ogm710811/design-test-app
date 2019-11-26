import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  checkRecoveryRoutePathOverpaymentSelection,
  claimProcessingUrlPrefixClaimDetails,
  Claimprocsysmenu,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  PageHeaderService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {ClaimTable} from '../model/claim-table.model';
import {Clmovpaysel} from '../model/clmovpaysel.model';
import {OvpaymentCommonArea} from '../model/ovpayment-common-area.model';
import {ClaimOverpaymentSelectionSubtitleComponent} from './claim-overpayment-selection-subtitle';
import {Container} from './model/container.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::clmovpaysel::clmovpaysel::ClmOvpaySel
 */
@Component({
  selector: 'fox-claim-overpayment-selection',
  templateUrl: './claim-overpayment-selection.component.html',
  styleUrls: ['./claim-overpayment-selection.component.css']
})
export class ClaimOverpaymentSelectionComponent implements OnInit {
  screenBean = new Clmovpaysel();
  common = new OvpaymentCommonArea();
  claimprocsysmenu = new Claimprocsysmenu();
  isWorking: boolean = false;

  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  url: string = '../' + checkRecoveryRoutePathOverpaymentSelection;
  viewData: any[] = [];
  pageSizeSelected: number = 10;
  dataLengthInput: number = 0;
  pageTotal: number = 0;
  currentPage = 0;
  tableColumnCurrentSortKey: string = '';
  tableColumnCurrentSortDirection: string = '';
  overpaymentResult: ClaimTable[] = [];
  displayedColumns = [
    {
      key: 'm14selc',
      headerText: 'Line #',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'm14selc'
    },
    {
      key: 'm14clm',
      headerText: 'Claim #',
      kind: TableColumnKind.Link,
      border: false,
      preImage: 'claim-blue.svg',
      sortKey: 'm14clm'
    },
    {
      key: 'm14dte',
      headerText: 'Discovery Date',
      kind: TableColumnKind.Date,
      border: false,
      sortKey: 'm14dte'
    },
    {
      key: 'status',
      headerText: 'Status',
      kind: TableColumnKind.IconItem,
      border: false,
      sortKey: 'status'
    },
    {
      key: 'm14amt',
      headerText: 'Overpayment Amount',
      kind: TableColumnKind.Currency,
      border: false,
      sortKey: 'm14amt'
    },
    {
      key: 'viewDetails',
      headerText: 'Action',
      kind: TableColumnKind.Link,
      border: false
    }
  ];

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private modalService: ModalService,
    public pageHeaderService: PageHeaderService,
    private messageBoxService: MessageBoxService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['command']) {
        this.modalService.routeValidationModalVisible = false;
      }
      if (params['claimNumber'] || params['memberid']) {
        this.claimprocsysmenu.claimNo = params['claimNumber'];
        this.claimprocsysmenu.membershipId = params['memberid'];
        let container = new Container();
        const screen = new Clmovpaysel();
        let data: any = undefined;
        data = this.transferSrv.getData();
        this.common = data['common'];
        this.common = this.common === undefined ? new OvpaymentCommonArea() : this.common;
        this.claimProcSysMenuServiceLoadOverpayCommonArea(this.claimprocsysmenu).subscribe(res => {
          this.common = res;
          this.clmOvpaySelServiceInitilization(this.common).subscribe(resp => {
            container = resp;
            data = this.transferSrv.getData();
            this.screenBean = container.screen;
            this.screenBean.claimTable = this.screenBean.claimTable.map(item => {
              item.status = [];
              item.status[0] = item.m14st === 'U' ? 'deny-red.svg' : 'confirm-green.svg';
              item.status[1] = item.m14st === 'U' ? 'Unresolved' : 'Resolved';
              item.viewDetails = 'View Details';
              return item;
            });
            this.common = container.commonArea;
            this.calculateNewPage();
          });
        });
      }
    });
    this.pageHeaderService.customTitle = 'Overpayment Selection';
    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      ClaimOverpaymentSelectionSubtitleComponent,
      {memberName: '', account: this.claimprocsysmenu.membershipId},
      this.componentFactoryResolver,
      this.injector
    );
  }

  linkClicked(linkData: any): void {
    const rowIdentifier = linkData && linkData.col && linkData.col.key;
    const claimNumber = linkData && linkData.data && linkData.data.m14clm;
    switch (rowIdentifier) {
      case 'viewDetails':
        this.screenBean.m14sel = linkData.index;
        this.enterEventClick();
        break;
      case 'm14clm':
        this.router.navigate([claimProcessingUrlPrefixClaimDetails, claimNumber]);
        break;
    }
  }

  enterKeyUpEventClick(): void {
    if (!this.screenBean.m14sel) {
      return;
    }
    let container = new Container();
    let data: any = undefined;
    this.isWorking = true;
    container.screen = this.screenBean;
    container.commonArea = this.common;
    this.transferSrv.set('common', this.common);

    this.clmOvpaySelServiceProcessTrans(container).subscribe(resp => {
      container = resp;
      if ('' === container.screen.m14err1) {
        data = this.transferSrv.getData();
        this.screenBean = container.screen;
        this.common = container.commonArea;
        data['common'] = this.common;
        this.router.navigate(['/check-recovery/add-edit-overpayment']);
      } else {
        this.screenBean = container.screen;
        this.common = container.commonArea;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, container.screen.m14err1);
      }
      this.isWorking = false;
    });

  }

 enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.isWorking = true;
    container.screen = this.screenBean;
    container.commonArea = this.common;
    this.transferSrv.set('common', this.common);

    this.clmOvpaySelServiceProcessTrans(container).subscribe(resp => {
      container = resp;
      if ('' === container.screen.m14err1) {
        data = this.transferSrv.getData();
        this.screenBean = container.screen;
        this.common = container.commonArea;
        data['common'] = this.common;
        this.router.navigate(['/check-recovery/add-edit-overpayment']);
      } else {
        this.screenBean = container.screen;
        this.common = container.commonArea;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, container.screen.m14err1);
      }
      this.isWorking = false;
    });

  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.overpaymentResult = this.screenBean.claimTable.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.dataLengthInput = this.screenBean.claimTable.length;
      this.pageTotal = Math.ceil(this.dataLengthInput / this.paginator.pageSize);
    }
  }

  /**
   * Back end calls initilization
   */
  private clmOvpaySelServiceInitilization(commonArea: OvpaymentCommonArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/clmovpaysel/clmovpayselservice/initilization', JSON.stringify(commonArea), options);

  }

  private clmOvpaySelServiceProcessTrans(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/clmovpaysel/clmovpayselservice/processTrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls loadOverpayCommonArea
   */
  private claimProcSysMenuServiceLoadOverpayCommonArea(screen: Claimprocsysmenu): Observable<OvpaymentCommonArea> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<OvpaymentCommonArea>('/api/overpayment/services/claimprocsysmenu/claimprocsysmenuservice/loadoverpaycommonarea', JSON.stringify(screen), options);

  }

}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MemberApi} from '@fox/rest-clients';
import {
  DateFormatService,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  PaginatorNonMaterialComponent,
  TableColumnKind,
  TransferSrvService
} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {HeaderSubtitleItem} from '@fox/shared';
import {PageHeaderService} from '@fox/shared';
import {ProcessClaimSubheaderComponent} from '@fox/shared';
import {Container} from './model/container.model';
import {RvwCmnctHistCommonArea} from './model/rvw-cmnct-hist-common-area.model';
import {RvwCmnctHist} from './model/rvw-cmnct-hist.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwcmncthist::rvwcmncthist::rvwcmncthist
 */
@Component({
  selector: 'fox-list-communication',
  templateUrl: './list-communication.component.html',
  styleUrls: ['./list-communication.component.css']
})
export class ListCommunicationComponent implements OnInit, AfterViewChecked {
  screen = new RvwCmnctHist();
  reviewCommArea = new RvwCmnctHistCommonArea();
  memberId: string = '';

  @Input() isIndividualSelected: boolean = false;
  @ViewChild(PaginatorNonMaterialComponent) paginator?: PaginatorNonMaterialComponent;
  viewData: any[] = [];
  dataLengthInput = 0;
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  columns: any = {};
  tableData: TableData[] = [];
  results: TableData[] = [];
  tableDataSortKey: string = '';
  tableDataDirection: string = '';
  isTableConstructed = false;
  isHeaderOn = false;
  memberName: string = '';
  accountNumb: string = '';
  dateOfBirth: string = '';
  continueStatus = 'Submit';
  plans = '';

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private requestDate: DateFormatService,
    private messageBoxService: MessageBoxService,
    private pageHeaderService: PageHeaderService,
    private modalService: ModalService,
    private memberSvc: MemberApi,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let validMember = false;
    // the modal service call to be removed once error page is enabled
    this.modalService.routeValidationModalVisible = false;
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['memberid']) {
        this.memberId = params['memberid'];
        let param: NavigationExtras = {};
        const destination = 'invalid-params';
        param = {
          queryParams: {
            memberid: this.memberId,
            fromUrl: this.router.url
          }
        };
        if (this.memberId.length === 9) {
          this.memberSvc.getMemberByNineDigitAccountNumber(this.memberId, uuid()).subscribe(searchResult => {
            if (searchResult) {
              validMember = true;
              this.onLoadAction();
            } else {
              /*this.onLoadAction to be removed once error navigation is enabled
              this.routeToErrorPage(destination, param );*/
              this.onLoadAction();
            }
          }, e => {
            /*this.onLoadAction to be removed once error navigation is enabled
             this.routeToErrorPage(destination, param );*/
            this.onLoadAction();
          });
        } else {
          this.memberSvc.getMemberByMemberNumber(this.memberId, uuid()).subscribe(searchResult => {
            if (searchResult) {
              this.onLoadAction();
            } else {
              /*this.onLoadAction to be removed once error navigation is enabled
             this.routeToErrorPage(destination, param );*/
              this.onLoadAction();
            }
          }, e => {
            /*this.onLoadAction to be removed once error navigation is enabled
             this.routeToErrorPage(destination, param );*/
            this.onLoadAction();
          });
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isTableConstructed) {
      this.tableColumnWidth();
    }
    const sticky = document.getElementsByClassName('column-sticky');
    // @ts-ignore
    if (sticky && sticky[1] && sticky[1]['style'].width === '87px') {
      this.isTableConstructed = true;
    } else {
      this.isTableConstructed = false;
    }

    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Review Communication History';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: this.memberName,
          account: this.accountNumb,
          dateOfBirth: this.dateOfBirth,
          plans: this.plans
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }

  }

  navigateTo(event: any): void {
    this.screen.m40sel = event.data['Line #'];
    this.btnLabel1EventClick();
  }

  onLoadAction(): void {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.reviewCommArea = data['reviewCommArea'];
    this.reviewCommArea = this.reviewCommArea === undefined ? new RvwCmnctHistCommonArea() : this.reviewCommArea;

    if (this.memberId !== '') {
      this.reviewCommArea.memberId = this.memberId;
    }

    this.rvwCmnctHistServiceSetUpCorresTable(this.reviewCommArea).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.reviewCommArea = container.commonArea;
      this.transferSrv.set('reviewCommArea', this.reviewCommArea);
      this.memberName = this.screen.m40name;
      this.accountNumb = this.screen.m40mid;
      this.dateOfBirth = this.screen.m40dob ? this.screen.m40dob : 'XX/XX/XXXX';

      const plansArr = [
        this.screen.m40pl1,
        this.screen.m40pl2,
        this.screen.m40pl3,
        this.screen.m40pl4,
        this.screen.m40pl5,
        this.screen.m40pl6,
        this.screen.m40pl7,
        this.screen.m40pl8
      ];

      plansArr.forEach(result => {
        this.plans += (result && result.length > 0) ? result + ', ' : '';
      });

      this.plans = this.plans.length > 2 ? this.plans.slice(0, -2) : '';

      this.plans = (this.plans && this.plans.length > 0) ? this.plans : 'N/A';

      if (!this.isIndividualSelected && this.paginator) {
        this.dataLengthInput = this.screen.mapLines.length;
        this.viewData = this.screen.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);

        this.setTableData();
        this.columns = Object.keys(this.tableData[0]).map((column, index) => {
          return {
            key: column,
            header: column,
            border: false,
            sortKey: (index === 0 || index === 1 || index === 2 || index === 3) ? column : null,
            kind: (column === 'Action') ? TableColumnKind.Link : TableColumnKind.Text
          };
        });
        this.results = this.tableData;
        this.tableDataSortKey = this.columns[0].sorKey;
        this.tableDataDirection = 'ASC';

        this.pageTotal = Math.ceil(this.screen.mapLines.length / this.paginator.pageSize);
      }
      this.screen.m40dob = this.screen.m40dob ? moment(this.screen.m40dob).format('MM/DD/YYYY') : '';
    });
  }

  routeToErrorPage(destination: string, param: NavigationExtras): void {
    this.router.navigate([destination], param);
  }

  /**
   * Event action EndReviewEventClick
   */
  endReviewEventClick(): void {
    let container = new Container();

    container.commonArea = this.reviewCommArea;
    container.screenbean = this.screen;
    this.rvwCmnctHistServiceEndReview(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.reviewCommArea = container.commonArea;
    });

  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    let container = new Container();

    container.commonArea = this.reviewCommArea;
    container.screenbean = this.screen;
    this.rvwCmnctHistServiceScreenData(container).subscribe(resp => {
      container = resp;
      this.screen = container.screenbean;
      this.reviewCommArea = container.commonArea;
    });

  }

  btnLabel1EventClick(): void {
    this.continueStatus = 'Working...';
    if (this.dataLengthInput < +this.screen.m40sel || +this.screen.m40sel < 1) {
      const message = (this.screen.m40sel === '') ? 'Select Line # cannot be empty' : 'The selection number must be on the list';
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, message);
      this.continueStatus = 'Failed';
      this.resetState();
    } else if (this.screen.m40sel !== '') {
      let data: any = undefined;
      this.reviewCommArea.comComm.bmScreenInd = this.screen.m40sel;
      const index: number = Number(this.screen.m40sel) - 1;
      const tempObj = this.tableData[index];
      const commNumber = tempObj['Date - Sequence #'].replace(/[\W_]/g, '');
      data = this.transferSrv.getData();
      data['reviewCommArea'] = this.reviewCommArea;
      this.router.navigate(['/communication/communication-rev'], {
        queryParams: {
          command: 'RC',
          commId: commNumber
        }
      });
      this.setSuccess();
    }
  }

  calculateNewPage(): void {
    if (this.paginator) {
      this.viewData = this.screen.mapLines.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.setTableData();
      this.results = this.tableData;
      this.pageTotal = Math.ceil(this.screen.mapLines.length / this.paginator.pageSize);
    }
  }

  private setSuccess(): void {
    this.continueStatus = 'Success!';
    this.resetState();
  }

  private resetState(): void {
    setTimeout(() => {
      this.continueStatus = 'Submit';
    }, 2500);
  }

  private setTableData(): void {
    this.tableData = this.viewData.map((result) => {
      const dateSecuence = result['correso'] === '' ? '' : result['correso'].split('-');
      return {
        'Line #': result['numbero'],
        'Date - Sequence #': dateSecuence.length === 0 ? '' : this.requestDate.getFormatedDate(dateSecuence[0]) + ' - ' + dateSecuence[1],
        Status: result['stato'],
        Concern: result['concCds'] ? result['concCds']['conco'] : '',
        Resolution: result['reslo'],
        Action: 'View Communication'
      };
    });
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
        // @ts-ignore
        stickyCells[i]['style'].width = numbWidth;
        // @ts-ignore
        stickyCells[i]['style'].paddingLeft = '20px';

      } else {
        // @ts-ignore
        stickyCells[i]['style'].width = numbWidth;
        // @ts-ignore
        stickyCells[i]['style'].height = '71px';
        // @ts-ignore
        stickyCells[i]['style'].paddingLeft = '20px';
      }
    }

    const sve = document.getElementsByClassName('table-scroller-vertical');
    if (sve && sve.length > 0) {
      // @ts-ignore
      sve[0]['style'].marginLeft = '86px';
    }

    const containerTable = document.getElementsByClassName('container-table');
    if (containerTable[0]) {
      // @ts-ignore
      containerTable[0]['style'].overflow = 'hidden';
    }
  }

  /**
   * Back end calls setUpCorresTable
   */
  private rvwCmnctHistServiceSetUpCorresTable(common: RvwCmnctHistCommonArea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/rvwcmncthist/rvwcmncthistservice/setupcorrestable', JSON.stringify(common), options);

  }

  /**
   * Back end calls endReview
   */
  private rvwCmnctHistServiceEndReview(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/rvwcmncthist/rvwcmncthistservice/endreview', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private rvwCmnctHistServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/rvwcmncthist/rvwcmncthistservice/screendata', JSON.stringify(container), options);

  }
}

interface TableData {
  Status: any;
  Action: string;
  Concern: string;
  'Line #': any;
  'Date - Sequence #': any;
  Resolution: any;
}

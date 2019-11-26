import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CommunicationCommarea,
  HeaderSubtitleItem,
  ModalService,
  PageHeaderService,
  ProcessClaimSubheaderComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Endcmnct} from '../comm-info/end-communication/model/endcmnct.model';
import {Rpd07O41Container} from '../comm-info/end-communication/model/rpd07-o41-container.model';
import {Container} from './model/container.model';
import {DelCmnct} from './model/del-cmnct.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::delcmnct::delcmnct::delcmnct
 */
@Component({
  selector: 'fox-delete-communication',
  templateUrl: './delete-communication.component.html',
  styleUrls: ['./delete-communication.component.css']
})
export class DeleteCommunicationComponent implements OnInit, AfterViewChecked {
  screen = new DelCmnct();
  screenModal = new Endcmnct();
  common = new CommunicationCommarea();
  commId: string = '';
  isHeaderOn = false;
  deleteCommunicationCardTitle: string = 'Delete Communication';
  deleteCommunicationCardSubTitle: string = 'Press Delete button again to confirm communication delete or Cancel button to cancel.';
  address: string = '';
  // Modal
  @Input() endCommunicationVisible: boolean = false;
  @Output() cancelEndCommModal: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private modalService: ModalService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['commId']) {
        this.commId = params['commId'];
      }
    });

    let container = new Container();
    let data: any = undefined;
    let rpd07O41container = new Rpd07O41Container();

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new CommunicationCommarea() : this.common;

    this.common.comcomm.command = 'CD';
    this.common.comcomm.commNumber = +this.commId;

    this.commControlEndCommServiceMainOperation(this.common).subscribe(resp => {
      rpd07O41container = resp;

      if (rpd07O41container.commonArea.comcomm.command === 'CD') {
        this.common = rpd07O41container.commonArea;
        data = this.transferSrv.getData();
        data['commom'] = this.common;
      }
      this.delCmnctServiceMainProcedure(this.common).subscribe(res => {
        container = res;
        this.screen = container.screen;
        this.screen.m9ename = this.getScrubbedString(this.screen.m9ename);
        this.address = this.getScrubbedString(this.screen.m9eadd1) + ', ' + this.getScrubbedString(this.screen.m9ecszp);
        this.common = container.commonArea;
        data = this.transferSrv.getData();
      });

    });
    this.modalService.routeValidationModalVisible = false;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Communication Delete';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: this.screen.m9ename,
          account: this.screen.m9emem1 + ' ' + this.screen.m9emem2 + ' ' + this.screen.m9emem3,
          communication: this.screen.m9ecom1 + '-' + this.screen.m9ecom2
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }

  }

  getScrubbedString(val: string): string {
    return val.replace(/\s+/g, ' ').split(',').map(i => i.trim()).join(', ');
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let rpd07O41container = new Rpd07O41Container();

    container.screen = this.screen;
    container.commonArea = this.common;
    this.delCmnctServiceProcessRequest(container).subscribe(resp => {
      container = resp;
      this.screen = container.screen;
      this.common = container.commonArea;

      this.commControlEndCommServiceMainOperation(this.common).subscribe(res => {
        rpd07O41container = res;
        this.screenModal = rpd07O41container.rpdmb55;
        this.endCommunicationVisible = true;
      });
    });
  }

  onCancelModal($event: any): void {
    if ($event === 'closed') {
      this.router.navigate(['/communication/communication-list']);
    }
  }

  /**
   * Back end calls processRequest
   */
  private delCmnctServiceProcessRequest(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/delcmnctservice/delcmnctservice/processrequest', JSON.stringify(container), options);

  }

  /**
   * Back end calls xctlInsuredCancel
   */
  private delCmnctServiceXctlInsuredCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/delcmnctservice/delcmnctservice/xctlinsuredcancel', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcedure
   */
  private delCmnctServiceMainProcedure(commonArea: CommunicationCommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/overpayment/services/delcmnctservice/delcmnctservice/mainprocedure', JSON.stringify(commonArea), options);

  }

  private commControlEndCommServiceMainOperation(commonArea: CommunicationCommarea): Observable<Rpd07O41Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O41Container>('/api/overpayment/services/commcontrolendcomm/commcontrolendcommservice/mainoperation', JSON.stringify(commonArea), options);

  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CommunicationCommarea,
  communicationRoutePathQualityReviewCommInfo,
  communicationRoutePathRoot,
  DateFormatService,
  InputComponent,
  MessageBoxService,
  MessageBoxType,
  ProgressContextService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Rpd07O48Container} from './model/rpd07-o48-container.model';
import {Rpdmb85} from './model/rpdmb85.model';
import {QualityReviewInfoComponent} from './quality-review-info/quality-review-info.component';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::commQltyRvw::commQltyRvw::commqltyrvw
 */
@Component({
  selector: 'fox-quality-review',
  templateUrl: './quality-review.component.html',
  styleUrls: ['./quality-review.component.css']
})
export class QualityReviewComponent implements OnInit {
  qualityDate: string = '';
  continueStatus = 'Submit';
  screen = new Rpdmb85();
  commonCommunication = new CommunicationCommarea();

  // Modal
  @Input() qualityReviewInfoVisible: boolean = false;
  @Output() cancelQualityReviewInfoModal: EventEmitter<'abort'> = new EventEmitter<'abort'>();
  @Output() abortOrConfirmCancellation: EventEmitter<'abort' | 'confirm'> = new EventEmitter<'abort' | 'confirm'>();
  @ViewChild('qualityreviewinfo') qualityreviewinfo?: QualityReviewInfoComponent;
  @ViewChild('qualityDateInput') qualityDateInput?: InputComponent;

  public constructor(
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    protected activatedRoute: ActivatedRoute,
    private messageBoxService: MessageBoxService,
    private dateFormatService: DateFormatService,
    private progressContextService: ProgressContextService
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {

      const rpd07O48Container1 = new Rpd07O48Container();
      let data: any = undefined;
      let rpd07O48Container = new Rpd07O48Container();

      data = this.transferSrv.getData();
      this.commonCommunication = data['commonCommunication'];
      this.commonCommunication = this.commonCommunication === undefined ? new CommunicationCommarea() : this.commonCommunication;
      const res = this.commQltyRvwServiceOperation(this.commonCommunication);
      this.progressContextService.forTag('qr-info').watch(res).subscribe(resp => {
        rpd07O48Container = resp;
        this.screen = rpd07O48Container.rpdmb85;
        this.commonCommunication = rpd07O48Container.commonArea;
        data = this.transferSrv.getData();
        this.qualityDate = this.dateFormatService.getCcyyFormatedDateIE(this.screen.m85qndt);
        if (params['commId']) {
          this.screen.m85cndt = params['commId'];
          this.openDetailQualityReview();
        }
      });

    });
  }

  clear(): void {
    this.screen.m85cndt = '';
    this.screen.m85qndt = '';
    this.screen.m85qnlo = '';
    this.screen.m85qnno = '';
    this.qualityDate = '';
  }

  /**
   * Event action openDetailQualityReview
   */
  openDetailQualityReview(): void {
    let date: any = '';
    if (this.qualityDateInput) {
      date = this.qualityDateInput.value.split('/');
    }
    this.screen.m85qndt = (date.length === 3) ? date[0] + date[1] + ((date[2].length === 4) ? date[2].slice(-2) : date[2]) : date.replace(/\//g, '');
    let rpd07O48Container = new Rpd07O48Container();
    let number: string = '';

    rpd07O48Container.commonArea = this.commonCommunication;
    rpd07O48Container.rpdmb85 = this.screen;
    number = this.screen.m85cndt;
    if (number) {
      rpd07O48Container.rpdmb85.m85cndt = number.substring(0, 6);
      rpd07O48Container.rpdmb85.m85cnno = number.substring(6, 11);
    }
    this.continueStatus = 'Working...';
    this.commQltyRvwServiceFirstComm(rpd07O48Container).subscribe(resp => {
      rpd07O48Container = resp;
      this.screen = rpd07O48Container.rpdmb85;
      this.commonCommunication = rpd07O48Container.commonArea;

      let data: any = undefined;
      data = this.transferSrv.getData();
      data['commonCommunication'] = this.commonCommunication;
      this.transferSrv.set('commonCommunication', this.commonCommunication);

      this.router.navigate([communicationRoutePathRoot, communicationRoutePathQualityReviewCommInfo]);
      rpd07O48Container.rpdmb85.m85cndt = number;
      this.setSuccess();
    }, error1 => {
      this.continueStatus = 'Failed';
      this.resetState();
    });

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

  private pushAlert(message: string): void {
    if (message.includes('QUAL')) {
      this.messageBoxService.addMessageBox('Review Communication', MessageBoxType.SUCCESS, message, 3000);
    } else if (message !== '') {
      this.messageBoxService.addMessageBox('Review Communication', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls operation
   */
  private commQltyRvwServiceOperation(common: CommunicationCommarea): Observable<Rpd07O48Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O48Container>('/api/overpayment/services/commqltyrvwservice/commqltyrvwservice/operation', JSON.stringify(common), options);

  }

  /**
   * Back end calls firstComm
   */
  private commQltyRvwServiceFirstComm(rpd07O48Container: Rpd07O48Container): Observable<Rpd07O48Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O48Container>('/api/overpayment/services/commqltyrvwservice/commqltyrvwservice/firstcomm', JSON.stringify(rpd07O48Container), options);

  }
}

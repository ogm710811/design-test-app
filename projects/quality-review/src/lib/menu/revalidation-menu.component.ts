import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  qualityReviewRoutePathQualityMiscInfo,
  qualityReviewRoutePathQualityMiscInfoQQ,
  qualityReviewRoutePathRoot,
  TransferSrvService
} from '@fox/shared';
import * as momentConst from 'moment';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwRvldMenu} from './model/qlty-rvw-rvld-menu.model';

const moment = momentConst;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyRvwRvldMenu::qltyRvwRvldMenu::qltyRvwRvldMenu
 */
@Component({
  selector: 'fox-revalidation-menu',
  templateUrl: './revalidation-menu.component.html',
  styleUrls: ['./revalidation-menu.component.css']
})
export class RevalidationMenuComponent implements OnInit {
  screenBean = new QltyRvwRvldMenu();
  container = new Container();
  titleQuality = '';
  loadingStatus: string = ButtonStatus.SUBMIT;
  sectionSubtitle: string = '';
  qualityDateLabel: string = '';
  locationLabel: string = '';
  qualityNumberLabel: string = '';
  ionsIDLabel: string = '';

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private activedRoute: ActivatedRoute,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {

    let data: any = undefined;
    let dfhcommarea = new Dfhcommarea();
    this.qualityDateLabel = 'Quality Date';
    this.locationLabel = 'Location';
    this.qualityNumberLabel = 'Quality Number';
    this.ionsIDLabel = 'IONs ID';
    this.loadingStatus = ButtonStatus.SUBMIT;

    this.activedRoute.queryParams.subscribe(params => {

      if (params['claimNumid']) {
        dfhcommarea.commComm.claimNumber = params['claimNumid'];

        if (String(params['command']).toUpperCase() === 'QR') {
          dfhcommarea.commComm.command = 'QR';
        } else if (String(params['command']).toUpperCase() === 'QQ') {
          dfhcommarea.commComm.command = 'QQ';
        }

        dfhcommarea.eibTrnId = 'RPC1';
        dfhcommarea.callingProgram = 'RPD06O75';
        this.transferSrv.set('dfhCommArea', dfhcommarea);
      }

      data = this.transferSrv.getData();

      this.titleQuality = 'Select Quality Items';
      this.sectionSubtitle = 'Tab to navigate and update fields. Click “Submit” or use Alt + S or Enter to proceed.';

      // In case of the 76 send a message to be shown on the 75 or, send a next claim to be consulted
      this.container.nextClaimNumber = data['nextClaimNumber'];
      this.container.workStorage.qualityCommAreaFieldsFor06o75 = data['qualityCommAreaFieldsFor06o75'];

      dfhcommarea = data['dfhCommArea'];
      if (dfhcommarea === undefined) {
        dfhcommarea = new Dfhcommarea();
      }

      this.container.wscommonarea = dfhcommarea;

      if (this.container.nextClaimNumber) {
        dfhcommarea.commComm.claimNumber = this.container.nextClaimNumber;
      }

      this.qltyRvwRvldMenuScreenServiceMainMain(this.container).subscribe(res => {
        this.container = res;
        this.screenBean = this.container.screenBean;
        this.redirectTo();
        this.pushAlert(this.screenBean.m75erra);
        if (this.screenBean.m75errb) {
          this.pushAlert(this.screenBean.m75errc, MessageBoxType.ERROR);
        }
        if (this.screenBean.m75errc) {
          this.pushAlert(this.screenBean.m75errb, MessageBoxType.ERROR);
        }
        this.screenBean.m75quda = this.formatDateToCST(new Date().toString());
      });
    });
  }

  formatDateToCST(originalFormat: string): string {
    if (!originalFormat) {
      return '';
    }
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY');
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldMenuScreenServiceMapFreshMap010(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.screenBean.m75quda = this.formatDateToCST(new Date().toString());
    });
    this.loadingStatus = ButtonStatus.SUBMIT;
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    this.loadingStatus = ButtonStatus.WORKING;

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldMenuScreenServiceClaimFirstClaim050(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.redirectTo();
      this.pushAlert(this.screenBean.m75erra);
      if (this.screenBean.m75errb === 'ENTER CLAIM NUMBER OR QUALITY NUMBER') {
        this.loadingStatus = ButtonStatus.FAILED;
        this.pushAlert(this.screenBean.m75errb, MessageBoxType.ERROR);
      } else if (this.screenBean.m75errb || this.screenBean.m75erra) {
        this.pushAlert(this.screenBean.m75errb, MessageBoxType.ERROR);
        this.loadingStatus = ButtonStatus.FAILED;
      } else if (this.screenBean.m75errc) {
        this.loadingStatus = ButtonStatus.FAILED;
        this.pushAlert(this.screenBean.m75errc, MessageBoxType.ERROR);
      } else {
        this.loadingStatus = ButtonStatus.SUCCESS;
        this.pushAlert('Submit success', MessageBoxType.SUCCESS);
      }
    });

  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldMenuScreenServiceXctlXctlPacsMenu910(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.container.redirectTo = 'QUALITY REVALIDATION';
      this.redirectTo();
    });
  }

  private redirectTo(): void {
    if (this.container.redirectTo !== '') {
      if (this.container.redirectTo === 'RPD06O76') {
        this.transferSrv.set('dfhCommArea', this.container.wscommonarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.transferSrv.set('qualityInfoRecord', this.container.workStorage.qualityInfoRecord);
        this.transferSrv.set('qualityCommAreaFieldsFor06o75', this.container.workStorage.qualityCommAreaFieldsFor06o75);
        this.router.navigate([`${qualityReviewRoutePathRoot}/${qualityReviewRoutePathQualityMiscInfo}`]);
      } else if (this.container.redirectTo === 'RPD06O75') {  // Quality Revalidation
        this.transferSrv.set('dfhCommArea', this.container.wscommonarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.transferSrv.set('qualityInfoRecord', this.container.workStorage.qualityInfoRecord);
        this.transferSrv.set('qualityCommAreaFieldsFor06o75', this.container.workStorage.qualityCommAreaFieldsFor06o75);
        this.router.navigate([`${qualityReviewRoutePathRoot}/${qualityReviewRoutePathQualityMiscInfoQQ}`]);
      }
    }
  }

  private pushAlert(message: string, type?: MessageBoxType): void {
    if (message && type) {
      this.messageBoxService.addMessageBox(this.screenBean.m75tit.split('**').join(''), type, message);
    } else if (message) {
      if (message.toLocaleUpperCase().includes('QUALITY REVIEW')) {
        this.messageBoxService.addMessageBox(this.screenBean.m75tit.split('**').join(''), MessageBoxType.SUCCESS, message);
      } else {
        this.messageBoxService.addMessageBox(this.screenBean.m75tit.split('**').join(''), MessageBoxType.ERROR, message);
      }
    }
  }

  /**
   * Back end calls main     window.scrollTo(0, 0);
   */
  private qltyRvwRvldMenuScreenServiceMainMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmenu/qltyrvwrvldmenuscreenservicemain/main', JSON.stringify(container), options);

  }

  /**
   * Back end calls freshMap010
   */
  private qltyRvwRvldMenuScreenServiceMapFreshMap010(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmenu/qltyrvwrvldmenuscreenservicemap/freshmap010', JSON.stringify(container), options);

  }

  /**
   * Back end calls xctlPacsMenu910
   */
  private qltyRvwRvldMenuScreenServiceXctlXctlPacsMenu910(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmenu/qltyrvwrvldmenuscreenservicexctl/xctlpacsmenu910', JSON.stringify(container), options);

  }

  /**
   * Back end calls firstClaim050
   */
  private qltyRvwRvldMenuScreenServiceClaimFirstClaim050(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmenu/qltyrvwrvldmenuscreenserviceclaim/firstclaim050', JSON.stringify(container), options);

  }
}

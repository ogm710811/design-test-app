import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwVolRsn} from './model/qlty-rvw-vol-rsn.model';
import {WsCommarea} from './model/ws-commarea.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwvolrsn::qltyrvwvolrsn::qltyrvwvolrsn
 */
@Component({
  selector: 'fox-volume-reason',
  templateUrl: './volume-reason.component.html'
})
export class VolumeReasonComponent implements OnInit {
  container = new Container();
  screenBean = new QltyRvwVolRsn();

  public constructor(protected httpClient: HttpClient, protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let dfhcommarea = new Dfhcommarea();
    let wsCommarea = new WsCommarea();
    this.container = new Container();

    data = this.transferSrv.getData();
    dfhcommarea = data['dfhCommArea'];
    wsCommarea = data['wsCommArea'];

    if (dfhcommarea === undefined) {
      dfhcommarea = new Dfhcommarea();
    }

    if (wsCommarea === undefined) {
      wsCommarea = new WsCommarea();
    }
    this.container.wsCommarea = wsCommarea;
    this.container.dfhcommarea = dfhcommarea;
    this.qltyRvwVolRsnServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
    this.pushAlert(this.screenBean.m99err1);
  }

  /**
   * Event action anyKeyEventClick
   */
  anyKeyEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceInvalidKey(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceUpdateMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
    this.pushAlert(this.screenBean.m99err1);
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceXctlRpd06o86(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      this.router.navigate(['/quality-review/quality-review-volume']);
    });

  }

  /**
   * Event action pf3EventClick
   */
  pf3EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceLowerReasons(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action pf4EventClick
   */
  pf4EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwVolRsnServiceHigherReasons(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Volume Reason', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls main
   */
  private qltyRvwVolRsnServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/main', JSON.stringify(container), options);

  }

  /**
   * Back end calls xctlRpd06o86
   */
  private qltyRvwVolRsnServiceXctlRpd06o86(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/xctlrpd06o86', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private qltyRvwVolRsnServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls invalidKey
   */
  private qltyRvwVolRsnServiceInvalidKey(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/invalidkey', JSON.stringify(container), options);

  }

  /**
   * Back end calls lowerReasons
   */
  private qltyRvwVolRsnServiceLowerReasons(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/lowerreasons', JSON.stringify(container), options);

  }

  /**
   * Back end calls higherReasons
   */
  private qltyRvwVolRsnServiceHigherReasons(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/higherreasons', JSON.stringify(container), options);

  }

  /**
   * Back end calls updateMap
   */
  private qltyRvwVolRsnServiceUpdateMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvolrsn/qltyrvwvolrsnservice/updatemap', JSON.stringify(container), options);

  }
}

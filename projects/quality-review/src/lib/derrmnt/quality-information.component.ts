import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwRvldErrMnt} from './model/qlty-rvw-rvld-err-mnt.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyRvwRvldErrMnt::QltyRvwRvldErrMnt::QltyRvwRvldErrMnt
 */
@Component({
  selector: 'fox-quality-information',
  templateUrl: './quality-information.component.html'
})
export class QualityInformationComponent implements OnInit {
  screenBean = new QltyRvwRvldErrMnt();
  container = new Container();

  public constructor(protected httpClient: HttpClient,
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
    let dfhCommArea = new Dfhcommarea();

    this.activedRoute.queryParams.subscribe(params => {
      if (params['claimNumid']) {
        dfhCommArea.commComm.claimNumber = params['claimNumid'];
      }

      dfhCommArea.commComm.command = 'QQ';
      dfhCommArea.eibTrnId = 'RPC1';
      dfhCommArea.callingProgram = 'RPD06O75';

      this.transferSrv.set('dfhCommArea', dfhCommArea);

      data = this.transferSrv.getData();
      dfhCommArea = data['dfhCommArea'];
      if (dfhCommArea === undefined) {
        dfhCommArea = new Dfhcommarea();
      }

      dfhCommArea.commComm.qualityInformation = 'Y';
      // dfhCommArea.commComm.ionsId = '26681';

      this.qltyRvwRvldErrMntServiceMainOperation(dfhCommArea).subscribe(res => {
        this.container = res;
        this.screenBean = this.container.screenBean;
      });
      this.pushAlert(this.screenBean.m81errq);
      this.pushAlert(this.screenBean.m81err1);
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldErrMntServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldErrMntServiceCheckEnter(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldErrMntServicePf1Return(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Quality Information', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls pf1Return
   */
  private qltyRvwRvldErrMntServicePf1Return(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmnt/qltyrvwrvlderrmntservice/pf1return', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainOperation
   */
  private qltyRvwRvldErrMntServiceMainOperation(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmnt/qltyrvwrvlderrmntservice/mainoperation', JSON.stringify(dfhcommarea), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private qltyRvwRvldErrMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmnt/qltyrvwrvlderrmntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls checkEnter
   */
  private qltyRvwRvldErrMntServiceCheckEnter(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmnt/qltyrvwrvlderrmntservice/checkenter', JSON.stringify(container), options);

  }

  /**
   * Back end calls invalidKey
   */
  private qltyRvwRvldErrMntServiceInvalidKey(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlderrmnt/qltyrvwrvlderrmntservice/invalidkey', JSON.stringify(container), options);

  }
}

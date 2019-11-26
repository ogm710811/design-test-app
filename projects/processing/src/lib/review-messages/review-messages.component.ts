import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  TransferSrvService,
  LoginService,
  ButtonStatus
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {RvwMessages} from './model/rvw-messages.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwmessages::rvwmessages::rvwmessages
 */
@Component({
  selector: 'fox-rvwmessages',
  templateUrl: './review-messages.component.html',
  styleUrls: ['./review-messages.component.css']
})
export class ReviewMessagesComponent implements OnInit {
  screen = new RvwMessages();
  common = new Dfhcommarea();
  container = new Container();
  readOnlyHorizontal = true;
  isResult = false;
  buttonStatus: string = ButtonStatus.SUBMIT;
  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     private loginService: LoginService
  ) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let container = new Container();

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.rvwMessagesServiceOnload(this.common).subscribe(res => {
      container = res;
      this.container = container;
      this.screen = container.rvwMessages;
      this.common = container.dfhCommArea;
    });
  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.rvwMessages = this.screen;

    container.dfhCommArea = this.common;
    this.container.rvwMessages = container.rvwMessages;
    this.rvwMessagesServiceTransferToCommandMod4000(this.container).subscribe(res => {
      container = res;
      this.screen = container.rvwMessages;
      this.common = container.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      this.router.navigate(['/dashboard/current-stats']);
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    const data: any = undefined;
    container.rvwMessages = this.screen;

    container.dfhCommArea = this.common;
    this.container.rvwMessages = container.rvwMessages;
    this.rvwMessagesServiceShowFreshMap(this.container).subscribe(res => {
      container = res;
      this.screen = container.rvwMessages;
      this.common = container.dfhCommArea;
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    this.buttonStatus = ButtonStatus.WORKING;
    let container = new Container();
    const data: any = undefined;
    container.rvwMessages = this.screen;

    container.dfhCommArea = this.common;
    this.container.rvwMessages = container.rvwMessages;
    this.rvwMessagesServiceScreenEnteredData(this.container).subscribe(res => {
      this.buttonStatus = ButtonStatus.SUCCESS;
      this.isResult = true;
      container = res;
      this.screen = container.rvwMessages;
      this.screen.m14linAll = `${container.rvwMessages.m14lin1} ${container.rvwMessages.m14lin2} ${container.rvwMessages.m14lin3} ${container.rvwMessages.m14lin4} ${container.rvwMessages.m14lin5} ${container.rvwMessages.m14lin6} `;
      this.common = container.dfhCommArea;
      this.pushAlert(container.rvwMessages.m14err);
    }, error => {
      this.buttonStatus = ButtonStatus.FAILED;
    });

  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Message Inquiry', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls screenEnteredData
   */
  private rvwMessagesServiceScreenEnteredData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/rvwmessages/rvwmessagesservice/screenentereddata', JSON.stringify(container), options);
  }

  /**
   * Back end calls onload
   */
  private rvwMessagesServiceOnload(common: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwmessages/rvwmessagesservice/onload', JSON.stringify(common), options);
  }

  /**
   * Back end calls showFreshMap
   */
  private rvwMessagesServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwmessages/rvwmessagesservice/showfreshmap', JSON.stringify(container), options);
  }

  /**
   * Back end calls transferToCommandMod
   */
  private rvwMessagesServiceTransferToCommandMod4000(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/rvwmessages/rvwmessagesservice/transfertocommandmod4000', JSON.stringify(container), options);
  }
}

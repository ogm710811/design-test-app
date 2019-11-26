import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {MsgMntChangeMsg} from './model/msg-mnt-change-msg.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::messagemnt::messagemnt::MsgMntChangeMsg
 */
@Component({
  selector: 'fox-change-message',
  templateUrl: './change-message.component.html',
  styleUrls: ['./add-message-component.css']
})
export class ChangeMessageComponent implements OnInit {
  screen = new MsgMntChangeMsg();
  common = new Dfhcommarea();
  container = new Container();
  buttonStatus: string = ButtonStatus.SUBMIT;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    const container = new Container();

    data = this.transferSrv.getData();
    this.container = data['container'];

    this.screen = this.container.msgMntChangeMsg;
    this.common = this.container.dfhCommArea;
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntChangeMsg = this.screen;

    container.dfhCommArea = this.common;
    this.messageMntServiceEditPfKeys(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntChangeMsg;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '16' && container.msgMntChangeMsg.m18err === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-maintenance']);
      } else {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/change-message']);
      }
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();

    container.msgMntChangeMsg = this.screen;

    container.dfhCommArea = this.common;
    this.messageMntServiceShowFreshMap(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntChangeMsg;
      this.common = container.dfhCommArea;
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntChangeMsg = this.screen;
    this.buttonStatus = ButtonStatus.WORKING;
    container.dfhCommArea = this.common;
    this.container.msgMntChangeMsg = container.msgMntChangeMsg;
    this.messageMntServiceScreenData(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntChangeMsg;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '16' && !container.msgMntChangeMsg.m18err) {
        this.buttonStatus = ButtonStatus.SUCCESS;
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-maintenance']);
      } else {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, container.msgMntChangeMsg.m18err);
        this.buttonStatus = ButtonStatus.FAILED;
        data = this.transferSrv.getData();
        data['container'] = container;
      }
    }, error => {
      this.buttonStatus = ButtonStatus.FAILED;
    });
  }

  /**
   * Back end calls editPfKeys
   */
  private messageMntServiceEditPfKeys(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/messagemnt/messagemntservice/editpfkeys', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private messageMntServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/messagemnt/messagemntservice/screendata', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshMap
   */
  private messageMntServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/messagemnt/messagemntservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls onload
   */
  private messageMntServiceOnload(common: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/messagemnt/messagemntservice/onload', JSON.stringify(common), options);

  }
}

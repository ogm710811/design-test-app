import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {MsgMntAddMsg} from './model/msg-mnt-add-msg.model';
import {ButtonStatus} from '@fox/shared';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::messagemnt::messagemnt::MsgMntAddMsg
 */
@Component({
  selector: 'fox-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message-component.css']
})
export class AddMessageComponent implements OnInit {
  screen = new MsgMntAddMsg();
  common = new Dfhcommarea();
  container = new Container();
  buttonStatus: string = ButtonStatus.SUBMIT;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    const container = new Container();

    data = this.transferSrv.getData();
    this.container = data['container'];

    this.screen = this.container.msgMntAddMsg;
    this.common = this.container.dfhCommArea;
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntAddMsg = this.screen;

    container.dfhCommArea = this.common;
    this.messageMntServiceEditPfKeys(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntAddMsg;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '16' && container.msgMntAddMsg.m17err === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-maintenance']);
      } else {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/add-message']);
      }
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    container.msgMntAddMsg = this.screen;
    container.dfhCommArea = this.common;
    this.messageMntServiceShowFreshMap(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntAddMsg;
      this.common = container.dfhCommArea;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntAddMsg = this.screen;
    this.buttonStatus = ButtonStatus.WORKING;
    container.dfhCommArea = this.common;
    this.container.msgMntAddMsg = container.msgMntAddMsg;
    this.messageMntServiceScreenData(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntAddMsg;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '16' && !container.msgMntAddMsg.m17err) {
        this.buttonStatus = ButtonStatus.SUCCESS;

        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-maintenance']);
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        data = this.transferSrv.getData();
        data['container'] = container;
        this.pushAlert(container.msgMntAddMsg.m17err);
      }
    }, error => {
      this.buttonStatus = ButtonStatus.FAILED;
    });
  }

  private pushAlert(message: string): void {
    if (message) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Message Maintenance', MessageBoxType.ERROR, message);
    }
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

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
import {MsgMntMenu} from './model/msg-mnt-menu.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::messagemnt::messagemnt::MsgMntMenu
 */
@Component({
  selector: 'fox-message-maintenance-menu',
  templateUrl: './message-maintenance-menu.component.html',
  styleUrls: ['./message-maintenance-menu.component.css']
})
export class MessageMaintenanceMenuComponent implements OnInit {
  screen = new MsgMntMenu();
  common = new Dfhcommarea();
  container = new Container();

  messageTypes = [
    {value: 'P', label: 'Pattern Paragraph'},
    {value: 'A', label: 'ANSI'}
  ];
  selections = [
    {value: '1', label: 'Add Message'},
    {value: '2', label: 'Change Message'},
    {value: '3', label: 'Message Inquiry'}
  ];
  languages = [
    {value: 'E', label: 'English'},
  ];
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
    let container = new Container();

    data = this.transferSrv.getData();

    if (data['container'] === null || data['container'] === undefined) {
      this.common = data['common'];
      if (this.common === undefined) {
        this.common = new Dfhcommarea();
      }
      this.messageMntServiceOnload(this.common).subscribe(resp => {
        container = resp;
        this.container = container;
        this.screen = container.msgMntMenu;
        this.common = container.dfhCommArea;
        this.pushAlert(container.msgMntMenu.m16err1);
        container.msgMntMenu.m16err1 = '';
      });
    } else {

      this.common = data['common'];
      if (this.common === undefined) {
        this.common = new Dfhcommarea();
      }
      this.messageMntServiceOnload(this.common).subscribe(resp => {
        container = resp;
        this.container = container;
        this.container.msgMntMenu.m16err1 = data['container'].msgMntMenu.m16err1;
        this.screen = container.msgMntMenu;
        this.common = container.dfhCommArea;
        this.pushAlert(container.msgMntMenu.m16err1);
        container.msgMntMenu.m16err1 = '';
      });
    }
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntMenu = this.screen;

    container.dfhCommArea = this.common;
    this.container.msgMntMenu = container.msgMntMenu;
    this.messageMntServiceEditPfKeys(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntMenu;
      this.common = container.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      data['container'] = new Container();
    });
  }

  /**
   * Event action clearEventClick
   *  let container = new Container();

   *this.container.msgMntMenu = this.screen;

   *container = await this.messageMntServiceShowFreshMap(this.container).toPromise();
   *this.screen  =  container.msgMntMenu;
   *this.common =  container.dfhCommArea;

   */
  clearEventClick(): void {
    let data: any = undefined;
    let container = new Container();

    data = this.transferSrv.getData();

    if (data['container'] === undefined) {
      this.common = data['common'];
      if (this.common === undefined) {
        this.common = new Dfhcommarea();
      }
      this.messageMntServiceOnload(this.common).subscribe(resp => {
        container = resp;
        this.container = container;
        this.screen = container.msgMntMenu;
        this.common = container.dfhCommArea;
      });

    } else {

      this.common = data['common'];
      if (this.common === undefined) {
        this.common = new Dfhcommarea();
      }
      this.messageMntServiceOnload(this.common).subscribe(resp => {
        container = resp;
        this.container = container;
        this.container.msgMntMenu.m16err1 = data['container'].msgMntMenu.m16err1;
        this.screen = container.msgMntMenu;
        this.common = container.dfhCommArea;
      });
    }
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgMntMenu = this.screen;

    container.dfhCommArea = this.common;

    if (container.msgMntMenu.m16err1 !== '') {
      this.container.msgMntMenu = container.msgMntMenu;
    }

    this.buttonStatus = ButtonStatus.WORKING;
    this.messageMntServiceScreenData(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgMntMenu;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '17' && container.msgMntMenu.m16err1 === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate(['/file-maintenance/add-message']);
      }

      if (container.clmFileMntCmnArea.mapSent === '18' && container.msgMntMenu.m16err1 === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate(['/file-maintenance/change-message']);
      }

      if (container.clmFileMntCmnArea.mapSent === '20' && container.msgMntMenu.m16err1 === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.buttonStatus = ButtonStatus.SUCCESS;
        this.router.navigate(['/file-maintenance/message-inquiry']);
      }
      this.buttonStatus = ButtonStatus.FAILED;
      this.pushAlert(container.msgMntMenu.m16err1);
    }, error => {
      this.buttonStatus = ButtonStatus.FAILED;
    });
  }

  private pushAlert(message: string): void {
    if (message.includes('TRANSACTION COMPLETED')) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Message Maintenance', MessageBoxType.SUCCESS, message, 3000);
    } else if (message !== '') {
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

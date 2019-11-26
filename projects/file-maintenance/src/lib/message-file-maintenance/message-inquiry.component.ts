import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {MsgInquiry} from './model/msg-inquiry.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::messagemnt::messagemnt::MsgInquiry
 */
@Component({
  selector: 'fox-message-inquiry',
  templateUrl: './message-inquiry.component.html',
  styleUrls: ['./message-inquiry.component.css']
})
export class MessageInquiryComponent implements OnInit {
  screen = new MsgInquiry();
  common = new Dfhcommarea();
  container = new Container();
  readOnlyHorizontal = true;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    const container = new Container();

    data = this.transferSrv.getData();
    this.container = data['container'];

    this.screen = this.container.msgInquiry;
    this.common = this.container.dfhCommArea;
  }

  /**
   * Event action F1EventClick
   */
  F1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    container.msgInquiry = this.screen;

    container.dfhCommArea = this.common;
    this.messageMntServiceEditPfKeys(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgInquiry;
      this.common = container.dfhCommArea;

      if (container.clmFileMntCmnArea.mapSent === '16' && container.msgInquiry.m20err === '') {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-maintenance']);
      } else {
        data = this.transferSrv.getData();
        data['container'] = container;
        this.router.navigate(['/file-maintenance/message-inquiry']);
      }
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    let container = new Container();
    container.msgInquiry = this.screen;
    container.dfhCommArea = this.common;
    this.messageMntServiceShowFreshMap(this.container).subscribe(resp => {
      container = resp;
      this.screen = container.msgInquiry;
      this.common = container.dfhCommArea;

    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    let container = new Container();
    container.msgInquiry = this.screen;
    container.dfhCommArea = this.common;
    this.messageMntServiceScreenData(container).subscribe(resp => {
      container = resp;
      this.screen = container.msgInquiry;
      this.common = container.dfhCommArea;
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

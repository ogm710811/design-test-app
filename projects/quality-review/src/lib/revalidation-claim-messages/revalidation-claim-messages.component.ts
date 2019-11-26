import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwRvldClmMsg} from './model/qlty-rvw-rvld-clm-msg.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwrvldclmmsg::QltyRvwRvldClmMsg::QltyRvwRvldClmMsg
 */
@Component({
  selector: 'fox-revalidation-claim-messages',
  templateUrl: './revalidation-claim-messages.component.html'
})
export class RevalidationClaimMessagesComponent implements OnInit {
  container = new Container();
  screenBean = new QltyRvwRvldClmMsg();
  specialMemo1: string = '';
  specialMemo2: string = '';

  public constructor(protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;
    let dfhCommArea = new Dfhcommarea();
    let billLineTable: any;

    data = this.transferSrv.getData();

    dfhCommArea = data['dfhCommArea'];
    billLineTable = data['billLineTable'];

    this.container.workStorage.oprec1Record = data['oprec1Record'];

    dfhCommArea = dfhCommArea === undefined ? new Dfhcommarea() : dfhCommArea;
    this.container.dfhcommarea = dfhCommArea;

    this.qltyRvwRvldClmMsgServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.qltyRvwRvldClmMsg;
      this.specialMemo1 = `${this.screenBean.m78spm1} ${this.screenBean.m78spm2} ${this.screenBean.m78spm3} ${this.screenBean.m78spm4}`;
      this.specialMemo2 = `${this.screenBean.m78spm5} ${this.screenBean.m78spm6} ${this.screenBean.m78spm7} ${this.screenBean.m78spm8}`;
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.workStorage.dfhenter = true;
    this.container.qltyRvwRvldClmMsg = this.screenBean;
    this.qltyRvwRvldClmMsgServiceEditChanges(this.container).subscribe(res => {
      this.container = res;
      this.qltyRvwRvldClmMsgServiceSendDataOnly(this.container).subscribe(resp => {
        this.container = resp;
        this.screenBean = this.container.qltyRvwRvldClmMsg;
      });
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.workStorage.dfhpf1 = true;
    this.container.qltyRvwRvldClmMsg = this.screenBean;
    this.qltyRvwRvldClmMsgServicePf1Return(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.qltyRvwRvldClmMsg;

      if (this.container.redirectTo === 'RPD06O76') {
        this.transferSrv.set('dfhCommArea', this.container.dfhcommarea);
        this.router.navigate(['/quality-review/quality-misc-info']);
      }
    });

  }

  /**
   * Event action pf6EventClick
   */
  pf6EventClick(): void {

    this.container.workStorage.dfhpf6 = true;
    this.container.qltyRvwRvldClmMsg = this.screenBean;
    this.qltyRvwRvldClmMsgServicePf6Operation(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.qltyRvwRvldClmMsg;
    });
  }

  /**
   * Back end calls sendDataOnly
   */
  private qltyRvwRvldClmMsgServiceSendDataOnly(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/senddataonly', JSON.stringify(container), options);

  }

  /**
   * Back end calls editChanges
   */
  private qltyRvwRvldClmMsgServiceEditChanges(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/editchanges', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf6Operation
   */
  private qltyRvwRvldClmMsgServicePf6Operation(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/pf6operation', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1Return
   */
  private qltyRvwRvldClmMsgServicePf1Return(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/pf1return', JSON.stringify(container), options);

  }

  /**
   * Back end calls main
   */
  private qltyRvwRvldClmMsgServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/main', JSON.stringify(container), options);

  }
}

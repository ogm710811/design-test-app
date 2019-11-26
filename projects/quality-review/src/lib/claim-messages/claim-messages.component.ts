import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathReviewClaimMessages,
  claimProcessingRoutePathRoot,
  Dfhcommarea,
  memberInformationUrlPrefixMemberProfile,
  TransferSrvService
} from '@fox/shared';
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
  selector: 'fox-claim-messages',
  templateUrl: './claim-messages.component.html',
  styleUrls: ['./claim-messages.component.css']
})
export class ClaimMessagesComponent implements OnInit {
  container = new Container();
  screenBean = new QltyRvwRvldClmMsg();
  specialMemo1: string = '';
  specialMemo2: string = '';
  isRevalidate: boolean = false;

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
    data = this.transferSrv.getData();

    dfhCommArea = data['dfhCommArea'];

    this.container.workStorage.oprec1Record = data['oprec1Record'];

    dfhCommArea = dfhCommArea === undefined ? new Dfhcommarea() : dfhCommArea;
    this.container.dfhcommarea = dfhCommArea;

    this.qltyRvwRvldClmMsgServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.qltyRvwRvldClmMsg;
      this.specialMemo1 = `${this.screenBean.m78spm1} ${this.screenBean.m78spm2} ${this.screenBean.m78spm3} ${this.screenBean.m78spm4}`;
      this.specialMemo2 = `${this.screenBean.m78spm5} ${this.screenBean.m78spm6} ${this.screenBean.m78spm7} ${this.screenBean.m78spm8}`;
    });

    if (this.container.dfhcommarea.qualityReview.revalidationInd === 'Y') {
      this.isRevalidate = true;
    }

  }

  saveRecord(): void {
    this.container.workStorage.dfhenter = true;
    this.container.qltyRvwRvldClmMsg = this.screenBean;
    this.qltyRvwRvldClmMsgServiceSaveChanges(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.qltyRvwRvldClmMsg;
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
   * Event action pf6EventClick
   */

  pf6EventClick(): void {
    let data: any = undefined;
    data = this.transferSrv.getData();
    data['common'] = this.container.dfhcommarea;
    this.container.qltyRvwRvldClmMsg = this.screenBean;

    data = this.transferSrv.getData();
    data['common'] = this.container.dfhcommarea;
    if (this.container.dfhcommarea.nextProgram === 'RPD06O56') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewClaimMessages]);
    }
  }

  getMemberProfile(): void {
    let url = '';
    let memberNum = '';
    if (this.screenBean.m78mid) {
      memberNum = this.screenBean.m78mid;
    }
    if (memberNum != null || memberNum !== '') {
      url = '../../#' + memberInformationUrlPrefixMemberProfile + memberNum;
      window.open(url);
    }
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

  private qltyRvwRvldClmMsgServiceSaveChanges(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldclmmsg/qltyrvwrvldclmmsgservice/saveChanges', JSON.stringify(container), options);

  }

  /**
   * Back end calls clmMg049
   */
  private qltyRvwRvldMiscInfoServiceClmMg049(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/clmmg049', JSON.stringify(container), options);

  }
}

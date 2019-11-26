import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  CommunicationCommarea,
  RvwCmnctHistCommonArea,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs';
import {Endcmnct} from './model/endcmnct.model';
import {Rpd07O41Container} from './model/rpd07-o41-container.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::endcmnct::endcmnct::endcmnct
 */
@Component({
  selector: 'fox-end-comunication',
  templateUrl: './end-communication.component.html'
})
export class EndCommunicationComponent implements OnInit {
  screen = new Endcmnct();
  common = new CommunicationCommarea();
  reviewCommArea = new RvwCmnctHistCommonArea();

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
    let rpd07O41container = new Rpd07O41Container();

    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new CommunicationCommarea() : this.common;
    this.commControlEndCommServiceMainOperation(this.common).subscribe(resp => {
      rpd07O41container = resp;
    });

    this.screen = rpd07O41container.rpdmb55;
    this.common = rpd07O41container.commonArea;
    if (rpd07O41container.commonArea.clmCmnctstatArea.tsfStatus === 'SENT') {
      this.screen.isSent = true;
    }
    data = this.transferSrv.getData();
  }

  /**
   * Event action ClearEventClick
   */
  ClearEventClick(): void {
    let rpd07O41Container = new Rpd07O41Container();
    rpd07O41Container.rpdmb55 = this.screen;
    rpd07O41Container.commonArea = this.common;
    this.commControlEndCommServiceClearScreen(rpd07O41Container).subscribe(resp => {
      rpd07O41Container = resp;
    });
    this.screen = rpd07O41Container.rpdmb55;
    this.common = rpd07O41Container.commonArea;
  }

  /**
   * Event action EnterEventClick
   */
  EnterEventClick(): void {
    let rpd07O41Container = new Rpd07O41Container();

    rpd07O41Container.rpdmb55 = this.screen;
    rpd07O41Container.commonArea = this.common;
    this.commControlEndCommServiceMainRun(rpd07O41Container).subscribe(resp => {
      rpd07O41Container = resp;
    });
    this.screen = rpd07O41Container.rpdmb55;
    this.common = rpd07O41Container.commonArea;

  }

  reviewCommunicationEventClick(): void {

    let data: any = undefined;
    this.reviewCommArea.memberId = String(this.common.comcomm.membershipId);
    data = this.transferSrv.getData();
    data['reviewCommArea'] = this.reviewCommArea;
    this.router.navigate(['/communication/communication-list']);
  }

  /**
   * Back end calls mainOperation
   */
  private commControlEndCommServiceMainOperation(commonArea: CommunicationCommarea): Observable<Rpd07O41Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O41Container>('/api/overpayment/services/commcontrolendcomm/commcontrolendcommservice/mainoperation', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls mainRun
   */
  private commControlEndCommServiceMainRun(rpd07O41Container: Rpd07O41Container): Observable<Rpd07O41Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O41Container>('/api/overpayment/services/commcontrolendcomm/commcontrolendcommservice/mainrun', JSON.stringify(rpd07O41Container), options);

  }

  /**
   * Back end calls clearScreen
   */
  private commControlEndCommServiceClearScreen(rpd07O41Container: Rpd07O41Container): Observable<Rpd07O41Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Rpd07O41Container>('/api/overpayment/services/commcontrolendcomm/commcontrolendcommservice/clearscreen', JSON.stringify(rpd07O41Container), options);

  }
}

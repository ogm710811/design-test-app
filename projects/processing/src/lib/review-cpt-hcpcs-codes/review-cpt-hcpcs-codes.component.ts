import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as momentNS from 'moment';
import {Observable} from 'rxjs';
import {
  ButtonStatus,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  TransferSrvService
} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdmb20} from './model/rpdmb20.model';

const moment = momentNS;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::rvwcpthcpcs::rvwcpthcpcs::rvwcpthcpcs
 */
@Component({
  selector: 'fox-review-cpt-hcpcs-codes',
  templateUrl: './review-cpt-hcpcs-codes.component.html',
  styleUrls: ['./review-cpt-hcpcs-codes.component.css']
})
export class ReviewCptHcpsCodesComponent implements OnInit {
  rpdmb20 = new Rpdmb20();
  dfhComArea = new Dfhcommarea();
  buttonStatus: string = ButtonStatus.SUBMIT;
  controlVisibility: boolean = true;

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
    let container = new Container();
    const dfhComArea = new Dfhcommarea();
    const rpdmb20 = new Rpdmb20();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.dfhComArea = data['dfhComArea'];
    if (this.dfhComArea === undefined) {
      this.dfhComArea = new Dfhcommarea();
    }
    this.rvwCptHcpcsServiceMainOperation(this.dfhComArea).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.rpdmb20 = container.rpdmb20;
      this.dfhComArea = container.dfhComArea;
    });
  }

  /**
   * Event action CLEAREventClick
   */
  clearEventClick(): void {
    let container = new Container();
    const dfhComArea = new Dfhcommarea();
    const rpdmb20 = new Rpdmb20();
    container.rpdmb20 = this.rpdmb20;
    container.dfhComArea = this.dfhComArea;
    this.messageBoxService.reset();
    this.rvwCptHcpcsServiceShowFreshMap(container).subscribe(resp => {
      container = resp;
      this.rpdmb20 = container.rpdmb20;
      this.dfhComArea = container.dfhComArea;
    });
    this.controlVisibility = true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      const rpdmb20 = new Rpdmb20();
      let container = new Container();
      const dfhComArea = new Dfhcommarea();
      container.rpdmb20 = this.rpdmb20;
      container.dfhComArea = this.dfhComArea;
      container = await this.rvwCptHcpcsServiceScreenEnteredData(container).toPromise();
      this.rpdmb20 = container.rpdmb20;
      this.rpdmb20.m20stad = this.rpdmb20.m20stad !== '' ? moment(this.rpdmb20.m20stad).format('MM/DD/YYYY') : '';
      this.rpdmb20.m20stod = this.rpdmb20.m20stod !== '' ? moment(this.rpdmb20.m20stod).format('MM/DD/YYYY') : '';
      this.dfhComArea = container.dfhComArea;
      this.pushAlert(container.rpdmb20.m20tos);
      this.buttonStatus = container.rpdmb20.m20tos ? ButtonStatus.SUCCESS : ButtonStatus.FAILED;
      this.resetState();
      this.controlVisibility = !(this.rpdmb20.m20tos);
    } catch (error) {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
    return true;
  }

  /**
   * Event action pF1EventClick
   */
  pF1EventClick(): void {
    let container = new Container();
    const dfhComArea = new Dfhcommarea();
    const rpdmb20 = new Rpdmb20();
    container.rpdmb20 = this.rpdmb20;
    container.dfhComArea = this.dfhComArea;
    this.rvwCptHcpcsServiceXctlBack(container).subscribe(resp => {
      container = resp;
      this.rpdmb20 = container.rpdmb20;
      this.dfhComArea = container.dfhComArea;
    });
  }

  private pushAlert(tos: string): void {
    if (tos === '') {
      this.messageBoxService.addMessageBox('CPT/HCPCS Inquiry', MessageBoxType.ERROR, 'CPT/HCPCS Code not found');
    }
  }

  /**
   * Back end calls showFreshMap
   */
  private rvwCptHcpcsServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwcpthcpcs/rvwcpthcpcsservice/showfreshmap', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private rvwCptHcpcsServiceMainOperation(dfhComArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwcpthcpcs/rvwcpthcpcsservice/mainoperation', JSON.stringify(dfhComArea), options);
  }

  /**
   * Back end calls screenEnteredData
   */
  private rvwCptHcpcsServiceScreenEnteredData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwcpthcpcs/rvwcpthcpcsservice/screenentereddata', JSON.stringify(container), options);
  }

  /**
   * Back end calls xctlBack
   */
  private rvwCptHcpcsServiceXctlBack(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/quality/services/rvwcpthcpcs/rvwcpthcpcsservice/xctlback', JSON.stringify(container), options);
  }
}

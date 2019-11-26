import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Dfhcommarea, MessageBoxService, MessageBoxType, TransferSrvService} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {Rpdmb95} from './model/rpdmb95.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyseqnbrinq::qltyseqnbrinq::qltyseqnbrinq
 */
@Component({
  selector: 'fox-quality-sequence-number-inquiry',
  templateUrl: './quality-sequence-number-inquiry.component.html'
})
export class QualitySequenceNumInquiryComponent implements OnInit {
  common = new Dfhcommarea();
  screen = new Rpdmb95();
  container = new Container();
  valuesMapped: string[] = [];
  reference: string[] = [];

  public constructor(protected httpClient: HttpClient,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService) {

  }

  /**
   * On Load Action
   */
  ngOnInit(): void {

    let data: any = undefined;

    this.common.commComm.command = 'QS';
    this.common.eibTrnId = 'RPC1';
    this.common.commComm.currentDate = moment().format('YYMMDD');
    this.screen.m95date = this.common.commComm.currentDate;

    this.transferSrv.set('common', this.common);

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.valuesMapped = this.screen.mapper;
    this.qltySeqbrInqServiceMainOperation(this.common).subscribe(res => {
      this.container = res;
      this.screen = this.container.rpdmb95;
      this.common = this.container.dfhCommonArea;
      this.pushAlert(this.screen.m95err1.trim());
    });

  }

  /**
   * Event action ClearEventClick
   */
  clearEventClick(): void {
    this.container.rpdmb95 = this.screen;
    this.container.dfhCommonArea = this.common;
    this.qltySeqbrInqServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.rpdmb95;
      this.common = this.container.dfhCommonArea;
      this.reference = this.reference.map((ref: string) => {
        return ref = '';
      });
    });
  }

  /**
   * Event action EnterEventClick
   */
  enterEventClick(): void {
    this.container.rpdmb95 = this.screen;
    this.container.dfhCommonArea = this.common;
    this.mapperClaims();
    this.qltySeqbrInqServiceScreenDataEntered(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.rpdmb95;
      this.common = this.container.dfhCommonArea;
      this.pushAlert(this.screen.m95err1.trim());
    });
  }

  mapperClaims(): void {

    for (let index: number = 0; index < this.valuesMapped.length; index++) {

      const claim = this.reference[index];

      if (claim) {
        this.screen[this.valuesMapped[index][0]] = claim.substring(0, 1);
        this.screen[this.valuesMapped[index][1]] = claim.substring(1, 4);
        this.screen[this.valuesMapped[index][2]] = claim.substring(4, 5);
        this.screen[this.valuesMapped[index][3]] = claim.substring(5, 8);
        this.screen[this.valuesMapped[index][4]] = claim.substring(8, 11);
        this.screen[this.valuesMapped[index][5]] = claim.substring(11, 12);
      }

    }
  }

  /**
   * Event action PF1EventClick
   */
  pF1EventClick(): void {
    this.container.rpdmb95 = this.screen;
    this.container.dfhCommonArea = this.common;
    this.qltySeqbrInqServiceReturnControl(this.container).subscribe(res => {
      this.container = res;
      this.screen = this.container.rpdmb95;
      this.common = this.container.dfhCommonArea;
    });
  }

  private pushAlert(message: string): void {
    if (message !== '') {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Sequence Number Inquiry', MessageBoxType.ERROR, message);
    }
  }

  /**
   * Back end calls mainOperation
   */
  private qltySeqbrInqServiceMainOperation(dfhcomarea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyseqbrinq/qltyseqbrinqservice/mainoperation', JSON.stringify(dfhcomarea), options);
  }

  /**
   * Back end calls screenDataEntered
   */
  private qltySeqbrInqServiceScreenDataEntered(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyseqbrinq/qltyseqbrinqservice/screendataentered', JSON.stringify(container), options);
  }

  /**
   * Back end calls showFreshMap
   */
  private qltySeqbrInqServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyseqbrinq/qltyseqbrinqservice/showfreshmap', JSON.stringify(container), options);
  }

  /**
   * Back end calls returnControl
   */
  private qltySeqbrInqServiceReturnControl(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyseqbrinq/qltyseqbrinqservice/returncontrol', JSON.stringify(container), options);
  }
}

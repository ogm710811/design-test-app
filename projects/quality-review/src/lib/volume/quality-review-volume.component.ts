import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, TransferSrvService} from '@fox/shared';
import * as momentConst from 'moment';
const moment = momentConst;
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwVol} from './model/qlty-rvw-vol.model';
import {WsCommarea} from './model/ws-commarea.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyrvwvol::qltyrvwvol::qltyrvwvol
 */
@Component({
  selector: 'fox-quality-review-volume',
  templateUrl: './quality-review-volume.component.html'
})
export class QualityReviewVolumeComponent implements OnInit {
  screenBean = new QltyRvwVol();
  commArea = new Dfhcommarea();
  wscommarea = new WsCommarea();
  container = new Container();

  public constructor(protected httpClient: HttpClient, protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private activedRoute: ActivatedRoute) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {
    let data: any = undefined;

    this.commArea.commComm.command = 'QV';
    this.commArea.eibTrnId = 'RPC1';
    this.commArea.commComm.currentDate = moment().format('YYMMDD');
    this.transferSrv.set('dfhCommArea', this.commArea);

    data = this.transferSrv.getData();
    this.commArea = data['dfhCommArea'];
    if (this.commArea === undefined || this.commArea === null) {
      this.commArea = new Dfhcommarea();
    }

    this.commArea.eibTrnId = 'RPC1';
    this.commArea.commComm.location = 2;

    this.qltyRvwVolServiceMainOperation(this.commArea).subscribe(res => {
      this.container = res;
      data = this.transferSrv.getData();
      this.screenBean = this.container.screenBean;
      this.commArea = this.container.dfhCommArea;
      this.wscommarea = this.container.wsCommarea;
    });
  }

  /**
   * Event action anykeyEventClick
   */
  anykeyEventClick(): void {

    this.qltyRvwVolServiceInvalidKey(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.qltyRvwVolServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.qltyRvwVolServiceUpdateMap(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action f1EventClick
   */
  f1EventClick(): void {

    this.qltyRvwVolServiceReturnControl(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action f3EventClick
   */
  f3EventClick(): void {

    this.qltyRvwVolServiceLowerLocations(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action f4EventClick
   */
  f4EventClick(): void {

    this.qltyRvwVolServiceHigherLocations(this.container).subscribe(res => {
      this.container = res;
    });
  }

  /**
   * Event action f5EventClick
   */
  f5EventClick(): void {

    this.qltyRvwVolServiceXctlRpd06o88(this.container).subscribe(res => {
      this.container = res;

      this.transferSrv.set('dfhCommArea', this.container.dfhCommArea);
      this.transferSrv.set('wsCommArea', this.container.wsCommarea);
      this.router.navigate(['/quality-review/volume-reason']);
    });
  }

  /**
   * Back end calls mainOperation()
   */
  private qltyRvwVolServiceMainOperation(dfhCommArea: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/mainoperation', JSON.stringify(dfhCommArea), options);
  }

  /**
   * Back end calls invalidKey()
   */
  private qltyRvwVolServiceInvalidKey(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/invalidkey', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls showFreshMap()
   */
  private qltyRvwVolServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/showfreshmap', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls updateMap()
   */
  private qltyRvwVolServiceUpdateMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/updatemap', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls returnControl()
   */
  private qltyRvwVolServiceReturnControl(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/returncontrol', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls lowerLocations()
   */
  private qltyRvwVolServiceLowerLocations(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/lowerlocations', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls higherLocations()
   */
  private qltyRvwVolServiceHigherLocations(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/higherlocations', JSON.stringify(this.container), options);

  }

  /**
   * Back end calls xctlRpd06o88()
   */
  private qltyRvwVolServiceXctlRpd06o88(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwvol/qltyrvwvolservice/xctlrpd06o88', JSON.stringify(this.container), options);

  }

}

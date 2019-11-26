import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Dfhcommarea, Oprec1Record, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs';
import {Container} from './model/container.model';
import {QltyRvwRvldDupBil} from './model/qlty-rvw-rvld-dup-bil.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::qltyRvwRvldDupBil::QltyRvwRvldDupBil::QltyRvwRvldDupBil
 */
@Component({
  selector: 'fox-duplicate-bill',
  templateUrl: './duplicate-bill.component.html'
})
export class DuplicateBillComponent implements OnInit {
  screenBean = new QltyRvwRvldDupBil();
  container = new Container();

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
    let oprec1Record = new Oprec1Record();

    data = this.transferSrv.getData();
    dfhCommArea = data['dfhCommArea'];
    oprec1Record = data['oprec1Record'];
    dfhCommArea = dfhCommArea === undefined ? new Dfhcommarea() : dfhCommArea;
    oprec1Record = oprec1Record === undefined ? new Oprec1Record() : oprec1Record;
    this.container.workStorage.oprec1Record = oprec1Record;
    this.container.dfhcommarea = dfhCommArea;
    this.qltyRvwRvldDupBilServiceMainRoutine(this.container).subscribe(res => {
      this.container = res;
      data = this.transferSrv.getData();
      this.screenBean = this.container.screenBean;

      const headTemp = this.screenBean.m77chh1.split('|');
      const headFinal = this.screenBean.m77chh2.split('|');

      for (let index = headTemp.length; index >= 1; index--) {
        headFinal[index + 1] = `${headTemp[index - 1]} ${headFinal[index + 1]}`.replace(/\s\s+/g, ' ');
      }

    });
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldDupBilServiceShowFreshMap(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldDupBilServiceScreenData(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldDupBilServicePf1Return(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
      if (this.container.redirectTo === 'RPD06O76') {
        this.transferSrv.set('dfhCommArea', this.container.dfhcommarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.router.navigate(['/quality-review/quality-misc-info']);
      }
    });

  }

  /**
   * Event action pf3EventClick
   */
  pf3EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldDupBilServicePf3NextDupBills(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean;
    });
  }

  /**
   * Event action pf4EventClick
   */
  pf4EventClick(): void {

    this.container.screenBean = this.screenBean;
    this.qltyRvwRvldDupBilServicePf4PrevDupBills(this.container).toPromise();
    this.screenBean = this.container.screenBean;
  }

  /**
   * Back end calls showFreshMap
   */
  private qltyRvwRvldDupBilServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/showfreshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf3NextDupBills
   */
  private qltyRvwRvldDupBilServicePf3NextDupBills(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/pf3nextdupbills', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf1Return
   */
  private qltyRvwRvldDupBilServicePf1Return(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/pf1return', JSON.stringify(container), options);

  }

  /**
   * Back end calls pf4PrevDupBills
   */
  private qltyRvwRvldDupBilServicePf4PrevDupBills(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/pf4prevdupbills', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private qltyRvwRvldDupBilServiceMainRoutine(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/mainroutine', JSON.stringify(container), options);

  }

  /**
   * Back end calls screenData
   */
  private qltyRvwRvldDupBilServiceScreenData(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvlddupbil/qltyrvwrvlddupbilservice/screendata', JSON.stringify(container), options);

  }
}

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {PlanInfoCmnArea} from '../models/beans/plan-info-cmn-area.model';
import {Container} from '../models/beansws/container.model';

import {Rpdma37} from '../models/rpdma37.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::plntosmnt::plntosmnt1::plntosmnt1
 */
@Component({
  selector: 'fox-plan-tos-1',
  templateUrl: './plan-type-of-service-maintenance1.component.html'
})
export class PlanTypeOfServiceMaintenance1Component implements OnInit {
  screenBean = new Rpdma37();
  common = new PlanInfoCmnArea();
  container = new Container();

  public constructor(protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService) {
  }
  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    let data: any = undefined;

    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new PlanInfoCmnArea();
    }
    container.workStorage.planInfoCmnArea = this.common;
    this.plnTosMntServiceMainRoutine(container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.screenBean = container.rpdma37;
      this.container = container;
    });
  }

  /**
   * Event action f1EventClick
   */
  f1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.plnTosMntServiceCancel(this.container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      data['container'] = this.container.workStorage.planInfoCmnArea;
      this.router.navigate(['/member-information/plan-info-maintenance-menu']);
    });

  }

  /**
   * Event action f3EventClick
   */
  f3EventClick(): void {
    let data: any = undefined;
    data = this.transferSrv.getData();
    data['container'] = this.container;
    this.router.navigate(['/security/plan-tos-2']);
  }

  /**
   * Event action resetEventClick
   */
  resetEventClick(): void {
    let container = new Container();
    this.plnTosMntServiceShowFreshRpdma37(this.container).subscribe(resp => {
      container = resp;
      this.screenBean = container.rpdma37;
    });
  }

  /**
   * Event action submitEventClick
   */
  submitEventClick(): void {
    let data: any = undefined;
    let container = new Container();
    this.container.rpdma37 = this.screenBean;
    this.plnTosMntServiceMainRunRpdma37(this.container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      container.dfhCommonArea.planInfoCmnArea = container.workStorage.planInfoCmnArea;
      data['common'] = container.dfhCommonArea;
      this.router.navigate(['/member-information/plan-info-maintenance-menu']);
    });

  }

  /**
   * Back end calls showFreshRpdma37
   */
  private plnTosMntServiceShowFreshRpdma37(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/showfreshrpdma37', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private plnTosMntServiceMainRoutine(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/mainroutine', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunRpdma37
   */
  private plnTosMntServiceMainRunRpdma37(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/mainrunrpdma37', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private plnTosMntServiceCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/cancel', JSON.stringify(container), options);

  }
}

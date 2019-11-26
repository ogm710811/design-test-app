import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dfhcommarea, TransferSrvService} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from '../models/beansws/container.model';
import {Rpdma38} from '../models/rpdma38.model';

// jQuery enabled.
declare var $: any;

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::plntosmnt::plntosmnt2::plntosmnt2
 */
@Component({
  selector: 'fox-plan-tos-2',
  templateUrl: './plan-type-of-service-maintenance2.component.html'
})
export class PlanTypeOfServiceMaintenance2Component implements OnInit {
  screenBean = new Rpdma38();
  common = new Dfhcommarea();
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
    this.container = data['container'];
    this.plnTosMntServicePageForward(this.container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      this.container = container;
      this.screenBean = container.rpdma38;
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
   * Event action f4EventClick
   */
  f4EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    this.plnTosMntServicePageBack(this.container).subscribe(resp => {
      container = resp;
      data = this.transferSrv.getData();
      data['container'] = this.container;
      this.router.navigate(['/security/plan-tos-1']);
    });
  }

  /**
   * Event action resetEventClick
   */
  resetEventClick(): void {
    let container = new Container();
    this.plnTosMntServiceShowFreshRpdma38(this.container).subscribe(resp => {
      container = resp;
    });
  }

  /**
   * Event action submitEventClick
   */
  submitEventClick(): void {
    let data: any = undefined;
    let container = new Container();
    if (this.screenBean.m38err1 === 'PLEASE VERIFY PLAN/TOS INFORMATION') {
      this.screenBean.isVerified = true;
    } else {
      this.screenBean.isVerified = false;
    }
    this.container.rpdma38 = this.screenBean;
    this.plnTosMntServiceMainRunRpdma38(this.container).subscribe(resp => {
      container = resp;
      if (container.rpdma38.m38err1 === '') {
        data = this.transferSrv.getData();
        container.dfhCommonArea.planInfoCmnArea = container.workStorage.planInfoCmnArea;
        data['common'] = container.dfhCommonArea;
        this.router.navigate(['/member-information/plan-info-maintenance-menu']);
      } else {
        this.screenBean = container.rpdma38;
        this.container = container;
      }
    });
  }

  /**
   * Back end calls pageBack
   */
  private plnTosMntServicePageBack(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/pageback', JSON.stringify(container), options);

  }

  /**
   * Back end calls pageForward
   */
  private plnTosMntServicePageForward(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/pageforward', JSON.stringify(container), options);

  }

  /**
   * Back end calls showFreshRpdma38
   */
  private plnTosMntServiceShowFreshRpdma38(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/showfreshrpdma38', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRoutine
   */
  private plnTosMntServiceMainRoutine(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/mainroutine', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainRunRpdma38
   */
  private plnTosMntServiceMainRunRpdma38(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/mainrunrpdma38', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancel
   */
  private plnTosMntServiceCancel(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/quality/services/plntosmnt/plntosmntservice/cancel', JSON.stringify(container), options);

  }
}

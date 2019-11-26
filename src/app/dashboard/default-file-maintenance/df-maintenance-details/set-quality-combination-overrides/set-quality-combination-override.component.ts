import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Dfhcommarea,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  PaginatorNonMaterialComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {Container} from './model/container.model';
import {Rpdma86} from './model/rpdma86.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltycombovrd::setqltycombovrd::setqltycombovrd
 */
@Component({
  selector: 'fox-set-qual-comb-override',
  templateUrl: './set-quality-combination-override.component.html'

})
export class SetQualityCombinationOverrideComponent implements OnInit {
  screen = new Rpdma86();
  common = new Dfhcommarea();
  container = new Container();
  page: number = 1;

  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  data: any;
  viewData: any[];
  pageTotal = 0;
  pageSizeSelected = 5;
  currentPage = 0;
  cloneData: any[] = [];

  get dataLengthInput(): number {
    return (!!this.container) ? ((!!this.screen.m86comboTable.m86combos) ? this.screen.m86comboTable.m86combos.length : 0) : 0;
  }

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private loginService: LoginService
  ) {
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
      this.common = new Dfhcommarea();
    }
    this.setQltyCombOvrdServiceMainProcedure(this.common).subscribe(res => {
      container = res;
      this.container = container;
      this.screen = container.rpdma86;
      this.common = container.dfhcommarea;

      this.viewData = this.screen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
      this.pageTotal = Math.ceil(this.screen.m86comboTable.m86combos.length / this.paginator.pageSize);
    });

  }

  calculateNewPage(): void {
    this.viewData = this.screen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.m86comboTable.m86combos.length / this.paginator.pageSize);
  }

  /**
   * Event action F1EventClick
   */
  f1EventClick(): void {
    let container = new Container();
    let data: any = undefined;
    /**
     *let common = new Dfhcommarea();
     *let screen = new Rpdma86();
     */

    container.rpdma86 = this.screen;

    container.dfhcommarea = this.common;
    this.setQltyCombOvrdServiceCancelTrans(this.container).subscribe(res => {
      container = res;
      this.screen = container.rpdma86;
      this.common = container.dfhcommarea;

      data = this.transferSrv.getData();
      data['container'] = container;
      if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
      } else {
        data['common'] = this.common;
        this.router.navigate(['/dashboard/operator-default-file']);
      }
    });

  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {

    let container = new Container();
    let data: any = undefined;

    /** let common = new Dfhcommarea();
     *let screen = new Rpdma86();
     */

    this.container.rpdma86 = this.screen;

    this.container.dfhcommarea = this.common;
    this.setQltyCombOvrdServiceProcessTrans(this.container).subscribe(res => {
      container = res;
      this.container = container;
      this.screen = container.rpdma86;
      this.common = container.dfhcommarea;

      data = this.transferSrv.getData();
      data['container'] = container;
      if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
      } else {
        data['common'] = this.common;
        this.router.navigate(['/dashboard/operator-default-file']);
      }
      this.pushAlert(this.screen.m86err1f);
    });

  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.messageBoxService.addMessageBox('Set Quality Combinations', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.messageBoxService.addMessageBox('Set Quality Combinations', MessageBoxType.ACTIVE, message);
      } else {
        this.messageBoxService.addMessageBox('Set Quality Combinations', MessageBoxType.ERROR, message);
      }
    }
  }

  /**
   * Back end calls processTrans
   */
  private setQltyCombOvrdServiceProcessTrans(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/processtrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcedure
   */
  private setQltyCombOvrdServiceMainProcedure(common: Dfhcommarea): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/mainprocedure', JSON.stringify(common), options);

  }

  /**
   * Back end calls cancelTrans
   */
  private setQltyCombOvrdServiceCancelTrans(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.loginService.loginState.access_token
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/canceltrans', JSON.stringify(container), options);

  }
}

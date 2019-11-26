import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PaginatorNonMaterialComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {M86combos} from './model/m86combos.model';
import {Rpdma86} from './model/rpdma86.model';

@Component({
  selector: 'fox-temp-set-quality-comb',
  templateUrl: './temp-set-quality-comb.component.html',
  styleUrls: ['./temp-set-quality-comb.component.css']
})

export class TempSetQualityCombComponent implements OnInit {

  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  screen = new Rpdma86();
  common = new Dfhcommarea();
  container = new Container();
  viewData: M86combos[];
  pageTotal = 0;
  pageSizeSelected = 10;
  currentPage = 0;
  pageSizeDropdownOption = [5, 10, 20];
  location: string = '';

  get dataLengthInput(): number {
    return (!!this.screen) ? ((!!this.screen.m86comboTable.m86combos) ? this.screen.m86comboTable.m86combos.length : 0) : 0;
  }

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected titlecasePipe: TitleCasePipe,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService) {

  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    const data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.setQltyCombOvrdServiceMainProcedure(this.common).toPromise();
    this.container = container;
    this.screen = container.rpdma86;
    this.common = container.dfhcommarea;
    this.viewData = this.screen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.m86comboTable.m86combos.length / this.paginator.pageSize);
    if (this.screen.m86err1f) {
      this.opMaintenance.displayMessage(this.screen.m86err1f);
    }
    this.location = this.screen.m86typlf ? this.titlecasePipe.transform(this.screen.m86typlf).substr(0, this.screen.m86typlf.length - 1) : '';
    return true;
  }

  /**
   * Event action F1EventClick
   */
  async cancelEventClick(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    container.rpdma86 = this.screen;
    container.dfhcommarea = this.common;
    container = await this.setQltyCombOvrdServiceCancelTrans(this.container).toPromise();
    this.screen = container.rpdma86;
    this.common = container.dfhcommarea;

    data = this.transferSrv.getData();
    data['container'] = container;
    if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
    } else {
      data['common'] = this.common;
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    }

    return true;
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {

    let container = new Container();
    let data: any = undefined;
    this.container.rpdma86 = this.screen;
    this.container.dfhcommarea = this.common;
    container = await this.setQltyCombOvrdServiceProcessTrans(this.container).toPromise();
    this.container = container;
    this.screen = container.rpdma86;
    this.common = container.dfhcommarea;
    this.calculateNewPage();
    data = this.transferSrv.getData();
    data['container'] = container;
    if (data['container'].dfhcommarea.operDfltCmnArea[0].cvcomReturnStatus === '') {
    } else {
      data['common'] = this.common;
      this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    }
    if (this.screen.m86err1f) {
      this.opMaintenance.displayMessage(this.screen.m86err1f);
    }
    window.scrollTo(0, 0);
    return true;
  }

  calculateNewPage(): void {
    this.viewData = this.screen.m86comboTable.m86combos.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.screen.m86comboTable.m86combos.length / this.paginator.pageSize);
  }

  /**
   * Back end calls processTrans
   */
  private setQltyCombOvrdServiceProcessTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/processtrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls mainProcedure
   */
  private setQltyCombOvrdServiceMainProcedure(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/mainprocedure', JSON.stringify(common), options);

  }

  /**
   * Back end calls cancelTrans
   */
  private setQltyCombOvrdServiceCancelTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltycombovrd/setqltycombovrdservice/canceltrans', JSON.stringify(container), options);

  }

}

import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {dftSetQltyVerifyMsg} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdma96} from './model/rpdma96.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltydflt::setqltydflt::setqltydflt
 */

@Component({
  selector: 'fox-op-dft-set-quality',
  templateUrl: './op-dft-set-quality.component.html',
  styleUrls: ['./op-dft-set-quality.component.css']
})

export class OpDftSetQualityComponent implements OnInit {
  screenBean = new Rpdma96();
  common = new Dfhcommarea();
  buttonStatus = ButtonStatus.SUBMIT;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private pageHeaderService: PageHeaderService,
    protected opMaintenance: OpMaintenanceService
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    container = await this.setQltyDfltServiceMainProcedure(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screenBean = container.rpdma96;
    this.common = container.dfhCommonArea;
    this.pageHeaderService.customTitle = this.titleCase(this.screenBean.m96auth) + ' Set Quality ' + this.titleCase(this.screenBean.m96head);
    return true;
  }

  /**
   * Event action submitEventClick
   */
  async cancelEventClick(): Promise<boolean> {
    let container = new Container();
    container.rpdma96 = this.screenBean;
    container.dfhCommonArea = this.common;
    container = await this.setQltyDfltServiceCancel(container).toPromise();
    this.screenBean = container.rpdma96;
    this.common = container.dfhCommonArea;
    this.transferSrv.set('common', this.common);
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    return true;
  }

  async enterEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let container = new Container();
    container.rpdma96 = this.screenBean;
    container.dfhCommonArea = this.common;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      container = await this.setQltyDfltServiceMainRun(container).toPromise();
      this.screenBean = container.rpdma96;
      this.common = container.dfhCommonArea;
      this.transferSrv.set('common', this.common);
      if (this.screenBean.m96err1) {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.opMaintenance.displayMessageBox(this.screenBean.m96err1, dftSetQltyVerifyMsg);
      }
      if (container.screenName === 'RPD05O82') {
        this.setSuccess();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      } else if (container.screenName === 'RPD05O82') {
        this.setSuccess();
        this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
      }
      window.scrollTo(0, 0);
      return true;
    } catch {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
      return false;
    }
  }

  async resetEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.screenBean.m96pay = '';
    this.screenBean.m96npay = '';
    this.screenBean.m96corp = '';
    this.screenBean.m96ndoc = '';
    this.screenBean.m96nhos = '';
    this.screenBean.m96spec = '';
    this.screenBean.m96sclm = '';
    this.screenBean.m96ben = '';
    this.screenBean.m96admh = '';
    this.screenBean.m96pdn = '';
    this.screenBean.m96ltrs = '';
    this.screenBean.m96revd = '';
    this.screenBean.m96exs = '';
    this.screenBean.m96comm = '';
    this.screenBean.m96revs = '';
    this.screenBean.m96paya = '';
    this.screenBean.m96deci = '';
    this.screenBean.m96revp = '';
    this.screenBean.m96smem = '';
    this.screenBean.m96ver1 = '';
    this.screenBean.m96ver2 = '';
    this.screenBean.m96mltr = '';
    this.screenBean.m96asna = '';
    this.screenBean.m96asnp = '';
    this.screenBean.m96asha = '';
    this.screenBean.m96ashp = '';
    this.screenBean.m96nasa = '';
    this.screenBean.m96nasp = '';
    this.screenBean.m96naha = '';
    this.screenBean.m96nahp = '';
    for (let i = 0; i < this.screenBean.mapMessagesList.length; i++) {
      this.screenBean.mapMessagesList[i].m96mes = '';
      this.screenBean.mapMessagesList[i].m96msp = '';
    }
    for (let i = 0; i < this.screenBean.mapCautionsList.length; i++) {
      this.screenBean.mapCautionsList[i].m96cm = '';
      this.screenBean.mapCautionsList[i].m96cp = '';
    }
    for (let i = 0; i < this.screenBean.mapLtrsList.length; i++) {
      this.screenBean.mapLtrsList[i].m96lt = '';
      this.screenBean.mapLtrsList[i].m96lp = '';
    }
    return true;
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  private resetState(): void {
    setTimeout(() => {
      this.buttonStatus = ButtonStatus.SUBMIT;
    }, 2500);
  }

  private setSuccess(): void {
    this.buttonStatus = ButtonStatus.SUCCESS;
    this.resetState();
  }

  /**
   * Back end calls programEntry
   */
  private setQltyDfltServiceMainProcedure(common: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltydflt/setqltydfltservice/mainprocedure', JSON.stringify(this.common), options);

  }

  private setQltyDfltServiceCancel(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltydflt/setqltydfltservice/cancel', JSON.stringify(container), options);

  }

  private setQltyDfltServiceMainRun(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltydflt/setqltydfltservice/mainrun', JSON.stringify(container), options);

  }

  private setQltyDfltServiceShowFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltydflt/setqltydfltservice/showfreshmap', JSON.stringify(container), options);

  }

}

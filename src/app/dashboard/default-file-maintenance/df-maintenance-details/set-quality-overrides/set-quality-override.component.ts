import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService} from '@fox/shared';
import {Container} from './model/container.model';
import {Rpdma85} from './model/rpdma85.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltyovrd::setqltyovrd::setqltyovrd
 */
@Component({
  selector: 'fox-set-quality-override',
  templateUrl: './set-quality-override.component.html',
  styleUrls: ['./set-quality-override.component.css']
})
export class SetQualityOverrideComponent implements OnInit {
  screen = new Rpdma85();
  common = new Dfhcommarea();
  buttonStatus = ButtonStatus.SUBMIT;
  container = new Container();
  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService,
                     private messageBoxService: MessageBoxService) {

  }
  /**
   * On Load Action
   */
  ngOnInit(): void {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new Rpdma85();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    if (this.common === undefined) {
      this.common = new Dfhcommarea();
    }
    this.setQltyOvrdServiceMainProcedure(this.common).subscribe(res => {
      container = res;
      this.screen = container.screenbean;
      if (this.screen.m85excts[0].m85tExcNo === '') {
        this.screen.excLocationDisp = false;
      } else {
        this.screen.excLocationDisp = true;
      }
      this.common = container.dfhCommonArea;
      this.container = container;
      this.pageHeaderService.customTitle = this.titleCase(this.screen.m85hed2) + ' Set Quality ' + this.titleCase(this.screen.m85head);
      this.pushAlert(this.screen.m85err1);
    });
  }

  /**
   * Event action CLEAREventClick
   */
  clearEventClick(): void {
    this.screen.m85pay = '';
    this.screen.m85npay = '';
    this.screen.m85corp = '';
    this.screen.m85ndoc = '';
    this.screen.m85nhos = '';
    this.screen.m85spec = '';
    this.screen.m85sclm = '';
    this.screen.m85ben = '';
    this.screen.m85admh = '';
    this.screen.m85pdn = '';
    this.screen.m85ltrs = '';
    this.screen.m85ltrs = '';
    this.screen.m85revd = '';
    this.screen.m85exs = '';
    this.screen.m85comm = '';
    this.screen.m85revs = '';
    this.screen.m85paya = '';
    this.screen.m85deci = '';
    this.screen.m85revp = '';
    this.screen.m85smem = '';
    this.screen.m85ver1 = '';
    this.screen.m85ver2 = '';
    this.screen.m85mltr = '';
    this.screen.m85asna = '';
    this.screen.m85asnp = '';
    this.screen.m85asha = '';
    this.screen.m85ashp = '';
    this.screen.m85nasa = '';
    this.screen.m85nasp = '';
    this.screen.m85naha = '';
    this.screen.m85nahp = '';
    for (let i = 0; i < this.screen.m85msgts.length; i++) {
      this.screen.m85msgts[i].m85tMsgNo = '';
      this.screen.m85msgts[i].m85tMsgPct = '';
    }
    for (let i = 0; i < this.screen.m85cmsgts.length; i++) {
      this.screen.m85cmsgts[i].m85tCmsgNo = '';
      this.screen.m85cmsgts[i].m85tCmsgPct = '';
    }
    for (let i = 0; i < this.screen.m85ltrsts.length; i++) {
      this.screen.m85ltrsts[i].m85tLtrs = '';
      this.screen.m85ltrsts[i].m85tLtrsPct = '';
    }
    for (let i = 0; i < this.screen.m85excts.length; i++) {
      this.screen.m85excts[i].m85tExcNo = '';
    }
  }

  /**
   * Event action ENTEREventClick
   */
  enterEventClick(): void {
    const common = new Dfhcommarea();
    const container = new Container();
    const screen = new Rpdma85();
    let data: any = undefined;
    this.container.screenbean = this.screen;
    this.container.dfhCommonArea = this.common;
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.setQltyOvrdServiceProcessTrans(this.container).subscribe(res => {
        this.container = res;
        this.screen = this.container.screenbean;
        this.common = this.container.dfhCommonArea;
        if (this.screen.m85excts[0].m85tExcNo === '') {
          this.screen.excLocationDisp = false;
        } else {
          this.screen.excLocationDisp = true;
        }
        data = this.transferSrv.getData();
        data['common'] = this.common;
        if (this.common.operDfltCmnArea[0].cvcomReturnStatus === 'V') {
          this.setSuccess();
          this.router.navigate(['/dashboard/operator-default-file']);
        }
        this.pushAlert(this.screen.m85err1);
      });
    } catch {
      this.buttonStatus = ButtonStatus.FAILED;
      this.resetState();
    }
  }

  async f1EventClick(): Promise<boolean> {
    let container = new Container();
    const common = new Dfhcommarea();
    const screen = new Rpdma85();
    container.screenbean = screen;
    container.dfhCommonArea = this.common;
    container = await this.setQltyOvrdServiceCancelTrans(container).toPromise();
    this.screen = container.screenbean;
    this.common = container.dfhCommonArea;
    this.transferSrv.set('common', this.common);
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
    return true;
  }

  private pushAlert(message: string, type?: string): void {
    if (message && type) {
      window.scrollTo(0, 0);
      this.setSuccess();
      this.messageBoxService.addMessageBox('Set Quality Override', MessageBoxType.SUCCESS, message);
    } else if (message) {
      window.scrollTo(0, 0);
      if (message.toLocaleUpperCase().includes('PLEASE VERIFY')) {
        this.setSuccess();
        this.messageBoxService.addMessageBox('Set Quality Override', MessageBoxType.ACTIVE, message);
      } else {
        this.buttonStatus = ButtonStatus.FAILED;
        this.resetState();
        this.messageBoxService.addMessageBox('Set Quality Override', MessageBoxType.ERROR, message);
      }
    }
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
   * Back end calls mainProcedure
   */
  private setQltyOvrdServiceMainProcedure(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltyovrd/setqltyovrdservice/mainprocedure', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls freshMap
   */
  private setQltyOvrdServiceFreshMap(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltyovrd/setqltyovrdservice/freshmap', JSON.stringify(container), options);

  }

  /**
   * Back end calls processTrans
   */
  private setQltyOvrdServiceProcessTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltyovrd/setqltyovrdservice/processtrans', JSON.stringify(container), options);

  }

  /**
   * Back end calls cancelTrans
   */
  private setQltyOvrdServiceCancelTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqltyovrd/setqltyovrdservice/canceltrans', JSON.stringify(container), options);

  }
}

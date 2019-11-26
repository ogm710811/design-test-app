import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Observable, Subscription} from 'rxjs';
import {OpMaintenanceService} from '@fox/shared';
import {opSetQualityVerifyMsg} from '../../operator-maintenance.constants';
import {Container} from './model/container.model';
import {M77cmsgt} from './model/m77cmsgt.model';
import {M77msgt} from './model/m77msgt.model';
import {M77palst} from './model/m77palst.model';
import {Rpdma77} from './model/rpdma77.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqlty::setqlty::setqlty
 */
@Component({
  selector: 'fox-op-setqlty',
  templateUrl: './op-set-quality.component.html',
  styleUrls: ['./op-set-quality.component.css']
})
export class OpSetQualityComponent implements OnInit, OnDestroy {
  screen = new Rpdma77();
  dfhcommarea = new Dfhcommarea();
  container = new Container();
  titleName: string = '';
  msgTableData: M77msgt[] = [];
  cmsgTableData: M77cmsgt[] = [];
  palsTableData: M77palst[] = [];
  buttonStatus: string = ButtonStatus.SUBMIT;
  btnAction: string;
  inputData: any;
  subscription: Subscription;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     protected titlecasePipe: TitleCasePipe,
                     private messageBoxService: MessageBoxService,
                     private opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let common = new Dfhcommarea();
    let data: any = undefined;
    data = this.transferSrv.getData();
    common = data['common'];
    this.dfhcommarea = common;
    this.dfhcommarea = this.dfhcommarea === undefined ? this.dfhcommarea = new Dfhcommarea() : this.dfhcommarea;
    this.container = await this.setQltyServiceMainProcedure(this.dfhcommarea).toPromise();
    data = this.transferSrv.getData();
    this.inputData = {...this.container.rpdma77};
    this.screen = this.container.rpdma77;
    if (this.screen && this.screen.m77msgTable) {
      this.msgTableData = this.screen.m77msgTable.m77msgts;
    }
    if (this.screen && this.screen.m77cmsgTable) {
      this.cmsgTableData = this.screen.m77cmsgTable.m77cmsgts;
    }
    if (this.screen && this.screen.m77palsTable) {
      this.palsTableData = this.screen.m77palsTable.m77palsts;
    }
    this.dfhcommarea = this.container.dfhcommarea;
    this.titleName = this.titlecasePipe.transform(this.screen.m77titl);
    if (this.screen.m77err1) {
      this.opMaintenance.displayMessageBox(this.screen.m77err1, opSetQualityVerifyMsg);
    }
    if (this.screen.m77err2) {
      this.opMaintenance.displayMessageBox(this.screen.m77err2, opSetQualityVerifyMsg);
    }
    this.pageHeaderService.customTitle = this.titleCase(this.screen.m77titl) + ' Operator Set Quality';
    return true;

  }

  onEventChange(key, $event, warning): void {
    if ($event && $event.target) {
      if (this.inputData[key] === $event.target.value) {
        this.screen[warning] = 'N';
      } else {
        this.screen[warning] = 'Y';
      }
    }
  }

  /**
   * Event action processTrans
   */
  async processTrans(): Promise<boolean> {
    try {
      this.buttonStatus = ButtonStatus.WORKING;
      this.messageBoxService.reset();
      this.messageBoxService.reset();
      this.container.rpdma77 = this.screen;
      let container2 = new Container();
      let data: any = undefined;
      this.container.dfhcommarea = this.dfhcommarea;
      container2 = await this.setQltyServiceProcessTrans(this.container).toPromise();
      this.container = container2;
      this.screen = container2.rpdma77;
      this.dfhcommarea = container2.dfhcommarea;
      if (this.screen.m77err1) {
        this.checkMessageType(this.screen.m77err1);
        this.opMaintenance.displayMessageBox(this.screen.m77err1, opSetQualityVerifyMsg);
      }
      if (this.screen.m77err2) {
        this.checkMessageType(this.screen.m77err2);
        this.opMaintenance.displayMessageBox(this.screen.m77err2, opSetQualityVerifyMsg);
      }
      if (container2.rpdma77.m77err1 === '') {
        data = this.transferSrv.getData();
        data['container'] = container2;
        if (data['container'].dfhcommarea.operInfoCmnArea.opcomMessageInd === 'P') {
          data['common'] = this.dfhcommarea;
          this.changebtnStatus(ButtonStatus.SUCCESS);
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
        }
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.changebtnStatus(ButtonStatus.FAILED);
    }
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  changebtnStatus(status: string): void {
    this.buttonStatus = status;
    this.resetState();
  }

  checkMessageType(errorMsg: string): void {
    if (errorMsg.toLocaleUpperCase().includes('PLEASE VERIFY')) {
      this.changebtnStatus(ButtonStatus.SUCCESS);
    } else {
      this.changebtnStatus(ButtonStatus.FAILED);
    }
  }

  async cancelEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    this.container.rpdma77 = this.screen;
    let container = new Container();
    let data: any = undefined;
    container.rpdma77 = this.screen;
    container.dfhcommarea = this.dfhcommarea;
    container = await this.setQltyServiceCancelTrans(this.container).toPromise();
    this.container = container;
    this.screen = container.rpdma77;
    this.dfhcommarea = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.dfhcommarea;
    this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile]);
    return true;
  }

  /**
   * Event action ClearEventClick
   */
  async resetEventClick(): Promise<boolean> {
    this.messageBoxService.reset();
    let tempScreen = new Rpdma77();
    tempScreen = {...this.screen};
    this.screen = new Rpdma77();
    this.screen.m77ions = tempScreen.m77ions;
    this.screen.m77name = tempScreen.m77name;
    this.screen.m77alvl = tempScreen.m77alvl;
    this.screen.m77posl = tempScreen.m77posl;
    this.screen.m77mdat = tempScreen.m77mdat;
    this.screen.m77mion = tempScreen.m77mion;
    this.screen.m77titl = tempScreen.m77titl;
    tempScreen = new Rpdma77();

    for (let i = 0; i < this.msgTableData.length; i++) {
      this.msgTableData[i].m77tMsgNo = '';
      this.msgTableData[i].m77tMsgPct = '';
    }
    for (let i = 0; i < this.cmsgTableData.length; i++) {
      this.cmsgTableData[i].m77tCmsgNo = '';
      this.cmsgTableData[i].m77tCmsgPct = '';
    }
    for (let i = 0; i < this.palsTableData.length; i++) {
      this.palsTableData[i].m77tPals = '';
      this.palsTableData[i].m77tPalsPct = '';
    }
    return true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private titleCase(str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  /**
   * Back end calls Main
   */
  private setQltyServiceMainProcedure(dfhcommarea: Dfhcommarea): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqlty/setqltyservice/mainProcedure', JSON.stringify(dfhcommarea), options);
  }

  /**
   * Back end calls processTrans
   */
  private setQltyServiceProcessTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqlty/setqltyservice/processTrans', JSON.stringify(this.container), options);
  }

  private setQltyServiceCancelTrans(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/operator/services/setqlty/setqltyservice/cancelTrans', JSON.stringify(this.container), options);
  }
}

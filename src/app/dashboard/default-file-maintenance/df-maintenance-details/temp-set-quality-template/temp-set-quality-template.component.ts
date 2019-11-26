import {HttpClient} from '@angular/common/http';
import {Component, ComponentFactoryResolver, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  dashboardRoutePathDefaultFile,
  dashboardRoutePathRoot,
  Dfhcommarea,
  MessageBoxService,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {OpMaintenanceService, ButtonStatus, PageHeaderService, ProcessClaimHeaderRightComponent, HeaderRightItem} from '@fox/shared';
import {Container} from './model/container.model';
import {M79cmsgt} from './model/setqltytmplt/m79cmsgt.model';
import {M79ltrst} from './model/setqltytmplt/m79ltrst.model';
import {M79msgt} from './model/setqltytmplt/m79msgt.model';
import {ScreenMap} from './model/setqltytmplt/screen-map.model';
import {WsModuleCommarea} from './model/wsmodulecommarea/ws-module-commarea.model';
import {Subscription} from 'rxjs/index';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::setqltytmpltservice::SetQltyTmpltService::SetQltyTmpltServiceScreen
 */
@Component({
  selector: 'fox-temp-set-quality-template',
  templateUrl: './temp-set-quality-template.component.html',
  styleUrls: ['./temp-set-quality-template.component.css']
})
export class TempSetQualityTemplateComponent implements OnInit {
  screenMap = new ScreenMap();
  ltrst: M79ltrst[] = [];
  msgt: M79msgt[] = [];
  cmsgt: M79cmsgt[] = [];
  dfhcommarea = new Dfhcommarea();
  wsModuleCommarea = new WsModuleCommarea();
  titleName: string = '';
  buttonStatus: string = ButtonStatus.SUBMIT;
  btnAction: string;
  inputData: any;
  subscription: Subscription;

  public constructor(protected activatedRoute: ActivatedRoute,
                     protected httpClient: HttpClient,
                     protected router: Router,
                     protected transferSrv: TransferSrvService,
                     private messageBoxService: MessageBoxService,
                     protected opMaintenance: OpMaintenanceService,
                     private pageHeaderService: PageHeaderService,
                     private componentFactoryResolver: ComponentFactoryResolver,
                     private injector: Injector ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {

    let container = new Container();

    let data: any = undefined;
    data = this.transferSrv.getData();
    if (data['common']) {
      container.dfhcommarea = data['common'];
    } else {
      container.dfhcommarea = new Dfhcommarea();
    }
    this.subscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.btnAction = item;
      if (this.btnAction && this.btnAction === 'q') {
        this.btnClick('PF5');
      }
    });
    if (data['wsmodule']) {
      container.wsModuleCommarea = data['wsmodule'];
    } else {
      container.wsModuleCommarea = this.wsModuleCommarea;
    }

    this.screenMap.m79msgts = this.msgt;

    this.screenMap.m79cmsgts = this.cmsgt;

    this.screenMap.m79ltrsts = this.ltrst;

    container.screenMap = this.screenMap;
    container = await this.setQltyTmpltServiceMainProcedure(container).toPromise();
    this.dfhcommarea = container.dfhcommarea;
    this.wsModuleCommarea = container.wsModuleCommarea;

    this.screenMap = container.screenMap;

    this.msgt = this.screenMap.m79msgts;

    this.cmsgt = this.screenMap.m79cmsgts;

    this.ltrst = this.screenMap.m79ltrsts;

    this.titleName = this.titleCase(this.screenMap.m79headi);

    if (this.screenMap.m79msg1i) {
      this.opMaintenance.displayMessage(this.screenMap.m79msg1i);
    }
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        secondButton: {
          display: 'Set Quality Combinations (Q)', identifier: 'q', tab: 'alt+q'
        }
      },
      this.componentFactoryResolver,
      this.injector
    );
    this.pageHeaderService.customTitle =  this.titleCase(this.screenMap.m79headi) + ' Set Quality Template';
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action btnClick
   */
  async btnClick(keyPressed: string): Promise<boolean> {
    try {
      this.messageBoxService.reset();
      let container = new Container();
      container.dfhcommarea = this.dfhcommarea;
      container.wsModuleCommarea = this.wsModuleCommarea;
      this.screenMap.m79msgts = this.msgt;
      this.screenMap.m79cmsgts = this.cmsgt;
      this.screenMap.m79ltrsts = this.ltrst;
      container.screenMap = this.screenMap;
      container.eibaid = keyPressed;
      if (keyPressed === 'ENTER') {
        this.buttonStatus = ButtonStatus.WORKING;
        this.resetState();
      }
      container = await this.setQltyTmpltServiceMainProcedure(container).toPromise();
      this.dfhcommarea = container.dfhcommarea;
      this.wsModuleCommarea = container.wsModuleCommarea;
      this.screenMap = container.screenMap;
      this.msgt = this.screenMap.m79msgts;
      this.cmsgt = this.screenMap.m79cmsgts;
      this.ltrst = this.screenMap.m79ltrsts;
      if (keyPressed === 'CLEAR') {
        let tempScreen = new ScreenMap();
        tempScreen = {...this.screenMap};
        this.screenMap = new ScreenMap();
        for (let i = 0; i < this.msgt.length; i++) {
          this.msgt[i].m79tMsgNo = '';
          this.msgt[i].m79tMsgPct = '';
        }
        for (let i = 0; i < this.ltrst.length; i++) {
          this.ltrst[i].m79tLtrs = '';
          this.ltrst[i].m79tLtrsPct = '';
        }
        for (let i = 0; i < this.cmsgt.length; i++) {
          this.cmsgt[i].m79tCmsgNo = '';
          this.cmsgt[i].m79tCmsgPct = '';
        }
        this.screenMap.m79tempi = tempScreen.m79tempi;
        this.screenMap.m79datei = tempScreen.m79datei;
        this.screenMap.m79ionsi = tempScreen.m79ionsi;
        this.buttonStatus = ButtonStatus.WORKING;
        this.resetState();
      }
      if (this.screenMap.m79msg2i) {
        this.opMaintenance.displayMessage(this.screenMap.m79msg2i);
      }
      if (this.dfhcommarea.nextProgram !== '') {
        const data = this.transferSrv.getData();
        data['common'] = container.dfhcommarea;
        console.log('container.dfhcommarea.nextProgram : ' + container.dfhcommarea.nextProgram);
        if (container.dfhcommarea.nextProgram === 'RPD05O82') {
          this.changeBtnStatus(ButtonStatus.SUCCESS);
          this.router.navigate([dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile]);
        } else if (container.dfhcommarea.nextProgram === 'RPD07O00') {
          this.changeBtnStatus(ButtonStatus.SUCCESS);
          this.router.navigate(['/setqltytmpltasgn']);
        } else if (container.dfhcommarea.nextProgram === 'RPD05O68') {
          this.changeBtnStatus(ButtonStatus.SUCCESS);
          this.router.navigate(['/dfltovrdpendverfservice']);
        } else if (container.dfhcommarea.nextProgram === 'RPD05O81') {
          this.changeBtnStatus(ButtonStatus.SUCCESS);
          this.router.navigate(['/setqltycombtmplt']);
        }
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.changeBtnStatus(ButtonStatus.FAILED);
    }
    return true;
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = ButtonStatus.SUBMIT, 2500);
  }

  changeBtnStatus(status: string): void {
    this.buttonStatus = status;
    this.resetState();
  }

  private titleCase (str): string {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }
  /**
   * Back end calls mainProcedure
   */
  private setQltyTmpltServiceMainProcedure(container: Container): Observable<Container> {
    const headers = this.opMaintenance.getHeader();
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/operator/services/setqltytmpltservice/setqltytmpltservice/mainprocedure', JSON.stringify(container), options);

  }
}

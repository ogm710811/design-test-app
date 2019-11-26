import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ButtonStatus,
  claimProcessingRoutePathProcessAddrVerf,
  claimProcessingRoutePathRoot,
  Dfhcommarea,
  HeaderMaintenanceService,
  HeaderSubtitleItem,
  MessageBoxService,
  MessageBoxType,
  PageHeaderService,
  ProcessClaimSubheaderComponent,
  TransferSrvService
} from '@fox/shared';
import {Observable} from 'rxjs/Observable';
import {ManualClaimService} from '../../manual-claim-intake/manual-claim-service.service';
import {Rpdmb22} from '../type-of-service/model/rpdmb22.model';
import {Container} from './model/container.model';
import {Rpdmac7} from './model/rpdmac7.model';
import {NgForm} from '@angular/forms';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmaddclminfo::procclmaddclminfo::procclmaddclminfo
 */
@Component({
  selector: 'fox-app-procclmaddclminfo',
  templateUrl: './process-claim-addtional-claim-info.component.html',
  styleUrls: ['./process-claim-addtional-claim-info.component.css']
})
export class ProcclmaddclminfoComponent implements OnInit, AfterViewChecked {
  @ViewChild('selectClaimType') selectClaimType: ElementRef;
  common = new Dfhcommarea();
  screen = new Rpdmac7();
  container = new Container();

  items: any[] = [
    {key: '', value: ''},
    {key: 'I', value: 'Institutional'},
    {key: 'P', value: 'Professional'}
  ];
  showSelected: string;
  screeBean = new Rpdmb22();
  isHeaderOn = false;
  continueStatus = ButtonStatus.SUBMIT;

  public constructor(
    protected activatedRoute: ActivatedRoute,
    protected httpClient: HttpClient,
    protected router: Router,
    protected transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    protected headerMaintenance: HeaderMaintenanceService,
    private manualCalimService: ManualClaimService,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
  }

  /**
   * On Load Action
   */
  async ngOnInit(): Promise<boolean> {
    let data: any = undefined;
    let container = new Container();
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.procClmAddClmInfoServiceMain(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screenbean;
    this.common = container.dfhCommArea;
    this.container = container;
    if (this.screen.mc7err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.mc7err1);
    }
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Additional Claim Information';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: this.manualCalimService.screenBean ? this.manualCalimService.screenBean.m22nam : 'N/A',
          account: this.manualCalimService.screenBean ? this.manualCalimService.screenBean.m22memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);

      const subheadertitle = document.getElementById('subheadertitle');
      if (subheadertitle) {
        this.isHeaderOn = true;
      }
    }
  }

  goToPrevious(): void {
  }

  clear(form: NgForm): void {
    form.resetForm();
    this.screen.mc7cltp = '';
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    this.continueStatus = ButtonStatus.WORKING;
    let container = new Container();
    let data: any = undefined;
    this.container.screenbean = this.screen;
    try {
      container = await this.procClmAddClmInfoServiceProcessScreenData(this.container).toPromise();
      this.screen = container.screenbean;
      this.common = container.dfhCommArea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (container.dfhCommArea.nextProgram === 'RPD06O16') {
        this.continueStatus = ButtonStatus.SUCCESS;
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessAddrVerf]);
      }
      if (this.screen.mc7err1) {
        this.continueStatus = ButtonStatus.FAILED;
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ACTIVE, this.screen.mc7err1);
      }
      return true;
    } catch {
      this.continueStatus = ButtonStatus.FAILED;
      return false;
    }
  }

  /**
   * Back end calls main
   */
  private procClmAddClmInfoServiceMain(commonArea: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddclminfo/procclmaddclminfoservice/main', JSON.stringify(commonArea), options);

  }

  /**
   * Back end calls processScreenData
   */
  private procClmAddClmInfoServiceProcessScreenData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmaddclminfo/procclmaddclminfoservice/processscreendata', JSON.stringify(container), options);

  }
}

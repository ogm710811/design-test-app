import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathClaimDrugEob,
  claimProcessingRoutePathClaimMedSuppEob,
  claimProcessingRoutePathProcessAddtionalClaimInfo,
  claimProcessingRoutePathProcessClaiHospSnf,
  claimProcessingRoutePathProcessClaimNopayEob,
  claimProcessingRoutePathReviewBillLineMessages,
  claimProcessingRoutePathReviewClaimMessages,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathServiceEob,
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
import {M35XrefTab} from './model/m35-xref-tab.model';
import {Rpdmb35} from './model/rpdmb35.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmmessages::ProcClmMessages::ProcClmMessages
 */
@Component({
  selector: 'fox-app-proc-clm-messages',
  templateUrl: './process-claim-messages.component.html',
  styleUrls: ['./process-claim-messages.component.css']
})
export class ProcessClaimMessagesComponent implements OnInit, AfterViewChecked {
  common = new Dfhcommarea();
  screen = new Rpdmb35();
  data: M35XrefTab;
  viewData: M35XrefTab[];
  pageSizeSelected = 3;
  showCrossRef: boolean = false;
  isHeaderOn = false;
  memberDemographicsBean = new Rpdmb22();
  buttonStatus: string = 'Submit';
  patientTitle: string = 'Patient';
  patientSubTitle: string = 'Enter Patient number below.';
  patternTitle: string = 'Pattern Paragraphs';
  patternSubTitle: string = 'Enter up to 7 claim messages below.';
  memoTitle: string = 'Special Memos';
  memoSubTitle: string = 'Add special memos below. Include message indicator if needed.';
  claimNoteTitle: string = 'Claim Note';
  claimNoteSubTitle: string = 'Add note below (400 character limit).';
  crossReferenceTitle: string = 'Cross References';
  crossReferenceSubTitle: string = 'Enter any applicable Cross Reference codes below.';
  communicationTitle: string = 'Communication Letters';
  communicationSubTitle: string = 'Enter any applicable Communication Letter codes below.';
  specialMemo1: string = '';
  specialMemo2: string = '';
  crossRefNum1: string = '';
  crossRefNum2: string = '';
  crossRefNum3: string = '';
  textAreaElementsFlg: boolean = false;

  public constructor(
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
    let container = new Container();
    const screen = new Rpdmb35();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    container = await this.procClmMessagesServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screen;
    if (this.screen && this.screen.rpdmb35Screen && this.screen.rpdmb35Screen.m35XrefTabs) {
      this.screen.rpdmb35Screen.m35XrefTabs = this.screen.rpdmb35Screen.m35XrefTabs.map((item, index) => {
        if (index === 0) {
          this.crossRefNum1 = this.getCombinedCrossReferenceNumber(item);
        } else if (index === 1) {
          this.crossRefNum2 = this.getCombinedCrossReferenceNumber(item);
        } else if (index === 2) {
          this.crossRefNum3 = this.getCombinedCrossReferenceNumber(item);
        }
        return item;
      });
    }

    this.memberDemographicsBean = this.manualCalimService.screenBean;
    this.viewData = container.screen.rpdmb35Screen.m35XrefTabs;
    this.common = container.dfhcommarea;
    this.showCrossRef = screen.rpdmb35Screen.m35XrefTabs.length > 0;
    if (this.screen.m35err1) {
      this.messageBoxService.addMessageBox('Alert', MessageBoxType.ACTIVE, this.screen.m35err1);
    }
    window.scrollTo(0, 0);
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Claim Messages';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(ProcessClaimSubheaderComponent, {
          memberName: (this.screen) ? this.screen.m35name : 'N/A',
          account: (this.screen) ? this.screen.m35memn : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector);
    }
    const textAreaElements = document.getElementsByTagName('textarea');
    if (textAreaElements && !this.textAreaElementsFlg) {
      for (let i = 0; i < textAreaElements.length; i++) {
        textAreaElements[i].style.resize = 'none';
      }
      this.textAreaElementsFlg = true;
    }
  }

  /**
   * Event action ENTEREventClick
   */

  getCrossReferenceNumber(): void {
    const crossReferenceArray: string[] = [this.crossRefNum1, this.crossRefNum2, this.crossRefNum3];
    if (this.screen && this.screen.rpdmb35Screen && this.screen.rpdmb35Screen.m35XrefTabs) {
      this.screen.rpdmb35Screen.m35XrefTabs = this.screen.rpdmb35Screen.m35XrefTabs.map((item, index) => {
        if (crossReferenceArray[index] !== undefined) {
          item.m35XrefYr = crossReferenceArray[index].slice(0, 1);
          item.m35XrefDays = crossReferenceArray[index].slice(1, 4);
          item.m35XrefCart = crossReferenceArray[index].slice(4, 5);
          item.m35XrefLoc = crossReferenceArray[index].slice(5, 8);
          item.m35XrefSeq = crossReferenceArray[index].slice(8, 11);
        }
        return item;
      });
    }
  }

  getSpecialMemo(): void {
    const specialMemo1Length = this.specialMemo1.length;
    if (specialMemo1Length > 0) {
      this.screen.m35sm11 = this.specialMemo1.slice(0, 79);
    }
    if (specialMemo1Length > 79) {
      this.screen.m35sm12 = this.specialMemo1.slice(79, 158);
    }
    if (specialMemo1Length > 158) {
      this.screen.m35sm13 = this.specialMemo1.slice(158, 237);
    }
    if (specialMemo1Length > 237) {
      this.screen.m35sm14 = this.specialMemo1.slice(237, 316);
    }
    const specialMemo2Length = this.specialMemo2.length;
    if (specialMemo2Length > 0) {
      this.screen.m35sm21 = this.specialMemo2.slice(0, 79);
    }
    if (specialMemo2Length > 79) {
      this.screen.m35sm22 = this.specialMemo2.slice(79, 158);
    }
    if (specialMemo2Length > 158) {
      this.screen.m35sm23 = this.specialMemo2.slice(158, 237);
    }
    if (specialMemo2Length > 237) {
      this.screen.m35sm24 = this.specialMemo2.slice(237, 316);
    }
  }

  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();
      this.getCrossReferenceNumber();
      this.getSpecialMemo();
      container.screen = this.screen;
      container.screen.m35cmnd = 'ENTER';
      container.dfhcommarea = this.common;
      let data: any = undefined;
      container = await this.procClmMessagesServiceEditChanges(container).toPromise();
      this.screen = container.screen;
      this.common = container.dfhcommarea;
      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.screen.m35err1) {
        this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m35err1);
        this.changeButtonStatus('Failed');
      }
      if (container.workstorage.wsReturnPgm === 'RPD06O11' || container.dfhcommarea.nextProgram === 'RPD06O11') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaiHospSnf]);
      }
      if (container.workstorage.wsReturnPgm === 'RPD06O12' || container.dfhcommarea.nextProgram === 'RPD06O12') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimMedSuppEob]);
      }
      if (container.workstorage.wsReturnPgm === 'RPD06O13' || container.dfhcommarea.nextProgram === 'RPD06O13') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathServiceEob]);
      }
      if (container.workstorage.wsReturnPgm === 'RPD06O21' || container.dfhcommarea.nextProgram === 'RPD06O21') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopayEob]);
      }
      if (container.workstorage.wsReturnPgm === 'RPD06O22' || container.dfhcommarea.nextProgram === 'RPD06O22') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimDrugEob]);
      }
      if (container.dfhcommarea.nextProgram === 'RPD06O25') {
        this.changeButtonStatus('Success!');
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessAddtionalClaimInfo]);
      }
    } catch (error) {
      this.changeButtonStatus('Failed');
    }
    return true;
  }

  getCombinedCrossReferenceNumber(item: M35XrefTab): string {
    return item.m35XrefYr + '' + item.m35XrefDays + '' + item.m35XrefCart + '' + item.m35XrefLoc + '' + item.m35XrefSeq;
  }

  changeButtonStatus(status: string): void {
    this.buttonStatus = status;
    this.resetState();
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  clearBtnEventClick(): void {
    this.screen.m35patn = '';
    this.screen.m35mes1 = '';
    this.screen.m35mes2 = '';
    this.screen.m35mes3 = '';
    this.screen.m35mes4 = '';
    this.screen.m35mes5 = '';
    this.screen.m35mes6 = '';
    this.screen.m35mes7 = '';
    this.screen.m35ppi1 = '';
    this.screen.m35sm11 = '';
    this.screen.m35ppi2 = '';
    this.screen.m35sm21 = '';
    this.screen.m35clnt = '';
    this.screen.m35cn1a = '';
    this.screen.m35cn1b = '';
    this.screen.m35cn2a = '';
    this.screen.m35cn2b = '';
    this.crossRefNum1 = '';
    this.crossRefNum2 = '';
    this.crossRefNum3 = '';
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    this.getCrossReferenceNumber();
    this.getSpecialMemo();
    container.screen = this.screen;
    container.dfhcommarea = this.common;
    let data: any = undefined;
    container = await this.procClmMessagesServicePf1Return(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (this.screen.rpdmb35Screen.m35ErrMsg) {
      this.messageBoxService.addMessageBox('Warning', MessageBoxType.ACTIVE, this.screen.rpdmb35Screen.m35ErrMsg);
    }
    if (container.dfhcommarea.nextProgram === 'RPD06O51') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
    }
    window.scrollTo(0, 0);
    return true;
  }

  /**
   * Event action pf6EventClick
   */
  async pf6EventClick(): Promise<boolean> {
    let container = new Container();
    this.getCrossReferenceNumber();
    this.getSpecialMemo();
    container.screen = this.screen;
    container.screen.m35cmnd = 'F6';
    container.dfhcommarea = this.common;
    let data: any = undefined;
    container = await this.procClmMessagesServiceDoFunctionKeys(container).toPromise();
    this.screen = container.screen;
    this.common = container.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (this.screen.m35err1) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m35err1);
    }
    if (container.workstorage.wsReturnPgm === 'RPD06O53') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewBillLineMessages]);
    }
    if (container.workstorage.wsReturnPgm === 'RPD06O56') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewClaimMessages]);
    }
    return true;
  }

  /**
   * Event action pf5EventClick
   */
  async pf5EventClick(): Promise<boolean> {
    const container = new Container();
    this.getCrossReferenceNumber();
    this.getSpecialMemo();
    container.screen = this.screen;
    container.screen.m35cmnd = 'F5';
    container.dfhcommarea = this.common;
    let containerOut = new Container();
    let data: any = undefined;
    containerOut = await this.procClmMessagesServiceDoFunctionKeys(container).toPromise();
    this.screen = containerOut.screen;
    this.common = containerOut.dfhcommarea;
    data = this.transferSrv.getData();
    data['common'] = this.common;
    if (this.screen.m35err1) {
      this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, this.screen.m35err1);
    }
    if (containerOut.workstorage.wsReturnPgm === 'RPD06O53') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewBillLineMessages]);
    }
    if (containerOut.workstorage.wsReturnPgm === 'RPD06O56') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathReviewClaimMessages]);
    }
    return true;
  }

  /**
   * Back end calls doFunctionKeys
   */
  private procClmMessagesServiceDoFunctionKeys(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmessages/procclmmessagesservice/dofunctionkeys', JSON.stringify(container), options);
  }

  /**
   * Back end calls pf1Return
   */
  private procClmMessagesServicePf1Return(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmessages/procclmmessagesservice/pf1return', JSON.stringify(container), options);
  }

  /**
   * Back end calls editChanges
   */
  private procClmMessagesServiceEditChanges(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmessages/procclmmessagesservice/editchanges', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private procClmMessagesServiceMainOperation(dfhComm: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmmessages/procclmmessagesservice/mainoperation', JSON.stringify(dfhComm), options);
  }
}

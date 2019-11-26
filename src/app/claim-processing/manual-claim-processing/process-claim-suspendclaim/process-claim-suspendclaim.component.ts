import {HttpClient} from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  claimProcessingRoutePathProcessEndofClaim,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathTypeOfService,
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
import {Container} from './model/container.model';
import {ReasonSelectModel} from './model/reason-select.model';
import {ScreenBean} from './model/screen-bean.model';

/**
 * Component/View
 * Qualified name:
 *   com::uhc::aarp::fox::online::procclmsuspendclm::procclmsuspendclm::procclmsuspendclm
 */
@Component({
  selector: 'fox-app-procclmsuspendclm',
  templateUrl: './process-claim-suspendclaim.component.html',
  styleUrls: ['./process-claim-suspendclaim.component.css']
})
export class ProcessClaimSuspendclaimComponent implements OnInit, AfterViewChecked {
  screen = new ScreenBean();
  common = new Dfhcommarea();
  suspensionCardTitle: string = 'Suspension Details';
  suspensionCardSubTitle: string = 'Tab to navigate and update fields. Click “Submit” (or use Alt + S or Enter) to proceed.';
  insuredNote: string = '';
  crossRefNum1: string = '';
  crossRefNum2: string = '';
  crossRefNum3: string = '';
  isHeaderOn: boolean = false;
  buttonStatus: string = 'Submit';
  textAreaElementsFlg: boolean = false;
  selectReasonItemsId: string = '';
  selectReasonItems: ReasonSelectModel[] = [
    {id: '0', name: '0 - Overpayments'},
    {id: '1', name: '1 - Location'},
    {id: '2', name: '2 - Supervisior'},
    {id: '3', name: '3 - Technical Unit'},
    {id: '4', name: '4 - Exceptional Suspense'},
    {id: '5', name: '5 - In-Transit'},
    {id: '6', name: '6 - Lead Examiner'},
    {id: '7', name: '7 - Electronic Claim'},
    {id: '8', name: '8 - Location Suspense'}
  ];

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
    let container = new Container();
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? this.common = new Dfhcommarea() : this.common;
    container = await this.procClmSuspendClmServiceMainOperation(this.common).toPromise();
    data = this.transferSrv.getData();
    this.screen = container.screenBean;
    this.selectReasonItemsId = this.screen.m39rsn;
    this.screen.m39rsn = this.screen.m39rsn === undefined ? '' : this.screen.m39rsn;
    this.crossRefNum1 = this.generateCrossReferenceNumber(this.screen.m39cr11, this.screen.m39cr21, this.screen.m39cr31, this.screen.m39cr41, this.screen.m39cr51);
    this.crossRefNum2 = this.generateCrossReferenceNumber(this.screen.m39cr12, this.screen.m39cr22, this.screen.m39cr32, this.screen.m39cr42, this.screen.m39cr52);
    this.crossRefNum3 = this.generateCrossReferenceNumber(this.screen.m39cr13, this.screen.m39cr23, this.screen.m39cr33, this.screen.m39cr43, this.screen.m39cr53);
    this.insuredNote = this.generateInsuredNote(this.screen.m39ins1, this.screen.m39ins2);
    this.common = container.dfhcomm;
    return true;
  }

  ngAfterViewChecked(): void {
    if (!this.isHeaderOn) {
      this.pageHeaderService.customTitle = 'Suspend Claim';
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        ProcessClaimSubheaderComponent,
        {
          memberName: (this.screen) ? this.screen.m39inam : 'N/A',
          account: (this.screen) ? this.screen.m39acct : 'N/A',
          claim: this.manualCalimService.data ? this.manualCalimService.data.claimNumber : 'N/A'
        },
        this.componentFactoryResolver,
        this.injector
      );
    }
    const textAreaElements = document.getElementsByTagName('textarea');
    if (textAreaElements && !this.textAreaElementsFlg) {
      for (let i = 0; i < textAreaElements.length; i++) {
        textAreaElements[i].style.resize = 'none';
      }
      this.textAreaElementsFlg = true;
      const selectContainer: any = document.querySelector('.ng-select .ng-select-container');
      if (selectContainer) {
        selectContainer.style.minHeight = '31px';
        selectContainer.style.height = '31px';
      }
      const selectContainerFocus: any = document.querySelector('.ng-select.ng-select-focused:not(.ng-select-opened)>.ng-select-container');
      if (selectContainerFocus) {
        selectContainer.style.border = '2px solid #196ECF';
        selectContainer.style.boxShadow = 'none';
      }
    }
  }

  generateCrossReferenceNumber(crossRef1: string, crossRef2: string, crossRef3: string, crossRef4: string, crossRef5: string): string {
    if (crossRef1 && crossRef2 && crossRef3 && crossRef4 && crossRef5) {
      return crossRef1 + '' + crossRef2 + '' + crossRef3 + '' + crossRef4 + '' + crossRef5;
    }
    return '';
  }

  generateInsuredNote(insuredNote1: string, insuredNote2: string): string {
    let insuredNote = '';
    if (insuredNote1) {
      insuredNote = insuredNote1;
      if (insuredNote2) {
        insuredNote = insuredNote + '' + insuredNote2;
      }
    }
    return insuredNote;
  }

  getCrossReferenceNumber(): void {
    if (this.crossRefNum1) {
      this.screen.m39cr11 = this.crossRefNum1.slice(0, 1);
      this.screen.m39cr21 = this.crossRefNum1.slice(1, 4);
      this.screen.m39cr31 = this.crossRefNum1.slice(4, 5);
      this.screen.m39cr41 = this.crossRefNum1.slice(5, 8);
      this.screen.m39cr51 = this.crossRefNum1.slice(8, 11);
    }
    if (this.crossRefNum2) {
      this.screen.m39cr12 = this.crossRefNum2.slice(0, 1);
      this.screen.m39cr22 = this.crossRefNum2.slice(1, 4);
      this.screen.m39cr32 = this.crossRefNum2.slice(4, 5);
      this.screen.m39cr42 = this.crossRefNum2.slice(5, 8);
      this.screen.m39cr52 = this.crossRefNum2.slice(8, 11);
    }
    if (this.crossRefNum3) {
      this.screen.m39cr13 = this.crossRefNum3.slice(0, 1);
      this.screen.m39cr23 = this.crossRefNum3.slice(1, 4);
      this.screen.m39cr33 = this.crossRefNum3.slice(4, 5);
      this.screen.m39cr43 = this.crossRefNum3.slice(5, 8);
      this.screen.m39cr53 = this.crossRefNum3.slice(8, 11);
    }
  }

  getInsuredNote(): void {
    const insuredNoteLength = this.insuredNote.length;
    if (insuredNoteLength > 0) {
      this.screen.m39ins1 = this.insuredNote.slice(0, 77);
    }
    if (insuredNoteLength > 79) {
      this.screen.m39ins2 = this.insuredNote.slice(77, 154);
    }
  }

  /**
   * Event action enterEventClick
   */
  async enterEventClick(): Promise<boolean> {
    try {
      this.buttonStatus = 'Working...';
      let container = new Container();
      let data: any = undefined;
      this.getCrossReferenceNumber();
      this.getInsuredNote();
      this.screen.m39rsn = this.selectReasonItemsId;
      container.screenBean = this.screen;
      container.dfhcomm = this.common;
      container = await this.procClmSuspendClmServiceScreenEnteredData(container).toPromise();
      this.screen = container.screenBean;
      data = this.transferSrv.getData();
      this.common = container.dfhcomm;
      data['common'] = this.common;
      if (this.screen.m39err) {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.messageBoxService.addMessageBox(this.screen.m39err, MessageBoxType.ERROR, '');
      }
      if (container.dfhcomm.nextProgram === 'RPD06O17') {
        this.buttonStatus = 'Success!';
        this.resetState();
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessEndofClaim]);
      }
      window.scrollTo(0, 0);
    } catch (error) {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
    return true;
  }

  clearBtnEventClick(): void {
    this.screen.m39loc = '';
    this.screen.m39rsn = '';
    this.screen.m39cm11 = '';
    this.screen.m39cm12 = '';
    this.screen.m39cm21 = '';
    this.screen.m39cm22 = '';
    this.insuredNote = '';
    this.crossRefNum1 = '';
    this.crossRefNum2 = '';
    this.crossRefNum3 = '';
    this.selectReasonItemsId = '';
    this.screen.m39cn1 = '';
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  /**
   * Event action pf1EventClick
   */
  async pf1EventClick(): Promise<boolean> {
    let container = new Container();
    container.screenBean = this.screen;
    container.dfhcomm = this.common;
    container = await this.procClmSuspendClmServicePf1Cancel(container).toPromise();
    this.screen = container.screenBean;
    this.common = container.dfhcomm;
    this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService]);
    return true;
  }

  /**
   * Back end calls pf1Cancel
   */
  private procClmSuspendClmServicePf1Cancel(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsuspendclm/procclmsuspendclmservice/pf1cancel', JSON.stringify(container), options);
  }

  /**
   * Back end calls mainOperation
   */
  private procClmSuspendClmServiceMainOperation(dfhcomm: Dfhcommarea): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsuspendclm/procclmsuspendclmservice/mainoperation', JSON.stringify(dfhcomm), options);
  }

  /**
   * Back end calls screenEnteredData
   */
  private procClmSuspendClmServiceScreenEnteredData(container: Container): Observable<Container> {
    const headers = this.headerMaintenance.getHeader();
    const options = {headers: headers};
    return this.httpClient.post<Container>('/api/manual/adjudication/services/procclmsuspendclm/procclmsuspendclmservice/screenentereddata', JSON.stringify(container), options);
  }
}

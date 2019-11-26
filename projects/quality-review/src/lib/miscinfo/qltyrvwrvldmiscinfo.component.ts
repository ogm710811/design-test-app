import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {LineDetailVO} from '@fox/rest-clients';
import {
  ButtonStatus,
  claimProcessingRoutePathBillLineMessages,
  claimProcessingRoutePathPrefixClaimDetails,
  claimProcessingRoutePathRoot,
  claimProcessingUrlPrefixClaimDetails,
  Dfhcommarea,
  HeaderRightItem,
  HeaderSubtitleItem,
  MemberInfoCard,
  MemberInfoRow,
  MessageBoxService,
  MessageBoxType,
  Oprec1Record,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {dupe_resp} from '@fox/test-support';
import * as momentConst from 'moment-timezone';
import {Observable, Subscription} from 'rxjs';
import {QualityReviewMiscService} from '../shared/quality-review-misc.service';
import {MiscInfoPageHeaderRightComponent} from './misc-info-page-header-right.component';
import {MiscInfoPageHeaderSubtitleComponent} from './misc-info-page-header-subtitle.component';
import {Container} from './model/container.model';
import {Rpdmb76} from './model/rpdmb76.model';

const moment = momentConst;

@Component({
  selector: 'fox-qltyrvwrvldmiscinfo',
  templateUrl: './qltyrvwrvldmiscinfo.component.html',
  styleUrls: ['./qltyrvwrvldmiscinfo.component.css'],
  entryComponents: [MiscInfoPageHeaderRightComponent, MiscInfoPageHeaderSubtitleComponent]
})
export class QltyrvwrvldmiscinfoComponent implements OnInit, OnDestroy {
  screenBean = new Rpdmb76();
  container = new Container();
  currentNav: number = 0;
  incomingClaim: LineDetailVO = new LineDetailVO();
  tableData: any = {};
  count = 0;
  memberInfo: MemberInfoCard = new MemberInfoCard();
  qualityErrors: string = '';
  qualityReasons: string[] = [];
  mostRecent: string = '';
  claimNumberLinkClicked: boolean = false;
  totalReviewed: string = '';
  totalSuspended: string = '';
  statisticIons: string = '';
  duplicateCheckResp: any;
  incomingChargeData: string[] = [];
  claimNumber: number = 0;
  submitStatus: ButtonStatus = ButtonStatus.SUBMIT;
  currentNavChangeSubscription: Subscription = new Subscription();
  tabTracker: any = {
    miscInfo: {
      tabId: 1,
    },
    cautions: {
      tabId: 2
    },
    duplicates: {
      tabId: 3
    },
    claimMessages: {
      tabId: 4
    },
    billMessages: {
      tabId: 5
    }
  };
  hiddenTabs: string[] = [];

  // Blank data to fill table until real data is sent to the screenbean
  plans: {planCode: string, dates?: string, reasonCode?: string}[] = [
    {planCode: 'A01', dates: '01/01/2018 - ', reasonCode: 'EF3'},
    {planCode: 'A02', dates: '01/01/2018 - 02/01/2018', reasonCode: 'EF3'}
  ];

  get isReval(): boolean {
    return this.container.dfhCommarea.qualityReview.revalidationInd === 'Y';
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private transferSrv: TransferSrvService,
    private messageBoxService: MessageBoxService,
    private qualityReviewMiscService: QualityReviewMiscService,
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
  }

  /**
   * On Load Action
   */
  ngOnInit(): void {

    const indexedArray: {[key: string]: {key: string, value: string}} = {};
    indexedArray['Yes'] = {key: 'Y', value: 'Yes'};
    indexedArray['No'] = {key: 'N', value: 'No'};

    if (this.qualityReviewMiscService.qualityReviewFlag) {
      this.container = this.qualityReviewMiscService.savedQualityReviewResult;
      this.qualityReviewMiscService.qualityReviewFlag = false;
    } else {
      let data: any = undefined;
      let dfhcommarea;
      let oprec1Record;
      let qualityInfoRecord;
      let qualityCommAreaFieldsFor06o75;
      this.container = new Container();

      data = this.transferSrv.getData();
      dfhcommarea = data['dfhCommArea'];
      if (dfhcommarea === undefined) {
        dfhcommarea = new Dfhcommarea();
      }
      oprec1Record = data['oprec1Record'];
      if (oprec1Record === undefined) {
        oprec1Record = new Oprec1Record();
      }
      qualityInfoRecord = data['qualityInfoRecord'];
      qualityCommAreaFieldsFor06o75 = data['qualityCommAreaFieldsFor06o75'];

      this.container.dfhCommarea = dfhcommarea;
      this.container.workStorage.oprec1Record = oprec1Record;
      this.container.workStorage.qualityInfoRecord = qualityInfoRecord;
      this.container.workStorage.qualityCommAreaFieldsFor06o75 = qualityCommAreaFieldsFor06o75;
    }
    this.qltyRvwRvldMiscInfoServiceMain(this.container).subscribe(res => {
      this.container = res;
      this.container.screenBean.rpdmb76.m76qdat = this.formatDateToCST(new Date());
      this.screenBean = this.container.screenBean.rpdmb76;
      const tabs: string[] = this.buildTabs();
      this.pageHeaderService.hiddenTabList = this.hiddenTabs;
      this.pageHeaderService.tabs = tabs;
      this.pageHeaderService.updateTabTitles.emit();
      this.memberInfo = this.buildMemberInfo(this.screenBean);
      this.qualityErrors = this.concatQualityErrors(this.screenBean);
      this.qualityReasons = this.concatQualityReasons(this.screenBean);
      this.mostRecent = this.concatMostRecent(this.screenBean);
      this.parseTotals(this.screenBean);
      this.claimNumber = parseInt(this.screenBean.m76cn.replace(/\D/g, ''), 10);
      this.getDuplicateClaims();
      this.pushAlert(this.screenBean.m76err);
      this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
        MiscInfoPageHeaderSubtitleComponent,
        {claimNumber: this.screenBean.m76cn, qualityNumber: this.screenBean.m76qn},
        this.componentFactoryResolver,
        this.injector);
      this.pageHeaderService.headerRightItem = new HeaderRightItem(
        MiscInfoPageHeaderRightComponent,
        {memberNumber: this.screenBean.m76mem, claimNumber: this.screenBean.m76cn},
        this.componentFactoryResolver,
        this.injector);
    });
    window.scrollTo(0, 0);

    this.pageHeaderService.buttonClickedCallback.asObservable().subscribe(() => {
      this.pf1EventClick();
    });
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: any) => {
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
  }

  buildTabs(): string[] {
    const tabs: string[] = ['Misc Info', 'Cautions', 'Duplicates', 'Claim Messages', 'Bill Line Messages'];
    if (!this.screenBean.m76pf2) {
      this.hiddenTabs.push('Cautions');
    }
    if (!this.screenBean.m76pf3) {
      this.hiddenTabs.push('Duplicates');
    }
    if (!this.screenBean.m76pf7) {
      this.hiddenTabs.push('Claim Messages');
    }
    if (!this.screenBean.m76pf5) {
      this.hiddenTabs.push('Bill Line Messages');
    }
    return tabs;
  }

  parseQualityReasons(reasons: string): string[] {
    const reasonsArray = reasons.split(' ');
    const result: string[] = [];
    if (!reasonsArray || reasonsArray.length === 0) {
      return result;
    }
    reasonsArray.forEach(subString => {
      if (!subString || subString === '') {
        return;
      }
      const res = this.hasNumber(subString);
      if (res) {
        // Create new element
        result.push(subString);
      } else {
        // Push into current element
        result[result.length - 1] += ` ${subString}`;
      }
    });
    return result;
  }

  hasNumber(stringToTest: string): boolean {
    return /\d/.test(stringToTest);
  }

  parseTotals(rpdmb76: Rpdmb76): void {
    if (!rpdmb76.m76line || rpdmb76.m76line === '') {
      return;
    }
    const totalLine: string = rpdmb76.m76line ? rpdmb76.m76line.toLowerCase() : '';
    const indexOfReviewed = totalLine.indexOf('reviewed');
    const indexOfSuspended = totalLine.indexOf('suspended');
    const indexOfIons = totalLine.indexOf('ions');
    if (indexOfIons && indexOfReviewed) {
      this.statisticIons = totalLine.slice(indexOfIons, indexOfReviewed).replace(/\D/g, '');
    } else if (indexOfIons && indexOfSuspended) {
      this.statisticIons = totalLine.slice(indexOfIons, indexOfSuspended).replace(/\D/g, '');
    } else if (indexOfIons) {
      this.statisticIons = totalLine.slice(indexOfIons).replace(/\D/g, '');
    }
    if (indexOfSuspended && indexOfReviewed) {
      this.totalReviewed = totalLine.slice(indexOfReviewed, indexOfSuspended).replace(/\D/g, '');
    } else if (indexOfReviewed) {
      this.totalReviewed = totalLine.slice(indexOfReviewed).replace(/\D/g, '');
    }
    if (indexOfSuspended) {
      this.totalSuspended = totalLine.slice(indexOfSuspended).replace(/\D/g, '');
    }
  }

  buildMemberInfo(rpdmb76: Rpdmb76): MemberInfoCard {
    const memberInfo: MemberInfoCard = new MemberInfoCard();
    const row: MemberInfoRow = new MemberInfoRow();
    memberInfo.memberNumber = rpdmb76.m76mem;
    memberInfo.addressInfoStreet = rpdmb76.m76ins2;
    memberInfo.addressInfoCity = rpdmb76.m76ins3;
    memberInfo.name = rpdmb76.m76ins1;
    memberInfo.memberInfoRows = [];
    if (rpdmb76.m76pln1) {
      row.planCode = rpdmb76.m76pln1;
      memberInfo.memberInfoRows.push(row);
    }
    if (rpdmb76.m76pln2) {
      row.planCode = rpdmb76.m76pln2;
      memberInfo.memberInfoRows.push(row);
    }
    if (rpdmb76.m76pln3) {
      row.planCode = rpdmb76.m76pln3;
      memberInfo.memberInfoRows.push(row);
    }
    if (rpdmb76.m76pln4) {
      row.planCode = rpdmb76.m76pln4;
      memberInfo.memberInfoRows.push(row);
    }
    if (rpdmb76.m76pln5) {
      row.planCode = rpdmb76.m76pln5;
      memberInfo.memberInfoRows.push(row);
    }
    // Remove once screenbean is updated to contain plans data
    memberInfo.memberInfoRows = this.plans;
    return memberInfo;
  }

  concatQualityErrors(rpdmb76: Rpdmb76): string {
    let qualityErrors: string = '';
    if (rpdmb76.m76ero1) {
      qualityErrors = rpdmb76.m76ero1 + ', ';
    }
    if (rpdmb76.m76ero2) {
      qualityErrors = rpdmb76.m76ero2 + ', ';
    }
    if (rpdmb76.m76ero3) {
      qualityErrors = rpdmb76.m76ero3 + ', ';
    }
    if (rpdmb76.m76ero4) {
      qualityErrors = rpdmb76.m76ero4 + ', ';
    }
    if (rpdmb76.m76ero5) {
      qualityErrors = rpdmb76.m76ero5;
    }
    return qualityErrors;
  }

  concatQualityReasons(rpdmb76: Rpdmb76): string[] {
    const qualityReasons: string[] = [];
    if (rpdmb76.m76rea1) {
      qualityReasons.push(rpdmb76.m76rea1);
    }
    if (rpdmb76.m76rea2) {
      qualityReasons.push(rpdmb76.m76rea2);
    }
    if (rpdmb76.m76rea3) {
      qualityReasons.push(rpdmb76.m76rea3);
    }
    if (rpdmb76.m76rea4) {
      qualityReasons.push(rpdmb76.m76rea4);
    }
    if (rpdmb76.m76rea5) {
      qualityReasons.push(rpdmb76.m76rea5);
    }
    if (rpdmb76.m76rea6) {
      qualityReasons.push(rpdmb76.m76rea6);
    }
    return qualityReasons;
  }

  concatMostRecent(rpdmb76: Rpdmb76): string {
    let mostRecent: string = '';
    if (rpdmb76.m76err1) {
      mostRecent = rpdmb76.m76err1 + ', ';
    }
    if (rpdmb76.m76err2) {
      mostRecent = rpdmb76.m76err2 + ', ';
    }
    if (rpdmb76.m76err3) {
      mostRecent = rpdmb76.m76err3 + ', ';
    }
    if (rpdmb76.m76err4) {
      mostRecent = rpdmb76.m76err4 + ', ';
    }
    if (rpdmb76.m76err5) {
      mostRecent = rpdmb76.m76err5;
    }
    return mostRecent;
  }

  isValid(textToCheck: string): boolean {
    if (!textToCheck) {
      return false;
    }
    return textToCheck.toLowerCase() === 'yes' || textToCheck.toLowerCase() === 'y';
  }

  goToClaimsTab(): void {
    this.pageHeaderService.currentNav = this.tabTracker.claimMessages.tabId;
  }

  goToBillsTab(): void {
    this.pageHeaderService.currentNav = this.tabTracker.billMessages.tabId;
  }

  async goToClaimNumber(): Promise<void> {
    // Leave function if link is already loading
    if (this.claimNumberLinkClicked) {
      return;
    }

    let url = '';
    let claimNumber = '';

    if (this.screenBean && this.screenBean.m76cn) {
      // Remove white space/ cleanup id
      claimNumber = this.screenBean.m76cn.replace(/\s/g, '');
    }
    if (claimNumber && claimNumber !== '') {
      this.claimNumberLinkClicked = true;
      url = `/#/${claimProcessingRoutePathRoot}/${claimProcessingRoutePathPrefixClaimDetails}${claimNumber.replace(/-/g, '')}`;
      const result = await this.router.navigate([]).then(res => {
        window.open(url, '_blank');
      });
      this.claimNumberLinkClicked = false;
    }
  }

  getDuplicateClaims(): void {
    this.duplicateCheckResp = dupe_resp;
    this.incomingChargeData = this.duplicateCheckResp.items[0].incomingChargeLine;
    this.tableData = this.duplicateCheckResp.items[0].duplicateBillLines;
  }

  /**
   * Event action clearEventClick
   */
  clearEventClick(): void {
    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceFreshMap010(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
      this.screenBean.m76repa = '';
      this.container.screenBean.rpdmb76.m76repa = '';
      this.screenBean.m76qdat = '';
      this.container.screenBean.rpdmb76.m76qdat = '';
      this.submitStatus = ButtonStatus.SUBMIT;
      this.screenBean.m76erem = '';
    });
  }

  formatDateToCST(originalFormat: Date): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY');
  }

  /**
   * Event action enterEventClick
   */
  enterEventClick(): void {
    this.submitStatus = ButtonStatus.WORKING;
    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceReply025(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
      if (this.screenBean.m76err) {
        this.pushAlert(this.screenBean.m76err);
        this.submitStatus = ButtonStatus.FAILED;
      } else {
        this.submitStatus = ButtonStatus.SUCCESS;
      }
      if (this.container.redirectTo !== null && (this.container.redirectTo === 'RPD06O75' || this.container.redirectTo === 'RPD06O76')) {
        this.transferSrv.set('dfhCommArea', this.container.dfhCommarea);
        this.transferSrv.set('redirectTo', this.container.redirectTo);
        this.transferSrv.set('qualityCommAreaFieldsFor06o75', this.container.workStorage.qualityCommAreaFieldsFor06o75);
        this.transferSrv.set('nextClaimNumber', this.container.nextClaimNumber);
        this.router.navigate(['/quality-review/revalidation-menu']);
      }
    }, err => {
      this.submitStatus = ButtonStatus.FAILED;
      this.pushAlert(`Invalid Submission: ${err}`);
    });
  }

  /**
   * Event action pf1EventClick
   */
  pf1EventClick(): void {
    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceReturn035(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
      this.redirectTo();
    });
  }

  /**
   * Event action pf2EventClick
   */
  pf2EventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceCautions040(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;

      if (this.container.redirectTo === 'RPD06O80') {
        this.transferSrv.set('dfhCommArea', this.container.dfhCommarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.transferSrv.set('qualityInfoRecord', this.container.workStorage.qualityInfoRecord);
        this.transferSrv.set('qualityCommAreaFieldsFor06o75', this.container.workStorage.qualityCommAreaFieldsFor06o75);
        this.router.navigate(['/quality-review/revalidation-cautions']);
      }
    });
  }

  /**
   * Event action pf3EventClick
   */
  pf3EventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceDupBills042(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;

      if (this.container.redirectTo === 'RPD06O77') {
        this.transferSrv.set('dfhCommArea', this.container.dfhCommarea);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);
        this.router.navigate(['/quality-review/duplicate-bill']);
      }
    });
  }

  /**
   * Event action pf5EventClick
   */
  async pf5EventClick(): Promise<boolean> {
    let data: any = undefined;
    this.container.screenBean.rpdmb76 = this.screenBean;
    this.container = await this.qltyRvwRvldMiscInfoServiceBlMg045(this.container).toPromise();
    this.screenBean = this.container.screenBean.rpdmb76;
    data = this.transferSrv.getData();
    data['common'] = this.container.dfhCommarea;
    if (this.container.dfhCommarea.nextProgram === 'RPD06O51') {
      this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBillLineMessages]);
    }
    return true;
  }

  /**
   * Event action pf7EventClick
   */
  pf7EventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceClmMg049(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;

      if (this.container.redirectTo === 'RPD06O78') {
        this.transferSrv.set('dfhCommArea', this.container.dfhCommarea);
        this.transferSrv.set('billLineTable', this.container.workStorage.billLineTable);
        this.transferSrv.set('oprec1Record', this.container.workStorage.oprec1Record);

        this.router.navigate(['/quality-review/revalidation-claim-messages']);
      }
    });
  }

  /**
   * Event action pf8EventClick
   */
  pf8EventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceBenMod1225(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
    });
  }

  /**
   * Event action pf9EventClick
   */
  pf9EventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qltyRvwRvldMiscInfoServiceExpress050(this.container).subscribe(res => {
      this.container = res;
      this.screenBean = this.container.screenBean.rpdmb76;
    });
  }

  eobEventClick(): void {

    this.container.screenBean.rpdmb76 = this.screenBean;
    this.qualityReviewMiscService.savedQualityReviewResult = this.container;
    this.qualityReviewMiscService.qualityReviewFlag = true;
    const clmNbr = this.screenBean.m76cn.replace(/[^\d]/g, '');
    this.routeBillLineDetails(clmNbr);
  }

  routeBillLineDetails(claimNum: string): void {
    let param: NavigationExtras = {};
    let url = '';
    param = {
      queryParams: {
        command: this.container.dfhCommarea.qualityCommArea.qltyRvwCmnAreaProcessingFields.command
      }
    };
    url = '..' + claimProcessingUrlPrefixClaimDetails + claimNum;
    this.router.navigate([url], param);
  }

  private pushAlert(message: string): void {
    if (message) {
      window.scrollTo(0, 0);
      if (message.includes('LAST CLAIM')) {
        this.messageBoxService.addMessageBox('Miscellaneous Information', MessageBoxType.SUCCESS, message);
      } else {
        this.messageBoxService.addMessageBox('Miscellaneous Information', MessageBoxType.ERROR, message);
      }
    }
  }

  private redirectTo(): void {
    console.log('RedirecTo = ', this.container.redirectTo);

    if (this.container.redirectTo !== '') {
      if (this.container.redirectTo === 'RPD06O75') {
        this.transferSrv.set('dfhCommArea', this.container.dfhCommarea);
        this.transferSrv.set('redirectTo', this.container.redirectTo);
        this.transferSrv.set('qualityCommAreaFieldsFor06o75', this.container.workStorage.qualityCommAreaFieldsFor06o75);
        this.transferSrv.set('nextClaimNumber', this.container.nextClaimNumber);
        this.router.navigate(['/quality-review/revalidation-menu']);
      }
    }

  }

  /**
   * Back end calls benMod1225
   */
  private qltyRvwRvldMiscInfoServiceBenMod1225(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/benmod1225', JSON.stringify(container), options);

  }

  /**
   * Back end calls reply025
   */
  private qltyRvwRvldMiscInfoServiceReply025(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/reply025', JSON.stringify(container), options);

  }

  /**
   * Back end calls blMg045
   */
  private qltyRvwRvldMiscInfoServiceBlMg045(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/blmg045', JSON.stringify(container), options);

  }

  /**
   * Back end calls express050
   */
  private qltyRvwRvldMiscInfoServiceExpress050(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/express050', JSON.stringify(container), options);

  }

  /**
   * Back end calls main
   */
  private qltyRvwRvldMiscInfoServiceMain(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/main', JSON.stringify(container), options);

  }

  /**
   * Back end calls freshMap010
   */
  private qltyRvwRvldMiscInfoServiceFreshMap010(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/freshmap010', JSON.stringify(container), options);

  }

  /**
   * Back end calls return035
   */
  private qltyRvwRvldMiscInfoServiceReturn035(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/return035', JSON.stringify(container), options);

  }

  /**
   * Back end calls cautions040
   */
  private qltyRvwRvldMiscInfoServiceCautions040(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/cautions040', JSON.stringify(container), options);

  }

  /**
   * Back end calls dupBills042
   */
  private qltyRvwRvldMiscInfoServiceDupBills042(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/dupbills042', JSON.stringify(container), options);

  }

  /**
   * Back end calls clmMg049
   */
  private qltyRvwRvldMiscInfoServiceClmMg049(container: Container): Observable<Container> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};

    return this.httpClient.post<Container>('/api/qualityrvw/services/qltyrvwrvldmiscinfo/qltyrvwrvldmiscinfoservice/clmmg049', JSON.stringify(container), options);

  }
}

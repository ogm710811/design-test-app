import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  AuditApi,
  AuditResponseVO,
  ConfiguserApi,
  DocMetaApi,
  DocumentManagementApi,
  DocumentNotesApi,
  DocumentNotesVO,
  DocumentVO,
  ListOfAuditResponseVO,
  PagedResourcesOfResourceOfDocumentNotesVO,
  ReferencesApi,
  ReferenceValueVO,
  ResourceOfDocumentNotesVO,
  WorkItemApi,
  WorkQueueApi,
  WorkQueueBpmStartVO,
  WorkQueueItemBpmVO,
  WorkQueueItemProcessVO
} from '@fox/rest-clients';
import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  documentRepositoryRoutePathDocumentSearch,
  documentRepositoryRoutePathRoot,
  DocumentSearchTableHeaderModel,
  FeatureFlagService,
  HeaderRightItem,
  HeaderSubtitleItem,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  PageHeaderService,
  PdfUtil,
  ProcessClaimSubheaderComponent,
  ProgressContextService,
  WorkSessionService
} from '@fox/shared';
import * as _ from 'lodash';
import {Observable, Subscription} from 'rxjs';
import * as uuidNS from 'uuid';
import {DocumentSearchService} from '../document-search.service';
import {DocumentDetailRightComponent} from './document-detail-right/document-detail-right.component';
import {LinkMemberSearchResultModel} from './link-member-modal.component/link-member-form-result.model';
import * as momentNS from 'moment';

const moment = momentNS;

const uuid = uuidNS;

@Component({
  selector: 'fox-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  entryComponents: [
    DocumentDetailRightComponent,
    ProcessClaimSubheaderComponent
  ]
})

export class DocumentDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked],
    iconPosition: BadgeIconPositions.before
  };

  docMetaFormGroup: FormGroup;
  documentVO: DocumentVO = {};
  documentControlNumber: string = '';
  documentControlNumberStr: string = '';
  memberStates: Array<ReferenceValueVO> = [];
  dirtyCount: number = 0;
  genders: Array<ReferenceValueVO> = [];
  planTypes: Array<ReferenceValueVO> = [];
  queueInformations: Array<ReferenceValueVO> = [];
  feedbackInformations: Array<ReferenceValueVO> = [];
  documentTypes: Array<ReferenceValueVO> = [];
  formTypes: Array<ReferenceValueVO> = [];
  fekPullReasons: Array<ReferenceValueVO> = [];
  rnfStatuses: Array<ReferenceValueVO> = [];
  overpaymentCollectionTypes: Array<ReferenceValueVO> = [];   // todo 2019-10-25: needs to be assigned from reference service
  documentNotes: ResourceOfDocumentNotesVO[] = [];
  memberNumber: string = '';
  memberNumberHold: string = '';
  firstName: string = '';
  lastName: string = '';
  memberState: string = '';
  dateOfBirth: string = '';
  dcn: string = '';
  isStatusComplete = false;
  showAddNoteModal = false;
  noteContent: string | undefined;
  updatedNoteContent: string | undefined;
  paperNonClaimId: number = 0;
  showUpdateModal = false;
  isEditing: boolean = false;
  selectedUpdateNoteId: number = 0;
  notePageSize: number = 10;
  noteDataLengthInput: number | undefined;
  notePageTotal: number = 0;
  currentNotePage: number = 0;
  checkAmount: string = '';
  matchedIndicatorValue: string = '';
  deleteModalVisible: boolean = false;
  separateModalVisible: boolean = false;
  selectedDeleteNoteId?: number;
  updatedMatchedInd: boolean = false;
  updatedMemberLinkedInfo: boolean = false;
  linkButtonText: string = '';
  accountNumberValue: string = '';
  selectedDeleteDocDcn: string = '';
  selectedDcnList: string[] = [];
  showDeleteDialog = false;
  showLinkMemberModal = false;
  userNameMap: {[key: string]: string} = {};
  originalMemberDetails: AbstractControl | null = null;
  theDocument: string = '';
  lockedInd: boolean = false;
  downloadLink: string = '';
  numberOfElements: number = 0;
  pager: any = {};
  itemsPerPage: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;
  auditData: ListOfAuditResponseVO = [];
  currentTableData: any = [];
  showPdf = true;
  rescanDocumentControlNumber: string = '';
  headerDataInitialized = false;
  leftCurrentNav: number = 1;
  accountNumber: string = '';
  isDocTypeClaim: boolean = false;
  isCopy: boolean = false;
  showClearDialog: boolean = false;
  messageBoxCountComponent: number = 0;
  isButtonFocused: boolean = false;
  currentNavChangeSubscription: Subscription = new Subscription();

  @ViewChild('claimNumber') claimNumber?: any;

  tableHeaders: DocumentSearchTableHeaderModel[] = [
    {headerName: 'Date', HeaderPO: 'createDate'},
    {headerName: 'Action Taken By #', HeaderPO: 'createdBy'},
    {headerName: 'Event', HeaderPO: 'eventDetails'},
    {headerName: 'Description', HeaderPO: 'eventNote'},
  ];

  isDesc: boolean = false;
  column: string = '';
  activatedRouteSubs: any;

  isImageAsssociated = false;

  get hasEnhancedRole(): boolean {
    return this.loginSvc ? this.loginSvc.hasEnhancedWqRole : false;
  }

  get documentBusinessIdType(): number {
    return this.workSessionService.documentBusinessId;
  }

  get currentWorkQueueBusinessId(): string {
    return this.workSessionService.currentWorkQueueBusinessId;
  }

  get isF4914Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4914');
  }

  private _headerData: {memberName?: string, accountNumber?: string | number, claimNumber?: string | number} | undefined;

  get headerData(): {memberName?: string, accountNumber?: string | number, claimNumber?: string | number} | undefined {
    return this._headerData;
  }

  set headerData(hd: {memberName?: string, accountNumber?: string | number, claimNumber?: string | number} | undefined) {
    this._headerData = hd;
    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      ProcessClaimSubheaderComponent,
      {
        memberName: this._headerData && this._headerData.memberName ? this._headerData.memberName : '',
        account: this._headerData && this._headerData.accountNumber ? this._headerData.accountNumber : '',
        claim: this._headerData && this._headerData.claimNumber ? this._headerData.claimNumber : '',
        details: this.headerReason ? this.headerReason : ''
      },
      this.componentFactoryResolver,
      this.injector);
  }

  private _headerReason: string | undefined;

  get headerReason(): string | undefined {
    return this._headerReason;
  }

  set headerReason(reason: string | undefined) {
    this._headerReason = reason;
    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      ProcessClaimSubheaderComponent,
      {
        memberName: this.headerData && this.headerData.memberName ? this.headerData.memberName : '',
        account: this.headerData && this.headerData.accountNumber ? this.headerData.accountNumber : '',
        claim: this.headerData && this.headerData.claimNumber ? this.headerData.claimNumber : '',
        details: this._headerReason ? this._headerReason : ''
      },
      this.componentFactoryResolver,
      this.injector);
  }

  get hasDocumentLocked(): boolean {
    return this.lockedInd;
  }

  get username(): string {
    return this.loginSvc.username;
  }

  private _pdfTotalPages = 1;

  get pdfTotalPages(): number {
    return this._pdfTotalPages;
  }

  set pdfTotalPages(pages: number) {
    this._pdfTotalPages = pages;
    this.pageHeaderService.dynamicComponentData = pages;
  }

  constructor(
    public pageHeaderService: PageHeaderService,
    private activatedRoute: ActivatedRoute,
    private docMetaApi: DocMetaApi,
    private referencesSvc: ReferencesApi,
    private docNotesApi: DocumentNotesApi,
    private router: Router,
    private loginSvc: LoginService,
    private documentSearchService: DocumentSearchService,
    private docManagementApi: DocumentManagementApi,
    private userSvc: ConfiguserApi,
    private wqiSvc: WorkItemApi,
    private modalSvc: ModalService,
    private msgBoxSvc: MessageBoxService,
    private wqSvc: WorkQueueApi,
    private messageBoxService: MessageBoxService,
    private auditApi: AuditApi,
    private workSessionService: WorkSessionService,
    private ngZone: NgZone,
    private progressSvc: ProgressContextService,
    private featureFlagSvc: FeatureFlagService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.docMetaFormGroup = this.documentSearchService.createDocMetaFormGroup();
    this.lockedInd = false;
  }

  ngOnInit(): void {
    this.pageHeaderService.tabs = ['Image', 'Notes', 'Audit Log'];
    this.activatedRouteSubs = this.activatedRoute.queryParams.subscribe(params => {
      this.lockedInd = false;
      this.downloadLink = '';
      this.theDocument = '';
      this.isImageAsssociated = false;

      if (params && params.dcn) {
        this.documentControlNumber = params.dcn;
        this.documentControlNumberStr = params.dcn;
        this.dcn = params.dcn;
        this.docMetaFormGroup.reset();
        this.getDocMeta(this.dcn);
        this.docMetaFormGroup.markAsPristine();
        this.getLockedByInformation(params.dcn);
        this.getDocNotes();

        const businessCode = this.featureFlagSvc.isFeatureDisabled('F3591') ? 'PNC' : 'DOC';
        this.getAuditEventLog(this.documentControlNumber, businessCode);

        if (params.tab) {
          this.pageHeaderService.currentNav = +params.tab;
          if (isNaN(this.pageHeaderService.currentNav)) {
            this.pageHeaderService.currentNav = 1;
          }

          if (params.tab === '3') {
            this.getAuditEventLog(this.documentControlNumberStr, businessCode);
          }
        }

        if (params.isStatusComplete) {
          this.isStatusComplete = params.isStatusComplete;
        }

        this.pageHeaderService.customTitle = 'Document #' + this.documentControlNumberStr;

        this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: any) => {
          if (currentNav === 3) {
            this.getAuditEventLog(this.documentControlNumberStr, businessCode);
          }
        });
      }
    });

    this.searchDocument();
    this.docMetaFormGroup.controls['docControlNumber'].disable();
    this.documentSearchService.documentDetailVisited = true;

    // reference service calls
    this.getMemberStates();
    this.getGenders();
    this.getPlanTypes();
    this.getQueueInformations();
    this.getFeedbackInformations();
    this.getDocumentTypes();
    this.getFormTypes();
    this.getFekPullReasons();
    this.getRnfStatues();
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
    this.activatedRouteSubs.unsubscribe();
    this.messageBoxService.reset();
  }

  ngAfterViewInit(): void {
    if (window && window.navigator && window.navigator.msSaveOrOpenBlob) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.ngZone.run(() => {
            for (const key in this.docMetaFormGroup.controls) {
              if (this.docMetaFormGroup.controls[key]) {
                this.docMetaFormGroup.controls[key].markAsPristine();
              }
            }
          });
        });
      });
    }
  }

  isFeatureDisabled(feature: string): boolean {
    return this.featureFlagSvc.isFeatureDisabled(feature);
  }
  sortData(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.currentTableData.sort((a: any, b: any) => {
      const nameA = a[property]; // ignore upper and lowercase
      const nameB = b[property]; // ignore upper and lowercase
      if (this.isDesc) {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
      }
    });
  }

  searchDocument(): void {
    this.numberOfElements = this.auditData.length;
  }

  getAuditEventLog(businessId: any, businessCode: any): void {
    this.auditData = [];
    const obtainAuditLogSubs = this.auditApi.obtainAuditLog(businessId, businessCode, uuid())
      .subscribe((data: ListOfAuditResponseVO) => {
        if (data && data.length > 0) {
          this.auditData = data;
          for (let i = 0; i < this.auditData.length; i++) {
            const auditLog: AuditResponseVO = this.auditData[i];
            if (auditLog.createDate) {
              auditLog.createDate = moment(auditLog.createDate).tz('America/Chicago').format('MM/DD/YY hh:mm A');
              this.auditData[i] = auditLog;
            }
          }
          this.auditData.sort((a, b) => {
            if (a && a.createDate && b && b.createDate) {
              const adate = moment.utc(a.createDate).toDate();
              const bdate = moment.utc(b.createDate).toDate();
              const aDt = new Date(adate);
              const bDt = new Date(bdate);
              return aDt > bDt ? -1 : aDt < bDt ? 1 : 0;
            } else if (a && !b) {
              return -1;
            } else if (!a && b) {
              return 1;
            } else if (!a && !b) {
              return 0;
            } else if (a && b && !a.createDate && b.createDate) {
              return 1;
            } else if (a && b && a.createDate && !b.createDate) {
              return -1;
            } else if (a && b && !a.createDate && !b.createDate) {
              return 0;
            } else {
              return 0;
            }
          });
          this.setPage(0);
          this.numberOfElements = this.auditData.length;
          this.totalPages = Math.ceil(this.numberOfElements / this.itemsPerPage);

          for (let i = 0; i < this.auditData.length; i++) {
            const auditLog: AuditResponseVO = this.auditData[i];
            if (auditLog && auditLog.createdBy) {
              const logCreator = auditLog.createdBy;
              const getUserSubs = this.userSvc.getUser(logCreator, uuid()).subscribe(user => {
                this.userNameMap[logCreator] = user.firstName + ' ' + user.lastName;
                getUserSubs.unsubscribe();
              });
            }
          }

          const keys = Object.keys(this.userNameMap);
          for (const key of keys) {
            if (this.userNameMap[key] === 'Loading') {
              const getUserSubs = this.userSvc.getUser(key, uuid()).subscribe(user => {
                if (this.userNameMap) {
                  this.userNameMap[key] = user.firstName + ' ' + user.lastName;
                }
                getUserSubs.unsubscribe();
              });
            }
          }
        }
        obtainAuditLogSubs.unsubscribe();
      });
  }

  setPage(page: number): void {
    this.pager = this.getPaginationData(this.auditData.length, page + 1, this.itemsPerPage);
    this.numberOfElements = this.auditData.length;
    this.currentPage = this.pager.currentPage;
    this.totalPages = this.pager.totalPages;
    this.currentTableData = this.auditData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getPaginationData(totalItems: number, currentPage: number = 1, pageSize: number = 10): object {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;

    if (totalPages <= 20) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 10) {
        startPage = 1;
        endPage = 20;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  perPageItemsChange(itemCount: any): void {
    this.itemsPerPage = itemCount;
    const page = 0;
    this.pager = this.getPaginationData(this.auditData.length, page + 1, this.itemsPerPage);
    this.currentPage = this.pager.currentPage;
    this.totalPages = this.pager.totalPages;
    this.currentTableData = this.auditData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getDocNotes(): void {
    const findDocumentNotesSubs = this.docNotesApi.findDocumentNotes(this.dcn.toString(), uuid(), this.notePageSize, this.currentNotePage, 'ASC').subscribe((resp: PagedResourcesOfResourceOfDocumentNotesVO) => {
      this.documentNotes = [];
      if (resp._embedded && resp._embedded.items) {
        this.documentNotes = resp._embedded.items;
        for (let i = 0; i < this.documentNotes.length; i++) {
          const docNote = this.documentNotes[i];
          if (docNote && docNote.noteCreatedBy) {
            const noteCreator = docNote.noteCreatedBy;
            this.userSvc.getUser(noteCreator, uuid()).subscribe(user => {
              this.userNameMap[noteCreator] = user.firstName + ' ' + user.lastName;
            });
          }
        }
      }
      this.processDocumentNotesSearchResult(resp);
      findDocumentNotesSubs.unsubscribe();
    });
  }

  getPdf(dcn: string): void {
    this.downloadLink = `/api/docmanagement/${encodeURIComponent(String(dcn))}/image?token=${this.loginSvc.loginState.access_token}`;
    const startTime = Date.now();
    const blobservableToDataUrlSubs = PdfUtil.blobservableToDataUrl(this.docManagementApi.manageImage(dcn || '', uuid()));
    this.progressSvc.forTag('pdf-loading').watch(blobservableToDataUrlSubs)
      .subscribe(dataUrl => {
        this.theDocument = dataUrl;
        this.isImageAsssociated = true;
      }, error => {
        if (error.status === 500) {
          if ((Date.now() - startTime) >= 10000) {
            this.messageBoxService.reset();
            this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'Image retrieval failed.');
          }
        }
        this.isImageAsssociated = false;
      });
  }

  processLinkingRequest(): void {
    if (this.matchedIndicatorValue === 'Y') {
      this.docMetaFormGroup!.get('member')!.get('matchedIndicator')!.setValue('N');
      this.updatedMatchedInd = true;
      this.docMetaFormGroup!.get('member')!.get('accountNumber')!.setValue(null);
      this.updateDocMeta();
    } else {
      this.linkMemberSearchModal();
    }
  }

  processDocumentNotesSearchResult(searchResult: PagedResourcesOfResourceOfDocumentNotesVO): void {
    if (searchResult && searchResult.page && searchResult.page.number !== undefined && searchResult.page.size && searchResult.page.totalPages) {
      this.notePageTotal = searchResult.page.totalPages;
      this.noteDataLengthInput = searchResult.page.totalElements;
      this.currentNotePage = searchResult.page.number;
    }
  }

  onLinkMemberVisibleChange(visible: boolean): void {
    this.showLinkMemberModal = visible;
  }

  onMemberMatchChange(memberMatch: LinkMemberSearchResultModel): void {

    this.originalMemberDetails = this.docMetaFormGroup!.get('member');
    this.docMetaFormGroup!.get('member')!.get('matchedIndicator')!.setValue('Y');
    this.docMetaFormGroup!.get('member')!.get('lastName')!.setValue(memberMatch.lastName);
    this.docMetaFormGroup!.get('member')!.get('firstName')!.setValue(memberMatch.firstName);
    this.docMetaFormGroup!.get('member')!.get('state')!.setValue(memberMatch.state);
    this.docMetaFormGroup!.get('member')!.get('dateOfBirth')!.setValue(memberMatch.dob);
    this.docMetaFormGroup!.get('member')!.get('accountNumber')!.setValue(memberMatch.memberNo);
    this.docMetaFormGroup!.get('member')!.get('middleName')!.setValue(memberMatch.middleName);
    this.docMetaFormGroup!.get('member')!.get('zipCode')!.setValue(memberMatch.zipCode);
    this.docMetaFormGroup!.get('member')!.get('gender')!.setValue(memberMatch.gender);
    this.docMetaFormGroup!.get('member')!.get('medicareBeneficiaryId')!.setValue(memberMatch.mbi);
    this.docMetaFormGroup!.get('member')!.get('planCode')!.setValue(memberMatch.planCode);
    this.docMetaFormGroup!.get('member')!.get('planEffectiveDate')!.setValue(memberMatch.planEffectiveDate);
    this.updatedMemberLinkedInfo = true;
    this.updatedMatchedInd = false;
    this.msgBoxSvc.reset();
    this.updateDocMeta();
    this.onLinkMemberVisibleChange(false);
  }

  getMemberData(memInfo: string): string {
    const member = this.docMetaFormGroup.get('member');
    let memberValue = '';
    if (member) {
      const memberData = member.get(memInfo.toString());
      memberValue = memberData ? memberData.value : '';
    }
    return memberValue;
  }

  getLockedByInformation(dcn: number): void {
    const retrieveQueueProcessByBusinessTypeSubs = this.wqiSvc.retrieveQueueProcessByBusinessType(dcn.toString(), '1', uuid()).subscribe(respWI => {
      if (respWI) {
        this.headerReason = respWI.reason ? respWI.reason : undefined;
        this.headerDataInitialized = false;
        if (!respWI.lockedBy || respWI.lockedBy === this.loginSvc.username) {
          this.lockedInd = false;
        } else {
          this.lockedInd = true;
          this.docMetaFormGroup!.disable();
          this.pageHeaderService.badgeParams.push(this.recordLocked);
        }
      }
      this.createRightButton();
      retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
    }, (e) => {
      console.log(e);
      this.createRightButton();
    });
  }

  getDocMeta(dcn: string, needPdf: boolean = true): void {
    this.isImageAsssociated = true;
    const getDocumentMetadataSubs = this.docMetaApi.getDocumentMetadata(dcn, uuid());
    this.progressSvc.forTag('get-doc-meta').watch(getDocumentMetadataSubs)
      .subscribe(docMeta => {
        this.isDocTypeClaim = docMeta.documentType === 'DT2';
        if (docMeta) {
          this.headerData = {
            memberName: docMeta.member ? docMeta.member.firstName + ' ' + docMeta.member.lastName : '',
            accountNumber: docMeta.member ? docMeta.member.accountNumber : '',
            claimNumber: docMeta.claim ? docMeta.claim.claimNumber : ''
          };

          this.docMetaFormGroup.patchValue(<DocumentVO>docMeta);
          this.documentVO = docMeta;
          this.documentSearchService.markFormGroupTouched(this.docMetaFormGroup);

          const member = this.docMetaFormGroup.get('member');

          if (member) {
            const memberNumberHold = member.get('accountNumber');
            this.memberNumberHold = memberNumberHold ? memberNumberHold.value : '';

            if (this.memberNumberHold) {
              this.memberNumber = this.memberNumberHold.toString();
            } else {
              this.memberNumber = '';
            }

            this.accountNumberValue = this.memberNumberHold;

            const firstName = member.get('firstName');
            this.firstName = firstName ? firstName.value : '';

            const lastName = member.get('lastName');
            this.lastName = lastName ? lastName.value : '';

            const dateOfBirth = member.get('dateOfBirth');
            this.dateOfBirth = dateOfBirth ? dateOfBirth.value : '';

            const memberState = member.get('state');
            this.memberState = memberState ? memberState.value : '';
          }

          if (member && member.get('matchedIndicator')) {
            const matchedIndicator = member.get('matchedIndicator');
            const matchedIndicatorValue = matchedIndicator ? matchedIndicator.value : 'N';
            this.matchedIndicatorValue = matchedIndicatorValue ? matchedIndicatorValue : 'N';
            if (this.matchedIndicatorValue === 'Y') {
              this.docMetaFormGroup!.get('member')!.disable();
            } else if (!this.lockedInd) {
              this.docMetaFormGroup!.get('member')!.enable();
            }

          }
          if (needPdf) {
            this.getPdf(dcn);
          }
          this.createRightButton();
        }
      });
  }

  onReset(): void {
    this.docMetaFormGroup.reset();
    this.getDocMeta(this.documentControlNumber, false);
    this.docMetaFormGroup.markAsPristine();
  }

  setCurrentNav(navNum: any, $event: any): boolean {
    $event.preventDefault();
    this.leftCurrentNav = navNum;
    if (navNum === 1) {
      this.docMetaFormGroup.get('member');
    } else if (navNum === 2) {
      this.docMetaFormGroup.get('claim');
    } else if (navNum === 3) {
      this.docMetaFormGroup.get('check');
    }
    return false;
  }

  updateDocMeta(): void {
    this.msgBoxSvc.reset();

    const aDoc: DocumentVO = this.documentSearchService.mapFormToVo(this.docMetaFormGroup);

    const updateDocumentMetadataSubs = this.progressSvc.forTag('doc-update')
      .watch(this.docMetaApi.updateDocumentMetadata(this.documentControlNumberStr, aDoc, uuid()))
      .subscribe(() => {
        this.countDirty(this.docMetaFormGroup);
        this.docMetaFormGroup.markAsPristine();
        this.onReset();

        const linkTxt = 'Link Member';
        const unlinkTxt = 'Unlink from ';

        if (this.updatedMatchedInd) {
          this.msgBoxSvc.addMessageBox('Attributes Updated, Document UnLinked', MessageBoxType.SUCCESS,
            'Attributes were updated but the document was not linked to a Member. If this was unintentional,\n' +
            '          select the link member button', 3000);
          this.linkButtonText = linkTxt;
          this.matchedIndicatorValue = 'N';
          this.updatedMatchedInd = false;
          this.docMetaFormGroup!.get('member')!.enable();
          this.updatedMemberLinkedInfo = false;
          this.docMetaFormGroup.markAsPristine();
        } else {
          if (this.updatedMemberLinkedInfo) {
            this.docMetaFormGroup!.get('member')!.disable();
            this.matchedIndicatorValue = 'Y';
            this.msgBoxSvc.addMessageBox('Updated, Document Linked', MessageBoxType.SUCCESS, 'Attributes were updated and Document was linked to a Member', 3000);
            this.linkButtonText = unlinkTxt + this.accountNumberValue;
            this.updatedMemberLinkedInfo = false;
          } else {
            const pluralText = this.dirtyCount === 1 ? ' attribute' : ' attributes';
            this.msgBoxSvc.addMessageBox('Attributes Updated', MessageBoxType.SUCCESS,
              'Attributes updated: ' + this.dirtyCount + pluralText
              + ' associated to this document has been updated', 3000);
          }
        }
        updateDocumentMetadataSubs.unsubscribe();
      }, (error) => {
        if (this.updatedMatchedInd) {
          this.msgBoxSvc.addMessageBox('Attributes were not Updated, Document was not UnLinked', MessageBoxType.ERROR, 'There was an error updating the Attributes. Document was not linked to a Member ');
          this.docMetaFormGroup!.get('member')!.get('matchedIndicator')!.setValue('Y');
          this.updatedMatchedInd = false;
          this.docMetaFormGroup!.get('member')!.get('accountNumber')!.setValue(this.headerData ? this.headerData.accountNumber : undefined);
        } else {
          if (this.updatedMemberLinkedInfo) {
            this.docMetaFormGroup!.get('member')!.setValue(this.originalMemberDetails);

            this.msgBoxSvc.addMessageBox('Attributes were not Updated, Document was not Linked', MessageBoxType.ERROR, 'There was an error updating the Attributes. Document was not linked to a Member');
            this.updatedMemberLinkedInfo = true;
          } else {
            this.msgBoxSvc.addMessageBox('Attributes were not Updated', MessageBoxType.ERROR, 'There was an error updating the Attributes');
          }
        }
        updateDocumentMetadataSubs.unsubscribe();
      });

    window.scrollTo(0, 0);
  }

  countDirty(group: FormGroup): void {
    this.dirtyCount = 0;
    const controlIdxs: string[] = Object.keys(group.controls);
    for (let i = 0; i < controlIdxs.length; i++) {
      const controlIdx = controlIdxs[i];
      if (controlIdx && group.controls.hasOwnProperty(controlIdx)) {
        const control = group.controls[controlIdx];
        if (control instanceof FormGroup) {
          const childControlIdxs = Object.keys(control.controls);
          for (let j = 0; j < childControlIdxs.length; j++) {
            const childControlIdx = childControlIdxs[j];
            if (control.controls[childControlIdx].dirty) {
              this.dirtyCount++;
            }
          }
        } else if (control instanceof FormControl) {
          if (control.dirty) {
            this.dirtyCount++;
          }
        }
      }
    }
  }

  linkMemberSearchModal(): void {
    const docControlNumber = this.docMetaFormGroup.get('docControlNumber');

    this.dcn = docControlNumber ? docControlNumber.value : '';

    const member = this.docMetaFormGroup.get('member');
    if (member) {
      const memberNumberHold = member.get('accountNumber');
      this.memberNumberHold = memberNumberHold ? memberNumberHold.value : '';

      if (this.memberNumberHold) {
        this.memberNumber = this.memberNumberHold.toString();
      } else {
        this.memberNumber = '';
      }

      const firstName = member.get('firstName');
      this.firstName = firstName ? firstName.value : '';

      const lastName = member.get('lastName');
      this.lastName = lastName ? lastName.value : '';
      const dateOfBirth = member.get('dateOfBirth');
      this.dateOfBirth = dateOfBirth ? dateOfBirth.value : '';

      const memberState = member.get('state');
      this.memberState = memberState ? memberState.value : '';
    }

    this.updatedMemberLinkedInfo = false;
    this.updatedMatchedInd = false;
    this.showLinkMemberModal = true;
  }

  getMemberStates(): void {
    const obs = this.referencesSvc.listCategoryCodes('MEMBER_STATE', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.memberStates = obj;
        subs.unsubscribe();
      });
    }
  }

  getGenders(): void {
    const obs = this.referencesSvc.listCategoryCodes('GENDER', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.genders = obj;
        subs.unsubscribe();
      });
    }
  }

  getPlanTypes(): void {
    const obs = this.referencesSvc.listCategoryCodes('PLAN_TYPE', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.planTypes = obj;
        subs.unsubscribe();
      });
    }
  }

  getQueueInformations(): void {
    const obs = this.referencesSvc.listCategoryCodes('QUEUE_INFO', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.queueInformations = obj;
        subs.unsubscribe();
      });
    }
  }

  getFeedbackInformations(): void {
    const obs = this.referencesSvc.listCategoryCodes('FEEDBACK_INFO', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.feedbackInformations = obj;
        subs.unsubscribe();
      });
    }
  }

  getDocumentTypes(): void {
    const obs = this.referencesSvc.listCategoryCodes('DOC_TYPE', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.documentTypes = obj;
        subs.unsubscribe();
      });
    }
  }

  getFormTypes(): void {
    const obs = this.referencesSvc.listCategoryCodes('FORM_TYPE', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.formTypes = obj;
        subs.unsubscribe();
      });
    }
  }

  getFekPullReasons(): void {
    const obs = this.referencesSvc.listCategoryCodes('FEK_PULL_REASON', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.fekPullReasons = obj;
        subs.unsubscribe();
      });
    }
  }

  getRnfStatues(): void {
    const obs = this.referencesSvc.listCategoryCodes('RNF_STATUS', uuid());
    if (obs) {
      const subs = obs.subscribe(obj => {
        this.rnfStatuses = obj;
        subs.unsubscribe();
      });
    }
  }

  goBack(isDeleteFlag: boolean): void {
    if (isDeleteFlag) {
      this.documentSearchService.lastDocDeleted = true;
    }
    this.showPdf = false;
    this.router.navigate([documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentSearch]);
  }

  onAbortDeletion(): void {
    this.deleteModalVisible = false;
    this.selectedDeleteNoteId = undefined;
  }

  onAbortSeparation(): void {
    this.separateModalVisible = false;
  }

  onConfirmSeparation(): void {
    this.separateModalVisible = false;
  }

  onConfirmDeletion(): void {
    this.msgBoxSvc.reset();
    if (this.selectedDeleteNoteId) {
      const deleteMe: number = this.selectedDeleteNoteId;
      if (!isNaN(+deleteMe)) {
        const deleteDocumentNoteSubs = this.docNotesApi.deleteDocumentNote(this.dcn.toString(), +deleteMe, uuid(), 'response').subscribe(resp => {

          if (resp.status !== 204) {
            this.msgBoxSvc.addMessageBox('Note not deleted', MessageBoxType.ERROR, 'The Note was not deleted from the document');
          } else {
            this.msgBoxSvc.addMessageBox('Note deleted', MessageBoxType.SUCCESS, 'The Note was deleted from the document ', 3000);
            this.getDocNotes();
          }
          deleteDocumentNoteSubs.unsubscribe();
        }, (e) => {
          this.msgBoxSvc.addMessageBox('Note not deleted', MessageBoxType.ERROR, 'The Note was not deleted from the document');
          deleteDocumentNoteSubs.unsubscribe();
        });
      }
      this.deleteModalVisible = false;
      this.selectedDeleteNoteId = undefined;
    }
  }

  confirmAddNote(): void {
    this.msgBoxSvc.reset();
    this.showAddNoteModal = false;
    let note: DocumentNotesVO;
    note = {
      note: this.noteContent
    };

    const createDocumentNoteSubs = this.docNotesApi.createDocumentNote(this.dcn.toString(), note, uuid(), 'response').subscribe(resp => {

      if (resp.status === 201) {
        this.msgBoxSvc.addMessageBox('Added Note', MessageBoxType.SUCCESS, 'The note was added to the document', 3000);
        this.noteContent = '';
        this.getDocNotes();
      } else {
        this.msgBoxSvc.addMessageBox('Adding Note Unsuccessful', MessageBoxType.ERROR, 'The note was not added to the document');
      }
      createDocumentNoteSubs.unsubscribe();
    }, (e) => {
      this.msgBoxSvc.addMessageBox('Adding Note Unsuccessful', MessageBoxType.ERROR, 'The note was not added to the document');
      createDocumentNoteSubs.unsubscribe();
    });
  }

  editItemNote(index: number): void {
    if (this.selectedUpdateNoteId && this.documentNotes[this.selectedUpdateNoteId]) {
      if (this.updatedNoteContent !== this.documentNotes[this.selectedUpdateNoteId].note) {
        this.showUpdateModal = !this.showUpdateModal;
        return;
      }
      this.documentNotes[this.selectedUpdateNoteId].editing = false;
    }
    this.updatedNoteContent = this.documentNotes[index].note;
    this.selectedUpdateNoteId = index;
    this.isEditing = true;
    this.documentNotes[index].editing = true;
  }

  editItemNoteOld(index: number): void {
    if (this.selectedUpdateNoteId !== undefined && this.documentNotes[this.selectedUpdateNoteId]) {
      this.documentNotes[this.selectedUpdateNoteId].editing = false;
    }
    this.noteContent = this.documentNotes[index].note ? this.documentNotes[index].note : '';
    this.selectedUpdateNoteId = index;
    this.isEditing = true;
    this.documentNotes[index].editing = true;
  }

  confirmUpdateNote(): void {
    this.msgBoxSvc.reset();
    const index: number = this.selectedUpdateNoteId;
    const noteId = this.documentNotes[index].noteId;
    const note = {
      note: this.noteContent,
      noteId: this.documentNotes[index].noteId,
      paperNonClaimId: this.documentNotes[index].documentId,
      deleteIndicator: this.documentNotes[index].deleteIndicator,
      noteCreatedBy: this.loginSvc.loginState.username
    };

    const updateDocumentNoteSubs = this.docNotesApi.updateDocumentNote(this.dcn.toString(), noteId ? noteId : -1, note, uuid(), 'response').subscribe(resp => {

      if (resp.status === 200) {
        this.msgBoxSvc.addMessageBox('Document note updated', MessageBoxType.SUCCESS, 'The document note successfully updated', 3000);
        this.resetNoteScreen();
        this.documentNotes[index].editing = false;
        this.getDocNotes();
      } else {
        this.msgBoxSvc.addMessageBox('Error updating document', MessageBoxType.ERROR, 'The document note failed to be updated');
      }
      updateDocumentNoteSubs.unsubscribe();
    }, (e) => {
      this.msgBoxSvc.addMessageBox('Error updating document', MessageBoxType.ERROR, 'The document note failed to be updated');
      updateDocumentNoteSubs.unsubscribe();
    });
  }

  updateModalCancel(): void {
    this.showUpdateModal = !this.showUpdateModal;
    this.selectedUpdateNoteId = -1;
    this.isEditing = !this.isEditing;
  }

  resetNoteScreen(): void {
    this.showUpdateModal = false;
    this.noteContent = '';
    this.updatedNoteContent = '';
    this.isEditing = !this.isEditing;
    this.documentNotes[this.selectedUpdateNoteId].editing = false;
    this.selectedUpdateNoteId = -1;
  }

  deleteItemNote(noteToDelete: ResourceOfDocumentNotesVO): void {
    if (!this.isEditing) {
      this.selectedDeleteNoteId = noteToDelete.noteId;
      this.deleteModalVisible = true;
    }
  }

  copyText(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.claimNumber.nativeElement.value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.isCopy = true;
  }

  onClear(): void {
    this.showClearDialog = false;

    if (this.matchedIndicatorValue === 'N') {

      if (this.docMetaFormGroup!.get('member')!.get('lastName')) {
        this.docMetaFormGroup!.get('member')!.get('lastName')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('lastName')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('firstName')) {
        this.docMetaFormGroup!.get('member')!.get('firstName')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('firstName')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('state')) {
        this.docMetaFormGroup!.get('member')!.get('state')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('state')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('dateOfBirth')) {
        this.docMetaFormGroup!.get('member')!.get('dateOfBirth')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('dateOfBirth')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('accountNumber')) {
        this.docMetaFormGroup!.get('member')!.get('accountNumber')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('accountNumber')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('middleName')) {
        this.docMetaFormGroup!.get('member')!.get('middleName')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('middleName')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('zipCode')) {
        this.docMetaFormGroup!.get('member')!.get('zipCode')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('zipCode')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('gender')) {
        this.docMetaFormGroup!.get('member')!.get('gender')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('gender')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('medicareBeneficiaryId')) {
        this.docMetaFormGroup!.get('member')!.get('medicareBeneficiaryId')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('medicareBeneficiaryId')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('planType')) {
        this.docMetaFormGroup!.get('member')!.get('planType')!.setValue(undefined);
        this.docMetaFormGroup!.get('member')!.get('planType')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')!.get('planCode')) {
        this.docMetaFormGroup!.get('member')!.get('planCode')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('planCode')!.markAsDirty();
      }

      if (this.docMetaFormGroup!.get('member')) {
        this.docMetaFormGroup!.get('member')!.get('planEffectiveDate')!.setValue('');
        this.docMetaFormGroup!.get('member')!.get('planEffectiveDate')!.markAsDirty();
      }
    }

    if (this.docMetaFormGroup!.get('claim')!.get('dosFrom')) {
      this.docMetaFormGroup!.get('claim')!.get('dosFrom')!.setValue('');
      this.docMetaFormGroup!.get('claim')!.get('dosFrom')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('claim')!.get('dosTo')) {
      this.docMetaFormGroup!.get('claim')!.get('dosTo')!.setValue('');
      this.docMetaFormGroup!.get('claim')!.get('dosTo')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('claim')!.get('providerName')) {
      this.docMetaFormGroup!.get('claim')!.get('providerName')!.setValue('');
      this.docMetaFormGroup!.get('claim')!.get('providerName')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('claim')!.get('providerTin')) {
      this.docMetaFormGroup!.get('claim')!.get('providerTin')!.setValue('');
      this.docMetaFormGroup!.get('claim')!.get('providerTin')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('claim')!.get('ubTypeOfBill')) {
      this.docMetaFormGroup!.get('claim')!.get('ubTypeOfBill')!.setValue('');
      this.docMetaFormGroup!.get('claim')!.get('ubTypeOfBill')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('check')!.get('checkAmount')) {
      this.docMetaFormGroup!.get('check')!.get('checkAmount')!.setValue('');
      this.docMetaFormGroup!.get('check')!.get('checkAmount')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('check')!.get('checkDate')) {
      this.docMetaFormGroup!.get('check')!.get('checkDate')!.setValue('');
      this.docMetaFormGroup!.get('check')!.get('checkDate')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('feedbackInfo')) {
      this.docMetaFormGroup!.get('feedbackInfo')!.setValue('');
      this.docMetaFormGroup!.get('feedbackInfo')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('documentType')) {
      this.docMetaFormGroup!.get('documentType')!.setValue('');
      this.docMetaFormGroup!.get('documentType')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('formType')) {
      this.docMetaFormGroup!.get('formType')!.setValue('');
      this.docMetaFormGroup!.get('formType')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('asiMailIndicator')) {
      this.docMetaFormGroup!.get('asiMailIndicator')!.setValue('');
      this.docMetaFormGroup!.get('asiMailIndicator')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('employerBusinessIndicator')) {
      this.docMetaFormGroup!.get('employerBusinessIndicator')!.setValue('');
      this.docMetaFormGroup!.get('employerBusinessIndicator')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('healthAlliesIndicator')) {
      this.docMetaFormGroup!.get('healthAlliesIndicator')!.setValue('');
      this.docMetaFormGroup!.get('healthAlliesIndicator')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('fekPullReason')) {
      this.docMetaFormGroup!.get('fekPullReason')!.setValue('');
      this.docMetaFormGroup!.get('fekPullReason')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('rnfStatus')) {
      this.docMetaFormGroup!.get('rnfStatus')!.setValue('');
      this.docMetaFormGroup!.get('rnfStatus')!.markAsDirty();
    }

    if (this.docMetaFormGroup!.get('routingErrorIndicator')) {
      this.docMetaFormGroup!.get('routingErrorIndicator')!.setValue('');
      this.docMetaFormGroup!.get('routingErrorIndicator')!.markAsDirty();
    }

  }

  private createRightButton(): void {
    this.pageHeaderService.headerRightItem = new HeaderRightItem(DocumentDetailRightComponent, {
      documentControlNumber: this.documentControlNumber,
      documentControlNumberStr: this.documentControlNumberStr,
      documentBusinessIdType: this.documentBusinessIdType,
      currentWorkQueueBusinessId: this.currentWorkQueueBusinessId,
      selectedDcnList: this.selectedDcnList,
      isDocTypeClaim: this.isDocTypeClaim,
      downloadUrl: this.downloadLink,
      documentVO: this.documentVO,
      isStatusComplete: this.lockedInd ? this.lockedInd : this.isStatusComplete,
    }, this.componentFactoryResolver, this.injector);
  }

  private createAndHandleNewProcess(handler: (wqiProcVo: WorkQueueItemProcessVO) => void): void {

    const bpmVo: WorkQueueItemBpmVO = {
      reason: 'Routing uploaded document without WQ ID',
      wqiBusinessId: this.documentControlNumberStr,
      businessIdType: this.documentBusinessIdType,
      queue: undefined,
      assignedBy: this.loginSvc.loginState.username,
      urgency: 1
    };

    const startWQItemSubs = this.wqSvc.startWQItem(bpmVo, uuid())
      .map((procVo: WorkQueueBpmStartVO) => {
        return {
          wqiId: procVo.wqiId,
          processId: procVo.processId,
          wqiBusinessId: this.documentControlNumberStr,
          businessIdType: this.documentBusinessIdType,
          queue: undefined,
          assignedBy: this.loginSvc.loginState.username
        };
      })
      .catch((e) => {
        this.msgBoxSvc.addMessageBox('Work Queue Item Creation Failed',
          MessageBoxType.ERROR, 'The document has no Work Queue Item, and attempts to create one for the document failed');
        return Observable.of({});
      })
      .subscribe(resp => {
        handler(resp);
        startWQItemSubs.unsubscribe();
      });
  }
}

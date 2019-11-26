import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {MatExpansionPanel} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DocMetaApi,
  DocumentManagementApi,
  DocumentVO,
  PagedResourcesOfResourceOfDocumentVO,
  ResourceOfDocumentVO,
  WorkItemApi,
  WorkProcessApi,
  WorkQueueApi,
  WorkQueueItemBpmVO,
  WorkQueueItemMetadataVO,
  WorkQueueItemProcessVO
} from '@fox/rest-clients';
import {
  BadgeColors,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  documentRepositoryMenuGroupDocumentDetailId,
  documentRepositoryRoutePathDocumentDetail,
  documentRepositoryRoutePathRoot,
  DocumentSearchTableHeaderModel,
  FeatureFlagService,
  LoginService,
  MessageBoxService,
  MessageBoxType,
  ModalService,
  TableColumnKind,
  WorkSessionService
} from '@fox/shared';
import {of} from 'rxjs';
import {Observable} from 'rxjs/Rx';
import * as uuidNS from 'uuid';
import {DocumentSearchService} from './document-search.service';
import {DocumentSearchDropdownModel} from './model/document-search-dropdown.model';
import {DocumentSearchLockedByModel} from './model/document-search-locked-by.model';
import {DocumentSearchParameterModel} from './model/document-search-parameter.model';

const uuid = uuidNS;

@Component({
  selector: 'fox-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.css']
})
export class DocumentSearchComponent implements AfterViewInit {
  selectedType = 'correspondence';
  resetForm = false;
  formValid = false;
  getForm = false;
  searchResult: ResourceDocument[] = [];
  documents: ResourceDocument[] = [];
  showEnteredParameters = false;
  numberOfElements = 0;
  selectedDocList: ResourceDocument[] = [];
  allChecked = false;
  parametersUsed: DocumentSearchParameterModel[] = [];
  showDeleteDialog = false;
  documentForm: DocumentVO = {};
  showQuickEdit = false;
  quickEditDcn: any;
  claimSearch = 'DT2';

  docPageSize = 10;
  docPageTotal = 0;
  currentDocPage = 0;

  isDesc = false;
  column = 'docCtlNbr';

  lockedByList: DocumentSearchLockedByModel[] = [];

  genderDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.genderDropdownValues;
  fekPullReasonDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.fekPullReasonDropdownValues;
  memberStateDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.memberStateDropdownValues;
  planTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.planTypeDropdownValues;
  feedbackInfoDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.feedbackInfoDropdownValues;
  docTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.docTypeDropdownValues;
  formTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.formTypeDropdownValues;
  rnfStatusDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.rnfStatusDropdownValues;
  queueInfoDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.queueInfoDropdownValues;

  tableColumnCurrentSortKey: string = '';
  tableColumnCurrentSortDirection: any;
  recordLockedIcon: BadgeSettings = {
    templateType: BadgeTemplates.icon,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked]
  };
  queueIcon: BadgeSettings = {
    templateType: BadgeTemplates.icon,
    backgroundColor: BadgeColors.queue,
    badgeClasses: ['bd-chip-icon', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.queue,
    iconClasses: [BadgeIcons.queue]
  };

  tableHeadersFoxTable = [
    {
      key: '',
      headerText: '',
      kind: TableColumnKind.Badges,
      border: false,
      badges: [
        {
          condition: this.onQueue,
          badge: this.queueIcon,
          toolTipKey: 'queueInformation'
        },
        {
          condition: this.lockBadge,
          badge: this.recordLockedIcon,
          toolTipKey: 'recordLockedMessage'
        }
      ]
    },
    {
      key: 'docControlNumber',
      headerText: 'Document',
      kind: TableColumnKind.Link,
      border: false,
      sortKey: 'docControlNumber',
      menus: [
        {
          key: 'quickEditDocument',
          title: 'Quick Edit Document',
          kind: 'menu',
          visible: (data: any) => {
            return this.hasOpMaintainWq && !this.isLocked(data.docControlNumber) && data.documentType !== this.claimSearch;
          },
        },
        {
          key: 'deleteDocument',
          title: 'Delete Document',
          kind: 'menu',
          visible: (data: any) => {
            return this.hasOpDeleteDocument && !this.isLocked(data.docControlNumber) && data.docControlNumber !== this.currentWorkQueueBusinessId;
          },
        },
        {
          kind: 'divider',
          visible: (data: any) => {
            return ((this.hasOpDeleteDocument || this.hasOpMaintainWq) && !this.isLocked(data.docControlNumber) && data.documentType !== this.claimSearch);
          }
        },
        {
          key: 'downloadAsPDF',
          title: 'Download as PDF',
          kind: 'menu',
          visible: (data: any) => {
            return true;
          }
        },
        {
          kind: 'divider',
          visible: (data: any) => {
            return this.hasOpMaintainWq && !this.isLocked(data.docControlNumber);
          }
        },
        {
          key: 'SendtoWorkbench',
          title: 'Send to Workbench',
          kind: 'menu',
          visible: (data: any) => {
            return this.hasOpMaintainWq && !this.isLocked(data.docControlNumber);
          },
          disabled: (data: any) => {
            return data.wqStatusComplete;
          }
        },
        {
          key: 'RoutetoQueue',
          title: 'Route to Queue',
          kind: 'menu',
          visible: (data: any) => {
            return this.hasOpMaintainWq && !this.isLocked(data.docControlNumber);
          },
          disabled: (data: any) => {
            return data.wqStatusComplete;
          }
        }
      ]
    },
    {
      key: 'memberNumber',
      headerText: 'Member #',
      kind: TableColumnKind.Link,
      border: false,
      preImage: 'member-blue.svg',
      sortKey: 'memberNumber'
    },
    {
      key: 'lastName',
      headerText: 'Last Name',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'lastName'
    },
    {
      key: 'firstName',
      headerText: 'First Name',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'firstName'
    },
    {
      key: 'middleName',
      headerText: 'Middle Name',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'middleName'
    },
    {
      key: 'memberstate',
      headerText: 'Member State',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'memberstate'
    },
    {
      key: 'zipcode',
      headerText: 'Zip Code',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'zipcode'
    },
    {
      key: 'dateofbirth',
      headerText: 'Date of Birth',
      kind: TableColumnKind.Date,
      border: false,
      sortKey: 'dateofbirth'
    },
    {
      key: 'gender',
      headerText: 'Gender',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'gender'
    },
    {
      key: 'mbi',
      headerText: 'MBI',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'mbi'
    },
    {
      key: 'plantype',
      headerText: 'Plan Type',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'plantype'
    },
    {
      key: 'plancode',
      headerText: 'Plan Code',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'plancode'
    },
    {
      key: 'planeffdate',
      headerText: 'Plan Eff Date',
      kind: TableColumnKind.Date,
      border: false,
      sortKey: 'planeffdate'
    },
    {
      key: 'claimNumber',
      headerText: 'Claim Number',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'claimNumber'
    },
    {
      key: 'dosFrom',
      headerText: 'DOS From',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'dosFrom'
    },
    {
      key: 'dosTo',
      headerText: 'DOS To',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'dosTo'
    },
    {
      key: 'providerName',
      headerText: 'Provider Name',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'providerName'
    },
    {
      key: 'providerTin',
      headerText: 'Provider TIN',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'providerTin'
    },
    {
      key: 'claimJulianDate',
      headerText: 'Claim Julian Date',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'claimJulianDate'
    },
    {
      key: 'ubTypeOfBill',
      headerText: 'UB Type of Bill',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'ubTypeOfBill'
    },
    {
      key: 'checkClaimNumber',
      headerText: 'Check Claim Number',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'checkClaimNumber'
    },
    {
      key: 'depositDate',
      headerText: 'Deposit Date',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'depositdate'
    },
    {
      key: 'checkDate',
      headerText: 'Check Date',
      kind: TableColumnKind.Date,
      border: false,
      sortKey: 'checkDate'
    },
    {
      key: 'checkAmount',
      headerText: 'Check Amount',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'checkAmount'
    },
    {
      key: 'checkNumber',
      headerText: 'Check Number',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'checkNumber'
    },
    {
      key: 'filmLocator',
      headerText: 'Film Locator Number',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'filmLocator'
    },
    {
      key: 'checkControl',
      headerText: 'Check Control Number',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'checkControl'
    },
    {
      key: 'overPayment',
      headerText: 'Overpayment Collection Type',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'overPayment'
    },
    {
      key: 'docControlNumber',
      headerText: 'DCN',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'docControlNumber'
    },
    {
      key: 'feedbackInfo',
      headerText: 'Feedback Code',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'feedbackInfo'
    },
    {
      key: 'documentType',
      headerText: 'Document Type',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'documentType'
    },
    {
      key: 'formType',
      headerText: 'Form Type',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'formType'
    },
    {
      key: 'asiMailIndicator',
      headerText: 'ASI Mail',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'asiMailIndicator'
    },
    {
      key: 'employerBusinessIndicator',
      headerText: 'Employer Business',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'employerBusinessIndicator'
    },
    {
      key: 'healthAlliesIndicator',
      headerText: 'Health Allies',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'healthAlliesIndicator'
    },
    {
      key: 'fekPullReason',
      headerText: 'FEK Pull Reason',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'fekPullReason'
    },
    {
      key: 'rnfStatus',
      headerText: 'RNF Status',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'rnfStatus'
    },
    {
      key: 'routingErrorIndicator',
      headerText: 'Routing Error',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'routingErrorIndicator'
    },
    {
      key: 'customerDCN',
      headerText: 'Customer DCN',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'customerDCN'
    },
    {
      key: 'queueInformation',
      headerText: 'Queue Info',
      kind: TableColumnKind.Text,
      border: false,
      sortKey: 'queueInformation'
    }

  ];
  tableHeaders: DocumentSearchTableHeaderModel[] = [
    {headerName: 'Document', HeaderPO: 'docCtlNbr'},
    {headerName: 'Member #', HeaderPO: 'mbrAcctNbr'},
    {headerName: 'Last Name', HeaderPO: 'mbrLstNm'},
    {headerName: 'First Name', HeaderPO: 'mbrFstNm'},
    {headerName: 'Middle Name', HeaderPO: 'mbrMidlNm'},
    {headerName: 'Member State', HeaderPO: 'mbrStCd'},
    {headerName: 'Zip Code', HeaderPO: 'mbrZipCd'},
    {headerName: 'Date of Birth', HeaderPO: 'dob'},
    {headerName: 'Gender', HeaderPO: 'gdrCd'},
    {headerName: 'MBI', HeaderPO: 'medcrBenfyId'},
    {headerName: 'Plan Type', HeaderPO: 'plnTypCd'},
    {headerName: 'Plan Code', HeaderPO: 'plnCd'},
    {headerName: 'Plan Eff Date', HeaderPO: 'plnEffDt'},
    {headerName: 'Claim Number', HeaderPO: 'clmNbr'},
    {headerName: 'DOS From', HeaderPO: 'dosFrom'},
    {headerName: 'DOS To', HeaderPO: 'dosTo'},
    {headerName: 'Provider Name', HeaderPO: 'provNm'},
    {headerName: 'Provider TIN', HeaderPO: 'provTin'},
    {headerName: 'Claim Julian Date', HeaderPO: 'clmJulnDt'},
    {headerName: 'UB Type of Bill', HeaderPO: 'ubTypOfBil'},
    {headerName: 'Check Claim Number', HeaderPO: ''},
    {headerName: 'Deposit Date', HeaderPO: ''},
    {headerName: 'Check Date', HeaderPO: 'chkDt'},
    {headerName: 'Check Amount', HeaderPO: 'chkAmt'},
    {headerName: 'Check Number', HeaderPO: 'chkNbr'},
    {headerName: 'Film Locator Number', HeaderPO: ''},
    {headerName: 'Check Control Number', HeaderPO: ''},
    {headerName: 'Overpayment Collection Type', HeaderPO: ''},
    {headerName: 'DCN', HeaderPO: 'docCtlNbr'},
    {headerName: 'Feedback Code', HeaderPO: 'fdbckInfoCd'},
    {headerName: 'Document Type', HeaderPO: 'docType'},
    {headerName: 'Form Type', HeaderPO: 'fmTypCd'},
    {headerName: 'ASI Mail', HeaderPO: 'asiMail'},
    {headerName: 'Employer Business', HeaderPO: 'empBus'},
    {headerName: 'Health Allies', HeaderPO: 'hlthAllies'},
    {headerName: 'FEK Pull Reason', HeaderPO: 'fekPullRsnCd'},
    {headerName: 'RNF Status', HeaderPO: 'rnfStsCd'},
    {headerName: 'Routing Error', HeaderPO: 'rteErr'},
    {headerName: 'Customer DCN', HeaderPO: ''},
    {headerName: 'Queue Info', HeaderPO: 'queueInformation'}
  ];

  @ViewChild('documentsTable') documentsTable: any;

  newVersion = false;
  @ViewChild('matExpansionPanel') matExpansionPanel?: MatExpansionPanel;

  get isNewVersion(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4275');
  }

  get saveToWorkbenchModalVisible(): boolean {
    return this.modalService.saveToWorkbenchModalVisible;
  }

  set saveToWorkbenchModalVisible(visible: boolean) {
    this.modalService.saveToWorkbenchModalVisible = visible;
  }

  get routeToQueueModalVisible(): boolean {
    return this.modalService.routeToQueueModalVisible;
  }

  set routeToQueueModalVisible(visible: boolean) {
    this.modalService.routeToQueueModalVisible = visible;
  }

  get hasOpDeleteDocument(): boolean {
    return this.loginService.hasOpDeleteDocument;
  }

  get hasOpMaintainWq(): boolean {
    return this.loginService.hasOpMaintainWq;
  }

  get documentBusinessIdType(): number {
    return this.workSessionService.documentBusinessId;
  }

  get currentWorkQueueBusinessId(): string {
    return this.workSessionService.currentWorkQueueBusinessId;
  }

  get selectedDocListDownloadUrls(): string[] {
    return this.selectedDocList.map(doc => this.downloadUrl(doc.docControlNumber || '', doc.documentType || ''));
  }

  get selectedDocListNumbers(): string[] {
    return this.selectedDocList.map(doc => doc.docControlNumber || '');
  }

  get isUnlockedInSelected(): boolean {
    let foundUnlocked = false;
    for (let i = 0; i < this.selectedDocList.length; i++) {
      const doc = this.selectedDocList[i];
      if (doc && !this.isLocked(doc.docControlNumber || '')) {
        foundUnlocked = true;
      }
    }
    return foundUnlocked;
  }

  get isLockBadgeInTheList(): boolean {
    return (this.selectedDocList.find(s => s.lockBadge === true)) ? true : false;
  }

  get checkRefresh(): string {
    if (this.modalService.routeToQueueCompleted && !this.modalService.routeToQueueFromDetailInitiated) {
      this.searchDocument();
      this.modalService.routeToQueueCompleted = false;
    }

    if (this.modalService.saveToWorkbenchCompleted && !this.modalService.saveToWorkbenchFromDetailInitiated) {
      this.searchDocument();
      this.modalService.saveToWorkbenchCompleted = false;
    }

    if (this.modalService.routeToQueueFromDetailInitiated && !this.modalService.routeToQueueCompleted) {
      this.modalService.routeToQueueFromDetailInitiated = false;
    }

    if (this.modalService.saveToWorkbenchFromDetailInitiated && !this.modalService.saveToWorkbenchCompleted) {
      this.modalService.saveToWorkbenchFromDetailInitiated = false;
    }

    return '';
  }

  get isWQStatusComplete(): boolean {
    let wqStatCompleted = false;
    for (let i = 0; i < this.selectedDocList.length; i++) {
      const doc = this.selectedDocList[i];
      if (doc) {
        if (doc.wqStatusComplete === true) {
          wqStatCompleted = true;
          return wqStatCompleted;
        }
      }
    }
    return wqStatCompleted;
  }

  constructor(
    private docMetaApi: DocMetaApi,
    private documentSearchService: DocumentSearchService,
    private docManagementApi: DocumentManagementApi,
    private modalService: ModalService,
    private loginService: LoginService,
    private changeDetRef: ChangeDetectorRef,
    private workItemApi: WorkItemApi,
    private workProcessApi: WorkProcessApi,
    private messageBoxService: MessageBoxService,
    private workQueueApi: WorkQueueApi,
    private workSessionService: WorkSessionService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private http: HttpClient,
    private featureFlagSvc: FeatureFlagService) {
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (event.target) {
      if (!this._isExpansionIndicator(event.target)) {
        matExpansionPanel.toggle();
      }
    }
  }

  expandPanelOnKeyPress(matExpansionPanel: MatExpansionPanel, event: Event): void {

    event.stopPropagation(); // Preventing event bubbling
  }

  lockBadge(data: any): boolean {
    return data.lockBadge && !data.wqStatusComplete;
  }

  onQueue(data: any): boolean {
    return data.onQueue && !data.wqStatusComplete;
  }

  ngAfterViewInit(): void {
    if (this.documentSearchService.lastDocDeleted) {
      this.getForm = true;
      this.documentSearchService.lastDocDeleted = false;
    } else if (this.documentSearchService.documentDetailVisited) {
      this.documentSearchService.documentDetailVisited = false;
      this.numberOfElements = this.documentSearchService.numberOfElements;
      this.docPageTotal = this.documentSearchService.docPageTotal;
      this.currentDocPage = this.documentSearchService.currentDocPage;

      this.isDesc = this.documentSearchService.isDesc;
      this.column = this.documentSearchService.column;

      this.showEnteredParameters = true;
      this.parametersUsed = this.documentSearchService.parametersUsed.slice(0, 3);
      this.getForm = true;
      if (this.matExpansionPanel) {
        this.matExpansionPanel.close();
      }
    }
  }

  processSearch(document: DocumentVO): void {
    this.currentDocPage = 0;
    this.documentForm = document;
    this.searchDocument();
  }

  getDropdownDescription(code: string, dropdownValues: DocumentSearchDropdownModel[]): string {
    const desc = dropdownValues.filter(value => value.dropdownItemValue === code);
    if (desc.length > 0) {
      return desc[0].dropdownItemDesc;
    } else {
      return code;
    }
  }

  convertYN(code: string): string {
    if (code === 'Y') {
      return 'Yes';
    } else if (code === 'N') {
      return 'No';
    } else {
      return code;
    }
  }

  searchDocument(): void {
    this.selectedDocList = [];
    this.allChecked = false;
    const findDocumentMetadataSubscription = this.docMetaApi.findDocumentMetadata(this.documentForm, uuid(), this.docPageSize,
      this.currentDocPage, this.isDesc ? 'DESC' : 'ASC', this.column).subscribe((resp: PagedResourcesOfResourceOfDocumentVO) => {
      if (resp._embedded && resp._embedded.items && resp.page && resp.page.totalElements) {
        this.numberOfElements = resp.page.totalElements;
        this.docPageTotal = resp.page.totalPages ? resp.page.totalPages : 0;
        this.currentDocPage = resp.page.number ? resp.page.number : 0;

        if (resp.page.totalElements > 100) {
          this.messageBoxService.addMessageBox('Too many result found', MessageBoxType.ERROR, 'Please update your search query and try again.');
        } else {
          this.searchResult = resp._embedded.items;

          this.documents = this.searchResult.map(d => {
            return {
              docControlNumber: d.docControlNumber,
              memberNumber: d.member && d.member.accountNumber,
              lastName: d.member && d.member.lastName,
              firstName: d.member && d.member.firstName,
              middleName: d.member && d.member.middleName,
              memberstate: d.member && d.member.state && this.getDropdownDescription(d.member.state, this.memberStateDropdownValues),
              zipcode: d.member && d.member.zipCode,
              dateofbirth: d.member && d.member.dateOfBirth,
              gender: d.member && d.member.gender && this.getDropdownDescription(d.member.gender, this.genderDropdownValues),
              mbi: d.member && d.member.medicareBeneficiaryId,
              plantype: d.member && d.member.planType && this.getDropdownDescription(d.member.planType, this.planTypeDropdownValues),
              plancode: d.member && d.member.planCode,
              planeffdate: d.member && d.member.planEffectiveDate,
              claimNumber: d.claim && d.claim.claimNumber,
              dosFrom: d.claim && d.claim.dosFrom,
              dosTo: d.claim && d.claim.dosTo,
              providerName: d.claim && d.claim.providerName,
              providerTin: d.claim && d.claim.providerTin,
              claimJulianDate: d.claim && d.claim.claimJulianDate,
              ubTypeOfBill: d.claim && d.claim.ubTypeOfBill,
              checkDate: d.check && d.check.checkDate,
              checkAmount: d.check && d.check.checkAmount,
              checkNumber: d.check && d.check.checkNumber,
              routingErrorIndicator: d.routingErrorIndicator && this.convertYN(d.routingErrorIndicator),
              fekPullReason: d.fekPullReason && this.getDropdownDescription(d.fekPullReason, this.fekPullReasonDropdownValues),
              documentType: d.documentType && this.getDropdownDescription(d.documentType, this.docTypeDropdownValues),
              formType: d.formType && this.getDropdownDescription(d.formType, this.formTypeDropdownValues),
              asiMailIndicator: d.asiMailIndicator && this.convertYN(d.asiMailIndicator),
              healthAlliesIndicator: d.healthAlliesIndicator && this.convertYN(d.healthAlliesIndicator),
              queueInformation: d.queueInformation && this.getDropdownDescription(d.queueInformation, this.queueInfoDropdownValues),
              rnfStatus: d.rnfStatus && this.getDropdownDescription(d.rnfStatus, this.rnfStatusDropdownValues),
              feedbackInfo: d.feedbackInfo && this.getDropdownDescription(d.feedbackInfo, this.feedbackInfoDropdownValues),
              employerBusinessIndicator: d.employerBusinessIndicator && this.convertYN(d.employerBusinessIndicator),
              onQueue: d.onQueue,
              lockBadge: d.lockBadge,
              wqStatusComplete: d.wqStatusComplete,
              queueName: d.queueName,
              checkClaimNumber: 'Check Claim Number',
              depositDate: 'Deposit Date',
              filmLocator: 'Film Locator Number',
              checkControl: 'Check Control Number',
              overPayment: 'Overpayment Collection Type',
              customerDCN: 'Customer DCN',
              recordLockedMessage: 'This record is Locked'
            };
          });
          this.documentSearchService.numberOfElements = this.numberOfElements;
          this.documentSearchService.docPageTotal = this.docPageTotal;
          this.documentSearchService.currentDocPage = this.currentDocPage;

          this.documentSearchService.isDesc = this.isDesc;
          this.documentSearchService.column = this.column;

          this.parametersUsed = this.documentSearchService.parametersUsed.slice(0, 3);
          if (this.matExpansionPanel) {
            this.matExpansionPanel.close();
          }

          this.lockedByList = [];
          const documents = !this.isNewVersion ? this.searchResult : this.documents;
          // Get the locked by status for each of the document
          for (let i = 0; i < documents.length; i++) {
            const document = documents[i];
            if (document) {
              const retrieveQueueProcessSubscription = this.workItemApi.retrieveQueueProcessByBusinessType(
                document.docControlNumber ? document.docControlNumber : '',
                '1', uuid())
                .subscribe(respWI => {
                  if (respWI.wqiId) {
                    if (!respWI.userId
                      && (respWI.queue && respWI.queue.length > 0)) {
                      const findQueuesSubcription = this.workQueueApi.findQueues(uuid(), undefined, undefined, undefined, respWI.queue)
                        .subscribe(
                          (data) => {
                            if (data.content) {
                              for (const queue of data.content) {
                                document.queueName = 'In Queue: ' + queue.name;
                              }
                            }
                            findQueuesSubcription.unsubscribe();
                          }
                          , (e) => {
                            findQueuesSubcription.unsubscribe();
                          });
                      document.onQueue = true;
                    }
                    if (respWI.status === WorkQueueItemProcessVO.StatusEnum.COMPLETE) {
                      document.wqStatusComplete = true;
                    } else {
                      document.wqStatusComplete = false;
                    }
                    if (respWI.lockedBy && respWI.lockedBy.length > 0) {
                      const lockedByItem: DocumentSearchLockedByModel = new DocumentSearchLockedByModel();
                      lockedByItem.dcn = document.docControlNumber ? document.docControlNumber : '';
                      lockedByItem.lockedBy = respWI.lockedBy;
                      this.lockedByList.push(lockedByItem);
                      if (lockedByItem.lockedBy === this.loginService.username) {
                        document.lockBadge = false;
                      } else {
                        document.lockBadge = true;
                      }
                    }
                  }
                  retrieveQueueProcessSubscription.unsubscribe();
                }, error1 => {
                  document.onQueue = false;
                  document.lockBadge = false;
                  document.wqStatusComplete = false;
                  retrieveQueueProcessSubscription.unsubscribe();
                });
            }
          }
        }
      }
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No documents found', MessageBoxType.ERROR, 'Please update your search query and try again.');
      } else if (e.status === 412) {
        this.messageBoxService.reset();
        this.messageBoxService.addMessageBox('Too many result found', MessageBoxType.ERROR, 'Please update your search query and try again.');
      }
      this.searchResult = [];
      this.numberOfElements = 0;

      findDocumentMetadataSubscription.unsubscribe();
    });
  }

  isLocked(dcn: string): boolean {
    const lockedByDcn = this.lockedByList.map(item => item.dcn);
    return (lockedByDcn.indexOf(dcn) > -1);
  }

  getUrlForDocument(dcn: string): string {
    return documentRepositoryMenuGroupDocumentDetailId;
  }

  keyDownFunction(event: KeyboardEvent): void {
    if (event && event.keyCode && event.keyCode === 13 && this.formValid) {
      this.getForm = true;
    }
  }

  onSelectionChange(doc: ResourceDocument): void {
    const selectedDcnIndex: number = this.selectedDocList.map(docu => docu.docControlNumber).indexOf(doc.docControlNumber);
    if (selectedDcnIndex > -1) {
      this.selectedDocList.splice(selectedDcnIndex, 1);
    } else {
      this.selectedDocList.push(doc);
    }
  }

  confirmDeleteDoc(): void {

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < this.selectedDocList.length; i++) {
      const doc = this.selectedDocList[i];
      if (doc) {
        const manageDocumentDeletionSubs = this.docManagementApi.manageDocumentDeletion(doc.docControlNumber || '', uuid()).subscribe(() => {
          successCount++;
          this.showDeleteMessage(successCount, failedCount, this.selectedDocList.length);
          manageDocumentDeletionSubs.unsubscribe();
        }, () => {
          failedCount++;
          this.showDeleteMessage(successCount, failedCount, this.selectedDocList.length);
          manageDocumentDeletionSubs.unsubscribe();
        });
      }
    }
  }

  showDeleteMessage(successCount: number, failedCount: number, totalCount: number): void {
    if (totalCount === (successCount + failedCount)) {
      if (successCount === 0) {
        this.messageBoxService.addMessageBox('Failed', MessageBoxType.ERROR, 'No items successfully deleted.');
      } else if (successCount === totalCount) {
        this.messageBoxService.addMessageBox('Items deleted', MessageBoxType.SUCCESS, 'All items successfully deleted.', 3000);
      } else {
        this.messageBoxService.addMessageBox('Not All Items Successfully deleted', MessageBoxType.ACTIVE, 'Due to an unknown error, only ' + successCount + ' of '
          + totalCount + ' items could be deleted.');
      }

      this.showDeleteDialog = false;
      this.selectedDocList = [];
      this.searchDocument();
      this.allChecked = false;
    }
  }

  changeAllSelection(): void {
    this.selectedDocList = [];
    if (this.allChecked) {
      for (let i = 0; i < this.searchResult.length; i++) {
        const row = this.searchResult[i];
        if (row) {
          this.selectedDocList.push(row);
        }
      }
    }
  }

  selectionChanged(row: any): void {
    if (row.isAll) {
      this.allChecked = row.isChecked;
      this.changeAllSelection();
    } else {
      const selectedRow = this.documents[row.index];
      this.onSelectionChange(selectedRow);
    }
  }

  deleteItemDoc(doc: ResourceDocument): void {
    this.selectedDocList = [];
    this.selectedDocList.push(doc);
    this.showDeleteDialog = true;
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.searchDocument();
  }

  routeToQueueModalOpen(): void {
    this.modalService.routeToQueueItemList = [];
    for (let i = 0; i < this.selectedDocList.length; i++) {
      const doc = this.selectedDocList[i];
      if (doc) {
        const retrieveQueueProcessByBusinessTypeSubs = this.workItemApi.retrieveQueueProcessByBusinessType(doc.docControlNumber || '', this.documentBusinessIdType.toString(), uuid()).subscribe(respWI => {
          this.modalService.itemDetails = (this.selectedDocList.length === 1 && respWI.reason) ? respWI.reason : '';
          if (respWI.wqiId) {
            this.modalService.routeToQueueItemList.push(respWI.wqiId);
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        }, (error) => {
          if (error.status === 404) {
            const newProcess: WorkQueueItemBpmVO = {};
            newProcess.assignedBy = this.loginService.loginState.username;
            newProcess.businessIdType = this.documentBusinessIdType;
            newProcess.queue = undefined;
            newProcess.urgency = 1;
            newProcess.wqiBusinessId = doc.docControlNumber || '';
            const startBpmProcessSubs = this.workProcessApi.startBpmProcess(newProcess, uuid()).subscribe(resp => {
              if (resp.wqiId) {
                this.modalService.routeToQueueItemList.push(resp.wqiId);
              }
              this.modalService.itemDetails = newProcess.reason ? newProcess.reason : '';
              startBpmProcessSubs.unsubscribe();
            }, (e) => {
              if (e.status === 500) {
                this.messageBoxService.addMessageBox('Work Queue Item Creation Failed',
                  MessageBoxType.ERROR, 'The document has no Work Queue Item, and attempts to create one for the document failed');
                return Observable.of({});
              }
            });
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        });
      }
    }
    this.routeToQueueModalVisible = true;
  }

  sendToWorkbenchModalOpen(): void {
    this.modalService.saveToWorkbenchItemList = [];
    for (let i = 0; i < this.selectedDocList.length; i++) {
      const doc = this.selectedDocList[i];
      if (doc) {
        const retrieveQueueProcessByBusinessTypeSubs = this.workItemApi.retrieveQueueProcessByBusinessType(doc.docControlNumber || '', this.documentBusinessIdType.toString(), uuid()).subscribe(respWI => {
          if (respWI.wqiId) {
            const workbenchItem: WorkQueueItemMetadataVO = {};
            workbenchItem.wqiId = respWI.wqiId;
            workbenchItem.userId = respWI.userId ? respWI.userId : '';
            workbenchItem.wqiBusinessId = doc.docControlNumber || '';
            workbenchItem.businessIdType = respWI.businessIdType;
            workbenchItem.queue = respWI.queue;
            workbenchItem.reason = respWI.reason ? respWI.reason : '';
            workbenchItem.followUpDate = respWI.followUpDate ? respWI.followUpDate : '';
            this.modalService.saveToWorkbenchItemList.push(workbenchItem);
            this.modalService.itemDetails = (this.selectedDocList.length === 1 && workbenchItem.reason) ? workbenchItem.reason : '';
            this.modalService.followUpDate = (this.selectedDocList.length === 1 && workbenchItem.followUpDate) ? workbenchItem.followUpDate : '';
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        }, (error) => {
          if (error.status === 404) {
            const newProcess: WorkQueueItemBpmVO = {};
            newProcess.assignedBy = this.loginService.loginState.username;
            newProcess.businessIdType = this.documentBusinessIdType;
            newProcess.queue = undefined;
            newProcess.urgency = 1;
            newProcess.wqiBusinessId = doc.docControlNumber || '';
            this.workProcessApi.startBpmProcess(newProcess, uuid()).subscribe(resp => {
              if (resp.wqiId) {
                const workbenchItem: WorkQueueItemMetadataVO = {};
                workbenchItem.wqiId = resp.wqiId;
                workbenchItem.userId = this.loginService.loginState.username;
                workbenchItem.wqiBusinessId = doc.docControlNumber || '';
                workbenchItem.businessIdType = this.documentBusinessIdType;
                workbenchItem.queue = doc.queueInformation;
                this.modalService.saveToWorkbenchItemList.push(workbenchItem);
                this.modalService.itemDetails = workbenchItem.reason ? workbenchItem.reason : '';
                this.modalService.followUpDate = workbenchItem.followUpDate ? workbenchItem.followUpDate : '';
              }
            }, (e) => {
              if (e.status === 500) {
                this.messageBoxService.addMessageBox('Work Queue Item Creation Failed',
                  MessageBoxType.ERROR, 'The document has no Work Queue Item, and attempts to create one for the document failed');
                return Observable.of({});
              }
            });
          }
          retrieveQueueProcessByBusinessTypeSubs.unsubscribe();
        });
      }
    }
    this.saveToWorkbenchModalVisible = true;
  }

  clearSelection(): void {
    this.selectedDocList = [];
    this.allChecked = false;
    this.documentsTable.clearSelection();
  }

  routeToQueue(doc: ResourceDocument): void {
    this.selectedDocList = [];
    this.selectedDocList.push(doc);
    this.routeToQueueModalOpen();
  }

  sendToWorkbench(doc: ResourceDocument): void {
    this.selectedDocList = [];
    this.selectedDocList.push(doc);
    this.sendToWorkbenchModalOpen();
  }

  downloadUrl(dcn: string, docType: string): string {
    return `/api/docmanagement/${encodeURIComponent(String(dcn))}/image?token=${this.loginService.loginState.access_token}`;
  }

  isSelected(doc: ResourceDocument): boolean {
    return this.selectedDocList.map(docu => docu.docControlNumber).indexOf(doc.docControlNumber) > -1;
  }

  trackByDcn(index: any, item: any): string {
    return item.docControlNumber;
  }

  linkClicked(linkData: any): void {
    const rowIdentifier = linkData && linkData.col && linkData.col.key;
    const rowData = linkData && linkData.data && linkData.data;
    switch (rowIdentifier) {
      case 'docControlNumber':
        const path = '/' + documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail;
        this.router.navigate([path], {
          queryParams: {
            dcn: rowData.docControlNumber,
            isStatusComplete: rowData.isStatusComplete
          }
        });
        break;
    }
  }

  menuClicked(menuData: any): void {
    const key = menuData && menuData.menu && menuData.menu.key;
    const data = menuData && menuData.data;
    switch (key) {
      case 'quickEditDocument':
        this.showQuickEdit = true;
        this.quickEditDcn = data.docControlNumber;
        break;
      case 'deleteDocument':
        this.deleteItemDoc(data);
        break;
      case 'downloadAsPDF':
        this.downloadSingle(this.downloadUrl(data.docControlNumber, data.documentType));
        break;
      case 'SendtoWorkbench':
        this.sendToWorkbench(data);
        break;
      case 'RoutetoQueue':
        this.routeToQueue(data);
        break;
    }
  }

  private downloadSingle(pdfUrl: string): void {
    if (window.navigator.msSaveOrOpenBlob) {

      let headers = new HttpHeaders();
      headers = headers.set('RequestCorrelationId', uuid());
      headers = headers.set('Authorization', 'Bearer ' + this.loginService.loginState.access_token);

      const blobservable: Observable<Blob | undefined> =
        pdfUrl ? this.http.get(pdfUrl, {
          responseType: 'blob',
          observe: 'body',
          headers: headers,
        }) : of(undefined);
      blobservable.subscribe(
        (theBlob?: Blob) => {
          if (theBlob) {
            window.navigator.msSaveOrOpenBlob(theBlob, 'fox-document.pdf');
          }
        }
      );
    } else if (pdfUrl) {
      let downloadLink = document.createElement('a');
      downloadLink.href = `${pdfUrl}?token=${this.loginService.loginState.access_token}`;
      downloadLink.download = 'fox-pdf.pdf';
      downloadLink.hidden = true;
      const hostElem: HTMLElement = this.elementRef.nativeElement;
      const parentElem: HTMLElement = <HTMLElement>hostElem.parentNode;
      downloadLink = parentElem.insertBefore(downloadLink, hostElem);
      downloadLink.click();
      // cleanup
      downloadLink.remove();
    }
  }

  private _isExpansionIndicator(eTarget: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    const target = eTarget as HTMLInputElement;
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }
}

interface ResourceDocument extends ResourceOfDocumentVO {
  onQueue?: boolean;
  lockBadge?: boolean;
  wqStatusComplete?: boolean;
  queueName?: string;
}

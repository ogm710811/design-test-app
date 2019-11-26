import {TitleCasePipe} from '@angular/common';
import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ClaimHistoryApi,
  ClaimsMaterialApi,
  PagedResourcesOfResourceOfClaimHistoryMemberVO,
  PagedResourcesOfResourceOfClaimHistoryVO,
  PagedResourcesOfResourcesListOfResourceOfClaimHistorySendReplaceEobRaEligibleVO
} from '@fox/rest-clients';
import {
  claimProcessingUrlPrefixClaimDetails,
  FeatureFlagService,
  LoginService,
  memberInformationUrlPrefixMemberProfile,
  MessageBoxService,
  MessageBoxType
} from '@fox/shared';
import * as moment from 'moment-timezone';
import * as uuid from 'uuid';
import {MemberInformationService} from '@fox/member-info';
import {ClaimHistorySearchService} from '../shared/claim-history-search.service';
import {TooltipDefinitionService} from '../shared/tooltip-definition.service';
import {ClaimHistoryResultSet} from './claim-history-models/claim-history-result.model';
import {ClaimHistorySearchParameterModel} from './claim-history-models/claim-history-search-parameter.model';
import {MemberCardSet} from './claim-history-models/member-card.model';
import {MemberResultSet} from './claim-history-models/member-result.model';
import {SendReplaceEobResultModel} from './claim-history-models/send-replace-eob-result.model';

@Component({
  selector: 'fox-claim-history',
  templateUrl: './claim-history.component.html',
  styleUrls: ['./claim-history.component.css']
})
export class ClaimHistoryComponent implements OnInit, AfterViewInit {

  @ViewChild('memberid') memberIdElRef?: ElementRef | null;
  @ViewChild('claimNumid') claimIdElRef?: ElementRef | null;
  @ViewChild('matExpansionPanel') matExpansionPanel: MatExpansionPanel;

  @Output() notifyErr: EventEmitter<string> = new EventEmitter<string>();

  claimSearchFormGroup: FormGroup;
  isDataDisplay: boolean = false;
  isMemberDataDisplay: boolean = false;
  isMemberCardDisplay: boolean = false;
  sendReplaceModalVisible: boolean = false;
  enableSendReplace: boolean = false;

  date_regex = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
  number_regex = /^[0-9]+$/;
  claimHistoryResults: ClaimHistoryResultSet[] = [];
  memberResults: MemberResultSet[] = [];
  memberCard: MemberCardSet;

  parametersUsed: ClaimHistorySearchParameterModel[] = [];
  showEnteredParameters = false;

  memberIdInput: string = '';
  claimNumIdInput: string = '';
  typeOfServiceInput: string = '';
  statusInput: string = '';
  dosFromInput: string = '';
  dosToInput: string = '';
  billInput: string = '';
  statusCodeDescr: string = '';
  memberNumDisplay: string = '';

  historyPageSize = 10;
  historyDataLengthInput;
  historyPageTotal = 0;
  currentHistoryPage = 0;

  historyResultIsDesc: boolean = false;
  historyResultSortColumn: string = 'clmNum';
  memberResultIsDesc: boolean = false;
  memberResultSortColumn: string = 'aarpMembershipNumber';
  selectedMemberId: string = '';

  memberRecordNumber: string = '';
  canViewImage: boolean = false;

  selectedRow: number = 0;
  sendReplaceEobResultSet: SendReplaceEobResultModel[] = [];
  selectedClmHistList: string[] = [];
  allClmNumList: string[] = [];
  eobModalTitle: string = '';
  eobModalType: string = '';
  responseMsg: string = '';
  isAllSelected: boolean = false;

  isSendEobActive: boolean = false;
  isSendRaActive: boolean = false;
  isReplaceEobActive: boolean = false;
  isReplaceRaActive: boolean = false;
  isEobActive: boolean = false;
  isRaActive: boolean = false;

  historyRecCount: number = 0;

  reqData = {
    'ppsClaimId': '',
    'membershipId': '',
    'dosFrom': '',
    'dosTo': '',
    'serviceType': '',
    'npi': '',
    'status': '',
    'sortBy': '',
    'orderBy': ''
  };

  isSelectDisabled: boolean = false;
  @ViewChild('claimHistoryResultsComponent') claimHistoryResultsComponent;

  get toggleLockAccountServiceFeature(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F4072');
  }

  constructor(private claimSearchSvc: ClaimHistorySearchService, private loginSvc: LoginService,
              private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private claimHistorySearchApi: ClaimHistoryApi,
              private toolTip: TooltipDefinitionService,
              private memberSvc: MemberInformationService, private messageBoxService: MessageBoxService,
              private router: Router, private titlecasePipe: TitleCasePipe,
              private claimsMaterialApi: ClaimsMaterialApi,
              private featureFlagService: FeatureFlagService) {
    this.getFormClaimSearch();
  }

  static convertDateToISO(originalDate): string | undefined {
    if (originalDate) {
      const dob = originalDate.split('/');
      return dob[2] + '-' + dob[0] + '-' + dob[1];
    } else {
      return undefined;
    }
  }

  static removeWhitespace(sourceString): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  static getStatusDescr(data): string {
    const statusCode = data;
    let statusCodeDescr = '';

    switch (statusCode) {
      case 'D':
        statusCodeDescr = 'DISBURSED';
        break;
      case 'Q':
        statusCodeDescr = 'AWAITING QUALITY REVIEW';
        break;
      case 'R':
        statusCodeDescr = 'POINT OF SALE DRUG CLAIM';
        break;
      case 'S':
        statusCodeDescr = 'SUSPENDED';
        break;
      case 'X':
        statusCodeDescr = 'DELETED';
        break;
      case '':
        statusCodeDescr = 'ALL';
        break;
      default:
        statusCodeDescr = '';

    }
    return statusCodeDescr;
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.resetForm();
      if (this.matExpansionPanel._getExpandedState() === 'collapsed') {
        this.matExpansionPanel.open();
      }
      if (params['memberid']) {
        this.memberIdInput = params['memberid'];
      }

      if (params['claimNumid'] && params['claimNumid'] !== '') {
        this.claimNumIdInput = params['claimNumid'];
        if (this.claimIdElRef && this.claimIdElRef.nativeElement) {
          this.claimIdElRef.nativeElement.focus();
        }
      } else {
        this.claimNumIdInput = '';
      }
      if (params['showNotFound'] && params['showNotFound'] === 'true') {
        this.messageBoxService.addMessageBox('No results found for search', MessageBoxType.ERROR, 'Please update your search query and try again.');
      }
    });

    if (this.claimSearchSvc.claimDetailVisited) {
      this.claimSearchSvc.claimDetailVisited = false;
      this.claimHistoryResults = this.claimSearchSvc.savedClaimHistoryResult;
      this.parametersUsed = this.claimSearchSvc.parametersUsed;
      this.historyRecCount = this.claimSearchSvc.historyRecCount;
      this.populateSearchParam(this.parametersUsed);
      if (this.claimHistoryResults.length > 0) {
        this.isDataDisplay = true;
        this.currentHistoryPage = this.claimSearchSvc.currentHistoryPage;
        this.historyPageTotal = this.claimSearchSvc.historyPageTotal;
        this.historyPageSize = this.claimSearchSvc.historyPageSize;
        this.historyDataLengthInput = this.claimSearchSvc.historyDataLengthInput;
        this.reqData = this.claimSearchSvc.reqData;
        if (this.memberIdInput) {
          this.getAccountLockStatus(this.memberIdInput);
        }
      }

      if (this.historyRecCount > 1 && this.parametersUsed.length > 0) {
        this.showEnteredParameters = true;
        this.parametersUsed = this.claimSearchSvc.parametersUsed.slice(0, 3);
        this.matExpansionPanel.close();
      }
    }
  }

  ngOnInit(): void {
    this.canViewImage = this.loginSvc.hasOpViewClaimImageRole;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['memberid'] && params['memberid'] !== '') {
        this.memberIdInput = params['memberid'];
        if (this.memberIdElRef && this.memberIdElRef.nativeElement) {
          this.memberIdElRef.nativeElement.focus();
        }
      } else {
        this.memberIdInput = '';
      }
    });

    this.isSendEobActive = this.loginSvc.hasOpSendEob;
    this.isSendRaActive = this.loginSvc.hasOpSendRa;
    this.isReplaceEobActive = this.loginSvc.hasOpReplaceEob;
    this.isReplaceRaActive = this.loginSvc.hasOpReplaceRa;

  }

  searchData(formControl): void {

    this.resetAlert();
    this.resetReqData();
    const formvalue = formControl.value;
    this.selectedRow = 0;

    if (formControl.valid) {

      let claimNumber, memberNumber, dosFrom, dosTo, serviceType, claimStatus, npi;
      claimNumber = formvalue.claimNumFormControl;
      memberNumber = formvalue.memberNumFormControl;
      dosFrom = formvalue.dosFromFormControl;
      dosTo = formvalue.dosToFormControl;
      serviceType = formvalue.serviceType;
      claimStatus = formvalue.status;
      npi = formvalue.billNpiFormControl;

      const claimNumLength: string = (claimNumber != null) ? claimNumber : '';
      const memberNumLength: string = (memberNumber != null) ? memberNumber : '';

      const reqPayload = {
        'ppsClaimId': claimNumber,
        'membershipId': memberNumber,
        'dosFrom': dosFrom,
        'dosTo': dosTo,
        'serviceType': serviceType,
        'npi': npi,
        'status': claimStatus,
        'sortBy': '',
        'orderBy': ''
      };
      this.reqData = reqPayload;
      this.statusCodeDescr = ClaimHistoryComponent.getStatusDescr(reqPayload.status);
      this.historyResultIsDesc = false;
      this.historyResultSortColumn = 'clmNum';
      this.memberResultIsDesc = false;
      this.memberResultSortColumn = 'aarpMembershipNumber';

      if (claimNumLength.length >= 11 || memberNumLength.length === 11) {
        this.currentHistoryPage = 0;
        this.getHistory();
      } else if (memberNumLength.length === 9 || memberNumLength.length === 10) {
        this.getMember();
      }
    } else {
      this.messageBoxService.addMessageBox('Formatting error', MessageBoxType.ERROR, 'Please review search value.');
    }
  }

  getHistory(): void {

    const res = this.claimHistorySearchApi.findClaimHistory(uuid(),
      this.reqData.ppsClaimId ? +this.reqData.ppsClaimId : undefined,
      this.reqData.membershipId ? this.reqData.membershipId : undefined,
      this.reqData.dosFrom ? ClaimHistoryComponent.convertDateToISO(this.reqData.dosFrom) : undefined,
      this.reqData.dosTo ? ClaimHistoryComponent.convertDateToISO(this.reqData.dosTo) : undefined,
      this.reqData.npi ? this.reqData.npi : undefined,
      this.reqData.status ? this.reqData.status : undefined,
      this.reqData.serviceType ? this.reqData.serviceType : undefined,
      this.historyResultSortColumn,
      this.historyResultIsDesc ? 'DSC' : 'ASC',
      this.historyPageSize ? +this.historyPageSize : undefined,
      this.currentHistoryPage);

    this.messageBoxService.reset();

    res.subscribe(historyResult => {
      if (historyResult && historyResult.page && historyResult.page.totalElements && historyResult.page.totalElements <= 100) {
        this.processClaimHistoryResult(historyResult);
        if (historyResult.page.totalElements > 1 && this.reqData.membershipId) {
          this.getAccountLockStatus(this.reqData.membershipId);
        }
      } else {
        this.isDataDisplay = false;
        this.messageBoxService.addMessageBox('Too many claims found', MessageBoxType.ERROR, 'Please update your search query and try again.');
      }
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No results found for search', MessageBoxType.ERROR, 'Please update your search query and try again.');
        this.claimHistoryResults = [];
      }
    });

  }

  getMember(): void {

    const res = this.claimHistorySearchApi.findClaimHistoryMember(uuid(),
      this.reqData.membershipId ? this.reqData.membershipId : undefined,
      this.reqData.dosFrom ? ClaimHistoryComponent.convertDateToISO(this.reqData.dosFrom) : undefined,
      this.reqData.dosTo ? ClaimHistoryComponent.convertDateToISO(this.reqData.dosTo) : undefined,
      this.reqData.npi ? this.reqData.npi : undefined,
      this.reqData.status ? this.reqData.status : undefined,
      this.reqData.serviceType ? this.reqData.serviceType : undefined,
      this.memberResultSortColumn,
      this.memberResultIsDesc ? 'DSC' : 'ASC');

    this.messageBoxService.reset();

    res.subscribe(memberResult => {
      this.processMemberResult(memberResult);
    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No results found for search', MessageBoxType.ERROR, 'Please update your search query and try again.');
        this.memberResults = [];
      }
    });

  }

  processClaimHistoryResult(historyResult: PagedResourcesOfResourceOfClaimHistoryVO): void {
    if (historyResult && historyResult._embedded && historyResult._embedded.items && historyResult.page &&
      historyResult.page.number !== undefined && historyResult.page.size && historyResult.page.totalPages) {

      this.claimHistoryResults = [];
      this.allClmNumList = [];
      this.claimSearchSvc.savedClaimHistoryResult = [];

      this.historyRecCount = historyResult._embedded.items.length;
      this.historyDataLengthInput = historyResult.page.totalElements;
      this.currentHistoryPage = historyResult.page.number;
      this.historyPageTotal = historyResult.page.totalPages;

      if (this.historyRecCount === 1 && this.currentHistoryPage === 0) {
        this.getSavedValues();
        let url = '';
        const claimNum = historyResult._embedded.items[0].claimNumber;
        url = '..' + claimProcessingUrlPrefixClaimDetails + claimNum;
        this.router.navigate([url]);
      } else {

        this.isDataDisplay = true;
        this.isMemberDataDisplay = false;
        this.messageBoxService.reset();

        historyResult._embedded.items.forEach(item => {
          const mappedItem: ClaimHistoryResultSet = new ClaimHistoryResultSet();
          mappedItem.status = item.claimHistoryStatusCode ? item.claimHistoryStatusCode : '';
          mappedItem.claimNumber = item.claimNumber ? item.claimNumber : '';
          mappedItem.provider = item.billProviderBusName ? item.billProviderBusName : '';
          mappedItem.dos = '';
          mappedItem.totalBenefit = item.amtPlanPaid ? item.amtPlanPaid : '';
          mappedItem.assigned = '';
          mappedItem.noPay = '';
          mappedItem.assignedImage = [];
          mappedItem.noPayImage = [];
          mappedItem.combined = item.combinedStatusIndicator ? item.combinedStatusIndicator : '';
          mappedItem.statusDescr = '';
          mappedItem.combinedDescr = '';
          mappedItem.eobType = item.eobType ? item.eobType : '';
          mappedItem.hasBillLines = !!Number(item.numOfBillLines);

          if (item.claimDosFromDate && item.claimDosToDate) {
            mappedItem.dos = moment.tz(item.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
              moment.tz(item.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
          }

          if (item.claimHistoryStatusCode) {
            mappedItem.statusDescr = this.toolTip.getToolTipStatusDescr(item.claimHistoryStatusCode);
          }

          if (item.combinedStatusIndicator) {
            mappedItem.combinedDescr = this.toolTip.getToolTipCombinedIndDescr(item.combinedStatusIndicator);
          }

          if (item.noPayIndicator) {
            mappedItem.noPay = this.getIndicators(item.noPayIndicator);
            mappedItem.noPayImage = [mappedItem.noPay === 'Yes' ? 'confirm-green.svg' : 'deny-red.svg', mappedItem.noPay];
          }

          if (item.assignedIndicator) {
            mappedItem.assigned = this.getIndicators(item.assignedIndicator);
            mappedItem.assignedImage = [mappedItem.assigned === 'Yes' ? 'confirm-green.svg' : 'deny-red.svg', mappedItem.assigned];
          }

          this.claimHistoryResults.push(mappedItem);
          this.claimSearchSvc.savedClaimHistoryResult.push(mappedItem);
        });

        this.getSavedValues();

        if (historyResult !== undefined && historyResult._embedded.items[0].claimHistoryMember !== undefined) {

          const claimDetailRow = historyResult._embedded.items[0];
          const mappedItem: MemberCardSet = new MemberCardSet();

          mappedItem.totalClmCount = claimDetailRow.claimHistoryMember !== undefined ? claimDetailRow.claimHistoryMember.totalClmCount : '';
          mappedItem.aarpMembershipNumber = claimDetailRow.claimHistoryMember !== undefined ? claimDetailRow.claimHistoryMember.aarpMembershipNumber : '';

          if (mappedItem.aarpMembershipNumber) {
            this.memberSvc.getMemberByMemberNumber(mappedItem.aarpMembershipNumber).subscribe(mdmResult => {
              if (mdmResult && mdmResult.memberDetails && mdmResult.insuredPlan) {
                if (mdmResult.memberDetails.memberName) {
                  mappedItem.lastName = mdmResult.memberDetails.memberName.lastName ? mdmResult.memberDetails.memberName.lastName : '';
                  mappedItem.firstName = mdmResult.memberDetails.memberName.firstName ? mdmResult.memberDetails.memberName.firstName : '';
                  mappedItem.middleName = mdmResult.memberDetails.memberName.middleName ? mdmResult.memberDetails.memberName.middleName : '';
                  mappedItem.suffix = mdmResult.memberDetails.memberName.suffix ? mdmResult.memberDetails.memberName.suffix : '';
                  this.memberNumDisplay = this.splitMemberNum(mappedItem.aarpMembershipNumber);
                }
                mappedItem.dateOfBirth = mdmResult.memberDetails.dateOfBirth ? mdmResult.memberDetails.dateOfBirth : '';

                const setPlanCode = new Set();
                for (let i = 0; i < mdmResult.insuredPlan.length; i++) {
                  setPlanCode.add(mdmResult.insuredPlan[i].planCode);
                  if (i === 0) {
                    mappedItem.effectivePlans = mdmResult.insuredPlan[i].planCode;
                  } else {
                    if (setPlanCode.has(mdmResult.insuredPlan[i].planCode)) {
                      mappedItem.effectivePlans = mappedItem.effectivePlans + ', ' + mdmResult.insuredPlan[i].planCode;
                    }
                  }
                }

                const currentDate = new Date();
                let effectiveDate: Date;
                let termDate: Date;
                mappedItem.status = 'Inactive';
                for (let i = 0; i < mdmResult.insuredPlan.length; i++) {

                  if (mdmResult.insuredPlan[i].effectiveDate !== undefined && mdmResult.insuredPlan[i].termDate !== undefined) {
                    const tempeEDate = mdmResult.insuredPlan[i].effectiveDate;
                    effectiveDate = new Date(tempeEDate ? tempeEDate : '');
                    const tempeTDate = mdmResult.insuredPlan[i].termDate;
                    termDate = new Date(tempeTDate ? tempeTDate : '');

                    if (effectiveDate <= currentDate && currentDate <= termDate) {
                      mappedItem.status = 'Active';
                      break;
                    }
                  }
                }

              } else if (mdmResult === 404) {
                console.log('404 from searchResult..');
                mappedItem.lastName = '';
                mappedItem.firstName = '';
                mappedItem.middleName = '';
                mappedItem.dateOfBirth = '';
                mappedItem.effectivePlans = '';
                mappedItem.status = '';
              } else {
              }
            }, (e) => {
              console.log('error in service call', e);
              mappedItem.lastName = '';
              mappedItem.firstName = '';
              mappedItem.middleName = '';
              mappedItem.dateOfBirth = '';
              mappedItem.effectivePlans = '';
              mappedItem.status = '';
            });
          }

          this.memberCard = mappedItem;
          this.isMemberCardDisplay = true;

        }
      }
    }
  }

  processMemberResult(memberResult: PagedResourcesOfResourceOfClaimHistoryMemberVO): void {
    if (memberResult && memberResult._embedded && memberResult._embedded.items) {
      this.memberResults = [];
      memberResult._embedded.items.forEach(item => {
        const mappedItem: MemberResultSet = new MemberResultSet();
        mappedItem.aarpMembershipNumber = item.aarpMembershipNumber ? item.aarpMembershipNumber : '';
        mappedItem.displayMemberNum = this.splitMemberNum(mappedItem.aarpMembershipNumber);

        if (item && item.aarpMembershipNumber) {
          this.memberSvc.getMemberByMemberNumber(item.aarpMembershipNumber).subscribe(mdmResult => {
            if (mdmResult && mdmResult.memberDetails) {
              if (mdmResult.memberDetails.memberName) {
                mappedItem.lastName = mdmResult.memberDetails.memberName.lastName ? mdmResult.memberDetails.memberName.lastName : '';
                mappedItem.firstName = mdmResult.memberDetails.memberName.firstName ? mdmResult.memberDetails.memberName.firstName : '';
                mappedItem.middleName = mdmResult.memberDetails.memberName.middleName ? mdmResult.memberDetails.memberName.middleName : '';
              }
              mappedItem.dateOfBirth = mdmResult.memberDetails.dateOfBirth ? mdmResult.memberDetails.dateOfBirth : '';
            } else if (mdmResult === 404) {
              console.log('404 from searchResult..');
              mappedItem.lastName = '';
              mappedItem.firstName = '';
              mappedItem.middleName = '';
              mappedItem.dateOfBirth = '';
            } else {
            }
          }, (e) => {
            console.log('error in service call', e);
            mappedItem.lastName = '';
            mappedItem.firstName = '';
            mappedItem.middleName = '';
            mappedItem.dateOfBirth = '';
            console.log(e);
          });
        }
        this.memberResults.push(mappedItem);
      });
      if (this.memberResults.length === 1) {
        const memberNumber = this.memberResults[0].aarpMembershipNumber;
        this.selectedMemberId = memberNumber;
        this.fetchClaim();
      } else {
        this.isMemberDataDisplay = true;
        this.isMemberCardDisplay = false;
        this.messageBoxService.reset();
        this.getSavedValues();
      }
    }

  }

  selectedMember($event): void {
    this.selectedMemberId = $event;
    this.fetchClaim();
  }

  fetchClaim(): void {
    this.reqData.membershipId = this.selectedMemberId;
    this.memberIdInput = this.selectedMemberId;
    this.currentHistoryPage = 0;
    this.historyResultIsDesc = false;
    this.historyResultSortColumn = 'clmNum';
    this.getHistory();
  }

  getFormClaimSearch(): void {
    this.claimSearchFormGroup = this.fb.group({
      claimNumFormControl: ['', [Validators.minLength(11), Validators.pattern(this.number_regex)]],
      memberNumFormControl: ['', [Validators.minLength(9), Validators.maxLength(12), Validators.pattern(this.number_regex)]],
      dosFromFormControl: ['', [Validators.pattern(this.date_regex)]],
      dosToFormControl: ['', [Validators.pattern(this.date_regex)]],
      billNpiFormControl: ['', [Validators.pattern(this.number_regex)]],
      'serviceType': [''],
      'status': ['']
    });
  }

  resetForm(): void {
    this.resetAlert();
    this.resetReqData();
    this.clearForm();
  }

  resetAlert(): void {
    this.isDataDisplay = false;
    this.isMemberDataDisplay = false;
    this.isMemberCardDisplay = false;
    this.sendReplaceModalVisible = false;
    this.responseMsg = '';
    this.messageBoxService.reset();
  }

  resetReqData(): void {
    this.reqData = {
      'ppsClaimId': '',
      'membershipId': '',
      'dosFrom': '',
      'dosTo': '',
      'serviceType': '',
      'npi': '',
      'status': '',
      'sortBy': '',
      'orderBy': ''
    };
  }

  clearForm(): void {
    this.memberIdInput = '';
    this.claimNumIdInput = '';
    this.typeOfServiceInput = '';
    this.statusInput = '';
    this.dosFromInput = '';
    this.dosToInput = '';
    this.billInput = '';
  }

  checkIfFormFilled(): boolean {
    const values = this.claimSearchFormGroup.value;
    return !!(ClaimHistoryComponent.removeWhitespace(values.claimNumFormControl) ||
      ClaimHistoryComponent.removeWhitespace(values.memberNumFormControl));
  }

  memberLookup(): string {
    const url = '../../member-information/member-search';
    return url;
  }

  onNotifyErr(message: string): void {
    this.messageBoxService.addMessageBox('No Member Profile found', MessageBoxType.ERROR, 'Please try any other member #');
  }

  getFormValues(): void {
    this.claimSearchSvc.parametersUsed = [];
    if (!!this.claimSearchFormGroup) {
      if (this.claimNumIdInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'Claim Number',
          paramValue: this.claimNumIdInput
        });
      }
      if (this.memberIdInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'Member #',
          paramValue: this.memberIdInput
        });
      }
      if (this.typeOfServiceInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'Type of Service',
          paramValue: this.typeOfServiceInput
        });
      }
      if (this.statusInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'Claim Status',
          paramValue: this.statusInput
        });
      }
      if (this.dosFromInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'DOS From',
          paramValue: this.dosFromInput
        });
      }
      if (this.dosToInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'DOS To',
          paramValue: this.dosToInput
        });
      }
      if (this.billInput) {
        this.claimSearchSvc.parametersUsed.push({
          paramName: 'Billing Provider NPI',
          paramValue: this.billInput
        });
      }
    }
  }

  getSavedValues(): void {
    this.claimSearchSvc.currentHistoryPage = this.currentHistoryPage;
    this.claimSearchSvc.historyPageTotal = this.historyPageTotal;
    this.claimSearchSvc.historyDataLengthInput = this.historyDataLengthInput;
    this.claimSearchSvc.historyPageSize = this.historyPageSize;
    this.claimSearchSvc.reqData = this.reqData;
    this.claimSearchSvc.historyRecCount = this.historyRecCount;
    this.getFormValues();
    this.parametersUsed = this.claimSearchSvc.parametersUsed.slice(0, 3);

    if (this.matExpansionPanel._getExpandedState() !== 'collapsed') {
      this.matExpansionPanel.close();
    }
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation(); // Preventing event bubbling

    if (event.target) {
      if (!this.isExpansionIndicator(event.target)) {
        matExpansionPanel.toggle();
      }
    }
  }

  getSelectedRow(selectedRow: number): void {
    this.selectedRow = selectedRow;
  }

  hideMaintainaceSection(): void {
    this.selectedRow = 0;
    this.selectedClmHistList = [];
    this.claimHistoryResultsComponent.clearSelection();
  }

  getClaimNum(event: string[]): void {
    this.selectedClmHistList = event;
  }

  getAllClaimNum(event: string[]): void {
    this.allClmNumList = event;
  }

  getSendReplaceEob(data): void {

    this.sendReplaceModalVisible = false;
    this.enableSendReplace = false;
    this.responseMsg = '';
    this.messageBoxService.reset();

    const reqArray: number[] = [];

    if (this.isAllSelected) {
      this.allClmNumList.forEach(item => {
        reqArray.push(+item);
      });
    } else {
      this.selectedClmHistList.forEach(item => {
        reqArray.push(+item);
      });
    }

    const res = this.claimHistorySearchApi.determineMultiSendReplaceEobRaEligibility(reqArray, uuid(), data);

    res.subscribe(eligibilityCheckResult => {
      if (eligibilityCheckResult) {
        this.processEobResult(eligibilityCheckResult);
      }
    }, (e) => {
      this.sendReplaceModalVisible = false;
    });

  }

  processEobResult(eligibilityCheckResult: PagedResourcesOfResourcesListOfResourceOfClaimHistorySendReplaceEobRaEligibleVO): void {

    if (eligibilityCheckResult && eligibilityCheckResult._embedded && eligibilityCheckResult._embedded.items) {

      this.sendReplaceEobResultSet = [];

      eligibilityCheckResult._embedded.items.forEach(item => {

        if (item.sendReplaceIndicator) {
          this.eobModalType = item.sendReplaceIndicator;
          this.eobModalTitle = this.titlecasePipe.transform(this.eobModalType) + ' EOB';

          if (this.eobModalType === 'SEND') {
            this.isEobActive = this.isSendEobActive;
            this.isRaActive = this.isSendRaActive;
          }

          if (this.eobModalType === 'REPLACE') {
            this.isEobActive = this.isReplaceEobActive;
            this.isRaActive = this.isReplaceRaActive;
          }
        }
        const mappedItem: SendReplaceEobResultModel = new SendReplaceEobResultModel();

        mappedItem.claimNumber = item.claimNumber ? item.claimNumber : 0;
        mappedItem.claimType = item.claimTypeIndicator ? item.claimTypeIndicator : '';
        mappedItem.status = item.claimHistoryStatus ? item.claimHistoryStatus : '';
        mappedItem.icdCode = item.primaryIcdCode ? item.primaryIcdCode : '';
        mappedItem.eobIndicator = item.sendReplaceEobEligible ? item.sendReplaceEobEligible : '';
        mappedItem.raIndicator = item.sendReplaceRaEligible ? item.sendReplaceRaEligible : '';
        mappedItem.typeIndicator = item.sendReplaceIndicator ? item.sendReplaceIndicator : '';

        if (item.claimDosFromDate && item.claimDosToDate) {
          mappedItem.dos = moment.tz(item.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
            moment.tz(item.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
        }
        this.sendReplaceEobResultSet.push(mappedItem);
      });

      for (let i = 0; i < this.sendReplaceEobResultSet.length; i++) {
        if (this.sendReplaceEobResultSet[i].eobIndicator === 'Y' || this.sendReplaceEobResultSet[i].raIndicator === 'Y') {
          this.enableSendReplace = true;
          break;
        }
      }

      this.sendReplaceModalVisible = true;
    }
  }

  cancelSendReplace(): void {
    this.sendReplaceModalVisible = false;
  }

  confirmSendReplace(): void {
    this.sendReplaceModalVisible = false;
  }

  sendReplaceSuccessMsg(display: boolean): void {
    if (display) {
      const title = this.eobModalTitle + '/RA';
      this.messageBoxService.addMessageBox(title, MessageBoxType.SUCCESS, this.responseMsg);
    }
  }

  sendReplaceFailMsg(display: boolean): void {
    if (display) {
      const title = this.eobModalTitle + '/RA';
      this.messageBoxService.reset();
      this.messageBoxService.addMessageBox(title, MessageBoxType.ERROR, this.responseMsg);
    }
  }

  pdfUrlText(claimTrackingId: string): string {
    return 'api/membervalidation/claim/' + claimTrackingId + '/image?token=' + this.loginSvc.loginState.access_token;
  }

  getRedirectUrl(data): void {
    let url = '';
    if (data) {
      url = memberInformationUrlPrefixMemberProfile + data;
    }
    this.router.navigate([url]);
  }

  splitMemberNum(memberNum): string {
    const memNum = memberNum.substring(0, 9);
    const asscociationCode = memberNum.substring(9, 10);
    const houseId = memberNum.substring(10, 11);
    return memNum + ' ' + asscociationCode + ' ' + houseId;
  }

  getIndicators(data): string {
    let indicator = '';
    indicator = (data === 'Y') ? 'Yes' : ((data === 'N') ? 'No' : '');
    return indicator;
  }

  getAccountLockStatus(membershipNumber: string): void {
    if (this.toggleLockAccountServiceFeature) {
      this.claimsMaterialApi.getLockAccountStatus(membershipNumber, uuid()).subscribe(res => {
        if (res.lockStatus === 'LOCKED') {
          this.isSelectDisabled = true;
        } else {
          this.isSelectDisabled = false;
        }
      });
    }
  }

  private populateSearchParam(parametersUsed: ClaimHistorySearchParameterModel[]): void {
    parametersUsed.forEach(param => {
      if (param.paramName === 'Claim Number') {
        this.claimNumIdInput = param.paramValue;
      }
      if (param.paramName === 'Member #') {
        this.memberIdInput = param.paramValue;
      }
      if (param.paramName === 'Type of Service') {
        this.typeOfServiceInput = param.paramValue;
      }
      if (param.paramName === 'Claim Status') {
        this.statusInput = param.paramValue;
      }
      if (param.paramName === 'DOS From') {
        this.dosFromInput = param.paramValue;
      }
      if (param.paramName === 'DOS To') {
        this.dosToInput = param.paramValue;
      }
      if (param.paramName === 'Billing Provider NPI') {
        this.billInput = param.paramValue;
      }
    });
  }

  private isExpansionIndicator(eTarget: EventTarget): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    const target = eTarget as HTMLInputElement;
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }

  get toggleReplaceSendEobEditFeature(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F2598');
  }
}

import {DatePipe} from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatTabGroup} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import * as momentConst from 'moment';
import {
  AccountMembershipResponseVO,
  ClaimMaterialSummaryVO,
  MaterialsApi,
  MemberApi,
  PagedResourcesOfResourceOfMaterialEOBVO,
  PageMetadataVO,
  ResourceOfPrescriptionSummaryVO
} from '@fox/rest-clients';
import * as uuidConst from 'uuid';
import {CommonService, FeatureFlagService, StatusAndAction} from '@fox/shared';
import {MemberInformationService} from '../shared/member-information.service';
import {ClaimsSummaryFormComponent} from './claims-summary-form/claims-summary-form.component';
import {SearchClaimSummaryFormModel} from './claims-summary-form/search-claim-summary-form.model';
import {EobStatementsFormComponent} from './eob-statements-form/eob-statements-form.component';
import {SearchEobStatementFormModel} from './eob-statements-form/search-eob-statements-form.model';

const moment = momentConst;
const uuid = uuidConst;

@Component({
  selector: 'fox-eob-information',
  templateUrl: './eob-information.component.html',
  styleUrls: ['./eob-information.component.css']
})
export class EobInformationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('eobInfoTabs') eobInfoTabs?: MatTabGroup;
  defaultTabIndex = 0;
  @ViewChild(EobStatementsFormComponent) eObStatementsForm?: EobStatementsFormComponent;
  @ViewChild(ClaimsSummaryFormComponent) claimsSummaryForm?: ClaimsSummaryFormComponent;

  eobStatementFormValues: SearchEobStatementFormModel = new SearchEobStatementFormModel();
  eobStatementResults?: PagedResourcesOfResourceOfMaterialEOBVO[] = [];
  eobStatementNotFoundMsg: boolean = false;

  claimSummaryFormValues: SearchClaimSummaryFormModel = new SearchClaimSummaryFormModel();
  claimSummaryResults?: ClaimMaterialSummaryVO[] = [];
  claimSummaryNotFoundMsg: boolean = false;

  drugSummaryFormValues: SearchClaimSummaryFormModel = new SearchClaimSummaryFormModel();
  drugSummaryResults?: ResourceOfPrescriptionSummaryVO[] = [];
  drugFromToDate?: ResourceOfPrescriptionSummaryVO[] = [];
  drugSummaryNotFoundMsg: boolean = false;
  drugSummaryPageSize = 5;
  drugSummaryResultsDataLengthInput?: number;
  drugSummaryPageTotal = 0;
  currentDrugSummaryPage = 0;

  memberCardResults?: AccountMembershipResponseVO[] = [];
  memberCardClaimResults?: AccountMembershipResponseVO[] = [];
  memberCardDrugResults?: AccountMembershipResponseVO[] = [];

  memberIdInput: string = '';
  dosFromInput: string = '';
  dosToInput: string = '';

  isDrugMemberCard: boolean = false;

  drugSummaryIsDesc: boolean = false;
  drugSummarySortColumn: string = 'dateOfService';

  @Output() statusChange = new EventEmitter<StatusAndAction>();
  totalDrugSummaryResults?: ResourceOfPrescriptionSummaryVO[] = [];

  get resultsExist(): boolean {
    return this.claimSummaryResultsExist || this.eobStatementResultsExist || this.drugSummaryResultsExist;
  }

  get claimSummaryResultsExist(): boolean {
    return (!!this.activeTab && this.activeTab === 'summary' && !!this.claimSummaryResults && this.claimSummaryResults.length > 0);
  }

  get drugSummaryResultsExist(): boolean {
    return (!!this.activeTab && this.activeTab === 'summary' && !!this.drugSummaryResults && this.drugSummaryResults.length > 0);
  }

  get eobStatementResultsExist(): boolean {
    return (!!this.activeTab && this.activeTab === 'eob' && !!this.eobStatementResults && this.eobStatementResults.length > 0);
  }

  get activeTab(): 'eob' | 'summary' {
    return this.defaultTabIndex === 0 ? 'eob' : 'summary';
  }

  get toogleFeature(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F1335');
  }

  constructor(
    private eobListApi: MaterialsApi,
    private commonSvc: CommonService,
    private fb: FormBuilder,
    private memberSvc: MemberApi,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private memberInformationService: MemberInformationService,
    private featureFlagSvc: FeatureFlagService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let dsoFrom, dosTo;
      if (params['dosFrom'] && params['dosTo'] !== '' && params['memberNum'] !== '') {
        this.memberIdInput = params['memberNum'];
        this.dosFromInput = (dsoFrom = this.datePipe.transform(params['dosFrom'], 'MM/dd/yyyy')) ? dsoFrom : '';
        this.dosToInput = (dosTo = this.datePipe.transform(params['dosTo'], 'MM/dd/yyyy')) ? dosTo : '';
      }
    });
    if (this.memberInformationService.preserveData) {
      this.defaultTabIndex = this.memberInformationService.tabIndex || 0;
    }
  }

  ngAfterViewInit(): void {
    if (this.memberInformationService.preserveData) {
      if (this.memberInformationService.eobStatementData && this.eObStatementsForm) {
        this.eObStatementsForm.eobStatementSearchFormGroup.patchValue({
          memberNo: this.memberInformationService.eobStatementData.memberNo,
          statementDateFrom: this.datePipe.transform(this.memberInformationService.eobStatementData.statementDateFrom, 'MM/dd/yyyy'),
          statementDateTo: this.datePipe.transform(this.memberInformationService.eobStatementData.statementDateTo, 'MM/dd/yyyy'),
        });

        this.onEobStatementSubmit(this.memberInformationService.eobStatementData);
      }

      if (this.memberInformationService.drugSummaryData && this.claimsSummaryForm) {
        this.claimsSummaryForm.claimSummarySearchFormGroup.patchValue({
          memberNo: this.memberInformationService.drugSummaryData.memberNo || '',
          dateOfServiceFrom: this.datePipe.transform(this.memberInformationService.drugSummaryData.dateOfServiceFrom || '', 'MM/dd/yyyy') || '',
          dateOfServiceTo: this.datePipe.transform(this.memberInformationService.drugSummaryData.dateOfServiceTo || '', 'MM/dd/yyyy') || ''
        });
        if (this.memberInformationService.drugs) {
          this.onDrugSummarySubmit(this.memberInformationService.drugSummaryData);
        }

        if (this.memberInformationService.claimsService) {
          this.onClaimSummarySubmit(this.memberInformationService.drugSummaryData);
        }

      }
    }
    this.memberInformationService.preserveData = false;
  }

  ngOnDestroy(): void {

    if (this.eObStatementsForm && this.eObStatementsForm.eobStatementSearchFormGroup.valid) {
      this.memberInformationService.eobStatementData = {
        memberNo: this.eObStatementsForm.eobStatementSearchFormGroup.controls['memberNo'].value.replace(/ /g, '') || '',
        statementDateFrom: this.datePipe.transform(this.eObStatementsForm.eobStatementSearchFormGroup.controls['statementDateFrom'].value || '', 'yyyy-MM-dd') || '',
        statementDateTo: this.datePipe.transform(this.eObStatementsForm.eobStatementSearchFormGroup.controls['statementDateTo'].value || '', 'yyyy-MM-dd') || '',
      };
    }

    if (this.claimsSummaryForm && this.claimsSummaryForm.claimSummarySearchFormGroup.valid) {
      this.memberInformationService.drugSummaryData = {
        memberNo: this.claimsSummaryForm.claimSummarySearchFormGroup.controls['memberNo'].value.replace(/ /g, '') || '',
        dateOfServiceFrom: this.datePipe.transform(this.claimsSummaryForm.claimSummarySearchFormGroup.controls['dateOfServiceFrom'].value || '', 'yyyy-MM-dd') || '',
        dateOfServiceTo: this.datePipe.transform(this.claimsSummaryForm.claimSummarySearchFormGroup.controls['dateOfServiceTo'].value || '', 'yyyy-MM-dd') || ''
      };
    }

    this.memberInformationService.tabIndex = this.defaultTabIndex;
  }

  onEobStatementSubmit(values: SearchEobStatementFormModel): void {
    this.eobStatementFormValues = values;
    this.eobStatementResults = [];
    this.eobStatementNotFoundMsg = false;
    this.memberCardResults = [];
    this.eobStatementResultTable();
  }

  onDrugSummarySubmit(values: SearchClaimSummaryFormModel): void {
    this.memberInformationService.drugs = true;
    this.memberInformationService.claimsService = false;
    this.drugSummaryFormValues = values;
    this.drugSummaryResults = [];
    this.drugSummaryNotFoundMsg = false;
    this.memberCardDrugResults = [];

    this.drugSummaryIsDesc = true;
    this.drugSummarySortColumn = 'dateOfService';
    this.currentDrugSummaryPage = 0;
    this.drugSummaryPageSize = 5;
    this.drugSummaryResultTable();
  }

  onClaimSummarySubmit(values: SearchClaimSummaryFormModel): void {
    this.memberInformationService.claimsService = true;
    this.memberInformationService.drugs = false;
    this.claimSummaryFormValues = values;

    this.claimSummaryResults = [];
    this.claimSummaryNotFoundMsg = false;

    this.memberCardClaimResults = [];
    this.claimSummaryResultTable();
  }

  eobStatementResultTable(): void {
    const eobStatementSearchForm: SearchEobStatementFormModel = this.eobStatementFormValues;
    this.memberCard(eobStatementSearchForm.memberNo);

    this.eobListApi.getEOBList(eobStatementSearchForm.memberNo, eobStatementSearchForm.statementDateFrom, eobStatementSearchForm.statementDateTo, uuid()).subscribe(searchResult => {
      if (searchResult && searchResult._embedded && searchResult._embedded.items) {
        const eobStatementResults: PagedResourcesOfResourceOfMaterialEOBVO[] = [];
        const eobStatementData = searchResult._embedded.items;
        if (eobStatementData.length > 0) {
          for (let i = 0; i < eobStatementData.length; i++) {
            const eobStatementItem = this.getEobStatementItem(eobStatementData, i);
            eobStatementResults.push(eobStatementItem);
          }
          this.eobStatementNotFoundMsg = false;
        }
        this.eobStatementResults = eobStatementResults;
      } else if (searchResult === 404) {
        this.eobStatementNotFoundMsg = true;
      } else {
        this.statusChange.emit({
          status: 'voidDenialRequest',
          action: 'noRequest'
        });
      }
    }, (e) => {
      if (e.status === 404) {
        this.eobStatementNotFoundMsg = true;
      }
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  getEobStatementItem(eobStatementData: any, i: number): any {
    return {
      'statementDate': moment(eobStatementData[i].statementDate).format('MM/DD/YYYY'),
      'statementType': eobStatementData[i].statementType,
      'claimNumber': eobStatementData[i].claimNumbers,
      'memberNumber': eobStatementData[i].memberNumber,
      'materialID': eobStatementData[i].materialID
    };
  }

  claimSummaryResultTable(): void {
    this.isDrugMemberCard = false;
    const claimSummarySearchForm: SearchClaimSummaryFormModel = this.claimSummaryFormValues;
    this.memberCard(claimSummarySearchForm.memberNo);
    this.eobListApi.claimSummary(claimSummarySearchForm.memberNo, claimSummarySearchForm.dateOfServiceFrom, claimSummarySearchForm.dateOfServiceTo, uuid()).subscribe(claimSearchResult => {
      const claimSummaryResults: ClaimMaterialSummaryVO[] = [];
      const claimSummaryData = claimSearchResult;
      if (claimSummaryData) {
        const claimSummaryItem = {
          'dateOfServiceFrom': moment(claimSummaryData.serviceFromDate).format('MM/DD/YYYY'),
          'dateOfServiceTo': moment(claimSummaryData.serviceToDate).format('MM/DD/YYYY'),
          'noOfClaimsPaid': claimSummaryData.claimsPaid,
          'noOfClaimsPending': claimSummaryData.claimsPending,
          'totalBenfAmount': claimSummaryData.totalBenAmt
        };
        claimSummaryResults.push(claimSummaryItem);
        this.claimSummaryResults = claimSummaryResults;
        this.claimSummaryNotFoundMsg = false;
      }
    }, (e) => {
      if (e.status === 404) {
        this.claimSummaryNotFoundMsg = true;
      }
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
  }

  drugSummaryResultTable(): void {
    this.isDrugMemberCard = true;
    const drugSummarySearchForm: SearchClaimSummaryFormModel = this.drugSummaryFormValues;
    this.eobListApi.prescriptionSummary(drugSummarySearchForm.memberNo, drugSummarySearchForm.dateOfServiceFrom, drugSummarySearchForm.dateOfServiceTo, uuid(), this.drugSummaryPageSize, this.currentDrugSummaryPage,
      this.drugSummaryIsDesc ? 'DSC' : 'ASC', this.drugSummarySortColumn).subscribe(drugSearchResult => {
      if (drugSearchResult && drugSearchResult._embedded! && drugSearchResult._embedded!.items) {
        const drugSummaryResults: ResourceOfPrescriptionSummaryVO[] = [];
        const drugSummaryData = drugSearchResult._embedded!.items;
        if (drugSummaryData && drugSummaryData.length > 0) {
          for (let i = 0; i < drugSummaryData.length; i++) {
            const drugSummaryItem = {
              'serviceFromDate': moment(drugSummaryData[0].serviceFromDate).format('MM/DD/YYYY'),
              'serviceToDate': moment(drugSummaryData[0].serviceToDate).format('MM/DD/YYYY'),
              'dateOfService': moment(drugSummaryData[i].dateOfService).format('MM/DD/YYYY'),
              'prescriptionName': drugSummaryData[i].prescriptionName,
              'paidAmount': drugSummaryData[i].amountApproved,
              'totalBenfAmount': drugSummaryData[i].totalBenAmt,
              'deductibleAmount': drugSummaryData[i].deductibleAmount
            };
            drugSummaryResults.push(drugSummaryItem);
            this.drugSummaryResults = drugSummaryResults;
          }
          if (drugSearchResult.page) {
            const drugSummaryPageData: PageMetadataVO = drugSearchResult.page;
            this.drugSummaryResultsDataLengthInput = drugSummaryPageData.totalElements;
            this.eobListApi.prescriptionSummary(drugSummarySearchForm.memberNo, drugSummarySearchForm.dateOfServiceFrom, drugSummarySearchForm.dateOfServiceTo, uuid(), this.drugSummaryResultsDataLengthInput, this.currentDrugSummaryPage,
              this.drugSummaryIsDesc ? 'DSC' : 'ASC', this.drugSummarySortColumn).subscribe(getDrugTotalResult => {
              if (getDrugTotalResult && getDrugTotalResult._embedded && getDrugTotalResult._embedded.items && getDrugTotalResult._embedded.items.length > 0) {
                this.totalDrugSummaryResults = getDrugTotalResult!._embedded!.items;
              }
            });
            this.currentDrugSummaryPage = drugSummaryPageData.number || 0;
            this.drugSummaryPageTotal = drugSummaryPageData.totalPages || 1;
          }
          this.drugSummaryNotFoundMsg = false;
        }
      }
    }, (e) => {
      if (e.status === 404) {
        this.drugSummaryNotFoundMsg = true;
      }
      this.statusChange.emit({
        status: 'denialRequest',
        action: 'noRequest'
      });
    });
    this.memberCard(drugSummarySearchForm.memberNo);
  }

  memberCard(memberNo: string): void {

    this.memberSvc.getMemberByMemberNumber(memberNo).subscribe(res => {
      const memberCardResults: AccountMembershipResponseVO[] = [];
      const memberCardData = res;
      if (memberCardData && memberCardData.memberDetails && memberCardData.memberDetails.memberName && memberCardData.memberDetails.aarpMembershipNumber && memberCardData.memberDetails.householdId) {
        const memberCardItem = {
          'fullName': memberCardData.memberDetails.memberName.firstName + ` ` + memberCardData.memberDetails.memberName.lastName,
          'claimNumber': memberCardData.memberDetails.aarpMembershipNumber.membershipNumber + ` ` + memberCardData.memberDetails.aarpMembershipNumber.associationId + ` ` + memberCardData.memberDetails.householdId[0].insuredCode,
          'claimNumberForUrl': memberCardData.memberDetails.aarpMembershipNumber.membershipNumber + `` + memberCardData.memberDetails.aarpMembershipNumber.associationId + `` + memberCardData.memberDetails.householdId[0].insuredCode
        };
        memberCardResults.push(memberCardItem);
      }
      if (this.defaultTabIndex === 0) {
        this.memberCardResults = memberCardResults;
      } else if (this.defaultTabIndex !== 0) {
        if (this.isDrugMemberCard) {
          this.memberCardDrugResults = memberCardResults;
        } else {
          this.memberCardClaimResults = memberCardResults;
        }
      }
    });
  }

  changePosition(tabIndex: number): void {
    this.defaultTabIndex = tabIndex;
  }

  onSelectedTab(e: any): void {
    this.defaultTabIndex = e.index;
    // remove msg from screen
    this.eobStatementNotFoundMsg = false;
    this.claimSummaryNotFoundMsg = false;
    this.drugSummaryNotFoundMsg = false;

    // reset both search forms
    if (this.eObStatementsForm) {
      this.eObStatementsForm.eobStatementSearchFormGroup.reset();
    }
    if (this.claimsSummaryForm) {
      this.claimsSummaryForm.claimSummarySearchFormGroup.reset();
    }

    // reset result content
    this.eobStatementResults = [];
    this.drugSummaryResults = [];
    this.claimSummaryResults = [];
  }
}

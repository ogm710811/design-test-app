import {
  MessageBoxService,
  MessageBoxType,
  ProgressContextService
} from '@fox/shared';
import {HttpResponse} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  DepositApi,
  PagedResourcesOfResourceOfDepositVO,
  PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO,
  PageMetadataVO,
  ResourcesListOfResourceOfTreasuryReconciliationSummaryVO,
  TreasuryReconciliationApi,
  TreasuryReconciliationSummaryVO
} from '@fox/rest-clients';
import * as momentConst from 'moment-timezone';
import * as uuidConst from 'uuid';
const moment = momentConst;
const uuid = uuidConst;
import {FindDepositFormModel} from './find-deposit-form/find-deposit-form.model';
import {FindDepositResultSet} from './find-deposit-result.model';
import {FindDepositTrcService} from './find-deposit-trc.service';
import {FindTrcFormModel} from './find-trc-form/find-trc-form.model';

@Component({
  selector: 'fox-find-deposit-trc',
  templateUrl: 'find-deposit-trc.component.html',
  styleUrls: ['find-deposit-trc.component.css']
})
export class FindDepositTrcComponent implements OnInit, OnDestroy {

  // general page state
  get lastPressed(): number {
    return this.depositService.lastPressed;
  }

  set lastPressed(lp: number) {
    this.depositService.lastPressed = lp;
  }

  get activeTab(): 'trc' | 'deposit' {
    return this.lastPressed === 0 ? 'deposit' : 'trc';
  }

  trcFormValues: FindTrcFormModel = new FindTrcFormModel();
  trcResults?: TreasuryReconciliationSummaryVO[] = [];

  trcPageSize = 5;
  trcDataLengthInput: number = 0;
  trcPageTotal = 0;
  currentTrcPage = 0;

  depositFormValues: FindDepositFormModel = new FindDepositFormModel();
  depositResults: FindDepositResultSet[] = [];
  depositPageSize = 5;
  depositDataLengthInput?: number;
  depositPageTotal = 0;
  currentDepositPage = 0;

  depositIsDesc: boolean = false;
  depositSortColumn: string = 'checkClaimNumber';

  trcIsDesc: boolean = false;
  trcSortColumn: string = 'id';

  get resultsExist(): boolean {
    return this.depositResultsExist || this.trcResultsExist;
  }

  get depositResultsExist(): boolean {
    return (!!this.activeTab && this.activeTab === 'deposit' && !!this.depositResults && this.depositResults.length > 0);
  }

  get trcResultsExist(): boolean {
    return (!!this.activeTab && this.activeTab === 'trc' && !!this.trcResults && this.trcResults.length > 0);
  }

  constructor(
      private depositApi: DepositApi,
      private depositService: FindDepositTrcService,
      private trcApi: TreasuryReconciliationApi,
      private progressCtx: ProgressContextService,
      private messageBoxService: MessageBoxService) {
  }

  static removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  static formatDateToCST(originalFormat: string): string {
    return moment.tz(originalFormat, 'America/Chicago').format('MM/DD/YYYY');
  }

  static convertDateToISO(originalDate: string): string {
    const dateToISO = new Date(originalDate).toISOString();
    return dateToISO.substring(0, 10);
  }

  ngOnInit(): void {
    if (this.depositService.depositSearchResultCache && this.depositService.showDepositCache) {
      this.processDepositSearchResult(this.depositService.depositSearchResultCache);
      this.depositPageSize = this.depositService.depositPageSize;
      this.depositService.showDepositCache = false;
      this.depositFormValues = this.depositService.depositFormValuesCache;
    } else if (this.depositService.trcSearchResultCache && this.depositService.showTrcCache) {
      this.processTrcSearchResult(this.depositService.trcSearchResultCache);
      this.trcPageSize = this.depositService.trcPageSize;
      this.depositService.showTrcCache = false;
    } else {
      this.depositService.resetDepositVariables();
    }
  }

  ngOnDestroy(): void {
  }

  onDepositSubmit(formValues: FindDepositFormModel): void {
    this.depositFormValues = formValues;
    this.currentDepositPage = 0;
    this.depositPageSize = 5;
    this.depositIsDesc = false;
    this.depositSortColumn = 'checkClaimNumber';
    this.findDeposit();
  }

  onTrcSubmit(formValues: FindTrcFormModel): void {
    this.depositService.trcFormValues = formValues;
    this.currentTrcPage = 0;
    this.trcPageSize = 5;
    this.trcResults = [];
    this.messageBoxService.reset();
    this.trcIsDesc = false;
    this.trcSortColumn = 'id';
    this.findTrc();
  }

  findDeposit(): void {
    const formValues = this.depositFormValues;
    const res = this.depositApi.findDeposit(uuid(),
      (!!formValues.depositNumberVal && formValues.depositNumberVal !== '' && formValues.depositNumberVal.length > 0) ? +formValues.depositNumberVal : undefined,
      formValues.depositCheckAmountVal ? formValues.depositCheckAmountVal : undefined,
      formValues.depositDateVal ?  FindDepositTrcComponent.convertDateToISO(formValues.depositDateVal) : undefined,
      (!!formValues.depositCheckNumberVal && formValues.depositCheckNumberVal !== '') ? +formValues.depositCheckNumberVal : undefined,
      FindDepositTrcComponent.removeWhitespace(formValues.depositSourceVal) || undefined, 'Ver', this.depositPageSize,
      this.currentDepositPage, this.depositIsDesc ? 'DSC' : 'ASC', this.depositSortColumn);

    this.progressCtx.forTag('deposit-result').watch(res).subscribe(searchResult => {
      this.depositService.depositFormValuesCache = formValues;
      this.depositService.depositSearchResultCache = searchResult;
      this.depositService.depositPageSize = this.depositPageSize;

      this.processDepositSearchResult(searchResult);

    }, (e) => {
      if (e.status === 404) {
        this.messageBoxService.addMessageBox('No deposits found', MessageBoxType.ERROR, 'Please update your search query and try again.');
        this.depositResults = [];
      }
    });
  }

  processDepositSearchResult(searchResult: PagedResourcesOfResourceOfDepositVO): void {
    if (searchResult && searchResult._embedded && searchResult._embedded.items && searchResult.page &&
      searchResult.page.number !== undefined && searchResult.page.size && searchResult.page.totalPages) {

      this.depositResults = [];
      searchResult._embedded.items.forEach(item => {
        const mappedItem: FindDepositResultSet = new FindDepositResultSet();
        mappedItem.depositCheckClaimNumber = item.depositCheckClaimId ? item.depositCheckClaimId.toString() : 'Not Available';
        mappedItem.checkNumber = item.checkId ? item.checkId.toString() : 'Not Available';
        mappedItem.depositDate = item.depositDate ? FindDepositTrcComponent.formatDateToCST(item.depositDate) : 'Not Available';
        mappedItem.depositStatus = item.depositStatus ? item.depositStatus : 'Not Available';
        mappedItem.depositAmount = item.depositAmount ? +item.depositAmount : 0;
        mappedItem.depositSource = item.depositSource ? item.depositSource : 'Not Available';
        mappedItem.trc = item.trcs ? this.formatTRC(item.trcs) ? this.formatTRC(item.trcs) : '-' : '-';
        mappedItem.depositDetailId = item.depositDetailId ? item.depositDetailId : 0;
        mappedItem.dcn = item.docControlId ? item.docControlId : 0;

        this.depositResults.push(mappedItem);
      });

      this.depositDataLengthInput = searchResult.page.totalElements;
      this.currentDepositPage = searchResult.page.number;
      this.depositPageTotal = searchResult.page.totalPages;
    }
  }

  formatTRC(TRC: TreasuryReconciliationSummaryVO[]): string {
    let combinedString = '';

    TRC.forEach((trc, index) => {
      combinedString += trc;
      if (index < TRC.length - 1) {
        combinedString += ', ';
      }
    });
    return combinedString;
  }

  findTrc(): void {
    const trcSearchForm: FindTrcFormModel = this.depositService.trcFormValues;
    const trcNumSanitizedString: string = trcSearchForm['num'] || '';
    const candidateTrcNum: number = parseInt(trcNumSanitizedString, 10);
    const trcNum: number | undefined = isNaN(candidateTrcNum) ? undefined : candidateTrcNum;
    const findTrcResult = this.trcApi.findTRC(uuid(), trcNum, trcSearchForm.dateCreated || undefined,
      trcSearchForm.status || undefined, trcSearchForm.createdBy || undefined,
      trcSearchForm.category || undefined, this.trcPageSize, this.currentTrcPage,
      this.trcIsDesc ? 'DSC' : 'ASC', this.trcSortColumn, 'response', false);

    this.progressCtx.forTag('trc-result').watch(findTrcResult).subscribe((httpResp: HttpResponse<PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO>) => {
      this.depositService.trcFormValuesCache = trcSearchForm;
      this.depositService.trcPageSize = this.trcPageSize;
      if (httpResp.body) {
        this.depositService.trcSearchResultCache = httpResp.body;
      }

      this.processTrcSearchResult(this.depositService.trcSearchResultCache);
    }, (e) => {
      if (e.status === 404) {
        this.depositService.trcSearchResultCache = {};
        this.clearTrcData();
        this.trcResults = [];
        this.messageBoxService.addMessageBox('No TRCs found', MessageBoxType.ERROR, 'Please update your search query and try again.');
      }
      this.clearTrcData();
    });
  }

  processTrcSearchResult(searchResult: PagedResourcesOfResourceOfTreasuryReconciliationSummaryVO): void {
    const trcResourceArray: ResourcesListOfResourceOfTreasuryReconciliationSummaryVO
      | undefined = searchResult._embedded;
    if (trcResourceArray && trcResourceArray.items) {
      this.trcResults = trcResourceArray.items;
      if (searchResult.page) {
        const trcPageData: PageMetadataVO = searchResult.page;
        this.trcDataLengthInput = trcPageData.totalElements || trcResourceArray.items.length;
        this.currentTrcPage = trcPageData.number || 0;
        this.trcPageTotal = trcPageData.totalPages || 1;
      }
    } else {
      this.clearTrcData();
    }
  }

  clearTrcData(): void {
    this.trcResults = [];
    this.trcDataLengthInput = 0;
    this.currentTrcPage = 0;
    this.trcPageTotal = 0;
  }

  changePosition(origin?: number | null, position?: number | null): void {
    this.lastPressed = (position === null || position === undefined) ? 0 : position;
  }

}

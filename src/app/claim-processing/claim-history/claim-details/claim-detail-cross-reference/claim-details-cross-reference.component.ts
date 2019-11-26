import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment-timezone';
import {
  ClaimHistoryApi,
  CrossReferenceApi,
  CrossReferenceVO,
  PagedResourcesOfResourceOfClaimHistoryVO,
  ResourceOfCrossReferenceVO
} from '@fox/rest-clients';
import * as uuid from 'uuid';
import {FeatureFlagService} from '@fox/shared';
import {ClaimHistoryResultSet} from '../../claim-history-models/claim-history-result.model';

@Component({
  selector: 'fox-claim-cross-reference',
  templateUrl: './claim-details-cross-reference.component.html',
  styleUrls: ['../claim-details.component.css']
})

export class ClaimDetailsCrossReferenceComponent {

  @Input() crossReferenceResultSet: ResourceOfCrossReferenceVO[] = [];
  @Input() isCrossRefDataDisplay: boolean = false;
  @Input() crossRefLength: number;
  @Input() claimNumber: string;
  @Input() isAddNewDisabled: boolean;
  @Input() isCrossReferenceActive: boolean;
  @Input() isLocked: boolean = false;

  @Output() postDeleteSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() postAddSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  isDeleteModal: boolean = false;
  isAddbyClmNum: boolean = false;
  isAddbySearchModal: boolean = false;
  isSearchResultModal: boolean = false;
  crossRefDeleteFailedMsg: boolean = false;
  crossRefAddFailedMsg: boolean = false;

  showNoClaimsAlert: boolean = false;
  showTooManyClaimsAlert: boolean = false;
  isDataDisplay: boolean = false;
  validationAlert: boolean = false;
  claimHistoryResults: ClaimHistoryResultSet[] = [];

  memberIdInput: string = '';
  typeOfServiceInput: string = '';
  statusInput: string = '';
  dosFromInput: string = '';
  dosToInput: string = '';
  billInput: string = '';
  crossReferenceNumber: number;
  crossReferenceId: number;

  crossRefSample: CrossReferenceVO;
  claimAddFormGroup: FormGroup;
  claimSearchFormGroup: FormGroup;
  clmInput1: string = '';
  clmInput2: string = '';
  clmInput3: string = '';
  claimAddArray: string[] = [];
  successArray: string[] = [];
  failArray: string[] = [];
  date_regex = /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/;
  number_regex = /^[0-9]+$/;
  isLastElement: boolean = false;

  historyResultIsDesc: boolean = false;
  historyResultSortColumn: string = 'clmNum';
  isGenerateClaimPlcHolder: boolean = false;

  constructor(private crossReferenceApi: CrossReferenceApi, private fb: FormBuilder,
              private claimHistorySearchApi: ClaimHistoryApi,
              private featureFlagService: FeatureFlagService) {
    this.getFormClaimAdd();
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

  cancelDeleteCrossReference(): void {
    this.isDeleteModal = false;
  }

  confirmDeleteCrossReference(): void {
    this.crossRefDeleteFailedMsg = false;

    if (this.crossReferenceId) {
      const crsRefId: number = +this.crossReferenceId;
      if (!isNaN(crsRefId)) {
        const res = this.crossReferenceApi.deleteCrossReference(crsRefId, uuid(), 'response');
        res.subscribe(response => {
          if (response.status !== 204) {
            this.isDeleteModal = false;
            this.crossRefDeleteFailedMsg = true;
            this.postDeleteSuccess.emit(false);
          } else {
            this.crossRefDeleteFailedMsg = false;
            this.postDeleteSuccess.emit(true);
            this.isDeleteModal = false;
          }
        }, (e) => {
          this.crossRefDeleteFailedMsg = true;
          this.isDeleteModal = false;
        });
      }
    }
  }

  isDeleteModalOpen(successFlag: boolean): void {
    this.isDeleteModal = successFlag;
  }

  addByClmNum(): void {
    this.resetForm();

    if (this.crossRefLength !== 0) {
      this.claimAddFormGroup!.get('claimNumFormControl3')!.disable();
    }

    switch (this.crossRefLength) {
      case 0:
        this.claimAddFormGroup!.get('claimNumFormControl2')!.enable();
        this.claimAddFormGroup!.get('claimNumFormControl3')!.enable();
        break;
      case 1:
        this.claimAddFormGroup!.get('claimNumFormControl2')!.enable();
        break;
      case 2:
        this.claimAddFormGroup!.get('claimNumFormControl2')!.disable();
        break;
    }

    this.isAddbyClmNum = true;
  }

  addBySearch(): void {
    this.resetAlert();
    this.isSearchResultModal = false;
    this.isAddbySearchModal = true;
  }

  getFormClaimAdd(): void {
    this.claimAddFormGroup = this.fb.group({
      claimNumFormControl1: ['', [Validators.minLength(11), Validators.maxLength(12), Validators.pattern(this.number_regex)]],
      claimNumFormControl2: ['', [Validators.minLength(11), Validators.maxLength(12), Validators.pattern(this.number_regex)]],
      claimNumFormControl3: ['', [Validators.minLength(11), Validators.maxLength(12), Validators.pattern(this.number_regex)]],
      disabled: true
    });
  }

  getFormClaimSearch(): void {
    this.claimSearchFormGroup = this.fb.group({
      memberNumFormControl: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.number_regex)]],
      dosFromFormControl: ['', [Validators.pattern(this.date_regex)]],
      dosToFormControl: ['', [Validators.pattern(this.date_regex)]],
      billNpiFormControl: ['', [Validators.pattern(this.number_regex)]],
      'serviceType': [''],
      'status': ['']
    });
  }

  cancelAddCrossReference(): void {
    this.isAddbyClmNum = false;
    this.resetForm();
  }

  cancelAddSearch(): void {
    this.isAddbySearchModal = false;
    this.resetForm();
    this.resetAlert();
  }

  cancelAddModel(): void {
    this.isSearchResultModal = false;
    this.cancelAddSearch();
  }

  addClaim(): void {

    this.claimAddArray = [];
    this.resetArrays();

    if (this.clmInput1) {
      this.claimAddArray.push(this.clmInput1);
    }
    if (this.clmInput2) {
      this.claimAddArray.push(this.clmInput2);
    }
    if (this.clmInput3) {
      this.claimAddArray.push(this.clmInput3);
    }

    if (this.claimAddArray) {
      this.addCrossRef();
    }
  }

  addClmNumSearch(): void {
    this.resetArrays();
    if (this.claimAddArray) {
      this.addCrossRef();
    }
  }

  addCrossRef(): void {

    this.crossRefSample = {
      'crossReferenceId': 0,
      'claimHistoryAccountNumber': 0,
      'claimHistorykey': 0,
      'crossReferenceNumber': '',
      'sequenceNumber': 0,
      'lastMaintenanceTime': undefined
    };

    this.claimAddArray.forEach(clmNum => {
      const addClmNum = clmNum;
      this.crossRefSample.crossReferenceNumber = addClmNum;
      if ((this.claimAddArray[this.claimAddArray.length - 1] === addClmNum)) {
        this.isLastElement = true;
      }
      const res = this.claimHistorySearchApi.createClaimHistoryCrossReference(+this.claimNumber, this.crossRefSample, uuid(), 'response');
      res.subscribe(response => {
        if (response.status !== 201) {
          this.failArray.push(addClmNum);
        } else {
          this.successArray.push(addClmNum);
          if (this.isLastElement) {
            if (this.failArray.length !== 0) {
              this.showAddFailMsg();
            } else {
              this.refreshCrossRefTable();
            }
          }
        }
      }, () => {
        this.failArray.push(addClmNum);
        if (this.isLastElement) {
          this.showAddFailMsg();
        }
      });
    });
  }

  showAddFailMsg(): void {
    this.crossRefAddFailedMsg = true;
    this.refreshCrossRefTable();
  }

  refreshCrossRefTable(): void {
    this.postAddSuccess.emit(true);
    this.isAddbyClmNum = false;
    this.isAddbySearchModal = false;
    this.isSearchResultModal = false;
  }

  searchClaim(): void {
    this.resetAlert();
    this.historyResultIsDesc = false;
    this.historyResultSortColumn = 'clmNum';
    this.getHistory();
  }

  checkIfFormFilled(formControl): boolean {
    return !!((ClaimDetailsCrossReferenceComponent.removeWhitespace(this.clmInput1) ||
      ClaimDetailsCrossReferenceComponent.removeWhitespace(this.clmInput2) ||
      ClaimDetailsCrossReferenceComponent.removeWhitespace(this.clmInput3)) && formControl.valid);
  }

  checkIfSearchFormFilled(formControl): boolean {
    const values = this.claimSearchFormGroup.value;
    return !!(ClaimDetailsCrossReferenceComponent.removeWhitespace(values.memberNumFormControl) && formControl.valid);
  }

  checkIfResultFormFilled(): boolean {
    return !!(((3 - this.crossRefLength) >= this.claimAddArray.length) && (this.claimAddArray.length !== 0));
  }

  resetArrays(): void {
    this.failArray = [];
    this.successArray = [];
    this.isLastElement = false;
  }

  resetForm(): void {
    this.claimAddFormGroup.reset();
    this.clmInput1 = '';
    this.clmInput2 = '';
    this.clmInput3 = '';
    this.memberIdInput = '';
    this.typeOfServiceInput = '';
    this.statusInput = '';
    this.dosFromInput = '';
    this.dosToInput = '';
    this.billInput = '';
    this.crossRefAddFailedMsg = false;
    this.crossRefDeleteFailedMsg = false;
  }

  resetAlert(): void {
    this.showNoClaimsAlert = false;
    this.showTooManyClaimsAlert = false;
    this.validationAlert = false;
    this.isDataDisplay = false;
    this.crossRefAddFailedMsg = false;
    this.crossRefDeleteFailedMsg = false;
  }

  onSelectionChange(clmNum: string): void {
    if (this.claimAddArray.indexOf(clmNum) > -1) {
      this.claimAddArray.splice(this.claimAddArray.indexOf(clmNum), 1);
    } else {
      this.claimAddArray.push(clmNum);
    }
  }

  getHistory(): void {

    const res = this.claimHistorySearchApi.findClaimHistory(uuid(), undefined,
      this.memberIdInput,
      this.dosFromInput ? ClaimDetailsCrossReferenceComponent.convertDateToISO(this.dosFromInput) : undefined,
      this.dosToInput ? ClaimDetailsCrossReferenceComponent.convertDateToISO(this.dosToInput) : undefined,
      this.billInput ? this.billInput : undefined,
      this.statusInput ? this.statusInput : undefined,
      this.typeOfServiceInput,
      this.historyResultSortColumn,
      this.historyResultIsDesc ? 'DSC' : 'ASC', 25, 0);

    this.showNoClaimsAlert = false;

    res.subscribe(historyResult => {
      if (historyResult && historyResult.page && historyResult.page.totalElements && historyResult.page.totalElements <= 100) {
        this.processClaimHistoryResult(historyResult);
      } else {
        this.isDataDisplay = false;
        this.showTooManyClaimsAlert = true;
      }
    }, (e) => {
      if (e.status === 404) {
        this.showNoClaimsAlert = true;
        this.claimHistoryResults = [];
      }
    });

  }

  processClaimHistoryResult(historyResult: PagedResourcesOfResourceOfClaimHistoryVO): void {
    if (historyResult && historyResult._embedded && historyResult._embedded.items) {

      this.claimHistoryResults = [];

      historyResult._embedded.items.forEach(item => {
        const mappedItem: ClaimHistoryResultSet = new ClaimHistoryResultSet();
        mappedItem.status = item.claimHistoryStatusCode ? item.claimHistoryStatusCode : '';
        mappedItem.claimNumber = item.claimNumber ? item.claimNumber : '';
        mappedItem.provider = item.billProviderBusName ? item.billProviderBusName : '';
        mappedItem.dos = '';
        mappedItem.totalBenefit = item.amtPlanPaid ? item.amtPlanPaid : '';
        mappedItem.assigned = item.assignedIndicator ? item.assignedIndicator : '';

        if (item.claimDosFromDate && item.claimDosToDate) {
          mappedItem.dos = moment.tz(item.claimDosFromDate, 'America/Chicago').format('MM/DD/YYYY') + ' - ' +
            moment.tz(item.claimDosToDate, 'America/Chicago').format('MM/DD/YYYY');
        }
        this.claimHistoryResults.push(mappedItem);
      });
      this.claimAddArray = [];
      this.isSearchResultModal = true;
      this.isDataDisplay = true;
    }
  }

  checkIfAddNewDisabled(): boolean {
    return ((!this.toggleCrossReferenceEditFeature || this.isAddNewDisabled || !this.isCrossReferenceActive) || this.crossRefLength === 3);
  }

  get toggleCrossReferenceEditFeature(): boolean {
    return !this.featureFlagService.isFeatureDisabled('F3514');
  }
}

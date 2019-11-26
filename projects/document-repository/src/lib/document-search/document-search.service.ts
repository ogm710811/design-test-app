import {Injectable} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Event as RouterEvent, NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as momentNS from 'moment-timezone';
import {DocumentVO, ReferencesApi} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import {
  documentRepositoryRoutePathDocumentSearch,
  FeatureFlagService,
  FoxValidators
} from '@fox/shared';
import * as uuidNS from 'uuid';
import {LoginReduxState} from '@fox/state-management';
import {DocumentSearchDropdownModel} from './model/document-search-dropdown.model';
import {DocumentSearchParameterModel} from './model/document-search-parameter.model';

const moment = momentNS;

const uuid = uuidNS;
import mmddyyyyValidator = FoxValidators.mmddyyyyOptionalSlashDateValidator;
import mmyyDateValidator = FoxValidators.mmyyDateValidator;

@Injectable({
  providedIn: 'root'
})
export class DocumentSearchService {

  documentDetailVisited = false;
  parametersUsed: DocumentSearchParameterModel[] = [];

  genderDropdownValues: DocumentSearchDropdownModel[] = [];
  fekPullReasonDropdownValues: DocumentSearchDropdownModel[] = [];
  memberStateDropdownValues: DocumentSearchDropdownModel[] = [];
  planTypeDropdownValues: DocumentSearchDropdownModel[] = [];
  queueInfoDropdownValues: DocumentSearchDropdownModel[] = [];
  feedbackInfoDropdownValues: DocumentSearchDropdownModel[] = [];
  docTypeDropdownValues: DocumentSearchDropdownModel[] = [];
  formTypeDropdownValues: DocumentSearchDropdownModel[] = [];
  rnfStatusDropdownValues: DocumentSearchDropdownModel[] = [];

  numberOfElements: any = {};
  docPageTotal: any = {};
  currentDocPage: any = {};
  isDesc = false;
  column = 'docCtlNbr';
  lastDocDeleted = false;
  isF4914Enabled: boolean = false;

  documentSearchFormValues: any = {};

  loginState: Observable<boolean> = new Observable();

  constructor(
    private referenceApi: ReferencesApi,
    private store: Store<LoginReduxState>,
    private fb: FormBuilder,
    private router: Router,
    private featureFlagService: FeatureFlagService
  ) {
    this.loginState = store.select('loggedIn');
    this.loginState.subscribe(loggedIn => {
      if (!loggedIn) {
        this.resetCache();
      }
    });

    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {

        // Clear the cache after navigating to the page other than document search
        if (this.documentDetailVisited && ev.url.indexOf(documentRepositoryRoutePathDocumentSearch) === -1) {
          this.resetCache();
        }
      }
    });

    this.getDropdownValues();

    this.isF4914Enabled = !this.featureFlagService.isFeatureDisabled('F4914');
  }

  resetCache(): void {
    this.documentDetailVisited = false;
    this.parametersUsed = [];
  }

  createDocMetaFormGroup(): FormGroup {
    return this.fb.group({
      documentId: null,
      fileControlId: null,
      docControlNumber: [{value: null, disabled: true}],
      member: this.fb.group({
        accountNumber: [null, this.isF4914Enabled ? undefined : [Validators.pattern(/\d{9,11}/), Validators.minLength(9), Validators.maxLength(11)]],
        matchedIndicator: null,
        masterRecordNumber: null,
        firstName: null,
        lastName: null,
        middleName: null,
        state: null,
        zipCode: [null, [Validators.pattern(/\d{5}/), Validators.minLength(5), Validators.maxLength(9)]],
        dateOfBirth: [null, this.isF4914Enabled ? undefined : mmddyyyyValidator],
        gender: null,
        medicareBeneficiaryId: ['', Validators.pattern(/^[a-zA-Z0-9]*$/)],
        planType: null,
        planCode: [null, Validators.pattern(/^[a-zA-Z0-9\,?\s?]*$/)],
        planEffectiveDate: [null, this.isF4914Enabled ? undefined : mmddyyyyValidator]
      }),
      claim: this.fb.group({
        claimNumber: [null, this.isF4914Enabled ? undefined : [Validators.pattern(/\d{11}/), Validators.minLength(11), Validators.maxLength(12)]],
        claimJulianDate: [null, [Validators.pattern(/\d{5}/), Validators.minLength(5), Validators.maxLength(5)]],
        dosFrom: [null, mmyyDateValidator],
        dosTo: [null, mmyyDateValidator],
        providerName: null,
        providerTin: [null, [Validators.minLength(9), Validators.maxLength(9)]],
        ubTypeOfBill: [null, [Validators.pattern(/^[0-9]*$/), Validators.maxLength(3)]]
      }),
      check: this.fb.group({
        checkClaimNumber: [{
          value: null,
          disabled: true
        }, this.isF4914Enabled ? undefined : Validators.pattern(/^[0-9]*$/)],
        depositDate: [{value: null, disabled: true}, this.isF4914Enabled ? undefined : mmddyyyyValidator],
        checkDate: [null, this.isF4914Enabled ? undefined : mmddyyyyValidator],
        checkAmount: [null, this.isF4914Enabled ? undefined : Validators.pattern(/^(\d+(\.\d{1,2})?)$/)],
        checkNumber: [null, Validators.pattern(/^[0-9]*$/)],
        filmLocatorNumber: [{value: null, disabled: true}, Validators.pattern(/^[0-9]*$/)],
        checkControlNumber: [{value: null, disabled: true}, Validators.pattern(/^[0-9]*$/)],
        overpaymentCollectionType: [{value: null, disabled: true}],
        refundParty: [{value: null, disabled: true}]
      }),
      queueInformation: null,
      bpmProcessInstanceId: [null],
      feedbackInfo: null,
      documentType: null,
      formType: null,
      asiMailIndicator: [null],
      employerBusinessIndicator: [null],
      healthAlliesIndicator: [null],
      fekPullReason: null,
      rnfStatus: null,
      routingErrorIndicator: [null],
      customerDCN: [{value: null, disabled: true}]
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    for (let i = 0; i < Object.values(formGroup.controls).length; i++) {
      const control = Object.values(formGroup.controls)[i];
      if (control) {
        control.markAsTouched();

        if (control instanceof FormGroup && control.controls) {
          this.markFormGroupTouched(control);
        }
      }
    }
  }

  getValueIfExist(source: AbstractControl | null): any {
    if (source && source.value && source.value.toString().length > 0) {
      return source.value;
    } else {
      return undefined;
    }
  }

  formatDateToHuman(originalFormat: string): string | undefined {
    if (!originalFormat) {
      return undefined;
    }
    const zoneFixed = originalFormat.replace(/Z$/, '');
    const newFormat = moment.tz(zoneFixed, 'America/Chicago').format('MM/DD/YYYY');
    return newFormat && newFormat.toUpperCase() !== 'INVALID DATE' ? newFormat : undefined;
  }

  mapFormToVo(docMetaFormGroup: FormGroup): DocumentVO {
    const aDoc: DocumentVO = {};

    aDoc.documentId = this.getValueIfExist(docMetaFormGroup.get('documentId'));
    aDoc.fileControlId = this.getValueIfExist(docMetaFormGroup.get('fileControlId'));
    aDoc.docControlNumber = this.getValueIfExist(docMetaFormGroup.get('docControlNumber'));
    aDoc.queueInformation = this.getValueIfExist(docMetaFormGroup.get('queueInformation'));
    aDoc.bpmProcessInstanceId = this.getValueIfExist(docMetaFormGroup.get('bpmProcessInstanceId'));
    aDoc.feedbackInfo = this.getValueIfExist(docMetaFormGroup.get('feedbackInfo'));
    aDoc.documentType = this.getValueIfExist(docMetaFormGroup.get('documentType'));
    aDoc.formType = this.getValueIfExist(docMetaFormGroup.get('formType'));
    aDoc.asiMailIndicator = this.getValueIfExist(docMetaFormGroup.get('asiMailIndicator'));
    aDoc.employerBusinessIndicator = this.getValueIfExist(docMetaFormGroup.get('employerBusinessIndicator'));
    aDoc.healthAlliesIndicator = this.getValueIfExist(docMetaFormGroup.get('healthAlliesIndicator'));
    aDoc.fekPullReason = this.getValueIfExist(docMetaFormGroup.get('fekPullReason'));
    aDoc.rnfStatus = this.getValueIfExist(docMetaFormGroup.get('rnfStatus'));
    aDoc.routingErrorIndicator = this.getValueIfExist(docMetaFormGroup.get('routingErrorIndicator'));

    const claim = docMetaFormGroup.get('claim');
    if (!!claim) {
      aDoc.claim = {};
      aDoc.claim.claimNumber = this.getValueIfExist(claim.get('claimNumber'));
      aDoc.claim.claimJulianDate = this.getValueIfExist(claim.get('claimJulianDate'));
      aDoc.claim.dosFrom = this.getValueIfExist(claim.get('dosFrom'));
      aDoc.claim.dosTo = this.getValueIfExist(claim.get('dosTo'));
      aDoc.claim.providerName = this.getValueIfExist(claim.get('providerName'));
      aDoc.claim.providerTin = this.getValueIfExist(claim.get('providerTin'));
      aDoc.claim.ubTypeOfBill = this.getValueIfExist(claim.get('ubTypeOfBill'));
    }

    const check = docMetaFormGroup.get('check');
    if (!!check) {
      aDoc.check = {};
      aDoc.check.checkNumber = this.getValueIfExist(check.get('checkNumber'));
      aDoc.check.checkAmount = this.getValueIfExist(check.get('checkAmount')) || 0;
      aDoc.check.checkDate = this.getValueIfExist(check.get('checkDate'));
    }

    const member = docMetaFormGroup.get('member');
    if (!!member) {
      aDoc.member = {};

      aDoc.member.accountNumber = this.getValueIfExist(member.get('accountNumber')) || '000000000';
      aDoc.member.matchedIndicator = this.getValueIfExist(member.get('matchedIndicator'));
      aDoc.member.masterRecordNumber = this.getValueIfExist(member.get('masterRecordNumber'));
      aDoc.member.firstName = this.getValueIfExist(member.get('firstName'));
      aDoc.member.lastName = this.getValueIfExist(member.get('lastName'));
      aDoc.member.middleName = this.getValueIfExist(member.get('middleName'));
      aDoc.member.state = this.getValueIfExist(member.get('state'));
      aDoc.member.zipCode = this.getValueIfExist(member.get('zipCode'));
      aDoc.member.dateOfBirth = this.getValueIfExist(member.get('dateOfBirth'));
      aDoc.member.gender = this.getValueIfExist(member.get('gender'));
      aDoc.member.medicareBeneficiaryId = this.getValueIfExist(member.get('medicareBeneficiaryId'));
      aDoc.member.planType = this.getValueIfExist(member.get('planType'));
      aDoc.member.planCode = this.getValueIfExist(member.get('planCode'));
      aDoc.member.planEffectiveDate = this.getValueIfExist(member.get('planEffectiveDate'));
    }
    return aDoc;
  }

  getDropdownValues(): void {
    this.referenceApi.listCategoryCodes('DOCUMENT_PAGE_REFERENCES', uuid()).subscribe(resp => {
      let groupName: string = '';
      let dropdownItem: DocumentSearchDropdownModel;

      for (let i = 0; i < resp.length; i++) {
        const record = resp[i];
        if (record && record.id === 0) {
          groupName = record.description || '';
        } else {
          dropdownItem = {
            dropdownItemValue: record.code || '',
            dropdownItemDesc: record.description || '',
            dropdownItemGroup: groupName || ''
          };

          if (groupName === 'GENDER') {
            this.genderDropdownValues.push(dropdownItem);
          } else if (groupName === 'FEK_PULL_REASON') {
            this.fekPullReasonDropdownValues.push(dropdownItem);
          } else if (groupName === 'MEMBER_STATE') {
            this.memberStateDropdownValues.push(dropdownItem);
          } else if (groupName === 'PLAN_TYPE') {
            this.planTypeDropdownValues.push(dropdownItem);
          } else if (groupName === 'QUEUE_INFO') {
            this.queueInfoDropdownValues.push(dropdownItem);
          } else if (groupName === 'FEEDBACK_INFO') {
            this.feedbackInfoDropdownValues.push(dropdownItem);
          } else if (groupName === 'DOC_TYPE') {
            this.docTypeDropdownValues.push(dropdownItem);
          } else if (groupName === 'FORM_TYPE') {
            this.formTypeDropdownValues.push(dropdownItem);
          } else if (groupName === 'RNF_STATUS') {
            this.rnfStatusDropdownValues.push(dropdownItem);
          }
        }
      }
    });
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {
  DocMetaApi,
  DocumentVO,
  MemberApi,
  PagedResourcesOfResourceOfSearchMemberVO,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuidNS from 'uuid';
import {LinkMemberSearchResultModel} from './link-member-form-result.model';

const uuid = uuidNS;

@Component({
  selector: 'fox-link-member-modal',
  templateUrl: './link-member-modal.component.html',
  styleUrls: ['./link-member-modal.component.css']
})
export class LinkMemberSearchComponent implements OnInit, OnChanges {

  @Input() memberNumber: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() memberState: string = '';
  @Input() dateOfBirth: string = '';
  @Input() dcn: string = '';
  @Input() showLinkMemberModal: boolean = false;
  @Output() showLinkMemberModalChange = new EventEmitter<Boolean>(false);
  @Output() memberMatchChange = new EventEmitter<LinkMemberSearchResultModel>();

  linkMemberFormGroup?: FormGroup;

  searchMemberTooManyResultsMsg: boolean = false;
  searchMemberNoResults: boolean = false;

  memberMatches: LinkMemberSearchResultModel[] = [];

  memberStates: Array<ReferenceValueVO> = [];
  docMetaFormGroup?: FormGroup;
  searchResultsIndex: number = 0;
  memberSearchButtonEnable: boolean = false;
  executeLinkFunctionEnable: boolean = false;

  dateValidators: Array<ValidatorFn> = [Validators.pattern(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/), Validators.minLength(10), Validators.maxLength(10)];

  constructor(private activatedRoute: ActivatedRoute, private memberApi: MemberApi, private docMetaApi: DocMetaApi, private fb: FormBuilder, private referencesSvc: ReferencesApi) {
    this.createLinkMemberFormGroup();
  }

  removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.showLinkMemberModalChange.emit(false);
    this.getMemberStates();
  }

  ngOnChanges(): void {
    if (this.showLinkMemberModal && this.linkMemberFormGroup) {
      this.linkMemberFormGroup.controls['memberNumber'].setValue(this.memberNumber);
      this.linkMemberFormGroup.controls['firstName'].setValue(this.firstName);
      this.linkMemberFormGroup.controls['lastName'].setValue(this.lastName);
      this.linkMemberFormGroup.controls['memberState'].setValue(this.memberState);
      this.linkMemberFormGroup.controls['dateOfBirth'].setValue(this.dateOfBirth);
      this.memberMatches = [];
      this.searchResultsIndex = 9999999;
      this.executeLinkFunctionEnable = this.memberSearchButtonEnable = true;
    }
  }

  getDocMeta(dcn: string): void {
    this.docMetaApi.getDocumentMetadata(dcn, uuid()).subscribe(docMeta => {
      if (docMeta && this.docMetaFormGroup) {
        this.docMetaFormGroup.patchValue(<DocumentVO>docMeta);
      }
    });
  }

  createLinkMemberFormGroup(): void {
    this.linkMemberFormGroup = this.fb.group({
      memberNumber: '',
      memberState: '',
      firstName: '',
      lastName: '',
      dateOfBirth: ['', this.dateValidators]
    });
  }

  checkIfFormFilled(): boolean {
    let values: any;
    if (this.linkMemberFormGroup) {
      values = this.linkMemberFormGroup.value;
    }
    if (values) {
      return !!(this.removeWhitespace(values.firstName) || this.removeWhitespace(values.lastName) ||
        this.removeWhitespace(values.memberNumber) || this.removeWhitespace(values.dateOfBirth) ||
        (values.memberState !== undefined && this.removeWhitespace(values.memberState)));
    } else {
      return false;
    }
  }

  onLinkMemberLinkPressed(): void {
    this.memberMatchChange.emit(this.memberMatches[this.searchResultsIndex]);
  }

  onLinkMemberCancelPressed(): void {
    this.showLinkMemberModal = false;
    this.showLinkMemberModalChange.emit(false);
  }

  createDocMetaFormGroup(): void {
    this.docMetaFormGroup = this.fb.group({
      documentId: 0,
      fileControlId: 0,
      docControlNumber: '',
      member: this.fb.group({
        accountNumber: 0,
        matchedIndicator: '',
        masterRecordNumber: '',
        firstName: '',
        lastName: '',
        middleName: '',
        state: '',
        zipCode: '',
        dateOfBirth: '',
        gender: '',
        medicareBeneficiaryId: '',
        planType: '',
        planCode: '',
        planEffectiveDate: ''
      }),
      claim: this.fb.group({
        claimNumber: 0,
        claimJulianDate: 0,
        dosFrom: '',
        dosTo: '',
        providerName: '',
        providerTin: '',
        ubTypeOfBill: ''
      }),
      check: this.fb.group({
        checkClaimNumber: {value: 0, disabled: true},
        depositDate: {value: '', disabled: true},
        checkDate: '',
        checkAmount: '',
        checkNumber: '',
        filmLocatorNumber: {value: 0, disabled: true},
        checkControlNumber: {value: 0, disabled: true},
        overpaymentCollectionType: {value: '', disabled: true},
        refundParty: {value: '', disabled: true}
      }),
      queueInformation: '',
      bpmProcessInstanceId: '',
      feedbackInfo: '',
      documentType: '',
      formType: '',
      asiMailIndicator: '',
      employerBusinessIndicator: '',
      healthAlliesIndicator: '',
      fekPullReason: '',
      rnfStatus: '',
      routingErrorIndicator: '',
      customerDCN: {value: '', disabled: true}
    });
  }

  getMemberStates(): void {
    const obs = this.referencesSvc.listCategoryCodes('MEMBER_STATE', uuid());
    if (obs) {
      obs.subscribe(obj => {
        this.memberStates = obj;
      });
    }
  }

  linkMemberFromSearch(): void {
    this.getDocMeta(this.dcn);
  }

  onSelectionChange(index: number): void {
    this.searchResultsIndex = index;
    this.executeLinkFunctionEnable = false;
  }

  linkMemberSearchSubmit(formControl: any): void {
    this.memberMatches = [];
    this.executeLinkFunctionEnable = true;
    this.searchMemberTooManyResultsMsg = false;
    this.searchMemberNoResults = false;
    const formValue = formControl.value;
    const firstName = formValue.firstName ? formValue.firstName : '';
    const lastName = formValue.lastName ? formValue.lastName : '';
    const dob = formValue.dateOfBirth ? formValue.dateOfBirth.split('/')[2] + '-' + formValue.dateOfBirth.split('/')[0] + '-' + formValue.dateOfBirth.split('/')[1] : '';
    const membershipNumber = formValue.memberNumber ? formValue.memberNumber : '';
    const state = formValue.memberState ? formValue.memberState : '';
    const minScore = '1';
    const obs: Observable<PagedResourcesOfResourceOfSearchMemberVO> =
      this.memberApi.searchMember(minScore, membershipNumber, firstName, lastName, state, dob, undefined, undefined, uuid());
    obs.subscribe((results: PagedResourcesOfResourceOfSearchMemberVO) => {

      const mdmMatchMax = 25;

      if (results && results._embedded && results._embedded.items && results._embedded.items.length) {
        if (results._embedded.items.length > mdmMatchMax) {
          this.memberMatches = [];
          this.searchMemberTooManyResultsMsg = true;
        } else {
          results._embedded.items.forEach(item => {
            const memberMatch = new LinkMemberSearchResultModel();
            const memberNumber = item.identifiers && item.identifiers.aarpMembershipNumber ? item.identifiers.aarpMembershipNumber : '';
            const associationId = item.identifiers && item.identifiers.aarpAssociationId ? item.identifiers.aarpAssociationId : '';
            const insuredCd = item.identifiers && item.identifiers.aarpInsuredCd ? item.identifiers.aarpInsuredCd : '';
            memberMatch.memberNo = memberNumber + associationId + insuredCd;
            memberMatch.lastName = item.name && item.name.lastName ? item.name.lastName : '';
            memberMatch.firstName = item.name && item.name.firstName ? item.name.firstName : '';
            memberMatch.dob = item.name && item.name.dateOfBirth ? item.name.dateOfBirth.split('-')[1] + '/' + item.name.dateOfBirth.split('-')[2] + '/' + item.name.dateOfBirth.split('-')[0] : '';
            memberMatch.state = '';
            memberMatch.zipCode = '';
            if (item.permanentAddress && item.permanentAddress.stateProvinceCode && item.permanentAddress.stateProvinceCode) {
              memberMatch.state = item!.permanentAddress!.stateProvinceCode;
              memberMatch.zipCode = item!.permanentAddress!.postalCode;
            }
            memberMatch.gender = item.name && item.name.gender ? item.name.gender : '';
            memberMatch.middleName = item.name && item.name.middleName ? item.name.middleName : '';
            memberMatch.mbi = item.identifiers && item.identifiers.medicareId ? item.identifiers.medicareId : '';
            memberMatch.planEffectiveDate = item.name && item.name.partBDateEffective ? item.name.partBDateEffective.split('-')[1] + '/' + item.name.partBDateEffective.split('-')[2] + '/' + item.name.partBDateEffective.split('-')[0] : '';
            if (item.identifiers && item.identifiers.aarpMembershipNumber && item.identifiers.aarpAssociationId && item.identifiers.aarpInsuredCd) {
              memberMatch.planCode = '';
              this.memberApi.getMemberByMemberNumber(item.identifiers.aarpMembershipNumber + item.identifiers.aarpAssociationId + item.identifiers.aarpInsuredCd, uuid()).subscribe(resp => {
                if (resp.insuredPlan && resp.insuredPlan.length > 0) {
                  resp.insuredPlan.forEach((plan, index) => {
                    if (index === 0) {
                      memberMatch.planCode += plan.planCode ? plan.planCode : '';
                    } else {
                      memberMatch.planCode += plan.planCode ? ', ' + plan.planCode : '';
                    }

                  });
                }
              });
            }

            this.memberMatches.push(memberMatch);
          });
        }
      } else {
        this.searchMemberNoResults = true;
      }
    }, err => {
      this.searchMemberNoResults = true;
    });
  }
}

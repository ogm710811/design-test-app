import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {DocumentCheckVO, DocumentClaimVO, DocumentMemberVO, DocumentVO} from '@fox/rest-clients';
import {FoxValidators} from '@fox/shared';
import {DocumentSearchService} from './document-search/document-search.service';
import {DocumentSearchDropdownModel} from './document-search/model/document-search-dropdown.model';
import mmddyyyyValidator = FoxValidators.mmddyyyySlashDateValidator;
import mmyyDateValidator = FoxValidators.mmyyDateValidator;

@Component({
  selector: 'fox-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnChanges, OnInit {

  @Input() resetForm = true;
  @Output() resetFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() getForm = true;
  @Output() getFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formValues: EventEmitter<DocumentVO> = new EventEmitter<DocumentVO>();

  @Input() formValid = false;
  @Output() formValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  genderDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.genderDropdownValues;
  fekPullReasonDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.fekPullReasonDropdownValues;
  memberStateDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.memberStateDropdownValues;
  planTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.planTypeDropdownValues;
  feedbackInfoDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.feedbackInfoDropdownValues;
  docTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.docTypeDropdownValues;
  formTypeDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.formTypeDropdownValues;
  rnfStatusDropdownValues: DocumentSearchDropdownModel[] = this.documentSearchService.rnfStatusDropdownValues;

  atLeastOneField: ValidatorFn;

  documentSearchForm?: FormGroup;

  newVersion = false;

  get isNewVersion(): boolean {
    return this.newVersion;
  }

  constructor(private fb: FormBuilder,
              private documentSearchService: DocumentSearchService,
              private activateRoute: ActivatedRoute) {

    this.atLeastOneField = (c: AbstractControl): ValidationErrors | null => {
      let isAtLeastOneFieldFilled: boolean = false;
      if (c && c.value) {
        if (typeof c.value === 'object') {
          const formMap: object = <object>c.value;
          const formKeys: string[] = Object.keys(formMap);
          const valuedFormKeys: string[] = formKeys.filter((key) => !!(formMap as any)[key] && (formMap as any)[key].toString().trim().length > 0);
          isAtLeastOneFieldFilled = ((!!valuedFormKeys) && (valuedFormKeys.length > 0));
        } else {
          isAtLeastOneFieldFilled = true;
        }
      }

      return isAtLeastOneFieldFilled ? null : {'atLeastOneField': 'no'};
    };

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.resetForm && this.resetForm && this.documentSearchForm) {
      this.documentSearchForm.reset();
      this.resetForm = false;
      this.resetFormChange.emit(this.resetForm);
      this.checkIfFormFilled();
    }

    if (changes.getForm && this.getForm && this.formValid) {
      this.formValues.emit(this.getFormValues());
      this.getForm = false;
      this.getFormChange.emit(this.getForm);
      this.documentSearchService.documentSearchFormValues = this.documentSearchForm;
    }
  }

  ngOnInit(): void {
    if (this.documentSearchService.documentDetailVisited) {
      this.documentSearchForm = this.documentSearchService.documentSearchFormValues;
    } else {
      this.documentSearchForm = this.fb.group({
        member: this.fb.group({
          memberNo: [null, Validators.pattern(/^\d{9}$|^\d{11}$/)],
          memberState: [null],
          mbi: [null],
          lastName: [null],
          zipCode: [null],
          planType: [null],
          firstName: [null],
          dob: [null, mmddyyyyValidator],
          planCode: [null],
          middleName: [null],
          gender: [null],
          planEffectiveDate: [null, mmddyyyyValidator]
        }, {
          validator: this.atLeastOneField
        }),
        claim: this.fb.group({
          claimNo: [null, [Validators.pattern(/^[0-9]*$/), Validators.maxLength(12)]],
          providerTIN: [null],
          dosFrom: [null, mmyyDateValidator],
          claimJulianDate: [null],
          dosTo: [null, mmyyDateValidator],
          ubTypeOfBill: [null, [Validators.pattern(/^[0-9]*$/), Validators.maxLength(3)]],
          providerName: [null]
        }, {
          validator: this.atLeastOneField
        }),
        check: this.fb.group({
          checkNo: [null],
          checkDate: [null, mmddyyyyValidator],
          checkAmount: [null, Validators.pattern(/^(\d+(\.\d{1,2})?)$/)]
        }, {
          validator: this.atLeastOneField
        }),
        document: this.fb.group({
          dcn: [null, [Validators.pattern(/^[0-9]*$/), Validators.maxLength(22)]],
          asiMail: [null],
          rnfStatus: [null],
          feedbackCode: [null],
          employerBusiness: [null],
          routingError: [null],
          documentType: [null],
          healthAllies: [null],
          formType: [null],
          fekPullReason: [null]
        }, {
          validator: this.atLeastOneField
        })
      });

    }
    if (this.documentSearchService.documentDetailVisited && this.documentSearchForm) {
      this.documentSearchForm.patchValue(this.documentSearchService.documentSearchFormValues);
    }
    this.activateRoute.queryParamMap.subscribe(
      params => {
        this.newVersion = params.get('newVersion') === 'true' ? true : false;
      }
    );
  }

  getFormValues(): DocumentVO {
    const doc: DocumentVO = {};
    const member: DocumentMemberVO = {};
    const claim: DocumentClaimVO = {};
    const check: DocumentCheckVO = {};

    if (this.documentSearchForm) {
      const memberFormGroup = this.documentSearchForm.get('member');
      const claimFormGroup = this.documentSearchForm.get('claim');
      const checkFormGroup = this.documentSearchForm.get('check');
      const documentFormGroup = this.documentSearchForm.get('document');

      this.documentSearchService.parametersUsed = [];

      if (!!documentFormGroup && !!memberFormGroup && !!claimFormGroup && !!checkFormGroup) {
        member.accountNumber = memberFormGroup.value.memberNo;
        if (memberFormGroup.value.memberNo) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Member #',
            paramValue: memberFormGroup.value.memberNo.toString()
          });
        }

        member.state = memberFormGroup.value.memberState;
        if (memberFormGroup.value.memberState) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Member State',
            paramValue: this.getDropdownDescription(memberFormGroup.value.memberState.toString(), this.memberStateDropdownValues)
          });
        }

        member.medicareBeneficiaryId = memberFormGroup.value.mbi;
        if (memberFormGroup.value.mbi) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'MBI',
            paramValue: memberFormGroup.value.mbi.toString()
          });
        }

        member.lastName = memberFormGroup.value.lastName;
        if (memberFormGroup.value.lastName) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Last Name',
            paramValue: memberFormGroup.value.lastName.toString()
          });
        }

        member.zipCode = memberFormGroup.value.zipCode;
        if (memberFormGroup.value.zipCode) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Zip Code',
            paramValue: memberFormGroup.value.zipCode.toString()
          });
        }

        member.planType = memberFormGroup.value.planType;
        if (memberFormGroup.value.planType) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Plan Type',
            paramValue: this.getDropdownDescription(memberFormGroup.value.planType.toString(), this.planTypeDropdownValues)
          });
        }

        member.firstName = memberFormGroup.value.firstName;
        if (memberFormGroup.value.firstName) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'First Name',
            paramValue: memberFormGroup.value.firstName.toString()
          });
        }

        member.dateOfBirth = memberFormGroup.value.dob;
        if (memberFormGroup.value.dob) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Date of Birth',
            paramValue: memberFormGroup.value.dob.toString()
          });
        }

        member.planCode = memberFormGroup.value.planCode;
        if (memberFormGroup.value.planCode) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Plan Code',
            paramValue: memberFormGroup.value.planCode.toString()
          });
        }

        member.middleName = memberFormGroup.value.middleName;
        if (memberFormGroup.value.middleName) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Middle Name',
            paramValue: memberFormGroup.value.middleName.toString()
          });
        }

        member.gender = memberFormGroup.value.gender;
        if (memberFormGroup.value.gender) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Gender',
            paramValue: this.getDropdownDescription(memberFormGroup.value.gender.toString(), this.genderDropdownValues)
          });
        }

        member.planEffectiveDate = memberFormGroup.value.planEffectiveDate;
        if (memberFormGroup.value.planEffectiveDate) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Plan Effective Date',
            paramValue: memberFormGroup.value.planEffectiveDate.toString()
          });
        }

        claim.claimNumber = claimFormGroup.value.claimNo;
        if (claimFormGroup.value.claimNo) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Claim #',
            paramValue: claimFormGroup.value.claimNo.toString()
          });
        }

        claim.providerTin = claimFormGroup.value.providerTIN;
        if (claimFormGroup.value.providerTIN) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Provider TIN',
            paramValue: claimFormGroup.value.providerTIN.toString()
          });
        }

        claim.dosFrom = claimFormGroup.value.dosFrom ? claimFormGroup.value.dosFrom.replace('/', '') : null;
        if (claimFormGroup.value.dosFrom) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Date of Service From',
            paramValue: claimFormGroup.value.dosFrom.toString()
          });
        }

        claim.claimJulianDate = claimFormGroup.value.claimJulianDate;
        if (claimFormGroup.value.claimJulianDate) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Claim Julian Date',
            paramValue: claimFormGroup.value.claimJulianDate.toString()
          });
        }

        claim.dosTo = claimFormGroup.value.dosTo ? claimFormGroup.value.dosTo.replace('/', '') : null;
        if (claimFormGroup.value.dosTo) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Date of Service From',
            paramValue: claimFormGroup.value.dosTo.toString()
          });
        }

        claim.ubTypeOfBill = claimFormGroup.value.ubTypeOfBill;
        if (claimFormGroup.value.ubTypeOfBill) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'UB Type of Bill',
            paramValue: claimFormGroup.value.ubTypeOfBill.toString()
          });
        }

        claim.providerName = claimFormGroup.value.providerName;
        if (claimFormGroup.value.providerName) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Provider Name',
            paramValue: claimFormGroup.value.providerName.toString()
          });
        }

        check.checkNumber = checkFormGroup.value.checkNo;
        if (checkFormGroup.value.checkNo) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Check #',
            paramValue: checkFormGroup.value.checkNo.toString()
          });
        }

        check.checkDate = checkFormGroup.value.checkDate;
        if (checkFormGroup.value.checkDate) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Check Date',
            paramValue: checkFormGroup.value.checkDate.toString()
          });
        }

        check.checkAmount = checkFormGroup.value.checkAmount;
        if (checkFormGroup.value.checkAmount) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Check Amount',
            paramValue: checkFormGroup.value.checkAmount.toString()
          });
        }

        doc.docControlNumber = documentFormGroup.value.dcn;
        if (documentFormGroup.value.dcn) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'DCN',
            paramValue: documentFormGroup.value.dcn.toString()
          });
        }

        doc.asiMailIndicator = documentFormGroup.value.asiMail;
        if (documentFormGroup.value.asiMail) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'ASI Mail',
            paramValue: this.convertYN(documentFormGroup.value.asiMail.toString())
          });
        }

        doc.rnfStatus = documentFormGroup.value.rnfStatus;
        if (documentFormGroup.value.rnfStatus) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'RNF Status',
            paramValue: this.getDropdownDescription(documentFormGroup.value.rnfStatus.toString(), this.rnfStatusDropdownValues)
          });
        }

        doc.feedbackInfo = documentFormGroup.value.feedbackCode;
        if (documentFormGroup.value.feedbackCode) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Feedback Code',
            paramValue: this.getDropdownDescription(documentFormGroup.value.feedbackCode.toString(), this.feedbackInfoDropdownValues)
          });
        }

        doc.employerBusinessIndicator = documentFormGroup.value.employerBusiness;
        if (documentFormGroup.value.employerBusiness) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Employer Business',
            paramValue: this.convertYN(documentFormGroup.value.employerBusiness.toString())
          });
        }

        doc.routingErrorIndicator = documentFormGroup.value.routingError;
        if (documentFormGroup.value.routingError) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Routing Error',
            paramValue: this.convertYN(documentFormGroup.value.routingError.toString())
          });
        }

        doc.documentType = documentFormGroup.value.documentType;
        if (documentFormGroup.value.documentType) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Document Type',
            paramValue: this.getDropdownDescription(documentFormGroup.value.documentType.toString(), this.docTypeDropdownValues)
          });
        }

        doc.healthAlliesIndicator = documentFormGroup.value.healthAllies;
        if (documentFormGroup.value.healthAllies) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Health Allies',
            paramValue: this.convertYN(documentFormGroup.value.healthAllies.toString())
          });
        }

        doc.formType = documentFormGroup.value.formType;
        if (documentFormGroup.value.formType) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'Form Type',
            paramValue: this.getDropdownDescription(documentFormGroup.value.formType.toString(), this.formTypeDropdownValues)
          });
        }

        doc.fekPullReason = documentFormGroup.value.fekPullReason;
        if (documentFormGroup.value.fekPullReason) {
          this.documentSearchService.parametersUsed.push({
            paramName: 'FEK Pull Reason',
            paramValue: this.getDropdownDescription(documentFormGroup.value.fekPullReason.toString(), this.fekPullReasonDropdownValues)
          });
        }

        doc.member = member;
        doc.claim = claim;
        doc.check = check;
      }
    }
    return doc;
  }

  getDropdownDescription(code: string, dropdownValues: DocumentSearchDropdownModel[]): string {
    const desc = dropdownValues.filter(value => value.dropdownItemValue === code);
    if (desc.length > 0) {
      return desc[0].dropdownItemDesc;
    } else {
      return code;
    }
  }

  checkIfFormFilled(): boolean {
    if (this.documentSearchForm) {
      const response = this.documentSearchForm.controls.member.valid ||
        this.documentSearchForm.controls.claim.valid ||
        this.documentSearchForm.controls.check.valid ||
        this.documentSearchForm.controls.document.valid;
      this.formValid = response;
      this.formValidChange.emit(response);
      return response;
    } else {
      return false;
    }
  }

  removeWhitespace(sourceString: string): string | null {
    if (sourceString) {
      return sourceString.trim();
    } else {
      return null;
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
}

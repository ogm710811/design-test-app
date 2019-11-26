import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {
  ProviderValidationManualRequestVO,
  ProviderValidationManualResponseVO,
  ProviderValidationService,
  ReferencesApi,
  ReferenceValueVO
} from '@fox/rest-clients';
import {
  claimProcessingRoutePathDrugChrg,
  claimProcessingRoutePathHospital,
  claimProcessingRoutePathMedicalVisit,
  claimProcessingRoutePathMedSuppCharge,
  claimProcessingRoutePathNursingCharge,
  claimProcessingRoutePathProcessClaimException,
  claimProcessingRoutePathProcessClaimHomeHealth,
  claimProcessingRoutePathProcessClaimNopay,
  claimProcessingRoutePathRoot,
  Dfhcommarea,
  FoxValidators,
  HeaderSubtitleItem,
  PageHeaderService,
  TransferSrvService
} from '@fox/shared';
import {Subscription} from 'rxjs/Subscription';
import * as uuid from 'uuid';
import {ManualClaimService} from '../manual-claim-service.service';
import {ProviderValidationSubtitleComponent} from './provider-validation-subtitle/provider-validation-subtitle.component';

@Component({
  selector: 'fox-provider-validation',
  templateUrl: './provider-validation.component.html',
  styleUrls: ['./provider-validation.component.css']
})
export class ProviderValidationComponent implements OnInit, AfterViewInit {

  @ViewChild('benefitsAssigned') benefitsAssigned;
  @ViewChild('toggleGroup') toggleGroup;
  @ViewChild('doctorButton') doctorButton;
  @ViewChild('hospitalButton') hospitalButton;
  @ViewChild('medicaidButton') medicaidButton;
  benefitsAreAssigned: boolean = true;
  providerValidationFormGroup: FormGroup;
  selectedValue: string | null;
  tin: string;
  npi: string;
  business: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  addrLine1: string;
  addrLine2: string;
  city: string;
  state: string;
  zip: string;
  tinPattern = /\d\d\d-\d\d-\d\d\d\d/;
  states: ReferenceValueVO[];
  providerValidationManualRequestVO: ProviderValidationManualRequestVO = {};
  providerValidationManualResponseVO: ProviderValidationManualResponseVO = {};
  subscription: Subscription;
  isSearchFlagDisable: boolean = true;
  isContinueButtonDisable: boolean = false;
  claimNumber: string;
  memberNumber: string;
  common = new Dfhcommarea();

  get zipPattern(): RegExp {
    return FoxValidators.zipRegex;
  }

  constructor(
    private fb: FormBuilder,
    private referenceSvc: ReferencesApi,
    private providerValidationSvc: ProviderValidationService,
    private manualClaimService: ManualClaimService,
    protected transferSrv: TransferSrvService,
    protected router: Router,
    private pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  ngOnInit(): void {
    let data: any = undefined;
    data = this.transferSrv.getData();
    this.common = data['common'];
    this.common = this.common === undefined ? new Dfhcommarea() : this.common;
    this.providerValidationForm();
    this.referenceSvc.listCategoryCodes('MEMBER_STATE', uuid()).subscribe((resp) => {
      this.states = resp.filter(state => state.description !== 'FOR');
    });

    this.claimNumber = this.manualClaimService.data.claimNumber;

    this.memberNumber = this.manualClaimService.data.memberNumber;
    if (this.manualClaimService.data.memberNumber.length === 10) {
      this.memberNumber = this.manualClaimService.data.memberNumber.split(/(?!.{2})/).join(' ');
    } else if (this.manualClaimService.data.memberNumber.length === 11) {
      this.memberNumber = this.manualClaimService.data.memberNumber.split(/(?!.{3})/).join(' ');
    }
    this.pageHeaderService.customTitle = 'Provider #' + this.memberNumber;
    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      ProviderValidationSubtitleComponent, {
        claimNumber: this.claimNumber,
        memberNumber: this.memberNumber
      },
      this.componentFactoryResolver,
      this.injector);
  }

  ngAfterViewInit(): void {
    this.benefitsAssigned.nativeElement.focus();
  }

  providerValidationForm(): void {
    this.providerValidationFormGroup = this.fb.group({
      tin: '',
      npi: '',
      business: '',
      firstName: '',
      middleInitial: '',
      lastName: '',
      addrLine1: '',
      addrLine2: '',
      city: '',
      state: '',
      zip: '',
      selectedValue: ''
    });
  }

  toggleBenefitsAssigned(): void {
    this.benefitsAreAssigned = !this.benefitsAreAssigned;
  }

  clearForm(): void {
    this.benefitsAssigned.nativeElement.checked = true;
    this.benefitsAreAssigned = true;
    this.toggleGroup.value = null;
    this.doctorButton.checked = false;
    this.hospitalButton.checked = false;
    this.medicaidButton.checked = false;
    this.providerValidationForm();
  }

  checkIfFormFilled(): boolean {
    return !(this.toggleGroup.value && (this.providerValidationFormGroup.value.business || this.providerValidationFormGroup.value.lastName));
  }

  checkSearchFlagDisable(): boolean {
    return this.isSearchFlagDisable;
  }

  onClickSearch(): void {
    let data: any = undefined;
    // build NameVO
    const pvFormData = this.providerValidationFormGroup.value;

    this.providerValidationManualRequestVO.providerName = {};
    if (pvFormData.business) {
      this.providerValidationManualRequestVO.providerName.businessName = pvFormData.business;
    }
    if (pvFormData.prefix) {
      this.providerValidationManualRequestVO.providerName.prefix = pvFormData.prefix;
    }
    if (pvFormData.firstName) {
      this.providerValidationManualRequestVO.providerName.firstName = pvFormData.firstName;
    }
    if (pvFormData.middleName) {
      this.providerValidationManualRequestVO.providerName.middleName = pvFormData.middleInitial;
    }
    if (pvFormData.lastName) {
      this.providerValidationManualRequestVO.providerName.lastName = pvFormData.lastName;
    }

    // build ProviderAddressVO
    this.providerValidationManualRequestVO.providerAddress = {};
    if (pvFormData.addrLine1) {
      this.providerValidationManualRequestVO.providerAddress.addressLine1 = this.providerValidationFormGroup.value.addrLine1;
    }
    if (pvFormData.addrLine2) {
      this.providerValidationManualRequestVO.providerAddress.addressLine2 = this.providerValidationFormGroup.value.addrLine2;
    }
    if (pvFormData.city) {
      this.providerValidationManualRequestVO.providerAddress.city = this.providerValidationFormGroup.value.city;
    }
    if (pvFormData.state) {
      this.providerValidationManualRequestVO.providerAddress.state = this.providerValidationFormGroup.value.state;
    }
    if (pvFormData.zip) {
      this.providerValidationManualRequestVO.providerAddress.postalCode = this.providerValidationFormGroup.value.zip;
    }

    // build ProviderIdentifierVO
    this.providerValidationManualRequestVO.providerIdentifier = {};
    if (pvFormData.npi) {
      this.providerValidationManualRequestVO.providerIdentifier.npi = this.providerValidationFormGroup.value.npi;
    }
    if (pvFormData.tin) {
      this.providerValidationManualRequestVO.providerIdentifier.tin = this.providerValidationFormGroup.value.tin;
    }

    this.providerValidationManualRequestVO.providerClaimAssignment = this.benefitsAreAssigned;
    this.providerValidationManualRequestVO.providerType = this.toggleGroup._selected._value;

    this.subscription = this.providerValidationSvc.validateProviderManual(this.providerValidationManualRequestVO, uuid()).subscribe((
      providerValidationManualResponseVO) => {

      this.providerValidationManualResponseVO = providerValidationManualResponseVO;
      if (this.providerValidationManualResponseVO.providerName && this.providerValidationManualResponseVO.providerName.businessName) {
        this.common.processClaimCommarea.pfName = this.providerValidationManualResponseVO.providerName.businessName;
      }

      if (this.providerValidationManualResponseVO.providerAddress && this.providerValidationManualResponseVO.providerAddress.addressLine1) {
        this.common.processClaimCommarea.pfAddress = this.providerValidationManualResponseVO.providerAddress.addressLine1;
        if (this.providerValidationManualResponseVO.providerAddress.city && this.providerValidationManualResponseVO.providerAddress.state
          && this.providerValidationManualResponseVO.providerAddress.postalCode) {
          this.common.processClaimCommarea.pfCityStZip = this.providerValidationManualResponseVO.providerAddress.city + ' ' + this.providerValidationManualResponseVO.providerAddress.state
            + ' ' + this.providerValidationManualResponseVO.providerAddress.postalCode;
        }

      }

      if (this.providerValidationManualResponseVO.providerIdentifier && this.providerValidationManualResponseVO.providerIdentifier.npi && this.providerValidationManualResponseVO.providerIdentifier.tin) {
        this.common.processClaimCommarea.pfSearchCriteria = this.providerValidationManualResponseVO.providerIdentifier.npi + ' ' + this.providerValidationManualResponseVO.providerIdentifier.tin;
      }

      if (this.providerValidationManualResponseVO.providerIdentifier && this.providerValidationManualResponseVO.providerIdentifier.tinTypeCode) {
        this.common.processClaimCommarea.pfTinInd = this.providerValidationManualResponseVO.providerIdentifier.tinTypeCode;
      }

      if (this.providerValidationManualResponseVO.providerIdentifier && this.providerValidationManualResponseVO.providerIdentifier.providerId) {
        this.common.processClaimCommarea.pfProvId = this.providerValidationManualResponseVO.providerIdentifier.providerId;
      }

      if (this.providerValidationManualResponseVO.acceptabilityCode) {
        for (const index of Object.keys(this.providerValidationManualResponseVO.acceptabilityCode)) {
          if (index === '0' && this.providerValidationManualResponseVO.acceptabilityCode[index].acceptabilityCode) {
            this.common.processClaimCommarea.pfAcceptCode1 = this.providerValidationManualResponseVO.acceptabilityCode[index].acceptabilityCode;
          }
          if (index === '1' && this.providerValidationManualResponseVO.acceptabilityCode[index].acceptabilityCode) {
            this.common.processClaimCommarea.pfAcceptCode2 = this.providerValidationManualResponseVO.acceptabilityCode[index].acceptabilityCode;
          }
        }
      }

      data = this.transferSrv.getData();
      data['common'] = this.common;
      if (this.providerValidationManualResponseVO.providerValidationResult === 'MATCH') {
        this.isContinueButtonDisable = false;
      } else if (this.providerValidationManualResponseVO.providerValidationResult === 'PROVIDER_FRAUD_WASTE_ABUSE') {
        this.isContinueButtonDisable = false;
      } else {
        this.isContinueButtonDisable = true;
      }

    });

    this.isSearchFlagDisable = false;
  }

  onClickContinue(): void {
    const selectedService = this.manualClaimService.firstSelectedService;

    switch (selectedService) {
      case 1:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathHospital]);
        break;
      case 3:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedicalVisit]);
        break;
      case 4:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathNursingCharge]);
        break;
      case 5:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDrugChrg]);
        break;
      case 6:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimHomeHealth]);
        break;
      case 7:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMedSuppCharge]);
        break;
      case 8:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimException]);
        break;
      case 9:
        this.router.navigate([claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProcessClaimNopay]);
        break;
      default:
        break;
    }
  }
}

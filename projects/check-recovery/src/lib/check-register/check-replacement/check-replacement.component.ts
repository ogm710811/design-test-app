import {
  Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckDetailState} from './check-detail.state';
import {
  ResourceOfCheckVO,
  MemberApi,
  AccountAddressVO,
  AddressVO,
  NameVO,
  ProviderApi,
  ProviderAddressVO,
  ProviderNameVO,
  CheckIdsVO,
  ResourceOfProviderVO,
  CheckStatusEnum
} from '@fox/rest-clients';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CheckRegisterMemberVO} from '@fox/shared';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as uuidConst from 'uuid';
import {CheckRecoveryService} from '../../shared/check-recovery.service';
const uuid = uuidConst;

export interface ErrorMessageSettings {
  messageBoxTitle: string;
  messageBoxBody: string;
  isErrorMessageVisible: boolean;
}

@Component({
  selector: 'fox-check-replacement',
  templateUrl: './check-replacement.component.html',
  styleUrls: ['./check-replacement.component.css']
})
export class CheckReplacementComponent implements OnInit, OnChanges, OnDestroy {
  dropdownOptionsForReplacementMemberPayee = [
    {value: 0, label: 'Replace to Member / Special Payee'},
    {value: 1, label: 'Void'}
  ];
  dropdownOptionsForReplacementProvider = [
    {value: 0, label: 'Replace to Same Provider'},
    {value: 1, label: 'Void'}
  ];
  actionForm: FormGroup = this.fb.group({});
  institutionForm: FormGroup = this.fb.group({});
  errorMessageSettings: ErrorMessageSettings | undefined = {
    messageBoxTitle: '',
    messageBoxBody: '',
    isErrorMessageVisible: false
  };
  isMessageClosable = true;
  checkIds: CheckIdsVO = new CheckIdsVO();
  checkDetailsSubsciption?: Subscription;

  @Input() checkDetails?: ResourceOfCheckVO;

  get selectButtonText(): string {
    return (this.checkDetails && (this.checkDetails.tin || this.checkDetails.npi))
      ? 'Find Provider'
      : 'Find Member';
  }

  get institutionFormValue(): string {
    return (this.checkDetails && (this.checkDetails.tin || this.checkDetails.npi))
        ? 'yes'
        : 'no';
  }

  get boxMessageTitle(): string | undefined {
    const ems = this.errorMessageSettings;
    if (ems && ems.messageBoxTitle) {
      return ems.messageBoxTitle;
    } else {
      return undefined;
    }
  }

  get isErrorMessageVisible(): boolean {
    const emv = this.errorMessageSettings;
    if (emv && emv.isErrorMessageVisible) {
      return emv.isErrorMessageVisible;
    } else {
      return false;
    }
  }

  private _unsubscribe$: Subject<boolean> = new Subject<boolean>();
  private _errorMessageSetting: Map<string, ErrorMessageSettings> = new Map<string, ErrorMessageSettings>([
    ['memberNotFound',
      {
        messageBoxTitle: 'Member Not Found',
        messageBoxBody: 'Member not found in Member Database. Please reprocess claim to correct member.',
        isErrorMessageVisible: true
      }
    ],
    ['providerNotFound',
      {
        messageBoxTitle: 'Provider Not Found',
        messageBoxBody: 'Provider not found in Provider Database. Please reprocess claim to correct provider.',
        isErrorMessageVisible: true
      }
    ],
  ]);

  constructor(
    public fb: FormBuilder,
    public state: CheckDetailState,
    protected http: HttpClient,
    private memberApi: MemberApi,
    private providerApi: ProviderApi,
    private checkRecoveryService: CheckRecoveryService
    ) {
    this.actionForm = this.fb.group({
      action: null
    });
  }

  ngOnInit(): void {
    this.state.memberSelectedBehaviorSubject
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe(res => {
        if (res && this.state.selectedMember) {
          const selectedMember = this.state.selectedMember;
          this.institutionForm.patchValue({
            institution: selectedMember.payeeEntireName ? 'yes' : 'no'
          });
        }
      });
      this.state.modalIsVisible = false;
      this.checkDetailsSubsciption = this.state.checkDetailsBehaviorSubject.subscribe(result => {
        if (result && this.state.isAuthorizeScreen && this.actionForm) {
          this.actionForm.controls.action.disable();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checkDetails.currentValue) {
      this.institutionForm = this.fb.group({
        institution: this.institutionFormValue
      });
      const isProvider: boolean = !!changes.checkDetails.currentValue.tin;
      this.checkIds = this.checkRecoveryService.checkIds;
      if (this.checkIds && this.checkIds.checkid) {
        if (this.checkIds.checkid.length) {
          if (isProvider) {
            this.actionForm.patchValue({
              action: this.dropdownOptionsForReplacementProvider[0].value
            });
            this.actionForm.controls.action.disable();
          } else {
            this.actionForm.patchValue({
              action: this.dropdownOptionsForReplacementMemberPayee[0].value
            });
            this.actionForm.controls.action.disable();
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    if (this.checkDetailsSubsciption) {
      this.checkDetailsSubsciption.unsubscribe();
    }
  }

  errorMessageClosed(): void {
    if (this.errorMessageSettings) {
      this.errorMessageSettings.isErrorMessageVisible = false;
    }
  }

  getDropdownOptionsForReplacement(): any[] {
    if (this.checkDetails && (this.checkDetails.tin || this.checkDetails.npi)) {
      return this.dropdownOptionsForReplacementProvider;
    } else {
      return this.dropdownOptionsForReplacementMemberPayee;
    }
  }

  isMemberModal(): boolean {
    if (this.state.modalIsVisible && this.checkDetails && !(this.checkDetails.tin || this.checkDetails.npi)) {
      return true;
    }
    return false;
  }

  getErrorMessageSettings(errorMessage: string): ErrorMessageSettings | undefined {
    return this._errorMessageSetting.get(errorMessage);
  }

  async openMemberModal(): Promise<void> {
    await this.findMember();
  }

  isInstitutionReadOnly(): boolean {
    if (this.state.checkDetails && this.state.isAuthorizeScreen) {
      return true;
    }
    return false;
  }

  async findMember(): Promise<void> {
    if (this.checkDetails && (this.checkDetails.tin || this.checkDetails.npi)) {
      const npi: number | undefined = this.checkDetails.npi ? +this.checkDetails.npi.toString().slice(0, 10) : undefined;
      const tin: number | undefined = this.checkDetails.tin ? +this.checkDetails.tin.toString().slice(0, 9) : undefined;
      this.providerApi.findProvider(uuid(), tin, npi).subscribe(res => {
        if (res._embedded && res._embedded.items) {
          this.state.providerServiceData = [];
          this.state.modalData = [];
          this.state.providerServiceData = res._embedded.items;
          this.mapProviderDataToState();
          this.state.modalBehaviorSubject.next(true);
          this.state.modalIsVisible = true;
        }
      }, (error: string) => {
        console.warn(`Error: ${error}`);
      });
    } else if (this.checkDetails && this.checkDetails.accountNumber) {
      const memberAccount = this.checkDetails.accountNumber.toString().slice(0, 9);
      this.memberApi.getMemberByNineDigitAccountNumber(memberAccount).subscribe(res => {
        if (res._embedded && res._embedded.items) {
          this.state.serviceData = [];
          this.state.modalData = [];
          this.state.serviceData = res._embedded.items;
          this.mapDataToState();
          this.state.modalBehaviorSubject.next(true);
          this.state.modalIsVisible = true;
        }
        return res;
      }, error => {
        this.errorMessageSettings = this.getErrorMessageSettings('memberNotFound');
        if (this.errorMessageSettings) {
          this.errorMessageSettings.isErrorMessageVisible = true;
        }
      });
    }
  }

  mapProviderDataToState(): void {
    if (this.state.providerServiceData) {
      this.state.providerServiceData.forEach(item => {
        if (item.overrideProviderAddress && item.overrideProviderAddress.length > 0) {
          item.overrideProviderAddress.forEach(overrideAddress => {
            this.mapAProvider(item, overrideAddress, true);
          });
        }
        if (item.providerAddress && item.providerAddress.length > 0) {
          this.mapAProvider(item, item.providerAddress[0]);
        }
      });
    }
  }

  mapAProvider(item: ResourceOfProviderVO, address: ProviderAddressVO, isOverride?: boolean): void {
    let startDate: Date = new Date();
    let endDate: Date = new Date();
    const currentDate: Date = new Date();
    if (item.providerAddress && item.providerAddress.length > 0 && item.providerAddress[0].recordDetail && item.providerAddress[0].recordDetail.startDate && item.providerAddress[0].recordDetail.endDate) {
      startDate = new Date(item.providerAddress[0].recordDetail.startDate);
      endDate = new Date(item.providerAddress[0].recordDetail.endDate);
    }
    if (startDate > currentDate || endDate <= currentDate) {
      return;
    }
    this.state.modalData.push(new CheckRegisterMemberVO());
    const index = this.state.modalData.length - 1;
    this.state.modalData[index].isSelected = false;
    this.state.modalData[index].npi = item.providerNpi && item.providerNpi.idNumber ? item.providerNpi.idNumber.slice(0, 10) : '';
    this.state.modalData[index].tin = item.providerTin && item.providerTin.tin ? item.providerTin.tin.slice(0, 9) : '';
    this.state.modalData[index].isProvider = true;
    this.mapProviderAddress(index, address);
    if (isOverride && item.overrideProviderName) {
      this.mapProviderName(index, item.overrideProviderName);
    } else if (item.providerName) {
      this.mapProviderName(index, item.providerName);
    }
    if (item.alternativeProviderId && item.providerName) {
      this.state.modalData[index].providerType = 'Alternate Provider';
    } else if (item.overrideProviderName) {
      this.state.modalData[index].providerType = 'Override Provider';
    } else if (item.providerName) {
      this.state.modalData[index].providerType = 'Main Provider';
    }
  }

  mapDataToState(): void {
    if (this.state.serviceData) {
      this.state.serviceData.forEach(item => {
        if (item.auxiliaryParty && item.auxiliaryParty.length > 1) {
          item.auxiliaryParty.forEach(auxParty => {
            this.state.modalData.push(new CheckRegisterMemberVO());
            const index = this.state.modalData.length - 1;
            this.state.modalData[index].isSelected = false;
            this.state.modalData[index].isProvider = true;
            this.state.modalData[index].personType = auxParty.auxiliaryEntityType;
            this.state.modalData[index].isAuxiliary = true;
            this.state.modalData[index].tin = this.checkDetails && this.checkDetails.tin ? this.checkDetails.tin.toString() : '';
            if (auxParty.auxiliaryPersonType && auxParty.auxiliaryPersonType.name) {
              this.state.modalData[index].personType = auxParty.auxiliaryPersonType.name;
            }
            if (auxParty.auxiliaryPersonPermAddress && auxParty.auxiliaryPersonPermAddress.length > 0) {
              this.mapAuxAddress(index, auxParty.auxiliaryPersonPermAddress[0]);
            } else if (auxParty.auxiliaryPersonTempAddress && auxParty.auxiliaryPersonTempAddress.length > 0) {
              this.mapAuxAddress(index, auxParty.auxiliaryPersonTempAddress[0]);
            }
            if (item.memberDetails && item.memberDetails.aarpMembershipNumber && item.memberDetails.aarpMembershipNumber.membershipNumber) {
              const insuredCode = item.memberDetails.householdId && item.memberDetails.householdId.length > 0 ? item.memberDetails.householdId[0].insuredCode : '';
              this.state.modalData[index].memberNumber = `${item.memberDetails.aarpMembershipNumber.membershipNumber} ${item.memberDetails.aarpMembershipNumber.associationId} ${insuredCode}`;
            } if (auxParty.auxiliaryEntityType || auxParty.auxiliaryEntityName) {
              this.state.modalData[index].name = `${auxParty.auxiliaryEntityName}`;
              this.state.modalData[index].payeeEntireName = `${auxParty.auxiliaryEntityName}`;
            } else if (auxParty.auxiliaryPersonName) {
              this.mapName(index, auxParty.auxiliaryPersonName);
            }
          });
        } else if (item.auxiliaryParty && item.auxiliaryParty.length === 1) {
          this.state.modalData.push(new CheckRegisterMemberVO());
          const index = this.state.modalData.length - 1;
          const auxParty = item.auxiliaryParty[0];

          this.state.modalData[index].isSelected = false;
          this.state.modalData[index].isProvider = true;
          this.state.modalData[index].personType = auxParty.auxiliaryEntityType;
          this.state.modalData[index].isAuxiliary = true;
          if (auxParty.auxiliaryPersonType && auxParty.auxiliaryPersonType.name) {
            this.state.modalData[index].personType = auxParty.auxiliaryPersonType.name;
          }
          if (auxParty.auxiliaryPersonPermAddress && auxParty.auxiliaryPersonPermAddress.length > 0) {
            this.mapAuxAddress(index, auxParty.auxiliaryPersonPermAddress[0]);
          } else if (auxParty.auxiliaryPersonTempAddress && auxParty.auxiliaryPersonTempAddress.length > 0) {
            this.mapAuxAddress(index, auxParty.auxiliaryPersonTempAddress[0]);
          }
          if (item.memberDetails && item.memberDetails.aarpMembershipNumber && item.memberDetails.aarpMembershipNumber.membershipNumber) {
            const insuredCode = item.memberDetails.householdId && item.memberDetails.householdId.length > 0 ? item.memberDetails.householdId[0].insuredCode : '';
            this.state.modalData[index].memberNumber = `${item.memberDetails.aarpMembershipNumber.membershipNumber} ${item.memberDetails.aarpMembershipNumber.associationId} ${insuredCode}`;
          } if (auxParty.auxiliaryEntityType || auxParty.auxiliaryEntityName) {
            this.state.modalData[index].name = `${auxParty.auxiliaryEntityName}`;
            this.state.modalData[index].payeeEntireName = `${auxParty.auxiliaryEntityName}`;
          } else if (auxParty.auxiliaryPersonName) {
            this.mapName(index, auxParty.auxiliaryPersonName);
          } else if (auxParty.auxiliaryEntityName) {
            this.state.modalData[index].name = auxParty.auxiliaryEntityName;
            this.state.modalData[index].firstName = auxParty.auxiliaryEntityName;
          }

        } else if (item.memberDetails) {
          this.state.modalData.push(new CheckRegisterMemberVO());
          const index = this.state.modalData.length - 1;
          this.state.modalData[index].isSelected = false;
          this.state.modalData[index].isProvider = false;
          this.state.modalData[index].isAuxiliary = false;
          if (item.memberDetails.address && item.memberDetails.address.length > 0 && item.memberDetails.address[0].address) {
            this.mapMemberAddress(index, item.memberDetails.address[0]);
          }
          if (item.memberDetails.aarpMembershipNumber && item.memberDetails.aarpMembershipNumber.membershipNumber) {
            const insuredCode = item.memberDetails.householdId && item.memberDetails.householdId.length > 0 ? item.memberDetails.householdId[0].insuredCode : '';
            this.state.modalData[index].memberNumber = `${item.memberDetails.aarpMembershipNumber.membershipNumber} ${item.memberDetails.aarpMembershipNumber.associationId} ${insuredCode}`;
            this.state.modalData[index].personType = `${item.memberDetails.aarpMembershipNumber.membershipNumber} ${item.memberDetails.aarpMembershipNumber.associationId} ${insuredCode}`;
          }
          if (item.memberDetails.memberName) {
            this.mapName(index, item.memberDetails.memberName);
          }
        }
      });
    }
  }

  mapName(index: number, name: NameVO): void {
    this.state.modalData[index].name = `${name.prefix} ${name.firstName} ${name.lastName}`;
    this.state.modalData[index].firstName = name.firstName;
    this.state.modalData[index].lastName = name.lastName;
    this.state.modalData[index].prefix = name.prefix;
    this.state.modalData[index].suffix = name.suffix;
    this.state.modalData[index].middleName = name.middleName;
  }

  mapProviderName(index: number, name: ProviderNameVO): void {
    this.state.modalData[index].payeeEntireName = name.businessName ? `${name.businessName}` : `${name.prefix} ${name.firstName} ${name.lastName}`;
    this.state.modalData[index].name = name.businessName ? `${name.businessName}` : `${name.prefix} ${name.firstName} ${name.lastName}`;
    this.state.modalData[index].firstName = name.firstName;
    this.state.modalData[index].lastName = name.lastName;
    this.state.modalData[index].prefix = name.prefix;
    this.state.modalData[index].middleName = name.middleName;
  }

  mapMemberAddress(index: number, address: AccountAddressVO): void {
    if (address.address) {
      this.state.modalData[index].address = address.address.addressLine1 + ' ' + address.address.addressLine2;
      this.state.modalData[index].state = address.address.stateProvinceCode ? address.address.stateProvinceCode : address.address.state;
      this.state.modalData[index].city = address.address.city;
      this.state.modalData[index].zip = address.address.postalCode;
      this.state.modalData[index].addressType = address.permanentAddress ? 'Permanent' : 'Temporary';
      this.state.modalData[index].addressLine1 = address.address.addressLine1;
      this.state.modalData[index].addressLine2 = address.address.addressLine2;
    }
  }

  mapAuxAddress(index: number, address: AddressVO): void {
    this.state.modalData[index].address = address.addressLine1 + ' ' + address.addressLine2;
    this.state.modalData[index].state = address.state ? address.state : address.stateProvinceCode;
    this.state.modalData[index].city = address.city;
    this.state.modalData[index].zip = address.postalCode;
    this.state.modalData[index].addressLine1 = address.addressLine1;
    this.state.modalData[index].addressLine2 = address.addressLine2;
    this.state.modalData[index].addressType = 'Aux';
  }

  mapProviderAddress(index: number, address: ProviderAddressVO): void {
    this.state.modalData[index].address = address.addressLine1;
    this.state.modalData[index].address += address.addressLine2 ? ` ${address.addressLine2}` : '';
    this.state.modalData[index].state = address.state;
    this.state.modalData[index].city = address.city;
    this.state.modalData[index].zip = address.postalCode;
    this.state.modalData[index].addressLine1 = address.addressLine1;
    this.state.modalData[index].addressLine2 = address.addressLine2;
  }
}

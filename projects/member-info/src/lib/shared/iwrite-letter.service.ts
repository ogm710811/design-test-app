import {MessageBoxService, MessageBoxType} from '@fox/shared';
import {Injectable} from '@angular/core';
import {
  AccountAddressVO,
  AccountMembershipResponseVO,
  AddressVO,
  GenerateLetterRequestVO,
  GenerateLetterResponseVO,
  InsuredPlanVO,
  LetterWritingApi
} from '@fox/rest-clients';
import * as uuidConst from 'uuid';
const uuid = uuidConst;

@Injectable({
  providedIn: 'root'
})
export class IWriteLetterService {

  generateLetterRequest: GenerateLetterRequestVO = {memberDetails: {}, insuredPlan: []};
  memberProfile: AccountMembershipResponseVO = new AccountMembershipResponseVO();
  memberNumber: string = '';
  claimNumber: string = '';
  templateName: string = '';
  isIWriteFailure: boolean = false;
  generateLetterResponse: GenerateLetterResponseVO = {};
  letterWritingTab: string = 'letterWritingTab';

  constructor(private messageBoxService: MessageBoxService, private letterWritingSvc: LetterWritingApi) {
  }

  generateLetter(): void {
    this.messageBoxService.reset();
    this.isIWriteFailure = false;

    if (this.templateName && this.memberNumber) {
      this.generateLetterRequest = {memberDetails: {}, insuredPlan: [], claimDetails: {} };
      if (this.generateLetterRequest.memberDetails) {
        this.generateLetterRequest.memberDetails.aarpMembershipNumber = String(this.memberNumber);
        this.generateLetterRequest.memberDetails.aarpInsuredCd = Number(this.memberNumber.charAt(this.memberNumber.length - 1));
        this.generateLetterRequest.memberDetails.aarpAssociationId = Number(this.memberNumber.charAt(this.memberNumber.length - 2));
      }
      if (this.generateLetterRequest.claimDetails) {
        this.generateLetterRequest.claimDetails.claimNumber = String(this.claimNumber);
      }
    } else if (this.generateLetterRequest && this.generateLetterRequest.memberDetails && this.memberNumber) {
      this.generateLetterRequest = {memberDetails: {}, insuredPlan: [], claimDetails: {} };
      if (this.generateLetterRequest.memberDetails !== undefined) {
        this.generateLetterRequest.memberDetails.aarpMembershipNumber = String(this.memberNumber.slice(0, 9));
        this.generateLetterRequest.memberDetails.aarpInsuredCd = Number(this.memberNumber.charAt(this.memberNumber.length - 1));
        this.generateLetterRequest.memberDetails.aarpAssociationId = Number(this.memberNumber.charAt(this.memberNumber.length - 2));
      }
    } else if (this.memberNumber === '' && this.generateLetterRequest && this.generateLetterRequest.memberDetails && this.memberProfile.insuredPlan
      && this.memberProfile.memberDetails && this.memberProfile.memberDetails.memberName && this.memberProfile.memberDetails.householdId
      && this.memberProfile.memberDetails.householdId.length > 0
      && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId) {
      this.generateLetterRequest.memberDetails.firstName = this.memberProfile.memberDetails.memberName.firstName;
      this.generateLetterRequest.memberDetails.lastName = this.memberProfile.memberDetails.memberName.lastName;
      this.generateLetterRequest.memberDetails.middleName = this.memberProfile.memberDetails.memberName.middleName;
      this.generateLetterRequest.memberDetails.prefix = this.memberProfile.memberDetails.memberName.prefix;
      this.generateLetterRequest.memberDetails.suffix = this.memberProfile.memberDetails.memberName.suffix;
      this.generateLetterRequest.memberDetails.aarpMembershipNumber = String(this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber);
      this.generateLetterRequest.memberDetails.aarpAssociationId = this.memberProfile.memberDetails.aarpMembershipNumber.associationId;
      const householdIds = this.memberProfile.memberDetails.householdId;

      if (householdIds && householdIds.length > 0 && householdIds[0].insuredCode) {
        this.generateLetterRequest.memberDetails.aarpInsuredCd = Number(householdIds[0].insuredCode);
      }
      this.generateLetterRequest.memberDetails.dateOfBirth = this.memberProfile.memberDetails.dateOfBirth;
      this.generateLetterRequest.memberDetails.dateOfDeath = this.memberProfile.memberDetails.dateOfDeath;
      this.generateLetterRequest.memberDetails.partBDateEffective = this.memberProfile.memberDetails.partBDateEffective;

      const addresses = this.memberProfile.memberDetails.address;
      if (addresses && addresses.length > 0) {
        const foundPermAddr: AccountAddressVO | undefined =
            addresses.find(addr => !!addr && !!addr.address && addr.address.stopDt === '9999-12-31' && !!addr.recordDetail && addr.recordDetail.attrCode === 'PERMADR');
        const foundTempAddr: AccountAddressVO | undefined =
            addresses.find(addr => !!addr && !!addr.address && addr.address.stopDt === '9999-12-31' && !!addr.recordDetail && addr.recordDetail.attrCode === 'TEMPADR');
        this.generateLetterRequest.memberDetails.permAddress = foundPermAddr ? this.getAddressVO(foundPermAddr) : undefined;
        this.generateLetterRequest.memberDetails.tempAddress = foundTempAddr ? this.getAddressVO(foundTempAddr) : undefined;
      }
      this.generateLetterRequest.memberDetails.email = this.memberProfile.memberDetails.email;
      const reqPlans: InsuredPlanVO[] = [];
      this.memberProfile.insuredPlan.map(plan => {
      const reqPlan: InsuredPlanVO = {};
      reqPlan.effectiveDate = plan.effectiveDate;
      reqPlan.planCategoryDescription = plan.planCategoryDescription;
      reqPlan.planCode = '';
      reqPlan.planType = plan.planType;
      reqPlan.termDate = plan.termDate;
      reqPlans.push(reqPlan);
      });
      this.generateLetterRequest.insuredPlan = reqPlans;
    }
    this.letterWritingSvc.generateLetter(this.generateLetterRequest, uuid(), this.templateName, 'response').subscribe(response => {
      this.generateLetterResponse = response.body;
      if (response.status === 201) {
        const lwt = window.open(this.generateLetterResponse.letterInboxURL, this.letterWritingTab);
        if (lwt) {
          lwt.focus();
        }
      }
    }, e => {
      if (e.status === 412) {
        this.messageBoxService.reset();
        this.messageBoxService.addMessageBox('User not authorized for iWrite', MessageBoxType.ACTIVE, 'Please request access through Secure or contact your manager');
      } else if (e.status === 500 && e.error) {
        if (this.firstThreeCharactersToNumber(e.error) === 200) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'iWrite is not available at this time, please check back later');
        } else if (this.firstThreeCharactersToNumber(e.error) === 300) {
          this.messageBoxService.reset();
          this.messageBoxService.addMessageBox('Error', MessageBoxType.ERROR, 'The system to write a letter is not available at this time, please check back later');
        }
      }
    });
  }

  private getAddressVO(accAddressVO: AccountAddressVO): AddressVO {
    if (accAddressVO.address) {
      const addressVO: AddressVO = {};

      addressVO.addressLine1 = accAddressVO.address.addressLine1;
      addressVO.addressLine2 = accAddressVO.address.addressLine2;
      addressVO.city = accAddressVO.address.city;
      addressVO.state = accAddressVO.address.stateProvinceCode;
      addressVO.postalCode = accAddressVO.address.postalCode;
      addressVO.countryCode = accAddressVO.address.countryCode;
      return addressVO;
    }
    return {};
  }

  private firstThreeCharactersToNumber(error: string): number | undefined {
    return Number(error.substring(0, 3));
  }
}

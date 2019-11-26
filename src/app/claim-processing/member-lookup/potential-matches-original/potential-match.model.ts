import {
  AddressVO,
  CandidateMemberMatchVO,
  MemberIdentifiersVO,
  MemberVO,
  PolicyAsOfDosVO,
  ResourceOfMemberProfileAsOfDosVO
} from '@fox/rest-clients';
import {PotentialMatchTableData} from './potential-match-table-data.model';
import StatusAsOfDosEnum = PolicyAsOfDosVO.StatusAsOfDosEnum;

export class PotentialMatch implements PotentialMatchTableData {

  get matchScore(): number | undefined {
    return this.rawMatch.matchScore || undefined;
  }

  get firstName(): string {
    return (this.member.firstName || '').trim();
  }

  get lastName(): string {
    return (this.member.lastName || '').trim();
  }

  get middleName(): string {
    return (this.member.middleName || '').trim();
  }

  get suffixName(): string {
    return (this.member.suffixName || '').trim();
  }

  get dateOfBirth(): string {
    return (this.member.dateOfBirth || '').trim();
  }

  get gender(): string {
    return (this.member.gender || '').trim();
  }

  get medicareId(): string {
    return (this.memberIds.medicareId || '').trim();
  }

  get membershipNumber(): string {
    return (this.memberIds.aarpMembershipNumber || '').trim();
  }

  get associationId(): string {
    return (this.memberIds.aarpAssociationId || '').trim();
  }

  get insuredCd(): string {
    return (this.memberIds.aarpInsuredCd || '').trim();
  }

  get extendedMembershipNumber(): string {
    if (this.membershipNumber) {
      if (this.associationId && this.associationId.length === 1 &&
        this.insuredCd && this.insuredCd.length === 1) {
        return this.membershipNumber + ' ' + this.associationId + this.insuredCd;
      } else {
        return this.membershipNumber;
      }
    }
    return '';
  }

  get mdmRecordNumber(): string {
    return (this.memberIds.mdmRecordNumber || '').trim();
  }

  get individualId(): string {
    return (this.memberIds.individualId || '').trim();
  }

  get permanentAddress(): string {
    return this.addrString(this.permanentAddressVO).trim();
  }

  get temporaryAddress(): string {
    return this.addrString(this.temporaryAddressVO).trim();
  }

  get accountStatus(): string {
    if (this.memberPolicy && this.memberPolicy.statusAsOfDos) {
      switch (this.memberPolicy.statusAsOfDos) {
        case StatusAsOfDosEnum.ACTIVE:
          return 'Active';
        case StatusAsOfDosEnum.FUTUREEFFECTIVE:
          return 'Future Effective';
        case StatusAsOfDosEnum.NEARTERM:
          return 'After Term';
        case StatusAsOfDosEnum.COVERAGENONEFFECTIVE:
          return 'Non Effective';
        case StatusAsOfDosEnum.PROLONGEDTERM:
          return 'Prolonged Term';
        case StatusAsOfDosEnum.TERMNEVERACTIVE:
          return 'Term Never Active';
        default:
          return 'Unknown Status';
      }
    }
    return '';
  }

  get mbi(): string {
    return '';
  }

  get dateOfDeath(): string {
    return '';
  }

  private _rawMatch?: CandidateMemberMatchVO;

  private get rawMatch(): CandidateMemberMatchVO {
    return this._rawMatch || {};
  }

  private get result(): ResourceOfMemberProfileAsOfDosVO {
    return this.rawMatch.memberProfile ? this.rawMatch.memberProfile : {};
  }

  private get member(): MemberVO {
    return this.result.member ? this.result.member : {};

  }

  private get memberIds(): MemberIdentifiersVO {
    return this.result.memberIdentifiers ? this.result.memberIdentifiers : {};
  }

  private get permanentAddressVO(): AddressVO {
    return this.result.permanentAddress ? this.result.permanentAddress : {};
  }

  private get temporaryAddressVO(): AddressVO {
    return this.result.temporaryAddress ? this.result.temporaryAddress : {};
  }

  private get memberPolicy(): PolicyAsOfDosVO {
    return this.result.levelSevenEditPolicyAsOfDosVo ? this.result.levelSevenEditPolicyAsOfDosVo : {};
  }

  constructor(m?: CandidateMemberMatchVO) {
    this._rawMatch = m;
  }

  isEmpty(): boolean {
    return this._rawMatch === undefined;
  }

  private addrString(memPartyAddr: AddressVO): string {
    if (!memPartyAddr) {
      return '';
    }
    let addrStr: string = '';
    // Write address line 1 if not null
    if (memPartyAddr.addressLine1) {
      addrStr += memPartyAddr.addressLine1;
      // Add a newline if there is something else to the address
      if (memPartyAddr.addressLine2 || memPartyAddr.city || memPartyAddr.stateProvinceCode || memPartyAddr.postalCode) {
        addrStr += '\n';
      }
    }
    // Write address line 2 if not null
    if (memPartyAddr.addressLine2) {
      addrStr += memPartyAddr.addressLine2;
      // Add a newline if there is some combo of city state and zip
      if (memPartyAddr.city || memPartyAddr.stateProvinceCode || memPartyAddr.postalCode) {
        addrStr += '\n';
      }
    }

    // If city or state is there, check all the combos
    if (memPartyAddr.city || memPartyAddr.stateProvinceCode) {
      // If city and state, put a comman and space between them
      if (memPartyAddr.city && memPartyAddr.stateProvinceCode) {
        addrStr += memPartyAddr.city + ', ' + memPartyAddr.stateProvinceCode;
        // If only city, put the city name
      } else if (memPartyAddr.city) {
        addrStr += memPartyAddr.city;
      } else if (memPartyAddr.stateProvinceCode) {
        addrStr += memPartyAddr.stateProvinceCode;
      }
      // If postal code, put a space and the postal code
      if (memPartyAddr.postalCode) {
        addrStr += ' ' + memPartyAddr.postalCode;
      }
      // If only postal code, put code with no space
    } else if (memPartyAddr.postalCode) {
      addrStr += memPartyAddr.postalCode;
    }
    return addrStr.trim();
  }
}

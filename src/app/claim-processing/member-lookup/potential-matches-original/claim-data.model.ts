import {
  AddressVO,
  ClaimMemberPartyIdentifierVO,
  ClaimMemberPartyVO,
  MemberLookupProcessInfo,
  MemberValidationRequestVO,
  MemberVO,
  ResourceOfMemberLookupProcessInfo,
  ServiceDateVO
} from '@fox/rest-clients';
import {PotentialMatchTableData} from './potential-match-table-data.model';

export class ClaimData implements PotentialMatchTableData {

  PPK = 5;
  PFK = 6;

  get startDate(): string | undefined {
    return this.serviceDates ? this.serviceDates.serviceDate : undefined;
  }

  get endDate(): string | undefined {
    return this.serviceDates ? this.serviceDates.serviceEndDate : undefined;
  }

  get memPartyAddr(): AddressVO {
    return this.memData.memberPartyAddress ? this.memData.memberPartyAddress : {};
  }

  get city(): string {
    return (this.memPartyAddr.cityNameText || '').trim();
  }

  get country(): string {
    return (this.memPartyAddr.countryCode || '').trim();
  }

  get addressLine1(): string {
    return (this.memPartyAddr.addressLine1 || '').trim();
  }

  get addressLine2(): string {
    return (this.memPartyAddr.addressLine2 || '').trim();
  }

  get state(): string {
    return (this.memPartyAddr.stateProvinceCode || '').trim();
  }

  get zip(): string {
    return (this.memPartyAddr.postalCode || '').trim();
  }

  get processId(): number | undefined {
    return this.memLookupProcInfo.processID || undefined;
  }

  get claimTrackingId(): string {
    return (this.memValidationReqVo.claimTrackingId || '').trim();
  }

  get claimSource(): string | undefined {
    const numberToString = [
      'Crossover',
      'Clearinghouse',
      'Paper',
      'Non Claims'
    ];

    // Paper Claim
    if (this.memValidationReqVo.source === this.PPK || this.memValidationReqVo.source === this.PFK) {
      return numberToString[2];
    }

    return this.memValidationReqVo.source ? numberToString[(this.memValidationReqVo.source) - 1] : undefined;
  }

  private _bypassReason: string;

  set bypassReason(r: string) {
    this._bypassReason = r;
  }

  get bypassReason(): string {
    if (!this._bypassReason) {
      return '';
    } else {
      return this._bypassReason;
    }
  }

  get membershipNumber(): string {
    return (this.memPartyIds.aarpMembershipNumber || '').trim();
  }

  get medicareId(): string {
    return (this.memPartyIds.medicareClaimNumber || '').trim();
  }

  get firstName(): string {
    return (this.memParty.firstName || '').trim();
  }

  get middleName(): string {
    return (this.memParty.middleName || '').trim();
  }

  get lastName(): string {
    return (this.memParty.lastName || '').trim();
  }

  get permanentAddress(): string {
    return this.addr;
  }

  get temporaryAddress(): string {
    return '';
  }

  get addr(): string {
    const memPartyAddr = this.memPartyAddr;
    let addrStr: string = '';
    // Write address line 1 if not null
    if (memPartyAddr.addressLine1) {
      addrStr += memPartyAddr.addressLine1;
      // Add a newline if there is something else to the address
      if (memPartyAddr.addressLine2 || memPartyAddr.cityNameText || memPartyAddr.stateProvinceCode || memPartyAddr.postalCode) {
        addrStr += '\n';
      }
    }
    // Write address line 2 if not null
    if (memPartyAddr.addressLine2) {
      addrStr += memPartyAddr.addressLine2;
      // Add a newline if there is some combo of city state and zip
      if (memPartyAddr.cityNameText || memPartyAddr.stateProvinceCode || memPartyAddr.postalCode) {
        addrStr += '\n';
      }
    }

    // If city or state is there, check all the combos
    if (memPartyAddr.cityNameText || memPartyAddr.stateProvinceCode) {
      // If city and state, put a comman and space between them
      if (memPartyAddr.cityNameText && memPartyAddr.stateProvinceCode) {
        addrStr += memPartyAddr.cityNameText + ', ' + memPartyAddr.stateProvinceCode;
        // If only city, put the city name
      } else if (memPartyAddr.cityNameText) {
        addrStr += memPartyAddr.cityNameText;
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

  get dateOfBirth(): string {
    return (this.memParty.dateOfBirth || '').trim();
  }

  get gender(): string {
    return (this.memParty.gender || '').trim();
  }

  get dateOfDeath(): string {
    return '';
  }

  get mbi(): string {
    return '';
  }

  get accountStatus(): undefined {
    return undefined;
  }

  private _rawClaim: ResourceOfMemberLookupProcessInfo;

  private get rawClaim(): ResourceOfMemberLookupProcessInfo {
    return this._rawClaim || {};
  }

  private get memLookupProcInfo(): MemberLookupProcessInfo {
    return this.rawClaim.memberLookupProcess || {};
  }

  private get memValidationReqVo(): MemberValidationRequestVO {
    return this.memLookupProcInfo.memberLookupObject || {};
  }

  private get serviceDates(): ServiceDateVO {
    return this.memValidationReqVo.serviceDates || {};
  }

  private get memData(): MemberVO {
    return this.memValidationReqVo.member || {};
  }

  private get memParty(): ClaimMemberPartyVO {
    return this.memData.memberParty || {};
  }

  private get memPartyIds(): ClaimMemberPartyIdentifierVO {
    return this.memData.memberPartyIdentifiers || {};
  }

  constructor(claim: ResourceOfMemberLookupProcessInfo) {
    this._rawClaim = claim;
  }
}

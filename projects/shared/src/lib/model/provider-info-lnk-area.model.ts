import {ProvSphCodes} from './prov-sph-codes.model';
import {TinSphCodes} from './tin-sph-codes.model';

/**
 * Model class ProviderInfoLnkArea
 * Path: screenbean/rtrvprovinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::rtrvprovinfo::ProviderInfoLnkArea
 * Legacy Mapping: DFHCOMMAREA
 */
export class ProviderInfoLnkArea {
  returnCode = '';
  rqNameAddr = '';
  rqCompressNa = '';
  rqTin = '';
  rqSph = '';
  rqMpin = '';
  rqAccept = '';
  rqBank = '';
  rqAltKey = '';
  rqNotes = '';
  rqTaxStatus = '';
  inUcpsProviderId = 0;
  baseProvPartitionKey = 0;
  baseProviderType = '';
  baseNatlProvId = 0;
  filler11 = '';
  basePhoneNbr = '';
  basePhoneExt = '';
  baseFaxNbr = '';
  baseEmailAddr = '';
  baseTaxonomyCd = '';
  baseClaimNbr = '';
  baseManClaimDate = new Date();
  baseEcClaimDate = new Date();
  baseDeletedDate = new Date();
  baseCreatedDate = new Date();
  baseCreatedBy = '';
  baseModifyDate = new Date();
  baseModifyBy = '';
  tin = 0;
  tinType = '';
  comprName = '';
  comprAddress = '';
  comprCitySt = '';
  naBusName = '';
  naLastName = '';
  naFirstName = '';
  naMiddleInitial = '';
  naProfDesig = '';
  naAddr1 = '';
  naAddr2 = '';
  naCity = '';
  naState = '';
  naZip = '';
  naCountry = '';
  naCountryName = '';
  taxStatusCd = '';
  mpinNbr = 0;
  bankAcctTypeCd = '';
  bankRoutingNbr = '';
  bankAcctNbr = '';
  altUcpsProvId = 0;
  notesInd = '';
  acceptCode: string[] = [];
  tinSphCodes: TinSphCodes[] = [];
  provSphCodes: ProvSphCodes[] = [];
  sphQrPercent = 0;
}

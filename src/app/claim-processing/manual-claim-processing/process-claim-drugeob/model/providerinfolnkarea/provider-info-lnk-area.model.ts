import {StringUtils} from '../../../services/string-utils.service';
import {PdbAreaAcceptCodes} from './pdb-area-accept-codes.model';
import {PdbProvSphCodes} from './pdb-prov-sph-codes.model';
import {PdbTinSphCodes} from './pdb-tin-sph-codes.model';

/**
 * Model class ProviderInfoLnkArea
 * Path: screenbean/procclmdrugeobservice/providerinfolnkarea
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::providerinfolnkarea::ProviderInfoLnkArea
 * Legacy Mapping: THE-PROVIDER-SEG
 */
export class ProviderInfoLnkArea {
  pdbReturnCode = '';
  pdbAreaAcceptCodes: PdbAreaAcceptCodes[] = [];
  filler1 = '';
  filler2 = '';
  filler3 = '';
  filler4 = '';
  filler5 = '';
  filler6 = '';
  filler7 = '';
  filler8 = '';
  filler9 = '';
  filler10 = '';
  pdbInUcpsProviderId = 0;
  pdbBaseProvPartitionKey = 0;
  pdbBaseProviderType = '';
  pdbBaseNatlProvId = 0;
  filler11 = '';
  pdbBasePhoneNbr = '';
  pdbBasePhoneExt = '';
  pdbBaseFaxNbr = '';
  pdbBaseEmailAddr = '';
  pdbBaseTaxonomyCd = '';
  pdbBaseClaimNbr = '';
  pdbBaseManClaimDate = '';
  pdbBaseEcClaimDate = '';
  pdbBaseDeletedDate = '';
  pdbBaseCreatedDate = '';
  pdbBaseCreatedBy = '';
  pdbBaseModifyDate = '';
  pdbBaseModifyBy = '';
  pdbTin = 0;
  pdbTinType = '';
  pdbComprName = '';
  pdbComprAddress = '';
  pdbComprCitySt = '';
  pdbNaBusName = '';
  pdbNaLastName = '';
  pdbNaFirstName = '';
  pdbNaMiddleInitial = '';
  pdbNaProfDesig = '';
  pdbNaAddr1 = '';
  pdbNaAddr2 = '';
  pdbNaCity = '';
  pdbNaState = '';
  pdbNaZip = '';
  pdbNaCountry = '';
  pdbNaCountryName = '';
  pdbTaxStatusCd = '';
  pdbTinSphCodes: PdbTinSphCodes[] = [];
  pdbProvSphCodes: PdbProvSphCodes[] = [];
  pdbSphQrPercent = 0;
  pdbMpinNbr = 0;
  pdbBankAcctTypeCd = '';
  pdbBankRoutingNbr = '';
  pdbBankAcctNbr = '';
  pdbAltUcpsProvId = 0;
  pdbNotesInd = '';

  public isPdbNormal(): boolean {
    let pdbNormal = false;
    let initValue: string = '';
    initValue = '0';
    pdbNormal = StringUtils.trim(this.pdbReturnCode) === initValue;
    return pdbNormal;
  }

  public setPdbNormal(): void {
    let initValue: string = '';
    initValue = '0';
    this.pdbReturnCode = initValue;
  }

  public isPdbNotFound(): boolean {
    let pdbNotFound = false;
    let initValue: string = '';
    initValue = '8';
    pdbNotFound = StringUtils.trim(this.pdbReturnCode) === initValue;
    return pdbNotFound;
  }

  public setPdbNotFound(): void {
    let initValue: string = '';
    initValue = '8';
    this.pdbReturnCode = initValue;
  }

  public isPdbError(): boolean {
    let pdbError = false;
    let initValue: string = '';
    initValue = '9';
    pdbError = StringUtils.trim(this.pdbReturnCode) === initValue;
    return pdbError;
  }

  public setPdbError(): void {
    let initValue: string = '';
    initValue = '9';
    this.pdbReturnCode = initValue;
  }

  public isPdbRqNameAddr(): boolean {
    let pdbRqNameAddr = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqNameAddr = StringUtils.trim(this.filler1) === initValue;
    return pdbRqNameAddr;
  }

  public setPdbRqNameAddr(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler1 = initValue;
  }

  public isPdbRqCompressNa(): boolean {
    let pdbRqCompressNa = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqCompressNa = StringUtils.trim(this.filler2) === initValue;
    return pdbRqCompressNa;
  }

  public setPdbRqCompressNa(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler2 = initValue;
  }

  public isPdbRqTin(): boolean {
    let pdbRqTin = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqTin = StringUtils.trim(this.filler3) === initValue;
    return pdbRqTin;
  }

  public setPdbRqTin(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler3 = initValue;
  }

  public isPdbRqTaxStatus(): boolean {
    let pdbRqTaxStatus = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqTaxStatus = StringUtils.trim(this.filler4) === initValue;
    return pdbRqTaxStatus;
  }

  public setPdbRqTaxStatus(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler4 = initValue;
  }

  public isPdbRqSph(): boolean {
    let pdbRqSph = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqSph = StringUtils.trim(this.filler5) === initValue;
    return pdbRqSph;
  }

  public setPdbRqSph(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler5 = initValue;
  }

  public isPdbRqMpin(): boolean {
    let pdbRqMpin = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqMpin = StringUtils.trim(this.filler6) === initValue;
    return pdbRqMpin;
  }

  public setPdbRqMpin(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler6 = initValue;
  }

  public isPdbRqAccept(): boolean {
    let pdbRqAccept = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqAccept = StringUtils.trim(this.filler7) === initValue;
    return pdbRqAccept;
  }

  public setPdbRqAccept(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler7 = initValue;
  }

  public isPdbRqBank(): boolean {
    let pdbRqBank = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqBank = StringUtils.trim(this.filler8) === initValue;
    return pdbRqBank;
  }

  public setPdbRqBank(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler8 = initValue;
  }

  public isPdbRqAltKey(): boolean {
    let pdbRqAltKey = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqAltKey = StringUtils.trim(this.filler9) === initValue;
    return pdbRqAltKey;
  }

  public setPdbRqAltKey(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler9 = initValue;
  }

  public isPdbRqNotes(): boolean {
    let pdbRqNotes = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbRqNotes = StringUtils.trim(this.filler10) === initValue;
    return pdbRqNotes;
  }

  public setPdbRqNotes(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.filler10 = initValue;
  }

  public isPdbDoctor(): boolean {
    let pdbDoctor = false;
    let initValue: string = '';
    initValue = 'D';
    pdbDoctor = StringUtils.trim(this.pdbBaseProviderType) === initValue;
    return pdbDoctor;
  }

  public setPdbDoctor(): void {
    let initValue: string = '';
    initValue = 'D';
    this.pdbBaseProviderType = initValue;
  }

  public isPdbHospital(): boolean {
    let pdbHospital = false;
    let initValue: string = '';
    initValue = 'H';
    pdbHospital = StringUtils.trim(this.pdbBaseProviderType) === initValue;
    return pdbHospital;
  }

  public setPdbHospital(): void {
    let initValue: string = '';
    initValue = 'H';
    this.pdbBaseProviderType = initValue;
  }

  public isPdbMedicaid(): boolean {
    let pdbMedicaid = false;
    let initValue: string = '';
    initValue = 'M';
    pdbMedicaid = StringUtils.trim(this.pdbBaseProviderType) === initValue;
    return pdbMedicaid;
  }

  public setPdbMedicaid(): void {
    let initValue: string = '';
    initValue = 'M';
    this.pdbBaseProviderType = initValue;
  }

  public isPdbSocial(): boolean {
    let pdbSocial = false;
    let initValue: string = '';
    initValue = 'S';
    pdbSocial = StringUtils.trim(this.pdbTinType) === initValue;
    return pdbSocial;
  }

  public setPdbSocial(): void {
    let initValue: string = '';
    initValue = 'S';
    this.pdbTinType = initValue;
  }

  public isPdbEin(): boolean {
    let pdbEin = false;
    let initValue: string = '';
    initValue = 'E';
    pdbEin = StringUtils.trim(this.pdbTinType) === initValue;
    return pdbEin;
  }

  public setPdbEin(): void {
    let initValue: string = '';
    initValue = 'E';
    this.pdbTinType = initValue;
  }

  public isPdbNotesExist(): boolean {
    let pdbNotesExist = false;
    let initValue: string = '';
    initValue = 'Y';
    pdbNotesExist = StringUtils.trim(this.pdbNotesInd) === initValue;
    return pdbNotesExist;
  }

  public setPdbNotesExist(): void {
    let initValue: string = '';
    initValue = 'Y';
    this.pdbNotesInd = initValue;
  }

  public isPdbNoNotesExist(): boolean {
    let pdbNoNotesExist = false;
    let initValue: string = '';
    initValue = 'N';
    pdbNoNotesExist = StringUtils.trim(this.pdbNotesInd) === initValue;
    return pdbNoNotesExist;
  }

  public setPdbNoNotesExist(): void {
    let initValue: string = '';
    initValue = 'N';
    this.pdbNotesInd = initValue;
  }
}

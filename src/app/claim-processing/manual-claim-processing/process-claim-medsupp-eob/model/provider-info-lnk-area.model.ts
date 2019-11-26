import {PdbAreaAcceptCodes} from './pdb-area-accept-codes.model';

/**
 * Model class ProviderInfoLnkArea
 * Path: screenbean/procclmmedsuppartbeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsuppartbeob::ProviderInfoLnkArea
 * Legacy Mapping: THE-PROVIDER-SEG
 */
export class ProviderInfoLnkArea {
  pdbRequestCodes = '';
  pdbReturnCode = '';
  pdbAreaAcceptCodes: PdbAreaAcceptCodes[] = [];
  pdbInUcpsProviderId = 0;
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
  pdbSphQrPercent = 0;
  pdbTinSphCode = '';
  pdbTinSphPcAdj = 0;
  pdbTinSphPcQr = 0;
  pdbProvSphCode = '';
  pdbProvSphPcAdj = 0;
  pdbProvSphPcQr = 0;
  pdbMpinNbr = 0;
  pdbBankAcctTypeCd = '';
  pdbBankRoutingNbr = '';
  pdbBankAcctNbr = '';
  pdbAltUcpsProvId = 0;
  pdbNotesInd = '';
  pdbBaseProvPartitionKey = 0;
  pdbBaseProviderType = '';
  pdbBaseNatlProvId = 0;
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

  public setPdbNormal(): void {
    let initValue: string = '';
    //
    initValue = '0';
    //
    this.pdbReturnCode = initValue;
  }

  public setPdbNotFound(): void {
    let initValue: string = '';
    //
    initValue = '8';
    //
    this.pdbReturnCode = initValue;
  }

  public setPdbError(): void {
    let initValue: string = '';
    //
    initValue = '9';
    //
    this.pdbReturnCode = initValue;
  }

  public setPdbSocial(): void {
    let initValue: string = '';
    //
    initValue = 'S';
    //
    this.pdbTinType = initValue;
  }

  public setPdbEin(): void {
    let initValue: string = '';
    //
    initValue = 'E';
    //
    this.pdbTinType = initValue;
  }

  public setPdbNotesExist(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.pdbNotesInd = initValue;
  }

  public setPdbNoNotesExist(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.pdbNotesInd = initValue;
  }

  public setPdbDoctor(): void {
    let initValue: string = '';
    //
    initValue = 'D';
    //
    this.pdbBaseProviderType = initValue;
  }

  public setPdbHospital(): void {
    let initValue: string = '';
    //
    initValue = 'H';
    //
    this.pdbBaseProviderType = initValue;
  }

  public setPdbMedicaid(): void {
    let initValue: string = '';
    //
    initValue = 'M';
    //
    this.pdbBaseProviderType = initValue;
  }
}

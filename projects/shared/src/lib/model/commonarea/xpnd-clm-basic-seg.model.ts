/**
 * Model class XpndClmBasicSeg
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::XpndClmBasicSeg
 * Legacy Mapping: EX-BASIC-CLAIM-SEG
 */
export class XpndClmBasicSeg {
  primaryKey = 0;
  chAcctPartNum = 0;
  acctInfoKey = 0;
  specHandCode = '';
  purgeDate = 0;
  qualityCode = '';
  anySuspClaimsInd = '';
  latestDateOfService = 0;
  purgeFicheYr = 0;
  altAddressPtr = 0;
  insNotePtr = 0;
  deductiblePtr = 0;
  dbFileInd = '';
  dbFileKey = 0;
  waiverPremiumInd = '';
  addressHash = 0;
  totRecCtr = 0;
  totClmCtr = 0;
  clmAdjTsq = '';
  purgeFileInd = '';
  filler = '';
  desceasedDate = new Date();
}

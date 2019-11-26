import {EcVerfProcCmnAreaMap44ErrorTable} from './ec-verf-proc-cmn-area-map44-error-table.model';
import {EcVerfProcCmnAreaMap45ErrArea} from './ec-verf-proc-cmn-area-map45-err-area.model';
import {EcVerfProcCmnAreaMap49ErrArea} from './ec-verf-proc-cmn-area-map49-err-area.model';
import {EcVerfProcCmnArearClaimTable} from './ec-verf-proc-cmn-arear-claim-table.model';

/**
 * Model class EcVerfProcCmnArea
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::EcVerfProcCmnArea
 * Legacy Mapping: VERIFIC-COMMAREA
 */
export class EcVerfProcCmnArea {
  verifMapSaveArea: any = undefined;
  dfhMap45RestPart = '';
  origVerifNote = '';
  map44ErrorTables: EcVerfProcCmnAreaMap44ErrorTable[] = [];
  map45ErrArea = new EcVerfProcCmnAreaMap45ErrArea();
  map49ErrArea = new EcVerfProcCmnAreaMap49ErrArea();
  vqrSetVqrPctAny = 0;
  vqrSetVqrPct2OrMore = 0;
  vqrRpd08o81EndOfList = '';
  filler44 = '';
  vqrHoldTotalClaims = 0;
  vqrHoldTotalClaimsFormat = 0;
  vqrClaimTable = new EcVerfProcCmnArearClaimTable();
  dfhClaimTotalCharge = '';
  dfhClaimTotalAppAmt = '';
  dfhClaimTotalAmtPaid = '';
  dfhClaimTotalIneligAmt = '';
  dfhClaimTotalDeductible = '';
  dfhClaimInterest = '';
  vqrTotalDisplayed = 0;
  filler43 = '';
  vqrSearchCriteria = '';
  vqrSearchIons = 0;
  vqrCurrentClaim = 0;
  vqrClaimMcn = '';
  vqrCurrentMcn = '';
  vqrResp4Ind = '';
  vqrResp5Ind = '';
  vqrResp6Ind = '';
  vqrRpdiskpfPrimKey = '';
  vqrPiStatus = '';
  vqrPiIonsId = 0;
  vqrPiDate = 0;
  vqrPiVersuspDate = 0;
  vqrPiSequenceNo = 0;
  vqrPhStatus = '';
  vqrPhDate = 0;
  vqrPhLevel = 0;
  vqrPhVersuspDate = 0;
  vqrPhSequenceNo = 0;
  vqrMembership = '';
  vqrAssoc = '';
  vqrInsuredCode = '';
  mapNumInd = '';
  map44ErrorInd = '';
  map45ErrorInd = '';
  categoryInd = '';
  lastClaimInd = '';
  lastClaimNoY = '';
  lastClaimNoDdd = '';
  lastClaimNoCar = '';
  lastClaimNoLoc = '';
  lastClaimNoSeq = '';
  lastVerifRnfDate = '';
  lastVerifRnfTime = '';
  lastVerifRnfStat = '';
  filler40 = '';
  mod53RecStatus = '';
  mod53Status = '';
  recLockedInd = '';
  mod53Location = 0;
  mod53Ions = 0;
  mod53RefDate = 0;
  mod53Aix6RecFound = '';
  criticalErrorInd = '';
  verSuspInd = '';
  returnInd = '';
  aixInd = '';
  lastClaimNo = '';
  lastClaimNumber = '';
}

import {O2BillRecords} from './o2-bill-records.model';
import {O2BlPlanInds} from './o2-bl-plan-inds.model';

/**
 * Model class Oprec2Record
 * Path: oprecqr
 * Model: com::uhc::aarp::fox::domain::oprecQR::Oprec2Record
 * Legacy Mapping: RPDISKHA-OPREC2-RECORD
 */
export class Oprec2Record {
  o2ClaimNumber = 0;
  o2PacsId = 0;
  o2LegalEntity = '';
  o2Reinsurance = '';
  o2OvcpInd = '';
  o2EcVerifInd = '';
  o2EcFekTypeInd = '';
  o2EcFekSrvInd = '';
  o2PartBEffDate = 0;
  o2EobPageNo = 0;
  o2EobSequenceNo = 0;
  o2TimeCompleted = 0;
  o2EcChInd = '';
  o2LnpPlanInd1 = '';
  filler = '';
  o2UcpsLetterType = '';
  o2UcpsBillLine = '';
  o2LnpPlanInd2 = '';
  o2LnpPlanInd3 = '';
  o2BillRecords: O2BillRecords[] = [];
  o2BlPlanInds: O2BlPlanInds[] = [];
}

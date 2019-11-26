import { CSnPcReasonTable } from './csn-pc-reason-table.model';

/**
 * Model class CorresSeqNbrRecord
 * Path: screenbean/qltyrvwvol
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvol::CorresSeqNbrRecord
 * Legacy Mapping: C-SEQUENCE-NUMBER-RECORD
 */
export class CorresSeqNbrRecord {
  csnDivision = 0;
  csnQualSeq = 0;
  csnSend = 0;
  csnProcClaimInd = '';
  csnPartTimeInd = '';
  csnPcQualitySeqNo = 0;
  csnPcUnreviewedQuality = 0;
  csnPcPriorDayToQuality = 0;
  csnPcPriorDayUnrev = 0;
  csnMicroreqAddress = '';
  csnLocation = 0;
}

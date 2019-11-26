import {CSnPcReasonTable} from './csn-pc-reason-table.model';

/**
 * Model class CSequenceNumberRecord
 * Path: screenbean/clmcommmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::clmCommMiscInfo::CSequenceNumberRecord
 * Legacy Mapping: C-SEQUENCE-NUMBER-RECORD
 */
export class CSequenceNumberRecord {
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
  csnPcReasonTables: CSnPcReasonTable[] = [];
  filler1 = '';
  csnLocation = 0;
}

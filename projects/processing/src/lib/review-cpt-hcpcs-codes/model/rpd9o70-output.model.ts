import { R9o70oStateTable } from './r9o70o-state-table.model';

/**
 * Model class Rpd9o70Output
 * Path: screenbean/rtrvcpt
 * Model: com::uhc::aarp::fox::domain::screenbean::rtrvcpt::Rpd9o70Output
 * Legacy Mapping: RPD9O70-OUTPUT
 */
export class Rpd9o70Output {
  r9o70oCptCode = '';
  r9o70oSqlcodeCpt = 0;
  r9o70oSqlcodeState = 0;
  r9o70oTypeOfSrvcCode = '';
  r9o70oBenefitsPaidPct = 0;
  r9o70oSurgicalProcInd = '';
  r9o70oPreventCareInd = '';
  r9o70oHospiceInd = '';
  r9o70oCoPayInd = '';
  r9o70oStateTable = new R9o70oStateTable();
  r9o70oCptSensitiveInd = '';
  r9o70oCptShortDesc = '';
  r9o70oCptStartDt = '';
  r9o70oCptStopDt = '';
  r9o70oCptCodeDescLen = 0;
  r9o70oCptCodeDescDat = '';
}

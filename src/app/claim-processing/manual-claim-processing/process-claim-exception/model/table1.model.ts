import {T1Dtl} from './t1-dtl.model';
import {T1IcdCode} from './t1IcdCode.model';

/**
 * Model class Table1
 * Path: screenbean/procclmxcptchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmxcptchrg::Table1
 * Legacy Mapping: TABLE1
 */
export class Table1 {
  t1Sub = 0;
  t1BlCnt = 0;
  t1TempAdrFrDt = '';
  t1TempAdrToDt = '';
  t1Dtls: T1Dtl[] = [];
  t1IcdCode: T1IcdCode[] = [];
}

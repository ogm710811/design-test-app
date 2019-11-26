import {ProcClmXcptScrnDtl} from './proc-clm-xcpt-scrn-dtl.model';
import {ProcClmXcptScrnErrors} from './proc-clm-xcpt-scrn-errors.model';

/**
 * Model class ProcClmXcpt
 * Path: screenbean/procclmxcptchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmxcptchrg::ProcClmXcpt
 * Legacy Mapping: NEW-SCREEN-SAVE-AREA
 */
export class ProcClmXcpt {
  scrnIcdCode = '';
  scrnIcdCode2 = '';
  scrnIcdCode3 = '';
  scrnDtls: ProcClmXcptScrnDtl[] = [];
  scrnErrors: ProcClmXcptScrnErrors[] = [];
  scrnPf1Data = '';
  scrnPf3Data = '';
  screenPf5 = '';
  screenPf8 = '';
  scrnIdName = '';
  m30cmnd = '';
  m30mem1 = '';
  m30mem2 = '';
  m30mem3 = '';
  m30cno1 = '';
  m30cno2 = '';
  m30cno3 = '';
  m30cno4 = '';
  m30cno5 = '';
  m30cno6 = '';
  m30com1 = '';
  m30com2 = '';
  m30hdr = '';
  m30name = '';
  m30pln1 = '';
  m30eff1 = '';
  m30trm1 = '';
  m30memn = '';
  m30assc = '';
  m30insr = '';
  m30pln2 = '';
  m30eff2 = '';
  m30trm2 = '';
  m30dob = '';
  m30pln3 = '';
  m30eff3 = '';
  m30trm3 = '';
  screenErr1 = '';
  screenErr2 = '';
  screenErr3 = '';
  screenErr4 = '';
  isExpSrnA = false;
  isExpSrnB = true;
  isExpSrnPf6 = false;
}

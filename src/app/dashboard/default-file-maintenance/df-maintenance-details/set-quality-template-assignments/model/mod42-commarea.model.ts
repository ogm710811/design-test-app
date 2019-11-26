import { SiteTable } from './site-table.model';

/**
 * Model class Mod42Commarea
 * Path: screenbean/setqltytmpltasgn
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltasgn::Mod42Commarea
 * Legacy Mapping: MOD-42-COMMAREA
 */
export class Mod42Commarea {
  siteCtr = 0;
  siteTables: SiteTable[] = [];
  templCtr = 0;
  templTables: number[] = [];
  ntVerifySwitch = '';
  ntVerifyReply = '';
  lastAssignDate = 0;
  errorSwitch = '';
  filler19 = '';
  lastAssignYy = 0;
  lastAssignMm = 0;
  lastAssignDd = 0;
}

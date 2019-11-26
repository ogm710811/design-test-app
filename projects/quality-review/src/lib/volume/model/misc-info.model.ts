import { CurrDate } from './curr-date.model';

/**
 * Model class MiscInfo
 * Path: screenbean/qltyrvwvol
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvol::MiscInfo
 * Legacy Mapping: MISC-INFO
 */
export class MiscInfo {
  commandEnteredInd = '';
  currDate = new CurrDate();
  locEdit = 0;
  todayQualEdit = 0;
  totunrevQualEdit = 0;
  qualLoc = '';
  qualSite = '';
  empSite = '';

}

import { Messages } from './messages.model';
import { ReasonVolLine } from './reason-vol-line.model';
import { SiteNamesTable } from './site-names-table.model';
import { SiteNames } from './site-names.model';
import { Switches } from './switches.model';
import { TopFiveLine } from './top-five-line.model';

/**
 * Model class OtherWorkFields
 * Path: screenbean/qltyrvwvolrsn
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvolrsn::OtherWorkFields
 * Legacy Mapping: OTHER-WORK-FIELDS
 */
export class OtherWorkFields {
  tempScreen = 0;
  qualKey = 0;
  empLocation = 0;
  siteSelection = '';
  empSite = '';
  siteNamesTables: SiteNamesTable[] = [];
  systemDate = new Date();
  topFiveLine = new TopFiveLine();
  reasonVolLine = new ReasonVolLine();
  siteNames = new SiteNames();
  switches = new Switches();
  messages = new Messages();
}

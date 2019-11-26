import { PvControlSiteRecord } from './pv-control-site-record.model';
import { PvControlTemplateRecord } from './pv-control-template-record.model';

/**
 * Model class PvControlRecord
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::PvControlRecord
 * Legacy Mapping: PV-CONTROL-RECORD
 */
export class PvControlRecord {
  pvControlType = '';
  pvControlSiteRecord = new PvControlSiteRecord();
  pvControlTemplateRecord = new PvControlTemplateRecord();
}

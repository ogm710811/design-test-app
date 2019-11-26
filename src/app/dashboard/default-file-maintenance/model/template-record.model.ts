import { PvControlRecord } from './pv-control-record.model';
import { PvExclusionRecord } from './pv-exclusion-record.model';
import { PvTemplateRecord } from './pv-template-record.model';
import { TemplateFileRecord } from './template-file-record.model';

/**
 * Model class TemplateRecord
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::TemplateRecord
 * Legacy Mapping: TEMPLATE-RECORD
 */
export class TemplateRecord {
  templateFileRecord = new TemplateFileRecord();
  pvControlRecord = new PvControlRecord();
  pvTemplateRecord = new PvTemplateRecord();
  pvExclusionRecord = new PvExclusionRecord();
}

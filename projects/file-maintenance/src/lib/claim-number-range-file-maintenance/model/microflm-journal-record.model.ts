import { JCfNewLocSeqTable } from './jcf-new-loc-seq-table.model';
import { JCfOldLocSeqTable } from './jcf-old-loc-seq-table.model';
import { JHeader } from './jheader.model';

/**
 * Model class MicroflmJournalRecord
 * Path: screenbean/clmnbrrngflmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrrngflmnt::MicroflmJournalRecord
 * Legacy Mapping: MICROFLM-JOURNAL-RECORD
 */
export class MicroflmJournalRecord {
  jheader = new JHeader();
  jcfJulianDate = 0;
  jcfCartridge = '';
  jcfAddlInd = '';
  jcfOldLocSeqTables: JCfOldLocSeqTable[] = [];
  jcfNewLocSeqTables: JCfNewLocSeqTable[] = [];
}

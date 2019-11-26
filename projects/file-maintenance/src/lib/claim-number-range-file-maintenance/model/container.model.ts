import {Dfhcommarea} from '@fox/shared';
import {ClmFileMntCmnArea} from './clm-file-mnt-cmn-area.model';
import {EibFn} from './eib-fn.model';
import {EibRcode} from './eib-rcode.model';
import {ErrErrorR} from './err-error-r.model';
import {ExistingValuesTable} from './existing-values-table.model';
import {Filler1} from './filler1.model';
import {JCfNewLocSeqTable} from './jcf-new-loc-seq-table.model';
import {JCfOldLocSeqTable} from './jcf-old-loc-seq-table.model';
import {JHeader} from './jheader.model';
import {MicroflmJournalRecord} from './microflm-journal-record.model';
import {PgmErrorLine} from './pgm-error-line.model';
import {Rpdma25} from './rpdma25.model';
import {Rpdma26} from './rpdma26.model';
import {ScreenSaveTable} from './screen-save-table.model';
import {SortTables} from './sort-tables.model';
import {WorkStorage} from './work-storage.model';
import {WsNonclaimDivLocTable} from './ws-nonclaim-div-loc-table.model';

/**
 * Model class Container
 * Path: screenbean/clmnbrrngflmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrrngflmnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhCommonArea = new Dfhcommarea();
  screenbean26 = new Rpdma26();
  screenbean25 = new Rpdma25();
  cfmcomm = new ClmFileMntCmnArea();
  eibfn = new EibFn();
  eibrcode = new EibRcode();
  error = new ErrErrorR();
  existingValuesTable = new ExistingValuesTable();
  Filler1 = new Filler1();
  newlocseqtable = new JCfNewLocSeqTable();
  oldlocseqtable = new JCfOldLocSeqTable();
  jheader = new JHeader();
  microflmJournalRecord = new MicroflmJournalRecord();
  pgmErrorLine = new PgmErrorLine();
  screenSaveTable = new ScreenSaveTable();
  wsNonclaimDivLocTable = new WsNonclaimDivLocTable();
  sortTables = new SortTables();
}

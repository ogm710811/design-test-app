import {CommunicationCommarea} from '@fox/shared';
// import { CommunicationCommarea } from '../../bean/communication-commarea.model';
import {ClmCmnctInfo} from './clm-cmnct-info.model';
import {CSequenceNumberRecord} from './csequence-number-record.model';
import {CSnPcReasonTable} from './csn-pc-reason-table.model';
import {EachMonth} from './each-month.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpd07O43Container
 * Path: screenbean/clmcommmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::clmCommMiscInfo::Rpd07O43Container
 */
export class Rpd07O43Container {
  workStorage = new WorkStorage();
  rpdmb65 = new ClmCmnctInfo();
  eachMonth = new EachMonth();
  cSequenceNumberRecord = new CSequenceNumberRecord();
  cSnPcReasonTable = new CSnPcReasonTable();
  commonArea = new CommunicationCommarea();
}

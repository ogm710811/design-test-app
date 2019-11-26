import {Dfhcommarea, Oprec1Record, QualityInfoRecord, QualityCommAreaFieldsFor06o75} from '@fox/shared';
import {AllTheDifferentCautions} from './all-the-different-cautions.model';
import {HoldCautionTable} from './hold-caution-table.model';
import {WsCompFields} from './ws-comp-fields.model';
import {WsWorkFields} from './ws-work-fields.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwrvldcauti
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::WorkStorage
 */
export class WorkStorage {
  holdCautionTable = new HoldCautionTable();
  suspLocExpandeds: string[] = [];
  wsWorkFields = new WsWorkFields();
  wsCompFields = new WsCompFields();
  allTheDifferentCautions = new AllTheDifferentCautions();
  dfhcommarea = new Dfhcommarea();
  oprec1Record = new Oprec1Record();
  qualityInfoRecord = new QualityInfoRecord();
  qualityCommAreaFieldsFor06o75 = new QualityCommAreaFieldsFor06o75();
}

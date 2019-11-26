import {CommunicationCommarea} from '@fox/shared';
import {CmnctQltyRecord} from './cmnct-qlty-record.model';
import {CommArea} from './comm-area.model';
import {QualMap} from './qual-map.model';
import {Rpdmb85} from './rpdmb85.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpd07O48Container
 * Path: screenbean/commqltyrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::commQltyRvw::Rpd07O48Container
 */
export class Rpd07O48Container {
  workStorage = new WorkStorage();
  rpdmb85 = new Rpdmb85();
  qualMap = new QualMap();
  commonArea = new CommunicationCommarea();
  cmnctQltyRecord = new CmnctQltyRecord();
  commArea = new CommArea();
}

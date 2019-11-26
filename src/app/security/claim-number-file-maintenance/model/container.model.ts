import {
  CommArea,
  Dfhcommarea,
  Di82100Linkage,
  DialCommLnkArea
} from '@fox/shared';
import {ClaimFixCommarea} from './claim-fix-commarea.model';
import {ClaimNumberRecord} from './claim-number-record.model';
import {Rpdma39} from './rpdma39.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/clmnbrfilemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrfilemnt::Container
 */
export class Container {
  screenbean = new Rpdma39();
  dfhCommArea = new Dfhcommarea();
  workStorage = new WorkStorage();
  claimFixCommArea = new ClaimFixCommarea();
  ClaimNumberRecord = new ClaimNumberRecord();
  dialCommLnkArea = new DialCommLnkArea();
  di82100Linkage = new Di82100Linkage();
  commArea = new CommArea();
}

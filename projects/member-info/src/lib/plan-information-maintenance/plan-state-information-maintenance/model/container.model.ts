import {Dfhcommarea} from '@fox/shared';
import {PlanStateInfoMnt} from './plan-state-info-mnt.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/planstateinfomnt
 * Model: com::uhc::aarp::fox::domain::screenbean::planstateinfomnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  planstateinfomnt = new PlanStateInfoMnt();
  dfhCommarea = new Dfhcommarea();
}

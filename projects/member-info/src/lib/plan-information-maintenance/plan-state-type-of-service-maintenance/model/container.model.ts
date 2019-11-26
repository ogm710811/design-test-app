import {Dfhcommarea, PlanInfoCmnArea} from '@fox/shared';
import {Rpdma11} from './rpdma11.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/plnstatetosmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::plnstatetosmnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screenbean = new Rpdma11();
  commonArea = new PlanInfoCmnArea();
  dfhCommArea = new Dfhcommarea();
}

import {Dfhcommarea, OperStatCmnArea} from '@fox/shared';
import {Rpdma98} from './rpdma98.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operstattotals
 * Model: com::uhc::aarp::fox::domain::screenbean::operstattotals::Container
 */
export class Container {
  screenbean = new Rpdma98();
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
  operstatCmnArea = new OperStatCmnArea();
}

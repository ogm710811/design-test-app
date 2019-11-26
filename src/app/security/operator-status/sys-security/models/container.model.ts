import {Dfhcommarea} from '@fox/shared';
import {Rpdma93} from './rpdma93.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operstatsyssecur
 * Model: com::uhc::aarp::fox::domain::screenbean::operstatsyssecur::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhComArea = new Dfhcommarea();
  rpdma93 = new Rpdma93();
}

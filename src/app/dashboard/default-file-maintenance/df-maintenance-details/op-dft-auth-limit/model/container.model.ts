import {Dfhcommarea} from '@fox/shared';
import {Rpdma83} from './rpdma83.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operauthlmtdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthlmtdflt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  rpdma83 = new Rpdma83();
}

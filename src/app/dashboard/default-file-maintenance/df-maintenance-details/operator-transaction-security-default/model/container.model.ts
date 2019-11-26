import {Dfhcommarea} from '@fox/shared';
import {Rpdma87} from './rpdma87.model';
import {Rpdma88} from './rpdma88.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/opertranssecurdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::opertranssecurdflt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhComm = new Dfhcommarea();
  screen1 = new Rpdma87();
  screen2 = new Rpdma88();
}

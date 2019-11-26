import {Dfhcommarea} from '@fox/shared';
import {Rpdma99} from './rpdma99.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyrvwoperstat
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwoperstat::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screen = new Rpdma99();
  dfhcommarea = new Dfhcommarea();
}

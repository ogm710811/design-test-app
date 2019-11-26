import {Dfhcommarea} from '@fox/shared';
import {Rpdma86} from './rpdma86.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  rpdma86 = new Rpdma86();
}

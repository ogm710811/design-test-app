import {Dfhcommarea} from '@fox/shared';
import {Rpdma12} from './rpdma12.model';
import {Rpdma28} from './rpdma28.model';
import {Rpdma29} from './rpdma29.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/medcrcnstmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::medcrcnstmnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screen = new Rpdma28();
  screen1 = new Rpdma12();
  screen2 = new Rpdma29();
  validateInput: boolean = false;
  dfhcommarea = new Dfhcommarea();
}

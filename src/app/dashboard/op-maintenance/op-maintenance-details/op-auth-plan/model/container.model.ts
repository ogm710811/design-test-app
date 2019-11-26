import {Dfhcommarea} from '@fox/shared';
import {Rpdma67} from './rpdma67.model';
import {Rpdma90} from './rpdma90.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operplnauth
 * Model: com::uhc::aarp::fox::domain::screenbean::operplnauth::Container
 */
export class Container {
  workstorage = new WorkStorage();
  dfhcommonarea = new Dfhcommarea();
  screenbean1 = new Rpdma67();
  screenbean2 = new Rpdma90();
}

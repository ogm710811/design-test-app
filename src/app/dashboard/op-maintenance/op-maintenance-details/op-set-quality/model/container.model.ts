import {Dfhcommarea} from '@fox/shared';
import {Rpdma77} from './rpdma77.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqlty
 * Model: com::uhc::aarp::fox::domain::screenbean::setqlty::Container
 */
export class Container {
  rpdma77 = new Rpdma77();
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
}

/**
 * Model class Container
 * Path: screenbean/procclmmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmessages::Container
 */
import {Dfhcommarea} from '@fox/shared';
import {Rpdmb35} from './rpdmb35.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  dfhcommarea = new Dfhcommarea();
  workstorage = new WorkStorage();
  screen = new Rpdmb35();
}

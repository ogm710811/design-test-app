import {Dfhcommarea} from '@fox/shared';
import {Rpdmb73} from './rpdmb73.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/rvwicdservice
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwIcdService::Container
 */
export class Container {
  dfhComArea = new Dfhcommarea();
  workStorage = new WorkStorage();
  rpdmb73 = new Rpdmb73();
}

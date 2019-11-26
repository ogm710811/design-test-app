import {Dfhcommarea} from '@fox/shared';
import {Rpdmb20} from './rpdmb20.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/rvwcpthcpcs
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcpthcpcs::Container
 */
export class Container {
  workStorage = new WorkStorage();
  rpdmb20 = new Rpdmb20();
  dfhComArea = new Dfhcommarea();
}

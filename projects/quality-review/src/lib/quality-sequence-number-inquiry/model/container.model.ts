import {Dfhcommarea} from '@fox/shared';
import {Rpdmb95} from './rpdmb95.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::Container
 */
export class Container {
  rpdmb95 = new Rpdmb95();
  dfhCommonArea = new Dfhcommarea();
  workStorage = new WorkStorage();
}

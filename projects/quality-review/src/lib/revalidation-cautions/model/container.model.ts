import { Rpdmb80 } from './rpdmb80.model';
import { WorkStorage } from './work-storage.model';
import {Dfhcommarea} from '@fox/shared';

/**
 * Model class Container
 * Path: screenbean/qltyrvwrvldcauti
 * Model: com::uhc::aarp::fox::domain::screenBean::qltyRvwRvldCauti::Container
 */
export class Container {
  screenBean = new Rpdmb80();
  workStorage = new WorkStorage();
  redirectTo = '';
  dfhcommarea = new Dfhcommarea();
}

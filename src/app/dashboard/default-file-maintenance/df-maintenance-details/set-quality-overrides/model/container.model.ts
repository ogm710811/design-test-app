import {Dfhcommarea} from '@fox/shared';
import {Rpdma85} from './rpdma85.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqltyovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltyovrd::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhCommonArea = new Dfhcommarea();
  screenbean = new Rpdma85();
}

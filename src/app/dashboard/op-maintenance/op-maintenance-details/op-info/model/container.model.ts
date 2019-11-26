import {Dfhcommarea} from '@fox/shared';
import {Rpdma72} from './rpdma72.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::OperInfo::Container
 */
export class Container {
  dfhCommArea = new Dfhcommarea();
  screenbean = new Rpdma72();
  workStorage = new WorkStorage();
  count = '';
}

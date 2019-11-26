import {Dfhcommarea} from '@fox/shared';
import {Rpdma97} from './rpdma97.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/rvwoperatorstat
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwoperatorstat::Container
 */
export class Container {
  workStorage = new WorkStorage();
  dfhCommarea = new Dfhcommarea();
  screenbean = new Rpdma97();
  nextProgram = '';
}

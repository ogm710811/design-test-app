import {Dfhcommarea} from '@fox/shared';
import {Rpdma42} from './rpdma42.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqltytmpltasgn
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltasgn::Container
 */
export class Container {
  dfhCommArea = new Dfhcommarea();
  screenbean = new Rpdma42();
  workStorage = new WorkStorage();
}

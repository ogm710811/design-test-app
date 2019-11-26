import {CommunicationCommarea} from '@fox/shared';
import {DelCmnct} from './del-cmnct.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/delcmnctservice
 * Model: com::uhc::aarp::fox::domain::screenbean::delcmnctservice::Container
 */
export class Container {
  screen = new DelCmnct();
  workStorage = new WorkStorage();
  commonArea = new CommunicationCommarea();
}

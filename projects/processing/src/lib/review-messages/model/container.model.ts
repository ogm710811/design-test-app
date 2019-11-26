import {Dfhcommarea} from '@fox/shared';
import {RvwMessages} from './rvw-messages.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/rvwmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwmessages::Container
 */
export class Container {
  rvwMessages = new RvwMessages();
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
}

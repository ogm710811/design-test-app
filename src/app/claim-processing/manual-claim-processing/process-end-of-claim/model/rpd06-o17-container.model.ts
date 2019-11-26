import { Dfhcommarea } from '../../../bean/commonarea/dfhcommarea.model';
import { Rpdmb37 } from '../vos/rpdmb37.model';
import { WorkStorage } from './work-storage.model';

/**
 * Model class RPD06O17Container
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::RPD06O17Container
 */
export class RPD06O17Container {
  workStorage = new WorkStorage();
  dfhCommArea = new Dfhcommarea();
  rpdmb37 = new Rpdmb37();
}

import {Dfhcommarea} from '@fox/shared';
import {ProcClmNursingChrgService} from './proc-clm-nursing-chrg-service.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::Container
 */
export class Container {
  workStrorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  procClmNursingChrgService = new ProcClmNursingChrgService();
}

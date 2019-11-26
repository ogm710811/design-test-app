import {Dfhcommarea} from '@fox/shared';
import {ProcClmDrugEob} from './proc-clm-drug-eob.model';

/**
 * Model class Container
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::Container
 */
export class Container {
  procClmDrugEob = new ProcClmDrugEob();
  dfhcommarea = new Dfhcommarea();
  redirectTo = '';
  keyPressed = '';
}

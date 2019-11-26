import {Dfhcommarea} from '@fox/shared';
import {ProcClmElig} from './proc-clm-elig.model';

/**
 * Model class Container
 * Path: screenbean/procclmelig/beanws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmelig::beanws::Container
 */
export class Container {
  eibTime = new Date();
  claimCommArea = new Dfhcommarea();
  procClmElig = new ProcClmElig();
  redirectTo = '';
  eibAid = '';
  futureCommArea: any = undefined;
}

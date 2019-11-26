import {Dfhcommarea} from '@fox/shared';
import {OperTransSecur1} from './oper-trans-secur1.model';
import {OperTransSecur2} from './oper-trans-secur2.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/opertranssecur
 * Model: com::uhc::aarp::fox::domain::screenbean::opertranssecur::Container
 */
export class Container {
  workstorage = new WorkStorage();
  screenbean1 = new OperTransSecur1();
  screenbean2 = new OperTransSecur2();
  dfhcommonarea = new Dfhcommarea();
}

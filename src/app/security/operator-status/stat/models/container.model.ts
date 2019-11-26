import {Dfhcommarea, OperStatCmnArea} from '@fox/shared';
import {OperStat} from './oper-stat.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operstat
 * Model: com::uhc::aarp::fox::domain::screenbean::operstat::Container
 */
export class Container {
  workstorage = new WorkStorage();
  operstat = new OperStat();
  operStatCmnArea = new OperStatCmnArea();
  dfhcommarea = new Dfhcommarea();
  transferTo = '';

}

import {Dfhcommarea} from '@fox/shared';
import {ProcClmHospSnfEob} from './proc-clm-hosp-snf-eob.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  procClmHospSnfEob = new ProcClmHospSnfEob();
  dfhCommArea = new Dfhcommarea();
  workStorage = new WorkStorage();
}

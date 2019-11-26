/**
 * Model class Container
 * Path: screenbean/ecverfsuspproc
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfsuspproc::Container
 */
import {Dfhcommarea} from '@fox/shared';
import {EcVerfSuspProc} from './ec-verf-susp-proc.model';
import {WorkStorage} from './work-storage.model';

export class ContainerEcVer {
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  ecVerfSuspProc = new EcVerfSuspProc();
}

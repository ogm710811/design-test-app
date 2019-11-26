import {Dfhcommarea, ProcClmTempClmRec} from '@fox/shared';
import {ProcClmSrvcEob} from './proc-clm-srvc-eob.model';
import {CondensedProvFileRecord} from './providerfilerecord/condensed-prov-file-record.model';
import {WorkStorage} from './work-storage.model';
import {Ws6o27Line} from './ws6o27-line.model';

/**
 * Model class Container
 * Path: screenbean/procclmsrvceob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::Container
 */
export class Container {
  procClmSrvcEob = new ProcClmSrvcEob();
  workStorage = new WorkStorage();
  dfhcommarea = new Dfhcommarea();
  ws6o27 = new Ws6o27Line();
  procClmTempClm = new ProcClmTempClmRec();
  condensedProvFileRecord = new CondensedProvFileRecord();
}

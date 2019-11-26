/**
 * Model class Container
 * Path: screenbean/procclmnopayeob
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnopayeob::Container
 */
import {Dfhcommarea} from '@fox/shared';
import {ProcClmNoPayEob} from './proc-clm-no-pay-eob.model';
import {WsFields} from './ws-fields.model';

export class Container {
  screenBean = new ProcClmNoPayEob();
  dfhcommarea = new Dfhcommarea();
  wsField = new WsFields();
}

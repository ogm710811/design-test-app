/**
 * Model class Container
 * Path: screenbean/rvwclmmsgtext
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwclmmsgtext::Container
 */
import {Dfhcommarea} from '@fox/shared';
import {RvwClmMsgText} from './rvw-clm-msg-text.model';
import {WorkStorage} from './work-storage.model';

export class Container {
  workStorage = new WorkStorage();
  dfhcomm = new Dfhcommarea();
  screenbean = new RvwClmMsgText();
}

import {Dfhcommarea, OperFileCmnAreaAuthorityLimitCombos} from '@fox/shared';
import {OperDfltCmnArea} from './oper-dflt-cmn-area.model';
import {SetQltyCombDfltOvrd} from './set-qlty-comb-dflt-ovrd.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/setqltycombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombdflt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  operFileCmnAreaAuthorityLimitCombos = new OperFileCmnAreaAuthorityLimitCombos();
  setQltyCombDfltOvrd = new SetQltyCombDfltOvrd();
  dfhcommarea = new Dfhcommarea();
  operDfltCmnArea = new OperDfltCmnArea();

}

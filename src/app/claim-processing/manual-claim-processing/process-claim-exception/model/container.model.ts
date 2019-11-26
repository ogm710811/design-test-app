import {BenModInqLnkArea, ClaimEligibilityTsQueue, Dfhcommarea} from '@fox/shared';
import {ProcClmXcpt} from './proc-clm-xcpt.model';
import {WorkStorage} from './work-storage.model';
import {WsCptModifierFields} from './ws-cpt-modifier-fields.model';
import {WsMiscErrorArea} from './ws-misc-error-area.model';
import {WsNpiLinkarea} from './ws-npi-linkarea.model';
import { OeCommonUseArea } from './oe-common-use-area.model';

/**
 * Model class Container
 * Path: screenbean/procclmxcptchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmxcptchrg::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screenBean = new ProcClmXcpt();
  oeCommonUseArea = new OeCommonUseArea();
  wsMiscErrorArea = new WsMiscErrorArea();
  dfhCommArea = new Dfhcommarea();
  wsCptModifierFields = new WsCptModifierFields();
  benModInqLnk7o20Area = new BenModInqLnkArea();
  wsNpiLinkArea = new WsNpiLinkarea();
  clmEligTempStorQueue = new ClaimEligibilityTsQueue();
}

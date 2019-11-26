import {Dfhcommarea, DialCommLnkArea, LnkWrkStorageIcdCdDescRecord, Rpd09o70Linkage} from '@fox/shared';
import {WsCptModifierFields} from '../../process-claim-drugeob/model/ws-cpt-modifier-fields.model';
import {CmnIOWrkArea} from './cmn-iowrk-area.model';
import {ProcClmMedVisitChrg} from './proc-clm-med-visit-chrg.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Rpd06O05MContainer
 * Path: screenbean/procclmmedvisitchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedvisitchrg::Rpd06O05MContainer
 */
export class Rpd06O05MContainer {
  workStorage = new WorkStorage();
  rpdmb25 = new ProcClmMedVisitChrg();
  dfhcommarea = new Dfhcommarea();
  billsArea = new CmnIOWrkArea();
  lnkWrkStorageIcdCdDescRecord = new LnkWrkStorageIcdCdDescRecord();
  wsCptModifierFields = new WsCptModifierFields();
  rpd09o70Linkage = new Rpd09o70Linkage();
  dialCommLnkArea = new DialCommLnkArea();
}

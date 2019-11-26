import {Rpd09o70Linkage} from '@fox/processing';
import {AddressTsqRecord, Dfhcommarea, DialModeCommLinkArea, MedcrSuplChrgBenLnTSQ, NpiLinkarea} from '@fox/shared';
import {Rpdmb22} from '../../type-of-service/model/rpdmb22.model';
import {LnkWrkStorageIcdCdDescRecord} from './lnk-wrk-storage-icd-cd-desc-record.model';
import {Lnks9ParmArea} from './lnks9-parm-area.model';
import {ScreenAtrChar} from './screen-atr-char.model';
import {ScreenSaveArea} from './screen-save-area.model';
import {TempStorQueueIOLnkArea} from './temp-stor-queue-iolnk-area.model';
import {WorkStorage} from './work-storage.model';
import {WsCptModifierFields} from './ws-cpt-modifier-fields.model';
import {WsWorkTsqArea} from './ws-work-tsq-area.model';

/**
 * Model class Container
 * Path: screenbean/procclmmedsupptbchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsupptbchrg::Container
 * Legacy Mapping: DIALRESP
 */
export class Container {
  workStorage = new WorkStorage();
  screenbean = new Rpdmb22();
  screenAtrChar = new ScreenAtrChar();
  screenSaveArea = new ScreenSaveArea();
  npiLink = new LnkWrkStorageIcdCdDescRecord();
  LnkTsqCommandArea = new TempStorQueueIOLnkArea();
  wsWorkTsqArea = new WsWorkTsqArea();
  rpd09o70Linkage = new Rpd09o70Linkage();
  commonArea = new Dfhcommarea();
  providernpiLnkArea = new NpiLinkarea();
  dialmodeCommLnkArea = new DialModeCommLinkArea();
  wsCptModifierFields = new WsCptModifierFields();
  addressTsqRecord = new AddressTsqRecord();
  medcrSuplChrgBenLnTSQ = new MedcrSuplChrgBenLnTSQ();
  lnks9ParamArea = new Lnks9ParmArea();
}

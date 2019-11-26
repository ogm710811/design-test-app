import {DrugBenLnTSQ, DrugChrgLnTSQ, ProcClmTempClmRec} from '@fox/shared';
import {AuthorityMessage} from './authoritymessage/authority-message.model';
import {CicsErrLinkage} from './cics-err-linkage.model';
import {ClaimTempStorage} from './claimtempxpndclmseg/claim-temp-storage.model';
import {CmnErrorRtneWrkStorArea} from './cmn-error-rtne-wrk-stor-area.model';
import {CmnIOWrkArea} from './cmniowrkarea/cmn-iowrk-area.model';
import {HoldAllAmounts} from './hold-all-amounts.model';
import {WsHospTsqArea} from './hospbenline/ws-hosp-tsq-area.model';
import {MiscInfo} from './misc-info.model';
import {ProcClmPriorProvLnkArea} from './proc-clm-prior-prov-lnk-area.model';
import {ProviderInfoLnkArea} from './providerinfolnkarea/provider-info-lnk-area.model';
import {TsName} from './ts-name.model';
import {WsClaimTsqFields} from './ws-claim-tsq-fields.model';
import {WsDbBillLinesArea} from './ws-db-bill-lines-area.model';
import {WsDb2ErrorsArea} from './ws-db2-errors-area.model';
import {WsDrugRecTbl} from './ws-drug-rec-tbl.model';
import {WsExceptTsqArea} from './ws-except-tsq-area.model';
import {WsKeys} from './ws-keys.model';
import {WsMedSuppTsqArea} from './ws-med-supp-tsq-area.model';
import {WsTsqArea} from './ws-tsq-area.model';
import {WsWorkFields} from './ws-work-fields.model';
import {WsWorkIndicators} from './ws-work-indicators.model';
import {WsWorkSubs} from './ws-work-subs.model';
import {WsWork6o27TsqArea} from './ws-work6o27-tsq-area.model';
import {WsMiscErrorArea} from './wsmiscerrorarea/ws-misc-error-area.model';

/**
 * Model class LocalData
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::LocalData
 */
export class LocalData {
  wsMiscErrorArea = new WsMiscErrorArea();
  wsWorkFields = new WsWorkFields();
  wsTsqArea = new WsTsqArea();
  wsWorkIndicators = new WsWorkIndicators();
  cmnErrorRtneWrkStorArea = new CmnErrorRtneWrkStorArea();
  wsWorkSubs = new WsWorkSubs();
  tsqBnftRec = new DrugBenLnTSQ();
  tsqChrgRec = new DrugChrgLnTSQ();
  wsDrugRecTbl = new WsDrugRecTbl();
  wsDbBillLinesArea = new WsDbBillLinesArea();
  procClmTempClmRec = new ProcClmTempClmRec();
  providerInfoLnkArea = new ProviderInfoLnkArea();
  holdAllAmounts = new HoldAllAmounts();
  wsClaimTsqFields = new WsClaimTsqFields();
  claimTempStorage = new ClaimTempStorage();
  cicsErrLinkage = new CicsErrLinkage();
  wsDb2ErrorsArea = new WsDb2ErrorsArea();
  authorityMessage = new AuthorityMessage();
  tsName = new TsName();
  wsHospTsqArea = new WsHospTsqArea();
  cmnIOWrkArea = new CmnIOWrkArea();
  miscInfo = new MiscInfo();
  wsMedSuppTsqArea = new WsMedSuppTsqArea();
  wsExceptTsqArea = new WsExceptTsqArea();
  wsKeys = new WsKeys();
  wsWork6o27TsqArea = new WsWork6o27TsqArea();
  procClmPriorProvLnkArea = new ProcClmPriorProvLnkArea();
}

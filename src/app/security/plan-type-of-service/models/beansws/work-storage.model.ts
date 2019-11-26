
import { PlanInfoCmnArea } from '../beans/plan-info-cmn-area.model';

/**
 * Model class WorkStorage
 * Path: screenbean/plntosmnt/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::plntosmnt::beansWs::WorkStorage
 * Legacy Mapping: WS-COMP-WORK-AREA
 */
export class WorkStorage {
  wsResponse = 0;
  sub = 0;
  subAcceptCode = 0;
  errorAcceptCode = '';
  reformatDate = '';
  holdStart = 0;
  holdStop = 0;
  rateGroupEnteredInd = '';
  hospitalEnteredInd = '';
  ltrEnteredInd = '';
  snfEnteredInd = '';
  messageFoundInd = '';
  rpdiskqaFoundInd = '';
  fileDate = '';
  workDate = '';
  wsAttributeValue = false;
  wsFileName = '';
  wsMap = '';
  messageKey = '';
  workField1 = 0;
  workField2 = 0;
  workField3 = 0;
  workField4 = 0;
  workField5 = 0;
  workField6 = 0;
  workField7 = 0;
  wsPlanKey = '';
  wsStateKey = '';
  wsTosKey = '';
  wsAgeIndKey = 0;
  wsStopDateKey = 0;
  wsService = '';
  wsType = '';
  wsSplit1 = '';
  wsSplit2 = '';
  planInfoCmnArea = new PlanInfoCmnArea();
  caPlanTosRec = '';
  caScreenInd = '';
  caVerifySwitch = '';
  caTransType = '';
  caPlanType = '';
 isRateGroupEntered = '';
 isLtrEntered = '';
 isMessageFound = '';
 isSnfEntered = '';
 isHospitalEntered = '';
 isRpdiskqaFound = '';

}

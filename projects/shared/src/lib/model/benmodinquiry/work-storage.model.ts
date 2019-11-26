import {Dfhcommarea} from '../commonarea/dfhcommarea.model';

/**
 * Model class WorkStorage
 * Path: screenbean/benmodinquiry
 * Model: com::uhc::aarp::fox::domain::screenbean::benmodInquiry::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  wsSequenceNum = 0;
  wsResp = 0;
  wsTsqItem = 0;
  ceTsqItem = 0;
  ceTsqResponse = 0;
  wsRegionName = '';
  wsTobTsqItemNo = 0;
  rpdiskorResponse = 0;
  maxLines = 0;
  noOfPages = 0;
  nopRemainder = 0;
  wsCommLength = 0;
  sub = 0;
  sub1 = 0;
  subd = 0;
  bmSub = 0;
  lineSub = 0;
  screenPlanEffDateX = '';
  screenDateX = '';
  wsDateCc = 0;
  wsDateMm = 0;
  wsDateDd = 0;
  wsCdCcyy = 0;
  wsCdMm = 0;
  wsCdDd = 0;
  wkPlanPos1 = '';
  wkPlanPos2 = '';
  wkPlanPos3 = '';
  screenPlan1 = '';
  screenPlan2 = '';
  screenPlan3 = '';
  screenMemberNo = 0;
  filler2 = '';
  screenAssocCode = 0;
  filler3 = '';
  screenInsuredCode = 0;
  pf3Valid = '';
  pf4Valid = '';
  pf3MapInd = '';
  pf4MapInd = '';
  mapPlanInd = '';
  wsDateYy = 0;
  commArea = new Dfhcommarea();
}

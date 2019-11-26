import { MaprxTsq } from './maprx-tsq.model';

/**
 * Model class WorkStorage
 * Path: screenbean/druginquiryresults
 * Model: com::uhc::aarp::fox::domain::screenbean::druginquiryresults::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  cmdEnteredInd = '';
  sub = 0;
  mapResp = 0;
  wsResp = 0;
  wsItem = 0;
  maxLinesDisp = 0;
  wsCheckField1 = 0;
  wsCheckField2 = 0;
  wsBenefitAmt = 0;
  wsSearchNumDisp = 0;
  tsqEofInd = '';
  wsStrNum = 0;
  wsStrUnit = '';
  wsVolNum = 0;
  wsVolUnit = '';
  subS = 0;
  maprxTsq = new MaprxTsq();
}

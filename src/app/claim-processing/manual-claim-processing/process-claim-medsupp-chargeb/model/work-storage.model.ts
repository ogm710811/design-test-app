import {MedChrgLnTSQ, MedcrSuplChrgBenLnTSQ} from '@fox/shared';
import {CoinsAmtTable} from './coins-amt-table.model';
import {ScreenSaveArea} from './screen-save-area.model';
import {WkPlan} from './wk-plan.model';
import {WsPlanCodeData} from './ws-plan-code-data.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmmedsupptbchrgb
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmmedsupptbchrgb::WorkStorage
 */
export class WorkStorage {
  coinsValuedInd = '';
  msTsqNoEof = '';
  wsPlanCodeData = new WsPlanCodeData();
  clearEnteredInd = '';
  chargeType9FoundInd = '';
  sub = 0;
  wsRespDisplay = 0;
  coinsAmtApprvWarnInd = '';
  modCommLength = 0;
  screenDate2 = '';
  compressErrorInd = '';
  planSub = 0;
  screenDate = '';
  decimalInd = '';
  wsMembership = '';
  wkPlan = new WkPlan();
  coinsAmtBillWarnInd = '';
  wsAssociation = '';
  wsInsuredCode = '';
  coinsAmtMpaidWarnInd = '';
  validCharInd = '';
  chargeType8FoundInd = '';
  coinsAmtErrInd = '';
  workDateX = '';
  coinsAmtTables: CoinsAmtTable[] = [];
  wsMsSub = 0;
  wsMsTsqNumItems = 0;
  wsTsqItem = 0;
  wsTsqNumItems = 0;
  wsTsqItemD = 0;
  wsTsqNumItemsD = 0;
  wsMsChrgTsqName = '';
  msChrgIoArea = new MedChrgLnTSQ();
  msChrgLineRecord: MedChrgLnTSQ[] = [];
  msChrgLinesArea = new MedChrgLnTSQ();
  screenChargeLine: ScreenSaveArea[] = [];
  medSupList: MedcrSuplChrgBenLnTSQ[] = [];
  wsMsChrgTsqTermId = '';
}

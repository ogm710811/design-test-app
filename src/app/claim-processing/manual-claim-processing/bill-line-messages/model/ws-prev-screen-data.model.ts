import {PrevScreenRow} from './prev-screen-row.model';

/**
 * Model class WsPrevScreenData
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::WsPrevScreenData
 * Legacy Mapping: WS-PREV-SCREEN-DATA
 */
export class WsPrevScreenData {
  pf1ConfirmInd = '';
  prevScrnCngInd = '';
  prevReturnPgm = '';
  prevCallFromId = '';
  prevLinkLen = 0;
  prevMbrId = 0;
  prevClmId = '';
  prevQualitlityReview = '';
  prevScreenRows: PrevScreenRow[] = [];
  prevSaveScreen = '';
  prevRevalidation = '';
}

import {OvPayRhScreenCommarea} from './ov-pay-rh-screen-commarea.model';

/**
 * Model class OvPayRefHistCommarea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::OvPayRefHistCommarea
 * Legacy Mapping: REF-HIST-COMMAREA
 */
export class OvPayRefHistCommarea {
  rhScreenCommareas: OvPayRhScreenCommarea[] = [];
  rhsEibtrnid = '';
  rhsResp1 = '';
  rhsResp2 = '';
  rhsHistoryInd = '';
  rhsConfirmInd = '';
  rhsCounter = 0;
  rhsPointer = 0;
  rhsPageNo = 0;
  rhsNoOfPages = 0;
  rhsSaveMap = '';
  rhsMapSub = 0;
  rhsLastRefundDate = 0;
  rhsOpAmtRepaidProv = 0;
  rhsOpAmtRepaidIns = 0;
  rhsOpAmtUnresProv = 0;
  rhsOpAmtUnresIns = 0;
  rhsOpStatus = '';
  filler79 = '';
}

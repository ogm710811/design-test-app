import {OvPayComMembTbl} from './ov-pay-com-memb-tbl.model';

/**
 * Model class OvPayComMembArea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::OvPayComMembArea
 * Legacy Mapping: COM-MEMB-AREA
 */
export class OvPayComMembArea {
  comMembTbls: OvPayComMembTbl[] = [];
  comPageCounter = 0;
  comPageIndx = 0;
  comTotalClaims = 0;
  comFiller = '';
}

import {XpndClmSegTable} from './xpnd-clm-seg-table.model';

/**
 * Model class XpndClmSeg
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::XpndClmSeg
 * Legacy Mapping: EX-CLAIM-SEG
 */
export class XpndClmSeg {
  claimCtr = 0;
  claimTables: XpndClmSegTable[] = [];
}

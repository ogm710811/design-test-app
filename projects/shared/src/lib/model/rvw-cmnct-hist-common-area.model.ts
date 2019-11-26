//  import { XpndAltAdrSeg } from '../commonarea/xpnd-alt-adr-seg.model';
//  import { XpndBillRecSeg } from '../commonarea/xpnd-bill-rec-seg.model';
//  import { XpndClmBasicSeg } from '../commonarea/xpnd-clm-basic-seg.model';
//  import { XpndClmHeadSeg } from '../commonarea/xpnd-clm-head-seg.model';
//  import { XpndClmMiscSeg } from '../commonarea/xpnd-clm-misc-seg.model';
//  import { XpndClmNoteSeg } from '../commonarea/xpnd-clm-note-seg.model'
//  import { XpndClmSeg } from '../commonarea/xpnd-clm-seg.model';
//  import { XpndDedAggrSeg } from '../commonarea/xpnd-ded-aggr-seg.model';
//  import { XpndInsdNoteSeg } from '../commonarea/xpnd-insd-note-seg.model';
//  import { CorrespondenceTable } from './correspondence-table.model';
//  import { DkComm } from './dk-comm.model';
//  import {CmnctSuspSegPO} from "../common/cmnct-susp-seg-po.model";
//  import {CommComm} from "./comm-comm.model";

import {CmnctSuspSegPO} from '../pos/cmnct-susp-seg-po.model';
import {CommComm} from './comm-comm.model';
import {XpndAltAdrSeg} from './commonarea/xpnd-alt-adr-seg.model';
import {XpndBillRecSeg} from './commonarea/xpnd-bill-rec-seg.model';
import {XpndClmBasicSeg} from './commonarea/xpnd-clm-basic-seg.model';
import {XpndClmHeadSeg} from './commonarea/xpnd-clm-head-seg.model';
import {XpndClmMiscSeg} from './commonarea/xpnd-clm-misc-seg.model';
import {XpndClmNoteSeg} from './commonarea/xpnd-clm-note-seg.model';
import {XpndClmSeg} from './commonarea/xpnd-clm-seg.model';
import {XpndDedAggrSeg} from './commonarea/xpnd-ded-aggr-seg.model';
import {XpndInsdNoteSeg} from './commonarea/xpnd-insd-note-seg.model';
import {CorrespondenceTable} from './correspondence-table.model';
import {DkComm} from './dk-comm.model';

// **
// * Model class RvwCmnctHistCommonArea
// * Path: bean/reviewcommarea
// * Model: com::uhc::aarp::fox::domain::bean::reviewcommarea::RvwCmnctHistCommonArea
// */

export class RvwCmnctHistCommonArea {
  cmnctSuspSeg = new CmnctSuspSegPO();
  line = 0;
  screenSent = 0;
  dkComm = new DkComm();
  correspondenceTable = new CorrespondenceTable();
  comComm = new CommComm();
  xpndClmBasicSeg = new XpndClmBasicSeg();
  xpndAltAdrSeg = new XpndAltAdrSeg();
  xpndInsdNoteSeg = new XpndInsdNoteSeg();
  xpndDedAggrSeg = new XpndDedAggrSeg();
  XpndClmSeg = new XpndClmSeg();
  xpndBillRecSeg = new XpndBillRecSeg();
  xpndClmNoteSeg = new XpndClmNoteSeg();
  xpndClmMiscSeg = new XpndClmMiscSeg();
  xpndClmHeadSeg = new XpndClmHeadSeg();
  eibTrnId = '';
  command = '';
  commNbr = '';
  memberId = '';
}

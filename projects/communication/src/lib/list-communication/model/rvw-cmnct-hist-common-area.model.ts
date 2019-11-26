import {
  CmnctSuspSegPO,
  CommComm,
  CorrespondenceTable,
  DkComm,
  XpndAltAdrSeg,
  XpndBillRecSeg,
  XpndClmBasicSeg,
  XpndClmHeadSeg,
  XpndClmMiscSeg,
  XpndClmNoteSeg,
  XpndClmSeg,
  XpndDedAggrSeg,
  XpndInsdNoteSeg
} from '@fox/shared';
import {Claimprocsysmenu} from './claimprocsysmenu.model';

/**
 * Model class RvwCmnctHistCommonArea
 * Path: screenbean/rvwcmncthist
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwcmncthist::RvwCmnctHistCommonArea
 */
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
  claimMenu = new Claimprocsysmenu();
  commNbr = '';
  memberId = '';
}

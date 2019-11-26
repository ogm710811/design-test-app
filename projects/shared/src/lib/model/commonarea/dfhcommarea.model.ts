import {ClmNbrFileMntCmnArea} from '../clm-nbr-file-mnt-cmn-area.model';
import {DrugAccessLnkArea} from '../drug-access-lnk-area.model';
import {EobReplCmnArea} from '../eob-repl-cmn-area.model';
import {OperDfltCmnArea} from '../oper-dflt-cmn-area.model';
import {OperDfltOvrdCvSetQualityCombination} from '../oper-dflt-ovrd-cv-set-quality-combination.model';
import {OperInfoCmnArea} from '../oper-info-cmn-area.model';
import {OperStatCmnArea} from '../oper-stat-cmn-area.model';
import {OprecRecord} from '../oprec-record.model';
import {PlanInfoCmnArea} from '../plan-info-cmn-area.model';
import {QualityCommArea} from '../qualcommarea/quality-comm-area.model';
import {QualityReviewRecord} from '../qualcommarea/quality-review-record.model';
import {BLTempStorQueue} from '../tsq/bltempstor/bltemp-stor-queue.model';
import {ClaimNumberRangeFileRecord} from './claim-number-range-file-record.model';
import {CommComm} from './comm-comm.model';
import {OperFileCmnArea} from './oper-file-cmn-area.model';
import {OvPayCmnArea} from './ov-pay-cmn-area.model';
import {ProcClmCmnArea} from './proc-clm-cmn-area.model';
import {XpndAltAdrSeg} from './xpnd-alt-adr-seg.model';
import {XpndBillRecSeg} from './xpnd-bill-rec-seg.model';
import {XpndClmBasicSeg} from './xpnd-clm-basic-seg.model';
import {XpndClmHeadSeg} from './xpnd-clm-head-seg.model';
import {XpndClmMiscSeg} from './xpnd-clm-misc-seg.model';
import {XpndClmNoteSeg} from './xpnd-clm-note-seg.model';
import {XpndClmSeg} from './xpnd-clm-seg.model';
import {XpndDedAggrSeg} from './xpnd-ded-aggr-seg.model';
import {XpndInsdNoteSeg} from './xpnd-insd-note-seg.model';

/**
 * Model class Dfhcommarea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::Dfhcommarea
 * Legacy Mapping: DFHCOMMAREA
 */
export class Dfhcommarea {
  exAltAddressSeg = new XpndAltAdrSeg();
  exClaimHdrFields = new XpndClmHeadSeg();
  exClaimMiscSeg = new XpndClmMiscSeg();
  operatorCommareaLayout = new OperFileCmnArea();
  exClaimNoteSeg = new XpndClmNoteSeg();
  exInsuredNoteSeg = new XpndInsdNoteSeg();
  exClaimSeg = new XpndClmSeg();
  processClaimCommarea = new ProcClmCmnArea();
  cioIonsId = 0;
  cioLocation = 0;
  cioSubSystemInd = '';
  command = '';
  segmentId = '';
  basicKey = 0;
  claimBatchNo = '';
  newBasicKey = 0;
  returnCde = '';
  returnMessage = '';
  errorCondition = '';
  action = 0;
  exBasicClaimSeg = new XpndClmBasicSeg();
  exDeductAggrSeg = new XpndDedAggrSeg();
  exBillSeg = new XpndBillRecSeg();
  commComm = new CommComm();
  exMicroflmSeg = new ClaimNumberRangeFileRecord();
  eibTermId = '';
  eibTaskN = '';
  ovPayCmnArea = new OvPayCmnArea();
  filler = '';
  callingProgram = '';
  nextProgram = '';
  eibTrnId = '';
  clmNbrFileMntCmnArea = new ClmNbrFileMntCmnArea();
  planInfoCmnArea = new PlanInfoCmnArea();
  operDfltCmnArea: OperDfltCmnArea[] = [];
  operInfoCmnArea = new OperInfoCmnArea();
  operStatCmnArea = new OperStatCmnArea();
  eobReplCmnArea = new EobReplCmnArea();
  sqCombos: OperDfltOvrdCvSetQualityCombination[] = [];
  qualityCommArea = new QualityCommArea();
  oprecRecord = new OprecRecord();
  qualityReview = new QualityReviewRecord();
  drugAccessLnkArea = new DrugAccessLnkArea();
  blTempStoreQueueList: BLTempStorQueue[] = [];
}

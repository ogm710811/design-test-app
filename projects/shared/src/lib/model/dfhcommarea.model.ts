import {ProcClmHospChrg} from './claim-processing/proc-clm-hosp-chrg.model';
import {ClaimNumberRangeFileRecord} from './claim-number-range-file-record.model';
import {ClmNbrFileMntCmnArea} from './clm-nbr-file-mnt-cmn-area.model';
import {CommComm} from './comm-comm.model';
import {QualityCommArea} from './commonarea/quality-comm-area.model';
import {XpndAltAdrSeg} from './commonarea/xpnd-alt-adr-seg.model';
import {XpndBillRecSeg} from './commonarea/xpnd-bill-rec-seg.model';
import {XpndClmBasicSeg} from './commonarea/xpnd-clm-basic-seg.model';
import {XpndClmHeadSeg} from './commonarea/xpnd-clm-head-seg.model';
import {XpndClmMiscSeg} from './commonarea/xpnd-clm-misc-seg.model';
import {XpndClmNoteSeg} from './commonarea/xpnd-clm-note-seg.model';
import {XpndClmSeg} from './commonarea/xpnd-clm-seg.model';
import {XpndDedAggrSeg} from './commonarea/xpnd-ded-aggr-seg.model';
import {XpndInsdNoteSeg} from './commonarea/xpnd-insd-note-seg.model';
import {DupCheckBillLineResponseVO} from './duplicate-check-billline-response-vo.model';
import {EobReplCmnArea} from './eob-repl-cmn-area.model';
import {OperDfltCmnArea} from './oper-dflt-cmn-area.model';
import {OperDfltOvrdCvSetQualityCombination} from './oper-dflt-ovrd-cv-set-quality-combination.model';
import {OperFileCmnArea} from './oper-file-cmn-area.model';
import {OperInfoCmnArea} from './oper-info-cmn-area.model';
import {OprecRecord} from './oprec-record.model';
import {OvPayCmnArea} from './ov-pay-cmn-area.model';
import {PlanInfoCmnArea} from './plan-info-cmn-area.model';
import {ProcClmCmnArea} from './proc-clm-cmn-area.model';
import {QualityReviewRecord} from './quality-review-record.model';
import {ScreenProcclmTos} from './screen-procclm-tos.model';
import {BLTempStorQueue} from './tsq/bltempstor/bltemp-stor-queue.model';

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
  dupCheckBillLineResponseVO = new DupCheckBillLineResponseVO();
  chargeLineDuplicateIndicatorsPerScreen = {};
  cioIonsId = 0;
  cioLocation = 0;
  cioSubSystemInd = '';
  command = '';
  segmentId = '';
  basicKey = 0;
  claimBatchNo = '';
  newBasicKey = 0;
  returnCde = '';
  returnInd = '';
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
  eobReplCmnArea = new EobReplCmnArea();
  sqCombos: OperDfltOvrdCvSetQualityCombination[] = [];
  qualityCommArea = new QualityCommArea();
  oprecRecord = new OprecRecord();
  qualityReview = new QualityReviewRecord();
  screenProcClmHospChrg = new ProcClmHospChrg();
  blTempStoreQueueList: BLTempStorQueue[] = [];
  screenProcclmTos = new ScreenProcclmTos();
}

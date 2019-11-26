// import { PlanStateInformationPlanRecordPO } from '../../common/pos/plan-state-information-plan-record-po.model';
import {
  BLTempStorQueue,
  ClaimEligibilityTsQueue,
  EligibilityIoArea,
  Link7o20BmEntry,
  Oprec1Record,
  PlanStateInformationPlanRecordPO,
  QualityCommAreaFieldsFor06o75,
  Rpd05o46Linkage
} from '@fox/shared';
import {RelatedHospClaim} from './related-hosp-claim.model';
import {WsCriticalErrorMessage} from './ws-critical-error-message.model';
import {WsMembershipIdR} from './ws-membership-id-r.model';
import {WsTsq} from './ws-tsq.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwrvldmiscinfo
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvldmiscinfo::WorkStorage
 * Legacy Mapping: WORK-AREA
 */
export class WorkStorage {
  pgmComm = '';
  tsItem = 0;
  wsReadNotfnd = '';
  tsTermId = '';
  cnt = 0;
  cntNotValued = 0;
  quotient = 0;
  mult = 0;
  prime = 0;
  remain = 0;
  binAns = 0;
  ans1 = 0;
  perPos = 0;
  threePos = 0;
  wmentalIcdInd = '';
  commandEnteredInd = '';
  alternateAddressInd = '';
  wsDenialMsgNumber = 0;
  stateKey = '';
  wsResponseCode = 0;
  ceTsqItem = 0;
  ceTsqResponse = 0;
  blEof = '';
  totBlTsqItems = 0;
  blItems = 0;
  oprecDummy = '';
  wkPlanPos1 = '';
  wkPlanPos2 = '';
  wsUnderwrMedselectPlans = '';
  mapPlanInd = '';
  wicdCode3 = '';
  leftJustifys: string[] = [];
  screenError = '';
  enterLits: string[] = [];
  enterType: string[] = [];
  enterField: string[] = [];
  commaInd = '';
  error84 = '';
  reasonInd = '';
  replyPf9 = '';
  relatedPlan = '';
  relatedCharge = 0;
  qualSuspend = '';
  medicareSupplementInd = '';
  wsDate = 0;
  wsDateYy = 0;
  wsDateMm = 0;
  wsDateDd = 0;
  wpatternParagraphs: number[] = [];
  wvariableDeductible = 0;
  wvariableYear = 0;
  wvariablePlan = '';
  wsRpdiskqbType = 0;
  wsRpdiskqbPlan = '';
  wsRpdiskqbInd = '';
  wsClPpInd = '';
  wsClSmInd = '';
  wsBlPpInd = '';
  wsBlSmInd = '';
  wsBlPlanCd = [];
  wsBlPlanInd = [];
  sub = 0;
  xsub = 0;
  sub1 = 0;
  subi = 0;
  blSub = 0;
  rea = 0;
  var = 0;
  chg = 0;
  ins = 0;
  inv = 0;
  codeSub = 0;
  reasSub = 0;
  lineSub = 0;
  sortCtr1 = 0;
  sortCtr2 = 0;
  stSub1 = 0;
  stSub2 = 0;
  stSub3 = 0;
  wsErrorCode = '';
  sortField1a = '';
  sortField1b = '';
  sortField2a = '';
  sortField2b = '';
  planStateInformationPlanRecord = new PlanStateInformationPlanRecordPO();
  link7o20 = new Link7o20BmEntry();
  eligibilityIoArea = new EligibilityIoArea();
  claimEligibilityTsQueue = new ClaimEligibilityTsQueue();
  wsMembershipIdR = new WsMembershipIdR();
  wsCriticalErrorMessage = new WsCriticalErrorMessage();
  wsTsq = new WsTsq();
  bLTempStorQueue = new BLTempStorQueue();
  oprec1Record = new Oprec1Record();
  clmEligLinkageArea = new ClaimEligibilityTsQueue();
  rpd05o46Linkage = new Rpd05o46Linkage();
  stopProcessing = false;
  billLineTable = [];
  qualityInfoRecord: any;
  qualityCommAreaFieldsFor06o75 = new QualityCommAreaFieldsFor06o75();
  relatedHospClaim = new RelatedHospClaim();
  qualReasonsRedef = [];
}

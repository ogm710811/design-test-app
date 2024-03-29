import {BenCalcTsError} from './ben-calc-ts-error.model';
import {BencalcNopayErrMsg} from './bencalc-nopay-err-msg.model';
import {CelCicsErrRec} from './cel-cics-err-rec.model';
import {CelFormatInfo} from './cel-format-info.model';
import {CkLineUsage} from './ck-line-usage.model';
import {ErrScreenMsg} from './err-screen-msg.model';
import {ExBillSeg1} from './ex-bill-seg1.model';
import {ExTsqClaimHdrFields} from './ex-tsq-claim-hdr-fields.model';
import {ExTsqClaimSeg} from './ex-tsq-claim-seg.model';
import {Filler107} from './filler107.model';
import {Filler14} from './filler14.model';
import {Filler15} from './filler15.model';
import {Filler16} from './filler16.model';
import {Filler17} from './filler17.model';
import {Filler18} from './filler18.model';
import {Filler19} from './filler19.model';
import {Filler20} from './filler20.model';
import {Filler21} from './filler21.model';
import {Filler22} from './filler22.model';
import {Filler23} from './filler23.model';
import {Filler24} from './filler24.model';
import {Filler25} from './filler25.model';
import {Filler27} from './filler27.model';
import {Filler28} from './filler28.model';
import {Filler75} from './filler75.model';
import {Filler76} from './filler76.model';
import {Filler77} from './filler77.model';
import {Filler94} from './filler94.model';
import {IcdAreaIn} from './icd-area-in.model';
import {IcdIcdtVicdt01b} from './icd-icdt-vicdt01b.model';
import {IcdToFromSvcDts} from './icd-to-from-svc-dts.model';
import {LeapYrJulianDays} from './leap-yr-julian-days.model';
import {LinkRpd06o24Error} from './link-rpd06o24-error.model';
import {NonLeapYrJulianDays} from './non-leap-yr-julian-days.model';
import {NpiAreaIn} from './npi-area-in.model';
import {NpiReturnInfo} from './npi-return-info.model';
import {PayAfterTermErrMsg} from './pay-after-term-err-msg.model';
import {ProcClmNursingChrgService} from './proc-clm-nursing-chrg-service.model';
import {ReturnCdeErrorMessage} from './return-cde-error-message.model';
import {Rpd09o70Linkage} from './rpd09o70-linkage.model';
import {SaveSerFromYmd} from './save-ser-from-ymd.model';
import {SaveSerToYmd} from './save-ser-to-ymd.model';
import {ScreenChargeLine} from './screen-charge-line.model';
import {ScreenDate} from './screen-date.model';
import {ScreenDate2} from './screen-date2.model';
import {ScreenEffDate} from './screen-eff-date.model';
import {ScreenIcdCodes} from './screen-icd-codes.model';
import {TempStorageError} from './temp-storage-error.model';
import {TempStorageError1} from './temp-storage-error1.model';
import {TempStorageError2} from './temp-storage-error2.model';
import {TempStorageError3} from './temp-storage-error3.model';
import {TosDateErrorMsg} from './tos-date-error-msg.model';
import {TosSerFromYmd} from './tos-ser-from-ymd.model';
import {TosSerToYmd} from './tos-ser-to-ymd.model';
import {TypeOfPlans} from './type-of-plans.model';
import {ValidExcludedPlanTable} from './valid-excluded-plan-table.model';
import {WkPlan} from './wk-plan.model';
import {WsAccountNumber} from './ws-account-number.model';
import {WsAdtnlNurseInfo} from './ws-adtnl-nurse-info.model';
import {WsBenefitMaxLine} from './ws-benefit-max-line.model';
import {WsBenefitPeriodPlanTable} from './ws-benefit-period-plan-table.model';
import {WsBlChrgIoArea} from './ws-bl-chrg-io-area.model';
import {WsBlChrgLineRec} from './ws-bl-chrg-line-rec.model';
import {WsBlTsqName} from './ws-bl-tsq-name.model';
import {WsDAWarningMsg} from './ws-dawarning-msg.model';
import {WsDbDateFormat} from './ws-db-date-format.model';
import {WsEndDate1Ymd} from './ws-end-date1-ymd.model';
import {WsEndDate2Ymd} from './ws-end-date2-ymd.model';
import {WsErrMsgArea} from './ws-err-msg-area.model';
import {WsIcdCode} from './ws-icd-code.model';
import {WsJesMsg} from './ws-jes-msg.model';
import {WsLuwErrorMsg} from './ws-luw-error-msg.model';
import {WsNcChrgIoArea} from './ws-nc-chrg-io-area.model';
import {WsNcChrgLineRec} from './ws-nc-chrg-line-rec.model';
import {WsNcErrorMsg} from './ws-nc-error-msg.model';
import {WsNcErrorMsg2} from './ws-nc-error-msg2.model';
import {WsNcTsqName} from './ws-nc-tsq-name.model';
import {WsPlanCodeData} from './ws-plan-code-data.model';
import {WsPlanCodeTable} from './ws-plan-code-table.model';
import {WsQueueName} from './ws-queue-name.model';
import {WsScreenCptMod} from './ws-screen-cpt-mod.model';
import {WsSortedBpPlanTable} from './ws-sorted-bp-plan-table.model';
import {WsStartDate1Ymd} from './ws-start-date1-ymd.model';
import {WsStartDate2Ymd} from './ws-start-date2-ymd.model';
import {WsTsqDateFormat} from './ws-tsq-date-format.model';
import {Ws1Noh} from './ws1-noh.model';
import {Ws2Noh} from './ws2-noh.model';
import {ZxDeductAggrSeg} from './zx-deduct-aggr-seg.model';

/**
 * Model class WorkStorage
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::WorkStorage
 * Legacy Mapping: WS-SUBSCRIPTS
 */
export class WorkStorage {
  wsRpd09o70Linkage = '';
  rpd09o70Linkage = new Rpd09o70Linkage();
  commandEnteredInd = '';
  modCommLength = 0;
  editField10 = 0;
  editReturnCode = '';
  leftFields = 0;
  validLeftFieldLen = 0;
  posAfterDecimal = 0;
  editField6Pos = 0;
  editField7Pos = 0;
  editField8Pos = 0;
  editField9Pos = 0;
  editField10Pos = 0;
  inputFieldLen = 0;
  editSub = 0;
  outputSub = 0;
  saveSub = 0;
  compressSub = 0;
  decimalInd = '';
  validCharInd = '';
  compressErrorInd = '';
  wsIcdCode = new WsIcdCode();
  wsIcdMapField1i = '';
  wsIcdMapField2i = '';
  wsIcdMapField3i = '';
  wsIcdCheckIndicator = '';
  wsIcdCicsExepInd = '';
  icdCodeValueInd = '';
  icdCodeErrorInd = '';
  icdCodeError2Ind = '';
  wsErrMsgArea = new WsErrMsgArea();
  screenDate = new ScreenDate();
  screenDate2 = new ScreenDate2();
  screenEffDate = new ScreenEffDate();
  dateYmd = 0;
  filler14 = new Filler14();
  workDate = 0;
  filler15 = new Filler15();
  workDate2 = 0;
  filler16 = new Filler16();
  saveEligTermDate = 0;
  filler17 = new Filler17();
  saveEligEffDate = 0;
  filler18 = new Filler18();
  saveSerDate = 0;
  filler19 = new Filler19();
  saveSerFromYmd = new SaveSerFromYmd();
  saveSerToYmd = new SaveSerToYmd();
  tosSerFromYmd = new TosSerFromYmd();
  tosSerToYmd = new TosSerToYmd();
  saveTermDate = 0;
  filler20 = new Filler20();
  save60TermDate = 0;
  filler21 = new Filler21();
  save90TermDate = 0;
  filler22 = new Filler22();
  saveBenefitExtensionDate = 0;
  saveEffDate = 0;
  filler23 = new Filler23();
  saveEffDatePlus3 = 0;
  filler24 = new Filler24();
  saveTermDateMdy = 0;
  filler25 = new Filler25();
  wsStartDate1Ymd = new WsStartDate1Ymd();
  wsStartDate2Ymd = new WsStartDate2Ymd();
  wsEndDate1Ymd = new WsEndDate1Ymd();
  wsEndDate2Ymd = new WsEndDate2Ymd();
  earliestEffDate = 0;
  filler27 = new Filler27();
  latestTermDate = 0;
  filler28 = new Filler28();
  beforeEffInd = '';
  afterTermInd = '';
  julianFromDays = 0;
  julianToDays = 0;
  noDaysOfService = 0;
  ws1Noh = new Ws1Noh();
  wsNohNum = 0;
  ws2Noh = new Ws2Noh();
  wsNoPayPlan = '';
  wsPlanCodeData = new WsPlanCodeData();
  wkPlan = new WkPlan();
  ckLineUsage = new CkLineUsage();
  saveProvider = '';
  saveProvider9 = 0;
  claimQueueLength = 0;
  holdRecNbr = 0;
  wsQueueItemno = 0;
  wsQueueName = new WsQueueName();
  tempStorageError = new TempStorageError();
  tempStorageError1 = new TempStorageError1();
  tempStorageError2 = new TempStorageError2();
  tempStorageError3 = new TempStorageError3();
  linkRpd06o24Error = new LinkRpd06o24Error();
  benCalcTsError = new BenCalcTsError();
  wsNcErrorMsg = new WsNcErrorMsg();
  bencalcNopayErrMsg = new BencalcNopayErrMsg();
  payAfterTermErrMsg = new PayAfterTermErrMsg();
  tosDateErrorMsg = new TosDateErrorMsg();
  wsNcErrorMsg2 = new WsNcErrorMsg2();
  wsDAWarningMsg = new WsDAWarningMsg();
  returnCdeErrorMessage = new ReturnCdeErrorMessage();
  wsShiftsAggrSave = 0;
  wsShiftsAggrSaveX = '';
  wsBenefitMaxLine = new WsBenefitMaxLine();
  errMsg = '';
  errCnt = 0;
  saveDateSeg = '';
  savePlanSeg = '';
  excludedPlan = '';
  yearDivide = 0;
  leapChk = 0;
  savePlan = '';
  shiftMaxOrMin = 0;
  saveAggr = 0;
  holdCautionNumber = 0;
  holdCautionVariable = '';
  filler75 = new Filler75();
  filler76 = new Filler76();
  wsPlanCodeTables: WsPlanCodeTable[] = [];
  sub = 0;
  subz = 0;
  sub1 = 0;
  sub2 = 0;
  sub3 = 0;
  sub4 = 0;
  recSub = 0;
  psub = 0;
  sub7 = 0;
  screenSub = 0;
  eligSub = 0;
  wsNcErrorSub = 0;
  securitySub = 0;
  baseSub = 0;
  planSub = 0;
  planSub1 = 0;
  tosSub = 0;
  planSubSent = 0;
  filler77 = new Filler77();
  wsNcTsqResp = 0;
  wsBlTsqResp = 0;
  wsNopaySw = '';
  invalidProInd = '';
  dateErr = '';
  validExcludedPlanInd = '';
  providerErrorInd = '';
  typeErrorInd = '';
  serFromErrorInd = '';
  serToErrorInd = '';
  nosErrorInd = '';
  nohErrorInd = '';
  chargeErrorInd = '';
  preExistErrorInd = '';
  noPayErrorInd = '';
  noPayPlErrorInd = '';
  tsqNcEofInd = '';
  tsqBlEofInd = '';
  csrChrgEofInd = '';
  csrIcdcEofInd = '';
  csrExclEofInd = '';
  excludedPlanErrorInd = '';
  validExcludedPlansInd = '';
  planFoundInd = '';
  tosFoundInd = '';
  spanEffErrorInd = '';
  afterTermErrorInd = '';
  benefitExtensionErrorInd = '';
  consistTypeError1Ind = '';
  consistNosError1Ind = '';
  consistNosNohError1Ind = '';
  consistNosNohError2Ind = '';
  consistNohErrorInd = '';
  consistSerError1Ind = '';
  consistSerError2Ind = '';
  consistSerError3Ind = '';
  consistPreExistErrorInd = '';
  consistPre1989ErrorInd = '';
  warningForPlanSentInd = '';
  twM347S34P37J3Ind = '';
  otherPlanFoundInd = '';
  a010185ErrorInd = '';
  tosDateErrorInd = '';
  consistPeTermErrorInd = '';
  bencalcNopayErrInd = '';
  typeOfPlans = new TypeOfPlans();
  termPlanErrorInd = '';
  benefitPeriodInd = '';
  excludedPlanInd = '';
  duplicateFoundInd = '';
  messageKey = 0;
  validExcludedPlanTable = new ValidExcludedPlanTable();
  wsBenefitPeriodPlanTable = new WsBenefitPeriodPlanTable();
  saveSortedBpPlanLine1 = '';
  saveSortedBpPlanLine2 = '';
  wsSortedBpPlanTable = new WsSortedBpPlanTable();
  nonLeapYrJulianDays = new NonLeapYrJulianDays();
  filler94 = new Filler94();
  leapYrJulianDays = new LeapYrJulianDays();
  filler107 = new Filler107();
  wsProvider = '';
  wsTsqItem = 0;
  wsTsqNumItems = 0;
  wsTsqItemD = 0;
  wsTsqNumItemsD = 0;
  wsAccountNumber = new WsAccountNumber();
  wsDbDateFormat = new WsDbDateFormat();
  wsTsqDateFormat = new WsTsqDateFormat();
  wsTsqDateFormat9 = 0;
  wsScreenCptMod = new WsScreenCptMod();
  noPayPlanInd = '';
  alphanumericInd1 = '';
  alphanumericInd2 = '';
  wsAdtnlNurseInfos: WsAdtnlNurseInfo[] = [];
  mapCommandLine = '';
  screenIcdCodes: ScreenIcdCodes[] = [];
  screenChargeLines: ScreenChargeLine[] = [];
  screenExPay1L = 0;
  screenExPay1A = '';
  screenExPay1 = '';
  screenExPay2L = 0;
  screenExPay2A = '';
  screenExPay2 = '';
  screenAfterTermL = 0;
  screenAfterTermA = '';
  screenAfterTerm = '';
  icdCallingPgm = '';
  icdToFromSvcDts = new IcdToFromSvcDts();
  icdReturnCode = '';
  icdSqlCode = 0;
  icdAreaIn = new IcdAreaIn();
  icdInIcdtErrCodes: string[] = [];
  icdIcdtVicdt01b = new IcdIcdtVicdt01b();
  npiCallingPgm = '';
  npiReturnCode = '';
  npiAreaIn = new NpiAreaIn();
  npiReturnInfo = new NpiReturnInfo();
  npiErrorInfo = '';
  zxDeductAggrSeg = new ZxDeductAggrSeg();
  exTsqClaimSeg = new ExTsqClaimSeg();
  exTsqClaimHdrFields = new ExTsqClaimHdrFields();
  wsJesMsg = new WsJesMsg();
  celCicsErrRec = new CelCicsErrRec();
  celFormatInfo = new CelFormatInfo();
  errScreenMsg = new ErrScreenMsg();
  wsBlItemNum = 0;
  wsBlTsqNumItems = 0;
  wsBlTsqName = new WsBlTsqName();
  wsBlChrgIoArea = new WsBlChrgIoArea();
  wsBlChrgLineRecs: WsBlChrgLineRec[] = [];
  exBillSeg1 = new ExBillSeg1();
  wsNcItemNum = 0;
  wsNcTsqNumItems = 0;
  wsNcTsqName = new WsNcTsqName();
  wsNcChrgIoArea = new WsNcChrgIoArea();
  wsNcChrgLineRecs: WsNcChrgLineRec[] = [];
  procClmNursingChrgService = new ProcClmNursingChrgService();
  tsqNcEof = false;
  csrChrgEof = false;
  wsCptField = '';
  finishDi316 = '';
  wsLuwErrorMsg = new WsLuwErrorMsg();
  dialresp = '';
  checkingMod2 = '';
  wsModMsg = '';
  modMsgSetIndicator = '';
  modMsgUsedIndicator = '';
  modMsgSetIndicator2 = '';
  modMsgUsedIndicator2 = '';
  wsluwErrorMsg = '';
  cptCheckFail = '';
  wsCptErrorMsg = '';
  wsLuwModule = '';
  wsLuwRc = '';
  wsLuwObject = '';
  wsCptMsg = '';
  afterChKey = 0;
  afterPlnAfterTerm = '';
  afterChPartNum = 0;
}

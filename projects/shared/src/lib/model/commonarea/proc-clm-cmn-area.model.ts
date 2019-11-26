import {CautionGenericTable} from './caution-generic-table.model';
import {CautionHospTable} from './caution-hosp-table.model';
import {CautionMedSuppTable} from './caution-med-supp-table.model';
import {CautionServiceTable} from './caution-service-table.model';
import {CautionSuspClaimsTable} from './caution-susp-claims-table.model';
import {CautionSuspCommTable} from './caution-susp-comm-table.model';
import {ChrgLnPlanSub} from './chrg-ln-plan-sub.model';
import {CommumXrefNumbers} from './commum-xref-numbers.model';
import {CrossRefNumbers} from './cross-ref-numbers.model';
import {ElctrCmnArea} from './elctr-cmn-area.model';
import {EligibiltySelections} from './eligibilty-selections.model';
import {HoldQualityFlags} from './hold-quality-flags.model';
import {HospMessageInds} from './hosp-message-inds.model';
import {Hosp2MessageInds} from './hosp2-message-inds.model';
import {PlanPointerTable} from './plan-pointer-table.model';
import {ProClmCmnAreaScreenNumberPointer} from './pro-clm-cmn-area-screen-number-pointer.model';
import {ProcClmCmnAreaCaution62SuspComm} from './proc-clm-cmn-area-caution62-susp-comm.model';
import {ProcClmCmnAreaClaimNumberTable} from './proc-clm-cmn-area-claim-number-table.model';
import {ProcClmCmnAreaExceptIcdCode} from './proc-clm-cmn-area-except-icd-code.model';
import {ProcClmCmnAreaFcTripLine} from './proc-clm-cmn-area-fc-trip-line.model';
import {ProcClmCmnAreaHIcdCode} from './proc-clm-cmn-area-hicd-code.model';
import {ProcClmCmnAreaHoldInsuredNoteLine} from './proc-clm-cmn-area-hold-insured-note-line.model';
import {ProcClmCmnAreaMedSuppIcdCode} from './proc-clm-cmn-area-med-supp-icd-code.model';
import {ProcClmCmnAreaNcBpPlanTab} from './proc-clm-cmn-area-nc-bp-plan-tab.model';
import {ProcClmCmnAreaNyResidDates} from './proc-clm-cmn-area-ny-resid-dates.model';
import {ProcClmCmnAreaOopHospitalArea} from './proc-clm-cmn-area-oop-hospital-area.model';
import {ProcClmCmnAreaOopMedSuppArea} from './proc-clm-cmn-area-oop-med-supp-area.model';
import {ProcClmCmnAreaPlanFAggr2Information} from './proc-clm-cmn-area-plan-faggr2-information.model';
import {ProcClmCmnAreaPlanInformation} from './proc-clm-cmn-area-plan-information.model';
import {ProcClmCmnAreaPluBlInfo} from './proc-clm-cmn-area-plu-bl-info.model';
import {ProcClmCmnAreaRelatedSaveLine} from './proc-clm-cmn-area-related-save-line.model';
import {ProcClmCmnAreaSaveAllDuplicateBills} from './proc-clm-cmn-area-save-all-duplicate-bills.model';
import {ProcClmCmnAreaSuspClaimData} from './proc-clm-cmn-area-susp-claim-data.model';
import {TempCommunicationNums} from './temp-communication-nums.model';
import {TempCrossReferenceNums} from './temp-cross-reference-nums.model';

/**
 * Model class ProcClmCmnArea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::ProcClmCmnArea
 */
export class ProcClmCmnArea {
  linkageSwitch = '';
  screenInd = '';
  saveMemberNum = '';
  saveAssociation = '';
  saveLastName = '';
  saveFirstInitial = '';
  saveSex = '';
  dependentInsCode = 0;
  sponsorDeceasedDate = '';
  membershipNumber = '';
  association = '';
  nameCompressed = '';
  addressCompressed = '';
  cityCompressed = '';
  insuredState = '';
  dateOfBirth = 0;
  insuredLanguageInd = '';
  pc2ChAcctPartNum = 0;
  pc2AcctInfoKey = 0;
  claimNumber = 0;
  claimStatus = '';
  insuredCode = '';
  insSex = '';
  insSurname = '';
  insMidInitial = '';
  insFirstName = '';
  insHonorTitle = 0;
  insAddrLine1 = '';
  insAddrLine2 = '';
  insCity = '';
  insState = '';
  insZip = '';
  deceasedDate = '';
  deathBenefitLimit = 0;
  specialPayeeAggr = 0;
  tempOprecCtr = 0;
  planOverflowInd = '';
  planInformationCtr = 0;
  planCodeSpecialCharacter: string[] = [];
  planTosStateException = '';
  espPlanChangeInd = '';
  nyResidSub = 0;
  termCode = '';
  adminTermDate = '';
  paidThruDate = '';
  stateEffectiveDate = 0;
  saveCurrDateMdy = '';
  saveCurrDateYmd = '';
  insPartBDate = 0;
  planBRiderEffDate = 0;
  saveTypeCharge = '';
  serviceFromDate = '';
  serviceToDate = '';
  microfilmJulianDate = '';
  pf5TosSSet = '';
  exceptIcd10Ind = '';
  exceptChargeLineCtr = 0;
  hiIcd10Ind = '';
  hcChargeLineCtr = 0;
  hbBenefitLineCtr = 0;
  hospSub = 0;
  hospAgeChangeInd = '';
  hospPatientNo = '';
  tempPatientNo = '';
  medSupInpatInd = '';
  ihdWaiverPct = 0;
  hospMessageInds: HospMessageInds[] = [];
  relatedFirstInd = '';
  relatedPfInd = '';
  relatedLineCtr = 0;
  hosp2MessageInd: Hosp2MessageInds[] = [];
  medExcludedPlan1 = '';
  medExcludedPlan2 = '';
  medBenAfterTerm = '';
  medChargeLineCtr = 0;
  medBenefitLineCtr = 0;
  ncExcludedPlan1 = '';
  ncExcludedPlan2 = '';
  ncBenAfterTerm = '';
  ncChargeLineCtr = 0;
  ncBpPlanCtr = 0;
  ncBenefitLineCtr = 0;
  drugExcludedPlan1 = '';
  drugExcludedPlan2 = '';
  drugBenAfterTerm = '';
  drugChargeLineCtr = 0;
  drugBenefitLineCtr = 0;
  hhohExcludedPlan1 = '';
  hhohExcludedPlan2 = '';
  hhohBenAfterTerm = '';
  hhohChargeLineCtr = 0;
  hhohBenefitLineCtr = 0;
  medSuppBenAfterTermPlan = '';
  medSuppExclPlan1 = '';
  medSuppExclPlan2 = '';
  medSuppIcd10Ind = '';
  medSuppChargesInd = '';
  medSuppChargeLineCtr = 0;
  noPayIcdCode = '';
  noPayIcd10Ind = '';
  noPayChargesInd = '';
  noPayChargeLineCtr = 0;
  duplicateBillDone = '';
  duplicateBillType = 0;
  dlineSub = 0;
  dupSub = 0;
  dbSub = 0;
  dcSub = 0;
  saveDupBillCtr = 0;
  dupeBillTsqInd = '';
  saveEobsForDupBill = '';
  dupChgLinesToProc = 0;
  nonHospDupBill = '';
  hospDupBillCtr = 0;
  ckSpouseHistory = '';
  spSub = 0;
  dcTotSub = 0;
  dupBillFirstTimeInd = '';
  startingSub = 0;
  endingSub = 0;
  startingType = '';
  endingType = '';
  eobScreen = '';
  eobSubTotal = 0;
  eobMaxToAssignee = 0;
  eobFromDate = '';
  eobToDate = '';
  caution47Ind = '';
  hospEobInd = '';
  medsuppEobInd = '';
  servEobInd = '';
  drugEobInd = '';
  eobBillCtrH = 0;
  eobBillCtrM = 0;
  eobBillCtrS = 0;
  eobBillCtrD = 0;
  eobBillCtrN = 0;
  refReshowInd = '';
  refFirstTimeInd = '';
  numEobLinesDisplayed = 0;
  totalMessLines = 0;
  saveMaxAmtAssignee = 0;
  saveAssigneeAdj = 0;
  saveAdjustment = 0;
  coinsAmtApprvAmtScr = '';
  coinsAmtBillAmtScr = '';
  alTotalBene = '';
  alPerOfStay = '';
  alMedsuppLtrExhausted = '';
  alUPReduction = '';
  alPrivNurseShifts = '';
  alPrivNurse1stPay = '';
  alSkilledNursing = '';
  alPayAdj = '';
  alSpecPayee = '';
  alPdnUpBene = '';
  alForeignProvider = '';
  holdQualityFlags: HoldQualityFlags[] = [];
  hospPosRelSig = '';
  newHospAdded = '';
  newDocAdded = '';
  alWaiverPremium = '';
  alDeceasedInsured = '';
  waiverEndDate = '';
  waiverInd = '';
  waiverPlanInd = '';
  theWaiverPlan = '';
  theWaiverPlanInd = '';
  waiverStartDate = '';
  waiverStIhdPercX = '';
  waiverStCoInPercX = '';
  medicareSelectClmType = '';
  suspendedClaimInd = '';
  suspendedFromTosInd = '';
  suspendedFromEobInd = '';
  suspendedProcessing = '';
  susReasonPos1 = '';
  susReasonPos2 = '';
  tempClaimNote = '';
  suspClaimsShown = '';
  suspClaimsCnt = 0;
  suspCorrShown = '';
  suspCorrCnt = 0;
  suspProtFlag = '';
  origSuspProtFlag = '';
  pfProvId = 0;
  pfNewProvInd = '';
  pfAssignHosp = '';
  pfProvSel = '';
  pfSearchCriteria = '';
  pfTinInd = '';
  pfKeyType = '';
  pfName = '';
  pfAddress = '';
  pfCityStZip = '';
  pfAcceptCode1 = '';
  pfAcceptCode2 = '';
  pfHospAgency = '';
  pfProvSaveKey = 0;
  pfProvPercent = 0;
  pfForeignProvInd = '';
  hpProvMedKeyMpinLabel = '';
  hpProvMedKeyMpinNumber = '';
  pfMedKeyMpin = '';
  theProviderInd = '';
  providerBuwIndicator = '';
  mapSent = '';
  prRecFound = '';
  saveScrollInd = '';
  nameKeySaved1 = '';
  nameKeySaved3 = '';
  actionOnAddress = '';
  actionOnSpecPayee = '';
  actionOnInsNote = '';
  altAddrWasSpaces = '';
  splitNoSub = 0;
  availableSplitNo = '';
  suspendedSplitNo = 0;
  m20FuncType = '';
  m20FileType = '';
  m20RcodeType = '';
  m20FuncByte1 = '';
  m20FuncCode = '';
  m20ReturnCode = '';
  m20FuncLowByte = '';
  splitClaimInd = '';
  messageModInd = '';
  abnormalRetInd = '';
  commareaReadInd = '';
  selectionLiteralInd = '';
  adjInd = '';
  mailingAddrInd = '';
  benefitOverZeroInd = '';
  ncMaxLines = '';
  noPayInd = '';
  noPayProcessInd = '';
  claimTsqError = '';
  suspFromNopayInd = '';
  hospitalReturnInd = '';
  deductCarryoverCode = '';
  ioErrorInMod20 = '';
  graceReprocessInd = '';
  h0Indicator = '';
  sendNoMoneyInd = '';
  spouseExistsInd = '';
  addrHistTransferInd = '';
  insStateTransferInd = '';
  ecStateInd = '';
  caution50Ind = '';
  overpaymentClaimInd = '';
  icdMentalHealthInd = '';
  erisaDatesValuedInd = '';
  sentErisaMessage = '';
  erisaMayApplyInd = '';
  hospErisaPpAdded = '';
  msupErisaPpAdded = '';
  servErisaPpAdded = '';
  texasMapWarning = '';
  texasMapCaution = '';
  commAllPlansTermedInd = '';
  preventiveWarning = '';
  preventiveWarning09 = '';
  medInd = '';
  altAddressWasChanged = '';
  holdHicNumber = '';
  rpdiskcwHicExistsInd = '';
  hicNumberExistsInd = '';
  chClaimInd = '';
  interestCautionPrompt = '';
  interestWarnRate = '';
  intLinePresent = '';
  foreignCoverage = '';
  fcTripStartDateYmd = '';
  nonbypassComboReason = '';
  nonbypassPlanInd = '';
  nonbypassPlan = '';
  nonbypassPlanSel = '';
  genCautionSub = 0;
  hospCautionSub = 0;
  medCautionSub = 0;
  servCautionSub = 0;
  noOfClaimCautions = 0;
  noOfCommCautions = 0;
  statsNoPay = 0;
  statsPays = 0;
  statsSuspended = 0;
  statsQuality = 0;
  startTime = 0;
  electClaimSuspCode = '';
  electLocation = 0;
  electRefDate = 0;
  electSequenceNo = 0;
  electAixInd = '';
  electClaimNo = 0;
  electScreenRefDate = 0;
  electPcSuspLinkInd = '';
  electEobType = '';
  electReadNextRecInd = '';
  electAarpAssignInd = '';
  electClaimSuspenseInd = '';
  electProvId = 0;
  electTinKey = '';
  electHospProvLookup = '';
  holdClaimNote = '';
  holdApprovalCode = 0;
  snNopaySub = 0;
  denialMsgIndicator = '';
  sentMessageInd: string[] = [];
  sentMessage21 = '';
  sentMessage22 = '';
  sentMessage23 = '';
  sentMessage24 = '';
  sentMessage25 = '';
  sentMessage26 = '';
  sentMessage27 = '';
  sentMessage28 = '';
  sentMessage29 = '';
  sentMessage30 = '';
  sentMessage31 = '';
  sentMessage32 = '';
  sentMessage33 = '';
  sentMessage34 = '';
  sentMessage35 = '';
  sentMessage36 = '';
  sentMessage37 = '';
  sentMessage38 = '';
  sentMessage39 = '';
  sentMessage40 = '';
  sentMedselectMsg = '';
  medicaidMsgSent = '';
  medicaidMsgInd = '';
  planCbMsg = '';
  depdSponsorDodInd = '';
  graceLetterDate = '';
  graceStatusInd = '';
  fekServiceIndicator = '';
  fekClaimIndicator = '';
  posInd = '';
  fekBillLineType = '';
  pceTsqPrefix = '';
  pceTsqAccount = '';
  pceTsqEibtaskn = 0;
  pc2BenModIndI = '';
  pc2BenModIndS = '';
  pc2BenModIndP = '';
  pc2BenModIndD = '';
  pc2BenModMsgInd = '';
  pc2BenModWarning = '';
  pc2SnfDosFrom = 0;
  pc2SnfDosTo = 0;
  pc2BillLine = '';
  dependAddrChange = '';
  caution40DisplayInd = '';
  errorMsgDeductYy = '';
  gpdHEobInd = '';
  gpdMEobInd = '';
  gpdSEobInd = '';
  gpdNopayInd = '';
  copayWarningMsg = '';
  copayExceptInd = '';
  msgModHospCount = 0;
  msgModMsupCount = 0;
  oopRetrievedInd = '';
  pluSub = 0;
  pluCallingTranid = '';
  pluCallingProgram = '';
  pluRevGrpInd = '';
  pluAssign = '';
  procClmCmnAreaSuspClaimData: ProcClmCmnAreaSuspClaimData[] = [];
  coinsAmtMpaidAmtScr = '';
  pc2HclProviderName = '';
  pc2HclDedAggInd = '';
  pc2AdjustClaimNum = '';
  longTermCare = '';
  ltcPlan = '';
  ltcFromDateYmd = '';
  ltcToDateYmd = '';
  ltcPaidVisitsInBp = 0;
  ltcBenPerNo = 0;
  ltcPaidLInBp = 0;
  ltcDeductible = 0;
  procClmCmnAreaCaution62SuspComm: ProcClmCmnAreaCaution62SuspComm[] = [];
  procClmCmnAreaClaimNumberTable: ProcClmCmnAreaClaimNumberTable[] = [];
  procClmCmnAreaExceptIcdCode: ProcClmCmnAreaExceptIcdCode[] = [];
  procClmCmnAreaFcTripLine: ProcClmCmnAreaFcTripLine[] = [];
  procClmCmnAreaHIcdCode: ProcClmCmnAreaHIcdCode[] = [];
  procClmCmnAreaHoldInsuredNoteLine: ProcClmCmnAreaHoldInsuredNoteLine[] = [];
  procClmCmnAreaMedSuppIcdCode: ProcClmCmnAreaMedSuppIcdCode[] = [];
  procClmCmnAreaNcBpPlanTab: ProcClmCmnAreaNcBpPlanTab[] = [];
  procClmCmnAreaNyResidDates: ProcClmCmnAreaNyResidDates[] = [];
  procClmCmnAreaOopHospitalArea: ProcClmCmnAreaOopHospitalArea[] = [];
  procClmCmnAreaOopMedSuppArea: ProcClmCmnAreaOopMedSuppArea[] = [];
  procClmCmnAreaPlanInformation: ProcClmCmnAreaPlanInformation[] = [];
  procClmCmnAreaPluBlInfo: ProcClmCmnAreaPluBlInfo[] = [];
  procClmCmnAreaRelatedSaveLine: ProcClmCmnAreaRelatedSaveLine[] = [];
  procClmCmnAreaSaveAllDuplicateBills: ProcClmCmnAreaSaveAllDuplicateBills[] = [];
  procClmCmnAreaScreenNumberPointer: ProClmCmnAreaScreenNumberPointer[] = [];
  cautionGenericTable: CautionGenericTable[] = [];
  cautionHospTable: CautionHospTable[] = [];
  cautionMedSuppTable: CautionMedSuppTable[] = [];
  cautionServiceTable: CautionServiceTable[] = [];
  cautionSuspClaimsTable: CautionSuspClaimsTable[] = [];
  eligSelection: EligibiltySelections[] = [];
  filler = '';
  crossRefNumbers: CrossRefNumbers[] = [];
  commumXrefNumbers: CommumXrefNumbers[] = [];
  filler1 = '';
  tempCrossRefNumbers: TempCrossReferenceNums[] = [];
  tempCommunicationNums: TempCommunicationNums[] = [];
  planPointerTable = new PlanPointerTable();
  procClmCmnAreaPlanFAggr2Information: ProcClmCmnAreaPlanFAggr2Information[] = [];
  exceptFiller = '';
  chrgLnPlanSub: ChrgLnPlanSub[] = [];
  filler2 = '';
  medFiller = '';
  ncFiller = '';
  drugFiller = '';
  filler3 = '';
  filler4 = '';
  waiverStIhdPercX1 = '';
  waiverStCoInPercX1 = '';
  medicareSelectClmType1 = '';
  filler5 = '';
  filler6 = '';
  filler7 = '';
  hpProvMedKeyMpinNumber1 = '';
  hpProvMedKeyMpinLabel1 = '';
  filler8 = '';
  filler9 = '';
  fcTripNo = '';
  cautionSuspCommTable: CautionSuspCommTable[] = [];
  filler10 = '';
  filler11 = '';
  pc2HclProviderName1 = '';
  pc2HclDedAggInd1 = '';
  pc2AdjustClaimNum1 = '';
  pc2AdjustClaimNum2 = '';
  pc2AdjustClaimNum3 = '';
  filler12 = '';
  filler13 = '';
  electCommArea = new ElctrCmnArea();
  mapSaveArea: any = undefined;
  bloodDeductCautionInd = '';
}
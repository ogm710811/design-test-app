import {StringUtils} from '../../services/string-utils.service';

/**
 * Model class WsWorkIndicators
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsWorkIndicators
 * Legacy Mapping: WS-WORK-INDICATORS
 */
export class WsWorkIndicators {
  specPlanFoundInd = '';
  wsPlanInd = '';
  wsErrorInd = '';
  nonBypassableInd = '';
  endOfTsqInd = '';
  asteriskAssignmentInd = '';
  wsAssignInd = '';
  loadY1BillLineInd = '';
  buwFoundInd = '';
  caution55AppliesInd = '';
  rtosInd = '';
  servDateYearInd = '';
  mind = '';
  oldInd = '';
  msTermInd = '';
  aggrInd = '';
  wsInterestInd = '';
  duplicateCautionInd = '';
  rpdiskcvFoundInd = 'Y';
  duplicateFoundInd = 'N';
  endOfTsqSw = '';
  drugNopay = '';
  planFoundInd = '';
  activePlanWasFound = '';
  chngIntBeneSw = '';
  buwAssignInd = '';
  buwIrsInd = '';
  buwRefundInd = 'N';
  buwTosInd = '';
  buwPatParValued = 'N';
  ppAdded = '';
  ppRemoved = '';
  foundClmSw = '';
  assignedBillLinesInd = '';
  thereIsAssignmentInd = '';
  unassignedBlInd = '';
  interestFoundInd = '';
  commandEnteredInd = '';
  thisIsAdjClmInd = ' ';

  public isSpecPlanFound(): boolean {
    let specPlanFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    specPlanFound = StringUtils.trim(this.specPlanFoundInd) === initValue;
    return specPlanFound;
  }

  public setSpecPlanFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.specPlanFoundInd = initValue;
  }

  public isSpecPlanNotFound(): boolean {
    let specPlanNotFound = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    specPlanNotFound = StringUtils.trim(this.specPlanFoundInd) === initValue;
    return specPlanNotFound;
  }

  public setSpecPlanNotFound(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.specPlanFoundInd = initValue;
  }

  public isPlanY(): boolean {
    let planY = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    //
    cEnableValue_0 = 'Y0';
    //
    cEnableValue_1 = 'Y1';
    //
    cEnableValue_2 = 'Y2';
    //
    cEnableValue_3 = 'Y3';
    //
    cEnableValue_4 = 'Y4';
    //
    planY = (cEnableValue_0 === this.wsPlanInd || cEnableValue_1 === this.wsPlanInd || cEnableValue_2 === this.wsPlanInd || cEnableValue_3 === this.wsPlanInd || cEnableValue_4 === this.wsPlanInd);
    return planY;
  }

  public setPlanY(): void {
    let initValue: string = '';
    //
    initValue = 'Y0';
    //
    this.wsPlanInd = initValue;
  }

  public isPlanZ(): boolean {
    let planZ = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    let cEnableValue_3 = '';
    let cEnableValue_4 = '';
    //
    cEnableValue_0 = 'Z0';
    //
    cEnableValue_1 = 'Z1';
    //
    cEnableValue_2 = 'Z2';
    //
    cEnableValue_3 = 'Z3';
    //
    cEnableValue_4 = 'Z4';
    //
    planZ = (cEnableValue_0 === this.wsPlanInd || cEnableValue_1 === this.wsPlanInd || cEnableValue_2 === this.wsPlanInd || cEnableValue_3 === this.wsPlanInd || cEnableValue_4 === this.wsPlanInd);
    return planZ;
  }

  public setPlanZ(): void {
    let initValue: string = '';
    //
    initValue = 'Z0';
    //
    this.wsPlanInd = initValue;
  }

  public isPlanX(): boolean {
    let planX = false;
    let initValue: string = '';
    //
    initValue = 'X0';
    //
    planX = StringUtils.trim(this.wsPlanInd) === initValue;
    return planX;
  }

  public setPlanX(): void {
    let initValue: string = '';
    //
    initValue = 'X0';
    //
    this.wsPlanInd = initValue;
  }

  public isPlan9(): boolean {
    let plan9 = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    //
    cEnableValue_0 = 'X9';
    //
    cEnableValue_1 = 'Y9';
    //
    cEnableValue_2 = 'Z9';
    //
    plan9 = (cEnableValue_0 === this.wsPlanInd || cEnableValue_1 === this.wsPlanInd || cEnableValue_2 === this.wsPlanInd);
    return plan9;
  }

  public setPlan9(): void {
    let initValue: string = '';
    //
    initValue = 'X9';
    //
    this.wsPlanInd = initValue;
  }

  public isErrorOccurred(): boolean {
    let errorOccurred = false;
    let initValue: string = '';
    //
    initValue = 'E';
    //
    errorOccurred = StringUtils.trim(this.wsErrorInd) === initValue;
    return errorOccurred;
  }

  public setErrorOccurred(): void {
    let initValue: string = '';
    //
    initValue = 'E';
    //
    this.wsErrorInd = initValue;
  }

  public isSendNonBypassable(): boolean {
    let sendNonBypassable = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    sendNonBypassable = StringUtils.trim(this.nonBypassableInd) === initValue;
    return sendNonBypassable;
  }

  public setSendNonBypassable(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.nonBypassableInd = initValue;
  }

  public isEndOfTsq(): boolean {
    let endOfTsq = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    endOfTsq = StringUtils.trim(this.endOfTsqInd) === initValue;
    return endOfTsq;
  }

  public setEndOfTsq(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.endOfTsqInd = initValue;
  }

  public isAsteriskAssignment(): boolean {
    let asteriskAssignment = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    asteriskAssignment = StringUtils.trim(this.asteriskAssignmentInd) === initValue;
    return asteriskAssignment;
  }

  public setAsteriskAssignment(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.asteriskAssignmentInd = initValue;
  }

  public isValidAssignInd(): boolean {
    let validAssignInd = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    let cEnableValue_2 = '';
    //
    cEnableValue_0 = '*';
    //
    cEnableValue_1 = ' ';
    //
    cEnableValue_2 = 'Y';
    //
    validAssignInd = (cEnableValue_0 === this.wsAssignInd || cEnableValue_1 === this.wsAssignInd || cEnableValue_2 === this.wsAssignInd);
    return validAssignInd;
  }

  public setValidAssignInd(): void {
    let initValue: string = '';
    //
    initValue = '*';
    //
    this.wsAssignInd = initValue;
  }

  public isValidUnassignInd(): boolean {
    let validUnassignInd = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    validUnassignInd = StringUtils.trim(this.wsAssignInd) === initValue;
    return validUnassignInd;
  }

  public setValidUnassignInd(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.wsAssignInd = initValue;
  }

  public isLoadY1BillLine(): boolean {
    let loadY1BillLine = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    loadY1BillLine = StringUtils.trim(this.loadY1BillLineInd) === initValue;
    return loadY1BillLine;
  }

  public setLoadY1BillLine(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.loadY1BillLineInd = initValue;
  }

  public isBuwFound(): boolean {
    let buwFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    buwFound = StringUtils.trim(this.buwFoundInd) === initValue;
    return buwFound;
  }

  public setBuwFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.buwFoundInd = initValue;
  }

  public isCaution55Applies(): boolean {
    let caution55Applies = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    caution55Applies = StringUtils.trim(this.caution55AppliesInd) === initValue;
    return caution55Applies;
  }

  public setCaution55Applies(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.caution55AppliesInd = initValue;
  }

  public isRTosFnd(): boolean {
    let rTosFnd = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    rTosFnd = StringUtils.trim(this.rtosInd) === initValue;
    return rTosFnd;
  }

  public setRTosFnd(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.rtosInd = initValue;
  }

  public isRTosNotfnd(): boolean {
    let rTosNotfnd = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    rTosNotfnd = StringUtils.trim(this.rtosInd) === initValue;
    return rTosNotfnd;
  }

  public setRTosNotfnd(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.rtosInd = initValue;
  }

  public isYearNotMatched(): boolean {
    let yearNotMatched = false;
    let initValue: string = '';
    //
    initValue = 'S';
    //
    yearNotMatched = StringUtils.trim(this.servDateYearInd) === initValue;
    return yearNotMatched;
  }

  public setYearNotMatched(): void {
    let initValue: string = '';
    //
    initValue = 'S';
    //
    this.servDateYearInd = initValue;
  }

  public isMFound(): boolean {
    let mFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    mFound = StringUtils.trim(this.mind) === initValue;
    return mFound;
  }

  public setMFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.mind = initValue;
  }

  public isMNotfnd(): boolean {
    let mNotfnd = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    mNotfnd = StringUtils.trim(this.mind) === initValue;
    return mNotfnd;
  }

  public setMNotfnd(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.mind = initValue;
  }

  public isOldFnd(): boolean {
    let oldFnd = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    oldFnd = StringUtils.trim(this.oldInd) === initValue;
    return oldFnd;
  }

  public setOldFnd(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.oldInd = initValue;
  }

  public isOldNotfnd(): boolean {
    let oldNotfnd = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    oldNotfnd = StringUtils.trim(this.oldInd) === initValue;
    return oldNotfnd;
  }

  public setOldNotfnd(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.oldInd = initValue;
  }

  public isMsTermFnd(): boolean {
    let msTermFnd = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    msTermFnd = StringUtils.trim(this.msTermInd) === initValue;
    return msTermFnd;
  }

  public setMsTermFnd(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.msTermInd = initValue;
  }

  public isMsTermNotfnd(): boolean {
    let msTermNotfnd = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    msTermNotfnd = StringUtils.trim(this.msTermInd) === initValue;
    return msTermNotfnd;
  }

  public setMsTermNotfnd(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.msTermInd = initValue;
  }

  public isAggrFnd(): boolean {
    let aggrFnd = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    aggrFnd = StringUtils.trim(this.aggrInd) === initValue;
    return aggrFnd;
  }

  public setAggrFnd(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.aggrInd = initValue;
  }

  public isAggrNotfnd(): boolean {
    let aggrNotfnd = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    aggrNotfnd = StringUtils.trim(this.aggrInd) === initValue;
    return aggrNotfnd;
  }

  public setAggrNotfnd(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.aggrInd = initValue;
  }

  public isInterestLineFound(): boolean {
    let interestLineFound = false;
    let initValue: string = '';
    //
    initValue = 'I';
    //
    interestLineFound = StringUtils.trim(this.wsInterestInd) === initValue;
    return interestLineFound;
  }

  public setInterestLineFound(): void {
    let initValue: string = '';
    //
    initValue = 'I';
    //
    this.wsInterestInd = initValue;
  }

  public isNoInterestLine(): boolean {
    let noInterestLine = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    noInterestLine = StringUtils.trim(this.wsInterestInd) === initValue;
    return noInterestLine;
  }

  public setNoInterestLine(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.wsInterestInd = initValue;
  }

  public isDupCaut(): boolean {
    let dupCaut = false;
    let initValue: string = '';
    //
    initValue = 'D';
    //
    dupCaut = StringUtils.trim(this.duplicateCautionInd) === initValue;
    return dupCaut;
  }

  public setDupCaut(): void {
    let initValue: string = '';
    //
    initValue = 'D';
    //
    this.duplicateCautionInd = initValue;
  }

  public isRpdiskcvNotFound(): boolean {
    let rpdiskcvNotFound = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    rpdiskcvNotFound = StringUtils.trim(this.rpdiskcvFoundInd) === initValue;
    return rpdiskcvNotFound;
  }

  public setRpdiskcvNotFound(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.rpdiskcvFoundInd = initValue;
  }

  public isRpdiskcvFound(): boolean {
    let rpdiskcvFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    rpdiskcvFound = StringUtils.trim(this.rpdiskcvFoundInd) === initValue;
    return rpdiskcvFound;
  }

  public setRpdiskcvFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.rpdiskcvFoundInd = initValue;
  }

  public isDuplicateFound(): boolean {
    let duplicateFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    duplicateFound = StringUtils.trim(this.duplicateFoundInd) === initValue;
    return duplicateFound;
  }

  public setDuplicateFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.duplicateFoundInd = initValue;
  }

  public isDuplicateNotFound(): boolean {
    let duplicateNotFound = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    duplicateNotFound = StringUtils.trim(this.duplicateFoundInd) === initValue;
    return duplicateNotFound;
  }

  public setDuplicateNotFound(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.duplicateFoundInd = initValue;
  }

  public isBuwIrsTos(): boolean {
    let buwIrsTos = false;
    let cEnableValue_0 = '';
    let cEnableValue_1 = '';
    //
    cEnableValue_0 = 'Y2';
    //
    cEnableValue_1 = 'Y3';
    //
    buwIrsTos = (cEnableValue_0 === this.buwTosInd || cEnableValue_1 === this.buwTosInd);
    return buwIrsTos;
  }

  public setBuwIrsTos(): void {
    let initValue: string = '';
    //
    initValue = 'Y2';
    //
    this.buwTosInd = initValue;
  }

  public isClaimFound(): boolean {
    let claimFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    claimFound = StringUtils.trim(this.foundClmSw) === initValue;
    return claimFound;
  }

  public setClaimFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.foundClmSw = initValue;
  }

  public isAssignedBillLine(): boolean {
    let assignedBillLine = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    assignedBillLine = StringUtils.trim(this.assignedBillLinesInd) === initValue;
    return assignedBillLine;
  }

  public setAssignedBillLine(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.assignedBillLinesInd = initValue;
  }

  public isThereIsAnAssignment(): boolean {
    let thereIsAnAssignment = false;
    let initValue: string = '';
    //
    initValue = 'A';
    //
    thereIsAnAssignment = StringUtils.trim(this.thereIsAssignmentInd) === initValue;
    return thereIsAnAssignment;
  }

  public setThereIsAnAssignment(): void {
    let initValue: string = '';
    //
    initValue = 'A';
    //
    this.thereIsAssignmentInd = initValue;
  }

  public isThereIsNoAssignment(): boolean {
    let thereIsNoAssignment = false;
    let initValue: string = '';
    //
    initValue = ' ';
    //
    thereIsNoAssignment = StringUtils.trim(this.thereIsAssignmentInd) === initValue;
    return thereIsNoAssignment;
  }

  public setThereIsNoAssignment(): void {
    let initValue: string = '';
    //
    initValue = ' ';
    //
    this.thereIsAssignmentInd = initValue;
  }

  public isUnassignedBl(): boolean {
    let unassignedBl = false;
    let initValue: string = '';
    //
    initValue = 'U';
    //
    unassignedBl = StringUtils.trim(this.unassignedBlInd) === initValue;
    return unassignedBl;
  }

  public setUnassignedBl(): void {
    let initValue: string = '';
    //
    initValue = 'U';
    //
    this.unassignedBlInd = initValue;
  }

  public isInterestFound(): boolean {
    let interestFound = false;
    let initValue: string = '';
    //
    initValue = 'U';
    //
    interestFound = StringUtils.trim(this.interestFoundInd) === initValue;
    return interestFound;
  }

  public setInterestFound(): void {
    let initValue: string = '';
    //
    initValue = 'U';
    //
    this.interestFoundInd = initValue;
  }

  public isThisIsAdjClm(): boolean {
    let thisIsAdjClm = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    thisIsAdjClm = StringUtils.trim(this.thisIsAdjClmInd) === initValue;
    return thisIsAdjClm;
  }

  public setThisIsAdjClm(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.thisIsAdjClmInd = initValue;
  }

  public isThisIsNotAdjClm(): boolean {
    let thisIsNotAdjClm = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    thisIsNotAdjClm = StringUtils.trim(this.thisIsAdjClmInd) === initValue;
    return thisIsNotAdjClm;
  }

  public setThisIsNotAdjClm(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.thisIsAdjClmInd = initValue;
  }
}

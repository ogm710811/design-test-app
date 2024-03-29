import {BillRecords} from './bill-records.model';
import {CommunicationNo} from './communication-no.model';
import {HospChargeArea} from './hosp-charge-area.model';
import {HospEobData} from './hosp-eob-data.model';
import {MedSuppChargeArea} from './med-supp-charge-area.model';
import {VariableInfo} from './medsuppchargeline/variable-info.model';
import {ServChargeArea} from './serv-charge-area.model';
import {SuspendCodes} from './suspend-codes.model';

/**
 * Model class TempOprecRecord
 * Path: bean/procclmtempclmrec
 * Model: com::uhc::aarp::fox::domain::bean::procclmtempclmrec::TempOprecRecord
 * Legacy Mapping: THE-TEMP-OPREC-RECORD
 */
export class TempOprecRecord {
  crossRefNos: number[] = [];
  communicationNos: CommunicationNo[] = [];
  pacsId = 0;
  icdCodes: string[] = [];
  deceasedInd = 0;
  operatorId = 0;
  terminalId = '';
  insDob = 0;
  insSex = '';
  insTitle = 0;
  altTitle = 0;
  assignInd = '';
  assignProvKey = 0;
  assignProvId = '';
  assignTaxIdNo = '';
  assignTaxIdInd = '';
  assignGroupNameCode = '';
  dateProcessed = 0;
  dateCompleted = 0;
  serviceFromDate = '';
  serviceToDate = '';
  paidToDate = '';
  planLetters: String[] = [];
  patientNo = '';
  dateToSusp = '';
  suspendCodes: SuspendCodes[] = [];
  qualOperId = 0;
  qualTermId = '';
  mostRecentErrors: String[] = [];
  origErrors: String[] = [];
  origReasons: number[] = [];
  mostRecentReasons: number[] = [];
  bypassCautionMsgs: String[] = [];
  planTermDate = '';
  adjustClmNum = '';
  pattParagraphs: number[] = [];
  variableInfos: VariableInfo[] = [];
  checkNoPayInd = 0;
  checkSeries = 0;
  eobType = '';
  allHospData: HospEobData[] = [];
  checkDate = '';
  billLineInd = 0;
  billRecords: BillRecords[] = [];
  servChargeArea = new ServChargeArea();
  tmedSuppChargeArea = new MedSuppChargeArea();
  thospChargeArea = new HospChargeArea();
  claimStatus = '';
  operLoc = 0;
  dateToQuality = '';
  qualSeqNo = 0;
  insSurname = '';
  insFirstName = '';
  insMidInit = '';
  insAddr1 = '';
  insAddr2 = '';
  insCity = '';
  insState = '';
  insZip = '';
  altSurname = '';
  altFirstName = '';
  altMiddleInitial = '';
  altAddr1 = '';
  altAddr2 = '';
  altCity = '';
  altState = '';
  altZip = '';
  assignSurname = '';
  assignFirst = '';
  assignMidInt = '';
  assignDegTitle = '';
  assignStreet1 = '';
  assignStreet2 = '';
  assignCity = '';
  assignState = '';
  assignZip = '';
  splitClaimInd = '';
  processFlag = '';
  newProv = '';
  origOperId = 0;
  origLoc = 0;
  payAdjAmt = 0;
  totBeneAmt = 0;
  checkNo = 0;
  checkAmt = 0;
  assnPayAdjAmt = 0;
  assnTotBeneAmt = 0;
  assnCheckNo = 0;
  assnCheckAmt = 0;
  tolApprovalCode = 0;
  tolAcceptCodes: string[] = [];
  tolAcctTransInd = '';
}

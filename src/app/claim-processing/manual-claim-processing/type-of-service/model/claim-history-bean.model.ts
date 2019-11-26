/**
 * Model class ClaimHistoryBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::ClaimHistoryBean
 */
export class ClaimHistoryBean {
  chAcctPartNum = 0;
  chKey = 0;
  acctInfoKey = 0;
  aaaKey = 0;
  clmNum = 0;
  srvFromDt = new Date();
  srvToDt = new Date();
  clmStat = '';
  operId = 0;
  assgnPrvKey = 0;
  assgnMaxAmt = 0;
  dtProc = new Date();
  totBen = 0;
  eobType = '';
  dtCmpltd = new Date();
  procTypeInd = '';
  patNumLen = 0;
  patNumDat = '';
  apprvlCd = 0;
  dtToQlty = new Date();
  creatDt = new Date();
  lastMaintTmst = '';
  assgnAdjAmt = 0;
  payAdjAmt = 0;
  MaintTmst = '';
  seqNum = 0;
  clmMiscPtr = 0;
  clmNotePtr = 0;
  clmBillCnt = 0;
  clmRelInds = 0;
  noPayInd = '';
  langPref = '';
  instProfInd = '';
  fcltyCd = '';
  frqncyCd = '';
  totChrg = 0;
  adjClmNum = 0;
}

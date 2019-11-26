import {EcCarrierStatInfo} from './ec-carrier-stat-info.model';

/**
 * Model class EcCarrStatCmnArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::EcCarrStatCmnArea
 * Legacy Mapping: WS-COMMAREA
 */
export class EcCarrStatCmnArea {
  csCutoffDate = '';
  filler19 = '';
  csInitClaimsReceived = 0;
  csInitAwaiting = 0;
  csInitDisbursed = 0;
  csInitSuspense = 0;
  csInitQuality = 0;
  csInitRecirc = 0;
  csInitVerif = 0;
  csCurrAwaiting = 0;
  csCurrDisbursed = 0;
  csCurrSuspense = 0;
  csCurrQuality = 0;
  csCurrRecirc = 0;
  csCurrVerif = 0;
  csCurrVerifDel = 0;
  csScreenNum = 0;
  csDialSaveDate = 0;
  filler16 = '';
  ecCarrierStatInfos: EcCarrierStatInfo[] = [];
  csCarrierStatCtr = 0;
  csSelection = '';
  csAccumDays = 0;
  csAllBeginDate = 0;
  csAllEndDate = 0;
  csCarrierId = '';
  csFromDate = '';
  csToDate = '';
  csGregFromDate = '';
  csGregToDate = '';
  csStartLine = 0;
  filler18 = '';
  csClaimsReceived = 0;
  csClaimsVerSusp = 0;
  csClaimsPct = '';
  csVerificErrors = 0;
  csErrorTblCtr = 0;
  filler17 = '';
  csZezfEntryInd = '';
  csMoreOccurrenceInd = '';
  csDisplayInd = '';
  csCriticalErrorInd = '';
}

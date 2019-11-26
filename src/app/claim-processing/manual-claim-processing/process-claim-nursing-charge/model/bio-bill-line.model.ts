import {BioOopBlKey} from './bio-oop-bl-key.model';
import {BioPlanData} from './bio-plan-data.model';
import {BioPpEntry} from './bio-pp-entry.model';
import {BioPreExistPlanData} from './bio-pre-exist-plan-data.model';
import {BioSmEntry} from './bio-sm-entry.model';
import {Filler4} from './filler4.model';
/**
 * Model class BioBillLine
 * Path: screenbean/procclmnursingchrgservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmnursingchrgservice::BioBillLine
 * Legacy Mapping: BIO-BILL-LINE
 */
export class BioBillLine {
  bioBlhKey = 0;
  bioChrgScreenNum = 0;
  bioChrgTblInd = '';
  bioChrgKey = 0;
  bioChrgLnNum = 0;
  bioBillLnNum = 0;
  bioPlanData = new BioPlanData();
  bioErrSignInd = '';
  bioRendPrvNm = '';
  bioRendPrvNpi = 0;
  bioSrvCd = '';
  bioTypeCd = '';
  bioSrvFromDt = 0;
  bioSrvToDt = 0;
  bioSrvDate = new Filler4();
  bioSrvAccum1 = 0;
  bioSrvAccum2 = 0;
  bioHspSnfDaysInd = '';
  bioSubmitChrgAmt = 0;
  bioChrgAmt = 0;
  bioBenPerdNum = 0;
  bioBenPerdDays = 0;
  bioProcCd = '';
  bioMcarePaidAmt = 0;
  bioMcareAprvdAmt = 0;
  bioIncrlDt = 0;
  bioPartbDedAmt = 0;
  bioAarpDedAmt = 0;
  bioNextYrDeductible = 0;
  bioPctPd = 0;
  bioMcareAsgnInd = '';
  bioAsgnInd = '';
  bioBenAmt = 0;
  bioDailyBenAmt = 0;
  bioPreExistInd = '';
  bioPreExistPlanData = new BioPreExistPlanData();
  bioCvrdXpnceAmt = 0;
  bioCptCd = '';
  bioProcMod1 = '';
  bioProcMod2 = '';
  bioProcMod3 = '';
  bioProcMod4 = '';
  bioHaInd = '';
  bioNoPayInd = 0;
  bioBillProvKey = '';
  bioCopay = 0;
  bioOopBlKey = new BioOopBlKey();
  bioOopAmt = 0;
  bioOopInd = '';
  bioRemarkCode = 0;
  bioPpCnt = 0;
  bioPpEntrys: BioPpEntry[] = [];
  bioSmEntrys: BioSmEntry[] = [];
}

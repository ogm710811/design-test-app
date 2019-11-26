import {
  AddressTsqRecord,
  ClaimEligibilityTsQueue,
  Dfhcommarea,
  TrnsfBusTempStorQueue
} from '@fox/shared';
import {ClaimHistoryBean} from './claim-history-bean.model';
import {CmnctSuspBean} from './cmnct-susp-bean.model';
import {EcErrCdDescBean} from './ec-err-cd-desc-bean.model';
import {LtrSuspBean} from './ltr-susp-bean.model';
import {OperDfltOvrdBean} from './oper-dflt-ovrd-bean.model';
import {OperatorFileBean} from './operator-file-bean.model';
import {PlanStateInformationElectRecordBean} from './plan-state-information-elect-record-bean.model';
import {PlanStateInformationPlanRecordBean} from './plan-state-information-plan-record-bean.model';
import {PlanStateInformationStateRecordBean} from './plan-state-information-state-record-bean.model';
import {Rpdmb22} from './rpdmb22.model';
import {StateInterestFileRecordBean} from './state-interest-file-record-bean.model';
import {SuspenseBean} from './suspense-bean.model';
import {WorkArea} from './work-area.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::Container
 */
export class Container {
  workStorage = new WorkStorage();
  screenbean = new Rpdmb22();
  dfhCommonArea = new Dfhcommarea();
  tobTsq = new TrnsfBusTempStorQueue();
  workArea = new WorkArea();
  addressTsq = new AddressTsqRecord();
  claimEligibilityTsQueue = new ClaimEligibilityTsQueue();
  stateInterestFileRecordBean = new StateInterestFileRecordBean();
  operDfltOvrdBean = new OperDfltOvrdBean();
  operatorFileBean = new OperatorFileBean();
  ltrSuspBean = new LtrSuspBean();
  cmnctSuspBean = new CmnctSuspBean();
  planStateInformationPlanRecordBean = new PlanStateInformationPlanRecordBean();
  planStateInformationStateRecordBean = new PlanStateInformationStateRecordBean();
  claimHistoryBean = new ClaimHistoryBean();
  ecErrCdDescBean = new EcErrCdDescBean();
  planStateInformationElectRecordBean = new PlanStateInformationElectRecordBean();
  suspenseBean = new SuspenseBean();
  claimHistoryBeanList: ClaimHistoryBean[] = [];
}

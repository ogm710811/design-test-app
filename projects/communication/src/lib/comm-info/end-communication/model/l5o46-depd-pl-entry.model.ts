import {L5o46DepdBmEntry} from './l5o46-depd-bm-entry.model';
import {L5o46DepdPlanLeEntry} from './l5o46-depd-plan-le-entry.model';

/**
 * Model class L5o46DepdPlEntry
 * Path: screenbean/commcontrolendcomm
 * Model: com::uhc::aarp::fox::domain::screenbean::commcontrolendcomm::L5o46DepdPlEntry
 * Legacy Mapping: L5O46-DEPD-PL-ENTRY
 */
export class L5o46DepdPlEntry {
  l5o46DepdPlanCompas = '';
  l5o46DepdPlanBase = '';
  l5o46DepdCertState = '';
  l5o46DepdPlanProductType = '';
  l5o46DepdPlanProductCtgr = '';
  l5o46DepdPlanSponsorDod = '';
  l5o46DepdPlanStartDate = '';
  l5o46DepdPlanTermDate = '';
  l5o46DepdPlanTermReason = '';
  l5o46DepdPlanConservation = '';
  l5o46DepdPlLegalEntryCntr = 0;
  l5o46DepdPlanLeEntrys: L5o46DepdPlanLeEntry[] = [];
  l5o46DepdBmCounter = 0;
  l5o46DepdBmEntrys: L5o46DepdBmEntry[] = [];
  l5o46DepdPlanCode = '';
  l5o46DepdPlanInd = '';
}

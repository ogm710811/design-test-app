import { LeRePlanTable } from './le-re-plan-table.model';
import { LegalEntityReinsuranceInfo } from './legal-entity-reinsurance-info.model';

/**
 * Model class TrnsfBusTempStorQueue
 * Path: screenbean/mendofclaim/beans
 * Model: com::uhc::aarp::fox::domain::screenbean::mendofclaim::beans::TrnsfBusTempStorQueue
 * Legacy Mapping: TOB-TS-QUEUE
 */
export class TrnsfBusTempStorQueue {
  tobTsQueueItemLength = 0;
  tobTsQueueItemType = '';
  tobTsQueueMoreItemsInd = '';
  tobTsQueueTableMax = 0;
  tobTsQueuePlanMax = 0;
  tobTsQueuePlanCounter = 0;
  tobTsQueueDateCreated = 0;
  tobTsQueueTimeCreated = 0;
  tobTsQueueOpId = '';
  tobTsQueueTermId = '';
  legalEntityReinsuranceInfo = new LegalEntityReinsuranceInfo();
  ovcpPlanIndicator = '';
  legalEntityNoPayEob = '';
  reIndicatorNoPayEob = '';
  legalEntityFinNoPayEob = '';
  reIndicatorFinNoPayEob = '';
  legalEntityDrugEob = '';
  reIndicatorDrugEob = '';
  legalEntityFinDrugEob = '';
  reIndicatorFinDrugEob = '';
  legalEntityServiceEob = '';
  reIndicatorServiceEob = '';
  legalEntityFinServiceEob = '';
  reIndicatorFinServiceEob = '';
  legalEntityMedSuppEob = '';
  reIndicatorMedSuppEob = '';
  legalEntityFinMedSuppEob = '';
  reIndicatorFinMedSuppEob = '';
  legalEntityHospitalEob = '';
  reIndicatorHospitalEob = '';
  legalEntityFinHospitalEob = '';
  reIndicatorFinHospitalEob = '';
  tobTsQueuePacsId = 0;
  leRePlanTables: LeRePlanTable[] = [];
}

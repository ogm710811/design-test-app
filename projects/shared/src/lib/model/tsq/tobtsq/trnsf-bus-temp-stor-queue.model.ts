import {LegalEntityReinsuranceInfo} from './legal-entity-reinsurance-info.model';
import {OvcpPlanInformation} from './ovcp-plan-information.model';
import {TobTsQueueItem1} from './tob-ts-queue-item1.model';
import {TrnsfBusTempStorQueueName} from './trnsf-bus-temp-stor-queue-name.model';

/**
 * Model class TrnsfBusTempStorQueue
 * Path: bean/tsq/tobtsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::tobtsq::TrnsfBusTempStorQueue
 * Legacy Mapping: TOB-TS-QUEUE
 */
export class TrnsfBusTempStorQueue {
  tobTsQueueName = new TrnsfBusTempStorQueueName();
  tobTsQueueItemLength = 0;
  filler2 = '';
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
  tobTsQueueItem1 = new TobTsQueueItem1();
  ovcpPlanInformation = new OvcpPlanInformation();
}

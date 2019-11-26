import {ClaimEligibilityTsQueue, Dfhcommarea, ECImageRecord, EligibilityIoArea} from '@fox/shared';
import {EcVerfProcCmnArea} from './ec-verf-proc-cmn-area.model';
import {Rpdma44} from './rpdma44.model';
import {Rpdma45} from './rpdma45.model';
import {Rpdma49} from './rpdma49.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::Container
 */
export class Container {
  screenbean44 = new Rpdma44();
  screenbean45 = new Rpdma45();
  screenbean49 = new Rpdma49();
  workStorage = new WorkStorage();
  dfhCommonArea = new Dfhcommarea();
  ecVerfProcCmnArea = new EcVerfProcCmnArea();
  eligibilityIoArea = new EligibilityIoArea();
  claimEligibilityTsQueue = new ClaimEligibilityTsQueue();
  ecimageRecord = new ECImageRecord();
}

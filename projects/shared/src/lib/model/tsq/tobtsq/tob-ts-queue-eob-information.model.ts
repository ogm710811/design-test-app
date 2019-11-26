import {DrugEobTobIndicators} from './drug-eob-tob-indicators.model';
import {HospitalEobTobIndicators} from './hospital-eob-tob-indicators.model';
import {MedSuppEobTobIndicators} from './med-supp-eob-tob-indicators.model';
import {NoPayEobTobIndicators} from './no-pay-eob-tob-indicators.model';
import {ServiceEobTobIndicators} from './service-eob-tob-indicators.model';

/**
 * Model class TobTsQueueEobInformation
 * Path: bean/tsq/tobtsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::tobtsq::TobTsQueueEobInformation
 * Legacy Mapping: TOB-TS-QUEUE-EOB-INFORMATION
 */
export class TobTsQueueEobInformation {
  hospitalEobTobIndicators = new HospitalEobTobIndicators();
  medSuppEobTobIndicators = new MedSuppEobTobIndicators();
  serviceEobTobIndicators = new ServiceEobTobIndicators();
  drugEobTobIndicators = new DrugEobTobIndicators();
  noPayEobTobIndicators = new NoPayEobTobIndicators();
}

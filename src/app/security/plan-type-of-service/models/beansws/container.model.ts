import {Dfhcommarea, HdrMessageSegPO} from '@fox/shared';
import {Rpdma37} from '../rpdma37.model';
import {Rpdma38} from '../rpdma38.model';
import {PlanTosInfoRecordBean} from './plan-tos-info-record-bean.model';
import {PtifAggregateMaxFieldsBean} from './ptif-aggregate-max-fields-bean.model';
import {PtifDeductibleFieldsBean} from './ptif-deductible-fields-bean.model';
import {PtifHospPeriodBean} from './ptif-hosp-period-bean.model';
import {PtifRecordLayoutPtifRateGroupBean} from './ptif-record-layout-ptif-rate-group-bean.model';
import {PtifSnfPeriodBean} from './ptif-snf-period-bean.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/plntosmnt/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::plntosmnt::beansWs::Container
 */
export class Container {
  workStorage = new WorkStorage();
  rpdma37 = new Rpdma37();
  dfhCommonArea = new Dfhcommarea();
  planTosInfoRecord = new PlanTosInfoRecordBean();
  rpdma38 = new Rpdma38();
  ptifAggregateMaxFieldsList: PtifAggregateMaxFieldsBean[] = [];
  ptifDeductibleFieldsList: PtifDeductibleFieldsBean[] = [];
  ptifSnfPeriodList: PtifSnfPeriodBean[] = [];
  ptifHospPeriodList: PtifHospPeriodBean[] = [];
  ptifRecordLayoutPtifRateGroupList: PtifRecordLayoutPtifRateGroupBean[] = [];
  messageList: HdrMessageSegPO[] = [];
}

import {EDAYearTable} from './edayear-table.model';

/**
 * Model class EDADeductFields
 * Path: rpd05040/beans/claimlogicaldb
 * Model: com::uhc::aarp::fox::domain::rpd05040::beans::claimLogicalDB::EDADeductFields
 * Legacy Mapping: E-D-A-DEDUCT-FIELDS
 */
export class EDADeductFields {
  edABenPerLifeAggr = 0;
  edAHospLifeAggrDays = 0;
  edALifeMentalAggr = 0;
  edASnfBenPerAggr = 0;
  edAPlanLifeAggr = 0;
  edAYearTables: EDAYearTable[] = [];
}

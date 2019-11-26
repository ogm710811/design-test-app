import {QualityCommAreaInsuredData} from './quality-comm-area-insured-data.model';

/**
 * Model class QcaScreenDisplayFields
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QcaScreenDisplayFields
 * Legacy Mapping: QCA-SCREEN-DISPLAY-FIELDS
 */
export class QcaScreenDisplayFields {
  claimNo = '';
  qualityNo = '';
  accountNo = '';
  planLine1 = '';
  planLine2 = '';
  planLine3 = '';
  planLine4 = '';
  planLine5 = '';
  adminNote = '';
  noOfPlans = 0;
  insuredPlanTable = '';
  insName = '';
  addrLines: string[] = [];
  qltyRvwCmnAreaInsuredDatas: QualityCommAreaInsuredData[] = [];
}

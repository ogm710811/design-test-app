import {OperFileCmnAreaAuthCautionTable} from './oper-file-cmn-area-auth-caution-table.model';
import {OperFileCmnAreaAuthInfo} from './oper-file-cmn-area-auth-info.model';
import {OperFileCmnAreaAuthLimitPlanTable} from './oper-file-cmn-area-auth-limit-plan-table.model';
import {OperFileCmnAreaAuthLimitTable} from './oper-file-cmn-area-auth-limit-table.model';
import {OperFileCmnAreaCautionTable} from './oper-file-cmn-area-caution-table.model';
import {OperFileCmnAreaOperatorInfo} from './oper-file-cmn-area-operator-info.model';
import {OperFileCmnAreaOvrSqCautionTable} from './oper-file-cmn-area-ovr-sq-caution-table.model';
import {OperFileCmnAreaSetQualityFields} from './oper-file-cmn-area-set-quality-fields.model';
import {OperFileCmnAreasq2CautionTable} from './oper-file-cmn-areasq2-caution-table.model';

/**
 * Model class OperFileCmnArea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::OperFileCmnArea
 * Legacy Mapping: OPERATOR-COMMAREA-LAYOUT
 */
export class OperFileCmnArea {
  of2IonsId = 0;
  of2OperatorInfo = new OperFileCmnAreaOperatorInfo();
  of2AuthInfo = new OperFileCmnAreaAuthInfo();
  of2CautionTable = new OperFileCmnAreaCautionTable();
  of2AuthLimitPlanTable = new OperFileCmnAreaAuthLimitPlanTable();
  of2SetQualityFields = new OperFileCmnAreaSetQualityFields();
  ofsq2CautionTable = new OperFileCmnAreasq2CautionTable();
  of2OvrAuthCautionTable = new OperFileCmnAreaAuthCautionTable();
  of2OvrSqCautionTable = new OperFileCmnAreaOvrSqCautionTable();
  filler5 = '';
  of2AuthLimitTable = new OperFileCmnAreaAuthLimitTable();
}

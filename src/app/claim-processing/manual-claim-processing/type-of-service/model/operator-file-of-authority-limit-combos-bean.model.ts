import {OperatorFilePO} from '../../../common/pos/operator-file-po.model';
/**
 * Model class OperatorFileOfAuthorityLimitCombosBean
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::OperatorFileOfAuthorityLimitCombosBean
 */
export class OperatorFileOfAuthorityLimitCombosBean {
  OperFlAuthLmtCombId = 0;
  procInd = '';
  stCd = '';
  plnCd = '';
  tos = '';
  strtDt = new Date();
  endDt = new Date();
  caution = 0;
  acceptabilityCd = '';
  operatorFile = new OperatorFilePO();
}

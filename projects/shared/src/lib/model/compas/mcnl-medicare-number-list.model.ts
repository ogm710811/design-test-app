import {McnlMnAccountData} from './mcnl-mn-account-data.model';

/**
 * Model class McnlMedicareNumberList
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::McnlMedicareNumberList
 * Legacy Mapping: MCNL-MEDICARE-NUMBER-LIST
 */
export class McnlMedicareNumberList {
  mcnlMnCounter = 0;
  mcnlMnAccountDatas: McnlMnAccountData[] = [];
}

import {ClaimEligibilityTsQueue, Dfhcommarea} from '@fox/shared';
import {BillTable1} from './bill-table1.model';
import {HoldSortFields} from './hold-sort-fields.model';
import {SBRBills} from './sbrbills.model';
import {Screenbean} from './screenbean.model';
import {WsBillsArea} from './ws-bills-area.model';

/**
 * Model class Container
 * Path: screenbean/procclmdrugchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugchrg::Container
 */
export class Container {
  // workStorage = new WorkStorage();
  screenbean = new Screenbean();
  dfhCommonArea = new Dfhcommarea();
  claimEligibility = new ClaimEligibilityTsQueue();
  billTable1 = new BillTable1();
  sbrBill = new SBRBills();
  holdSortFields = new HoldSortFields();
  wsBillArea = new WsBillsArea();
}

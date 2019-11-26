import {CompressScreenAmt} from './compress-screen-amt.model';
import {Di82100Linkage} from './di82100-linkage.model';
import {OvpaymentCommonArea} from './ovpayment-common-area.model';
import {Ovpayment} from './ovpayment.model';
import {ReturnFields} from './return-fields.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/ovpaymnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpaymnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  returnFields = new ReturnFields();
  di2100Linkage = new Di82100Linkage();
  screen = new Ovpayment();
  compressScreen = new CompressScreenAmt();
  commonArea = new OvpaymentCommonArea();
  isWrite = false;
}

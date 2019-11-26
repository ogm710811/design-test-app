import {OvpaymentCommonArea} from '../../model/ovpayment-common-area.model';
import {Ovpayrefundhist} from './ovpayrefundhist.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/ovpayrefundhist
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpayrefundhist::Container
 */
export class Container {
  workstorage = new WorkStorage();
  screen = new Ovpayrefundhist();
  commonArea = new OvpaymentCommonArea();
}

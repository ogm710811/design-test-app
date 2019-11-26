import {AddrHistElement} from './addr-hist-element.model';
import {DepdHistElement} from './depd-hist-element.model';

/**
 * Model class AddressTsqRecord
 * Path: bean/tsq/address
 * Model: com::uhc::aarp::fox::domain::bean::tsq::address::AddressTsqRecord
 */
export class AddressTsqRecord {
  addrHistCounter = 0;
  addrHistElements: AddrHistElement[] = [];
  depdHistElements: DepdHistElement[] = [];
  depdHistCounter = 0;
}

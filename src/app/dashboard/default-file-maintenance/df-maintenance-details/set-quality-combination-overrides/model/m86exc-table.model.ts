import { M86exct } from './m86exct.model';
import { M86exlt } from './m86exlt.model';

/**
 * Model class M86excTable
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::M86excTable
 * Legacy Mapping: M86EXC-TABLE
 */
export class M86excTable {
  m86exlt = new M86exlt();
  m86excts: M86exct[] = [];
}

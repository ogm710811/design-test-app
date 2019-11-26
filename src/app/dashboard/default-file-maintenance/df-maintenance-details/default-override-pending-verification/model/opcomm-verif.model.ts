import { OpDateTime } from './op-date-time.model';
import { OpValue } from './op-value.model';

/**
 * Model class OpcommVerif
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::OpcommVerif
 * Legacy Mapping: OPCOMM-VERIF
 */
export class OpcommVerif {
  opSelection = '';
  opType = '';
  opValue = new OpValue();
  opOperIons = 0;
  opDateTime = new OpDateTime();
  opVerifIons = 0;
  opOsaInd = '';
}

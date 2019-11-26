import {Rpdma49MapBillLines} from './rpdma49-map-bill-lines.model';
import {Rpdma49MapErrorLine} from './rpdma49-map-error-line.model';

/**
 * Model class Rpdma49MapSavePart
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::Rpdma49MapSavePart
 * Legacy Mapping: MAP-49-SAVE-PART
 */
export class Rpdma49MapSavePart {
  map49BillLines: Rpdma49MapBillLines[] = [];
  ser9TotalCharg = '';
  map49FromDate = '';
  map49ToDate = '';
  map49ErrorLine = new Rpdma49MapErrorLine();
  map49InsError = '';
  map49Reply = '';
  map49Note = '';
  map49Error = '';
}

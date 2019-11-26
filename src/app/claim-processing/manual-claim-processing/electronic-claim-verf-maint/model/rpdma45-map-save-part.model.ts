import {Rpdma45MapBillLines} from './rpdma45-map-bill-lines.model';
import {Rpdma45MapErrorLine} from './rpdma45-map-error-line.model';

/**
 * Model class Rpdma45MapSavePart
 * Path: screenbean/ecverfmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfmnt::Rpdma45MapSavePart
 * Legacy Mapping: MAP-45-SAVE-PART
 */
export class Rpdma45MapSavePart {
  map45BillLines: Rpdma45MapBillLines[] = [];
  claimTotCharge = '';
  claimTotAppAmt = '';
  claimTotDeductible = '';
  claimTotPaid = '';
  claimTotIneligAmt = '';
  claimInterest = '';
  claimServFromDate = '';
  claimServToDate = '';
  map45ErrorLine = new Rpdma45MapErrorLine();
}

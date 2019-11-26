import { HoldZipX } from './hold-zip-x.model';
/**
 * Model class AddressHoldAreaX
 * Path: screenbean/procclmaddrverf
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmaddrverf::AddressHoldAreaX
 * Legacy Mapping: ADDRESS-HOLD-AREA-X
 */
export class AddressHoldAreaX {
  holdCityX = '';
  holdComa2X = '';
  holdStateX = '';
  holdZipX = new HoldZipX();
}

import { ScreenHicBeneficId } from './screen-hic-benefic-id.model';

/**
 * Model class ScreenHicNumber
 * Path: screenbean/procclmaddrverf
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmaddrverf::ScreenHicNumber
 * Legacy Mapping: SCREEN-HIC-NUMBER
 */
export class ScreenHicNumber {
  screenHicSsn = '';
  screenHicBeneficId = new ScreenHicBeneficId();
}

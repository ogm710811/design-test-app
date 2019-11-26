import {EPAltIndexCo} from './epalt-index-co.model';
import {EPAltIndex1} from './epalt-index1.model';
import {EPDoctorFields} from './epdoctor-fields.model';
import {EPHospitalFields} from './ephospital-fields.model';
import {EPName} from './epname.model';
import {EPPhoneNumber} from './epphone-number.model';
import {EPAddress} from './epaddress.model';

/**
 * Model class ProviderSegment
 * Path: screenbean/procclmsrvceob/condensedprovfilerecord
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmsrvceob::CondensedProvFileRecord::ProviderSegment
 * Legacy Mapping: PROVIDER-SEGMENT
 */
export class ProviderSegment {
  epAltIndex1 = new EPAltIndex1();
  epTaxIdIndicator = '';
  epName = new EPName();
  epAddress = new EPAddress();
  epPhoneNumber = new EPPhoneNumber();
  epLastAccessDate = 0;
  epIonsId = 0;
  epDoctorFields = new EPDoctorFields();
  epHospitalFields = new EPHospitalFields();
  epPct = 0;
  epAltIndexCo = new EPAltIndexCo();
  epAlternateProvKey = 0;
  epAltPointedAtCnt = 0;
  epEcIndicator = '';
  epBuwDate = 0;
  epBuwIndicator = '';
  epW9Indicator = '';
  filler3 = '';
}

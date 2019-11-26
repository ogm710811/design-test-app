import {EccClaimInformation} from './ecc-claim-information.model';
import {EccPrimaryKey} from './ecc-primary-key.model';
import {EccProviderInformation} from './ecc-provider-information.model';
import {EccSuspenseInformation} from './ecc-suspense-information.model';
import {EccVerificationInformation} from './ecc-verification-information.model';

/**
 * Model class ElectClaimCurImageRecord
 * Path: screenbean/ecverfsuspproc
 * Model: com::uhc::aarp::fox::domain::screenbean::ecverfsuspproc::ElectClaimCurImageRecord
 * Legacy Mapping: ELECT-CLAIM-CUR-IMAGE-RECORD
 */
export class ElectClaimCurImageRecord {
  eccPrimaryKey = new EccPrimaryKey();
  eccVerificationInformation = new EccVerificationInformation();
  eccSuspenseInformation = new EccSuspenseInformation();
  eccProviderInformation = new EccProviderInformation();
  eccClaimInformation = new EccClaimInformation();
}

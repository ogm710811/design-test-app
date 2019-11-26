import {AarpMembershipNumberVO} from './AarpMembershipNumberVO';
import {AccountAddressVO} from './AccountAddressVO';
import {HouseholdIdVO} from './HouseholdIdVO';
import {NameVO} from './NameVO';
/**
 * MDM Mediator
 * This is the MDM Mediator REST API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: gabrielle_goodwin@uhc.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {PhoneVO} from './PhoneVO';

export interface MemberDetailsVO {
  memberName?: NameVO;
  aarpMembershipNumber?: AarpMembershipNumberVO;
  medicareId?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  gender?: string;
  partBDateEffective?: string;
  address?: Array<AccountAddressVO>;
  householdId?: Array<HouseholdIdVO>;
  individualTermDate?: string;
  phone?: Array<PhoneVO>;
  email?: string;
}
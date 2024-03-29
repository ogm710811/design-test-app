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
import {MemberPartyAddressVO} from './MemberPartyAddressVO';
import {MemberPartyIdentifiersVO} from './MemberPartyIdentifiersVO';
import {MemberPartyVO} from './MemberPartyVO';
import {MemberPoliciesVO} from './MemberPoliciesVO';

export interface ResourceOfMemberVO {
  memberParty?: MemberPartyVO;

  memberPartyIdentifiers?: MemberPartyIdentifiersVO;

  memberPartyAddress?: Array<MemberPartyAddressVO>;

  memberPolicies?: Array<MemberPoliciesVO>;

  _links?: { [key: string]: { [key: string]: string; }; };

}

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

import {PageMetadataVO} from '../../PageMetadataVO';
import {ResourcesListOfMemberLookupProcessInfoVO} from './ResourcesListOfMemberLookupProcessInfoVO';

export interface PagedResourcesOfMemberLookupProcessInfoVO {
  _embedded?: ResourcesListOfMemberLookupProcessInfoVO;

  _links?: { [key: string]: { [key: string]: string; }; };

  page?: PageMetadataVO;

}

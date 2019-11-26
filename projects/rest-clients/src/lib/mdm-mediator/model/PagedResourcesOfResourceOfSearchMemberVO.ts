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
import {ResourcesListOfResourceOfSearchMemberVO} from './ResourcesListOfResourceOfSearchMemberVO';

export interface PagedResourcesOfResourceOfSearchMemberVO {
  _embedded?: ResourcesListOfResourceOfSearchMemberVO;
  links?: { [key: string]: { [key: string]: string; }; };
  page?: PageMetadataVO;
}

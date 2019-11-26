/**
 * mdm-mediator
 * The proxy service between FOX services and MDM that is required to search/retrieve member and provider records.
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ClaimMemberLookupRequestVO {
  /**
   * Service start date
   */
  serviceDate: string;
  /**
   * Service end date, may be same as service date
   */
  serviceEndDate: string;
  source: ClaimMemberLookupRequestVO.SourceEnum;
  /**
   * First name
   */
  firstName?: string;
  /**
   * gender
   */
  gender?: string;
  /**
   * Last name
   */
  lastName?: string;
  /**
   * member number
   */
  membershipNumber?: string;
  /**
   * medicare claim number
   */
  medicareId?: string;
  /**
   * address/ street line 1
   */
  addressLine1?: string;
  /**
   * address/ street line 2
   */
  addressLine2?: string;
  /**
   * address/ city
   */
  city?: string;
  /**
   * address/ state
   */
  state?: string;
  /**
   * address/ zip
   */
  zip?: string;
  /**
   * address/ country
   */
  country?: string;
  /**
   * date of birth
   */
  dateOfBirth?: string;
}
export namespace ClaimMemberLookupRequestVO {
  export type SourceEnum = 'CLEARINGHOUSE' | 'CMS' | 'NON_PAPER' | 'PAPER';
  export const SourceEnum = {
    CLEARINGHOUSE: 'CLEARINGHOUSE' as SourceEnum,
    CMS: 'CMS' as SourceEnum,
    NONPAPER: 'NON_PAPER' as SourceEnum,
    PAPER: 'PAPER' as SourceEnum
  };
}

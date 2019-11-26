/**
 * fox-claims
 * Custom developed service operations to support core claim processing and claim history inquiry.  Some services interact with modernized code.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ClaimHistMaintEligibilityVO {
  eligibleAccountLockStatus?: string;
  migratedToFox?: string;
  eligibleQualityCode?: string;
  eligibleSpecialHandlingCode?: string;
  eligibleCrossReferenceMaint?: string;
  eligibleUpdateEOB?: string;
  eligibleTransferClaim?: string;
  eligibleDeleteClaim?: string;
  eligibleReactivateClaim?: string;
  eligibleSuspendSameDay?: string;
}

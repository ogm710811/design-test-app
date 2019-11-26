/**
 * fox-claims
 * Monolithic-style application containing generated components from legacy code modernization and custom developed APIs to support core claim processing.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ClaimStateVO} from './ClaimStateVO';

export interface ClaimStateRequestVO {
  claimStateStatus: ClaimStateVO;
  claimStateReason?: ClaimStateRequestVO.ClaimStateReasonEnum;
  assignedBy?: string;
}

export namespace ClaimStateRequestVO {
  export type ClaimStateReasonEnum =
    'FAILED_COMPLIANCE_EDITS'
    | 'FAILED_PLAN_EDITS'
    | 'FAILED_COMPLIANCE_EDITS_AND_RNF'
    | 'FAILED_COMPLIANCE_EDITS_AND_FAILED_PLAN_EDITS'
    | 'RNF';
  export const ClaimStateReasonEnum = {
    FAILEDCOMPLIANCEEDITS: 'FAILED_COMPLIANCE_EDITS' as ClaimStateReasonEnum,
    FAILEDPLANEDITS: 'FAILED_PLAN_EDITS' as ClaimStateReasonEnum,
    FAILEDCOMPLIANCEEDITSANDRNF: 'FAILED_COMPLIANCE_EDITS_AND_RNF' as ClaimStateReasonEnum,
    FAILEDCOMPLIANCEEDITSANDFAILEDPLANEDITS: 'FAILED_COMPLIANCE_EDITS_AND_FAILED_PLAN_EDITS' as ClaimStateReasonEnum,
    RNF: 'RNF' as ClaimStateReasonEnum
  };
}

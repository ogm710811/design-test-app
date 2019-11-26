import {ClaimMemberSummaryVO} from './ClaimMemberSummaryVO';
import {ClaimStatusSummaryVO} from './ClaimStatusSummaryVO';
import {ProviderSummaryVO} from './ProviderSummaryVO';

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
export interface ClaimSummaryVO {
  claimId?: number;

  preProcessingSystemClaimId?: string;

  preProcessingSystem?: string;

  legacyClaimNumber?: string;

  claimReceiptDate?: Date;

  claimDosFromDate?: Date;

  claimDosToDate?: Date;

  claimProviders?: Array<ProviderSummaryVO>;

  claimMember?: ClaimMemberSummaryVO;

  claimStatus?: ClaimStatusSummaryVO;

}

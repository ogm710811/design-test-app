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

export interface ClaimHistoryAuditVO {
  receiptDate?: string;
  suspendDate?: string;
  suspendReason1?: string;
  suspendReason2?: string;
  suspendReason3?: string;
  suspendReason4?: string;
  suspendReason5?: string;
  completedBy?: string;
  qualityDate?: string;
  qualityErrorCode1?: string;
  qualityErrorCode2?: string;
  qualityErrorCode3?: string;
  qualityErrorCode4?: string;
  qualityErrorCode5?: string;
  processingSystem?: string;
}

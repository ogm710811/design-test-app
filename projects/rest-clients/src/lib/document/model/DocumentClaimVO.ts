/**
 * fox-claims-document
 * Custom developed service operations to support document and document meta-data processing to enable capabilities such as paper non claims.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
export interface DocumentClaimVO {
  claimNumber?: number;
  claimJulianDate?: number;
  dosFrom?: string;
  dosTo?: string;
  providerName?: string;
  providerTin?: string;
  ubTypeOfBill?: string;
}

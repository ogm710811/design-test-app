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

export interface DepositConfirmationVO {
  status?: DepositConfirmationVO.StatusEnum;
  reason?: string;
  verifiedBy?: string;
}

export namespace DepositConfirmationVO {
  export type StatusEnum = 'VERIFIED' | 'REJECTED';
  export const StatusEnum = {
    VERIFIED: 'VERIFIED' as StatusEnum,
    REJECTED: 'REJECTED' as StatusEnum
  };
}

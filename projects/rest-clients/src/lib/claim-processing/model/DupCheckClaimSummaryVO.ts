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
import {DupCheckBillLineSummaryVO} from './DupCheckBillLineSummaryVO';

export interface DupCheckClaimSummaryVO {
  claimId?: string;
  items?: Array<DupCheckBillLineSummaryVO>;
}

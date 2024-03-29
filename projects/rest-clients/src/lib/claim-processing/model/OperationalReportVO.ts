/**
 * fox-claims-receipt
 * Custom developed service operations to support claim processing before claim intake, such as member validation.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ReportDetailVO} from './ReportDetailVO';

export interface OperationalReportVO {
  nasDriveReport?: Array<ReportDetailVO>;
  microStrategyReport?: Array<ReportDetailVO>;
}

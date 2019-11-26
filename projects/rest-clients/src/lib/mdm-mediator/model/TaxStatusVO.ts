/**
 * MDM Mediator
 * This is the MDM Mediator REST API
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ProviderMdmRecordDetailVO} from './ProviderMdmRecordDetailVO';

export interface TaxStatusVO {
  taxStatusCode?: string;
  taxStatusDesc?: string;
  taxWithholdingPercent?: string;
  recordDetail?: ProviderMdmRecordDetailVO;
}

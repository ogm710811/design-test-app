import {NameVO} from '../../mdm-mediator/model/NameVO';
import {ProviderAddressVO} from '../../mdm-mediator/model/ProviderAddressVO';
import {ProviderIdentifierVO} from './ProviderIdentifierVO';
import {AcceptabilityCodeVO} from '../../mdm-mediator/model/AcceptabilityCodeVO';
/**
 * fox-pre-adjudication
 * Orchestrates the pre-adjudication process, supporting both auto and manual processing of claims through provider validation.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ProviderValidationManualResponseVO {
  providerValidationResult?: ProviderValidationManualResponseVO.ProviderValidationResultEnum;
  providerName?: NameVO;
  providerAddress?: ProviderAddressVO;
  providerIdentifier?: ProviderIdentifierVO;
  acceptabilityCode?: Array<AcceptabilityCodeVO>;
}
export namespace ProviderValidationManualResponseVO {
  export type ProviderValidationResultEnum = 'MATCH' | 'NO_MATCH_NO_ADD' | 'MATCH_NO_ACCEPTABILITY_CODE' | 'NOT_ASSIGNED_TO_PROVIDER' | 'NOT_ENOUGH_DATA' | 'PROVIDER_FRAUD_WASTE_ABUSE' | 'MATCH_FWA_NO_ACC_CODE';
  export const ProviderValidationResultEnum = {
    MATCH: 'MATCH' as ProviderValidationResultEnum,
    NOMATCHNOADD: 'NO_MATCH_NO_ADD' as ProviderValidationResultEnum,
    MATCHNOACCEPTABILITYCODE: 'MATCH_NO_ACCEPTABILITY_CODE' as ProviderValidationResultEnum,
    NOTASSIGNEDTOPROVIDER: 'NOT_ASSIGNED_TO_PROVIDER' as ProviderValidationResultEnum,
    NOTENOUGHDATA: 'NOT_ENOUGH_DATA' as ProviderValidationResultEnum,
    PROVIDERFRAUDWASTEABUSE: 'PROVIDER_FRAUD_WASTE_ABUSE' as ProviderValidationResultEnum,
    MATCHFWANOACCCODE: 'MATCH_FWA_NO_ACC_CODE' as ProviderValidationResultEnum
  };
}

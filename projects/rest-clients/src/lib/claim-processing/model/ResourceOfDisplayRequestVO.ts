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

export interface ResourceOfDisplayRequestVO {
  requesterMsid?: string;
  maintAction?: ResourceOfDisplayRequestVO.MaintActionEnum;
  requestTimestamp?: string;
  maintScreenDispValue?: string;
  links?: { [key: string]: { [key: string]: string; }; };
}
export namespace ResourceOfDisplayRequestVO {
  export type MaintActionEnum = 'DELETECLAIM' | 'TRANSFERCLAIM' | 'UPDATEEOB' | 'CROSSREFMAINT' | 'MEMBERAGGRMAINT' | 'SPHMAINT' | 'ACCOUNTTRANSFER' | 'REACTIVATECLAIM';
  export const MaintActionEnum = {
    DELETECLAIM: 'DELETECLAIM' as MaintActionEnum,
    TRANSFERCLAIM: 'TRANSFERCLAIM' as MaintActionEnum,
    UPDATEEOB: 'UPDATEEOB' as MaintActionEnum,
    CROSSREFMAINT: 'CROSSREFMAINT' as MaintActionEnum,
    MEMBERAGGRMAINT: 'MEMBERAGGRMAINT' as MaintActionEnum,
    SPHMAINT: 'SPHMAINT' as MaintActionEnum,
    ACCOUNTTRANSFER: 'ACCOUNTTRANSFER' as MaintActionEnum,
    REACTIVATECLAIM: 'REACTIVATECLAIM' as MaintActionEnum
  };
}

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
export interface AccountLockVO {
    memberNumber?: string;
    accountLockId?: string;
    lockStatus?: AccountLockVO.LockStatusEnum;
}

export namespace AccountLockVO {
    export type LockStatusEnum = 'LOCKED' | 'UNLOCKED';
    export const LockStatusEnum = {
        LOCKED: 'LOCKED' as LockStatusEnum,
        UNLOCKED: 'UNLOCKED' as LockStatusEnum
    };
}

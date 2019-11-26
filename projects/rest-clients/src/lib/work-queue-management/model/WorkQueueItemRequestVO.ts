/**
 * work-queue-management
 * Services to support Work Queue Management
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface WorkQueueItemRequestVO {
  wqiId?: number;
  userId?: string;
  reason?: string;
  wqiBusinessId?: string;
  businessIdType?: number;
  queue?: string;
  assignedBy?: string;
  followUpDate?: string;
  urgency?: number;
  lockedBy?: string;
}
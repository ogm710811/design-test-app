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
import {MetadataVO} from './MetadataVO';

export interface WorkQueueItemMetadataVO {
  wqiId?: number;
  userId?: string;
  processId?: number;
  reason?: string;
  wqiBusinessId?: string;
  businessIdType?: number;
  businessIdTypeDesc?: string;
  createdDate?: string;
  queue?: string;
  queueName?: string;
  assignedBy?: string;
  lockedBy?: string;
  followUpDate?: string;
  urgency?: number;
  checked?: boolean;
  metadata?: MetadataVO;
}

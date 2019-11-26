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
import {WorkQueueItemMetadataVO} from './WorkQueueItemMetadataVO';

export interface PagedResourcesOfResourcesOfQueueItemDetailsVO {
  content?: Array<WorkQueueItemMetadataVO>;
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  first?: boolean;
  numberOfElements?: number;
  size?: number;
  number?: number;
  sort?: string;
}

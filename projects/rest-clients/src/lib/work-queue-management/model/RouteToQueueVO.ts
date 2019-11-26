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
import {WorkQueueItemRequestVO} from './WorkQueueItemRequestVO';

export interface RouteToQueueVO {
  queueTarget?: number;
  routeReason?: string;
  endSession?: boolean;
  items?: Array<WorkQueueItemRequestVO>;
}
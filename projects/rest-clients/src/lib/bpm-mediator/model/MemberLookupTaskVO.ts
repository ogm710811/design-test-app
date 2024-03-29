/**
 * bpm-mediator
 * BPM Mediator to facilitate interactions between BPM and other services
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface MemberLookupTaskVO {
  processId?: string;

  taskId?: string;

  assignedTo?: string;

  createdOn?: string;

  activationTime?: string;

  expirartionDate?: string;

  memRecNo?: string;

  isMemberMatched?: boolean;

  isBypass?: boolean;

  bypassReason?: string;

  status?: string;

}

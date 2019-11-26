/**
 * fox-claims-document
 * Custom developed service operations to support document and document meta-data processing to enable capabilities such as paper non claims.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {DocumentCheckVO} from './DocumentCheckVO';
import {DocumentClaimVO} from './DocumentClaimVO';
import {DocumentMemberVO} from './DocumentMemberVO';

export interface DocumentVO {
  documentId?: number;
  fileControlId?: number;
  docControlNumber?: string;
  member?: DocumentMemberVO;
  claim?: DocumentClaimVO;
  check?: DocumentCheckVO;
  queueInformation?: string;
  bpmProcessInstanceId?: string;
  feedbackInfo?: string;
  documentType?: string;
  formType?: string;
  asiMailIndicator?: string;
  employerBusinessIndicator?: string;
  healthAlliesIndicator?: string;
  fekPullReason?: string;
  rnfStatus?: string;
  routingErrorIndicator?: string;
  rescanDocumentControlNumber?: string;
}
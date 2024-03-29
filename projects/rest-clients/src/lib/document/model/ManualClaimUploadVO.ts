/**
 * document-management
 * An orchestration service using FOX services and Exela Mediator to enable the retrieval of document images and managing documents, such as separating, deleting, and uploading.
 *
 * OpenAPI spec version: v1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ManualClaimDetailVO } from './ManualClaimDetailVO';

export interface ManualClaimUploadVO {
  filename?: string;
  application?: string;
  documentBinary?: string;
  documentFile?: string;
  manualClaimDetail?: ManualClaimDetailVO;
}

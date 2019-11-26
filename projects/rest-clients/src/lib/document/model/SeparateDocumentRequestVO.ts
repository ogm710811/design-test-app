/**
 * Document Management
 * Orchestrate and facilitate interactions between services for Document Management
 *
 * OpenAPI spec version: v1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {DocumentVO} from './DocumentVO';

export interface SeparateDocumentRequestVO {
  separationPages?: string;
  filename?: string;
  uploadDate?: Date;
  document?: DocumentVO;
}
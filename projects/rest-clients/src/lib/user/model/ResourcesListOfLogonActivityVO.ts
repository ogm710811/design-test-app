/**
 * user
 * Provides Oauth 2 Authentication and system configuration services for FOX. The Oauth2 endpoints support user authentication and granted authorities. Both static and user-set configuration data in the fox data store is accessed and maintained though the configuration endpoints.  Granted authorities defined in this data are also returned in the uaa/user response.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ResourceOfLogonActivityVO} from './ResourceOfLogonActivityVO';

export interface ResourcesListOfLogonActivityVO {
  items?: Array<ResourceOfLogonActivityVO>;
}

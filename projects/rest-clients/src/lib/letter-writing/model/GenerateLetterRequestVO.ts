/**
 * Letter Writing Mediator
 * This is the letter-writing mediator REST API
 *
 * OpenAPI spec version: 1.0.0
 * Contact: gaohly_yang@uhc.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ClaimDetailsVO} from './ClaimDetailsVO';
import {LetterInsuredPlanVO} from './LetterInsuredPlanVO';
import {LetterMemberDetailsVO} from './LetterMemberDetailsVO';

export interface GenerateLetterRequestVO {
  memberDetails?: LetterMemberDetailsVO;
  insuredPlan?: Array<LetterInsuredPlanVO>;
  claimDetails?: ClaimDetailsVO;
}

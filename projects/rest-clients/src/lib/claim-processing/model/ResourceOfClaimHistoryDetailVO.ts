/**
 * fox-claims
 * Monolithic-style application containing generated components from legacy code modernization and custom developed APIs to support core claim processing.
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {ClaimHistoryMemberVO} from './ClaimHistoryMemberVO';

export interface ResourceOfClaimHistoryDetailVO {
  claimHistoryMember?: ClaimHistoryMemberVO;
  claimNoteId?: number;
  claimDosFromDate?: string;
  claimDosToDate?: string;
  chKey?: number;
  claimHistoryStatus?: string;
  claimHistoryStatusCode?: string;
  noPayIndicator?: string;
  primaryIcdCode?: string;
  claimTypeIndicator?: string;
  assignedIndicator?: string;
  totBilledAmt?: string;
  totBenefitAmt?: string;
  amtPlanPaid?: string;
  processDate?: string;
  combinedStatusIndicator?: string;
  paymentType?: string;
  paymentDate?: string;
  irsWithholding?: string;
  eobSentDate?: string;
  raSentDate?: string;
  eobType?: string;
  eobIndicator?: string;
  totPaidToMember?: string;
  memberSubtotal?: string;
  memberAdjustment?: string;
  totPaidToProvider?: string;
  providerAdjustment?: string;
  providerSubtotal?: string;
  adjustmentClaimNum?: string;
  patientNum?: string;
  additionalIcdCode?: string;
  drg?: string;
  dischargeStatus?: string;
  attendingProvName?: string;
  facilityCode?: string;
  frequencyCode?: string;
  totCoinsurance?: string;
  totCopay?: string;
  totDeductible?: string;
  payAfterTermDate?: string;
  origPaymentMedicare?: string;
  origDateMedicare?: string;
  origAmtApprovedMedicare?: string;
  totCoinsuranceMedicare?: string;
  totDeductibleMedicare?: string;
  totPaidAmtMedicare?: string;
  ineligibleAmtTotalMedicare?: string;
  totApprovedMedicare?: string;
  totChargeAmountMedicare?: string;
  dateOfEomb?: string;
  medicareClaimNum?: string;
  billingProvName?: string;
  billingProvTin?: string;
  billingProvNpi?: string;
  billingProvAddressLn1?: string;
  billingProvAddressLn2?: string;
  billingProvAddressCty?: string;
  billingProvAddressSt?: string;
  billingProvAddressZipCd?: string;
  specialHandlingCode?: string;
  achPaymentInd?: string;
  links?: { [key: string]: { [key: string]: string; }; };
}

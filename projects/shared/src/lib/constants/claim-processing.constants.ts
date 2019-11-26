export const claimProcessingRoutePathRoot = 'claim-processing';
export const claimProcessingRouteLabelRoot = 'Claim Processing';

export const claimProcessingRoutePathSearch = 'claim-search';
export const claimProcessingRouteLabelSearch = 'Claim Intake Search';
export const claimProcessingRouteCommandSearch = 'LS';

export const claimProcessingRoutePathHistory = 'claim-history';
export const claimProcessingRouteLabelHistory = 'Claim History Search';
export const claimProcessingRouteCommandHistory = 'CS';

export const claimProcessingRoutePathArgClaimDetails = 'claimNumber';
export const claimProcessingRoutePathPrefixClaimDetails = 'claim-details/';
export const claimProcessingRoutePathWithArgsClaimDetails = claimProcessingRoutePathPrefixClaimDetails + ':' + claimProcessingRoutePathArgClaimDetails;
export const claimProcessingRouteLabelClaimDetails = 'Claim Detail';
export const claimProcessingUrlPrefixClaimDetails = '/' + claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathPrefixClaimDetails;

export const claimProcessingRoutePathProcess = 'process-claim';
export const claimProcessingRouteLabelProcess = 'Process Claim';
export const claimProcessingRouteCommandProcess = 'PC';

export const claimProcessingRoutePathVerificationError = 'verification-error';
export const claimProcessingRouteLabelVerificationError = 'Verification Error';
export const claimProcessingRouteCommandVerificationError = 'ZE';

export const claimProcessingRoutePathSuspenseError = 'suspense-error';
export const claimProcessingRouteLabelSuspenseError = 'Suspense Error';
export const claimProcessingRouteCommandSuspenseError = 'ZF';

export const claimProcessingRoutePathCarrierOnHand = 'carrier-on-hand';
export const claimProcessingRouteLabelCarrierOnHand = 'Carrier/On Hand';
export const claimProcessingRouteCommandCarrierOnHand = 'ZO';

export const claimProcessingRoutePathSuspenseProcess = 'suspense-process';
export const claimProcessingRouteLabelSuspenseProcess = 'Suspense Process';
export const claimProcessingRouteCommandSuspenseProcess = 'ZS';

export const claimProcessingRoutePathVerification = 'verification';
export const claimProcessingRouteLabelVerification = 'Verification';

export const claimProcessingRoutePathQrErrInquiry = 'qr-err-inquiry';
export const claimProcessingRouteLabelQrErrInquiry = 'QR Err Inquiry';
export const claimProcessingRouteCommandQrErrInquiry = 'QE';

export const claimProcessingRoutePathQrMicrofilmRequest = 'qr-microfilm-req';
export const claimProcessingRouteLabelQrMicrofilmRequest = 'QR Microfilm Request';
export const claimProcessingRouteCommandQrMicrofilmRequest = 'QF';

export const claimProcessingRoutePathQrInfo = 'qr-info';
export const claimProcessingRouteLabelQrInfo = 'QR Info';
export const claimProcessingRouteCommandQrInfo = 'QI';

export const claimProcessingRoutePathQrReval = 'qr-reval';
export const claimProcessingRouteLabelQrReval = 'QR Reval';
export const claimProcessingRouteCommandQrReval = 'QQ';

export const claimProcessingRoutePathQrRev = 'qr-rev';
export const claimProcessingRouteLabelQrRev = 'QR Rev';
export const claimProcessingRouteCommandQrRev = 'QR';

export const claimProcessingRoutePathQrSequenceInquiry = 'qr-sequence-inquiry';
export const claimProcessingRouteLabelQrSequenceInquiry = 'QR Sequence Inquiry';
export const claimProcessingRouteCommandQrSequenceInquiry = 'QS';

export const claimProcessingRoutePathQrVolume = 'qr-volume';
export const claimProcessingRouteLabelQrVolume = 'QR Volume';
export const claimProcessingRouteCommandQrVolume = 'QV';

export const claimProcessingMenuId = 'claim-proc-left';

export const claimProcessingMenuGroupClaimsId = 'claims';
export const claimProcessingMenuGroupClaimsLabel = 'Claims';

export const claimProcessingMenuGroupQRId = 'quality-review';
export const claimProcessingMenuGroupQRLabel = 'Quality Review Menu';

export const claimProcessingRoutePathMemLookupOrig = 'member-lookup-queue-original';
export const claimProcessingRoutePathMemLookup = 'member-lookup-queue';
export const claimProcessingRouteLabelMemLookup = 'Member Lookup Queue';
export const claimProcessingRouteCommandMemLookup = 'MQ';

export const claimProcessingRoutePathBypassOrig = 'bypass-queue-original';
export const claimProcessingRoutePathBypass = 'bypass-queue';
export const claimProcessingRouteLabelBypass = 'Bypass Queue';
export const claimProcessingRouteCommandBypass = 'BQ';

export const claimProcessingRoutePathBypassMgmt = 'bypass-queue-management';
export const claimProcessingRouteLabelBypassMgmt = 'Bypass Queue Management';
export const claimProcessingRouteCommandBypassMgmt = 'BM';

export const claimProcessingRoutePathDupeClaimCheck = 'duplicate-claim-check';
export const claimProcessingRouteLabelDupeClaimCheck = 'Duplicate Claim Check';
export const claimProcessingRouteCommandDupeClaimCheck = 'DC';

export const claimProcessingRoutePathManualClaimIntake = 'manual-claim-intake';
export const claimProcessingRouteLabelManualClaimIntake = 'Manual Claim Intake';
export const claimProcessingRouteCommandManualClaimIntake = 'MC';
export const claimProcessingUrlManualClaimIntake = '/' + claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathManualClaimIntake;

export const claimProcessingRoutePathManualClaimReceipt = 'manual-claim-intake/manual-claim-receipt';
export const claimProcessingRouteLabelManualClaimReceipt = 'Manual Claim Receipt';
export const claimProcessingUrlManualClaimReceipt = '/' + claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathManualClaimReceipt;

export const claimProcessingRoutePathMaintenanceApproval = 'maintenance-approval';
export const claimProcessingRouteLabelMaintenanceApproval = 'Maintenance Approval';
export const claimProcessingRouteCommandMaintenanceApproval = 'RM';

export const claimProcessingRoutePathClaimEligibility = 'process-claim-eligibility';
export const claimProcessingRouteLabelClaimEligibility = 'Process Claim - Eligibility';
export const claimProcessingRouteCommandClaimEligibility = 'PC';

export const claimProcessingRoutePathMedSuppCharge = 'med-supp-charge';
export const claimProcessingRouteLabelMedSuppCharge = 'Process Claim - Medicare Supplement Screen A';
export const claimProcessingRouteCommandMedSuppCharge = 'MA';

export const claimProcessingRoutePathMedSuppChargeB = 'med-supp-chargeb';
export const claimProcessingRouteLabelMedSuppChargeB = 'Process Claim - Medicare Supplement Screen B';
export const claimProcessingRouteCommandMedSuppChargeB = 'MB';

export const claimProcessingRoutePathHospital = 'process-claim-hospital';
export const claimProcessingRouteLabelHospital = 'Process Claim Hospital';

export const reportsFeature = 'reports';
export const claimHistoryMaintenanceFeature = 'claimHistoryMaintenance';
export const claimHistoryIwriteFeature = 'claimHistoryIwrite';
export const qrFeature = 'qr';

export const claimProcessingRoutePathUpdateCrossRef = 'cross-ref-update';
export const claimProcessingRouteLabelUpdateCrossRef = 'Cross-Reference Update Request';

export const claimProcessingRoutePathReactivateClaim = 'reactivate-claim';
export const claimProcessingRouteLabelReactivateClaim = 'Reactivate Claim Request';

export const claimProcessingRoutePathDeleteClaim = 'delete-claim';
export const claimProcessingRouteLabelDeleteClaim = 'Delete Claim Request';

export const claimProcessingRoutePathTransferClaim = 'transfer-claim';
export const claimProcessingRouteLabelTransferClaim = 'Transfer Claim Request';

export const claimProcessingRoutePathUpdateEob = 'update-eob';
export const claimProcessingRouteLabelUpdateEob = 'Update EOB Request';

export const claimProcessingRoutePathTransferMember = 'transfer-member';
export const claimProcessingRouteLabelTransferMember = 'Transfer Member Request';

export const claimProcessingRoutePathUpdateSplHandling = 'update-spl-handling';
export const claimProcessingRouteLabelUpdateSplHandling = 'Special Handling Code Update Request';

export const claimProcessingRoutePathUpdateMemberAggregate = 'update-member-aggregate';
export const claimProcessingRouteLabelUpdateMemberAggregate = 'Member Aggregate Update Request';

export const claimProcessingRoutePathProviderValidation = 'manual-claim-intake/provider-validation';
export const claimProcessingRouteLabelProviderValidation = 'Provider Validation';
export const claimProcessingRouteCommandProviderValidation = 'PV';
export const claimProcessingUrlProviderValidation = claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathProviderValidation;

export const claimProcessingRoutePathTypeOfService = 'type-of-service';
export const claimProcessingRouteLabelTypeOfService = 'Type Of Service';

export const claimProcessingRoutePathProcessClaimNopay = 'process-claim-no-pay';
export const claimProcessingRouteLabelProcessClaimNopay = 'Process Claim No Pay';

export const claimProcessingRoutePathProcessClaimNopayEob = 'process-claim-no-pay-eob';
export const claimProcessingRouteLabelProcessClaimNopayEob = 'Process Claim No Pay Eob';

export const claimProcessingRoutePathProcessClaiHospSnf = 'process-claim-hosp-snf-eob';
export const claimProcessingRouteLabelProcessClaimHospSnf = 'Process Claim Hosp Snf Eob';

export const claimProcessingRoutePathMedicalVisit = 'medical-visit';
export const claimProcessingRouteLabelMedicalVisit = 'Medical Visit';

export const claimProcessingRoutePathReviewBillLineMessages = 'review-bill-line-messages';
export const claimProcessingRouteLabelReviewBillLineMessages = 'Review BillLine Messages';

export const claimProcessingRoutePathBillLineMessages = 'bill-line-messages';
export const claimProcessingRouteLabelBillLineMessages = 'Bill Line Messages';

export const claimProcessingRoutePathProcessClaimMessages = 'process-claim-messages';
export const claimProcessingRouteLabelProcessClaimMessages = 'Process Claim messages';

export const claimProcessingRoutePathProcessAddrVerf = 'process-address-verfication';
export const claimProcessingRouteLabelProcessAddrVerf = 'Process Address Verfication';

export const claimProcessingRoutePathProcessEndofClaim = 'process-end-of-claim';
export const claimProcessingRouteLabelProcessEndofClaim = 'Process End Of Claim';

export const claimProcessingRoutePathServiceEob = 'service-eob';
export const claimProcessingRouteLabelServiceEob = 'Service Eob';

export const claimProcessingRoutePathDrugChrg = 'mc-claim-drugchrg';
export const claimProcessingRouteLabelDrugChrg = 'MC Drug Charge';

export const claimProcessingRoutePathClaimDrugEob = 'mc-claim-drugeob';
export const claimProcessingRouteLabelClaimDrugEob = 'MC Claim Drug EOB';

export const claimProcessingRoutePathReviewClaimMessages = 'review-claim-messages';
export const claimProcessingRouteLabelReviewClaimMessages = 'Review Claim Messages';

export const claimProcessingRoutePathProcessAddtionalClaimInfo = 'process-claim-addtional-claim-info';
export const claimProcessingRouteLabelProcessAddtionalClaimInfo = 'Process Claim Addtional Claim Info';

export const claimProcessingRoutePathProcessClaimException = 'process-claim-exception';
export const claimProcessingRouteLabelProcessClaimException = 'Process Claim Exception';

export const claimProcessingRoutePathProcessClaimExceptionB = 'process-claim-exception-b';
export const claimProcessingRouteLabelProcessClaimExceptionB = 'Process Claim Exception B';

export const claimProcessingRoutePathProcessClaimHomeHealth = 'process-claim-home-health';
export const claimProcessingRouteLabelProcessClaimHomeHealth = 'Process Claim Home Health';

export const claimProcessingRoutePathClaimSuspendClm = 'process-claim-suspendclaim';
export const claimProcessingRouteLabelClaimSuspendClm = 'Process Suspended Claim';

export const claimProcessingRoutePathNursingCharge = 'process-claim-nursing-charge';
export const claimProcessingRouteLabelNursingCharge = 'Process Claim Nursing';

export const claimProcessingRoutePathBillLineSpecialMemo = 'bill-line-special-memo';
export const claimProcessingRouteLabelBillLineSpecialMemo = 'Bill Line Special Memo';

export const claimProcessingRoutePathElectronicClaimVerfSuspProcess = 'electronic-claim-verf-susp-process';
export const claimProcessingRouteLabelElectronicClaimVerfSuspProcess = 'Electronic Claim - ';
export const claimProcessingRouteCommandElectronicClaimVerification = 'ZV';
export const claimProcessingRouteCommandElectronicClaimSuspension = 'ZS';

export const claimProcessingRoutePathClaimMedSuppEob = 'process-claim-medsupp-eob';
export const claimProcessingRouteLabelClaimMedSuppEob = 'Process Med Supp EOB';

export const claimProcessingRoutePathElectronicClaimVerfMaint = 'electronic-claim-verf-maint';
export const claimProcessingRouteLabelElectronicClaimVerfMaint = 'Electronic Claim Verfication Maintenance';

export const claimProcessingRoutePathElectronicClaimVerfBillLine = 'electronic-claim-verf-bill-line';
export const claimProcessingRouteLabelElectronicClaimVerfBillLine = 'Electronic Claim Verfication Bill Lines';

export const claimProcessingRoutePathElectronicClaimVerfDrugBillLine = 'electronic-claim-verf-drug-bill-line';
export const claimProcessingRouteLabelElectronicClaimVerfDrugBillLine = 'Electronic Claim Verfication Drug Bill Lines';

export const claimProcessingRoutePathDupClaimCheck = 'duplicate-claim-check';
export const claimProcessingRouteLabelDupClaimCheck = 'Duplicate Claim Check';

export const claimProcessingRoutePathRescannedImages = 'rescanned-claim-images';
export const claimProcessingRouteLabelRescannedImages = 'Rescanned Claim Images';
export const claimProcessingRouteCommandRescannedImages = 'RI';

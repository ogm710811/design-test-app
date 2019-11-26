import {RpsTsBenefitLineTable} from './rps-ts-benefit-line-table.model';
import {RpsTsChargeLineTable} from './rps-ts-charge-line-table.model';

/**
 * Model class PbmClmProcTsq
 * Path: bean/tsq
 * Model: com::uhc::aarp::fox::domain::bean::tsq::PbmClmProcTsq
 * Legacy Mapping: RPS-TEMPORARY-STORAGE-QUE
 */
export class PbmClmProcTsq {
  errFileHold = '';
  errReturnMessageHold = '';
  wsHospPatientNo = '';
  wsRpsQueueName = '';
  rpsClaimQueueLength = 0;
  wsRpsQueueItemno = 0;
  wsPosResp = 0;
  rpsTsName = '';
  rpsTsManualProcessInd = '';
  rpsTsChargeLineTables: RpsTsChargeLineTable[] = [];
  rpsTsInsuredCode = 0;
  rpsTsMaxMetIndicator = '';
  rpsTsRejectErrorCodes = 0;
  rpsTsErrFiles = '';
  rpsTsErrReturnMessage = '';
  rpsTsBenefitLineTables: RpsTsBenefitLineTable[] = [];
  rpsTsTrasmissionType = '';
  rpsTsTrasmissionStatus = 0;
  rpsTsMessage = '';
  rpsTsInvoiceMessageInd = '';
  rpsTsLetterMessageInd = '';
  rpsTsClaimNumber = '';
  rpsTsClaimNumber9 = 0;
  rpsTsNabpNumberOut = '';
  rpsTsNabpNumberOut9 = 0;
  rpsTsCustomerNumberOut = '';
  rpsTsCustomerNumberOut9 = 0;
  filler2 = '';
  rpsTsMemNumAssocNum = '';
  rpsTsInvoiceDate = '';
  rpsTsTempInvoiceNumber = '';
  rpsTsInsuredSexCode = '';
  rpsTsInsuredDateOfBirth = '';
  rpsTsInsuredDateOfBirth9 = 0;
  rpsTsCustomerNumber = '';
  rpsTsCustomerNumber9 = 0;
  rpsTsCardHolderName = '';
  rpsTsNabpNumber = '';
  rpsTsNabpNumber9 = 0;
  rpsTsTin = '';
  rpsTsTin9 = 0;
  rpsTsItemsTransmitted = '';
  rpsTsItemsTransmitted9 = 0;
  rpsTemporaryStorageCharges = '';
  filler1 = '';
  rpsTsInsuredLast = '';
  rpsTsInsuredFirst = '';
}

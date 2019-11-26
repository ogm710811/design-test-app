import {ScreenAccountNo} from './screen-account-no.model';
import {ScreenClaimNo} from './screen-claim-no.model';
import {WsCriticalErrorMessage} from './ws-critical-error-message.model';
import {WsCurrencyFields} from './ws-currency-fields.model';
import {WsErrorMessages} from './ws-error-messages.model';
import {WsFormatConversionFields} from './ws-format-conversion-fields.model';
import {WsIonsFields} from './ws-ions-fields.model';
import {WsMapDataLine} from './ws-map-data-line.model';
import {WsOpTsq} from './ws-op-tsq.model';
import {WsScreenPageNo} from './ws-screen-page-no.model';

/**
 * Model class WorkStorage
 * Path: screenbean/ovpayrefundhist
 * Model: com::uhc::aarp::fox::domain::screenbean::ovpayrefundhist::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  wsResp = 0;
  maxLines = 0;
  nopRemainder = 0;
  wsCommLength = 0;
  wsAccountNumber = 0;
  wsClaimNumber = 0;
  yearDivide = 0;
  leapYear = 0;
  leapChk = 0;
  rpdiskbgEofInd = '';
  validRefundTypeInd = '';
  validAdjustmentInd = '';
  dateErrorInd = '';
  futureDateErrorInd = '';
  dataEntryErrorInd = '';
  validationCompleteInd = '';
  sub = 0;
  sub1 = 0;
  subA = 0;
  subCa = 0;
  subOp = 0;
  mapSub = 0;
  subSel = 0;
  subError = 0;
  lineSub = 0;
  wsCurrencyFields = new WsCurrencyFields();
  wsIonsFields = new WsIonsFields();
  wsEibdateField = 0;
  wsIntegerDate = 0;
  wsCurrentDate = 0;
  wsCurrentTime = 0;
  workDateMdyX = '';
  screenClaimNo = new ScreenClaimNo();
  screenAccountNo = new ScreenAccountNo();
  wsScreenPageNo = new WsScreenPageNo();
  wsCriticalErrorMsg = new WsCriticalErrorMessage();
  wsDateCymd = '';
  wsErrorMessages = new WsErrorMessages();
  wsFormatConversionFields = new WsFormatConversionFields();
  wsOptsq = new WsOpTsq();
  workDateYmd = '';
  wsMapDataLine = new WsMapDataLine();
  validationCompleted = '';
  validRefundType = '';
  refundTypeError = '';
  refundDateError = '';
  flwupDateError = '';
  adjustmentError = '';
  dateError = '';
  futureDateError = '';
  noDataError = '';
  refundAmtError = '';
  rpdiskbgEof = '';
}

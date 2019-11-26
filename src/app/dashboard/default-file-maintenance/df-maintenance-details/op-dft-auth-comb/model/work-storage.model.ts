/**
 * Model class WorkStorage
 * Path: screenbean/operauthcombdflt
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcombdflt::WorkStorage
 * Legacy Mapping: SUBSCRIPTS
 */
import {CompressTable} from './compress-table.model';

export class WorkStorage {
  sub = 0;
  lsub = 0;
  row = 0;
  screenSub = 0;
  wsCommPos = 0;
  compressInd = '';
  fieldValuedInd = '';
  stateFoundInd = '';
  planTosFoundInd = '';
  operItemIndicator = '';
  searchOperLevel = 0;
  searchOperPos = '';
  vkeyRecType = '';
  vkeyMenuSelection = '';
  vkeyMenuType = '';
  vkeyMenuValue = '';
  wsFileName = '';
  wsScreenPosition = '';
  wsRecordAccessed = '';
  wsUnpackPct = 0;
  wsUnpackIons = 0;
  wsMaintIons = 0;
  rbaFld = 0;
  holdVerifRecord = '';
  wsCaution = '';
  wsResponseCode = 0;
  wsRpdiskqbTypeCode = '';
  wsRpdiskqbKeyType1 = '';
  wsRpdiskqbKeyType2 = '';
  qbErrorCode = 0;
  qbErrorMsg = '';
  wsAuthLevel = '';
  wsAuthPos = '';
  dkeyValue = '';
  dkeyRecType = '';
  wsDateArea = 0;
  reformatDate = '';
  holdStartDate = 0;
  holdYearCalc = 0;
  wsMaintDate = '';
  lastDays: number[] = [];
  compressTable: CompressTable[] = [];
}

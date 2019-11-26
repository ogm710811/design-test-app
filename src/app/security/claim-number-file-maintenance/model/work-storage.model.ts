import {LuwReturnFields} from '@fox/shared';
import {DuplicateTable} from './duplicate-table.model';
import {StatusValues} from './status-values.model';

/**
 * Model class WorkStorage
 * Path: screenbean/clmnbrfilemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrfilemnt::WorkStorage
 * Legacy Mapping: HOLD-AREAS
 */
export class WorkStorage {
  errorOnOperatorInd = '';
  firstClaimnumReadInd = '';
  mapHoldStatus = '';
  unpackMembNumX = '';
  sub = 0;
  statSub = 0;
  mapSub = 0;
  statusValues: StatusValues[] = [];
  invalidClaimInd = '';
  holdClaimNumStatus = '';
  claimNoKey = 0;
  memberNoKey = 0;
  holdYear = '';
  holdDays = '';
  holdOver = '';
  filler2 = '';
  holdCn1ClaimNum = 0;
  holdCn1MembNum = 0;
  holdCn1Status = '';
  holdCn1LeCode = '';
  holdCn1ReCode = '';
  holdCn1OvcpCode = '';
  holdCn2ClaimNum = 0;
  holdCn2MembNum = 0;
  holdCn2Status = '';
  holdCn2LeCode = '';
  holdCn2ReCode = '';
  holdCn2OvcpCode = '';
  duplicateTables: DuplicateTable[] = [];
  filler4 = '';
  finishDi821 = '';
  luwReturnFields = new LuwReturnFields();
}

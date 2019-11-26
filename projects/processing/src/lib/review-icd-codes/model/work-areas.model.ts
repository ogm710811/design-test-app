import { IcdKey } from './icd-key.model';

/**
 * Model class WorkAreas
 * Path: screenbean/rvwicdservice
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwIcdService::WorkAreas
 * Legacy Mapping: WORK-AREAS
 */
export class WorkAreas {
  commandEnteredInd = '';
  sub = 0;
  sub2 = 0;
  icdKey = new IcdKey();
  holdNum = 0;
  scrollInd = '';
  ssub = 0;
  browseKey = '';
  userId = '';
  binaryUserId = 0;
  recordCounter = 0;
  stopReadFlag = '';
}

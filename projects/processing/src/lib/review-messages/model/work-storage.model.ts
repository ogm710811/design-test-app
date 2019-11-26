/**
 * Model class WorkStorage
 * Path: screenbean/rvwmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwmessages::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  commandEnteredInd = '';
  ansiKey = '';
  responseCode = 0;
  wsEMTextArea = '';
  messageNum = 0;
  messageLangInd = '';
  wsEMTexts: string[] = [];
}

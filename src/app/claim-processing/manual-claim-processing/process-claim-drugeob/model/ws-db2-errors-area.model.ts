/**
 * Model class WsDb2ErrorsArea
 * Path: screenbean/procclmdrugeobservice
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmdrugeobservice::WsDb2ErrorsArea
 * Legacy Mapping: WS-DB2-ERRORS-AREA
 */
export class WsDb2ErrorsArea {
  wdeaCurrTimestmp = new Date();
  wdeaProgram = '';
  wdeaStmntNo = '';
  wdeaErrTxtLen = +80;
  wdeaSavedRecPos = 0;
  sqlHeadRecPos = +1;
  sqlErrLength = +1007;
  wdeaSavedSqlcode = 0;
}

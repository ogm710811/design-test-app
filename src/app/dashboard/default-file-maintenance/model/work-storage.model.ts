import { CommComm } from './comm-comm.model';
import { OperdefCommareaMiscFields } from './operdef-commarea-misc-fields.model';
import { VerifKey } from './verif-key.model';
import { WsCopyMessage } from './ws-copy-message.model';
import { WsPrimaryKey } from './ws-primary-key.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::WorkStorage
 * Legacy Mapping: WORK-AREAS
 */
export class WorkStorage {
  wsCommareaLength = 0;
  wsCommCommLength = 0;
  rpdiskcvRecLen = 0;
  locsTables: string[] = [];
  wsInputDivision = 0;
  wsTemplNumber = '';
  wsSecurity = '';
  wsDivLocKey = '';
  wsSelection = '';
  wsProgram = '';
  wsPrimaryKey = new WsPrimaryKey();
  verifKey = new VerifKey();
  wsMessage1 = '';
  wsCopyMessage = new WsCopyMessage();
  wsTemplateNum = '';
  wsOperatorSite = '';
  wsTemplValueNum = '';
  wsSite = '';
  sub = 0;
  tmSub = 0;
  wsSub = 0;
  spaceErrorFile = '';
  templateFoundSw = '';
  templateBlankSw = '';
  divisionFoundSw = '';
  existenceInd = '';
  commComm = new CommComm();
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  operdefCommareaMiscFields = new OperdefCommareaMiscFields();
}

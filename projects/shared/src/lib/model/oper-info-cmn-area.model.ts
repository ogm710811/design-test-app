import {OpcomMessageSwitches} from './opcom-message-switches.model';

/**
 * Model class OperInfoCmnArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::OperInfoCmnArea
 * Legacy Mapping: WS-MODULE-COMMAREA
 */
export class OperInfoCmnArea {
  opcomTransactionSecurity = '';
  origTransactionSecurity = '';
  opcomSelection = '';
  opcomMessageInd = '';
  opcomVerifySwitch = '';
  opcomCompressName = '';
  opcomLastName = '';
  opcomFirstName = '';
  opcomIonsId = 0;
  opcomStartLname = '';
  opcomStartFname = '';
  opcomStartIons = 0;
  opcomEndingLname = '';
  opcomEndingFname = '';
  opcomEndingIons = 0;
  opcomBrowseInd = '';
  opcom1stBrowseInd = '';
  opcomOperatorEofSw = '';
  opcomNoMoreMatches = '';
  transSecuritySwitch = '';
  planScreenSwitch = '';
  opcomUaAuthLevel = '';
  opcomMessageSwitches: OpcomMessageSwitches[] = [];
}

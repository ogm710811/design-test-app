import { OpcomMessageTable } from './opcom-message-table.model';

/**
 * Model class OperatorCommareaMiscFields
 * Path: screenbean/opermntmenuservice
 * Model: com::uhc::aarp::fox::domain::screenbean::opermntmenuservice::OperatorCommareaMiscFields
 * Legacy Mapping: OPERATOR-COMMAREA-MISC-FIELDS
 */

export class OperatorCommareaMiscFields {
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
  opcomMessageTable = new OpcomMessageTable();
  transSecuritySwitch = '';
  planScreenSwitch = '';
  filler24 = '';
  opcomUaAuthLevel = '';
}

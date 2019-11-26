import {OpcomMessageTable} from '../../../model/opcom-message-table.model';
import {OpcomUpdateAuthorityFields} from './opcom-update-authority-fields.model';

/**
 * Model class OperatorCommareaMiscFields
 * Path: screenbean/operauthcomb
 * Model: com::uhc::aarp::fox::domain::screenbean::operauthcomb::OperatorCommareaMiscFields
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
  opcomUpdateAuthorityFields = new OpcomUpdateAuthorityFields();
  transSecuritySwitch = '';
  planScreenSwitch = '';
}

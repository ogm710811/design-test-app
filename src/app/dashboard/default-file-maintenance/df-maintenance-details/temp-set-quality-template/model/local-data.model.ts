import { AssignedMsgError } from './assigned-msg-error.model';
import { AwaitingVerifMsg } from './awaiting-verif-msg.model';
import { HoldLtrsTable } from './holdltrstable/hold-ltrs-table.model';
import { HoldSort10Table } from './holdsort10table/hold-sort10-table.model';
import { MaintDeniedMsg } from './maint-denied-msg.model';
import { Miscellaneous } from './miscellaneous.model';
import { PayNopayPercentFields } from './pay-nopay-percent-fields.model';
import { Subscripts } from './subscripts.model';
import { Switches } from './switches.model';
import { TemplateKey } from './template-key.model';
import { VerificationKey } from './verification-key.model';
import { WarningNumberMessage } from './warning-number-message.model';
import { WsAmountFields } from './ws-amount-fields.model';
import { WsDateArea } from './ws-date-area.model';
import { WsMaintDate } from './ws-maint-date.model';
import { WsModuleCommarea } from './wsmodulecommarea/ws-module-commarea.model';
import { WsTemplateRecord } from './wstemplaterecord/ws-template-record.model';

/**
 * Model class LocalData
 * Path: screenbean/setqltytmpltservice
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltservice::LocalData
 */
export class LocalData {
  wsTemplateRecord = new WsTemplateRecord();
  wsModuleCommarea = new WsModuleCommarea();
  subscripts = new Subscripts();
  miscellaneous = new Miscellaneous();
  wsDateArea = new WsDateArea();
  wsMaintDate = new WsMaintDate();
  payNopayPercentFields = new PayNopayPercentFields();
  wsAmountFields = new WsAmountFields();
  switches = new Switches();
  warningNumberMessage = new WarningNumberMessage();
  verificationKey = new VerificationKey();
  templateKey = new TemplateKey();
  maintDeniedMsg = new MaintDeniedMsg();
  awaitingVerifMsg = new AwaitingVerifMsg();
  holdSort10Table = new HoldSort10Table();
  holdLtrsTable = new HoldLtrsTable();
  assignedMsgError = new AssignedMsgError();
}

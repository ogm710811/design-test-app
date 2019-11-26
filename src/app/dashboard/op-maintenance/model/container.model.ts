import {Dfhcommarea} from '@fox/shared';
import {Dfhcommarea2} from './dfhcommarea2.model';
import {OpMaintenanceMenu} from './op-maintenance-menu.model';
import {OpcomMessageSwitches} from './opcom-message-switches.model';
import {OpcomMessageTable} from './opcom-message-table.model';
import {OperatorCommareaMiscFields} from './operator-commarea-misc-fields.model';
import {WorkStorage} from './work-storage.model';
import {WsInputArea} from './ws-input-area.model';
import {WsName} from './ws-name.model';
import {WsOutputArea} from './ws-output-area.model';

/**
 * Model class Container
 * Path: screenbean/opermntmenuservice
 * Model: com::uhc::aarp::fox::domain::screenbean::opermntmenuservice::Container
 */

export class Container {
  commonArea = new Dfhcommarea2();
  WorkStorage = new WorkStorage();
  WsOutputArea = new WsOutputArea();
  WsInputArea = new WsInputArea();
  opermntmenu = new OpMaintenanceMenu();
  WsName = new WsName();
  operatorCommareaMiscFields = new OperatorCommareaMiscFields();
  opcomMessageTable = new OpcomMessageTable();
  opcomMessageSwitches = new OpcomMessageSwitches();
  dfhcommarea = new Dfhcommarea();
}

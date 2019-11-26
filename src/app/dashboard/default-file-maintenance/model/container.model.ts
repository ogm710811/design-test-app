import {Dfhcommarea, OperDfltCmnArea} from '@fox/shared';
import {ComCmndI} from './com-cmnd-i.model';
import {OperDfltMntMenu} from './oper-dflt-mnt-menu.model';
import {OperdefCommareaMiscFields} from './operdef-commarea-misc-fields.model';
import {TemplateRecord} from './template-record.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::Container
 */
export class Container {
  workStorage = new WorkStorage();
  operDfltMntMenu = new OperDfltMntMenu();
  dfhcommarea = new Dfhcommarea();
  operdefCommareaMiscFields = new OperdefCommareaMiscFields();
  templateRecord = new TemplateRecord();
  comCmndI = new ComCmndI();
  operDfltCmnArea = new OperDfltCmnArea();
}

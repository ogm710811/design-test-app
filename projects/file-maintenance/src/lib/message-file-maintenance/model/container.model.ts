import {Dfhcommarea, JobControlPO} from '@fox/shared';
import {CicsScreenErrorMsg} from './cics-screen-error-msg.model';
import {ClmFileMntCmnArea} from './clm-file-mnt-cmn-area.model';
import {JnlRecord} from './jnl-record.model';
import {MsgInquiry} from './msg-inquiry.model';
import {MsgMntAddMsg} from './msg-mnt-add-msg.model';
import {MsgMntChangeMsg} from './msg-mnt-change-msg.model';
import {MsgMntMenu} from './msg-mnt-menu.model';
import {ScreenAtrChar} from './screen-atr-char.model';
import {WorkStorage} from './work-storage.model';
import {WsLocalTsqRec} from './ws-local-tsq-rec.model';

/**
 * Model class Container
 * Path: screenbean/messagemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::messagemnt::Container
 */
export class Container {
  workStorage = new WorkStorage();
  jnlRecord = new JnlRecord();
  msgMntChangeMsg = new MsgMntChangeMsg();
  msgInquiry = new MsgInquiry();
  msgMntAddMsg = new MsgMntAddMsg();
  msgMntMenu = new MsgMntMenu();
  screenAtrChar = new ScreenAtrChar();
  dfhCommArea = new Dfhcommarea();
  clmFileMntCmnArea = new ClmFileMntCmnArea();
  cicsScreenErrorMsg = new CicsScreenErrorMsg();
  jobControl = new JobControlPO();
  wsLocalTsqRec = new WsLocalTsqRec();
  isPattern = true;
}

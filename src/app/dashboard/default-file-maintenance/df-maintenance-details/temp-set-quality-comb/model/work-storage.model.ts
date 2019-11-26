import { AwaitingVerifMsg } from './awaiting-verif-msg.model';
import { ComSetqExclLocsCombos } from './com-setq-excl-locs-combos.model';
import { CompressRow } from './compress-row.model';
import { CompressTable } from './compress-table.model';
import { EachMonth } from './each-month.model';
import { HoldSort20Table } from './hold-sort20-table.model';
import { IoErrorMsg } from './io-error-msg.model';
import { LastSetqExclCombos } from './last-setq-excl-combos.model';
import { LeapResult } from './leap-result.model';
import { MaintDeniedMsg } from './maint-denied-msg.model';
import { Miscellaneous } from './miscellaneous.model';
import { NotOpenMsg } from './not-open-msg.model';
import { OverrideKey } from './override-key.model';
import { ReformatDate } from './reformat-date.model';
import { SetQVerificationLayout } from './set-qverification-layout.model';
import { Sort20Fields } from './sort20-fields.model';
import { SpaceErrorMsg } from './space-error-msg.model';
import { StateItem } from './state-item.model';
import { Subscripts } from './subscripts.model';
import { Switches } from './switches.model';
import { ValidLocationsTable } from './valid-locations-table.model';
import { VerificationKey } from './verification-key.model';
import { WsAmountFields } from './ws-amount-fields.model';
import { WsCautRedef } from './ws-caut-redef.model';
import { WsJrlVarArea } from './ws-jrl-var-area.model';
import { WsMaintDate } from './ws-maint-date.model';

/**
 * Model class WorkStorage
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::WorkStorage
 */
export class WorkStorage {
  panValet = '';
  subscripts = new Subscripts();
  switches = new Switches();
  verificationKey = new VerificationKey();
  miscellaneous = new Miscellaneous();
  wsCautRedef = new WsCautRedef();
  wsJrlVarArea = new WsJrlVarArea();
  wsAmountFields = new WsAmountFields();
  sort20Fields = new Sort20Fields();
  holdSort20Table = new HoldSort20Table();
  compressTable = new CompressTable();
  compressRow = new CompressRow();
  ioErrorMsg = new IoErrorMsg();
  spaceErrorMsg = new SpaceErrorMsg();
  notOpenMsg = new NotOpenMsg();
  awaitingVerifMsg = new AwaitingVerifMsg();
  maintDeniedMsg = new MaintDeniedMsg();
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  comSetqExclLocsCombos = new ComSetqExclLocsCombos();
  warningMsgSentSw = '';
  firstMapChangesSw = '';
  validLocationsTable = new ValidLocationsTable();
  lastSetqExclCombos = new LastSetqExclCombos();
  maintTermId = '';
  commareaPos = 0;
  stateItems: StateItem[] = [];
  wsDateArea = 0;
  reformatDate = new ReformatDate();
  reformatDate9 = 0;
  holdStartDate = 0;
  holdYearCalc = 0;
  leapResult = new LeapResult();
  lastDayOfTheMonth = '';
  eachMonth = new EachMonth();
  wsMaintDate = new WsMaintDate();
  wsDateYy = 0;
  wsDateMm = 0;
  wsDateDd = 0;
  setQVerificationLayout = new SetQVerificationLayout();
  wsResponseCode = 0;
  wsRpdiskqbTypeCode = '';
  wsRpdiskqbKeyType1 = '';
  wsRpdiskqbKeyType2 = '';
  qbErrorCode = 0;
  qbErrorMsg = '';
  wsStartCommarea = '';
  overrideKey = new OverrideKey();
}

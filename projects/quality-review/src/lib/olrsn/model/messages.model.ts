import { CicsErrorMsg } from './cics-error-msg.model';
import { CicsTransferErrMsg } from './cics-transfer-err-msg.model';
import { InvalidKeyMsg } from './invalid-key-msg.model';
import { NoReasonsMsg } from './no-reasons-msg.model';
import { Pf1SiteErrorMsg } from './pf1-site-error-msg.model';
import { RpdiskdmNotopenMsg } from './rpdiskdm-notopen-msg.model';
import { TopFiveMsg } from './top-five-msg.model';
import { UpdateAndTopFiveMsg } from './update-and-top-five-msg.model';
import { UpdateMsg } from './update-msg.model';

/**
 * Model class Messages
 * Path: screenbean/qltyrvwvolrsn
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvolrsn::Messages
 * Legacy Mapping: MESSAGES
 */
export class Messages {
  invalidKeyMsg = new InvalidKeyMsg();
  noReasonsMsg = new NoReasonsMsg();
  updateMsg = new UpdateMsg();
  updateAndTopFiveMsg = new UpdateAndTopFiveMsg();
  topFiveMsg = new TopFiveMsg();
  cicsErrorMsg = new CicsErrorMsg();
  pf1SiteErrorMsg = new Pf1SiteErrorMsg();
  rpdiskdmNotopenMsg = new RpdiskdmNotopenMsg();
  cicsTransferErrMsg = new CicsTransferErrMsg();
}

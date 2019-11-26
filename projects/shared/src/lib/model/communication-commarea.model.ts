import {ClmCmnctStatCmnArea} from './clm-cmnct-stat-cmn-area.model';
import {CmnctSuspSegMicroReq} from './cmnct-susp-seg-micro-req.model';
import {CommQualityArea} from './comm-quality-area.model';
import {CommComm} from './commonarea/comm-comm.model';
import {Mod41CommLink} from './mod41-comm-link.model';
import {NewCmnctCmnArea} from './new-cmnct-cmn-area.model';
import {TransferCommarea} from './transfer-commarea.model';

/**
 * Model class CommunicationCommarea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::CommunicationCommarea
 */
export class CommunicationCommarea {
  transferCommarea = new TransferCommarea();
  mod41CommLink = new Mod41CommLink();
  newCmnctCmnArea = new NewCmnctCmnArea();
  CmnctSuspSegMicroReq = new CmnctSuspSegMicroReq();
  CommQualityArea = new CommQualityArea();
  comcomm = new CommComm();
  callingProgram = '';
  eibTermId = '';
  eibTrnId = '';
  clmCmnctstatArea = new ClmCmnctStatCmnArea();
  m85qndt = '';
  m85cnno = '';
  m85cndt = '';
  commNbr = '';
}

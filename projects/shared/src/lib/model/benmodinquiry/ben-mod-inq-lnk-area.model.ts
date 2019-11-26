import {IbmEntry} from './ibm-entry.model';
import {Link7o20BmEntry} from './link7o20-bm-entry.model';

/**
 * Model class BenModInqLnkArea
 * Path: screenbean/benmodinquiry
 * Model: com::uhc::aarp::fox::domain::screenbean::benmodInquiry::BenModInqLnkArea
 * Legacy Mapping: WS-COMMAREA
 */
export class BenModInqLnkArea {
  link7o20Program = '';
  link7o20BenModRx = '';
  link7o20Eibtaskn = 0;
  link7o20InsName = '';
  link7o20ReturnMsg = '';
  link7o20InsCode = 0;
  link7o20BenModCount = 0;
  link7o20Request = '';
  link7o20Response = 0;
  link7o20QueuePrefix = '';
  link7o20HhAccount = 0;
  link7o20Eibtrnid = '';
  link7o20AsscNo = 0;
  ibmCounter = 0;
  ibmPageNo = 0;
  ibmPf4MapInd = '';
  ibmPointer = 0;
  ibmPf3MapInd = '';
  ibmLineNo = 0;
  link7o20BmEntrys: Link7o20BmEntry[] = [];
  ibmEntrys: IbmEntry[] = [];
}

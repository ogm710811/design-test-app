import { BinaryCnts } from './binary-cnts.model';
import { OtherWorkFields } from './other-work-fields.model';
import { PackedCnts } from './packed-cnts.model';
import { WsCommarea } from './ws-commarea.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwvolrsn
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvolrsn::WorkStorage
 * Legacy Mapping: WORK-AREA
 */
export class WorkStorage {
  qualSite = '';
  qualLoc = '';
  wsCommarea = new WsCommarea();
  dfhSiteCommarea = '';
  otherWorkFields = new OtherWorkFields();
  binaryCnts = new BinaryCnts();
  packedCnts = new PackedCnts();
  cseqNumDivisionRecord: any[] = [];
}

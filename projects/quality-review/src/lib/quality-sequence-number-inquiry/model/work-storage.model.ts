import {CommComm} from '@fox/shared';
import {BinaryCnts} from './binary-cnts.model';
import {EditExaminerName} from './edit-examiner-name.model';
import {MapLine} from './map-line.model';
import {PackedCnts} from './packed-cnts.model';
import {QualityInfoRecord} from './quality-info-record.model';
import {QualityReviewRecord} from './quality-review-record.model';
import {RpdiskcqKey} from './rpdiskcq-key.model';
import {RpdiskohKey} from './rpdiskoh-key.model';
import {RpdiskqrKey} from './rpdiskqr-key.model';
import {TSeqnoAndLoc} from './tseqno-and-loc.model';
import {WorkArea} from './work-area.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::WorkStorage
 */
export class WorkStorage {
  editExaminerName = new EditExaminerName();
  packedCnts = new PackedCnts();
  rpdiskcqKey = new RpdiskcqKey();
  rpdiskohKey = new RpdiskohKey();
  rpdisckqrKey = new RpdiskqrKey();
  workArea = new WorkArea();
  tseqnoAndLoc = new TSeqnoAndLoc();
  commComm = new CommComm();
  mapLine: MapLine[] = [];
  savetSub = 0;
  linkageSwitch = '';
  binaryCnts = new BinaryCnts();
  qualityReviewRecord = new QualityReviewRecord();
  qualityInfoRecord = new QualityInfoRecord();

}

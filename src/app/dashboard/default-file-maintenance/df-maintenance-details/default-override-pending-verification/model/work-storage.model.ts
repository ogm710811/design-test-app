import { BinaryCnts } from './binary-cnts.model';
import { MiscInfo } from './misc-info.model';
import { PackedCnts } from './packed-cnts.model';
import { ScreenInfo } from './screen-info.model';

/**
 * Model class WorkStorage
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::WorkStorage
 */
export class WorkStorage {
  binaryCnts = new BinaryCnts();
  packedCnts = new PackedCnts();
  wsPrimaryKey = '';
  miscInfo = new MiscInfo();
  screenInfo = new ScreenInfo();
  wsPrimaryBinary = '';
}

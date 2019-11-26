import {CaCurrentStats} from './ca-current-stats.model';
import {CaFromQualityStats} from './ca-from-quality-stats.model';
import {CaSuspenseStats} from './ca-suspense-stats.model';

/**
 * Model class CaInfoForRpdma98
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::CaInfoForRpdma98
 * Legacy Mapping: CA-INFO-FOR-RPDMA98
 */
export class CaInfoForRpdma98 {
  caCurrentStats = new CaCurrentStats();
  caSuspenseStats = new CaSuspenseStats();
  caFromQualityStats = new CaFromQualityStats();
}

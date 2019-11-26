import {CaInfoForRpdma93} from './ca-info-for-rpdma93.model';
import {CaInfoForRpdma95} from './ca-info-for-rpdma95.model';
import {CaInfoForRpdma98} from './ca-info-for-rpdma98.model';
import {CaInfoForRpdma99} from './ca-info-for-rpdma99.model';

/**
 * Model class CaLocOper
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::CaLocOper
 * Legacy Mapping: CA-LOC-OPER
 */
export class CaLocOper {
  caInfoForRpdma95 = new CaInfoForRpdma95();
  caInfoForRpdma98 = new CaInfoForRpdma98();
  caInfoForRpdma99 = new CaInfoForRpdma99();
  caInfoForRpdma93 = new CaInfoForRpdma93();
}

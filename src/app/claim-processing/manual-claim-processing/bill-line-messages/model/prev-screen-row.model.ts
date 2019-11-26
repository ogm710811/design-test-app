import {PrevScreenCol} from './prev-screen-col.model';

/**
 * Model class PrevScreenRow
 * Path: screenbean/blmessages
 * Model: com::uhc::aarp::fox::domain::screenbean::blmessages::PrevScreenRow
 * Legacy Mapping: PREV-SCREEN-ROW
 */
export class PrevScreenRow {
  prevDtlMdt = '';
  prevNpMdt = '';
  prevScreenCols: PrevScreenCol[] = [];
  prevSm1Mdt = '';
  prevSm2Mdt = '';
}

import {CorresItems} from './corres-items.model';

/**
 * Model class CorrespondenceTable
 * Path: bean/reviewcommarea
 * Model: com::uhc::aarp::fox::domain::bean::reviewcommarea::CorrespondenceTable
 * Legacy Mapping: CORRESPONDENCE-TABLE
 */
export class CorrespondenceTable {
  corresCtr = 0;
  corresSub = 0;
  corresItems: CorresItems[] = [];
}

import {DetailCorrNum} from './detail-corr-num.model';
import {DetailQualNum} from './detail-qual-num.model';
import {QualRecKey} from './qual-rec-key.model';

/**
 * Model class MiscInfo
 * Path: screenbean/delcmnctservice
 * Model: com::uhc::aarp::fox::domain::screenbean::delcmnctservice::MiscInfo
 * Legacy Mapping: MISC-INFO
 */
export class MiscInfo {
  qualRecKey = new QualRecKey();
  detailCorrNum = new DetailCorrNum();
  detailQualNum = new DetailQualNum();
}

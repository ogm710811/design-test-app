import { ComSqEndDate } from './com-sq-end-date.model';
import { ComSqStartDate } from './com-sq-start-date.model';

/**
 * Model class ComSetQualityCombo
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::ComSetQualityCombo
 * Legacy Mapping: COM-SET-QUALITY-COMBO
 */
export class ComSetQualityCombo {
  comSqState = '';
  comSqPlan = '';
  comSqTos = '';
  comSqStartDate = new ComSqStartDate();
  comSqEndDate = new ComSqEndDate();
  comSqCaution = '';
  comSqAcceptCode = '';
  comSqPercent = '';
}

import { StoreWholePercent } from './store-whole-percent.model';

/**
 * Model class PayNopayPercentFields
 * Path: screenbean/setqlty
 * Model: com::uhc::aarp::fox::domain::screenbean::setqlty::PayNopayPercentFields
 * Legacy Mapping: PAY-NOPAY-PERCENT-FIELDS
 */
export class PayNopayPercentFields {
  storePercentPct = 0;
  storeWholePercent = new StoreWholePercent();
  workPercent = '';
  formatWorkPct = '';
  wsDisplayWholePct = 0;
  wsMapPct = 0;
  wsCheckPercent = '';
  dummyUnpackPct = 0;
  wsWorkPct = 0;
  mapWorkPct = '';
}

import {ExBasicSeg} from './ex-basic-seg.model';
import {ExMstrPlanSeg} from './ex-mstr-plan-seg.model';
import {ExMstrSpouseSeg} from './ex-mstr-spouse-seg.model';
import {ExPaymentPlanSeg} from './ex-payment-plan-seg.model';
import {ExSpousePlanSeg} from './ex-spouse-plan-seg.model';
import {PreviousSpouseData} from './previous-spouse-data.model';

/**
 * Model class CompasReplyArea
 * Path: bean/compas
 * Model: com::uhc::aarp::fox::domain::bean::compas::CompasReplyArea
 * Legacy Mapping: COMPAS-REPLY-AREA
 */
export class CompasReplyArea {
  paidthrudate = '';
  exBasicSeg = new ExBasicSeg();
  exPaymentPlanSeg = new ExPaymentPlanSeg();
  exMstrPlanSeg = new ExMstrPlanSeg();
  exSpousePlanSeg = new ExSpousePlanSeg();
  exMstrSpouseSeg = new ExMstrSpouseSeg();
  previousSpouseData = new PreviousSpouseData();
  hiDependentInd = 0;
}

import {OvPayComMembArea} from './ov-pay-com-memb-area.model';
import {OvPayComOpMisc} from './ov-pay-com-op-misc.model';
import {OvPayComOpOrigRec} from './ov-pay-com-op-orig-rec.model';
import {OvPayComOpSaveMap15} from './ov-pay-com-op-save-map15.model';
import {OvPayCommarea} from './ov-pay-commarea.model';
import {OvPayErrCodeCommarea} from './ov-pay-err-code-commarea.model';
import {OvPayRefHistCommarea} from './ov-pay-ref-hist-commarea.model';

/**
 * Model class OvPayCmnArea
 * Path: bean/commonarea
 * Model: com::uhc::aarp::fox::domain::bean::commonarea::OvPayCmnArea
 * Legacy Mapping: TOTAL-OP-COMMAREA
 */
export class OvPayCmnArea {
  OvPayCommarea = new OvPayCommarea();
  comOpOrigRec = new OvPayComOpOrigRec();
  comOpMisc = new OvPayComOpMisc();
  comMembArea = new OvPayComMembArea();
  comOpInsuredName = '';
  comOpOrigModule = '';
  ovpCommLinkSw = '';
  errCodeCommarea = new OvPayErrCodeCommarea();
  refHistCommarea = new OvPayRefHistCommarea();
  comOpSaveMap15 = new OvPayComOpSaveMap15();
}

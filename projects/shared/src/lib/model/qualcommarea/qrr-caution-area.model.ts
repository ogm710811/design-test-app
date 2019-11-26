import {QrrCautions} from './qrr-cautions.model';

/**
 * Model class QrrCautionArea
 * Path: bean/qualcommarea
 * Model: com::uhc::aarp::fox::domain::bean::qualcommarea::QrrCautionArea
 * Legacy Mapping: QRR-CAUTION-AREA
 */
export class QrrCautionArea {
  qrrCautionCtr = 0;
  qrrCautions: QrrCautions[] = [];
}

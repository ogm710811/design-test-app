import { WsBRBlPpVar } from './ws-brbl-pp-var.model';

/**
 * Model class WsBRPpEntry
 * Path: screenbean/eobrepl
 * Model: com::uhc::aarp::fox::domain::screenbean::eobrepl::WsBRPpEntry
 * Legacy Mapping: WS-B-R-PP-ENTRY
 */
export class WsBRPpEntry {
  wsBRBlPpNum = 0;
  wsBRBlPpVar = new WsBRBlPpVar();
  wsBRPpQualPct = 0;
}

import { ComExclLocsTable } from './com-excl-locs-table.model';
import { ComSetQualityCombos } from './com-set-quality-combos.model';

/**
 * Model class ComSetqExclLocsCombos
 * Path: screenbean/setqltycombovrd
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltycombovrd::ComSetqExclLocsCombos
 * Legacy Mapping: COM-SETQ-EXCL-LOCS-COMBOS
 */
export class ComSetqExclLocsCombos {
  comSetQualityCombos = new ComSetQualityCombos();
  comExclLocsTable = new ComExclLocsTable();
}

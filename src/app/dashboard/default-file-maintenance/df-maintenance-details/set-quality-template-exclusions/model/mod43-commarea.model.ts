import { ExcludedDivcR } from './excluded-divc-r.model';
import { ExcludedDivoR } from './excluded-divo-r.model';
import { ExcludedLoccR } from './excluded-locc-r.model';
import { ExcludedLocoR } from './excluded-loco-r.model';

/**
 * Model class Mod43Commarea
 * Path: screenbean/setqltytmpltxcls
 * Model: com::uhc::aarp::fox::domain::screenbean::setqltytmpltxcls::Mod43Commarea
 * Legacy Mapping: MOD-43-COMMAREA
 */
export class Mod43Commarea {
  excludedDivoR = new ExcludedDivoR();
  excludedDivcR = new ExcludedDivcR();
  excludedLocoR = new ExcludedLocoR();
  excludedLoccR = new ExcludedLoccR();
  modeType = '';
  exclDivCtro = 0;
  noChangesSwitch = '';
  errorSwitch = '';
  filler18 = '';
  excludedDivo = '';
  excludedDivc = '';
  excludedLoco = '';
  excludedLocc = '';
}

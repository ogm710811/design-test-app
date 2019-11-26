import { RlErr } from './rl-err.model';
import { RlReas } from './rl-reas.model';

/**
 * Model class ReportLine
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::ReportLine
 * Legacy Mapping: REPORT-LINE
 */
export class ReportLine {
  rlCln1 = '';
  rlFild1 = '';
  rlCln2 = '';
  rlFild2 = '';
  rlCln3 = '';
  rlFild3 = '';
  rlCln4 = '';
  rlFild4 = '';
  rlCln5 = '';
  rlFild5 = '';
  rlCln6 = '';
  rlReas: RlReas[] = [];
  rlErrs: RlErr[] = [];
  rlComplDate = '';
  rlMaintDate = '';
  rlMaintIons = '';
}

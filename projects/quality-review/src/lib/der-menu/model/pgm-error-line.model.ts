import { ErrCommandR } from './err-command-r.model';
import { ErrErrorR } from './err-error-r.model';

/**
 * Model class PgmErrorLine
 * Path: screenbean/qltyrvwrvlderrmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrmenu::PgmErrorLine
 * Legacy Mapping: PGM-ERROR-LINE
 */
export class PgmErrorLine {
  errFile = '';
  errCommand = '';
  errCommandR = new ErrCommandR();
  errError = '';
  errErrorR = new ErrErrorR();
}

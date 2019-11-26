import { JHeader } from './jheader.model';

/**
 * Model class JnlRecord
 * Path: screenbean/messagemnt
 * Model: com::uhc::aarp::fox::domain::screenbean::messagemnt::JnlRecord
 * Legacy Mapping: MSG-JOURNAL-RECORD
 */
export class JnlRecord {
  jheader = new JHeader();
  joldMessageRecord = '';
  jnewMessageRecord = '';
}

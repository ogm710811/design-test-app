import { QualityKey } from './quality-key.model';
import { RevalidKey } from './revalid-key.model';

/**
 * Model class QualityFileRecord
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::QualityFileRecord
 * Legacy Mapping: QUALITY-FILE-RECORD
 */
export class QualityFileRecord {
  qualityKey = new QualityKey();
  qualKey = '';
  qualErrors: string[] = [];
  revalidKey = new RevalidKey();
  revKey = '';
  revErrors: string[] = [];
  revalidIons = 0;
}

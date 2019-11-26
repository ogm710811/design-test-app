import { QualityKey } from './quality-key.model';
import { RevalidKey } from './revalid-key.model';

/**
 * Model class QualityFileRecord
 * Path: screenbean/qltyrvwrvlderrrvw
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwrvlderrrvw::QualityFileRecord
 * Legacy Mapping: QUALITY-FILE-RECORD
 */
export class QualityFileRecord {
  qualKey = '';
  qualityKey = new QualityKey();
  qualReasons = 0;
  qualErrors: string[] = [];
  revKey = '';
  revalidKey = new RevalidKey();
  revErrors: string[] = [];
  revalidIons = 0;
  maintIons = 0;
  maintDate = new Date();
}

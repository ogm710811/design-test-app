import { EditExaminerName } from './edit-examiner-name.model';

/**
 * Model class MiscInfo
 * Path: screenbean/qltyseqnbrinq
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyseqnbrinq::MiscInfo
 * Legacy Mapping: MISC-INFO
 */
export class MiscInfo {
  commandEnteredInd = '';
  currDate = '';
  editExaminerName = new EditExaminerName();
  prevLocAlpha = '';
  prevLocNumeric = 0;
  editQualDateR = '';
}

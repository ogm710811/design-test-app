import {OopConstantPocketData} from './oop-constant-pocket-data.model';

/**
 * Model class OopConstant
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::OopConstant
 * Legacy Mapping: OPCF-RECORD-LAYOUT
 */
export class OopConstant {
  opcfStartDate = 0;
  opcfOutOfPocketData = new OopConstantPocketData();
  opcfRecordType = 0;
  opcfEndDate = 0;
}

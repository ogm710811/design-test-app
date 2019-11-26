import {MvVarEntry} from './mv-var-entry.model';

/**
 * Model class MvMsgEntry
 * Path: screenbean/procclmhospchrg
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmhospchrg::MvMsgEntry
 * Legacy Mapping: MV-MSG-ENTRY
 */
export class MvMsgEntry {
  mvMsgNumber = 0;
  mvVarEntrys: MvVarEntry[] = [];
}

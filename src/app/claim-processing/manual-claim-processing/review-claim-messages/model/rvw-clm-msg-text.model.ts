import {Rpdmb34MapCommandLine} from './rpdmb34-map-command-line.model';
import {Rpdmb34Tab} from './rpdmb34-tab.model';
/**
 * Model class RvwClmMsgText
 * Path: screenbean/rvwclmmsgtext
 * Model: com::uhc::aarp::fox::domain::screenbean::rvwclmmsgtext::RvwClmMsgText
 * Legacy Mapping: RPDMB34-SCREEN
 */
export class RvwClmMsgText {
  mapCommandLine = new Rpdmb34MapCommandLine();
  rpdmb34Tabs: Rpdmb34Tab[] = [];
  mb34ErrMsg = '';
}

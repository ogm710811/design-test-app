import { ComElectronicClaimSecurity } from './com-electronic-claim-security.model';

/**
 * Model class ComControlFile
 * Path: screenbean/operdfltmntmenu
 * Model: com::uhc::aarp::fox::domain::screenbean::operdfltmntmenu::ComControlFile
 * Legacy Mapping: COM-CONTROL-FILE
 */
export class ComControlFile {
  comMicrofilmRange = '';
  comHelpFile = '';
  comOperInfo = '';
  comOperatorAuthority = '';
  comOperatorTransSecurity = '';
  comOperatorSetQuality = '';
  comDefaultAuthority = '';
  comDefaultTransSecurity = '';
  comDefaultSetQuality = '';
  comOverrideAuthority = '';
  comOverrideSetQuality = '';
  comProviderFile = '';
  comProviderQuality = '';
  comMessageFile = '';
  comMessageQuality = '';
  comTitles = '';
  comElectronicClaimSecurity = new ComElectronicClaimSecurity();
}

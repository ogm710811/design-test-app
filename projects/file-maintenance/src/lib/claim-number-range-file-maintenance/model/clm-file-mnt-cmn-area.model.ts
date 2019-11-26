import { ExistingValuesTable } from './existing-values-table.model';
import { ScreenSaveTable } from './screen-save-table.model';

/**
 * Model class ClmFileMntCmnArea
 * Path: screenbean/clmnbrrngflmnt
 * Model: com::uhc::aarp::fox::domain::screenbean::clmnbrrngflmnt::ClmFileMntCmnArea
 * Legacy Mapping: WS-MICROFLM-COMMAREA
 */
export class ClmFileMntCmnArea {
  mapSaveArea = '';
  linkageSwitch = '';
  mapSent = '';
  transCompleteInd = '';
  pf3Switch = '';
  pf4Switch = '';
  filler16 = '';
  existingValuesTables: ExistingValuesTable[] = [];
  screenSaveTables: ScreenSaveTable[] = [];
  wsSiteNumSave = '';
  messageSent = '';
  map26GregDate = '';
  map26LastMaintDate = '';
  screenSaveSub = 0;
  highScreenSaveSub = 0;
  noExistingValues = 0;
  filler17 = 0;
  emRJulianDate = 0;
  emRLocation = 0;
  emRCartridge = 0;
  emRStartSeqNo = 0;
  emREndSeqNo = 0;
  emROperatorIons = 0;
  emRLastMaintDate = 0;
}

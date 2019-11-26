import { ScreenLevelPosition } from './screen-level-position.model';
import { VerifLine } from './verif-line.model';

/**
 * Model class ScreenInfo
 * Path: screenbean/dfltovrdpendverfservice
 * Model: com::uhc::aarp::fox::domain::screenbean::dfltovrdpendverfservice::ScreenInfo
 * Legacy Mapping: SCREEN-INFO
 */
export class ScreenInfo {
  verifLine = new VerifLine();
  screenDate = '';
  screenLocation = '';
  screenDivision = '';
  screenTemplate = '';
  screenLevelPosition = new ScreenLevelPosition();
  screenTime = '';
}

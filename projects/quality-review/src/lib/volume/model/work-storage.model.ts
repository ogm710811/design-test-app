import { BinaryCnts } from './binary-cnts.model';
import { CorresSeqNbrRecord } from './corres-seq-nbr-record.model';
import { Dfhcommarea } from './dfhcommarea.model';
import { LocationTable } from './location-table.model';
import { MapLineD } from './map-line-d.model';
import { Messages } from './messages.model';
import { MiscInfo } from './misc-info.model';
import { Switches } from './switches.model';

/**
 * Model class WorkStorage
 * Path: screenbean/qltyrvwvol
 * Model: com::uhc::aarp::fox::domain::screenbean::qltyrvwvol::WorkStorage
 * Legacy Mapping: WORK-AREA
 */
export class WorkStorage {
  commLength = 0;
  wsCommLength = 0;
  cnt = 0;
  subFrom = 0;
  subTo = 0;
  subAmount = 0;
  commandEnteredInd = '';
  empLocSite = 0;
  filler4 = '';
  currMm = 0;
  filler5 = '';
  currDd = 0;
  filler6 = '';
  currYy = 0;
  filler8 = '';
  totunrevQualEdit = 0;
  filler9 = '';
  locQualEdit = '';
  qualKey = 0;
  qualLoc = '';
  qualSite = '';
  switches = new Switches();
  binaryCnts = new BinaryCnts();
  corresSeqNbrRecord = new CorresSeqNbrRecord();
  filler7 = new MapLineD();
  miscInfo = new MiscInfo();
  messages = new Messages();
  locationTable: LocationTable[] = [];
  mapSaveArea = '';
  linkageSwitch = '';
  locCnt = '';
  screen = 0;
  totalQualClaims = '';
  totalCurrUnrev = '';
  totalQualPrior = '';
  totalPriorUnrev = '';
  rpd06o86Site = 0;
  rpd06o88Site = 0;
  col = 0;
  dfhcommarea = new Dfhcommarea();
}

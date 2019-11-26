import {CaAttachedStaff} from './ca-attached-staff.model';
import {CaLocOper} from './ca-loc-oper.model';
import {CaNewAttachedStaff} from './ca-new-attached-staff.model';
import {CaNewProductStaff} from './ca-new-product-staff.model';
import {CaProductStaff} from './ca-product-staff.model';

/**
 * Model class OperStatCmnArea
 * Path: bean
 * Model: com::uhc::aarp::fox::domain::bean::OperStatCmnArea
 * Legacy Mapping: DFHCOMMAREA
 */
export class OperStatCmnArea {
  mapSaveArea: any = undefined;
  linkageSwitch = '';
  currRec = 0;
  firstLine = 0;
  lastLine = 0;
  caTotalRecs = 0;
  caTypeStats = '';
  caDWMInd = '';
  caByLocInd = '';
  caByDivInd = '';
  caBySiteInd = '';
  caPOrQInd = '';
  caSite = 0;
  caOperatorId = 0;
  begDate = '';
  caEndDate = '';
  caReturnMessage = '';
  caDateEntered = '';
  caScreen = 0;
  filler18 = '';
  caAttachedStaff = new CaAttachedStaff();
  caNewAttachedStaff = new CaNewAttachedStaff();
  caProductStaff = new CaProductStaff();
  caNewProductStaff = new CaNewProductStaff();
  caLocOpers: CaLocOper[] = [];
  caDiv = 0;
  caLoc = 0;
}

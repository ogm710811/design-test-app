import {
  Dfhcommarea,
  OperDfltCmnArea
} from '@fox/shared';
import { MapCombo } from './map-combo.model';
import { MapCombos } from './map-combos.model';
import { MapExcludedLocations0110 } from './map-excluded-locations0110.model';
import { MapExcludedLocations1120 } from './map-excluded-locations1120.model';
import { OpcommAuthCombo } from './opcomm-auth-combo.model';
import { OpcommAuthCombos } from './opcomm-auth-combos.model';
import { OperAuthCombDflt } from './oper-auth-comb-dflt.model';
import { Rpdma84 } from './rpdma84.model';
import { WorkStorage } from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/operauthcombovrdservice
 * Model: com::uhc::aarp::fox::domain::screenbean::OperAuthCombOvrdService::Container
 */
export class Container {
  operAuthCombDflt = new OperAuthCombDflt();
  operDfltCmnArea = new OperDfltCmnArea();
  workstorage = new WorkStorage();
  dfhMapSaveArea = '';
  dfhLinkageSwitch = '';
  opcommPos = 0;
  opcommAuthCombos = new OpcommAuthCombos();
  opcommRecord = '';
  opcommLocs: string[] = [];
  funcD = '';
  sctD = '';
  authdD = '';
  authvD = '';
  lmdD = '';
  postdD = '';
  postvD = '';
  lmionD = '';
  mapCombos = new MapCombos();
  exlocdD = '';
  mapExcludedLocations0110s: MapExcludedLocations0110[] = [];
  mapExcludedLocations1120s: MapExcludedLocations1120[] = [];
  vlitD = '';
  vreplyD = '';
  scmsgL = 0;
  scmsgD = '';
  pf3D = '';
  pf4D = '';
  mapCombo = new MapCombo();
  opcommAuthCombo = new OpcommAuthCombo();
  dfhcommarea = new Dfhcommarea();
  rpdma84 = new Rpdma84();
}

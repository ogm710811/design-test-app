import {
  EDADeductAggrTable,
  EDADeductFields,
  EDAMedSuppFields,
  EDAMedSuppYearTable,
  EDAMedSuppYearTable2,
  EDAYearTable,
  ExAltAddressSeg,
  ExClaimSeg,
  EligibilityIoArea,
  Dfhcommarea,
  DialModeCommLinkArea,
  EobReplCmnArea,
  BLTempStorQueue
} from '@fox/shared';
import {Di53500Linkage} from './di53500-linkage.model';
import {EobRepl} from './eob-repl.model';
import {WorkStorage} from './work-storage.model';

/**
 * Model class Container
 * Path: screenbean/eobrepl
 * Model: com::uhc::aarp::fox::domain::screenbean::eobrepl::Container
 */
export class Container {
  dialModeCommLinkArea = new DialModeCommLinkArea();
  screen = new EobRepl();
  dfhCommArea = new Dfhcommarea();
  workStorage = new WorkStorage();
  repCommArea = new EobReplCmnArea();
  billLineTsq = new BLTempStorQueue();
  // rtrvProvInfo = new ProviderInfoLnkArea();
  // di821000Linkage = new Di82100Linkage();
  // luwReturnField = new LuwReturnFields();
  // accessClmNumServiceCommon = new AccessClmNumServiceCommon();
  eligibilityIoArea = new EligibilityIoArea();
  // rpd05O46Linkage = new Rpd05o46Linkage();
  // l5o46DepdAhEntry = new L5o46DepdAhEntry();
  // l5o46DepdBmEntry = new L5o46DepdBmEntry();
  // l5o46DepdPlanLeEntry = new L5o46DepdPlanLeEntry();
  // l5o46DepdPlEntry = new L5o46DepdPlEntry();
  di53500Linkage = new Di53500Linkage();
  exAltAddressSeg = new ExAltAddressSeg();
  eDADeductAggrTable = new EDADeductAggrTable();
  eDADeductFields = new EDADeductFields();
  eDAMedSuppFields = new EDAMedSuppFields();
  eDAMedSuppYearTable2 = new EDAMedSuppYearTable2();
  eDAMedSuppYearTable = new EDAMedSuppYearTable();
  eDAYearTable = new EDAYearTable();
  exClaimSeg = new ExClaimSeg();
  duprec: boolean = false;
}

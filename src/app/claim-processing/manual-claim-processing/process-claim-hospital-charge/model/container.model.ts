import {Dfhcommarea, ProcClmHospChrg} from '@fox/shared';
import {WorkStorage} from './work-storage.model';

export class Container {
  screenbean = new ProcClmHospChrg();
  dfhCommonArea = new Dfhcommarea();
  isBenLines = false;
  isLinesRelated = false;
  providerRelated = false;
  historyDaysRateInd = false;
  isExcludedPlan = false;
  isJobProcessEnd = false;
  isNextModule = false;
  m23Res6 = false;
  m23Res1 = false;
  isEnterClick = false;
  workStorage = new WorkStorage();
}

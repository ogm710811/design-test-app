import { EnteredPlans } from './entered-plans.model';
import { LastMaintDate } from './last-maint-date.model';
import { NewAuthLimitPlans } from './new-auth-limit-plans.model';
import { OperItem } from './oper-item.model';
import { OperatorCommMiscFieldsR } from './operator-comm-misc-fields-r.model';
import { OperatorPlans } from './operator-plans.model';
import { PlanDefinitionTable } from './plan-definition-table.model';
import { WsKey } from './ws-key.model';
import { WsPlanTable } from './ws-plan-table.model';

/**
 * Model class WorkStorage
 * Path: screenbean/operplnauth
 * Model: com::uhc::aarp::fox::domain::screenbean::operplnauth::WorkStorage
 */
export class WorkStorage {
  sub = 0;
  sub1 = 0;
  sub2 = 0;
  planSub = 0;
  typeSub = 0;
  defSub = 0;
  newPlanSub = 0;
  newPlanCtr = 0;
  planTypeCounter = 0;
  msNdx = 0;
  hipNdx = 0;
  ltcNdx = 0;
  cpgNdx = 0;
  riderNdx = 0;
  wsPlanIndHold = '';
  wsPlanTypeHold = '';
  planType = '';
  planSearch = '';
  holdEnteredPlanCtr = 0;
  holdEnteredNewPlanSub = 0;
  expandIons = 0;
  lastMaintDate = new LastMaintDate();
  errorSwitch = '';
  protectFieldsInd = '';
  morePlansInd = '';
  firstReadInd = '';
  endOfIOSwitchInd = '';
  wsKey = new WsKey();
  operItemIndicator = '';
  searchOperLevel = 0;
  searchOperPos = '';
  wsReadNotfnd = '';
  wsPlanTables: WsPlanTable[] = [];
  newAuthLimitPlans = new NewAuthLimitPlans();
  enteredPlans = new EnteredPlans();
  enteredPlansR = '';
  operatorCommMiscFieldsR = new OperatorCommMiscFieldsR();
  operatorPlans = new OperatorPlans();
  operatorPlansR = '';
  origAuthInfo = '';
  wsModuleCommIoErrorInd = '';
  origAuthLimitPlans = '';
  mapFlag = '';
  map67PlanCtr = 0;
  map90PlanCtr = 0;
  planDefinitionTable = new PlanDefinitionTable();
  planDefinitionTableMax = 0;
  operItems: OperItem[] = [];
  operIndex = 0;

  public isNoMorePlans(): boolean {
    let noMorePlans = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    noMorePlans = this.morePlansInd === initValue;
    return noMorePlans;
  }

  public setNoMorePlans(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.morePlansInd = initValue;
  }

  public isFirstReadNormal(): boolean {
    let firstReadNormal = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    firstReadNormal = this.firstReadInd === initValue;
    return firstReadNormal;
  }

  public setFirstReadNormal(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.firstReadInd = initValue;
  }

  public isEndOfIOSwitch(): boolean {
    let endOfIOSwitch = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    endOfIOSwitch = this.endOfIOSwitchInd === initValue;
    return endOfIOSwitch;
  }

  public setEndOfIOSwitch(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.endOfIOSwitchInd = initValue;
  }

  public isOperItemFound(): boolean {
    let operItemFound = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    operItemFound = this.operItemIndicator === initValue;
    return operItemFound;
  }

  public setOperItemFound(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.operItemIndicator = initValue;
  }
}

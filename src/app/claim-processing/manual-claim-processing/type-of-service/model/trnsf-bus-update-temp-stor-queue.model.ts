import {StringUtils} from '../../../services/string-utils.service';
/**
 * Model class TrnsfBusUpdateTempStorQueue
 * Path: screenbean/procclmtos/beansws
 * Model: com::uhc::aarp::fox::domain::screenbean::procclmtos::beansWs::TrnsfBusUpdateTempStorQueue
 * Legacy Mapping: DI25900-LINKAGE
 */
export class TrnsfBusUpdateTempStorQueue {
  luwi259TobTsQueueName = '';
  luwi259TobTsQueueOpId = '';
  luwi259TobTsqItemNo = 0;
  filler2luwi259InputTsqInfo = '';
  luwo259IIEntryCtr = 0;
  luwo259IISelNo = 0;
  luwo259IIPlan = '';
  luwo259IILegalEnt = '';
  luwo259IIReinsurance = '';
  luwo259IIEffDate = 0;
  luwo259IITermDate = 0;
  luwo259TobTsqUpdatedInd = '';
  filler6luwo259TobTableInfo = '';

  public isLuwo259TobTsqUpdated(): boolean {
    let luwo259TobTsqUpdated = false;
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    luwo259TobTsqUpdated = StringUtils.trim(this.luwo259TobTsqUpdatedInd) === initValue;
    return luwo259TobTsqUpdated;
  }

  public setLuwo259TobTsqUpdated(): void {
    let initValue: string = '';
    //
    initValue = 'Y';
    //
    this.luwo259TobTsqUpdatedInd = initValue;
  }

  public isLuwo259TobTsqNotUpdated(): boolean {
    let luwo259TobTsqNotUpdated = false;
    let initValue: string = '';
    //
    initValue = 'N';
    //
    luwo259TobTsqNotUpdated = StringUtils.trim(this.luwo259TobTsqUpdatedInd) === initValue;
    return luwo259TobTsqNotUpdated;
  }

  public setLuwo259TobTsqNotUpdated(): void {
    let initValue: string = '';
    //
    initValue = 'N';
    //
    this.luwo259TobTsqUpdatedInd = initValue;
  }
}

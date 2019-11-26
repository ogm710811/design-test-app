import {TreasuryReconciliationVO} from '@fox/rest-clients';

export enum TrcDetailAction {
  Add, View, Empty, Copy, Modify
}

export namespace TrcDetailActionNamespace {
  export function actionString(action: TrcDetailAction): string {
    switch (action) {
      case TrcDetailAction.Add:
        return 'Add';
      case TrcDetailAction.Empty:
        return 'Empty';
      case TrcDetailAction.View:
        return 'View';
      case TrcDetailAction.Copy:
        return 'Copy';
      case TrcDetailAction.Modify:
        return 'Modify';
      default:
        return 'undefined';
    }
  }
}

export interface TrcDetailEmptyModel {
  action: TrcDetailAction.Empty;
}

export interface TrcDetailAddModel {
  action: TrcDetailAction.Add;
  amount: number;
  depositDetailId: number;
}

export interface TrcDetailViewModel {
  action: TrcDetailAction.View;
  trc: TreasuryReconciliationVO;
}

export interface TrcDetailCopyModel {
  action: TrcDetailAction.Copy;
  depositDetailId: number;
}

export interface TrcDetailModifyModel {
  action: TrcDetailAction.Modify;
  trc: TreasuryReconciliationVO;
}

export type TrcDetailModel =
  TrcDetailEmptyModel
  | TrcDetailAddModel
  | TrcDetailViewModel
  | TrcDetailCopyModel
  | TrcDetailModifyModel;

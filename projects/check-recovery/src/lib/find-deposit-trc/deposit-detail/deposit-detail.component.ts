import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DepositApi,
  DepositImagesService,
  DepositTreasuryReconciliationVO,
  TRCObjectRequestVO,
  TreasuryReconciliationApi,
  TreasuryReconciliationRequestVO,
  TreasuryReconciliationVO
} from '@fox/rest-clients';
import {checkRecoveryUrlFindDepositTRC, LoginService} from '@fox/shared';
import * as uuidConst from 'uuid';
const uuid = uuidConst;
import {FindDepositTrcService} from '../find-deposit-trc.service';
import {TrcDetailAction, TrcDetailModel} from '../trc-detail/trc-detail.model';

@Component({
  selector: 'fox-ui-deposit-detail',
  templateUrl: './deposit-detail.component.html',
  styleUrls: ['./deposit-detail.component.css', '../../shared/material-site.css']
})
export class DepositDetailComponent implements OnInit {

  Empty: TrcDetailAction.Empty = TrcDetailAction.Empty;
  View: TrcDetailAction.View = TrcDetailAction.View;
  Add: TrcDetailAction.Add = TrcDetailAction.Add;
  Copy: TrcDetailAction.Copy = TrcDetailAction.Copy;
  Modify: TrcDetailAction.Modify = TrcDetailAction.Modify;

  depositIdParam: string = '';
  depositId?: number = 0;
  depositDate?: string = '';
  checkClaimNumber?: number | string;
  checkNumber?: number | string;
  source?: string;
  depositAmount: number = 0;
  trcObjList: TreasuryReconciliationVO[] = [];
  trcNumParam?: string;
  priorSelectedTrc: string | undefined;
  selectedTrc: string = '';
  trcDetails: TrcDetailModel = {action: this.Empty};
  isVouchered: boolean = false;
  isPending: boolean = false;
  showCancelDialog: boolean = false;
  cancelFromSelect: boolean = false;
  theDocument: string = '';
  trcToDelete?: string;
  trcCreationFailed: boolean = false;
  trcDeletionNumber?: string;
  trcUpdateFailedNumber?: string;

  saveModifySuccessMsg: boolean = false;
  saveAddSuccessMsg: boolean = false;
  completeModifySuccessMsg: boolean = false;
  completeAddSuccessMsg: boolean = false;
  deleteSuccessMsg: boolean = false;
  deleteFailedMsg: boolean = false;
  sumNotEqualMsg: boolean = false;
  totalPendingTrcAmount: number = 0;
  dci: string = '0';

  savedTrc: string = '';
  completedTrc: string = '';
  downloadLink: string = '';

  get trcTotalAmount(): number {
    return this.trcObjList.map(to => {
      return (!!to && !!to.treasuryReconciliationAmount && !isNaN(+to.treasuryReconciliationAmount)) ? +to.treasuryReconciliationAmount : 0;
    }).reduce((prev, curr) => prev + curr, 0);
  }

  get unresolvedAmount(): number {
    return this.depositAmount - this.trcTotalAmount;
  }

  get selectedTrcObj(): TreasuryReconciliationVO | undefined {
    const filteredTrcs = this.trcObjList.filter(obj => obj.treasuryReconciliationId && obj.treasuryReconciliationId.toString() === this.selectedTrc);
    if (filteredTrcs.length) {
      return filteredTrcs[0];
    }
    return undefined;
  }

  get trcList(): string[] {
    return this.trcObjList.map(obj => obj.treasuryReconciliationId ? obj.treasuryReconciliationId.toString() : 'N/A');
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private chgDet: ChangeDetectorRef,
              private depositTrcService: FindDepositTrcService, private depositApi: DepositApi,
              private trcApi: TreasuryReconciliationApi, private depositsImageSvc: DepositImagesService,
              private loginSvc: LoginService) {
  }

  ngOnInit(): void {
    this.depositTrcService.showDepositCache = false;
    this.depositTrcService.showTrcCache = false;

    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.dci && params.dci !== '0') {
        this.dci = params.dci;
        this.getPDF(params.dci);  // 136370517 || params.dci
      }
      if (params && params.trc) {
        this.trcNumParam = params.trc;
      } else {
        this.trcNumParam = undefined;
      }
      this.initializeSelection();
    });

    this.activatedRoute.params.subscribe(paramsId => {
      this.showCancelDialog = false;
      this.depositIdParam = paramsId.depositArguments || '';
      this.fetchDepositDetails();
    }, () => {
      this.handleNoDepositInfo();
    });
  }

  getPDF(dci: number): void {
    this.downloadLink = `/api/exela/document/${encodeURIComponent(String(dci))}/images`;
    const obs = this.depositsImageSvc.getDepositImage(dci, uuid());

    if (obs) {
      obs.subscribe(obj => {
        const fr = new FileReader();
        fr.readAsDataURL(obj);
        fr.onloadend = () => {
          this.theDocument = <string>fr.result;
        };
      });
    }
  }

  onSelectionChange(selection: string): void {
    this.priorSelectedTrc = this.selectedTrc;
    this.selectedTrc = selection;
    if (this.trcDetails && this.trcDetails.action !== this.View && this.trcDetails.action !== this.Empty) {
      this.showCancelDialog = true;
      this.cancelFromSelect = true;
    } else if (this.selectedTrcObj) {
      this.trcDetails = {action: this.View, trc: this.selectedTrcObj};
    } else {
      this.trcDetails = {action: this.Empty};
    }
  }

  onPressDeleteTrc(): void {
    this.resetErrorFlags();
    if (this.selectedTrc) {
      this.trcToDelete = this.selectedTrc;
    }
  }

  onPressAddTrc(): void {
    if (this.depositId) {
      this.trcDetails = {
        action: this.Add,
        amount: this.unresolvedAmount >= 0 ? this.unresolvedAmount : 0,
        depositDetailId: this.depositId
      };
      this.selectedTrc = 'New';
    } else {
      this.trcDetails = {
        action: this.Empty
      };
      this.selectedTrc = 'N/A';
    }
  }

  onPressCopyTrc(): void {
    if (this.depositId) {
      if (this.selectedTrcObj) {
        this.trcDetails = {action: this.Copy, depositDetailId: this.depositId};
        this.selectedTrc = 'New';
      }
    } else {
      this.trcDetails = {action: this.Empty};
      this.selectedTrc = 'N/A';
    }
  }

  onModify(): void {
    if (this.selectedTrcObj) {
      this.trcDetails = {action: this.Modify, trc: this.selectedTrcObj};
    } else {
      this.trcDetails = {action: this.Empty};
    }
  }

  onAbortCancellation(): void {
    if (this.cancelFromSelect) {
      const swapHolder = this.selectedTrc;
      if (this.priorSelectedTrc) {
        this.selectedTrc = this.priorSelectedTrc;
      } else {
        this.initializeSelection();
      }
      this.priorSelectedTrc = swapHolder;
    }
    this.showCancelDialog = false;
    this.cancelFromSelect = false;
  }

  onConfirmCancellation(): void {
    if (this.selectedTrcObj) {
      this.trcDetails = {action: this.View, trc: this.selectedTrcObj};
    } else {
      this.initializeSelection();
    }
    this.showCancelDialog = false;
    this.cancelFromSelect = false;
  }

  onAbortDeletion(): void {
    this.trcToDelete = undefined;
  }

  onConfirmDeletion(): void {
    if (this.trcToDelete) {
      const deleteMe: number = +this.trcToDelete;
      if (!isNaN(+deleteMe)) {
        this.trcApi.deleteTRC(+deleteMe, uuid(), 'response').subscribe(resp => {
          this.trcDeletionNumber = this.trcToDelete ? this.trcToDelete : '';
          if (resp.status !== 204) {
            this.deleteFailedMsg = true;
            window.scrollTo(0, 0);
          } else {
            this.deleteSuccessMsg = true;
            this.trcToDelete = undefined;
            window.scrollTo(0, 0);
          }
        }, () => {
          this.deleteFailedMsg = true;
          window.scrollTo(0, 0);
        }).add(() => this.fetchDepositDetails());
      } else {
        this.initializeSelection();
      }
    }
  }

  onCancelTrc(): void {
    this.showCancelDialog = true;
  }

  onSaveTrc(trc: TreasuryReconciliationRequestVO): void {
    this.resetErrorFlags();
    this.createOrUpdateTrcWithStatus(trc, 'PENDING');
  }

  onCompleteTrc(trc: TreasuryReconciliationRequestVO): void {
    this.resetErrorFlags();
    this.createOrUpdateTrcWithStatus(trc, 'COMPLETED');
  }

  resetErrorFlags(): void {
    this.trcCreationFailed = false;
    this.trcUpdateFailedNumber = undefined;
    this.trcDeletionNumber = undefined;
    this.sumNotEqualMsg = false;
  }

  goBack(): void {
    if (this.depositTrcService.lastPressed === 0) {
      this.depositTrcService.showDepositCache = true;
      this.depositTrcService.showTrcCache = false;
    } else {
      this.depositTrcService.showDepositCache = false;
      this.depositTrcService.showTrcCache = true;
    }
    this.router.navigate([checkRecoveryUrlFindDepositTRC]).then();
  }

  private handleNoDepositInfo(): void {
    this.depositDate = 'N/A';
    this.checkClaimNumber = 'N/A';
    this.checkNumber = 'N/A';
    this.source = 'N/A';
    this.depositAmount = 0;
    this.trcObjList = [];
    this.trcNumParam = 'N/A';
    this.selectedTrc = 'N/A';
    this.trcDetails = {action: this.Empty};
    this.isVouchered = false;
    this.isPending = false;
    this.showCancelDialog = false;
  }

  private fetchDepositDetails(): void {
    const paramAsNum = +this.depositIdParam;
    if (isNaN(paramAsNum)) {
      this.handleNoDepositInfo();
      return;
    }
    this.depositApi.getDeposit(paramAsNum, uuid()).subscribe((resp: DepositTreasuryReconciliationVO) => {
      this.handleDepositResponse(resp);
    }, () => {
      this.handleNoDepositInfo();
    });
  }

  private createOrUpdateTrcWithStatus(trc: TreasuryReconciliationRequestVO, status: 'PENDING'
    | 'COMPLETED'): void {
    if (trc && trc.treasuryReconciliation) {
      trc.treasuryReconciliation.treasuryReconciliationStatus = status; // === 'COMPLETED' ? '4' : '2';
    }
    const trcApiObj = {
      ...trc.treasuryReconciliation,
      'claimNote': trc.claimNote,
      'demographicInfo': trc.demographicInfo
    };

    const trcApiObjForUpdateTrc: TRCObjectRequestVO = {
      ...trc.treasuryReconciliation,
      'demographicInfo': trc.demographicInfo
    };

    if (this.trcDetails.action === TrcDetailAction.Add || this.trcDetails.action === TrcDetailAction.Copy) {
      this.trcApi.createTRC([trcApiObj], uuid()).subscribe((resp) => {
        this.fetchDepositDetails();

        const firstResp = resp[0];
        this.selectedTrc = firstResp.treasuryReconciliation &&
        firstResp.treasuryReconciliation.treasuryReconciliationId ? firstResp.treasuryReconciliation.treasuryReconciliationId.toString() : 'N/A';

        if (status === 'PENDING') {
          this.savedTrc = this.selectedTrc;
          this.saveAddSuccessMsg = true;
          window.scrollTo(0, 0);
        } else {
          this.completedTrc = this.selectedTrc;
          this.completeAddSuccessMsg = true;
          window.scrollTo(0, 0);
        }
      }, (e) => {
        if (e.status === 412) {
          this.sumNotEqualMsg = true;
          window.scrollTo(0, 0);
        } else {
          this.trcCreationFailed = true;
          window.scrollTo(0, 0);
        }
      });
    } else if (this.trcDetails.action === TrcDetailAction.Modify || (this.trcDetails.action === TrcDetailAction.View && status === 'COMPLETED')) {
      if (trc && trc.treasuryReconciliation && trc.treasuryReconciliation.treasuryReconciliationId) {
        this.trcApi.updateTRC(trc.treasuryReconciliation.treasuryReconciliationId, [trcApiObjForUpdateTrc], uuid()).subscribe(() => {
          this.fetchDepositDetails();
          if (status === 'PENDING') {
            this.saveModifySuccessMsg = true;
            this.savedTrc = this.selectedTrc;
            window.scrollTo(0, 0);
          } else {
            this.completeModifySuccessMsg = true;
            this.completedTrc = this.selectedTrc;
            window.scrollTo(0, 0);
          }
        }, (e) => {

          if (e.status === 412) {
            this.sumNotEqualMsg = true;
            window.scrollTo(0, 0);
          } else {
            this.trcUpdateFailedNumber = this.selectedTrc;
            window.scrollTo(0, 0);
          }
        });
      } else {
        this.trcUpdateFailedNumber = this.selectedTrc;
        window.scrollTo(0, 0);
      }
    }
  }

  private handleDepositResponse(resp: DepositTreasuryReconciliationVO): void {
    if (!resp) {
      this.handleNoDepositInfo();
      return;
    }
    this.depositId = resp.depositDetailId;
    this.depositDate = resp.depositDate ? resp.depositDate : 'N/A';
    this.checkClaimNumber = resp.depositCheckClaimId ? resp.depositCheckClaimId : 'N/A';
    this.checkNumber = resp.checkId ? resp.checkId : 'N/A';
    this.source = resp.depositSource ? resp.depositSource : 'N/A';
    this.depositAmount = resp.depositAmount ? +resp.depositAmount : 0;

    if (resp.treasuryReconciliation && resp.treasuryReconciliation.length) {
      this.trcObjList = resp.treasuryReconciliation;
      this.isVouchered = this.isStatus('VOUCHERED');
      this.isPending = this.isStatus('PENDING');
      this.totalPendingTrcAmount = 0;
      for (let i = 0; i < this.trcObjList.length; i++) {
        this.totalPendingTrcAmount += this.trcObjList[i].treasuryReconciliationAmount || 0;
      }
    } else {
      this.trcObjList = [];
      this.isPending = false;
      this.isVouchered = false;
    }

    this.initializeSelection();
  }

  private initializeSelection(): void {
    const selectedTrcIsNumber = !isNaN(+this.selectedTrc);

    // if there are TRCs to be selected
    if (this.trcObjList && this.trcObjList.length > 0) {
      let listIncludesSelection = false;
      if (this.selectedTrc && selectedTrcIsNumber) {
        listIncludesSelection = this.trcList.filter(x => x === this.selectedTrc).length > 0;
      }

      if (!listIncludesSelection) {
        let listIncludesParam = false;
        if (this.trcNumParam) {
          listIncludesParam = this.trcList.filter(x => x === this.trcNumParam).length > 0;
        }
        if (listIncludesParam) {
          this.selectedTrc = this.trcNumParam!;
        } else {
          this.selectedTrc = this.trcList[0];
        }
      }
    } else {
      // otherwise it's N/A
      this.selectedTrc = 'N/A';
    }

    if (this.selectedTrcObj) {
      this.trcDetails = {action: this.View, trc: this.selectedTrcObj};
    } else {
      this.trcDetails = {action: this.Empty};
    }
  }

  private isStatus(status: string): boolean {
    return this.trcObjList.map(obj => obj ? obj.treasuryReconciliationStatus === status : false)
      .reduce((prev, curr) => prev || curr, false);
  }
}

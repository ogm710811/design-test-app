import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ModalService} from '../modal.service';
import {
  checkRecoveryRouteCommandOverPaymentAddOrEdit,
  checkRecoveryRouteCommandOverpaymentSelection,
  checkRecoveryRoutePathAddOrEditOverpayment,
  checkRecoveryRoutePathOverpaymentSelection,
  checkRecoveryRoutePathRoot
} from '../../constants/check-recovery.constants';
import {
  communicationRouteCommandCommInfo,
  communicationRouteCommandCommSuspended,
  communicationRouteCommandDeleteComm,
  communicationRouteCommandListComm,
  communicationRouteCommandRevComm,
  communicationRoutePathCommInfo,
  communicationRoutePathDeleteComm,
  communicationRoutePathListComm,
  communicationRoutePathRevComm,
  communicationRoutePathRoot,
} from '../../constants/communication.constants';
import {InputComponent} from '../../input/input.component';

@Component({
  selector: 'fox-route-vld-modal',
  templateUrl: 'route-validation-modal.component.html',
  styleUrls: ['route-validation-modal.component.css']
})
export class RouteValidationModalComponent {
  @Input() modalVisible: boolean = false;
  @Input() commandInputVal: string = '';
  @Output() modalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('inputClaim') inputClaim?: InputComponent;
  @ViewChild('inputMember') inputMember?: InputComponent;
  @ViewChild('inputComm') inputComm?: InputComponent;

  buttonStatus = 'Submit';
  memberInputVal: string = '';
  claimInputVal: string = '';
  commInputVal: string = '';

  constructor(private modalService: ModalService, private router: Router) {
  }

  changeVisible(visible: boolean): void {
    this.modalVisible = visible;
    this.modalVisibleChange.emit(this.modalVisible);
    this.resetValues();
  }

  resetValues(): void {
    this.claimInputVal = '';
    this.memberInputVal = '';
    this.commInputVal = '';
  }

  resetState(): void {
    setTimeout(() =>
      this.buttonStatus = 'Submit', 2500);
  }

  navigateTo(destination: string): void {
    let param: NavigationExtras = {};
    if ((this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandCommInfo
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandDeleteComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandListComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandRevComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandCommSuspended
      || this.commandInputVal.toLocaleUpperCase() === checkRecoveryRouteCommandOverpaymentSelection
      || this.commandInputVal.toLocaleUpperCase() === checkRecoveryRouteCommandOverPaymentAddOrEdit
    )) {
      param = {
        queryParams: {
          claimNumid: this.claimInputVal,
          memberid: this.memberInputVal,
          commId: this.commInputVal,
          command: this.commandInputVal,
          eibTrnId: 'RPC1'
        }
      };
    }
    this.router.navigate([destination], param).then((val) => {
      if (val) {
        this.claimInputVal = '';
        this.memberInputVal = '';
        this.commInputVal = '';
      }
    });
  }

  buttonClick(): void {
    this.buttonStatus = 'Working...';
    const inputEl = this.inputClaim ? this.inputClaim : this.inputComm ? this.inputComm : this.inputMember;
    if (inputEl) {
      if (inputEl.errors || !inputEl.value) {
        this.buttonStatus = 'Failed';
        this.resetState();
      } else {
        this.btnSubmitEventClick();
      }
    } else {
      this.buttonStatus = 'Failed';
      this.resetState();
    }
  }

  btnSubmitEventClick(): void {
    switch (this.commandInputVal.toUpperCase()) {
      case communicationRouteCommandRevComm: {
        this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathRevComm);
        break;
      }
      case communicationRouteCommandDeleteComm: {
        this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathDeleteComm);
        break;
      }
      case communicationRouteCommandCommInfo: {
        this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathCommInfo);
        break;
      }
      case communicationRouteCommandListComm: {
        this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathListComm);
        break;
      }
      case communicationRouteCommandCommSuspended: {
        this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathCommInfo);
        break;
      }
      case checkRecoveryRouteCommandOverpaymentSelection: {
        this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathOverpaymentSelection);
        break;
      }
      case checkRecoveryRouteCommandOverPaymentAddOrEdit: {
        this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathAddOrEditOverpayment);
        break;
      }
      default: {
        this.buttonStatus = 'Failed';
        this.resetState();
        break;
      }
    }
    setTimeout(() => {
      this.buttonStatus = 'Submit';
    }, 3000);
  }

}

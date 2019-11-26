import {Injectable} from '@angular/core';
import {CheckRegisterMemberVO} from '@fox/shared';
import {ResourceOfProviderVO, ResourceOfAccountMembershipResponseVO, ResourceOfCheckVO} from '@fox/rest-clients';
import {BehaviorSubject} from 'rxjs';
@Injectable()
export class CheckDetailState {
  serviceData?: ResourceOfAccountMembershipResponseVO[] = [];
  providerServiceData?: ResourceOfProviderVO[] = [];
  selectedMember?: CheckRegisterMemberVO;
  modalData: CheckRegisterMemberVO[] = [];
  modalBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  modalIsVisible: boolean = false;
  memberSelectedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAuthorizeScreen?: boolean = false;
  checkDetails?: ResourceOfCheckVO;
  checkDetailsBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
}

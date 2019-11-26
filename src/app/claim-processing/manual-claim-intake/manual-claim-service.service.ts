import {Injectable} from '@angular/core';
import {ManualClaimDetailVO} from '@fox/rest-clients';
import {Rpdmb22} from '../manual-claim-processing/type-of-service/model/rpdmb22.model';

@Injectable({
  providedIn: 'root'
})
export class ManualClaimService {
  public data: ManualClaimDetailVO;
  firstSelectedService?: Number;

  screenBean: Rpdmb22;

  add(mcd: ManualClaimDetailVO): void {
    this.data = mcd;
  }

  clear(): void {
    this.data = {
      serviceEndDate: '',
      memberNumber: '',
      lastName: '',
      firstName: '',
      serviceDate: '',
      claimNumber: '',
      createdBy: '',
      dcn: '',
      gender: ''
    };
  }
}

import {Injectable} from '@angular/core';
import {MaintRequestStatus} from './maintenance-request-enums/maint-request-status';
import {MaintenanceApprovalDetails} from './maintenance-approval-details';
import {MaintTextColorStatus} from './maintenance-request-enums/maint-text-color-status';
import {MaintIconStatus} from './maintenance-request-enums/maint-icon-status';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceApprovalDetailService {

  maintenanceApprovalDetails: MaintenanceApprovalDetails = {
    iconStatus: MaintIconStatus.pending,
    textColorStatus: MaintTextColorStatus.pending,
    requestStatus: MaintRequestStatus.pending
  };
  constructor() { }

  getMaintenanceApproval(status: MaintRequestStatus): MaintenanceApprovalDetails {
    switch (status) {
      case MaintRequestStatus.approved:
        this.maintenanceApprovalDetails.requestStatus = MaintRequestStatus.approved;
        this.maintenanceApprovalDetails.textColorStatus = MaintTextColorStatus.approved;
        this.maintenanceApprovalDetails.iconStatus = MaintIconStatus.approved;
        break;
      case MaintRequestStatus.denied:
        this.maintenanceApprovalDetails.requestStatus = MaintRequestStatus.denied;
        this.maintenanceApprovalDetails.textColorStatus = MaintTextColorStatus.denied;
        this.maintenanceApprovalDetails.iconStatus = MaintIconStatus.denied;
        break;
      case MaintRequestStatus.pending:
        this.maintenanceApprovalDetails.requestStatus = MaintRequestStatus.pending;
        this.maintenanceApprovalDetails.textColorStatus = MaintTextColorStatus.pending;
        this.maintenanceApprovalDetails.iconStatus = MaintIconStatus.pending;
        break;
    }

    return this.maintenanceApprovalDetails;
  }
}

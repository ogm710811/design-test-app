import {MaintIconStatus} from './maintenance-request-enums/maint-icon-status';
import {MaintTextColorStatus} from './maintenance-request-enums/maint-text-color-status';
import {MaintRequestStatus} from './maintenance-request-enums/maint-request-status';

export interface MaintenanceApprovalDetails {
  iconStatus: MaintIconStatus;
  textColorStatus: MaintTextColorStatus;
  requestStatus: MaintRequestStatus;
}

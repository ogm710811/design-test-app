import {MaintenanceApprovalDetails} from './maintenance-approval-details';
import {MaintenanceRequesterInfo} from './maintenance-requester-info.model';

export interface MaintenanceApprovalHeaderDetails {
  maintApprovalDetails: MaintenanceApprovalDetails;
  requesterInfo: MaintenanceRequesterInfo;
}

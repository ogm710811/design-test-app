import {Component} from '@angular/core';
import {claimProcessingRoutePathMaintenanceApproval} from '@fox/shared';

@Component({
  selector: 'fox-request-page-navigator',
  templateUrl: './request-page-navigator.component.html',
  styleUrls: ['./request-page-navigator.component.css']
})

export class RequestPageNavigatorComponent {

  url: string = '../' + claimProcessingRoutePathMaintenanceApproval;

}

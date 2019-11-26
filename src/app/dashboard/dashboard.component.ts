import {Component, OnInit} from '@angular/core';
import {LoginService} from '@fox/shared';

@Component({
  selector: 'fox-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  get hasStaffRole(): boolean {
    return this.loginSvc.hasStaffRole;
  }

  get hasSupervisorRole(): boolean {
    return this.loginSvc.hasSupervisorRole;
  }

  constructor(private loginSvc: LoginService) {
  }

  ngOnInit(): void {
  }
}

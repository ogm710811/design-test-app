import {Component, OnInit} from '@angular/core';
import {
  BypassApi,
  ConfigteamApi,
  PagedResourcesOfResourceOfTeamVO,
  ReassignVO,
  ReferencesApi,
  ReportDetailVO,
  ResourceOfReassignVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import {FeatureFlagService, reportsFeature, ModalService} from '@fox/shared';
import * as uuid from 'uuid';
import {BypassManagementRow} from './bypass-management-row.model';
import {BypassManagementService} from './bypass-management.service';

@Component({
  selector: 'fox-bypass-management',
  templateUrl: 'bypass-management.component.html',
  styleUrls: ['./custom-table-dropdown/bypass-queue-table.component.css', '../member-lookup-queue/member-lookup-btn.css', 'bypass-management.css']
})
export class BypassManagementComponent implements OnInit {

  selectedTeam: string;
  showDialog: boolean;
  claimsNumber: string;
  msId: string;
  teamList: any[] = [];

  msReports: ReportDetailVO[] | undefined;
  nasReports: ReportDetailVO[] | undefined;

  get reportModalVisible(): boolean {
    return this.modalService.reportModalVisible;
  }

  set reportModalVisible(visible: boolean) {
    this.modalService.reportModalVisible = visible;
  }

  get hasReleaseEnableReports(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled(reportsFeature);
  }

  get usersList(): string[] {
    return this.bypassQueSrv.usersList;
  }

  get data(): BypassManagementRow[] {
    return this.bypassQueSrv.data;
  }

  constructor(
    private bypApi: BypassApi,
    private bypassQueSrv: BypassManagementService,
    private teamAPISvc: ConfigteamApi,
    private referencesSvc: ReferencesApi,
    private modalService: ModalService,
    private featureFlagSvc: FeatureFlagService
  ) {
  }

  ngOnInit(): void {
    this.init();
    this.referencesSvc.listOperationalReport(uuid(), 'MLK', 'body', false).subscribe(res => {
      this.msReports = res.microStrategyReport;
      this.nasReports = res.nasDriveReport;
    });
  }

  init(): void {
    this.teamAPISvc.findTeam(uuid(), undefined, 1000).subscribe((res: PagedResourcesOfResourceOfTeamVO) => {
      if (res && res.page && res.page.totalElements && res.page.totalElements > 0) {
        this.teamList = [];
        if (res._embedded && res._embedded.items) {
          res._embedded.items.forEach(t => {
            if (t && t.code && t.id !== 9) {
              this.teamList.push(t.code);
            }
          });
        }
        if (this.teamList && this.teamList.length > 0) {
          this.selectedTeam = this.teamList[0];
          this.bypassQueSrv.getBypassManagementForTeam(this.selectedTeam || this.teamList[0]);
        }
      }
    });
  }

  showMessage(): void {
    alert('Bypass Queue Re-assigned');
  }

  selectedOption(event: string): void {
    this.selectedTeam = event;
    this.teamAPISvc.getTeam(this.selectedTeam, uuid()).subscribe((res) => {
      this.bypassQueSrv.getBypassManagementForTeam(this.selectedTeam || this.teamList[0]);
    });
  }

  updateAssigner(row: BypassManagementRow): void {
    this.claimsNumber = row.claimCount.toString();
    this.msId = row.selectedName;
  }

  assignToClick(row: BypassManagementRow): void {
    const input: ReassignVO = {
      assignFromId: row.userName,
      assignToId: row.selectedName === 'Main Queue' ? '' : row.selectedName
    };
    const obs: Observable<ResourceOfReassignVO> = this.bypApi.reassignBypass(input, uuid());
    obs.subscribe((reassign: ResourceOfReassignVO) => {
      this.updateAssigner(row);
      this.showDialog = !this.showDialog;
      this.bypassQueSrv.getBypassManagementForTeam(this.selectedTeam || this.teamList[0]);
    });
  }
}

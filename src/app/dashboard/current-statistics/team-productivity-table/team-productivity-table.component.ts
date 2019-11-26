import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as moment from 'moment';
import {
  DashboardApi,
  TeamDashboardRequestVO,
  TeamDashboardVO,
  UseridsVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {PaginatorNonMaterialComponent} from '@fox/shared';
import {TeamDashboardStats, TeamMemberInfo} from '../current-statistics.model';
import {CurrentStatisticsService} from '../current-statistics.service';

@Component({
  selector: 'fox-team-productivity-table',
  templateUrl: 'team-productivity-table.component.html',
  styleUrls: ['team-productivity-table.component.css']

})
export class TeamProductivityTableComponent implements OnChanges {
  @Input() timeFrame: string = 'Custom';
  @Input() teamMemberList: TeamMemberInfo[];
  @Input() selectedTeam: string;
  @Input() selectedUser: string;
  @Input() customDateStart: string;
  @Input() customDateEnd: string;
  @Input() isIndividualSelected: boolean;
  @Input() childIdBase: string;
  @ViewChild(PaginatorNonMaterialComponent) paginator: PaginatorNonMaterialComponent;
  data: TeamDashboardStats[];
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  viewData: TeamDashboardStats[];
  pageSizeSelected = 10;
  dataLengthInput = 0;
  pageTotal = 0;
  currentPage = 0;

  constructor(private currentStatsSvc: CurrentStatisticsService,
              private dashApi: DashboardApi) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('teamMemberList' in changes
      || 'selectedUser' in changes
      || 'selectedTeam' in changes
      || 'customDateStart' in changes
      || 'customDateEnd' in changes
      || 'timeFrame' in changes) {
      if (this.teamMemberList && this.teamMemberList.length > 0) {
        if (this.timeFrame === 'Custom') {
          if (this.customDateStart != null && this.customDateEnd != null) {
            this.teamDashboardByTimeFrame();
          }
        } else {
          this.teamDashboardByTimeFrame();
        }
      }
    }

    this.sort('teamCode');
  }

  teamDashboardByTimeFrame(): void {
    const uidVo: UseridsVO = <UseridsVO>{};
    const idList: string[] = [];
    const teamDashReqVO: TeamDashboardRequestVO = <TeamDashboardRequestVO>{};

    if (this.teamMemberList) {
      this.teamMemberList.forEach(user => {
        idList.push(user.msID);
      });
    }

    uidVo.userid = idList;
    if (!(uidVo.userid === null || uidVo.userid === undefined) && (uidVo.userid.length > 0)) {
      teamDashReqVO.user = uidVo;
      teamDashReqVO.fromDate = this.customDateStart || moment().format('YYYY-MM-DD');
      teamDashReqVO.toDate = this.customDateEnd || moment().format('YYYY-MM-DD');

      const res: Observable<TeamDashboardVO> = this.dashApi.teamDashboard(this.timeFrame, teamDashReqVO, uuid());
      res.subscribe((r: TeamDashboardVO) => {
          this.data = [];
          if (r && r.users) {
            r.users.map((user, i) => {
              const currentMember = this.teamMemberList.filter(member => member.msID === user.name)[0];
              if (user.name && currentMember) {
                this.data[i] = {
                  msID: user.name,
                  teamCode: currentMember.teamCode,
                  userName: currentMember.lastName + ', ' + currentMember.firstName,
                  lookups: 'TBD',
                  hours: 'TBD',
                  totalMatched: user.totalMatched || 0,
                  totalNotMatched: user.totalNotMatched || 0,
                  total: user.total || 0
                };

                if (this.paginator) {
                  this.paginator.currentPage = 0;
                }
              }
            });
            if (!this.isIndividualSelected) {
              this.dataLengthInput = this.data.length;
              this.viewData = this.data.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
              this.pageTotal = Math.ceil(this.data.length / this.paginator.pageSize);
            } else {
              this.viewData = this.data.filter(filteredData => filteredData.msID === this.getIdFromName(this.selectedUser));
            }
          }
        }
      );
    }
  }

  calculateNewPage(): void {
    this.viewData = this.data.slice(this.paginator.currentPage * this.paginator.pageSize, (this.paginator.currentPage * this.paginator.pageSize) + this.paginator.pageSize);
    this.pageTotal = Math.ceil(this.data.length / this.paginator.pageSize);
  }

  get dataKeys(): string[] {
    return Object.keys(this.data[0]);
  }

  get totalMatched(): number {
    let sum = 0;

    if (this.isIndividualSelected) { // If-else logic added to fix de3711
      const filtered = this.data.filter(filteredData => filteredData.msID === this.getIdFromName(this.selectedUser));
      if (filtered.length > 0) {
        sum += filtered[0]['totalMatched'];
      }
    } else {
      for (let i = 0; i < this.data.length; i++) {
        sum += this.data[i]['totalMatched'];
      }
    }

    return sum;
  }

  get totalNotMatched(): number {
    let sum = 0;

    if (this.isIndividualSelected) { // If-else logic added to fix de3711
      const filtered = this.data.filter(filteredData => filteredData.msID === this.getIdFromName(this.selectedUser));
      if (filtered.length > 0) {
        sum += filtered[0]['totalNotMatched'];
      }
    } else {
      for (let i = 0; i < this.data.length; i++) {
        sum += this.data[i]['totalNotMatched'];
      }
    }

    return sum;
  }

  getIdFromName(name: string): string {
    return this.currentStatsSvc.getIdFromName(name);
  }

  sort(property: string): void {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

}

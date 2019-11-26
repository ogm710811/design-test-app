import {Injectable} from '@angular/core';
import {ConfiguserApi, PagedResourcesOfResourceOfUserVO} from '@fox/rest-clients';
import {Observable, Subscription} from 'rxjs';
import * as uuid from 'uuid';
import {TeamDashboardStats, TeamMemberInfo} from './current-statistics.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentStatisticsService {

  team: string;
  teamMemberList: TeamMemberInfo[] = [];
  data: TeamDashboardStats[];
  selectedTeamOption: string | undefined;

  constructor(private configApi: ConfiguserApi) {
  }

  static formatNameCasing(str: string): string {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  }

  getIdFromName(name: string): string {
    let foundId: string = '';
    this.teamMemberList.forEach(member => {
      if (name === member.firstName + ' ' + member.lastName) {
        foundId = member.msID;
      }
    });
    return foundId;
  }

  fetchTeamMembers(selectedTeam: string | undefined, teamSize: number, pageNumber: number): Subscription {

    this.selectedTeamOption = selectedTeam;
    this.teamMemberList = [];
    const res: Observable<PagedResourcesOfResourceOfUserVO> = this.configApi.findUser(uuid(), undefined, undefined, selectedTeam ? selectedTeam : undefined, undefined, teamSize ? teamSize : undefined, pageNumber ? pageNumber : undefined);

    return res.subscribe((r: PagedResourcesOfResourceOfUserVO) => {
      if (r && r._embedded && r._embedded.items) {
        this.teamMemberList = [];
        r._embedded.items.forEach(user => {
            if (user.userName && user.firstName && user.lastName && user.team) {
              this.teamMemberList.push(
                new TeamMemberInfo(
                  user.userName, CurrentStatisticsService.formatNameCasing(user.firstName).trim(),
                  CurrentStatisticsService.formatNameCasing(user.lastName.trim()), user.team.code));
            }
          }
        );
      }

    });

  }
}

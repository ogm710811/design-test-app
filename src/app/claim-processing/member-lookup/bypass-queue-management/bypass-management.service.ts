import {Injectable} from '@angular/core';
import {
  BypassManagementVO,
  ConfiguserApi,
  DashboardApi,
  PagedResourcesOfResourceOfUserVO,
  UseridsVO
} from '@fox/rest-clients';
import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {BypassManagementRow} from './bypass-management-row.model';

@Injectable({
  providedIn: 'root'
})
export class BypassManagementService {

  data: BypassManagementRow[];
  errorMessage: string;
  usersList: string[];

  constructor(private dashApi: DashboardApi, private configApi: ConfiguserApi) {
  }

  refreshTableRows(userid: string[], selectedTeam: string): void {
    const uidVo: UseridsVO = <UseridsVO>{};
    uidVo.userid = userid;
    this.data = [];
    if (!(uidVo.userid === null || uidVo.userid === undefined) && (uidVo.userid.length > 0)) {
      const res: Observable<BypassManagementVO> = this.dashApi.bypassManagement(uidVo, uuid());
      res.subscribe((r: BypassManagementVO) => {
          if (r && r.users) {
            r.users.map((user, i) => {
              if (user.msId) {
                this.data[i] = {
                  teamCode: selectedTeam,
                  userName: user.msId,
                  claimCount: user.claimCount || 0,
                  selectedName: ''
                };
              }
            });
          }
        }
      );
    }
  }

  buildUsersList(res: PagedResourcesOfResourceOfUserVO, selectedTeam: string): void {
    if (res && res._embedded && res._embedded.items) {
      this.usersList = res._embedded.items.map(user => {
          if (user.userName) {
            return user.userName;
          } else {
            return '';
          }
        }
      );
    } else {
      this.usersList = [];
    }
    this.refreshTableRows(this.usersList, selectedTeam);
  }

  getBypassManagementForTeam(selectedTeam: string): void {
    const res: Observable<PagedResourcesOfResourceOfUserVO> = this.configApi.findUser(uuid(), undefined, undefined, selectedTeam, undefined, 50);

    res.subscribe((r: PagedResourcesOfResourceOfUserVO) => {
        this.buildUsersList(r, selectedTeam);
      }
    );
  }
}

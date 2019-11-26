export class TeamDashboardStats {
  msID: string;
  teamCode: string | undefined;
  userName: string;
  lookups: string;
  hours: string;
  totalMatched: number;
  totalNotMatched: number;
  total: number;
}

export class TeamMemberInfo {
  msID: string;
  firstName: string;
  lastName: string;
  teamCode: string | undefined;

  constructor(msID: string, firstName: string, lastName: string, teamCode: string | undefined) {
    this.msID = msID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.teamCode = teamCode;
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {
  communicationRouteCommandCommInfo,
  communicationRouteCommandCommSuspended,
  communicationRouteCommandDeleteComm,
  communicationRouteCommandListComm,
  communicationRouteCommandRevComm,
  communicationRoutePathEndComm,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathQualityReviewCommInfo
} from '../constants/communication.constants';

@Injectable({
  providedIn: 'root'
})
export class CommandArgumentGuard implements CanActivateChild {

  constructor(private route: Router) {
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const memberId = next.queryParamMap.get('memberid');
    const comm = next.queryParamMap.get('commId');
    const command = next.queryParamMap.get('command');

    if (command === communicationRouteCommandListComm.toLowerCase()
      || command === communicationRouteCommandCommInfo.toLowerCase()) {
      if (memberId && memberId.length > 8) {
        return true;
      } else {
        this.navigateToErrorPage();
        return false;
      }
    }

    if (command === communicationRouteCommandCommSuspended.toLowerCase()
      || command === communicationRouteCommandRevComm.toLowerCase()
      || command === communicationRouteCommandDeleteComm.toLowerCase()) {
      if (comm && comm.length > 10) {
        return true;
      } else {
        this.navigateToErrorPage();
        return false;
      }
    }
    const urlSegment = state.url.split('/');
    if (command === null
      && urlSegment.length > 2
      && urlSegment[2] !== communicationRoutePathQualityReviewComm
      && urlSegment[2] !== communicationRoutePathQualityReviewCommInfo
      && urlSegment[2] !== communicationRoutePathEndComm) {
      this.navigateToErrorPage();
      return false;
    }

    return true;
  }

  navigateToErrorPage(): void {
    this.route.navigate(['insufficient-access']);
  }
}

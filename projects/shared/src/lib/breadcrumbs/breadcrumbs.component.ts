import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Link} from '../link/link.model';
import {PageHeaderService} from '../page-header/page-header.service';
import {LoginService} from '../login-service/login.service';

@Component({
  selector: 'fox-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  @Input() links: Link[] = [];

  get customTitle(): string {
    return this.pageHeaderService.customTitle;
  }

  constructor(private router: Router, private pageHeaderService: PageHeaderService, private loginSvc: LoginService) {
  }

  navigateHome(): void {
    this.router.navigate([this.loginSvc.homeUrl]);
  }

}

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  ActivatedRoute,
  Data,
  Event as RouterEvent,
  NavigationEnd,
  Router,
  UrlSegment
} from '@angular/router';
import {Observable, Subscription, zip as observableZip} from 'rxjs';
import {map} from 'rxjs/operators';
import {OldPageHeaderConfig} from '../nav/nav-data-link.model';
import {Link} from '../link/link.model';
import {ProgressContextService} from '../progress-aware-container/progress-context.service';
import {MessageBoxService} from '../message-box/message-box.service';
import {NavData} from '../nav/nav-data.model';

@Component({
  selector: 'fox-default-breadcrumbs',
  templateUrl: './default-breadcrumbs.component.html',
  styleUrls: ['./default-breadcrumbs.component.css']
})
export class DefaultBreadcrumbsComponent implements OnInit, OnDestroy {
  @Input() config?: OldPageHeaderConfig;
  @Output() linksChange: EventEmitter<Link[]> = new EventEmitter<Link[]>();
  links: Observable<Link[]> = new Observable();
  linksSnapshot: Link[] = [];
  navigationSubscription: Subscription = new Subscription();
  breadcrumbSubscription: Subscription = new Subscription();
  hideHeader?: boolean;
  hideBreadcrumbs?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private progressContextService: ProgressContextService,
    private messageBoxService: MessageBoxService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToBreadcrumbs();

    // The ActivatedRoute changes every time we navigate, and for some reason it doesn't get
    // updated. We therefore have to subscribe to changes from the router, and subscribe to the new
    // ActivatedRoute each time.
    this.navigationSubscription = this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        this.subscribeToBreadcrumbs();

        // Clear the loading tag after navigating to the new page
        this.progressContextService.clearTagMap();

        // Clear assertive messages
        this.messageBoxService.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFromBreadcrumbs();
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    // Clear assertive messages
    this.messageBoxService.reset();
  }

  removeMessage(index: number): void {
    this.messageBoxService.removeMessageBox(index);
  }

  navigateHome(): void {
    this.router.navigate(['/dashboard']);
  }

  private unsubscribeFromBreadcrumbs(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

  private subscribeToBreadcrumbs(): void {
    // Cleanup the old subscription
    this.unsubscribeFromBreadcrumbs();
    this.links = this.breadcrumbsForRoute(this.route.root);
    this.breadcrumbSubscription = this.links.subscribe(lnks => {
      this.linksSnapshot = lnks.filter(l => {
        return !!l.path;
      });
      this.linksChange.emit(this.linksSnapshot);
    });
  }

  private breadcrumbsForRoute(ar: ActivatedRoute): Observable<Link[]> {
    // Watch the path of this route
    const routePath: Observable<string> = ar.url.pipe(map((segments: UrlSegment[]) => {
      return segments.join('/');
    }));
    // Watch the label of this route (specified in the xyz-routing.module.ts under data > label)
    const routeLabel: Observable<string> = ar.data.pipe(map((dat: Data) => {
      if (dat && dat.hasOwnProperty('nav')) {
        const nav: NavData = dat.nav;
        if (nav.linksToThisPath && this.config) {
          this.hideHeader = !!this.config.hideHeader;
          this.hideBreadcrumbs = !!this.config.hideBreadcrumbs;
          return nav.linksToThisPath[0].label;
        }
      }
      return '';
    }));

    // Combine (zip) two Observables into one using a function that takes the output of each of the
    // Observables. We want to make an Observable of our Link interface, and watch for changes
    // to it.
    const routeLink: Observable<Link> =
      observableZip(routePath, routeLabel, (path: string, label: string) => {
        return <Link>{
          path: (path ? '/' + path : ''),
          label: label,
          hideHeader: this.hideHeader,
          hideBreadcrumbs: this.hideBreadcrumbs
        };
      });

    // We then want to turn the single Link into a List of Links.
    // Return an empty list if the link has no href, and a list containing only this route's link if
    // valid
    const thisLink: Observable<Link[]> = routeLink.pipe(map(lnk => {
      if (lnk && lnk.path) {
        return [lnk];
      } else {
        return [];
      }
    }));

    // Use the presence or absence of child routes to determine if we are in the base case of the
    // recursion or not.
    const kids = ar.children;
    // Return this link if we have no kids
    if (kids.length < 1) {
      return thisLink;
    } else {
      // If we have kids, make a recursive call for the first kid.
      const nextLink: Observable<Link[]> = this.breadcrumbsForRoute(kids[0]);

      // Use zip again to
      return observableZip(thisLink, nextLink, (l1, l2) => {
        return l1.concat(l2.map(l => {
          l.path = (l1.length ? l1[0].path : '') + l.path;
          return l;
        }));
      });
    }
  }
}

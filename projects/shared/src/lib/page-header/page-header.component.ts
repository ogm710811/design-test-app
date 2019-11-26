import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ReflectiveInjector,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Event as RouterEvent,
  NavigationEnd,
  NavigationStart,
  Router
} from '@angular/router';
import {Subscription} from 'rxjs';
import {HeaderRightItem} from './header-right-item';
import {HeaderSubtitleItem} from './header-subtitle-item';
import {PageHeaderRightComponent} from './page-header-right.component';
import {PageHeaderRightDirective} from './page-header-right.directive';
import {PageHeaderSubtitleComponent} from './page-header-subtitle.component';
import {PageHeaderSubtitleDirective} from './page-header-subtitle.directive';
import {PageHeaderService} from './page-header.service';
import {MaintenanceApprovalHeaderDetails} from '../maintenance-approval-detail/maintenance-approval-header-details';
import {NavDataLink, NewPageHeaderConfig} from '../nav/nav-data-link.model';
import {
  MessageBoxModel,
  MessageBoxService
} from '../message-box/message-box.service';
import {BadgeSettings} from '../fox-badge/fox-badge-models/badge-settings';
import {NotifyFooter} from '../notify-footer/notify-footer.service';
import {ProgressContextService} from '../progress-aware-container/progress-context.service';
import {NavData} from '../nav/nav-data.model';
import {Link} from '../link/link.model';

@Component({
  selector: 'fox-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  currentNav?: number = 1;
  @Input() config?: NewPageHeaderConfig;
  tabTitles?: string[] = [];
  xsPrimaryTabCount?: number;
  smPrimaryTabCount?: number;
  val: any;
  tab: any;
  pageTitle: string = '';

  links: Link[] = [];
  navigationSubscription: Subscription = new Subscription();

  @ViewChild(PageHeaderRightDirective) headerRightHost?: PageHeaderRightDirective;
  @ViewChild(PageHeaderSubtitleDirective) headerSubtitleHost?: PageHeaderSubtitleDirective;

  @Output() private currentTabVal = new EventEmitter<number>();
  @Output() private eventHideWorkItems = new EventEmitter<boolean>();

  private _previousNavData?: NavDataLink;

  get messageBoxes(): MessageBoxModel[] {
    return this.messageBoxService.get();
  }

  get badgeParams(): BadgeSettings[] {
    return this.pageHeaderService.badgeParams;
  }

  constructor(
    private router: Router,
    public pageHeaderService: PageHeaderService,
    private messageBoxService: MessageBoxService,
    private notifyFooter: NotifyFooter,
    private progressContextService: ProgressContextService,
    private activatedRoute: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef
  ) {
    this.pageHeaderService.headerRightItemChange.subscribe((item: any) => {
      if (this.headerRightHost) {
        this.updateRightComponent(item);
      }
    });

    this.pageHeaderService.headerSubtitleItemChange.subscribe((item: any) => {
      if (this.headerSubtitleHost) {
        this.updateSubtitleComponent(item);
      }
    });
  }

  // Calling this.updateBreadcrumbs() in ngAfterViewInit causes the error: ExpressionChangedAfterItHasBeenCheckedError
  // the error is set off because links value changes from [] to [object] during Angular's change detection hook
  // Moving the intial update call to on init to avoid the change detection error. This error only occurs on page refresh.
  ngOnInit(): void {
    this.updateBreadcrumbs();
    // The ActivatedRoute changes every time we navigate, and for some reason it doesn't get
    // updated. We therefore have to subscribe to changes from the router, and subscribe to the new
    // ActivatedRoute each time.
    this.navigationSubscription = this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationStart) {
        // Clear the loading tag after navigating to the new page
        this.progressContextService.clearTagMap();

        // Reset variables on navigation
        this.messageBoxService.reset();
        this.pageHeaderService.reset();
      } else if (ev instanceof NavigationEnd) {
        this.updateBreadcrumbs();
      }
    });
  }

  ngAfterViewInit(): void {
    this.pageHeaderService.updateTabTitles.subscribe(() => {
      this.tabTitles = this.pageHeaderService.tabTitles;
      if (this.config) {
        this.config.tabTitles = this.pageHeaderService.tabTitles;
        this.config.hiddenTabs = this.pageHeaderService.hiddenTabs;
      }
    });

    if (this.headerRightHost && this.pageHeaderService.headerRightItem) {
      this.updateRightComponent(this.pageHeaderService.headerRightItem);
    }

    if (this.headerSubtitleHost && this.pageHeaderService.headerSubtitleItem) {
      this.updateSubtitleComponent(this.pageHeaderService.headerSubtitleItem);
    }

  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }

    // Clear assertive messages
    this.messageBoxService.reset();
  }

  get hasMaintApprovalDetails(): boolean {
    return this.pageHeaderService.hasMaintApprovalDetails;
  }

  get maintenanceApprovalHeaderDetails(): MaintenanceApprovalHeaderDetails | undefined {
    if (this.pageHeaderService.maintenanceApprovalHeaderDetails) {
      return this.pageHeaderService.maintenanceApprovalHeaderDetails;
    } else {
      return undefined;
    }
  }

  tabCheck(index: number): void {
    this.val = this.tabTitles && this.tabTitles[index];
  }

  onChange(e: any): void {
    this.val = e;
  }

  hideWorkItems(hideWorkItems: boolean): void {
    this.eventHideWorkItems.emit(hideWorkItems);
  }

  updateRightComponent(item: HeaderRightItem | null): void {
    if (this.headerRightHost) {
      const viewContainerRef = this.headerRightHost.viewContainerRef;
      viewContainerRef.clear();

      if (item) {
        const componentFactory = item.componentFactoryResolver.resolveComponentFactory(item.component);
        const refInjector = ReflectiveInjector
          .resolveAndCreate([{
            provide: item.component,
            useValue: item.component
          }], item.injector);

        const componentRef = viewContainerRef.createComponent(componentFactory, 0, refInjector);
        (<PageHeaderRightComponent>componentRef.instance).data = item.data;
        this.cdRef.detectChanges();
      }
    }
  }

  updateSubtitleComponent(item: HeaderSubtitleItem | null): void {
    if (this.headerSubtitleHost) {
      const viewContainerRef = this.headerSubtitleHost.viewContainerRef;
      viewContainerRef.clear();

      if (item) {
        const componentFactory = item.componentFactoryResolver.resolveComponentFactory(item.component);
        const refInjector = ReflectiveInjector
          .resolveAndCreate([{
            provide: item.component,
            useValue: item.component
          }], item.injector);

        const componentRef = viewContainerRef.createComponent(componentFactory, 0, refInjector);
        (<PageHeaderSubtitleComponent>componentRef.instance).data = item.data;
        this.cdRef.detectChanges();
      }
    }
  }

  private updateBreadcrumbs(): void {
    this.links = this.breadcrumbsForRoute(this.activatedRoute.root.snapshot).filter(l => {
      return !!l.path;
    });
    this.cdRef.detectChanges();
  }

  private breadcrumbsForRoute(ar: ActivatedRouteSnapshot): Link[] {
    const hideHeader: boolean = false;
    const hideBreadcrumbs: boolean = false;
    const disableBreadcrumb: boolean = false;
    // Get the path of this route
    const routePath: string = ar.url.join('/');
    // Get the label of this route (specified in the xyz-routing.module.ts under data > label)
    let routeLabel: string = '';
    if ('nav' in ar.data) {
      this.notifyFooter.setNotificationFooter(ar.data.nav);
      const nav: NavData = ar.data.nav;
      if (nav.linksToThisPath && nav.linksToThisPath[0]) {
        const navData: NavDataLink = nav.linksToThisPath[0];
        this.pageTitle = navData.label;
        if (navData.label) {
          this.pageHeaderService.setPageHeaderTitle(this.pageTitle);
        }

        this.hideWorkItems(navData.hideWorkItems ? navData.hideWorkItems : false);
        routeLabel = navData.label;
        this._previousNavData = navData;
      }
    }

    // Combine (zip) two Observables into one using a function that takes the output of each of the
    // Observables. We want to make an Observable of our Link interface, and watch for changes
    // to it.
    const routeLink: Link = {
      path: (routePath ? '/' + routePath : ''),
      label: routeLabel,
      hideHeader: hideHeader,
      hideBreadcrumbs: hideBreadcrumbs,
      disableBreadcrumb: disableBreadcrumb
    };

    // We then want to turn the single Link into a List of Links.
    // Return an empty list if the link has no href, and a list containing only this route's link if
    // valid
    const thisLink: Link[] = routeLink && routeLink.path ? [routeLink] : [];

    // Use the presence or absence of child routes to determine if we are in the base case of the
    // recursion or not.
    const kids = ar.children;
    // Return this link if we have no kids
    if (kids.length < 1) {
      return thisLink;
    } else {
      // If we have kids, make a recursive call for the first kid.
      const nextLink: Link[] = this.breadcrumbsForRoute(kids[0]);

      // Use zip again to
      return thisLink.concat(nextLink.map(l => {
        l.path = (thisLink.length ? thisLink[0].path : '') + l.path;
        return l;
      }));
    }
  }

}

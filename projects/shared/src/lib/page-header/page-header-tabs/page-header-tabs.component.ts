import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {PageHeaderService} from '../page-header.service';
import {LoginService} from '../../login-service/login.service';

@Component({
  selector: 'fox-page-header-tabs',
  templateUrl: './page-header-tabs.component.html',
  styleUrls: ['./page-header-tabs.component.css']
})
export class PageHeaderTabsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() xsPrimaryTabCount: number = 0;
  @Input() smPrimaryTabCount: number = 0;
  @Input() hiddenTabs: string[] = [];
  primaryTabCount: number = 0;
  primaryTabs: string[] = [];
  secondaryTabs: string[] = [];
  currentNavChangeSubscription: Subscription = new Subscription();

  private _tabs: string[] = [];

  get tabs(): any[] {
    return this._tabs;
  }

  @Input()
  set tabs(tabs: any[]) {
    let tabResult: string[] = [];
    tabs.forEach(tabObject => {
      if (typeof tabObject === 'object') {
        if (tabObject['authorityRule']) {
          if (tabObject['authorityRule'].isObeyed(this.loginSvc.loginState.permissions)) {
            tabResult.push(tabObject['tabName']);
          }
        } else {
          tabResult.push(tabObject['tabName']);
        }
      } else {
        tabResult = tabs;
      }
    });
    this._tabs = tabResult;
  }

  get hasSupervisorRole(): boolean {
    return this.loginSvc.hasSupervisorRole;
  }

  constructor(
    private pageHeaderService: PageHeaderService,
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private loginSvc: LoginService,
  ) { }

  ngOnInit(): void {
    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe((currentNav: any) => {
      this.cdRef.detectChanges();
    });
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(
      result => {
        if (result.matches) {
          if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
            this.primaryTabCount = this.xsPrimaryTabCount || 2;
          }
          if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
            this.primaryTabCount = this.smPrimaryTabCount || 3;
          }
        } else {
          this.primaryTabCount = this.tabs.length;
        }
        this.primaryTabs = this.tabs.slice(0, this.primaryTabCount);
        this.secondaryTabs = this.tabs.slice(this.primaryTabCount);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('tabs' in changes) {
      if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.primaryTabCount = this.xsPrimaryTabCount || 2;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
        this.primaryTabCount = this.smPrimaryTabCount || 3;
      } else {
        this.primaryTabCount = this.tabs.length;
      }

      this.primaryTabs = this.tabs.slice(0, this.primaryTabCount);
      this.secondaryTabs = this.tabs.slice(this.primaryTabCount);
    }
  }

  showTab(tab: string): boolean {
    if (!this.hiddenTabs || this.hiddenTabs.length === 0) {
      return true;
    }
    const result = this.hiddenTabs.find( hiddenTab => {
      return hiddenTab === tab;
    });
    if (result) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
  }
}

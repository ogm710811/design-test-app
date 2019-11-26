import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FeatureFlagService, LoginService, NavData, NavScreenIdentifier, NotifyFooter} from '@fox/shared';

@Component({
  selector: 'fox-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  data?: NavScreenIdentifier;
  currentScreenOrTabId: string | null;
  @Output() showKeyboardShortcutsModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  get isF4914Enabled(): boolean {
    return !this.featureFlagSvc.isFeatureDisabled('F4914');
  }

  get currentEnvironment(): string | undefined {
    return (this.loginService.retriveApplicationEnvironment() ? `Fox Build ${this.loginService.retriveApplicationEnvironment()}` : '');
  }

  constructor(protected activatedRoute: ActivatedRoute,
              private router: Router,
              private notification: NotifyFooter,
              private loginService: LoginService,
              private featureFlagSvc: FeatureFlagService) {
  }

  ngOnInit(): void {
    this.notification.getNotificationFooter().subscribe((notify: NavData | number) => {
      if (typeof notify === 'number') {
        if (!!notify && !!this.data && this.data.hasTabs) {
          this.currentScreenOrTabId = this.data.tabs[notify] ? this.data.tabs[notify] : '';
        }
      } else {
        this.data = !!notify ? (!!notify.linksToThisPath ? (!!notify.linksToThisPath[0].identifiers ? notify.linksToThisPath[0].identifiers : undefined) : undefined) : undefined;
        this.currentScreenOrTabId = !!this.data ? this.data.screenId : '';
      }
    });
  }

  navigateOutside(url: string): void {
    window.open(url, '_blank');
  }

  showKeyboardShortcut(): void {
    this.showKeyboardShortcutsModal.emit(true);
  }
}

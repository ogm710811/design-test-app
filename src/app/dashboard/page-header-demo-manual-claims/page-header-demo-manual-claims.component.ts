import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  HeaderRightItem,
  HeaderSubtitleItem,
  PageHeaderService,
  ProcessClaimHeaderRightComponent,
  ProcessClaimSubheaderComponent
} from '@fox/shared';

@Component({
  templateUrl: './page-header-demo-manual-claims.component.html',
  styleUrls: ['./page-header-demo-manual-claims.component.css']
})
export class PageHeaderDemoManualClaimsComponent implements OnInit, OnDestroy {

  recordLocked: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.recordLocked,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.recordLocked,
    iconClasses: [BadgeIcons.recordLocked],
    iconPosition: BadgeIconPositions.before
  };
  queue: BadgeSettings = {
    templateType: BadgeTemplates.iconText,
    backgroundColor: BadgeColors.queue,
    badgeClasses: ['bd-chip-icon-text', 'bd-chip-hover', 'bd-chip-clickable'],
    text: BadgeTextDescriptions.queue,
    iconClasses: [BadgeIcons.queue],
    iconPosition: BadgeIconPositions.before
  };
  suscription: Subscription;
  item: string;
  currentNavChangeSubscription: Subscription;

  constructor(
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.pageHeaderService.customTitle = 'This is a sample for process claims subheader';
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      ProcessClaimHeaderRightComponent,
      {
        suspendBtn: {
          display: 'Microfilm (F6)',
          identifier: 's',
          tab: 'ctrl+f6',
        }
      },
      this.componentFactoryResolver,
      this.injector);

    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      ProcessClaimSubheaderComponent, {
        memberName: 'The Incredible Hulk',
        account: '12345678911',
        communication: '010117-12345',
        quality: '05-22-18 022-0017',
        dateOfBirth: '06/22/2010',
        plans: 'C, NO1, A1, C'
      },
      this.componentFactoryResolver,
      this.injector);

    this.currentNavChangeSubscription = this.pageHeaderService.currentNavChange.subscribe(currentNav => {
      this.cdRef.detectChanges();
    });
    this.suscription = this.pageHeaderService.getBtnClickEmitter().subscribe(item => {
      this.item = item;
    });
  }

  ngOnDestroy(): void {
    this.currentNavChangeSubscription.unsubscribe();
    this.suscription.unsubscribe();
  }

}

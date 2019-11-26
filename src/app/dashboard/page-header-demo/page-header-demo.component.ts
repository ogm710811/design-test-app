import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  BadgeColors,
  BadgeIconPositions,
  BadgeIcons,
  BadgeSettings,
  BadgeTemplates,
  BadgeTextDescriptions,
  HeaderRightItem,
  HeaderSubtitleItem,
  PageHeaderService
} from '@fox/shared';
import {Subscription} from 'rxjs';
import {PageHeaderRightSampleComponent} from './page-header-right-sample.component';
import {PageHeaderSubtitleSampleComponent} from './page-header-subtitle-sample.component';

@Component({
  selector: 'fox-page-header-demo',
  templateUrl: './page-header-demo.component.html',
  styleUrls: ['./page-header-demo.component.css']
})
export class PageHeaderDemoComponent implements OnInit, OnDestroy {

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
  currentNavChangeSubscription: Subscription;
  item: string;

  constructor(
    public pageHeaderService: PageHeaderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private cdRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.pageHeaderService.badgeParams.push(this.recordLocked, this.queue);
    this.pageHeaderService.customTitle = 'Document #73460137';
    this.pageHeaderService.tabs = ['First Tab', '2nd Tab', 'Third Tab', 'Fourth Tab', 'Fifth Tab'];
    this.pageHeaderService.currentNav = 1;
    this.pageHeaderService.headerRightItem = new HeaderRightItem(
      PageHeaderRightSampleComponent,
      {buttonTitle: 'Right Button', item: 'first option', item1: '2nd option', item2: 'third option'},
      this.componentFactoryResolver,
      this.injector
    );
    this.pageHeaderService.headerSubtitleItem = new HeaderSubtitleItem(
      PageHeaderSubtitleSampleComponent,
      {},
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

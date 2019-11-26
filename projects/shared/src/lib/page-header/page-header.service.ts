import {
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  Injector
} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {HeaderRightItem} from './header-right-item';
import {HeaderSubtitleItem} from './header-subtitle-item';
import {MaintenanceApprovalHeaderDetails} from '../maintenance-approval-detail/maintenance-approval-header-details';
import {BadgeSettings} from '../fox-badge/fox-badge-models/badge-settings';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {

  tabTitles?: string[];
  hiddenTabs?: string[] = [];
  hasMaintApprovalDetails: boolean = false;
  badgeParams: BadgeSettings[] = [];
  dynamicData: any;
  pageTitle: string = '';
  pageHeaderAlert: BehaviorSubject<string> = new BehaviorSubject('');

  headerRightItemChange = new EventEmitter<HeaderRightItem | null>();

  set headerRightItem(item: HeaderRightItem | null) {
    this._headerRightItem = item;
    this.headerRightItemChange.emit(item);
  }

  get headerRightItem(): HeaderRightItem | null {
    return this._headerRightItem;
  }

  headerSubtitleItemChange = new EventEmitter<HeaderSubtitleItem | null>();

  get headerSubtitleItem(): HeaderSubtitleItem | null {
    return this._headerSubtitleItem;
  }

  set headerSubtitleItem(item: HeaderSubtitleItem | null) {
    this._headerSubtitleItem = item;
    this.headerSubtitleItemChange.emit(item);
  }

  updateTabTitles = new EventEmitter();
  updateDynamicData = new EventEmitter();
  buttonClicked: EventEmitter<string> = new EventEmitter();

  customTitleChange: EventEmitter<string> = new EventEmitter<string>();

  get customTitle(): string {
    return this._customTitle;
  }

  set customTitle(title: string) {
    this._customTitle = title;
    this.customTitleChange.emit(this._customTitle);
  }

  buttonClickedCallback: Subject<string> = new Subject<string>();

  currentNavChange: EventEmitter<number> = new EventEmitter<number>();

  get currentNav(): number {
    return this._currentNav;
  }

  set currentNav(nav: number) {
    this._currentNav = nav;
    this.currentNavChange.emit(this._currentNav);
  }

  private _maintenanceApprovalHeaderDetails?: MaintenanceApprovalHeaderDetails;
  private _headerRightItem: HeaderRightItem | null = null;
  private _headerSubtitleItem: HeaderSubtitleItem | null = null;

  private _customTitle: string = '';

  private _componentFactoryResolver?: ComponentFactoryResolver;
  private _injector?: Injector;
  private _currentNav: number = 1;

  setPageHeaderTitle(title: any): void {
    this.pageTitle = title;
  }

  set maintenanceApprovalHeaderDetails(maintenanceApprovalHeaderDetails: MaintenanceApprovalHeaderDetails | undefined) {
    this._maintenanceApprovalHeaderDetails = maintenanceApprovalHeaderDetails;
  }

  get maintenanceApprovalHeaderDetails(): MaintenanceApprovalHeaderDetails | undefined {
    if (this._maintenanceApprovalHeaderDetails) {
      return this._maintenanceApprovalHeaderDetails;
    } else {
      return undefined;
    }
  }

  set tabs(titles: string[]) {
    this.tabTitles = titles;
    this.updateTabTitles.emit();
  }

  set hiddenTabList(hiddenTabList: string[]) {
    this.hiddenTabs = hiddenTabList;
    this.updateTabTitles.emit();
  }

  set dynamicComponentData(data: any) {
    this.dynamicData = data;
    this.updateDynamicData.emit(this.dynamicData);
  }

  reset(): void {
    this.badgeParams = [];
    this.customTitle = '';
    this.headerRightItem = null;
    this.headerSubtitleItem = null;
  }

  emitBtnClickEvent(btnString: string): void {
    this.buttonClicked.emit(btnString);
  }

  getBtnClickEmitter(): EventEmitter<string> {
    return this.buttonClicked;
  }

}

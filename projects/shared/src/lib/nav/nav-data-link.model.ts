import {NavScreenIdentifier} from './nav-screen-identifier.model';

export interface NavDataLink {
  label: string;
  pageHeaderConfig?: PageHeaderConfigType;
  hideAssertiveMessages: boolean;
  fullWidth: boolean;
  identifiers?: NavScreenIdentifier;
  hideWorkItems?: boolean;
  hideFooter?: boolean;
}

export type PageHeaderConfigType = NewPageHeaderConfig | OldPageHeaderConfig | FeatureFlaggedPageHeaderConfig;

export interface NewPageHeaderConfig {
  headerType: 'new';
  showTabs?: boolean;
  tabTitles?: string[];
  hiddenTabs?: string[];
  xsPrimaryTabCount?: number;
  smPrimaryTabCount?: number;
  disableBreadcrumb?: boolean;
}

export interface OldPageHeaderConfig {
  headerType: 'old';
  hideHeader?: boolean;
  hideBreadcrumbs?: boolean;
}

export interface FeatureFlaggedPageHeaderConfig {
  headerType: 'flagged';
  feature: string;
  featureEnabledConfig: PageHeaderConfigType;
  featureDisabledConfig: PageHeaderConfigType;
}

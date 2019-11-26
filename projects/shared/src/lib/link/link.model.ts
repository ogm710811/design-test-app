export interface Link {
  path: string;
  label: string;
  labelPrefix?: string;
  labelSuffix?: string;
  hideHeader?: boolean;
  hideBreadcrumbs?: boolean;
  disableBreadcrumb?: boolean;
}

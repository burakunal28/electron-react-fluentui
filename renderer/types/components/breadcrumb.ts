export interface BreadcrumbItemType {
  key: string;
  path: string;
  text?: string;
  isHome: boolean;
  tab?: string;
  current?: boolean;
  defaultTab?: string;
}

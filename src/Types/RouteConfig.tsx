export interface RouteNodeConfig {
  path?: string;
  title?: string;
  icon?: string;
  hideInMenu?: boolean;
  noLink?: boolean;
  authority?: string;
  children?: RouteNodeConfig[];
  component?: string;
}

export type RouteConfig = RouteNodeConfig[];

export default RouteConfig;

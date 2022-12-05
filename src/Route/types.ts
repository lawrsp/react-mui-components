import { ReactNode } from 'react';

export interface RouteNodeBaseConfig {
  key?: string;
  path?: string;
  title?: string;
  icon?: string;
  noMenu?: boolean; // no show in menu
  noLink?: boolean; // no link in breadscrumb
  redirectTo?: string;
  access?: string; // privileges
  element?: ReactNode;
}

export type IndexRouteNodeConfig = RouteNodeBaseConfig & {
  index: true;
  children?: undefined;
};

export type PathRouteNodeConfig = RouteNodeBaseConfig & {
  index?: undefined;
  children?: RouteNodeConfig[];
};

export type RouteNodeConfig = IndexRouteNodeConfig | PathRouteNodeConfig;

export type RouteConfig = RouteNodeConfig[];

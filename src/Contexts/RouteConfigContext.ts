import { useContext, createContext, ReactNode } from 'react';

export type AccessType = { [key: string]: string | string[] | AccessType } | AccessType[];

export interface RouteNodeBaseConfig {
  id?: string;
  path?: string;
  title?: string;
  icon?: string;
  noMenu?: boolean; // no show in menu
  noLink?: boolean; // no link in breadscrumb
  redirectTo?: string;
  access?: AccessType; // privileges
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

export const RouteConfigContext = createContext<RouteConfig>([]);

export default RouteConfigContext;

export const useRouteConfig = () => useContext(RouteConfigContext);

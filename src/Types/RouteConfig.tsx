import { ReactNode } from 'react';

export type AccessType = { [key: string]: string | string[] | AccessType } | AccessType[];

export interface RouteNodeConfig {
  key?: string;
  path?: string;
  title?: string;
  icon?: string;
  noMenu?: boolean; // no show in menu
  noLink?: boolean; // no link in breadscrumb
  access?: AccessType; // privileges
  children?: RouteNodeConfig[];
  fallback?: ReactNode; // fallback ui
  element?: ReactNode;
}

export type RouteConfig = RouteNodeConfig[];

export default RouteConfig;

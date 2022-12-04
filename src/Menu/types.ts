export interface MenuNodeConfig {
  title: string;
  path: string;
  icon?: string;
  key?: string;
  children?: MenuNodeConfig[];
}

export type MenuConfig = MenuNodeConfig[];

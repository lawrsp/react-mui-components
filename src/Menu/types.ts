export interface MenuNodeConfig {
  key?: string;
  title: string;
  icon?: string;
  children?: MenuNodeConfig[];
}

export type MenuConfig = MenuNodeConfig[];

export type NavMenuNodeConfig = MenuNodeConfig & {
  path: string;
  children?: NavMenuNodeConfig[];
};

export type NavMenuConfig = NavMenuNodeConfig[];

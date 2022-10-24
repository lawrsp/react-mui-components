export interface MenuNodeConfig {
  title: string;
  icon?: string;
  key?: string;
  path?: string;
  children?: MenuNodeConfig[];
}

export type MenuConfig = MenuNodeConfig[];

export default MenuConfig;

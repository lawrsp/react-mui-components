import * as React from 'react';
import { Box, List, ListItem, ListItemText, Icon, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { MenuConfig, MenuNodeConfig } from '../Contexts';

const openColor = 'white';
const openBackground = 'primary.main';
/* const openBackgfound = 'red'; */

export const locationContainPath = (location: string, path?: string) => {
  if (!path) {
    return false;
  }
  /* console.log('location is:', location); */
  if (path === '/' && location[0] === '/') {
    return true;
  }
  const pathLength = path.length;
  if (location.slice(0, pathLength) !== path) {
    return false;
  }
  if (location.length > pathLength) {
    const nextChar = location[pathLength];
    if (nextChar !== '/' && nextChar !== '?') {
      return false;
    }
  }
  return true;
};

type NavMenuItemProps = {
  indent: number;
  menu: MenuNodeConfig;
  children?: React.ReactNode;
  endIcon?: React.ReactNode;
  active: boolean;
  onClick?: (ev: React.SyntheticEvent) => void;
};

const NavMenuItem = ({ indent, menu, active, children, endIcon, onClick }: NavMenuItemProps) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color: 'hsla(0,0%,100%,.65)',
        padding: 0,
      }}
      disableGutters
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            position: 'relative',
            cursor: 'pointer',
            color: active ? openColor : undefined,
            bgcolor: active && !menu.children?.length ? openBackground : undefined,
            ' :hover': {
              bgcolor: active && !menu.children?.length ? undefined : 'rgba(255,255,255,0.08)',
            },
          }}
        >
          {menu.icon && <Icon>{menu.icon}</Icon>}
          <ListItemText
            sx={{
              width: '100%',
              height: '4rem',
              lineHeight: '4rem',
              paddingLeft: `${indent}px`,
            }}
            primary={menu.title}
            disableTypography={true}
          />
          {endIcon}
        </Box>
      </Box>
      {children}
    </ListItem>
  );
};

type NavMenuLeafProps = {
  indent: number;
  menu: MenuNodeConfig;
  currentPath?: string;
  onClick?: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
};

const NavMenuLeaf = (props: NavMenuLeafProps) => {
  const { currentPath, menu, onClick, ...rest } = props;

  const { path } = menu;

  const active = React.useMemo(() => {
    if (locationContainPath(currentPath || '', path)) {
      return true;
    }
    return false;
  }, [currentPath, path]);

  /* console.log('--- ', currentPath, path, active); */
  const handleClick = onClick ? (ev: React.SyntheticEvent) => onClick(ev, menu) : undefined;

  // 有点击事件，则不用link
  return <NavMenuItem {...rest} menu={menu} active={active} onClick={handleClick} />;
};

type NavMenuParentProps = {
  indentSize: number;
  indent: number;
  currentPath?: string;
  menu: MenuNodeConfig;
  children?: React.ReactNode;
  onClickMenu?: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
};

const NavMenuParent = ({
  indentSize,
  indent,
  menu,
  onClickMenu,
  children,
  currentPath,
}: NavMenuParentProps) => {
  const { path } = menu;
  const active = locationContainPath(currentPath || '', path);
  const [collapsed, setCollapsed] = React.useState(active);

  console.log('path:', path, 'collapsed:', collapsed, active);

  React.useEffect(() => {
    if (active) {
      setCollapsed(true);
    }
  }, [active]);

  const handleClickItem = (ev: React.SyntheticEvent) => {
    setCollapsed(!collapsed);
    if (onClickMenu) {
      onClickMenu(ev, menu);
    }
  };
  /* console.log('parent title is====', menu.title); */
  const endIcon = React.useMemo(() => {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 'calc(50% - 1.2rem)',
          width: '1.6rem',
          height: '2.4rem',
          right: '1.6rem',
        }}
        component={collapsed ? ExpandLess : ExpandMore}
      />
    );
  }, [collapsed]);

  return (
    <NavMenuItem
      indent={indent}
      menu={menu}
      active={active}
      onClick={handleClickItem}
      endIcon={endIcon}
    >
      <Collapse sx={{ width: '100%' }} in={collapsed}>
        <NavMenuList
          indent={indent + indentSize}
          indentSize={indentSize}
          currentPath={currentPath}
          menus={menu.children || []}
          onClickMenu={onClickMenu}
        />
      </Collapse>
      {children}
    </NavMenuItem>
  );
};

type NavMenuListProps = NavMenuProps & {
  indent: number;
};

const NavMenuList = (props: NavMenuListProps) => {
  const { menus, indent, indentSize, currentPath, onClickMenu } = props;

  if (!menus || !menus.length) {
    return null;
  }
  // console.log('----', currentPath);

  return (
    <List
      sx={{
        width: '100%',
        padding: 0,
        userSelect: 'none',
      }}
    >
      {menus.map((item: MenuNodeConfig, index: number) => {
        const { children } = item;
        if (children && children.length) {
          return (
            <NavMenuParent
              key={item.key || item.path || index}
              indent={indent}
              indentSize={indentSize}
              menu={item}
              currentPath={currentPath}
              onClickMenu={onClickMenu}
            />
          );
        }
        return (
          <NavMenuLeaf
            key={index}
            indent={indent}
            menu={item}
            currentPath={currentPath}
            onClick={onClickMenu}
          />
        );
      })}
    </List>
  );
};

type NavMenuProps = {
  menus: MenuConfig;
  indentSize: number;
  currentPath?: string;
  onClickMenu?: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
};

const NavMenu = (props: NavMenuProps) => {
  const { menus, indentSize, currentPath, onClickMenu } = props;

  // console.log('----', currentPath);

  return (
    <nav>
      <NavMenuList
        menus={menus}
        indent={16}
        indentSize={indentSize}
        currentPath={currentPath}
        onClickMenu={onClickMenu}
      />
    </nav>
  );
};

export default NavMenu;

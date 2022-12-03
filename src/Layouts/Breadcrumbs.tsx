import * as React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import { locationContainPath } from '../SideBar/NavMenu';
import type { RouteNodeConfig, RouteConfig } from '../Contexts/RouteConfigContext';

interface BreadcrumbsItem {
  title: string;
  link?: string;
}

function findRoutesByLocation(
  routes: RouteConfig,
  location: string,
  parent?: string
): RouteNodeConfig[] {
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];

    if (route.index) {
      // if parent === location return
      // else continue
      if (parent && parent === location) {
        return [route];
      } else {
        continue;
      }
    }

    if (route.path) {
      // has path
      // if matched this, return
      // else continue
      const matched = locationContainPath(location, route.path);
      console.log('location:', location, 'path:', route.path, 'matched:', matched);
      if (!matched) {
        continue;
      }

      if (!route.children) {
        return [route];
      }

      const matchChildren = findRoutesByLocation(route.children, location, route.path);
      console.log('matchChildren:', matchChildren);
      return [route, ...matchChildren];
    }

    // no route.path,
    // match children
    //    if matched chilren, return
    //    else continue
    if (route.children) {
      const matchedChildren = findRoutesByLocation(route.children, location, parent);
      if (matchedChildren && matchedChildren.length) {
        return [route, ...matchedChildren];
      }
    }

    continue;
  }

  return [] as RouteNodeConfig[];
}

function matchPath(routes: RouteConfig, location: string) {
  const matches = findRoutesByLocation(routes, location, '');

  if (matches.length == 0) {
    return [] as BreadcrumbsItem[];
  }

  const last = matches[matches.length - 1];
  if (!last.index && last.path !== location) {
    return [] as BreadcrumbsItem[];
  }

  return matches.reduce((all, r) => {
    if (!r.title) {
      return all;
    }

    const item: BreadcrumbsItem = { title: r.title };
    if (!r.noLink) {
      item.link = r.path;
    }
    return [...all, item];
  }, [] as BreadcrumbsItem[]);
}

export interface RouteBreadcrumbsProps {
  routes: RouteConfig;
  currentPath?: string;
  setCurrentPath: (to: string) => void;
}

function RouteBreadcrumbs(props: RouteBreadcrumbsProps) {
  const { currentPath, setCurrentPath, routes } = props;

  if (!currentPath) {
    return null;
  }

  const matches = matchPath(routes, currentPath);
  console.log('matches is:', matches, routes, currentPath);
  const handleClickLink = (ev: React.SyntheticEvent, item: BreadcrumbsItem) => {
    ev.preventDefault();
    if (item.link) {
      setCurrentPath(item.link);
    }
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        pt: 0.5,
        fontSize: '1.4rem',
        lineHeight: '3.2rem',
      }}
    >
      {matches.map((item: BreadcrumbsItem, index: number) => {
        const isLast = index + 1 === matches.length;
        const color = isLast ? 'text.primary' : 'inherit';
        const underline = !item.link || isLast ? 'none' : 'always';
        return (
          <Link
            key={index}
            component="span"
            color={color}
            underline={underline}
            onClick={(ev) => handleClickLink(ev, item)}
          >
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default RouteBreadcrumbs;

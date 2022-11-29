import { useMemo, useState, useEffect, useContext, createContext, ReactNode } from 'react';

export interface PermissionContextType {
  checkPermission: (perm: string | string[]) => boolean;
}

const PermissionContext = createContext<PermissionContextType>({
  checkPermission: () => false,
});

export const usePermissionContext = () => useContext(PermissionContext);

export type PermissionoritiesType = Record<string, string[]>;

// 1. 检查模块为空，就不需要授权，因此直接返回true
// 2. 如果我的权限为空，那么只要检查，就返回false
function checkPermItem(myPerms: PermissionoritiesType, module: string, needPerms: string[]) {
  if (!module) {
    return true;
  }

  if (!myPerms) {
    return false;
  }

  const modPrivs = myPerms[module];
  if (!modPrivs || !modPrivs.length) {
    return false;
  }

  // all perms
  if (modPrivs.indexOf('*') >= 0) {
    return true;
  }

  return needPerms.every((x) => modPrivs.indexOf(x) >= 0);
}

function checkPermItemString(myPerms: PermissionoritiesType, checks: string) {
  const list = checks.split(' ').filter((x) => !!x && x.trim().length);
  if (!list.length) {
    return true;
  }

  if (list.length === 1) {
    return checkPermItem(myPerms, list[0], ['view']);
  }

  return checkPermItem(myPerms, list[0], list.slice(1));
}

function checkPermString(myPerms: PermissionoritiesType, checks: string) {
  const orList = checks.split('|');
  // console.log('orList is====', orList);
  return orList.some((it) => checkPermItemString(myPerms, it));
}

// checks: item 或者[item]
// item:
// "module" = { module : ["view"]}
// "module a b c " =module: ["a", "b", "c"]
// "moduleA|moduleB" = oneOf({modueA: ["view"]}, {moduleB: ["view"]})
function checkPermFunc(myPerms: PermissionoritiesType, checks: string | string[]): boolean {
  // console.log('check:', checks, myPerms);

  if (typeof checks === 'string') {
    return checkPermString(myPerms, checks);
  }
  if (Array.isArray(checks)) {
    return checks.every((item) => checkPermFunc(myPerms, item));
  }

  // 参数错误
  return false;
}

export interface PermissionProviderProps {
  children?: ReactNode;
  permissions:
    | PermissionoritiesType
    | (() => PermissionoritiesType)
    | (() => Promise<PermissionoritiesType>);
}

// 1. 检查登陆情况
// 2. 提供检查权限检查方法，PermissionContext
export const PermissionProvider = (props: PermissionProviderProps) => {
  const { children, permissions } = props;
  const [permissionoritiesValue, setPermissionoritiesValue] = useState<PermissionoritiesType>({});

  useEffect(() => {
    if (typeof permissions === 'function') {
      const getter = async () => {
        const value = await permissions();
        setPermissionoritiesValue(value);
      };
      getter();
    } else {
      setPermissionoritiesValue(permissions);
    }
  }, [permissions]);

  const checkPermission = useMemo(() => {
    return (checks: string | string[]) => checkPermFunc(permissionoritiesValue, checks);
  }, [permissionoritiesValue]);

  return (
    <PermissionContext.Provider value={{ checkPermission }}>{children}</PermissionContext.Provider>
  );
};

export default PermissionContext;

export const usePermission = () => false;

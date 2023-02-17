import { SyntheticEvent, useMemo, useReducer, ReactNode } from 'react';
import { Box } from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  NavigateNextOutlined as NavigateNextOutlinedIcon,
} from '@mui/icons-material';
import { TreeExpandState, ProTableTreeProps, TreeInfoType } from './types';

enum TreeExpandActionKind {
  TOGGLE_ONE = 'toggle',
  TOGGLE_ALL = 'toggle_all',
}

type TreeDataType<DataType> = TreeInfoType & {
  data: DataType;
};

type TreeExpandAction =
  | {
      type: TreeExpandActionKind.TOGGLE_ONE;
      payload: string;
    }
  | {
      type: TreeExpandActionKind.TOGGLE_ALL;
      payload: boolean;
    };

const treeReducer = (state: TreeExpandState, action: TreeExpandAction) => {
  switch (action.type) {
    case TreeExpandActionKind.TOGGLE_ONE:
      const id = action.payload;
      if (state.excepts.indexOf(id) >= 0) {
        return {
          ...state,
          excepts: state.excepts.filter((x) => x !== id),
        };
      }

      return {
        ...state,
        excepts: [...state.excepts, id],
      };

    case TreeExpandActionKind.TOGGLE_ALL:
      return {
        expand: action.payload,
        excepts: [],
      };
  }
};

function flatTreeData<T>(
  data: T[],
  getId: (d: T) => string | undefined,
  getChildren: (d: T) => T[] | undefined,
  parent?: string[]
): TreeDataType<T>[] {
  // reduce:
  return data.reduce((all: TreeDataType<T>[], d: T) => {
    const id = getId(d);
    if (!id) {
      return all;
    }

    const theParent = parent || [];
    const node: TreeDataType<T> = {
      level: theParent.length,
      parent: theParent,
      id,
      data: d,
      hasChildren: false,
    };

    const children = getChildren(d);
    if (!children) {
      return [...all, node];
    }

    node.hasChildren = true;

    const nextParent = [...theParent, id];

    return [...all, node, ...flatTreeData(children, getId, getChildren, nextParent)];
  }, [] as TreeDataType<T>[]);
}

const defaultExpandState: TreeExpandState = { expand: false, excepts: [] };

function defaultGetId(d: any) {
  return d.id;
}

function defaultGetChildren(d: any) {
  return d.children;
}

const getNodeExpandStatus = (nodeId: string, expandState: TreeExpandState) => {
  // expanded
  if (expandState.expand) {
    return expandState.excepts.indexOf(nodeId) >= 0;
  }

  // else: folded
  return expandState.excepts.indexOf(nodeId) < 0;
};

export const useTreeProps = <DataType extends {}>(
  data: DataType[],
  treeIndexField: string,
  options?: {
    getId?: (d: DataType) => string;
    getChildren?: (d: DataType) => DataType[] | undefined;
    expandIcon?: ReactNode;
    foldIcon?: ReactNode;
    leafIcon?: ReactNode;
    indent?: number;
    initialExpandState?: TreeExpandState;
  }
) => {
  const {
    initialExpandState = defaultExpandState,
    getId = defaultGetId,
    getChildren = defaultGetChildren,
  } = options || {};

  const treeData = useMemo(() => {
    return flatTreeData(data, getId, getChildren);
  }, [data, getId, getChildren]);

  const [expandState, dispatch] = useReducer(treeReducer, initialExpandState);

  const onToggleOne = (ev: SyntheticEvent, id: string) => {
    ev.preventDefault();
    dispatch({ type: TreeExpandActionKind.TOGGLE_ONE, payload: id });
  };
  const onToggleAll = (ev: SyntheticEvent, expand: boolean) => {
    ev.preventDefault();
    dispatch({ type: TreeExpandActionKind.TOGGLE_ALL, payload: expand });
  };

  const [finalData, nodes] = useMemo(() => {
    const finalTree = treeData.filter((x) => {
      if (x.level === 0) {
        return true;
      }

      for (let i = 0; i < x.parent.length; i += 1) {
        const p = x.parent[i];
        if (!getNodeExpandStatus(p, expandState)) {
          return false;
        }
      }

      return true;
    });

    const treeNodes = finalTree.reduce((all, { data, ...x }) => {
      x.expanded = getNodeExpandStatus(x.id, expandState);
      return { ...all, [x.id]: x };
    }, {});

    return [finalTree.map((x) => x.data), treeNodes];
  }, [treeData, expandState]);

  return [
    finalData,
    {
      treeIndexField,
      nodes,
      onToggleOne,
      onToggleAll,
      expandIcon: options?.expandIcon || (
        <NavigateNextOutlinedIcon
          fontSize="small"
          sx={{ transform: 'rotate(90deg)', transition: 'transform 0.1s ease' }}
        />
      ),
      foldIcon: options?.expandIcon || (
        <NavigateNextOutlinedIcon
          fontSize="small"
          sx={{ transform: 'rotate(0deg)', transition: 'transform 0.1s ease' }}
        />
      ),
      leafIcon: options?.leafIcon || (
        <NavigateNextOutlinedIcon fontSize="small" sx={{ visibility: 'hidden' }} />
      ),
      indent: options?.indent || 1,
      expandState,
      getId,
    },
  ] as [DataType[], ProTableTreeProps];
};

export default useTreeProps;

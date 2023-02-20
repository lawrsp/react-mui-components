import { SyntheticEvent, useMemo, useReducer, ReactNode } from 'react';
import { Box } from '@mui/material';
import { NavigateNextOutlined as NavigateNextOutlinedIcon } from '@mui/icons-material';
import {
  TreeExpandState,
  ProTableTreeProps,
  TreeInfoType,
  ProTableTreeInfo,
  TreeNodeRender,
} from './types';

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

function flatData<T>(
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
      id,
      parent: theParent,
      hasChildren: false,
      expanded: true,
      data: d,
    };

    const children = getChildren(d);
    if (!children) {
      return [...all, node];
    }

    node.hasChildren = true;

    const nextParent = [...theParent, id];

    return [...all, node, ...flatData(children, getId, getChildren, nextParent)];
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

export interface GetDefaultTreeNodeRenderParams {
  expandIcon?: ReactNode;
  foldIcon?: ReactNode;
  leafIcon?: ReactNode;
  indent?: ReactNode;
}

export const getDefaultTreeNodeRenderer =
  <T extends {}>({
    expandIcon = (
      <NavigateNextOutlinedIcon
        fontSize="small"
        sx={{ transform: 'rotate(90deg)', transition: 'transform 0.1s ease' }}
      />
    ),
    foldIcon = (
      <NavigateNextOutlinedIcon
        fontSize="small"
        sx={{ transform: 'rotate(0deg)', transition: 'transform 0.1s ease' }}
      />
    ),
    leafIcon = <NavigateNextOutlinedIcon fontSize="small" sx={{ visibility: 'hidden' }} />,
    indent = 1,
  }: GetDefaultTreeNodeRenderParams) =>
  (treeInfo: ProTableTreeInfo) =>
  (data: T, tableNode?: ReactNode) => {
    const id = treeInfo.nodeIdGetter(data);
    const node = treeInfo.nodes[id];

    let indentNode: ReactNode;
    if (typeof indent === 'number') {
      indentNode = <Box sx={{ width: `${indent * node.level}em`, height: '0.5em' }} />;
    } else {
      indentNode = <Box>{new Array(node.level).fill(indent)}</Box>;
    }

    let iconNode: ReactNode;
    let onClick: ((ev: SyntheticEvent) => void) | undefined;

    if (node.hasChildren) {
      if (node.expanded) {
        iconNode = expandIcon;
        onClick = (ev: SyntheticEvent) => treeInfo.onToggleOne(ev, id);
      } else {
        iconNode = foldIcon;
        onClick = (ev: SyntheticEvent) => treeInfo.onToggleOne(ev, id);
      }
    } else {
      iconNode = leafIcon;
    }

    return (
      <Box component="span" sx={{ display: 'inline-flex' }} onClick={onClick}>
        {indentNode}
        {iconNode}
        {tableNode}
      </Box>
    );
  };

const defaultTreeNodeRenderer = getDefaultTreeNodeRenderer({});

export const useTreeProps = <DataType extends {}>(
  data: DataType[],
  treeIndexField: string,
  options?: {
    nodeIdGetter?: (d: DataType) => string;
    childrenGetter?: (d: DataType) => DataType[] | undefined;
    renderer?: (treeInfo: ProTableTreeInfo) => TreeNodeRender<DataType>;
    initialExpandState?: TreeExpandState;
  }
) => {
  const {
    initialExpandState = defaultExpandState,
    nodeIdGetter = defaultGetId,
    childrenGetter = defaultGetChildren,
    renderer = defaultTreeNodeRenderer,
  } = options || {};

  const flatedData = useMemo(() => {
    return flatData(data, nodeIdGetter, childrenGetter);
  }, [data, nodeIdGetter, childrenGetter]);

  const [expandState, dispatch] = useReducer(treeReducer, initialExpandState);

  const onToggleOne = (ev: SyntheticEvent, id: string) => {
    ev.preventDefault();
    dispatch({ type: TreeExpandActionKind.TOGGLE_ONE, payload: id });
  };
  const onToggleAll = (ev: SyntheticEvent, expand: boolean) => {
    ev.preventDefault();
    dispatch({ type: TreeExpandActionKind.TOGGLE_ALL, payload: expand });
  };

  const { treeData, treeNodes } = useMemo(() => {
    const finalTree = flatedData.filter((x) => {
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

    return { treeData: finalTree.map((x) => x.data), treeNodes };
  }, [flatedData, expandState]);

  const treeNodeRender = renderer({
    nodeIdGetter,
    nodes: treeNodes,
    onToggleOne,
    onToggleAll,
  });

  const treeProps: ProTableTreeProps<DataType> = {
    treeIndexField,
    treeNodeRender,
    expandState,
  };

  return [treeData, treeProps] as [DataType[], ProTableTreeProps<DataType>];
};

export default useTreeProps;

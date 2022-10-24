import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/AddBoxOutlined';
import ExpandLessIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';

import { useLatestFunc } from 'utils/useLatest';

const useGetChildren = (fn) => {
  const ref = React.useRef();
  ref.current = fn;

  return React.useCallback(
    (rowData, ...params) => {
      if (typeof ref.current === 'function') {
        return ref.current(rowData, ...params);
      }
      if (typeof ref.current === 'string') {
        return rowData[ref.current];
      }

      return;
    },
    [ref]
  );
};

const iconSize = '2.0rem';

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    marginRight: '0.8rem',
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
    },
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
}));

export default function useTreeProps(treeProps) {
  const classes = useStyles();
  const [treeExpandAll] = React.useState(
    (treeProps && treeProps.defaultExpandAll) || false
  );
  const [treeExpanded, setTreeExpanded] = React.useState(
    (treeProps && treeProps.detaultExpanded) || {}
  );
  const [treeClosed, setTreeClosed] = React.useState(
    (treeProps && treeProps.defaultUnexpanded) || {}
  );

  // 正常情况，记录展开的 treeExpanded
  // expandAll 的情况下，记录关闭的 treeClosed

  const isTree = !!treeProps;

  const getChildren = useGetChildren(treeProps.children || 'children');
  const onChangeExpand = useLatestFunc(treeProps.onChangeExpand, true);

  const treeNodeExpanded = React.useCallback(
    (rowKey, row) => {
      const key = row[rowKey];

      if (treeExpandAll) {
        return !treeClosed[key];
      }

      return !!treeExpanded[key];
    },
    [treeExpandAll, treeExpanded, treeClosed]
  );

  const changeExpanded = React.useCallback(
    (rowKey, row, next) => {
      const key = row[rowKey];

      if (treeExpandAll) {
        if (next) {
          const { [key]: _, ...rest } = treeClosed;
          setTreeClosed(rest);
        }
        if (!next) {
          setTreeClosed({
            ...treeClosed,
            [key]: true,
          });
        }
        return;
      }

      if (next) {
        setTreeExpanded({
          ...treeExpanded,
          [key]: true,
        });
      } else {
        const { [key]: _, ...rest } = treeExpanded;
        setTreeExpanded(rest);
      }
    },
    [treeExpandAll, treeExpanded, treeClosed]
  );

  const { indentSize = 32 } = treeProps;
  const treeNodePrefix = React.useCallback(
    (rowKey, row, rowIndex, level) => {
      // console.log('========================================');
      const style = { paddingLeft: indentSize * level };

      const children = getChildren(row, rowIndex, level);
      if (!children || !children.length) {
        return (
          <div className={classes.iconWrapper} style={style}>
            <span className={classes.icon} />
          </div>
        );
      }

      const handleChangeExpand = (event, val) => {
        onChangeExpand(event, row, val);
        changeExpanded(rowKey, row, val);
      };

      if (treeNodeExpanded(rowKey, row)) {
        return (
          <div
            className={classes.iconWrapper}
            style={style}
            onClick={(ev) => handleChangeExpand(ev, false)}
          >
            <ExpandLessIcon className={classes.icon} />
          </div>
        );
      }

      return (
        <div
          className={classes.iconWrapper}
          style={style}
          onClick={(ev) => handleChangeExpand(ev, true)}
        >
          <ExpandMoreIcon className={classes.icon} />
        </div>
      );
    },
    [getChildren, changeExpanded, treeNodeExpanded, onChangeExpand, indentSize, classes]
  );

  if (!isTree) {
    return [];
  }

  return [getChildren, treeNodeExpanded, treeNodePrefix];
}

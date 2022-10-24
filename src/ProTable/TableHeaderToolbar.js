import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from 'components/CustomContainers/Divider';
import TableTools from './TableTools';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '3.2rem',
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: 'center',
  },
  divider: {
    marginLeft: '0.4rem',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    flexGrow: 1,
  },
  toolbar: {
    fontWeight: 'bold',
  },
  actions: {
    '& button + button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const TableHeaderToolbar = (props) => {
  const classes = useStyles(props);
  const { title, defaults, children, hidden, className } = props;
  if (hidden) {
    return false;
  }

  const hasDefualtTools = !!defaults;
  // const hasChildren = !!children;
  // {hasDefualtTools && hasChildren && (
  //   <Divider orientation="vertical" classes={{ root: classes.divider }} />
  // )}

  return (
    <div className={clsx(classes.root, className)}>
      {title && <div className={classes.title}>{title}</div>}
      {!!children && <div className={classes.toolbar}>{children}</div>}
      {!!children && hasDefualtTools && (
        <Divider orientation="vertical" classes={{ root: classes.divider }} />
      )}
      {hasDefualtTools && (
        <div className={classes.actions}>
          <TableTools tools={defaults} />
        </div>
      )}
    </div>
  );
};

export default TableHeaderToolbar;

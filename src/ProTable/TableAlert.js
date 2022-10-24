import React from 'react';
import clsx from 'clsx';
import { makeStyles, lighten } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.info.main,
          backgroundColor: lighten(theme.palette.info.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.info.dark,
        },
  title: {
    display: 'inline-flex',
    alignItems: 'center',
    flex: '1 0 auto',
  },
  icon: {
    width: '2.4rem',
    height: '2.4rem',
    marginRight: theme.spacing(1),
  },
}));

const ProTableAlert = (props) => {
  const classes = useStyles();
  const { message, children } = props;
  console.log('==== message: ', message);
  console.log('=== children:', children);

  return (
    <div className={clsx(classes.root, classes.highlight)}>
      <Typography
        className={classes.title}
        color="inherit"
        variant="subtitle1"
        component="span"
      >
        <InfoIcon className={classes.icon} /> {message}
      </Typography>
      <span>{children}</span>
    </div>
  );
};

export default ProTableAlert;

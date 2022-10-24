import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TableAlert from './TableAlert';

// const useStyles = makeStyles((theme) => ({}));
// const classes = useStyles();

const ProTableSelectionAlert = (props) => {
  const { selectedRowsCount, message, onClearSelected, className } = props;
  if (!selectedRowsCount) {
    return false;
  }
  const msg = message || (
    <div>
      已选择{' '}
      <span
        style={{
          fontWeight: 600,
        }}
      >
        {selectedRowsCount}
      </span>{' '}
      项&nbsp;&nbsp;
    </div>
  );

  return (
    <TableAlert message={msg} className={className}>
      <Button aria-label="clear" variant="text" color="inherit" onClick={onClearSelected}>
        清空
      </Button>
    </TableAlert>
  );
};

export default ProTableSelectionAlert;

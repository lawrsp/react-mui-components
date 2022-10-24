import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

const ToolSearch = (props) => {
  const { searched, show, onClick } = props;

  const color = show ? 'primary' : undefined;

  return (
    <IconButton size="small" color={color} onClick={onClick}>
      <Badge color="primary" variant="dot" overlap="circle" invisible={!searched}>
        <SearchIcon />
      </Badge>
    </IconButton>
  );
};

const TableTools = (props) => {
  const { tools } = props;
  if (!tools) {
    return false;
  }

  return (
    <>
      {!!tools.reload && (
        <IconButton size="small" {...tools.reload}>
          <RefreshIcon />
        </IconButton>
      )}
      {!!tools.search && <ToolSearch {...tools.search} />}
      {!!tools.close && (
        <IconButton size="small" {...tools.close}>
          <CloseIcon />
        </IconButton>
      )}
    </>
  );
};

export default TableTools;

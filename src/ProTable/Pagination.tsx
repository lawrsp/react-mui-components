import React, { ReactNode, ElementType, Ref, ChangeEvent } from 'react';
import {
  Box,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  type PaginationProps,
  type SelectChangeEvent,
} from '@mui/material';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { SxProps, Theme } from '@mui/material/styles';
import { ProTablePaginationActions, ProTablePaginationType } from './types';

const DefaultShowTotal = (props: { total: number; currentPage: number; rowsPerPage: number }) => {
  const { total, currentPage, rowsPerPage } = props;
  console.log('-======------------------------total:', total);

  let last = currentPage * rowsPerPage;
  const first = last - rowsPerPage + 1;
  if (last > total) {
    last = total;
  }

  // console.log('currentPage:', currentPage, 'rowsPerPage:', rowsPerPage);
  const totalText = `总共 ${total} 条`;
  if (total === 0) {
    return <span>{totalText}</span>;
  }

  const text = `第 ${first}-${last} 条/${totalText}`;
  return <span>{text}</span>;
};

interface ProTablePaginationTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & {
    children?: ReactNode;
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component?: ElementType;
    ref?: Ref<unknown>;

    TotalLabel?: ElementType<{ total: number; currentPage: number; rowsPerPage: number }>;

    total: number;
    loading?: boolean;
    size?: PaginationProps['size'];
    variant?: PaginationProps['variant'];
    disabled?: boolean;
    state: ProTablePaginationType;
    actions?: ProTablePaginationActions;

    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };

  defaultComponent: D;
}

export type ProTablePaginationProps<
  D extends React.ElementType = ProTablePaginationTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ProTablePaginationTypeMap<P, D>, D>;

const CustomTablePagination = (props: ProTablePaginationProps) => {
  const {
    TotalLabel = DefaultShowTotal,
    //pagination type/actions
    state,
    actions,

    //
    loading = false,
    sx,
    // pagination component
    size = 'small',
    total = 0,
    variant,
    disabled,
    //
    children,
    // componet
    component,
    ...rest
  } = props;

  const { currentPage, rowsPerPage, rowsPerPageOptions } = state;
  const pageCount = Math.ceil(total / rowsPerPage);

  const handleChangePage = (_: ChangeEvent<unknown>, toPage: number) => {
    console.log('onChangePage:', currentPage);
    if (toPage === currentPage) {
      return;
    }

    actions?.setCurrentPage?.(toPage);
  };

  const handleChangeRowsPerPage = async (ev: SelectChangeEvent<number>) => {
    console.log('onChange rows perpage');
    let val: number;
    const value = ev.target.value;
    if (typeof value === 'number') {
      val = value;
    } else {
      val = parseInt(value);
    }

    // calc page:

    if (val === rowsPerPage) {
      return;
    }

    actions?.setRowsPerPage?.(val);
  };

  const [showLoading, setShowLoading] = React.useState(loading);

  // async set showLoading
  React.useEffect(() => {
    if (loading) {
      setShowLoading(true);
      return () => {};
    }

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <Box
      sx={[
        {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          pr: 4,
          pt: 0.8,
          pb: 0.5,
          '&> [class*=MuiCircularProgress-root]': {
            color: 'text.secondary',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component={component}
      {...rest}
    >
      <CircularProgress
        size={18}
        sx={{
          mr: 1,
          display: showLoading ? 'block' : 'none',
        }}
      />
      {children}
      <Box
        sx={{
          display: showLoading ? 'block' : 'none',
        }}
        component={TotalLabel}
        total={total}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
      <Pagination
        sx={
          showLoading
            ? {
                display: 'none',
              }
            : {}
        }
        size={size}
        count={pageCount}
        page={currentPage}
        variant={variant}
        disabled={disabled}
        onChange={handleChangePage}
      />
      <Select
        sx={{
          fontSize: '14px',
        }}
        value={rowsPerPage}
        variant="standard"
        onChange={handleChangeRowsPerPage}
        disableUnderline
      >
        {rowsPerPageOptions.map((val, index) => (
          <MenuItem key={index} value={val}>
            {val} 条/页
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CustomTablePagination as OverridableComponent<ProTablePaginationTypeMap>;

import * as React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { ProTableColumnDefType, ProTableSorterOrder, ProTableSortersType } from './types';

const getCurrentSorter = (sorters: ProTableSortersType, field: string) => {
  for (let i = 0; i < sorters.length; i += 1) {
    if (sorters[i].field === field) {
      return sorters[i].order;
    }
  }
  return undefined;
};

// nextOrder的顺序： 未激活、asc、desc
const getNextOrder = (now: ProTableSorterOrder | undefined) => {
  if (!now) {
    return 'asc';
  }
  if (now === 'asc') {
    return 'desc';
  }

  return undefined;
};

export interface ProTableHeaderCellProps<DataType> {
  column: ProTableColumnDefType<DataType>;
  sx?: SxProps<Theme>;
  sorters?: ProTableSortersType;
  onSort?: (field: string, order?: ProTableSorterOrder) => void | Promise<void>;
}

// headerItem = {title, field, sortable, headerRender, headerStyle, align, width }
// sortable: { onSort }
const ProTableHeaderCell: <DataType>(props: ProTableHeaderCellProps<DataType>) => JSX.Element = (
  props
) => {
  const { column, sx, sorters = [], onSort = () => {} } = props;

  const cell = React.useMemo(() => {
    const { header, sortable, field } = column;

    // TODO: 排序标志做的更附和中文环境一些
    const {} = column;
    if (sortable) {
      // 3个状态： 无排序、升序、降序
      const currentOrder = getCurrentSorter(sorters, field);
      const nextOrder = getNextOrder(currentOrder);
      return (
        <TableSortLabel
          active={!!currentOrder}
          direction={currentOrder}
          onClick={async () => await onSort(column.field, nextOrder)}
        >
          {header}
        </TableSortLabel>
      );
    }

    return header;
  }, [column, onSort, sorters]);

  const { field, align, width, padding } = column;

  return (
    <TableCell
      sx={[{ pt: 0.5, pb: 1, color: 'text.secondary' }, ...(Array.isArray(sx) ? sx : [sx])]}
      key={field}
      align={align}
      width={width}
      padding={padding}
    >
      {cell}
    </TableCell>
  );
};

export interface ProTableHeaderProps<DataType> {
  columns: ProTableColumnDefType<DataType>[];
  sorters?: ProTableSortersType;
  onSort?: (field: string, order?: ProTableSorterOrder) => void | Promise<void>;
  sx?: SxProps<Theme>;
}

// columns = [headerItem]
// rowSelection = { onSelectAllClick, onSelectRowClick }
const ProTableHeder: <DataType>(props: ProTableHeaderProps<DataType>) => JSX.Element = (props) => {
  const { columns, sorters, onSort, sx } = props;

  return (
    <TableHead sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <TableRow>
        {columns.map((column, index) => (
          <ProTableHeaderCell
            key={column.field || index}
            sx={{
              fontSize: '1.4rem',
              color: 'text.hint',
            }}
            column={column}
            sorters={sorters}
            onSort={onSort}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ProTableHeder;

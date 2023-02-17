import { ReactNode, SyntheticEvent } from 'react';
import { TableBody, TableRow, TableCell, Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { type ProTableTreeProps, type ProTableColumnDefType } from './types';

export interface ProTableBodyRowProps<DataType> {
  columns: ProTableColumnDefType<DataType>[];
  rowData: DataType;
  rowIndex: number;
  treeProps?: ProTableTreeProps;
}

/* renderRowCell?: (record: DataType, index: number) => ReactNode;
 * valueFormatter?: (record: DataType, index: number) => string;
 * valueGetter?: (record: DataType, index: number) => string;
 *  */

const getTreeNodePrefix = <T extends {}>(data: T, treeProps: ProTableTreeProps) => {
  const id = treeProps.getId(data);
  const treeInfo = treeProps.nodes[id];

  let indent: ReactNode;

  const tpi = treeProps.indent;

  if (typeof tpi === 'number') {
    indent = <Box sx={{ width: `${tpi * treeInfo.level}em`, height: '0.5em' }} />;
  } else {
    indent = <Box>{new Array(treeInfo.level).fill(tpi)}</Box>;
    console.log(
      '========================',
      new Array(treeInfo.level).map(() => tpi)
    );
  }

  let icon: ReactNode;
  let onClick: ((ev: SyntheticEvent) => void) | undefined;

  if (treeInfo.hasChildren) {
    if (treeInfo.expanded) {
      icon = treeProps.expandIcon;
      onClick = (ev: SyntheticEvent) => treeProps.onToggleOne(ev, id);
    } else {
      icon = treeProps.foldIcon;
      onClick = (ev: SyntheticEvent) => treeProps.onToggleOne(ev, id);
    }
  } else {
    icon = treeProps.leafIcon;
  }

  return (
    <Box component="span" sx={{ display: 'inline-flex' }} onClick={onClick}>
      {indent}
      {icon}
    </Box>
  );
};

const ProTableBodyRow = <DataType extends object>(props: ProTableBodyRowProps<DataType>) => {
  const { columns, rowData, rowIndex, treeProps } = props;

  return (
    <TableRow hover>
      {columns.map((col, colIndex) => {
        let value: ReactNode;
        if (col.renderRowCell) {
          value = col.renderRowCell(rowData, rowIndex);
        } else if (col.valueFormatter) {
          value = col.valueFormatter(rowData, rowIndex);
        } else if (col.valueGetter) {
          value = col.valueGetter(rowData, rowIndex);
        } else {
          value = (rowData as any)?.[col.field];
        }
        const { align, padding, rowCellSx, rowCellSxGetter } = col;

        let computedSx = rowCellSxGetter?.(rowData, rowIndex);
        // TODO: tree cell
        let prefix = null;
        if (treeProps && col.field === treeProps.treeIndexField) {
          // indent
          // icon
          prefix = getTreeNodePrefix(rowData, treeProps);
        }

        return (
          <TableCell
            key={colIndex}
            align={align}
            padding={padding}
            sx={[
              { '& > div': { display: 'inline-flex' } },
              ...(Array.isArray(rowCellSx) ? rowCellSx : [rowCellSx]),
              ...(Array.isArray(computedSx) ? computedSx : [computedSx]),
            ]}
          >
            <div>
              {prefix}
              {value}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export type ProTableBodyProps<DataType> = {
  placeholder?: ReactNode;
  sx?: SxProps<Theme>;
  data: DataType[];
  treeProps?: ProTableTreeProps;
  getRowKey?: (rowData: DataType, rowIndex: number) => string;
} & Pick<ProTableBodyRowProps<DataType>, 'columns'>;

const defaultGetRowKey = (data: any, index: number) => {
  return data.id || `${index}`;
};

// bodys = [bodyItem]
// rowSelection = { onSelectAllClick, onSelectRowClick }
// selectedRows
const ProTableBody = <DataType extends object>(props: ProTableBodyProps<DataType>) => {
  const { data = [], columns, placeholder, sx, treeProps, getRowKey = defaultGetRowKey } = props;

  // console.log('========body rerend');
  return (
    <TableBody sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {placeholder && !data.length ? (
        <TableRow hover>
          <TableCell colSpan={columns.length + 1} align="center">
            {placeholder}
          </TableCell>
        </TableRow>
      ) : (
        data.map((rowData, rowIndex) => {
          const key = getRowKey(rowData, rowIndex);
          return (
            <ProTableBodyRow
              key={key}
              columns={columns}
              rowData={rowData}
              rowIndex={rowIndex}
              treeProps={treeProps}
            />
          );
        })
      )}
    </TableBody>
  );
};

export default ProTableBody;

import { ReactNode } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { type ProTableTreeProps, type ProTableColumnDefType } from './types';

export interface ProTableBodyRowProps<DataType> {
  columns: ProTableColumnDefType<DataType>[];
  rowData: DataType;
  rowIndex: number;
  treeProps?: ProTableTreeProps<DataType>;
}

/* renderRowCell?: (record: DataType, index: number) => ReactNode;
 * valueFormatter?: (record: DataType, index: number) => string;
 * valueGetter?: (record: DataType, index: number) => string;
 *  */

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
          value = (rowData as any)?.[col.field] || null;
        }
        const { align, padding, rowCellSx, rowCellSxGetter } = col;

        let computedSx = rowCellSxGetter?.(rowData, rowIndex);
        // tree node cell
        if (treeProps && col.field === treeProps.treeIndexField) {
          const { treeNodeRender } = treeProps;
          value = treeNodeRender(rowData, value);
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
            {value}
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
  treeProps?: ProTableTreeProps<DataType>;
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

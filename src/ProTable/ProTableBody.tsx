import { ReactNode } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { type ProTableColumnDefType } from './types';

export interface ProTableBodyRowProps<DataType> {
  columns: ProTableColumnDefType<DataType>[];
  rowData: DataType;
  rowIndex: number;
}

/* renderRowCell?: (record: DataType, index: number) => ReactNode;
 * valueFormatter?: (record: DataType, index: number) => string;
 * valueGetter?: (record: DataType, index: number) => string;
 *  */

const ProTableBodyRow = <DataType extends object>(props: ProTableBodyRowProps<DataType>) => {
  const { columns, rowData, rowIndex } = props;

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

        return (
          <TableCell
            key={colIndex}
            align={align}
            padding={padding}
            sx={[
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
} & Pick<ProTableBodyRowProps<DataType>, 'columns'>;

// bodys = [bodyItem]
// rowSelection = { onSelectAllClick, onSelectRowClick }
// selectedRows
const ProTableBody = <DataType extends object>(props: ProTableBodyProps<DataType>) => {
  const { data = [], columns, placeholder, sx } = props;

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
          return (
            <ProTableBodyRow
              key={rowIndex}
              columns={columns}
              rowData={rowData}
              rowIndex={rowIndex}
            />
          );
        })
      )}
    </TableBody>
  );
};

export default ProTableBody;

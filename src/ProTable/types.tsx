import { ReactNode, SyntheticEvent } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { TableCellProps } from '@mui/material';
import { ProTablePaginationProps } from './Pagination';

export type ProTableSorterOrder = 'desc' | 'asc';

interface ProTableSorterItemType {
  field: string;
  order: ProTableSorterOrder;
}

export type ProTableSortersType = ProTableSorterItemType[];
export type ProTableSearchesType = Record<string, any>;

export interface ProTablePaginationType {
  rowsPerPageOptions: Array<number>;
  rowsPerPage: number;
  currentPage: number;
}

export interface ProTablePaginationActions {
  setRowsPerPageOptions: (options: Array<number>) => void | Promise<void>;
  setCurrentPage: (page: number) => void | Promise<void>;
  setRowsPerPage: (size: number) => void | Promise<void>;
}

export interface SearchFieldType {
  key?: string;
  field: string;
  label: string;
  type?: string;
}

export interface ProTableStateActionType {
  type: 'success' | 'error';
  payload: Partial<ProTableStateType>;
}

export interface ProTableStateType {
  pagination: ProTablePaginationType;
  sorters: ProTableSortersType;
  searches: ProTableSearchesType;
}

export type ProTableColumnValueType = 'number' | 'string';

export interface ProTableColumnDefType<DataType> {
  field: string;
  header?: string;
  renderHeader?: () => ReactNode;

  sortable?: boolean;

  width?: number | string | undefined;
  align?: TableCellProps['align'];
  padding?: TableCellProps['padding'];

  type?: ProTableColumnValueType;

  /* 顺序：
   * 1. renderCell() => ReactNode
   * 2. valueFormatter() => string
   * 3. valueGetter() => string
   * 4. row[field] */
  renderRowCell?: (rowData: DataType, rowIndex: number) => ReactNode;
  valueFormatter?: (rowData: DataType, rowIndex: number) => string;
  valueGetter?: (rowData: DataType, rowIndex: number) => string;

  // style:
  headerSx?: SxProps<Theme>;
  rowCellSx?: SxProps<Theme>;
  rowCellSxGetter?: (rowData: DataType, rowIndex: number) => SxProps<Theme>;
}

export interface TableActionProps<DataType> {
  title: string;
  color?: string;
  show?: boolean | ((data: DataType, index: number) => boolean);
  onClick: (ev: SyntheticEvent, data: DataType, index: number) => void | Promise<void>;
  render?: (rowData: DataType, index: number) => ReactNode;
  sx: SxProps<Theme>;
}

export interface TableTreeProps {}

export interface TableToolConfigProps {}

export interface ProTableSearchState {
  submitting?: boolean;

  invisible?: boolean;

  searches: Record<string, any>;
  searchFields: SearchFieldType[];
}

export interface ProTableSearchActions {
  setSearchFields?: (fields: SearchFieldType[]) => void;
  setInvisible?: (invisible: boolean) => void;
  setSearches?: (searches: Record<string, any>) => void;
}

export interface ProTableAlertProps {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface ProTableChangeParams {
  pagination: ProTablePaginationType;
  sorters: ProTableSortersType;
  searches: ProTableSearchesType;
}

export interface ProTableRequiredProps<DataType extends object> {
  columns: ProTableColumnDefType<DataType>[];
  data: Array<DataType>;
}

export interface ProTableOptionalProps<DataType> {
  // sx
  headerSx: SxProps<Theme>;
  bodySx: SxProps<Theme>;

  onChange: (params: ProTableChangeParams) => void | Promise<void>;

  // row key
  rowKey: string;
  // size

  total: number;

  size: 'small' | 'medium';
  // 标题部分
  title: ReactNode;
  toolbarRender: () => ReactNode;
  toolbarTypeaults: TableToolConfigProps;
  // columns
  actions: TableActionProps<DataType>[];
  rowRender: (rowData: DataType, index: number) => ReactNode;
  treeProps: TableTreeProps;

  // search
  searchFields: SearchFieldType[];
  searches: ProTableSearchesType;

  // sorter
  sorters: ProTableSortersType;

  // 占位符
  placeholder: ReactNode;

  //
  elevation: number;

  // loading
  loading: boolean;
  paginationLoading: boolean;
  children: ReactNode;

  sx: SxProps<Theme>;
}

export type ProTableProps<DataType extends object> = ProTableRequiredProps<DataType> &
  Partial<ProTableOptionalProps<DataType>> & {
    // restriction
    restriction?: Array<number>;
  } & {
    // pagination
    pagination?: {
      state: ProTablePaginationType;
      actions?: ProTablePaginationActions;
    };
  } & {
    search?: {
      state: ProTableSearchState;
      actions?: ProTableSearchActions;
    };
  } & {
    alert?: ProTableAlertProps;
  };

interface ProTableRefHandlers {
  reload: () => void;
  reset: () => void;
}

export type ProTableRefObjectType = Partial<ProTableRefHandlers>;

export interface ProTableTreeProps<DataType> {
  getChildren: (
    data: DataType & { children?: DataType[] }
  ) => (DataType & { children?: DataType[] })[];
  treeNodeExpanded: Function;
  treeNodePrefix: Function;
}

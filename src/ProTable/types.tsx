import { ReactNode, SyntheticEvent, ReactElement } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { TableCellProps, ButtonProps } from '@mui/material';

export type ProTableTitleSearchToolConfig = {
  icon: 'search';
  hasSearches: boolean;
  open: boolean;
  onClick: (ev: SyntheticEvent) => void;
};

export function isProTableSearchToolConfig(
  t: ProTableTitleToolConfig
): t is ProTableTitleSearchToolConfig {
  return typeof t === 'object' && 'icon' in t && t.icon === 'search';
}

export type ProTableTitleToolConfig =
  | string
  | {
      button: string;
      onClick: (ev?: SyntheticEvent) => any | Promise<any>;
      variant?: ButtonProps['variant'];
      color?: ButtonProps['color'];
      startIcon?: ButtonProps['startIcon'];
      endIcon?: ButtonProps['endIcon'];
    }
  | {
      icon: 'reload';
      onClick: (ev?: SyntheticEvent) => any | Promise<any>;
    }
  | {
      icon: 'close';
      onClick: (ev?: SyntheticEvent) => any | Promise<any>;
    }
  | ProTableTitleSearchToolConfig
  | {
      icon: ReactElement;
      onClick: (ev?: SyntheticEvent) => any | Promise<any>;
    }
  | { render: () => ReactNode };

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
  getValueLabel?: (v: any) => string;
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
  valueFormatter?: (rowData: DataType, rowIndex: number) => string | null;
  valueGetter?: (rowData: DataType, rowIndex: number) => string | null;

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

export type TreeExpandState = {
  expand: boolean;
  excepts: string[];
};

export interface TreeInfoType {
  level: number;
  id: string;
  parent: string[];
  hasChildren: boolean;
  expanded: boolean;
}

export interface ProTableTreeInfo {
  nodeIdGetter: (d: any) => string;
  nodes: { [key: string]: TreeInfoType };
  onToggleOne: (ev: SyntheticEvent, id: string) => void;
  onToggleAll: (ev: SyntheticEvent, expand: boolean) => void;
}

export type TreeNodeRender<T> = (data: T, tableNode?: ReactNode) => ReactNode;

export interface ProTableTreeProps<T> {
  treeIndexField: string;
  treeNodeRender: TreeNodeRender<T>;
  expandState: TreeExpandState;
}

export interface TableToolConfigProps {}

export interface ProTableSearchState {
  searchFields: SearchFieldType[];
  searches: Record<string, any>;
  visible: boolean;
}

export interface ProTableSearchActions {
  onSearch: (values: Record<string, any>) => void | Promise<void>;
  onChangeVisible?: (ev: SyntheticEvent, visible: boolean) => void | Promise<void>;
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
  getRowKey?: (rowData: DataType, rowIndex: number) => string;
  // size

  total: number;

  size: 'small' | 'medium';

  // columns
  actions: TableActionProps<DataType>[];
  rowRender: (rowData: DataType, index: number) => ReactNode;
  treeProps: ProTableTreeProps<DataType>;

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

export type SearchFormProps = ProTableSearchState & {
  actions: ProTableSearchActions;
};

export interface SearchTitleProps {
  open: boolean;
  onChangeOpen?: (ev: SyntheticEvent, v: boolean) => void;
  fields: SearchFieldType[];
  values: Record<string, any>;
}

export interface ProTableTitleProps {
  title: ReactNode;
  tools?: ProTableTitleToolConfig[];
  children?: ReactNode;
}

export type ProTableProps<DataType extends object> = ProTableRequiredProps<DataType> &
  Partial<ProTableOptionalProps<DataType>> & {
    // title
    // 标题部分
    title?: ReactNode;
    titleProps?: ProTableTitleProps;
  } & {
    // restriction
    restriction?: Array<number>;
  } & {
    // pagination
    pagination?: {
      state: ProTablePaginationType;
      actions?: ProTablePaginationActions;
    };
  } & {
    searchProps?: SearchFormProps;
  } & {
    alertProps?: ProTableAlertProps;
  };

interface ProTableRefHandlers {
  reload: () => void;
  reset: () => void;
}

export type ProTableRefObjectType = Partial<ProTableRefHandlers>;

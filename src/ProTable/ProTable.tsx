import { useCallback, forwardRef, Ref, ReactElement, PropsWithChildren, ForwardedRef } from 'react';
import { Table, Paper } from '@mui/material';
/* import TableSelectionAlert from './TableSelectionAlert'; */
import ProTableTitle from './ProTableTitle';
/* import { useLatestFunc } from 'utils/useLatest'; */
import LoadingContainer from '../LoadingContainer';
/* import { useParam, useLoading } from 'utils/useFetcher'; */
import { ProTableProps, ProTableSorterOrder } from './types';
import SearchForm from './SearchForm';
import ProTableHeader from './ProTableHeader';
import ProTableBody from './ProTableBody';
import Pagination from './Pagination';
import ProTableAlert from './ProTableAlert';

/* const useTableStyles = makeStyles({
 *   root: {
 *     overflowX: 'auto',
 *     overflowY: 'hidden',
 *     display: 'flex',
 *     flexDirection: 'column',
 *   },
 *   toolbar: { flexShrink: 0, minHeight: 38 },
 *   alert: { flexShrink: 0 },
 *   tableContainer: {
 *     flex: '1 1',
 *   },
 *   table: {
 *     maxWidth: '100%',
 *   },
 *   head: {},
 *   body: {},
 *   foot: {
 *     overflow: 'hidden',
 *     flexShrink: 0,
 *   },
 *   showPagination: {},
 * }); */

/* const emptyList: object[] = [];
 * const defaultRowsPerPageOptions = [10, 25, 50] as Array<number>; */

// 功能：
// 1. 分页加载
// 2. 排序
// 3. 搜索
// 4. 对上提供对操作: reload、reset
// 5. 加载中状态
function ProTableInternal<DataType extends Record<string, any>>(
  props: ProTableProps<DataType>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    rowKey = 'id',
    // 样式
    size,
    // 数据
    data,
    total = 0,

    // 截取部分
    restriction,
    // 标题部分
    title,
    // 配置
    columns,
    headerSx,
    bodySx,
    /*  TODO: actions改为一个辅助hook
     * actions,
     * actionCol,
     * rowStyle,
     * renderRow, */
    // sort
    sorters,
    //
    // pagination
    pagination,

    // search
    searchProps,

    // title
    titleProps,

    // alert
    alertProps,

    // onChage
    onChange,

    // tree
    treeProps,
    // 占位符
    placeholder,
    elevation,
    //
    loading,
    paginationLoading = false,
    sx,
  } = props;

  // columns
  const tableColumns = columns;

  // 排序
  const handleOnSort = useCallback(async (field: string, order?: ProTableSorterOrder) => {
    console.log('field:', field, 'order:', order);
  }, []);

  /* const hasManualSearched =
   *   hasSearch && searchFields.filter(({ field }) => !!tableState.searches[field]).length > 0;
   */
  /* const [showSearch, setShowSearch] = React.useState(false); */

  // default tools
  /* const defaultToolsConfig = React.useMemo(() => {
   *   if (!toolbarTypeaults) {
   *     return {};
   *   }
   *   const result = {};
   *   const { reload, close } = toolbarTypeaults;
   *   if (reload) {
   *     if (typeof reload === 'function') {
   *       result.reload = { onClick: reload };
   *     } else {
   *       result.reload = { onClick: handleReloadTable };
   *     }
   *   }

   *   if (close) {
   *     if (typeof close === 'function') {
   *       result.close = { onClick: close };
   *     } else if (typeof close === 'object') {
   *       result.close = close;
   *     }
   *   }

   *   if (hasSearch) {
   *     result.search = {
   *       show: showSearch,
   *       searched: hasManualSearched,
   *       onClick: () => {
   *         setShowSearch((old) => !old);
   *       },
   *     };
   *   }
   *   return result;
   * }, [toolbarTypeaults, handleReloadTable, hasSearch, hasManualSearched, setShowSearch, showSearch]); */

  const inRestrictionView = restriction && restriction.length;
  const tableData = inRestrictionView ? restriction?.map((i) => data[i]) : data;

  return (
    <LoadingContainer
      ref={ref}
      component={Paper}
      elevation={elevation}
      loading={loading}
      sx={[
        {
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!inRestrictionView && (!!title || !!titleProps) && (
        <ProTableTitle title={title || titleProps?.title || ''} tools={titleProps?.tools}>
          {titleProps?.children}
        </ProTableTitle>
      )}
      {!inRestrictionView && !!searchProps && <SearchForm {...searchProps} />}
      {!inRestrictionView && !!alertProps && <ProTableAlert {...alertProps} />}
      <Table
        className="clsx(classes.table, showPagination && classes.showPagination)"
        size={size}
        stickyHeader
      >
        <ProTableHeader
          sx={headerSx}
          columns={tableColumns}
          sorters={sorters}
          onSort={handleOnSort}
        />
        <ProTableBody
          sx={bodySx}
          data={tableData}
          placeholder={placeholder}
          columns={tableColumns}
        />
      </Table>
      {!inRestrictionView && !!pagination ? (
        <Pagination
          sx={{
            overflow: 'hidden',
            flexShrink: 0,
          }}
          component="div"
          total={total}
          loading={paginationLoading}
          {...pagination}
        />
      ) : null}
      {props.children}
    </LoadingContainer>
  );
}

export const ProTable = forwardRef(ProTableInternal) as <
  DataType extends Record<string, any> = any
>(
  props: PropsWithChildren<ProTableProps<DataType>> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

export default ProTable;

/* <TableSelectionAlert
 * className="classes.alert"
 * selectedRowsCount={selectedRows.length}
 * onClearSelected={rowSelection && rowSelection.onClearSelected}
 * /> */
/*
 * {!inRestrictionView && (
 *   <TableHeaderToolbar title={title} defaults={defaultToolsConfig} className={classes.toolbar}>
 *     {toolbarRender && toolbarRender()}
 *   </TableHeaderToolbar>
 * )}
 */

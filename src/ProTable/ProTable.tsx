import { useCallback, forwardRef, Ref, ReactElement, PropsWithChildren, ForwardedRef } from 'react';
import { Table, Paper } from '@mui/material';
import ProTableTitle from './ProTableTitle';
import LoadingContainer from '../LoadingContainer';
import { ProTableProps, ProTableSorterOrder } from './types';
import SearchForm from './SearchForm';
import ProTableHeader from './ProTableHeader';
import ProTableBody from './ProTableBody';
import Pagination from './Pagination';
import ProTableAlert from './ProTableAlert';

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
    getRowKey,
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
          getRowKey={getRowKey}
          sx={bodySx}
          data={tableData}
          treeProps={treeProps}
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

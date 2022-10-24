import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableContainer, TableFooter, TableRow, TableCell } from '@material-ui/core';
import SpinContainer from '../Indicators/SpinContainer';
import ProTableHeader from './ProTableHeader';
import ProTableBody from './ProTableBody';
import TableSelectionAlert from './TableSelectionAlert';
import TableHeaderToolbar from './TableHeaderToolbar';
const emptyList = [];
const useTableStyles = makeStyles({
  root: {
    marginTop: '0.8rem',
    width: '100%',
  },
  toolbar: {},
  table: {},
  header: {},
  body: {},
});

// 功能：
// 1. title
// 2. header
// 3. body
// 4. footer
const FormTable = (props) => {
  const {
    rowKey = 'id',
    // 配置
    columns,
    actions,
    actionCol,
    renderRow,

    // 数据
    data = emptyList,
    // tree
    treeProps,

    // 选择
    rowSelection,
    selectedRows = emptyList,
    // 加载中
    loading,
    // title
    title,
    // footer
    footer,
    // 占位符
    placeholder,
    // 大小
    size,
    // 其他
    onFocus,
    onBlur,
    //
    className,
    ...rest
  } = props;
  const classes = useTableStyles(props);

  const tableColumns = React.useMemo(() => {
    const hasActions = actions && actions.length;
    if (!hasActions) {
      return columns;
    }

    const theActionCol = {
      title: '操作',
      field: '_actions',
      width: 120,
      ...actionCol,
      valueType: 'action',
      actions,
    };

    return [...columns, theActionCol];
  }, [columns, actions, actionCol]);

  const count = data.length;

  return (
    <SpinContainer
      component={Paper}
      className={clsx(classes.root, className)}
      spinning={loading}
      {...rest}
    >
      {title ? <TableHeaderToolbar title={title} /> : false}
      <TableSelectionAlert
        selectedRowsCount={selectedRows.length}
        onClearSelected={rowSelection && rowSelection.onClearSelected}
      />
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} size={size} onFocus={onFocus} onBlur={onBlur}>
          <ProTableHeader
            className={classes.header}
            columns={tableColumns}
            rowSelection={rowSelection}
            selectedRowsCount={selectedRows.length}
            rowsCount={count}
          />
          <ProTableBody
            className={classes.body}
            data={data}
            treeProps={treeProps}
            placeholder={placeholder}
            placeHolderHeight={80}
            rowKey={rowKey}
            columns={tableColumns}
            rowSelection={rowSelection}
            selectedRows={selectedRows}
            renderRow={renderRow}
          />
          {footer ? (
            <TableFooter>
              <TableRow>
                <TableCell align="center" colSpan={tableColumns.length}>
                  {footer}
                </TableCell>
              </TableRow>
            </TableFooter>
          ) : (
            false
          )}
        </Table>
      </TableContainer>
      {props.children}
    </SpinContainer>
  );
};

export default React.memo(FormTable);

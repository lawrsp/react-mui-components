import { SyntheticEvent, useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Send as SendIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import ProTable from '../src/ProTable/ProTable';
import {
  ProTableColumnDefType,
  SearchFieldType,
  ProTableChangeParams,
  ProTableTitleToolConfig,
} from '../src/ProTable/types';
import useSearch from '../src/ProTable/useSearch';
import useSearchTool from '../src/ProTable/useSearchTool';
import useTitleProps from '../src/ProTable/useTitleProps';
import useTreeProps from '../src/ProTable/useTreeProps';

import useProTablePagination from '../src/ProTable/usePagination';
import { delayms } from '../src/utils/delay';

export default {
  title: 'Example/ProTable/Table',
  component: ProTable,
  argTypes: {
    alertType: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'select' },
    },
  },
};

type DataTypeFlat = {
  name: string;
  gender: 'M' | 'F' | '';
  age: number;
};

type DataTypeWithTree = {
  name: string;
  gender: 'M' | 'F' | '';
  age: number;
  children?: DataTypeWithTree[];
};

export const Simple = () => {
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat, index: number) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({ pagination, searches, sorters }: ProTableChangeParams) => {
    console.log(
      'handle data request,',
      'pagination:',
      pagination,
      'sorter:',
      sorters,
      'searches:',
      searches
    );
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(10);
    return;
  };

  return (
    <div>
      <ProTable
        title="测试表格"
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

export const CustomTitle = () => {
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat, index: number) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({ pagination, searches, sorters }: ProTableChangeParams) => {
    console.log(
      'handle data request,',
      'pagination:',
      pagination,
      'sorter:',
      sorters,
      'searches:',
      searches
    );
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(10);
    return;
  };

  return (
    <div>
      <ProTable
        title={
          <div
            style={{
              color: 'green',
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
              lineHeight: 3,
              flexGrow: 1,
            }}
          >
            自定义组件标题
          </div>
        }
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

export const WithPagination = () => {
  const pagination = useProTablePagination();
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat, index: number) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([]);
  const [total, setTotal] = useState<number>(0);

  const {
    state: { rowsPerPage, currentPage },
  } = pagination;

  useEffect(() => {
    console.log('=== handle data request,', 'pagination:', { rowsPerPage, currentPage });
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(3);
  }, [rowsPerPage, currentPage]);

  return (
    <div>
      <ProTable
        data={data}
        columns={columns}
        total={total}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
        pagination={pagination}
      />
    </div>
  );
};

export const Searchable = () => {
  const [searches, setSearches] = useState({});
  const onChangeSearches = (values: Record<string, any>) => {
    console.log('change searches');
    setSearches(values);
  };
  const search = useSearch({
    initialVisible: true,
    noHide: true,
    searches,
    refresh: async () => {
      console.log('refresh');
      await delayms(2000);
    },
    onChangeSearches,
    fields: [
      {
        field: 'name',
        label: '姓名',
      },
      {
        field: 'gender',
        label: '性别',
      },
      {
        field: 'age',
        label: '年龄',
      },
    ] as SearchFieldType[],
  });

  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({ pagination, searches, sorters }: ProTableChangeParams) => {
    console.log(
      'handle data request,',
      'pagination:',
      pagination,
      'sorter:',
      sorters,
      'searches:',
      searches
    );
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(10);
    return;
  };

  return (
    <div>
      <ProTable
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        searchProps={search}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

const WithAlertTemplate = ({ alertType }) => {
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat, index: number) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({ pagination, searches, sorters }: ProTableChangeParams) => {
    console.log(
      'handle data request,',
      'pagination:',
      pagination,
      'sorter:',
      sorters,
      'searches:',
      searches
    );
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(10);
    return;
  };

  return (
    <div style={{ padding: 10 }}>
      <ProTable
        data={data}
        columns={columns}
        title="测试表格"
        total={total}
        alertProps={{ message: 'this is alert', type: alertType }}
        onChange={handleChange}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

export const WithAlert = WithAlertTemplate.bind({});
WithAlert.args = {
  alertType: 'info',
};

export const AllHeaderTitles = () => {
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeFlat) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeFlat) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeFlat) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeFlat>[];

  const [data, setData] = useState<DataTypeFlat[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({ pagination, searches, sorters }: ProTableChangeParams) => {
    console.log(
      'handle data request,',
      'pagination:',
      pagination,
      'sorter:',
      sorters,
      'searches:',
      searches
    );
    setData([
      { name: 'Jack', gender: 'M', age: 50 },
      { name: 'Kevin', gender: 'M', age: 18 },
      { name: 'Jane', gender: 'F', age: 28 },
    ]);
    setTotal(10);
    return;
  };

  const [loading, setLoading] = useState(false);

  const [searches, setSearches] = useState({});
  const onChangeSearches = async (values: Record<string, any>) => {
    console.log('change searches');
    setSearches(values);
    setLoading(true);
    await delayms(2000);
    setLoading(false);
  };

  const search = useSearch({
    initialVisible: true,
    refresh: async () => {
      console.log('refresh');
      setLoading(true);
      await delayms(1000);
      setLoading(false);
    },
    searches,
    onChangeSearches,
    fields: [
      {
        field: 'name',
        label: '姓名',
      },
      {
        field: 'gender',
        label: '性别',
      },
      {
        field: 'age',
        label: '年龄',
      },
    ] as SearchFieldType[],
  });

  const searchTool = useSearchTool(search);

  const tools: ProTableTitleToolConfig[] = [
    { button: '添加', onClick: action('create') },
    {
      button: '测试',
      color: 'info',
      variant: 'outlined',
      startIcon: <SendIcon />,
      onClick: action('test'),
    },
    {
      button: '完成',
      color: 'secondary',
      onClick: action('complete'),
      variant: 'contained',
      endIcon: <AddShoppingCartIcon />,
    },
    'divider',
    searchTool,
    {
      icon: 'reload',
      onClick: async (ev: SyntheticEvent) => {
        action('reload')(ev);
        setLoading(true);
        await delayms(2000);
        setLoading(false);
      },
    },
    { icon: 'close', onClick: action('close') },
  ];

  const titleProps = useTitleProps('测试所有', { withSearch: search, withTools: tools });

  return (
    <div style={{ padding: 20 }}>
      <ProTable
        loading={loading}
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        titleProps={titleProps}
        searchProps={search}
        alertProps={{ message: 'this is a alert', type: 'info' }}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

export const TreeTable = () => {
  const columns = [
    {
      field: 'name',
      header: '姓名',
    },
    {
      field: 'gender',
      header: '性别',
      renderRowCell: (data: DataTypeWithTree, index: number) => {
        /* console.log('data:', data, 'index:', index); */
        const v = data.gender;
        if (v === 'M') {
          return '男';
        } else if (v === 'F') {
          return '女';
        } else {
          return '未知';
        }
      },
      rowCellSx: {},
    },
    {
      field: 'age',
      header: '年龄',
      type: 'number',
      valueFormatter: (data: DataTypeWithTree) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataTypeWithTree) => {
        const v = data.gender;
        if (v === 'M') {
          return '先生';
        } else if (v === 'F') {
          return '女士';
        } else {
          return '';
        }
      },
      rowCellSx: {
        bgcolor: 'action.disabled',
      },
      rowCellSxGetter: (data: DataTypeWithTree) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataTypeWithTree>[];

  const data: DataTypeWithTree[] = [
    {
      name: '123',
      gender: 'F',
      age: 50,
      children: [
        {
          name: 'abcd',
          gender: 'F',
          age: 30,
          children: [
            { name: 'jqka', gender: 'F', age: 6 },
            { name: 'jqkb', gender: 'M', age: 6 },
            { name: 'jqkc', gender: 'M', age: 6 },
          ],
        },
        {
          name: 'abce',
          gender: 'M',
          age: 20,
        },
      ],
    },
    {
      name: '12ff3',
      gender: 'M',
      age: 30,
      children: [{ name: '789a', gender: 'F', age: 6 }],
    },
    { name: '423412ff3', gender: '', age: 50 },
  ];
  const [treeData, treeProps] = useTreeProps(data, columns[0].field, {
    getId: (d) => d.name,
    initialExpandState: { expand: true, excepts: [] },
    indent: 1.5,
  });

  console.log('data:', data);
  console.log('tree data:', treeData);
  console.log('treeInfo:', treeProps);

  return (
    <div>
      <ProTable
        getRowKey={(data) => data.name}
        data={treeData}
        treeProps={treeProps}
        total={100}
        columns={columns}
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

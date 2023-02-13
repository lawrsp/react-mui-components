import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Send as SendIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import ProTable from '../src/ProTable/ProTable';
import {
  ProTableColumnDefType,
  ProTablePaginationType,
  ProTableSortersType,
  SearchFieldType,
  ProTableChangeParams,
  ProTableTitleToolConfig,
} from '../src/ProTable/types';
import useSearch from '../src/ProTable/useSearchTool';
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

type DataType = {
  name: string;
  gender: 'M' | 'F' | '';
  age: number;
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
      renderRowCell: (data: DataType, index: number) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
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
      renderRowCell: (data: DataType, index: number) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
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
      renderRowCell: (data: DataType, index: number) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([]);
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
      renderRowCell: (data: DataType) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
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
        searchProps={search.props}
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
      renderRowCell: (data: DataType, index: number) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
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
      renderRowCell: (data: DataType) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
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

  const tools: ProTableTitleToolConfig[] = [
    { button: '添加', variant: 'outlined', onClick: action('create') },
    {
      button: '测试',
      variant: 'contained',
      color: 'info',
      startIcon: <SendIcon />,
      onClick: action('test'),
    },
    {
      button: '完成',
      color: 'secondary',
      onClick: action('complete'),
      endIcon: <AddShoppingCartIcon />,
    },
    'divider',
    {
      icon: 'search',
      ...search.tool,
    },
    { icon: 'reload', onClick: action('reload') },
    { icon: 'close', onClick: action('close') },
  ];

  return (
    <div style={{ padding: 20 }}>
      <ProTable
        loading={loading}
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        title="测试所有"
        searchProps={search.props}
        tools={tools}
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
      renderRowCell: (data: DataType, index: number) => {
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
      valueFormatter: (data: DataType) => {
        return `${data.age}岁`;
      },
    },
    {
      field: 'suffix',
      header: '称呼',
      valueGetter: (data: DataType) => {
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
      rowCellSxGetter: (data: DataType) => {
        if (data.gender === 'M') {
          return { color: 'blue' };
        }
        if (data.gender === 'F') {
          return { color: 'red' };
        }
        return {};
      },
    },
  ] as ProTableColumnDefType<DataType>[];

  const [data, setData] = useState<DataType[]>([
    { name: '123', gender: 'F', age: 19 },
    { name: '12ff3', gender: 'M', age: 30 },
    { name: '423412ff3', gender: '', age: 50 },
  ]);
  const [total, setTotal] = useState<number>(3);

  const handleChange = ({
    pagination,
    sorters,
  }: {
    pagination: ProTablePaginationType;
    sorters: ProTableSortersType;
  }) => {
    console.log('handle data request,', 'pagination:', pagination, 'sorter:', sorters);
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
        placeholder={<div style={{ height: '100px' }}>No Data</div>}
      />
    </div>
  );
};

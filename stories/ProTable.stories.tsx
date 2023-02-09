import { useEffect, useState } from 'react';
import ProTable from '../src/ProTable/ProTable';
import {
  ProTableColumnDefType,
  ProTablePaginationType,
  ProTableSortersType,
  SearchFieldType,
  ProTableChangeParams,
  ProTableTitleToolConfig,
} from '../src/ProTable/types';
import useSearch from '../src/ProTable/useSearch';
import useProTablePagination from '../src/ProTable/usePagination';
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
  const search = useSearch({
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
        search={search}
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
        alert={{ message: 'this is alert', type: alertType }}
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

  const search = useSearch({
    defaultInvisible: false,
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
    {
      icon: 'search',
      ...search.tool,
    },
    { icon: 'reload', onClick: () => console.log('click reload') },
    'divider',
    { icon: 'close', onClick: () => console.log('click close') },
  ];

  return (
    <div style={{ padding: 20 }}>
      <ProTable
        data={data}
        columns={columns}
        total={total}
        onChange={handleChange}
        title="测试所有"
        search={search}
        tools={tools}
        alert={{ message: 'this is a alert', type: 'info' }}
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

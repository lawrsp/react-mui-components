import { useState } from 'react';
import SearchForm from '../src/ProTable/SearchForm';
import { ProTableSearchActions, SearchFieldType } from '../src/ProTable/types';

export default {
  title: 'Example/ProTable/SearchForm',
  component: SearchForm,
};

export const Simple = () => {
  /* key?: string;
   * field: string;
   * defaultValue?: string | number;
   * label: string;
   * type: string;
   * GridProps?: Breakpoints; */

  const searchFields = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
    },
    {
      field: 'test1',
      label: '测试值',
    },
    {
      field: 'test2',
      label: '测试值2',
    },
  ] as SearchFieldType[];

  const handleSearch = (values: object) => {
    console.log('values:', values);
    const p = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
    return p;
  };

  const actions = {
    onSearch: async (values) => {
      await handleSearch(values);
    },
  } as ProTableSearchActions;

  return (
    <div>
      <SearchForm searchFields={searchFields} searches={[]} actions={actions} />
    </div>
  );
};

export const WithHideButton = () => {
  const searchFields = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
    },
    {
      field: 'test1',
      label: '测试值',
    },
    {
      field: 'test2',
      label: '测试值2',
    },
  ] as SearchFieldType[];

  const [open, setOpen] = useState(true);

  const handleSearch = (values: object) => {
    console.log('values:', values);
    const p = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    return p;
  };

  const actions = {
    onSearch: async (values) => {
      await handleSearch(values);
    },
    onChangeVisible: (val) => {
      console.log('=--------set invisible:', val);
      setOpen(val);
    },
  } as ProTableSearchActions;

  return (
    <div>
      <button
        onClick={() => {
          console.log('open=====', open);
          setOpen(true);
        }}
      >
        {' '}
        show{' '}
      </button>
      <SearchForm searchFields={searchFields} visible={open} searches={[]} actions={actions} />
    </div>
  );
};

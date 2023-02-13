import { useMemo, useState } from 'react';
import { isEqual, isEmpty } from 'lodash';
import { SearchFieldType, SearchFormProps, ProTableTitleSearchToolProps } from './types';

export type ProTableSearchDataSource = {
  values: Record<string, any>;
  setValues: (values: Record<string, any>) => void | Promise<void>;
};

const getSearchValues = (values: Record<string, any>) => {
  const result = Object.keys(values).reduce((all, k) => {
    const v = values[k];
    if (v !== undefined && v !== null && v !== '') {
      return {
        ...all,
        [k]: v,
      };
    }

    return all;
  }, {});

  return result;
};

export const useProTableSearch: (props: {
  fields: SearchFieldType[];
  searches: Record<string, any>;
  onChangeSearches: (values: Record<string, any>) => void | Promise<any>;
  refresh: () => void | Promise<any>;
  initialVisible?: boolean;
}) => {
  props: SearchFormProps;
  tool: ProTableTitleSearchToolProps;
} = ({ fields, searches, onChangeSearches, refresh, initialVisible = false }) => {
  const [searchFields, setSearchFields] = useState<SearchFieldType[]>(fields);
  const [visible, setVisible] = useState<boolean>(initialVisible);

  const formProps = useMemo<SearchFormProps>(() => {
    const onSearch = async (values: Record<string, any>) => {
      const searchValues = getSearchValues(values);
      console.log('============== searchValues:', searchValues);

      if (isEqual(searchValues, searches)) {
        return await refresh();
      }

      return await onChangeSearches(searchValues);
    };

    const onHide = () => setVisible(false);

    return {
      searches,
      searchFields,
      visible,

      actions: {
        setSearchFields,
        onHide,
        onSearch,
      },
    };
  }, [visible, searches, onChangeSearches, searchFields, refresh]);

  const hasSearches = !isEmpty(searches);

  const tool = useMemo<ProTableTitleSearchToolProps>(() => {
    const onClick = () => setVisible((old) => !old);
    return {
      onClick,
      open: visible,
      hasSearches,
    };
  }, [visible, setVisible, hasSearches]);

  return { props: formProps, tool };
};

export default useProTableSearch;

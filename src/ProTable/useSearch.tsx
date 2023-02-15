import { SyntheticEvent, useMemo, useState } from 'react';
import { isEqual } from 'lodash';
import { SearchFieldType, SearchFormProps } from './types';

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

export const useSearchProps: (props: {
  fields: SearchFieldType[];
  searches: Record<string, any>;
  onChangeSearches: (values: Record<string, any>) => void | Promise<any>;
  refresh: () => void | Promise<any>;
  initialVisible?: boolean;
  noHide?: boolean;
}) => SearchFormProps = ({
  fields,
  searches,
  onChangeSearches,
  refresh,
  initialVisible = true,
  noHide,
}) => {
  const [searchFields, setSearchFields] = useState<SearchFieldType[]>(fields);
  const [visible, setVisibile] = useState(initialVisible);

  const formProps = useMemo<SearchFormProps>(() => {
    const onSearch = async (values: Record<string, any>) => {
      const searchValues = getSearchValues(values);
      if (isEqual(searchValues, searches)) {
        return await refresh();
      }

      return await onChangeSearches(searchValues);
    };

    const onChangeVisible = !noHide
      ? (ev: SyntheticEvent, v: boolean) => {
          ev.preventDefault();
          setVisibile(v);
        }
      : undefined;

    return {
      searches,
      searchFields,
      visible,

      actions: {
        setSearchFields,
        onChangeVisible,
        onSearch,
      },
    };
  }, [visible, searches, onChangeSearches, searchFields, refresh, noHide]);

  return formProps;
};

export default useSearchProps;

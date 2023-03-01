import { SyntheticEvent, useMemo, useState } from 'react';
import { isEqual } from 'lodash-es';
import { SearchFieldType, SearchFormProps } from './types';

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
  onChangeSearches: (values: Record<string, any>) => void;
  refresh: () => void;
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
        refresh();
        return;
      }

      onChangeSearches(searchValues);
      return;
    };

    const onChangeVisible = !noHide
      ? (v: boolean, ev?: SyntheticEvent) => {
          ev?.preventDefault();
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

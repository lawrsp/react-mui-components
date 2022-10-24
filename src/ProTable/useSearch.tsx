import { useMemo } from 'react';
import { useState } from 'react';
import { SearchFieldType, ProTableSearchState, ProTableSearchActions } from './types';

export interface useSearchPropsParams {
  fields: SearchFieldType[];
  defaultSearches?: Record<string, any>;
  defaultInvisible?: boolean;
}

const useSearchProps: (props: useSearchPropsParams) => {
  state: ProTableSearchState;
  actions: ProTableSearchActions;
} = ({ defaultInvisible = false, fields, defaultSearches = {} }) => {
  const [searchFields, setSearchFields] = useState<SearchFieldType[]>(fields);
  const [invisible, setInvisible] = useState<boolean>(defaultInvisible);
  const [searches, setSearches] = useState<Record<string, any>>(defaultSearches);

  const state = useMemo<ProTableSearchState>(() => {
    return {
      /* searches: Record<string, any>;
       * searchFields: SearchFieldType[]; */

      invisible,
      onVisibleChange: (_: any, val: boolean) => {
        setInvisible(val);
      },

      searches,
      searchFields,
    };
  }, [invisible, searches, searchFields]);

  const actions = useMemo<ProTableSearchActions>(() => {
    return { setSearchFields, setInvisible, setSearches };
  }, []);

  return { state, actions };
};

export default useSearchProps;

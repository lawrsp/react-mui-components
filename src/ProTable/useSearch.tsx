import { useMemo } from 'react';
import { useState } from 'react';
import {
  SearchFieldType,
  ProTableSearchState,
  ProTableSearchActions,
  ProTableTitleSearchToolProps,
} from './types';

export interface useProTableSearchPropsParams {
  fields: SearchFieldType[];
  defaultSearches?: Record<string, any>;
  defaultInvisible?: boolean;
}

export const useProTableSearchProps: (props: useProTableSearchPropsParams) => {
  state: ProTableSearchState;
  actions: ProTableSearchActions;
  tool: ProTableTitleSearchToolProps;
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

  const tool = useMemo<ProTableTitleSearchToolProps>(
    () => ({
      onClick: () => setInvisible!((old) => !old),
      show: !invisible,
      searched: !!searches && JSON.stringify(searches) !== '{}',
    }),
    [invisible, setInvisible, searches]
  );

  return { state, actions, tool };
};

export default useProTableSearchProps;

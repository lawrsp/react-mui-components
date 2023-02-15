import { SyntheticEvent, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { SearchFormProps, ProTableTitleSearchToolConfig } from './types';

export const useSearchTool: (props: SearchFormProps) => ProTableTitleSearchToolConfig = ({
  searches,
  visible,
  actions,
}) => {
  const hasSearches = !isEmpty(searches);
  const { onChangeVisible } = actions;

  const tool = useMemo<ProTableTitleSearchToolConfig>(() => {
    const onClick = (ev: SyntheticEvent) =>
      onChangeVisible ? onChangeVisible(ev, !visible) : () => {};

    return {
      icon: 'search',
      onClick,
      open: !!visible,
      hasSearches,
    };
  }, [visible, hasSearches, onChangeVisible]);

  return tool;
};

export default useSearchTool;

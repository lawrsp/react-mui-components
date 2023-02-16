import { useMemo } from 'react';
import { ProTableTitleProps, ProTableTitleToolConfig, SearchFormProps } from './types';
import SearchTitle from './SearchTitle';

export const useTitleProps: (
  title: string,
  options?: {
    withSearch?: SearchFormProps;
    withTools?: ProTableTitleToolConfig[];
  }
) => ProTableTitleProps = (title, options = {}) => {
  const { withSearch, withTools } = options;

  const children = useMemo(() => {
    if (!withSearch) {
      return undefined;
    }

    const { visible, searchFields, searches, actions } = withSearch;

    return (
      <SearchTitle
        open={visible}
        fields={searchFields}
        values={searches}
        onChangeOpen={actions.onChangeVisible}
      />
    );
  }, [withSearch]);

  return useMemo(() => {
    return {
      title,
      tools: withTools,
      children,
    };
  }, [title, withTools, children]);
};

export default useTitleProps;

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { SearchFormProps } from './types';
import SearchTitle from './SearchTitle';

export const useSearchTitle: (title: string, props: SearchFormProps) => ReactNode = (
  title,
  { searchFields, searches, visible, actions }
) => {
  /* const { open, hasSearches, onChangeOpen, fields, values } = props; */

  return (
    <>
      <Box component="span" sx={{ flexShrink: 0 }}>
        {title}
      </Box>
      <SearchTitle
        open={visible}
        fields={searchFields}
        values={searches}
        onChangeOpen={actions.onChangeVisible}
      />
    </>
  );
};

export default useSearchTitle;

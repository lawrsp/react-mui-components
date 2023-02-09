import { ReactNode } from 'react';
import { Box, Divider } from '@mui/material';

export type ProTableToolItemType = {};

export interface useProTableToolsProps {
  tools: ProTableToolItemType[];
}

const useProTableTools = (props: useProTableToolsProps) => {
  const { tools } = props;

  return (
    <Box
      sx={{
        minHeight: '3.2rem',
        display: 'flex',
        paddingTop: 'spacing(1)',
        paddingLeft: 'spacing(2)',
        paddingRight: 'spacing(2)',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          flexGrow: 1,
        }}
      >
        {title}
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          marginLeft: '0.4rem',
        }}
      />
    </Box>
  );
};

export default useProTableRichTitle;

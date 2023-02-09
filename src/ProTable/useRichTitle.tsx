import { ReactNode } from 'react';
import { Box, Divider } from '@mui/material';

export interface useProTableRichTitleProps {
  title: string;
  tools: ReactNode;
}

const useProTableRichTitle = (props: useProTableRichTitleProps) => {
  const { title, tools } = props;

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

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export interface LoadingPageProps {
  text?: string;
  textSx?: SxProps<Theme>;
}

const LoadingPage = ({ text = 'loading...', textSx }: LoadingPageProps) => (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      backgournd: 'gray',
      zIndex: 1501,
      opacity: '0.8',
    }}
  >
    <CircularProgress color="primary" size={60} />
    <Box
      sx={[
        {
          fontSize: '3.6rem',
          fontWeight: 'bold',
          color: '#ccc',
          mt: 8,
        },
        ...(Array.isArray(textSx) ? textSx : [textSx]),
      ]}
    >
      {text}
    </Box>
  </Box>
);

export default LoadingPage;

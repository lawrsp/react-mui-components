import { Box, CircularProgress } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export interface LoadingPageProps {
  text?: string;
  textSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

const LoadingPage = ({ text = 'loading...', textSx, sx }: LoadingPageProps) => (
  <Box
    sx={[
      {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'background.default',
        zIndex: 1501,
        opacity: '0.8',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
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

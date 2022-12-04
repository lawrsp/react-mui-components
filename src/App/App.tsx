import { Suspense, ReactNode } from 'react';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import LoadingPage from '../LoadingPage';
import { createTheme } from '../Theme';

const snackbarOriginDefault: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

export interface AppProps {
  theme?: Theme;
  fallback?: ReactNode;
  snackbarOrigin?: SnackbarOrigin;
  children?: ReactNode;
}

export function AppProvider({
  fallback = <LoadingPage />,
  theme = createTheme(),
  snackbarOrigin = snackbarOriginDefault,
  children,
}: AppProps) {
  return (
    <Suspense fallback={fallback}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={snackbarOrigin}>{children}</SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default AppProvider;

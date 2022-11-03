import { ReactNode } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { RouteConfigProvider } from '../Contexts/RouteConfigContext';
import { defaultTheme } from '../Theme';
import { RouteConfig } from '../Types';

const defaultSnackAnchorOrigin: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

function App({
  theme = defaultTheme,
  snackAnchorOrigin = defaultSnackAnchorOrigin,
  children,
  routes,
}: {
  theme?: Theme;
  snackAnchorOrigin?: SnackbarOrigin;
  children: ReactNode;
  routes: RouteConfig;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider anchorOrigin={snackAnchorOrigin}>
        <RouteConfigProvider routes={routes}>{children}</RouteConfigProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

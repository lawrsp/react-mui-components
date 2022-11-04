import { ReactNode } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { RouteConfigProvider } from '../Contexts/RouteConfigContext';
import { defaultTheme } from '../Theme';
import { RouteConfig } from '../Types';

const snackbarOriginDefault: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

function App({
  theme = defaultTheme,
  routes = [],
  snackbarOrigin = snackbarOriginDefault,
  children,
}: {
  theme?: Theme;
  routes?: RouteConfig;
  snackbarOrigin?: SnackbarOrigin;
  children?: ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider anchorOrigin={snackbarOrigin}>
        <RouteConfigProvider routes={routes}>{children}</RouteConfigProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

import { Fragment, ReactNode } from 'react';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { RouteConfigProvider } from '../Contexts/RouteConfigContext';
import { RouteConfig } from '../Types';

const snackbarOriginDefault: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

function App({
  theme,
  routes = [],
  snackbarOrigin = snackbarOriginDefault,
  children,
}: {
  theme: Theme;
  routes?: RouteConfig;
  snackbarOrigin?: SnackbarOrigin;
  children?: ReactNode;
}) {
  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={snackbarOrigin}>
          <RouteConfigProvider routes={routes}>{children}</RouteConfigProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;

import { ReactNode } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouteConfigProvider } from '../Contexts/RouteConfigContext';
import { defaultTheme } from '../Theme';
import { RouteConfig } from '../Types';

function App({
  theme = defaultTheme,
  children,
  routes,
}: {
  theme?: Theme;
  children: ReactNode;
  routes: RouteConfig;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteConfigProvider routes={routes}>{children}</RouteConfigProvider>
    </ThemeProvider>
  );
}

export default App;

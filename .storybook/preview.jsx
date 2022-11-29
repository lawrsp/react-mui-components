import React from 'react';
// import { createTheme, AppProvider } from '../dist/index.es';
import { createTheme, AppProvider } from '../src';

const theme = createTheme({
  // ....
  palette: {
    primary: {
      main: '#1DA57A',
    },
  },
});

export const decorators = [
  (Story) => (
    <AppProvider theme={theme}>
      <Story />
    </AppProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

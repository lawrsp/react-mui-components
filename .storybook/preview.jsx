import React from 'react';
import { createTheme, App } from '../dist/index.es';
// import App from '../src/App';
// import { ThemeProvider } from '@mui/material/styles';
// import { createTheme } from '@mui/material/styles';
import './preview.css';

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
    <App theme={theme}>
      <Story />
    </App>
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

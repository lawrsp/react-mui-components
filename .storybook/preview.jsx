import React from 'react';
// import { createTheme, App } from '../dist/index.es';
import { createTheme, App } from '../src';
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

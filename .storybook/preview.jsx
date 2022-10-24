import React from 'react';
import theme from '../src/Theme';
import App from '../src/App';

export const decorators = [
  (Story) => (
    <App theme={theme}>
      <Story />
    </App>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

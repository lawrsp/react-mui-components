import { createTheme as muiCreateTheme, type ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

declare module '@mui/material/styles' {
  interface Theme {
    sider: {
      width: number | string;
    };
    footer: {
      height: number | string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    sider?: {
      width?: number | string;
    };
    footer?: {
      height?: number | string;
    };
  }
}

export const defaultTheme = {
  typography: {
    htmlFontSize: 10,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 450,
    fontWeightBold: 600,
    fontFamily: [
      '"Microsoft Yahei"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'auto',
          MozOsxFontSmoothing: 'grayscale',
          fontSize: '62.5%' /* 16px(browser default) x 62.5% = 10px , get: 1rem = 10px*/,
        },
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
      '@media (min-wdith: 0px)': {
        '@media (orientation: landscape)': {
          minHeight: 32,
        },
      },
      '@media (minWidth: 600px)': {
        minHeight: 48,
      },
    },
  },
  sider: {
    width: '24rem',
  },
  footer: {
    height: '40px',
  },
} as ThemeOptions;

export const createTheme = (...args: ThemeOptions[]) => {
  const options = args.reduce((res, it) => deepmerge(res, it), defaultTheme);
  return muiCreateTheme(options);
};

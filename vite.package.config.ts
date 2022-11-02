import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import packageJson from './package.json';
console.log(packageJson.dependencies);

const EXTERNAL = Object.keys(packageJson.devDependencies);

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  build: {
    sourcemap: true,
    outDir: resolve(__dirname, './lib'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-mui-components',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: EXTERNAL,
      output: {
        compact: true,
        globals: {},
      },
    },
  },
});

import { createRequire } from 'node:module';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import sizes from 'rollup-plugin-sizes';
import commonjs from '@rollup/plugin-commonjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const EXTERNALS = Object.keys(pkg.dependencies).concat([
  /@babel\/runtime/,
  /@mui\//,
  /@hookform\/resolvers/,
  /react\//,
  /react-dom\//,
]);

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    external: EXTERNALS,
    plugins: [
      // nodeResolve 可以查找更多的依赖， 需要extensions来支持 ts, tsx
      nodeResolve({
        extensions,
      }),
      // 依赖中有非esm包，就要用commonjs插件
      commonjs(),
      typescript({
        noForceEmit: true, // only declaration
        compilerOptions: {
          outDir: 'dist',
          declaration: true,
          declarationDir: '.',
          noEmit: false,
          emitDeclarationOnly: true,
        },
        // tsconfig.json
      }),

      babel({
        // babel.config.json
        babelHelpers: 'runtime',
        extensions,
        exclude: ['node_modules/**', 'dist'],
        include: ['src/**/*'],
      }),
      sizes(),
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
];

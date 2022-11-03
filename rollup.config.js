import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' assert { type: 'json' };

const EXTERNALS = Object.keys(pkg.dependencies)
  .concat(Object.keys(pkg.peerDependencies))
  .concat([/@mui\/.*/, /react\/.*/, '@hookform/resolvers/zod']);

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
      typescript({
        tsconfig: 'tsconfig.build.json',
      }), // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
  },
];

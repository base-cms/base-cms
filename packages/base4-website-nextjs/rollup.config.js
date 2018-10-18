import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import graphql from 'rollup-plugin-graphql';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const { keys } = Object;

const externals = [
  ...keys(pkg.dependencies || {}),
  ...keys(pkg.peerDependencies || {}),
];

const makeExternalPredicate = (externalsArr) => {
  if (externalsArr.length === 0) return () => false;
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
}

const buildConfig = ({ input, output }) => ({
  input,
  output,
  external: makeExternalPredicate(externals),
  plugins: [
    nodeResolve({ extensions: ['.js', '.jsx'] }),
    commonjs({ include: ['node_modules/**'] }),
    graphql(),
    babel({ exclude: 'node_modules/**' }),
  ],
});

export default [
  buildConfig({
    input: 'src/utils/index.js',
    output: [
      {
        file: 'dist/utils/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/utils/index.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
  }),
  buildConfig({
    input: 'src/components/index.js',
    output: [
      {
        file: 'dist/components/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/components/index.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
  }),
];

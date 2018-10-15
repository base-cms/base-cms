import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.module.js',
      format: 'es',
    },
  ],
  external: [
    'graphql',
    'react',
    'react-dom',
    'react-apollo',
    'next',
    'isomorphic-unfetch',
  ],
  plugins: [
    resolve({
      // main: true,
      // jsnext: false,
      // module: true,
    }),
    commonjs({ include: 'node_modules/**' }),
    babel({ exclude: 'node_modules/**' }),
    json({
      include: 'node_modules/@base-cms/base4-graphql-stitching/fragment-types.json',
      compact: true,
    }),
  ],
};

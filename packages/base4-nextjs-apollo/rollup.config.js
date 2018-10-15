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
    'next/head',
    'isomorphic-unfetch',
  ],
  plugins: [
    resolve({
      main: true,
      module: false,
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/apollo-cache-inmemory/lib/bundle.umd.js': ['InMemoryCache', 'IntrospectionFragmentMatcher'],
        'node_modules/apollo-client/bundle.umd.js': ['ApolloClient'],
        'node_modules/apollo-link-error/lib/bundle.umd.js': ['onError'],
        'node_modules/apollo-link-http/lib/bundle.umd.js': ['HttpLink'],
        'node_modules/apollo-link/lib/bundle.umd.js': ['ApolloLink'],
      },
    }),
    babel({ exclude: 'node_modules/**' }),
    json({
      include: 'node_modules/@base-cms/base4-graphql-stitching/fragment-types.json',
      compact: true,
    }),
  ],
};

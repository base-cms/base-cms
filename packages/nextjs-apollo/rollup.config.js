import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');
const peerDependencies = Object.keys(pkg.peerDependencies);
peerDependencies.push('next/head');
const dependencies = Object.keys(pkg.dependencies);

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: peerDependencies.concat(dependencies),
  plugins: [
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs({ include: 'node_modules/**' }),
    babel(),
    json({
      include: 'node_modules/@base-cms/base4-graphql-stitching/fragment-types.json',
      compact: true,
    }),
  ],
};

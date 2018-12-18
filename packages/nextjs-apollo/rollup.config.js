import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const pkg = require('./package.json');

const { keys } = Object;

const externals = [
  ...keys(pkg.dependencies || {}),
  ...keys(pkg.peerDependencies || {}),
];

const makeExternalPredicate = (externalsArr) => {
  if (externalsArr.length === 0) return () => false;
  const externalPattern = new RegExp(`^(${externalsArr.join('|')})($|/)`);
  return id => externalPattern.test(id);
};

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
      sourcemap: true,
    },
  ],
  external: makeExternalPredicate(externals),
  plugins: [
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs({ include: '../../node_modules/**' }),
    babel(),
  ],
};

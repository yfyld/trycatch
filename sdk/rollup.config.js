import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
const env = process.env.NODE_ENV;

export default {
  input: './src/index.ts',
  output: {
    file: './dist/trycatch.min.js',
    name: 'trycatch',
    format: 'umd',
    minify: true,
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json"
    }),
    replace({
      ENV: JSON.stringify(env|| 'development')
    }),
    (env === 'production' && uglify())
  ]
};

import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import path from 'path';

export default {
    input: 'src/index.ts',
    output: {
        file: 'trycatch.js',
        format: 'cjs',
        name: 'TryCatch',
    },
    plugins: [
        typescript({
            include: path.resolve(__dirname, 'src'),
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        }),
        babel({
            exclude: 'node_modules',
            
        })
    ]
}
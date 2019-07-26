const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'trycatch.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'TryCatch'
    },
    resolve: {
        extensions: ['.ts'],
        plugins: [
            new TsConfigPathsPlugin({configFile: path.resolve(__dirname, 'tsconfig.json')})
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}
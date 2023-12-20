
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        static: path.join(__dirname, 'build'), // or whichever directory you want to serve
        port: 8080,
        open: true,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/i,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(gltf|bin|glb|obj)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, `src/assets/`),
                    to: path.join(__dirname, `build/assets/`)
                },
            ],
        }),
    ],
};



const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require('fs');
const ncp = require('ncp').ncp;

// Get a list of directories in the 'src/assets' directory
const assetDirectories = fs.readdirSync('src/assets', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);


module.exports = {
    mode: 'production',
    entry: './src/main.ts', // Your entry point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
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
        ...assetDirectories.map(directory => ({
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('CopyWebpackPlugin', () => {
                    const sourcePath = path.join(__dirname, `src/assets/${directory}`);
                    const destinationPath = path.join(__dirname, `build/assets/${directory}`);

                    // Ensure that the parent directory exists
                    if (!fs.existsSync(destinationPath)) {
                        fs.mkdirSync(destinationPath, { recursive: true });
                    }

                    console.log(`Copying assets from src/assets/${directory}`);
                    ncp(sourcePath, destinationPath, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                        console.log(`Assets from src/assets/${directory} copied successfully`);
                    });
                });
            },
        })),
    ],
    devServer: {
        static: path.join(__dirname, 'build'), // or whichever directory you want to serve
        port: 8080,
        open: true,
    },
};

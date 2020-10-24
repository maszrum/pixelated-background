const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: './main.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.css/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'pixelated-background.js',
        library: 'PixelatedBackground'
    },
    resolve: {
        alias: {
            dm: path.resolve(__dirname, "src")
        },
        extensions: [".ts", ".js"]
    },
    plugins: [
        new extractTextPlugin('pix-style.css')
    ]
};

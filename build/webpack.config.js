/* eslint-disable */
const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.tsx'),
        background: path.resolve(__dirname, '../src/background.ts')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader' }
        ]
    },
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, '../src')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
}

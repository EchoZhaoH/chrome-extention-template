/* eslint-disable */
const webpackMerge = require('webpack-merge');
const common = require('./webpack.config');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = webpackMerge.merge(common, {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            "process.env": "{}",
            global: {}
        }),
        new HtmlPlugin({
            template: path.resolve(__dirname, '../template/index.html'),
            excludeChunks: ['background']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../template/manifest.json'),
                    to: path.resolve(__dirname, '../dist/manifest.json')
                },
                {
                    from: path.resolve(__dirname, '../template/icon.png'),
                    to: path.resolve(__dirname, '../dist/icon.png')
                }
            ]
        })
    ]
});
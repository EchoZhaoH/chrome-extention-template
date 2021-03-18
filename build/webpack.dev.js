/* eslint-disable */
const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = webpackMerge(common, {
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000
    }
});
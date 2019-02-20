let { smart } = require('webpack-merge')
let webpack = require('webpack')

let webpackBaseConfig = require('./webpack.base.js')

module.exports = smart(webpackBaseConfig, {
    mode: 'development',
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    ],
})
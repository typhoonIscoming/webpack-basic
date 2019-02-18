let { smart } = require('webpack-merge')
let webpack = require('webpack')

let webpackBaseConfig = require('./webpack.base.js')

module.exports = smart(webpackBaseConfig, {
    mode: 'production',
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    ],
    watch: false,
})
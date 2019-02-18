let { smart } = require('webpack-merge')

let webpackBaseConfig = require('./webpack.base.js')

module.exports = smart(webpackBaseConfig, {
    mode: 'production',
})
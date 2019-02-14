// webpack 是node写出来的 需要node的写法

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development', // 模式 默认两种模式（ production, development ）
    entry: './src/index.js', // 入口  相对路径
    output: {
        filename: 'main.[hash:8].js', // 打包后的文件名，可以在文件中加上hash值，并规定hash值只有八位
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径。加载path模块，这是webpack内置模块
        // __dirname表示当前目录，也可以不加
    },
    devServer: { // 开发服务器的配置
        port: 3000,
        progress: true, // 进度条
        contentBase: './dist', // 将这个目录作为静态服务器目录
        compress: true,
    },
    plugins: [ // 存放所有webpack插件
        new HTMLWebpackPlugin({
            template: './src/index.html', // 以这个文件作为html的模版
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            hash: true, // 给生成的文件加上hash戳
        })
    ],
}
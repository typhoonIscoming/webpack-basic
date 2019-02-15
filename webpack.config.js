// webpack 是node写出来的 需要node的写法

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

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
                // collapseWhitespace: true,
            },
            hash: true, // 给生成的文件加上hash戳
        }),
        new miniCssExtractPlugin({
            filename: 'index.css',
        })
    ],
    module: {
        rules: [
            // 安装style-loader css-loader
            // 规则 css-loader 它主要是解析@import这种语法的，因为在css语法中有@import这种引入 解析路径
            // style-loader 它主要是把css插入到head标签中的
            // 为什么需要两个loader呢？因为loader的特点就是单一性
            // loader的用法 字符串（一个loader）‘css-loader’
            // 多个loader时需要数组
            // loader的顺序默认是从右向左
            // 数组中的loader还可以写成对象的方式，好处就是可以传一个参数
            // 最后将css和less模块引入到入口文件即可生效
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //         options: {
                    //             insertAt: 'top', // 在插入样式时，将模块样式插入到head标签的顶部，这样，
                    //                             //如果我们有样式写在head中，我们的样式就会覆盖相同层级的css模块中的样式
                    //         },
                    // },
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            { test: /\.less$/, use: [{
                loader: 'style-loader',
                    options: {
                        insertAt: 'top', // 在插入样式时，将模块样式插入到head标签的顶部，这样，
                                        //如果我们有样式写在head中，我们的样式就会覆盖相同层级的css模块中的样式
                    },
                },
                'css-loader',
                'less-loader', // 将less转换成css
                // 如果是使用的sass文件，则安装node-sass 和 sass-loader即可
                ]
            },
        ],
    },
}
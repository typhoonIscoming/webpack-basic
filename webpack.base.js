// webpack 是node写出来的 需要node的写法

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCSSAssetsPlugin =  require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development', // 模式 默认两种模式（ production, development ）
    entry: './src/index.js', // 入口  相对路径
    output: {
        filename: 'main.js', // 打包后的文件名，可以在文件中加上hash值，并规定hash值只有八位,main.[hash:8].js
        path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径。加载path模块，这是webpack内置模块
        // __dirname表示当前目录，也可以不加
    },
    devServer: { // 开发服务器的配置
        port: 8000,
        progress: true, // 进度条
        contentBase: './dist', // 将这个目录作为静态服务器目录
        compress: true,
        hot: true, // 启用热更新
        proxy: { // 做请求代理解决跨域的问题
            // '/api': {
            //     target: 'http://127.0.0.1:3000', // 配置一个代理地址
            //     pathRewrite: { '/api': '' },
            // },
        },
        // before(app) { // 这个app就相当于在server.js中使用express创建的express实例app
        //     app.get('/user', (req, res) => {
        //         res.json({ name: 'webpack跨域的问题' })
        //     })
        // },
    },
    devtool: 'cheap-module-eval-source-map', // 配置source-map，会增加映射文件，帮助我们调试源代码,会单独生成一个源码文件，而且出错的代码会被标记出来
    // 如果配置eval-source-map, 这样就不会生成一个map文件，但是也会将出错的代码标记出来
    // 配置成cheap-module-source-map,这样不会产生列，但是是一个单独的映射文件，产生后你可以保存起来
    // 配置成cheap-module-eval-source-map,不会产生新的文件，而是集成在打包的文件中，不会产生报错列标示
    optimization: { // webpack4提供的一个优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 是否是并发打包的,可以一起压缩多个文件
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}), // 添加了这个配置，就必须添加UglifyJsPlugin，否则js就不会被压缩
        ],
    },
    watch: true,
    watchOptions: {
        poll: 1000, // 每秒问多少次，是否需要更新
        ignored: /node_modules/, // 忽略监听哪个文件夹的文件
        aggregateTimeout: 500,
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
        }),
        new cleanPlugin([
            './dist', //参数是一个数组，数组中是需要删除的目录名
        ]),
        new webpack.ProvidePlugin({ // 在每个模块中都注入$
            $: 'jquery',
        }),
        new webpack.DefinePlugin({
            DEV: "'dev'"
        }),
        new webpack.NamedModulesPlugin(), // 可以打印更新的模块的名字
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
    ],
    module: {
        noParse: /jquery/, // 不去解析jquery中的依赖关系 如果你确定这个第三方包中没有其他的依赖，那么就可以设置不去解析这个包
        rules: [
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$',
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             enforce: 'pre', // previous 强制在前执行  post 强制在后执行
            //         },
            //     },
            //     exclude: /node_modules/,
            // },
            {
                test: /\.js$/, // 这是一个普通loader
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader 把es6转换成es5
                        presets: ['@babel/preset-env'], // 这是一个大插件的集合,preset-env就是将es6转化成es5
                        // 当然更高级的语法，还需要添加其他的插件 如类 class
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }], // 类的装饰器
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 解析类class 的插件
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    "corejs": false,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false
                                },
                            ],
                            '@babel/plugin-syntax-dynamic-import',
                            // '@babel/polyfill',
                        ]
                    },
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'), // 只对src下的js进行转换，否则它会对node_modules中的js进行转换
            },
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
                    'css-loader',
                    'postcss-loader',
                ]
            },
            { test: /\.less$/, use: [
                // {
                // loader: 'style-loader',
                //     options: {
                //         insertAt: 'top', // 在插入样式时，将模块样式插入到head标签的顶部，这样，
                //                         //如果我们有样式写在head中，我们的样式就会覆盖相同层级的css模块中的样式
                //     },
                // },
                miniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader', // 将less转换成css
                // 如果是使用的sass文件，则安装node-sass 和 sass-loader即可
                ]
            },
        ],
    },
}
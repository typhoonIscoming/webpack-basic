## 多入口页面的配置
```
let path = require('path')
let htmlWebpackPlugin = require('html-webpack-plugin') // 这个插件的作用就是用模版产生html，并自动把js引进去
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        a: './src/a.js',
    },
    output: {
        filename: '[name].js', // [name]表示入口模块的名字
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html', // 选择那个文件作为html的模版文件
            filename: 'index.html', // 如果有两个入口，就要new两次这个插件
            // 如果这个html中两个js文件都需要，那么就在chunks中添加两个文件
            chunks: ['index', 'a'],
        }),
        new htmlWebpackPlugin({
            template: './src/index.html', // 选择那个文件作为html的模版文件
            filename: 'a.html', // 如果有两个入口，就要new两次这个插件
            // 这样配置，它会默认把index.js 和 a.js这两个文件都引入这两个html文件中
            // 期望index.html引入index.js  a.html引入a.js
            // 可以配置chunks
            chunks: ['index'],
        }),
     ],
}
```
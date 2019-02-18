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

## 在打包文件中产生映射文件，方便我们调试
- devtool: 'source-map', // 增加映射文件，帮助我们调试源代码,会单独生成一个源码文件，而且出错的代码会被标记出来
- 如果配置eval-source-map, 这样就不会生成一个map文件，但是也会将出错的代码标记出来
- 配置成cheap-module-source-map,这样不会产生列，但是是一个单独的映射文件，产生后你可以保存起来
- 配置成cheap-module-eval-source-map,不会产生新的文件，而是集成在打包的文件中


## 实时打包代码
- webpack-dev-server是实时运行改变后的代码，并不能生成打包的代码
- 在配置中设置watch: true,这样webpack就会监听代码，只要改变了代码，就会实时打包
- watch也有配置选项，即配置 watchOptions
```
watchOptions: { // 监听的选项
    poll: 1000, // 每秒问多少次，是否需要更新
    ignored: /node_modules/, // 忽略监听哪个文件夹的文件
    aggreamentTimeout: 500, // 在保存文件之后500ms打包，即防抖 和 节流操作
}
```







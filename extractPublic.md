## 多页应用抽离公共代码

- 如：有a.js 和 b.js两个公共模块，在index.js中和other.js两个文件中都需要这两个模块，那么将a b缓存起来，就不需要都把公共模块打包进入口代码中了
```
entry: { // 多页面
    index: './src/index.js',
    other: './src/other'
},
output: { // 出口页面
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
},
------ 此时，如果index.js和other.js中引入了a b模块，那么这两个模块的代码都分别被打进了这两个文件中
// 增加 optimization
optimization: { // 优化  在webpack4之前叫 commonChunkPlugins
    splitChunks: { // 分割代码块,把公共的分离出来
        cacheGroups: { // 缓存组
            common: { // 公共模块   公共模块满足的条件就进行抽离
                minSize: 0, // 大于0字节
                minChuncks: 2, // 公共模块被引入多少次，就单独抽离出来
                chunks: 'initial', // 从哪里开始就抽离代码，还有异步模块
            },
            vendor: { // 第三方 第三方的模块也单独抽离出来
                priority: 1, // 设置权重，先抽取第三方的模块 
                test: /node_modules/, // 只要引用了node_modules中的文件，就单独抽离出来
                minSize: 0, // 大于0字节
                minChuncks: 2, // 公共模块被引入多少次，就单独抽离出来
                chunks: 'initial', // 从哪里开始就抽离代码，还有异步模块
            },
        },
    },
}
```
## 懒加载

- 在入口文件中，一个点击事件中使用import引入模块
```
// 安装@babel/plugin-syntax-dynamic-import插件
// webpack.base.js
plugins: ['@babel/plugin-syntax-dynamic-import'],
// index.js
btn.addEventListener('click', function(){
    import('./source.js').then((res) => { // es6草案中的语法，用jsonp实现动态加载文件
        console.log('print lazy load module', res)
    })
})
// Add @babel/plugin-syntax-dynamic-import (https://git.io/vb4Sv) to the 'plugins' section of your Babel config to enable parsing

// 添加配置
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import'
                    ]
                },
            },
        }
    ],
}
```

## 热更新

- 在之前，当文件被更改之后，它会重新加载所有的模块，我们希望我们改变了某个模块，就只重新加载这个模块
- 在devServer: { hot: true }, // 它需要一个插件来支持
- webpack.HotModuleReplacementPlugin() // 热更新插件
```
import source from './source'
if(module.hot) { // 如果模块支持热更新
    module.hot.accept('./source', () => { // 在完成热更新的回调
        // 在完成热更新后，重新加载这个模块，这样页面就拿到更新后的source，同时不会刷新页面
        let source = require('./source'); // import只能用在页面顶部
        console.log('file is been reload', source)
    })
}
```














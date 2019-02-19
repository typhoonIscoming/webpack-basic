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

















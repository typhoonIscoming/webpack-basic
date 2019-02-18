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
    aggregateTimeout: 500, // 在保存文件之后500ms打包，即防抖 和 节流操作
}
```

## webpack解决跨域的问题
- 创建一个服务文件server.js启动一个服务（vscode中安装code runner插件右键点击Run Code即可运行这个单文件）
- 在入口页面中建立一个ajax异步请求任务
- 在webpack.config.js中配置本地服务的参数devServer
```
devServer: {
    proxy: { // 做请求代理解决跨域的问题
        '/api': {
            target: 'http://127.0.0.1:3000', // 配置一个代理地址
            pathRewrite: { '/api': '' }, // 后端接口地址一般不会加api，前端将地址中的api进行重写
        }
    },
}
```
------
- 有时候我们不需要做代理，我们只需要前端mock一些假数据。
- webpack-dev-server内部就是用express模块的，我们可以直接在配置里面写接口。直接在devServer中写一个方法before，这是webpack-dev-server提供的方法，相当于钩子函数
```
devServer: {
    before(app) { // 这个app就相当于在server.js中使用express创建的express实例app
        app.get('/user', (req, res) => {
            res.json({ name: 'webpack跨域的问题' })
        })
    },
}
```
------
- 第三种：有服务端，但是不想用代理来处理。能不能在服务端中启动webpack，端口用服务端端口，相当于在服务端启动页面，前端和服务端启动在一个端口上，这样也不会有跨域问题

- 这里就不是运行webpack,而是运行服务端了,在服务端引入webpack,并且需要使用webpack的中间件 webpack-dev-middleware
- npm i webpack-dev-middleware -d
- 在server.js中增加代码
```
// 使用服务端启动页面，引入webpack和中间件
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config')
let compiler = webpack(config)
app.use(middle(compiler))
```
- 启动server文件，在页面访问localhost:3000,就能拿到页面。
- 这就是后端和前端启动在一起。
- 以上就是前端解决跨域的三种方式


## resolve配置
- 在代码中我们会引用一些模块，有些模块是从第三方模块中引入
- 在common.js规范中，先查找当前目录下的node_modules,如果找不到，就往上一层找
- 我们可以配置，强制在哪个文件夹中查找
```
resolve: {
    modules: [path.resolve('node_modules'), path.resolve('src/js')], // 只在这两个文件夹中查找
}
```
- 我们在页面中导入样式 import ‘bootstrap’;
- 在导入这个模块的时候，webpack会先去node_modules查找这个模块，他会默认去获取bootstrap -> package.json(main)所配置的文件，即dist/js/bootstrap文件，他是把js文件拿过来了，
- 例：
```
// 在html中添加一个button，并设置danger类<button class="btn btn-danger"></button>
// 在index.js中引入 bootstrap, import ‘bootstrap’
// 这个样式是不会生效的
// 解决办法可以是引入这个css文件，即：import 'bootstrap/dist/css/bootstrap.css'; 这样就能看到bootstrap的danger类按钮样式
// 还可以给这个文件配置一个别名
resolve: {
    alias: { // 配置别名
        bootstrap: 'bootstrap/dist/css/bootstrap.css',
    },
}
// 还可以设置查找模块的主入口
resolve: {
    mainFields: ['style', 'main'], // 这样就会先找对应模块中package.json中配置的style所对应的文件，再找main所对应的文件
}
// 还可以配置文件扩展名
resolve: {
    extensions: ['css', 'js', 'json'], // 这样导入 import './index'时，会先查找index.css，找不到就找index.js、index.json
}
```

## 定义环境变量
```
plugins: [
    new webpack.DefinePlugin({
        DEV: "'dev'", // 定义环境变量，注：只写一个引号，会报错，在页面拿DEV时，提示dev未定义，页面将dev当作变量了
        // 或者写成 DEV: JSON.stringify('dev')
        // webpack是将单引号中的当作一个语句或变量
        // flag: 'true', // 页面拿flag就是一个boolean值  extenssion: '1+1', // 页面就拿到1+1这个表达式的结果2
    })
]
```










## webpack可以看作是一个模块打包机。他做的事情就是分析你的项目结构，找到javascript模块以及其他浏览器不能直接运行的拓展语言（scss, typescript）,并将其打包成合适的格式以供浏览器使用

- 可以做的事：文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布。

- 需要掌握的基础： 需要node基础、以及使用npm、掌握es6语法

- 需要掌握webpack的基础： webpack常见配置、webpack高级配置、webpack优化配置、ast抽象语法树、webpack中的tapable、掌握webpack流程，手写webpack、手写webpack常见loader、手写常见的plugin

## webpack安装
- 安装本地webpack
- webpack webpack-cli -D

## webpack可以进行0配置
- 打包工具 -> 输出最后结果（js模块）

- 执行webpack命令，可以使用webpack提供的npx webpack命令 或者 npm run dev
- 执行这个命令，它会默认去找node_modules下的.bin文件夹中的webpack.cmd
- webpack默认执行的打包地址是src/index.js,所以要把代码放在src目录下

- 在index.js中导入a.js，在浏览器中是不会被浏览器所执行。webpack帮我们解析js模块，查找所以相关的模块，并打包成一个文件，解决了浏览器的require的问题，相当于它自己实现了模块化的机制

## 手动配置webpack

- 默认配置文件的名字 webpack.config.js
- 在node_modules中的webpack-cli -> bin -> config-yargs.js（line 74）配置文件可以是webpack.config.js 或者 webpackfile.js，一般我们选用webpack.config.js，当然也可以不用这两个名字
- 可以设置成其他名字如：webpack.config.my.js, 在package.json中的scripts命令中配置“named: webpack --config webpack.config.my.js”;这样在执行webpack的时候，就知道配置文件是重新改名的这个文件了


## 我们需要在本地启一个服务，可以使用webpack-dev-server

- 在package.json中配置脚本，用以启用webpack-dev-server；"dev": "webpack-dev-server"
- 在webpack.config.js中配置devServer: {}

## 在webpack中配置css模块

- webpack默认是支持js模块的，我们希望css文件也变成一个模块。在index.js文件中引入require('./index.css)，此时webpack会报错Module parse failed, You may need an appropriate loader to handle this file type
- 模块解析失败，你可能需要一个合适的loader去处理这个文件
- 具体配置查看webpack.config.js中的module.rules


## 在webpack引入css模块后，都是引入样式到style标签中，这样如果样式很多的化，可能会造成页面阻塞的问题，所以我们希望能放在link标签中
- 这就需要用到mini-css-extract-plugin插件，它是专门用来抽离css文件的插件 npm i mini-css-extract-plugin -d
- 在webpack.config.js中引入 const miniCssExtractPlugin = require('mini-css-extract-plugin')
- 在模块的的rules中使用这个插件的loader，表示将这个css模块通过link标签添加到页面中
- 将style-loader替换成miniCssExtractPlugin.loader即可这样打包之后的html页面就有link标签引入的样式了，并且在打包的文件中多了一个样式的文件
- 注：在使用miniCssExtractPlugin时，会给一个模块设置filename，多个模块要设置不同的名字，可以多创建几个miniCssExtractPlugin实例

## 我们希望在生成的css模块中，能自动加上浏览器前缀，这时就需要用到autoprefixer，处理这个插件也需要一个loader，postcsss-loader
- 在编译成css文件之前使用这个loader，即在需要这个插件的模块中，在编译成css文件之前，对样式模块文件先做处理，即在css-loader后面添加这个loader
- 需要在项目根目录添加一个配置文件。因为此时，webpack还不知道是不是使用autoprefixer这个插件。如果不加，会报一个 No PostCSS Config found in: /Users/xiehang/Desktop/vue-prictise/webpack-basic/src 的错误
- 添加postcss.config.js文件  module.exports = { plugins: [require('autoprefixer')] } 即可

## 压缩生成的css文件
- 如果使用mini-css-extract-plugin，那么我们就要手动去压缩js文件
- webpack4提供了一个优化项 optimization ，下载 optimize-css-assets-webpack-plugin 插件
- 安装了 optimize-css-assets-webpack-plugin 这个插件，就必须安装 uglifyjs-webpack-plugin 插件，否则，js就不会被压缩
- 注，在使用过程中，报了这个错误
- ERROR in main.63f76874.js from UglifyJs
- Unexpected token: name (A) [./src/index.js:2,0][main.63f76874.js:92,4]
- 是在 UglifyJs 处理js报错，还不支持es6 命名的变量和语法
- 后期会进行babel的配置
- 这样打包出来的文件 css js都被压缩了

## 每次打包生成一个新的dist文件，将上一次的文件夹删除
- npm i clean-webpack-plugin -d
- plugins: [ new CleanWebpackPlugin([ "./dist"]) ]

## 处理js模块
### 将es6 转成 es5

- 需要用到babel
- 安装babel  npm i babel-loader @babel/core(babel核心模块) @babel/preset-env（转换所有的js语法）  -d
- 在js模块中配置js规则
- 当然更高级的语法，还需要添加其他的插件 如类 class
```
    options: {
        plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }], // 类的装饰器
            ["@babel/plugin-proposal-class-properties", { "loose" : true }], // 解析类class 的插件
        ]
    }
```

- 对于es6中class generator等语法，这是内置的API，在将js模块转换成es5时，它也不会转换成es5的代码，所以此时，需要用到
- @babel/plugin-transform-runtime 这是一个开发依赖
- npm install --save @babel/runtime
- 并且会将公共的方法抽离出来，这样在转换不同模块的相同的语法和API时，就不会有冗余代码
-如果遇到更高级的代码，如'abcde'.includes('a'), includes是es7的语法，对于实例上的方法，babel是不会转换的，这时就需要ployfill这个包了
- @babel/polyfill 这是一个生产依赖，上线也需要带着这个

## 添加eslint代码规范
- 在eslint官网上 [demo](https://eslint.org/demo/),可以配置你的代码中需要的代码规范，然后下载规范的json文档，再添加到项目中
- 安装eslint, npm i eslint eslint-loader



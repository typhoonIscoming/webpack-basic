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

## webpack可以看作是一个模块打包机。他做的事情就是分析你的项目结构，找到javascript模块以及其他浏览器不能直接运行的拓展语言（scss, typescript）,并将
- 其打包成合适的格式以供浏览器使用

- 可以做的事：文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布。

- 需要掌握的基础： 需要node基础、以及使用npm、掌握es6语法

- 需要掌握webpack的基础： webpack常见配置、webpack高级配置、webpack优化配置、ast抽象语法树、webpack中的tapable、掌握webpack流程，手写webpack、手写webpack常见loader、手写常见的plugin

## webpack安装
- 安装本地webpack
- webpack webpack-cli -d

## webpack可以进行0配置
- 打包工具 -> 输出最后结果（js模块）

- 执行webpack命令，可以使用webpack提供的npx webpack命令
- 执行这个命令，它会默认去找node_modules下的.bin文件夹中的webpack.cmd
- webpack默认执行的打包地址是src/index.js,所以要把代码放在src目录下






// webpack 是node写出来的 node的写法

const path = require('path')

module.exports = {
    mode: 'development', // 模式（ production, development ）
    entry: './src/index.js', // 入口  相对路径
    output: {
        filename: 'bundle.js', // 打包后的文件名
        path: path.resolve(__dirname,'bundle'), // 路径必须是一个绝对路径。加载path模块，这是webpack内置模块
        // __dirname表示当前项目的根目录，也可以不加
    },
}
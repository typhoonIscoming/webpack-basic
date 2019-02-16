
## 如何在webpack中使用图片，并且打包图片
- 图片的使用
1. 在js中创建图片来引入；import logo from './logo.png' 
2. 在css中通过background引入
3. 在img标签中使用

- 使用第一种的方式，webpack就要报错，需要file-loader，file-loader会默认在内部生成一张图片到dist目录下，并且把生成的图片的名字返回回来
```
npm i file-loader -d
---
module: {
    rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: 'file-loader',
        }
    ]
}
---
使用
import logo from './logo.png'
let image = new Image()
image.src = logo
document.body.appenChild(image)

```
- 在css中使用background添加图片，在css-loader中已经做了处理，默认就能使用。如background: url('./logo.png'); 在css-loader中做的处理是background: url(require('./logo.png'))

- 在img标签中引入图片，需要用到html-withimg-loader, 它专门处理标签中的图片的引入
```
module: {
    rules: [
        {
            test: /\.html$/,
            use: 'html-withimg-loader',
        }
    ]
}
```
- 在实际情况中我们不会直接用file-loader，页面上用的图片非常小，我们不希望发送http请求，我们希望把图片变成base64，我们就需要用到url-loader。
- 这个loader，我们可以做一个限制，当图片小于多少KB,我们就将图片转换成base64，否则用file-loader来产生真实的图片
```
module: {
    rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader',
            options: {
                limit: 200*1024, // 小于200kb，就转换成base64 
            },
        }
    ]
}
```

## 给打包出来的文件进行分类，如：将所有的图片资源放在一个文件夹，将所有的js和css分别放在另外的文件夹
```
plugin: [
    new miniCssExtractPlugin({
        filename: 'css/index.css', // 将样式文件打包到css文件夹下
    }),
],
module: {
    rules: [
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader',
            options: {
                limit: 200*1024, // 小于200kb，就转换成base64
                outputPath: '/images/', // 将图片都存放在images文件夹下
            },
        }
    ]
},
```
- 在最后运行，我们的文件都会在服务器上，我们在引用的时候希望能加上域名，即域名下的某个文件夹下的文件
- 此时，我们可以配置publicPath: '/'
```
output: {
    filename: 'main.js', // 打包后的文件名，可以在文件中加上hash值，并规定hash值只有八位,main.[hash:8].js
    path: path.resolve(__dirname,'dist'), // 路径必须是一个绝对路径。加载path模块，这是webpack内置模块
    // __dirname表示当前目录，也可以不加
    publicPath: '/',  // 这样在引用公共资源的时候，统一加上这个路径
},
// 也可以只在图片的loader中加上publicPath: '/', 这样其他的资源就不会加上这个域名了
rules: [
    {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader',
        options: {
            limit: 200*1024, // 小于200kb，就转换成base64
            outputPath: '/images/', // 将图片都存放在images文件夹下
            publicPath: '/',
        },
    }
]
```











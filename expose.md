
## 将引入的插件暴露到全局变量window中
- 在文件中引入插件 如： import $ from 'juqery'
- console.log(window.$)  // undefine
- 此时就需要用到expose-loader。它是专门将插件暴露到全局中
- npm i expose-loader
- 使用 如引入jquery: import $ from 'expose-loader?$!jquery'
- expose-loader 暴露全局的loader （内联loader）
- pre（前置loader） normal（普通loader） 内联loader  post（后置loader）
- 也可以配置到webpack中
```
module: {
    rules: [
        {
            test: require.resolve('juqery'),
            use: 'expose-loader?$',
        },
    ]
}
```

### 在每个模块中注入$对象

- 在webpack配置中引入webpack, webpack提供了一个provideplugin方法,在每个模块中都注入$
```
plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
    }),
]
```
- 但是这样就没有将jquery暴露在window对象中了

- 如果在文件中通过import $ from 'jquery',同时在html页面中通过cdn等方式又引入了jquery，<script src='https://code.jquery.com/jquery-3.3.1.min.js'></script>, 这样，webpack还是会将jquery打包，这样就造成打包文件很大。
- 可以添加配置 externals
```
externals: {
    jquery: '$'
}
```
- 这样jquery就不会被进行打包
- 现在，我们就知道有几种引入第三方插件的方式
   1）使用expose-loader， 暴露到window上
   2）providePlugin，给每个模块提供一个$
   3) 引入cdn，但是不打包





## 解析webpack打包后的文件代码

- 打包后的代码结构

```
(fucntion(modules){

})({
    "./src/a.js": (function(module, exports){
        eval(...)
    }),
    "./src/index.js": (function(module, exports){
        eval(...)
    })
})

```
- 将所有模块作为一个对象传进匿名自执行函数中，对象中的key是模块的路径，value是匿名函数体
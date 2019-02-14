## 解析webpack打包后的文件代码

- 打包后的代码结构

```
(fucntion(modules){
    // 先定义一个缓存 如果模块加载完了，不需要再次加载模块，就直接在缓存中去拿
 	var installedModules = {};
    // webpack中require方法的实现
    function __webpack_require__(moduleId) {

 		// Check if module is in cache
        // 查看模块是否存在缓存中，如果存在就return
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
        // 如果模块不存在，就新定义一个模块名
        // 每一个模块就是key-value的一个对象，key就是模块的路径，value是一个对象（moduleId， 状态，exports对象）
 		var module = installedModules[moduleId] = {
 			i: moduleId, // 模块id
 			l: false, // 是否加载完成
 			exports: {}
 		};
 		// Execute the module function
        // 在传进来的对象中找到当前模块并call执行
 		modules[moduleId].call(module.exports（this指向）, module, module.exports（模块空对象）, __webpack_require__（require实现方法）);

 		// Flag the module as loaded
        // 模块加载成功
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
})({
    "./src/a.js": (function(module, exports){
        eval("function add(a, b) { return a + b } module.exports = {add : add}//# sourceURL=webpack:///./src/a.js?")
    }),
    "./src/index.js": (function(module, exports){
        eval("const pluginA = __webpack_require__(\"./src/a.js\")console.log('this is my first webpack prictise')console.log('1 plus 2 equal', pluginA.add(1,2))//# sourceURL=webpack:///./src/index.js?");

    })
})

```
- 将所有模块作为一个对象传进匿名自执行函数中，对象中的key是模块的路径，value是匿名函数体
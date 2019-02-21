let { SyncHook  } = require('tapable')

class Lession{
    constructor() {
        this.hooks = { // 订阅一些钩子，然后用lession的实例来启动这些钩子
            arch: new SyncHook(['name']), // 定义了一个钩子，可以订任意个
        }
    }
    tap() { // 注册监听函数
        // 钩子上有一个tap注册事件
        this.hooks.arch.tap('node', function(name ) { // 回调函数
            console.log('node watched', name)
        });
        this.hooks.arch.tap('js', function(name ) { // 回调函数
            console.log('js watched', name)
        });
    }
    start() {
        this.hooks.arch.call('xiehang')
    }
}


let l = new Lession()
l.tap(); // 注册了其中的事件
l.start(); // 启动钩子

// 原理就是，当调用实例方法tap()时，这个syncHook会将这其中注册的事件注册在一个数组中
// 在调用start事件时，会将这两个事件依次执行
// this.hooks.arch.call('xiehang')，这个call即是执行事件，并传递一个参数进去
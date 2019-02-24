let { AsyncParallelHook  } = require('tapable')

class Lession{
    constructor() {
        this.hooks = { // 订阅一些钩子，然后用lession的实例来启动这些钩子
            arch: new AsyncParallelHook(['name']), // 定义了一个钩子，可以订任意个
        }
    }
    tap() { // 注册监听函数
        // 钩子上有一个tapAsync注册事件,异步注册事件
        // this.hooks.arch.tapAsync('node', function(name, cb ) { // 回调函数
        //     setTimeout(() => {
        //         console.log('node watched', name)
        //         cb()
        //     }, 1000)
        // });
        // this.hooks.arch.tapAsync('js', function(name, cb ) { // 回调函数
        //     setTimeout(() => {
        //         console.log('js watched', name)
        //         cb()
        //     }, 1000)
        // });
        /********************tapPromise注册事件*************************/
        this.hooks.arch.tapPromise('node', function(name){
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    console.log('node', name)
                    resolve()
                }, 1000)
            })
        })
        this.hooks.arch.tapPromise('js', function(name){
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    console.log('js', name)
                    resolve()
                }, 1000)
            })
        })
        /*************************************************************/
    }
    start() {
        // this.hooks.arch.callAsync('xiehang', function() {
        //     console.log('all of events registered has been executed')
        // })
        /*********************tapPromise执行事件***********************/
        this.hooks.arch.promise('xiehang').then(() => {
            console.log('all of events registered has been executed')
        })
        /*************************************************************/
    }
}


let l = new Lession()
l.tap(); // 注册了其中的事件
l.start(); // 启动钩子
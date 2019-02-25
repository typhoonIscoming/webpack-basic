let { AsyncSeriesWaterfallHook } = require('tapable') 

class Lession{
    constructor(){
        this.index = 0
        this.hooks = {
            archs: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tap(){
        this.hooks.archs.tapAsync('node', function(name, cb){
            setTimeout(() => {
                console.log('node', name)
                // 第一个参数是null, 标示没有错误，第二个参数表示传给下一个函数的参数
                // 如果第一个参数不是null, 那么就中断后面的函数的执行，直接执行最后的回调函数
                cb(null, 'result');
            }, 1000)
        })
        this.hooks.archs.tapAsync('js', function(data, cb){
            setTimeout(() => {
                console.log('js', data)
                cb(null, 'js')
            }, 1000)
        })
        this.hooks.archs.tapAsync('vue', function(data, cb){
            setTimeout(() => {
                console.log('vue', data)
                cb()
            }, 1000)
        })
    }
    start(){
        this.hooks.archs.callAsync('xiehang', function() {
            console.log('callback function is been execute')
        })
    }
}


let hook = new Lession()
hook.tap()
hook.start()
























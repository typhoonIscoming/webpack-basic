let { AsyncSeriesHook } = require('tapable') 

class Lession{
    constructor(){
        this.index = 0
        this.hooks = {
            archs: new AsyncSeriesHook(['name'])
        }
    }
    tap(){
        this.hooks.archs.tapAsync('node', function(name, cb){
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    console.log('node', name)
                    cb()
                }, 1000)
            })
        })
        this.hooks.archs.tapAsync('vue', function(name, cb){
            return new Promise(function(resolve, reject){
                setTimeout(() => {
                    console.log('vue', name)
                    cb()
                }, 1000)
            })
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
























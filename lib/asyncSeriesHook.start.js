class asyncSeriesHook{
    constructor(args){
        this.tasks = []
    }
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        console.log('...args', args)
        let finalCallback = args.pop()
        let index = 0
        let next = () => {
            if(this.tasks.length === index) return finalCallback()
            let task = this.tasks[index++];
            task(...args, next)
        }
        next()
    }
}

let hook = new asyncSeriesHook(['name'])

hook.tapAsync('webpack', function(name, cb){
    setTimeout(() => {
        console.log('webpack', name)
        cb(name, 'webpack')
    }, 2000)
})
hook.tapAsync('vue', function(name, cb){
    setTimeout(() => {
        console.log('vue', name)
        cb()
    }, 1000)
})

hook.callAsync('xiehang', function() {
    console.log('xiehang finshed all lessions' )
})






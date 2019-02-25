class asyncSeriesWaterfallHook{
    constructor(args){
        this.tasks = []
    }
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let index = 0;
        let finalCallback = args.pop();
        let next = (err, data) => {
            let task = this.tasks[index];
            if(!task || err) return finalCallback();
            if(index === 0) {
                task(...args, next)
            } else {
                task(data, next)
            }
            index++
        }
        next()
    }
}



let hook = new asyncSeriesWaterfallHook(['name'])

hook.tapAsync('webpack', function(name, cb){
    setTimeout(() => {
        console.log('webpack', name)
        cb(null, name)
    }, 1000)
})
hook.tapAsync('vue', function(data, cb){
    setTimeout(() => {
        console.log('vue', data)
        cb(null, data)
    }, 1000)
})

hook.callAsync('xiehang', function() {
    console.log('xiehang finshed all lessions' )
})


















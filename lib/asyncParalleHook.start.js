
class asyncParalleHook{
    constructor(args) {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        let fianlCallback = args.pop();
        let index = 0;
        let done = () => {
            index++;
            if(index === this.tasks.length) fianlCallback()
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}


let hook = new asyncParalleHook(['name']);
let total = 0;
hook.tapAsync('webpack', function(name, cb) {
    setTimeout(() => {
        console.log('webpack', name)
        cb()
    }, 1000)
})

hook.tapAsync('node', function(name, cb) {
    setTimeout(() => {
        console.log('node', name)
        cb()
    }, 1000)
})

hook.callAsync('xiehang', function() {
    console.log('当注册事件都执行完之后，才会执行这个回调。')
    console.log('all of events registered has been executed')
})



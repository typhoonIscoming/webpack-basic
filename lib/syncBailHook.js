class SyncBailHook{ // 定义一个同步钩子
    constructor(args) { // args即是实例化传递进来的参数，即 args => ['name']
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        // this.tasks.forEach((task) => task(...args))
        let ret; // 当前函数的返回值
        let index = 0; // 当前函数的索引
        do{
            ret = this.tasks[index++](...args)
        } while(ret === undefined && index < this.tasks.length)
    }
}




let hook = new SyncBailHook(['name'])

hook.tap('node', function(name) {
    console.log('node', name)
    return 'stop'
})
hook.tap('js', function(name) {
    console.log('js', name)
})

hook.call('xiehang')
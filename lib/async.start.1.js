class SyncHook{ // 定义一个同步钩子
    constructor(args) { // args即是实例化传递进来的参数，即 args => ['name']
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach((task) => task(...args))
    }
}




let hook = new SyncHook(['name'])

hook.tap('node', function(name) {
    console.log('node', name)
})
hook.tap('js', function(name) {
    console.log('js', name)
})

hook.call('xiehang')










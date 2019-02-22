
// 将上一个函数的返回值传给下一个函数
class SyncWaterfallHook{ // 定义一个同步钩子
    constructor(args) { // args即是实例化传递进来的参数，即 args => ['name']
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let [ first, ...others] = this.tasks
        let ret = first(...args);
        others.reduce((a,b) => {
            console.log('a', a)
            return b(a)
        }, ret)
    }
}




let hook = new SyncWaterfallHook(['name'])

hook.tap('node', function(name) {
    console.log('node', name)
    return 'node'
})
hook.tap('js', function(name) {
    console.log('js', name)
    return 'js'
})
hook.tap('css', function(name) {
    console.log('css', name)
})
hook.call('xiehang')



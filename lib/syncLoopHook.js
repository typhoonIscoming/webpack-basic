
// 同步函数遇到某个不返回undefined的函数，会多次执行 
class SyncLoopHook{ // 定义一个同步钩子
    constructor(args) { // args即是实例化传递进来的参数，即 args => ['name']
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do{
                ret = task(...args)
            } while(ret !== undefined)
        })
    }
}




let hook = new SyncLoopHook(['name'])
let total = 0
hook.tap('node', function(name) {
    console.log('node', name)
    return ++total === 3 ? undefined : 'do 3 times'
})
hook.tap('js', function(name) {
    console.log('js', name)
})
hook.tap('css', function(name) {
    console.log('css', name)
})
hook.call('xiehang')



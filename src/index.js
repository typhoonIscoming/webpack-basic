

var tool = require('./a')
require('./index.css')
require('./index.less')

import moment from 'moment'


import 'bootstrap/dist/css/bootstrap.css'
// import $ from 'jquery'; // 将jquery暴露成全局变量$
console.log('实时打包')
console.log('print environment var xixixixix', DEV)
let fn = () => {
    console.log('this is es6 syntax')
}
fn()


import 'moment/locale/zh-cn'

const r = moment().endOf('day').fromNow()
console.log('print dateTime', r)

// @log
// class A {
//     a = 12;
// }
// let a = new A()

// function log(target){
//     console.log('类的装饰器class decorators', target)
// }
// console.log('this is class A', a.a)
console.log('this is my first webpack prictise')
console.log('9 plus 2 equal', tool.add(9,2))

// console.log($, window.$)

// let xhr = new XMLHttpRequest();

// xhr.open('GET', '/user', true)

// xhr.onload = function(res) {
//     console.log(xhr.response)
//     const { response } = res.target
//     if(res.target.status === 200) {
//         const html = document.createElement('p')
//         html.innerText = response
//         document.getElementsByClassName('content')[0].append(html)
//     }
// }
// xhr.send();

const btn = document.getElementsByClassName('btn')[0]

btn.addEventListener('click', function(){
    import('./source.js').then((res) => {
        // 它会将导入的结果放在default上，res.default即导入的结果
        console.log('print lazy load result = ', res.default)
    })
})
import source from './source'
if(module.hot) { // 如果模块支持热更新
    module.hot.accept('./source', () => {
        let source = require('./source')
        console.log('file is been reload', source)
    })
}


let obj = {
    a: {
        value: 10,
        b: {
            total: 11,
        }
    },
    c: {
        value: 10,
        b: {
            total: 11,
        }
    },
    e: {
        value: 10,
        b: {
            total: 11,
        }
    },
}

let newObj = []
for(let key in obj){
    newObj.push({ code: key, newvalue: obj[key].value || '', newTotal: obj[key].b.total || '' })
}
console.log('newobj', newObj)

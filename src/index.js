

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

const r = moment().endof('day').fromNow()
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


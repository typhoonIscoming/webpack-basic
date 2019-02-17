

var tool = require('./a')
require('./index.css')
require('./index.less')
// import $ from 'jquery'; // 将jquery暴露成全局变量$

console.lo('xixix')
let fn = () => {
    console.log('this is es6 syntax')
}
fn()

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

console.log($, window.$)
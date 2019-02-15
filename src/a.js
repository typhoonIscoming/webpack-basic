

require('@babel/polyfill')


function add(a, b) {
    const domElement = document.getElementsByClassName('plus-content')[0]
    domElement.innerHTML = (a + b)
    return a + b
}

// class B{
//     b = 20;
// }

// function * gen(){
//     yield 1;
//     return 2
// }
// let g = new gen();
// const a = g.next();
// const b = g.next(3)
// console.log('this is genaretor function', a, b)




module.exports = {
    add: add,
}
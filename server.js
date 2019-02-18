
let express = require('express');

let app = express()


// 使用服务端启动页面，引入webpack和中间件
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');

let config = require('./webpack.base')
let compiler = webpack(config)
app.use(middle(compiler))



// // 这样写的话，默认是访问http://localhost:8080/api/user
// // 请求这个地址是webpack-dev-server通过express模块创建的服务，我们可以再通过服务转发到端口是3000的地址
app.get('/user', (req, res) => {
    res.json({ name: 'webpack跨域的问题' })
})




app.listen(3000, 'localhost', function(){
    const host = this.address().address
    const port = this.address().port
    console.log('访问地址为 http://%s:%s', host, port)
})



 


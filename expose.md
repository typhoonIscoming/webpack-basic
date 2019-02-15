
## 将引入的插件暴露到全局变量window中
- 在文件中引入插件 如： import $ from 'juqery'
- console.log(window.$)  // undefine
- 此时就需要用到expose-loader。它是专门将插件暴露到全局中
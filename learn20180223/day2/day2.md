# day2

1. 复习
2. npm 模块的require
3. 路径 path
   path.resolve()
4. 封装模块
5. post请求 addListener
   buf.toString() 将二进制内容转化为字符串
6. formidable 文件上传 util.inspect

### API

* `req.addListener("data",function(){})`
* `req.addListener("end",function(){})`
* `path.extname`
* `path.basename`
* `fs.access` `err.code == 'ENOENT'`

    `err.code` 错误系列

    * `EACCES` (拒绝访问): 试图以被一个文件的访问权限禁止的方式访问一个文件。
    * `EADDRINUSE` (地址已被使用): 试图绑定一个服务器（net、http 或 https）到本地地址，但因另一个本地系统的服务器已占用了该地址而导致失败。
    * `ECONNREFUSED` (连接被拒绝): 无法连接，因为目标机器积极拒绝。 这通常是因为试图连接到外部主机上的废弃的服务。
    * `ECONNRESET` (连接被重置): 一个连接被强行关闭。 这通常是因为连接到远程 socket 超时或重启。 常发生于 http 和 net 模块。
    * `EEXIST` (文件已存在): 一个操作的目标文件已存在，而要求目标不存在。
    * `EISDIR` (是一个目录): 一个操作要求一个文件，但给定的路径是一个目录。
    * `EMFILE` (系统打开了太多文件): 已达到系统文件描述符允许的最大数量，且描述符的请求不能被满足直到至少关闭其中一个。 当一次并行打开多个文件时会发生这个错误，尤其是在进程的文件描述限制数量较低的操作系统（如 macOS）。 要解决这个限制，可在运行 Node.js 进程的同一 shell 中运行 ulimit -n 2048。
    * `ENOENT` (无此文件或目录): 通常是由 fs 操作引起的，表明指定的路径不存在，即给定的路径找不到文件或目录。
    * `ENOTDIR` (不是一个目录): 给定的路径虽然存在，但不是一个目录。 通常是由 fs.readdir 引起的。
    * `ENOTEMPTY` (目录非空): 一个操作的目标是一个非空的目录，而要求的是一个空目录。 通常是由 fs.unlink 引起的。
    * `EPERM` (操作不被允许): 试图执行一个需要更高权限的操作。
    * `EPIPE` (管道损坏): 写入一个管道、socket 或 FIFO 时没有进程读取数据。 常见于 net 和 http 层，表明远端要写入的流已被关闭。
    * `ETIMEDOUT` (操作超时): 一个连接或发送的请求失败，因为连接方在一段时间后没有做出合适的响应。 常见于 http 或 net。 往往标志着 socket.end() 没有被正确地调用。

* `fs.mkdir`
* `fs.rename`
* formidable


express 相对于nodejs
就相当于 jquery相对于javascript
只是封装了好多东西 , 让nodejs使用起来更加简便

* module 模块

如果传递给 require() 的模块标识符不是一个核心模块，也没有以 '/' 、 '../' 或 './' 开头，则 Node.js 会从当前模块的父目录开始，尝试从它的 /node_modules 目录里加载模块。 Node.js 不会附加 node_modules 到一个已经以 node_modules 结尾的路径上。

如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录。

想要获得调用 `require()` 时加载的确切的文件名，使用 `require.resolve()` 函数。

综上所述，以下用伪代码描述的高级算法，解释 `require.resolve()` 做了些什么：

```txt
从 Y 路径的模块 require(X)
1. 如果 X 是一个核心模块，
   a. 返回核心模块
   b. 结束
2. 如果 X 是以 '/' 开头
   a. 设 Y 为文件系统根目录
3. 如果 X 是以 './' 或 '/' 或 '../' 开头
   a. 加载文件(Y + X)
   b. 加载目录(Y + X)
4. 加载Node模块(X, dirname(Y))
5. 抛出 "未找到"

加载文件(X)
1. 如果 X 是一个文件，加载 X 作为 JavaScript 文本。结束
2. 如果 X.js 是一个文件，加载 X.js 作为 JavaScript 文本。结束
3. 如果 X.json 是一个文件，解析 X.json 成一个 JavaScript 对象。结束
4. 如果 X.node 是一个文件，加载 X.node 作为二进制插件。结束

加载目录(X)
1. 如果 X/package.json 是一个文件，
   a. 解析 X/package.json，查找 "main" 字段
   b. let M = X + (json main 字段)
   c. 加载文件(M)
   d. 加载索引(M)
2. 加载索引(X)

加载索引(X)
1. 如果 X/index.js 是一个文件，加载 X/index.js 作为 JavaScript 文本。结束
3. 如果 X/index.json  是一个文件，解析 X/index.json 成一个 JavaScript 对象。结束
4. 如果 X/index.node 是一个文件，加载 X/index.node 作为二进制插件。结束

加载Node模块(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. 加载文件(DIR/X)
   b. 加载目录(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
```

就是说
```javascript
require("bar");
```

由于没有`"./" "../" "/"` , 走加载加载Node模块 , 所以是在`/node_modules` 文件夹中找到`bar` ;

先走加载文件`bar.js` , 如果`bar`不是一个文件 ;

就走加载目录 , 如果`bar`里面有`package.json`文件 , 就找到文件里面的`main`属性 , 加载对应的文件

如果没有`package.json`文件 , 就走加载索引 , 即加载`bar`里面的`index.js`文件


## post 请求

* get请求就是普通url请求，参数都写在url上面，直接分析 `req.url` 的 `query` 部分就可以知道传回的信息；所以其实表单的get请求和直接在浏览器上输入网址是一样的。

    get请求：
    1. 浏览器输入网址的请求，
    2. form表单的get提交，
    3. ajax get请求

* post请求，node会将数据拆分为众多小的数据块（chunk），然后通过特定的事件（“end”），见这些小数据块有序传递给回调函数

    get请求：
    1. form表单的post提交，
    2. ajax post请求

[例子](./06_post_get.js)
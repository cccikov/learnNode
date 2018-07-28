# day1

module 学习

* http

    `http.createServer([requestListener])`

    返回一个新建的 `http.Server` 实例。创建了一个服务器。

    * `http.Server`类 继承于 `net.Server`类

    * `requestListener` 是一个函数，会被自动添加到 `'request'` 事件。即系监听器，或者是这个事件的回调函数(所以其实我们每次访问这个服务器的时候就是触发这个回调函数)

        * `'request'` 事件，每次接收到一个请求时触发。触发时会传递两个参数，分别是`http.IncomingMessage`和`http.ServerResponse`

            * `http.IncomingMessage` 对象（实例）是由 `http.Server` 创建的，并作为第一个参数递给 'request' 事件。它可以用来访问响应状态、消息头、以及数据。它实现了 `可读流` 接口，还有以下额外的事件、方法、以及属性。

                一般在回调函数中用'req'保存这个变量

                * req.url
                * req.method


            * `http.ServerResponse` 对象（实例）该对象在 HTTP 服务器内部被创建。 它作为第二个参数被传入 'request' 事件。这个类实现了（而不是继承自）`可写流` 接口。 它是一个有以下事件的 EventEmitter：

            一般在回调函数中用'res'保存这个变量

            * res.write() 调用时，发送一块响应主体 响应主体只能二进制数据或者字符串（二进制数据在浏览器好像也会被解释为字符串）
            * res.end() 如果有内容先调用res.write()


    ``` javascript
    http.createServer(function (req , res ){
    });
    ```

    * 参数 *req* request 即 `http.IncomingMessage` 类的实例
    * 参数 *res* response 即 `http.ServerResponse` 类的实例



* fs
    读取文件
    1. fs.readFile()
    2. fs.stat()
        返回的第二个参数是fs.Stats对象
        * stats.isFile()	如果是文件返回 true，否则返回 false。
        * stats.isDirectory()	如果是目录返回 true，否则返回 false。
        * stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
        * stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
        * stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
        * stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
        * stats.isSocket()	如果是 Socket 返回 true，否则返回 false。



* url
    用于 URL 处理与解析
    1. url.parse()

    ```
        ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
        │                                            href                                             │
        ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
        │ protocol │  │        auth         │        host         │           path            │ hash  │
        │          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
        │          │  │                     │   hostname   │ port │ pathname │     search     │       │
        │          │  │                     │              │      │          ├─┬──────────────┤       │
        │          │  │                     │              │      │          │ │    query     │       │
        "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
        │          │  │          │          │   hostname   │ port │          │                │       │
        │          │  │          │          ├──────────────┴──────┤          │                │       │
        │ protocol │  │ username │ password │        host         │          │                │       │
        ├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
        │   origin    │                     │       origin        │ pathname │     search     │ hash  │
        ├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
        │                                            href                                             │
        └─────────────────────────────────────────────────────────────────────────────────────────────┘
    ```

* querystring
    用于解析与格式化 URL 查询字符串，即url的search里面的query部分（"?"+query = search）
    querystring.parse()
    querystring.stringify()

* path
    用于路径的处理
    1. path.normalize()
    2. path.extname()
    3. path.dirname()

linux （斜杠）
```
    ┌─────────────────────┬────────────┐
    │          dir        │    base    │
    ├──────┬              ├──────┬─────┤
    │ root │              │ name │ ext │
    "  /    home/user/dir / file  .txt "
    └──────┴──────────────┴──────┴─────┘
```

windows （反斜杠）
```
    ┌─────────────────────┬────────────┐
    │          dir        │    base    │
    ├──────┬              ├──────┬─────┤
    │ root │              │ name │ ext │
    " C:\      path\dir   \ file  .txt "
    └──────┴──────────────┴──────┴─────┘
```

由于在js里面反斜杠表转义，所以通常字符串里面路径分隔符都是双倍反斜杠
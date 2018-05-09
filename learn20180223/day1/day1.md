# day1

module 学习

* http

    `http.createServer([requestListener])`

    返回一个新建的 `http.Server` 实例。创建了一个服务器

    `requestListener` 是一个函数，会被自动添加到 `'request'` 事件。即系监听器，或者是这个事件的回调函数

    `'request'` 事件，每次接收到一个请求时触发。触发时会传递两个参数，分别是`http.IncomingMessage`和`http.ServerResponse`


    ``` javascript
    http.createServer(function (request , response ){
    });
    ```

    参数 *request* 即 `http.IncomingMessage` 类
    参数 *response* 即 `http.ServerResponse` 类



* fs
    读取文件
    1. fs.readFile()
    2. fs.stat()

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

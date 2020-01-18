# node 中转服务器

1. 先开启 base.js 服务
2. 启动别的服务，向 `127.0.0.1:3000` 请求数据


* http.request
    ```
    http.request(options[, callback])#
    http.request(url[, options][, callback])
    ```
* http.get
    ```
    http.get(options[, callback])#
    http.get(url[, options][, callback])
    ```

* [《在Node.js中发起HTTP请求的5种方法》](https://www.jianshu.com/p/1f82e39e2d8c)
* [《nodejs入门教程之http的get和request简介及应用》](https://www.cnblogs.com/hanguidong/p/9307391.html)
* [《nodejs之http.request》](https://www.cnblogs.com/fengch/p/8612313.html)
* [《nodejs入门教程之http的get和request简介及应用》](https://www.haorooms.com/post/nodejs_http_getrequest)
* [《Making HTTP requests with Node.js》](https://nodejs.dev/making-http-requests-with-nodejs)



* `http.createServer([options][, requestListener])`

    - `options <Object>`

        + `IncomingMessage <http.IncomingMessage>` 指定要使用的 `IncomingMessage` 类。用于扩展原始的 `IncomingMessage`。默认值: `IncomingMessage。`

        + `ServerResponse <http.ServerResponse>` 指定要使用的 `ServerResponse` 类。用于扩展原始 `ServerResponse`。默认值: `ServerResponse。`

    - `requestListener <Function>`

        `requestListener` 是一个自动添加到 '`request`' 事件的函数。

        + '`request`' 事件

            每次有请求时都会触发。 每个连接可能有多个请求（在 HTTP Keep-Alive 连接的情况下）。以下是监听器回调函数的参数

            1. `request <http.IncomingMessage>`

                * `http.IncomingMessage` 类

                    继承自: `<stream.Readable>` 可读流

                    `IncomingMessage` 对象由 `http.Server` 或 `http.ClientRequest` 创建，并分别作为第一个参数传给 '`request`' 和 '`response`' 事件。 它可用于访问响应状态、消息头、以及数据。

            2. `response <http.ServerResponse>`

                * http.ServerResponse 类

                    继承自: `<Stream>` 流

                    此对象由 HTTP 服务器在内部创建，而不是由用户创建。 它作为第二个参数传给 '`request`' 事件。


    - 返回: `<http.Server>`

        返回新建的 `http.Server` 实例。

        + `http.Server` 类

* `http.request(options[, callback])`

    - `options <Object>`

    - `callback <Function>`

        可选的 `callback` 参数会作为单次监听器被添加到 '`response`' 事件。

        + '`response`' 事件

            以下是监听器回调函数的参数

            1. `response <http.IncomingMessage>`

    - 返回: `<http.ClientRequest>`

        `http.request()` 返回 `http.ClientRequest` 类的实例。 `ClientRequest` 实例是一个可写流。 如果需要使用 POST 请求上传文件，则写入到 `ClientRequest` 对象。

http.request的回调函数的"response"参数 和 http.createServer的回调函数的"request"参数 是同类实例
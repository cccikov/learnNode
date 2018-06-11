# express 4.x API

## 详细

### 唯一中间件 express.static()

``` javascript
express.static(root, [options])
```

### app（Application）

``` javascript
var express = require('express');
var app = express();
```

#### 属性（Properties）

* app.locals
* app.mountpath

#### 方法（Methods）

路由

* app.METHOD()

    ``` javascript
    app.METHOD（path，callback [，callback ...]）
    ```

    path 是服务器上的路径（可以是字符串，可以是通配符，可以是正则表达式）， callback 是当路由匹配时要执行的函数，METHOD 是一个 HTTP 请求方法

    路由HTTP请求，其中METHOD是请求的HTTP方法，例如GET，PUT，POST等，小写。因此，实际的方法是app.get()，  app.post()，app.put()，等等。请参阅下面的完整列表。

    * **get**
    * **post**
    * checkout
    * connect
    * copy
    * delete
    * head
    * lock
    * merge
    * mkactivity
    * mkcol
    * move
    * m-search
    * notify
    * options
    * patch
    * propfind
    * proppatch
    * purge
    * put
    * report
    * search
    * subscribe
    * trace
    * unlock
    * unsubscribe

    要路由转换为无效JavaScript变量名称的方法，请使用括号表示法。例如， ` app['m-search']('/', function ...`。

    该API文档中有明确的项目只针对最流行的HTTP方法app.get()，  app.post()，app.put()，和app.delete()。但是，上面列出的其他方法的工作方式完全相同。浏览器只能发出get post请求，但是程序可以发出其他请求，如put delete

    * app.get()
    * app.post()
    * app.put()
    * app.delete()

* app.all()

    ``` javascript
    app.all(path, callback [, callback ...])
    ```

    是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。。不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

* app.use()

    ``` javascript
    app.use（[path，] function [，function ...]）
    ```

    `app.use` 会匹配任何以 path参数值 作为开头的路径；如果path未指定，则默认为“/”。

    对于`app.METHOD` 和 `app.all` 请求的路径完全符合`path` 才匹配成功。

    ```javascript
    // 匹配根路径的请求
    app.get('/', function (req, res) {
        res.send('root');
    });

    // 匹配 /about 路径的请求
    app.get('/about', function (req, res) {
        res.send('about');
    });

    // 匹配 /random.text 路径的请求
    app.get('/random.text', function (req, res) {
        res.send('random.text');
    });
    ```

    而对于 `app.use` ，请求的路径开头字符串符合 `path` 就可以了
    `app.use('/apple', ...)` 将匹配 `"/apple"`，`"/apple1"`，`"/applea"`，`"/apple/images"`，`"/ apple/images/news"`等。

* app.route()
* app.listen()

    ``` javascript
    app.listen（port，[hostname]，[backlog]，[callback]）
    ```

    绑定并侦听指定主机和端口上的连接。此方法与Node的http.Server.listen（）相同。

设置配置
* app.set()
    * views
    * view engine
* app.get()
* app.disable()
* app.disabled()
* app.enable()
* app.enabled()

其他
* app.render()
* app.engine()
* app.param()
* app.path()

### req （Request）

#### 属性（Properties）

* req.app
* req.originalUrl

    相当于原生node的`req.url`，显示完整的请求url；但是express会重写`req.url`，会除去`req.url`的挂载路径。所以
    ```
    req.originalUrl = req.baseUrl + req.url
    ```

* req.baseUrl

    显示的是挂载路径，和app.mountpath的一样

* req.path
* req.hostname
* req.query
* req.body
* req.params
* req.ip
* req.ips
* req.fresh
* req.xhr

    是否是ajax请求

* req.cookies
* req.protocol
* req.route
* req.secure
* req.signedCookies
* req.stale
* req.subdomains

#### 方法（Methods）

* req.accepts()
* req.acceptsCharsets()
* req.acceptsEncodings()
* req.acceptsLanguages()
* req.get()
* req.is()
* req.param()

### res（Response）

#### 属性（Properties）

* res.app
* res.headersSent
* res.locals

#### 方法（Methods）

* res.download()

    提示下载文件。

* res.end()

    终结响应处理流程。

* res.json()

    发送一个 JSON 格式的响应。

* res.jsonp()

    发送一个支持 JSONP 的 JSON 格式的响应。

* res.redirect()

    重定向请求。

* res.render()

    渲染视图模板。

* res.send()

    发送各种类型的响应。

* res.sendFile()

    以八位字节流的形式发送文件。

* res.sendStatus()

    设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

* res.append()
* res.attachment()
* res.cookie()
* res.clearCookie()
* res.format()
* res.get()
* res.links()
* res.location()
* res.set()
* res.status()
* res.type()
* res.vary()








## Router

``` javascript
var router = express.Router([options]);
```

#### 方法（Methods）

* router.all()
* router.METHOD()
* router.param()
* router.route()
* router.use()






































































## 目录

### 唯一中间件 express.static()

``` javascript
express.static(root, [options])
```

### app（Application）

``` javascript
var express = require('express');
var app = express();
```

#### 属性（Properties）

* app.locals
* app.mountpath

#### 方法（Methods）

路由
* app.all()
* app.METHOD()
    * app.get()
    * app.post()
    * app.put()
    * app.delete()
* app.use()
* app.route()
* app.listen()

设置配置
* app.set()
    * views
    * view engine
* app.get()
* app.disable()
* app.disabled()
* app.enable()
* app.enabled()

其他
* app.render()
* app.engine()
* app.param()
* app.path()

### req （Request）

#### 属性（Properties）

* req.app

    返回app对象

* req.originalUrl
* req.baseUrl
* req.path
* req.hostname
* req.query
* req.body
* req.params
* req.ip
* req.ips
* req.fresh
* req.xhr
* req.cookies
* req.protocol
* req.route
* req.secure
* req.signedCookies
* req.stale
* req.subdomains

#### 方法（Methods）

* req.accepts()
* req.acceptsCharsets()
* req.acceptsEncodings()
* req.acceptsLanguages()
* req.get()
* req.is()
* req.param()

### res（Response）

#### 属性（Properties）

* res.app
* res.headersSent
* res.locals

#### 方法（Methods）

* res.download()
* res.end()
* res.json()
* res.jsonp()
* res.redirect()
* res.render()
* res.send()
* res.sendFile()
* res.sendStatus()
* res.append()
* res.attachment()
* res.cookie()
* res.clearCookie()
* res.format()
* res.get()
* res.links()
* res.location()
* res.set()
* res.status()
* res.type()
* res.vary()









## Router

``` javascript
var router = express.Router([options]);
```

#### 方法（Methods）

* router.all()
* router.METHOD()
* router.param()
* router.route()
* router.use()
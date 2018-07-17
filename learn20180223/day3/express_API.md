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

    创建处理HTTP请求的路由，其中METHOD是请求的HTTP方法，例如GET，PUT，POST等，小写。因此，实际的方法是app.get()，  app.post()，app.put()，等等。请参阅下面的完整列表。

    您可以提供多个回调函数，其行为与中间件类似，只是这些回调可以调用next('route')绕过剩余的路由回调。您可以使用此机制在路线上施加先决条件，并在没有理由继续使用当前路线时将控制权交给后续路线。

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

        ``` javascript
        app.get(path, callback [, callback ...])
        ```

        创建处理http方法是get，路径是path的路由；使用callback去处理请求

    * app.post()

        ``` javascript
        app.post(path, callback [, callback ...])
        ```

         创建处理http方法是get，路径是path的路由；使用callback去处理请求

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

    `app.use` 会匹配任何以 path参数值 作为开头的路径；如果path未指定，则默认为“/”。不是精确匹配

    对于`app.METHOD` 和 `app.all` 请求的路径完全符合`path` 才匹配成功。是精确匹配

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

    返回一个单例模式的路由的实例，之后你可以在其上施加各种HTTP动作的中间件。使用app.route()来避免重复路由名字(例如错字错误)--说的意思应该是使用app.router()这个单例方法来避免同一个路径多个路由实例。

    用于客户端通过不同的http方法请求同一个路径的时候使用(实现 RESTful )。

    ```javascript
    app.route('/events')
    .all(function(req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
    })
    .get(function(req, res, next) {
        res.json(...);
    })
    .post(function(req, res, next) {
        // maybe add a new event...
    })
    ```

* app.listen()

    ``` javascript
    app.listen（port，[hostname]，[backlog]，[callback]）
    ```

    绑定并侦听指定主机和端口上的连接。此方法与Node的http.Server.listen（）相同。

设置配置

* app.set()

    `app.set(name, value)` 设置当前app的`name`属性值为`value`

    * "view engine" 设置视图的目录或目录
    * "view" 设置模板引擎

* app.get()

    `app.get(name)` 返回当前app属性名为`name`的属性值。与app.set()配合使用

    这个方法写法和路由的`app.get`是一样的，当只有一个参数的时候，就是返回属性值，当有两个以上参数就是路由控制了

* app.disable()

    `app.disable(name)` 设置当前app属性名为`name`的属性值为（禁用）false。`app.disable('foo')` 等价于 `app.set('foo', false)`

* app.disabled()

    `app.disabled(name)` 返回当前app属性名为`name`的属性值是否为（禁用）false状态

* app.enable()

    `app.enable(name)` 设置当前app属性名为`name`的属性值为（启用）true。`app.enable('foo')` 等价于 `app.set('foo', true)`

* app.enabled()

    `app.enabled(name)` 返回当前app属性名为`name`的属性值是否为（启用）true状态

其他

* app.render()

    ``` javascript
    app.render(view, [locals], callback)
    ```

    只负责生成视图，无法把视图响应给客户端（浏览器）；`res.render` 内部也是调用了 `app.render`。

    `view` 模板的文件名，忽略扩展名

    `locals` 传给模板的数据

    `callback` 生成成功的回调函数，第一个参数是 `error` 错误信息，第二参数是 `html` 生成好的视图

    ``` javascript
    app.render('email', { name: 'Tobi' }, function(err, html){
        // ...
    });
    ```

* app.engine()

    ``` javascript
    app.engine(ext, callback)
    ```

    注册指定引擎的回调，用来渲染处理ext文件

    Express默认使用jade模板。如果你尝试加载 "foo.jade" 文件，Express内部会调用如下操作。

    ``` javascript
    app.engine('jade', require('jade').__express);
    ```

    如果要使用其他模板引擎，如：将EJS模板映射至".html"文件：

    ``` javascript
    app.engine('html', require('ejs').__express);
    ```

    ``` javascript
    var ejs = require('ejs');  //我是新引入的ejs插件
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');
    // 这样express就可以用ejs引擎去渲染文件后缀为html的模板
    ```

* app.param()

    ``` javascript
    app.param([name], callback)
    ```

    给路由参数添加回调触发器，这里的name是参数名或者参数数组，function是回调方法。

    ```
    // 当有 :id :page 参数（是路由参数，不是url参数）的路由被触发是，运行回调函数
    app.param(['id', 'page'], function (req, res, next, value) {
        console.log('CALLED ONLY ONCE with', value);
        next();
    })

    app.get('/user/:id/:page', function (req, res, next) {
        console.log('although this matches');
        next();
    });

    app.get('/user/:id/:page', function (req, res) {
        console.log('and this matches too');
        res.end();
    });
    ```

* app.path()

    通过这个方法可以得到app典型的路径，其是一个string。

    ``` javascript
    var app = express()
    , blog = express()
    , blogAdmin = express();

    app.use('/blog', blog);
    blog.use('/admin', blogAdmin);

    console.log(app.path()); // ''
    console.log(blog.path()); // '/blog'
    console.log(blogAdmin.path()); // '/blog/admin'
    ```

### req （Request）

#### 属性（Properties）

* req.app

    这个属性持有express程序实例的一个引用，其可以作为中间件使用。

* req.originalUrl

    相当于原生node的`req.url`，显示完整的请求url。所以

    但是当使用`app.use()`时，express会重写`req.url`，会除去`req.url`的挂载路径。`app.use()`的挂载功能将重写req.url以除去挂载地址。

    ```
    req.originalUrl = req.baseUrl + req.url
    ```

* req.baseUrl

    显示的是挂载路径，和app.mountpath的一样

* req.path

    返回请求URL的`path`部分。

* req.hostname

    返回请求URL的`hostname`部分。

* req.query

    返回请求URL的`query`部分的对象。路由中每个查询字符串参数的属性的对象。如果没有查询字符串，它是空的对象，{}。

* req.body

    在请求的body中保存的是提交的一对对键值数据。默认情况下，它是undefined，当你使用比如body-parser和multer这类解析body数据的中间件时，才有对应请求body的值。只有请求的类型(method)时是post的时候才会有请求body

* req.params

    一个对象，其包含了一系列的属性，这些属性和在路由中命名的参数名是一一对应的。

    1. 例如，如果你有`/user/:name`路由，`name`属性可作为`req.params.name`。这个对象默认值为{}。

        ``` javascript
        // GET /user/tj
        req.params.name
        // => "tj"
        ```

    2. 当你使用正则表达式来定义路由规则，捕获组的组合一般使用`req.params[n]`，这里的n是第几个捕获租。这个规则被施加在无名通配符匹配，比如`/file/*`的路由：

        ``` javascript
        // GET /file/javascripts/jquery.js
        req.params[0]
        // => "javascripts/jquery.js"
        ```

* req.ip

    返回请求的IP地址。

    如果trust proxy启用设置，则是上游地址

* req.ips

    当trust proxy设置项被设置为启用值，这个属性包含了一组在X-Forwarded-For请求头中指定的IP地址。不然，其就包含一个空的数组。这个头部可以被客户端或者代理设置。

* req.fresh

    指示这个请求是否是fresh(新的，是否是第一次这样的请求)。其和req.stale是相反的。 当cache-control请求头没有no-cache指示和下面中的任一一个条件为true，那么其就为true：

    if-modified-since请求头被指定，和last-modified请求头等于或者早于modified响应头。
    if-none-match请求头是`*`。

* req.stale

    指示这个请求是否是stale(陈旧的，是否之前就有过一次这样的请求)

* req.xhr

    是否是ajax请求

* req.cookies

    当使用cookie-parser中间件的时候，这个属性是一个对象，其包含了请求发送过来的cookies。如果请求没有带cookies，那么其值为{}。

* req.protocol

    请求的协议，一般为http，当启用TLS加密，则为https。

* req.route

    当前匹配的路由，其为一串字符。

* req.secure

    一个布尔值，如果建立的是TLS的连接（是否https协议），那么就为true。等价于`'https' == req.protocol;`

* req.signedCookies

    当使用cookie-parser中间件的时候，这个属性包含的是请求发过来的签名cookies，这个属性取得的是不含签名，可以直接使用的值。签名的cookies保存在不同的对象中来体现开发者的意图；不然，一个恶意攻击可以被施加在req.cookie值上(它是很容易被欺骗的)。记住，签名一个cookie不是把它藏起来或者加密；而是简单的防止篡改(因为签名使用的加密是私人的)。如果没有发送签名的cookie，那么这个属性默认为{}。

* req.subdomains

    请求中域名的子域名数组。

#### 方法（Methods）

* req.accepts()

    `req.accepts(types)`

    检查这个指定的Content-type是否被接受，基于请求的Accept HTTP头部。这个方法返回最佳匹配，如果没有一个匹配，那么其返回undefined(在这个case下，服务器端应该返回406和"Not Acceptable")。

    type值可以是一个单的MIME type字符串(比如application/json)，一个扩展名比如json，一个逗号分隔的列表，或者一个数组。对于一个列表或者数组，这个方法返回最佳项(如果有的话)。

    就是客户端可以接受的Content-type，不是请求本身的Content-type

* req.acceptsCharsets()

    `req.acceptsCharsets(charset [, ...])`

    返回指定的字符集集合中第一个的配置的字符集，基于请求的Accept-CharsetHTTP头。如果指定的字符集没有匹配的，那么就返回false。

* req.acceptsEncodings()

    `req.acceptsEncodings(encoding [, ...])`

    返回指定的编码集合中第一个的配置的编码，基于请求的Accept-EncodingHTTP头。如果指定的编码集没有匹配的，那么就返回false。

* req.acceptsLanguages()

    `req.acceptsLanguages(lang [, ...])`

    返回指定的语言集合中第一个的配置的语言，基于请求的Accept-LanguageHTTP头。如果指定的语言集没有匹配的，那么就返回false。

* req.get()

    `req.get(field)`

    返回指定的请求HTTP头部的域内容(不区分大小写)

    ``` javascript
    req.get('Content-type');
    // => "text/plain"
    req.get('content-type');
    // => "text/plain"
    req.get('Something')
    // => undefined
    ```

* req.is()

    `req.is(type)`

    如果进来的请求的Content-type头部域匹配参数type给定的MIME type，那么其返回true。否则返回false。

    ``` javascript
    // With Content-Type: text/html; charset=utf-8
    req.is('html');
    req.is('text/html');
    req.is('text/*');
    // => true
    // When Content-Type is application/json
    req.is('json');
    req.is('application/json');
    req.is('application/*');
    // => true
    req.is('html');
    // => false
    ```

* req.param()

    **已经不推荐使用了，用`req.params`,`req.body`, `req.query`代替**

    `req.param(name)`

### res（Response）

#### 属性（Properties）

* res.app
* res.headersSent
* res.locals

#### 方法（Methods）

* res.download()

    提示下载文件。

    `res.download(path [, filename] [, fn])`传输path指定文件作为一个附件。通常，浏览器提示用户下载。默认情况下，Content-Disposition头部"filename="的参数为path(通常会出现在浏览器的对话框中)。通过指定filename参数来覆盖默认值。

    当一个错误发生时或者传输完成，这个方法将调用fn指定的回调方法。这个方法使用res.sendFile()来传输文件。

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

    `res.send([body])`

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
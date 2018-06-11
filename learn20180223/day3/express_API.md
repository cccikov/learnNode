# express 4.x API

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

    ``` javascript
    app.all(path, callback [, callback ...])
    ```

* app.METHOD()

    ``` javascript
    app.METHOD（path，callback [，callback ...]）
    ```

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

    该API文档中有明确的项目只针对最流行的HTTP方法app.get()，  app.post()，app.put()，和app.delete()。但是，上面列出的其他方法的工作方式完全相同。

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

* res.append()
* res.attachment()
* res.cookie()
* res.clearCookie()
* res.download()
* res.end()
* res.format()
* res.get()
* res.json()
* res.jsonp()
* res.links()
* res.location()
* res.redirect()
* res.render()
* res.send()
* res.sendFile()
* res.sendStatus()
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

* res.append()
* res.attachment()
* res.cookie()
* res.clearCookie()
* res.download()
* res.end()
* res.format()
* res.get()
* res.json()
* res.jsonp()
* res.links()
* res.location()
* res.redirect()
* res.render()
* res.send()
* res.sendFile()
* res.sendStatus()
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
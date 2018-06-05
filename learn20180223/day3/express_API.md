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
* req.originalUrl

    相当于原生node的`req.url`

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
# day3

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。
就是原生node的api都可以使用，res.write()都可以使用；
像jq就是进行了二次抽象，原生是innerHTML，在jq里面就抽象为html()，并且原生js的不能使用。


Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

**中间件（Middleware）** 是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件的功能包括：

* 执行任何代码。
* 修改请求和响应对象。
* 终结请求-响应循环。
* 调用堆栈中的下一个中间件。

如果当前中间件没有终结请求-响应循环，则必须调用 next() 方法将控制权交给下一个中间件，否则请求就会挂起。



### 中间件流程顺序问题

`app.use` 会匹配任何以 path参数值 作为开头的路径

``` javascript
app.use(function(){
});
```

相当于

``` javascript
app.use("/",function(){
});
```

`req.originalUrl`
`req.path`
`req.baseUrl`

将匹配任何路径（因为任何路径都以"/"开头）

所以使用 静态资源中间件
app.use(express.static("public"));
实际是 app.use("/",express.static("public"));
就是浏览器访问"/"的时候，就读取public的根目录

如果是app.use("/static",express.static("public"));
就是浏览器访问"/static"的时候，就读取public的根目录


其他都是要完全和 path参数值 一样才可以，才可以匹配上，才会执行该中间件

小技巧，充当404判断，不再需要error判断返回404
在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：

``` javascript
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
```



### render send

`res.render`

`app.set("view engine","pug")`
`app.set("views","fold")`


`res.send` 自动分配HTTP响应头 Content-Length 头部（除非先前已定义），并提供自动HEAD和HTTP缓存新鲜度支持。


### 路由
路由路径可以是字符串，可以是通配符，可以是正则表达式

### get

`req.query` 不需要再通过url模块去分析参数部分，直接用req.query

### post

`req.body` 使用模块`body-parser`，但是如果有复杂的内容（非字符串的图片，视频等），也是需要使用`formidable`

浏览器只能发出get post请求，但是程序可以发出其他请求，如put delete

### router

router就像中间件，所以一般是app.use(router.use)里面使用，因为router里面有自己的路由规则

express.Router
可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

Router 实例
var router = express.Router();

router 是一个路由系统

比如页面有一个/me/下面的二级路由

有 /me/about   /me/detail   /me/setting
如果用app.get()的话，需要一种种都写，因为页面肯定有其他路由的比如 控制/index/的 控制 /product/ 这样就会导致一个js控制太多的路由，代码会不直观，好乱

这时候就可以使用router，分别匹配 /about /detail  /setting 的情况，写成一个模块 假如就叫做me_router
然后用app.use("/me",me_router); 当页面访问以"/me"开头的网址的时候，就交给me_router去处理












## API







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
* app.engine()
* app.param()
* app.path()
* app.render()

















### req （Request）

#### 属性（Properties）

* req.app
* req.baseUrl
* req.originalUrl
* req.path
* req.body
* req.cookies
* req.fresh
* req.hostname
* req.ip
* req.ips
* req.params
* req.protocol
* req.query
* req.route
* req.secure
* req.signedCookies
* req.stale
* req.subdomains
* req.xhr

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

### express 接受上传文件的中间件

`multer` [multer](https://www.npmjs.com/package/multer)
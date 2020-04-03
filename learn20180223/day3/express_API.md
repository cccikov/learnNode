# express 4.x API

## 详细

### 唯一自带中间件 express.static()

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

    app.locals对象是一个javascript对象，它的属性就是程序本地的变量。包含应用程序设置的值，通过`app.set` 设定的应用程序设置。

    ``` javascript
    app.locals.title
    // => 'My App'
    app.locals.email
    // => 'me@myapp.com'
    ```

    一旦设定，app.locals的各属性值将贯穿程序的整个生命周期，与其相反的是 res.locals ，它只在这次请求的生命周期中有效。

    在程序中，你可以在渲染模板时使用这些本地变量。它们是非常有用的，可以为模板提供一些有用的方法，以及app级别的数据。通过req.app.locals(具体查看req.app)，Locals可以在中间件中使用。

    ``` javascript
    app.locals.title = 'My App';
    app.locals.strftime = require('strftime');
    app.locals.email = 'me@myapp.com';
    ```

* app.mountpath

    app.mountpath属性是子程序挂载的路径模式。

    一个子程序是一个express的实例，其可以被用来作为路由句柄来处理请求。

    ``` javascript
    var express = require('express');
    var app = express(); // the main app
    var admin = express(); // the sub app
    admin.get('/', function(req, res) {
        console.log(admin.mountpath); // /admin
        res.send('Admin Homepage');
    });
    app.use('/admin', admin); // mount the sub app
    ```

    它和req对象的 req.baseUrl 属性比较相似，除了req.baseUrl 是匹配的URL路径，而不是匹配的模式。如果一个子程序被挂载在多条路径模式，app.mountpath就是一个关于挂载路径模式项的列表，如下面例子所示。

    ``` javascript
    var admin = express();

    admin.get('/', function (req, res) {
    console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
    res.send('Admin Homepage');
    });

    var secret = express();
    secret.get('/', function (req, res) {
    console.log(secret.mountpath); // /secr*t
    res.send('Admin Secret');
    });

    admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
    app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app
    ```

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

    express 使用路由功能时，路径匹配的时候会忽略最后面的斜杠，无论是浏览器请求的路径，还是路由方法path里面写的路径。就是当成是只能是目录路径来处理

    比如 /a/b/c/d/e 和 /a/b/c/d/e/

    路径的每一部分可以看成是每一级的目录，从 a 开始一直往下找，由于是路由控制，所以是没有文件的，只有目录，无论 e 后面有无"/",最后的一级都是 e

    "/" 叫做 路径分隔符 "/"后面没有东西了，分隔出来的东西其实都是一样的，所以就算后面有无加 "/" ，路径都是指向同一个位置

    所以作为路由的时候，我们已经知道整个路径是怎么样了，已经确定了url了，就是这个信息的位置了，所以后面有无"/"都无所谓，而且一般我们输入url最后都不会有"/"

    就算是静态资源服务器，一级一级往下走到了路径最后部分，如果不是文件而是文件夹，就算没有"/"作为结尾，也一般是显示该文件夹的index.html文件（一般的静态资源管理器都会重定向补回最后的"/"），但是资源管理器结尾有无"/"，还是区别挺大的，如果不是文件只是目录的话，路径末尾有无加"/"都无什么所谓，但是如果是文件路径，路径末尾加上"/"出错了

    但是跳转的时候，最后有无 "/" , 还是挺重要的；一个路径以"/"结尾视为指向目录(directory)，否则视为指向文件(file)。

* app.all()

    ``` javascript
    app.all(path, callback [, callback ...])
    ```

    是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。。不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。

* app.use()

    ``` javascript
    app.use（[path，] callback [，callback ...]）
    ```

    `app.use` 会匹配任何以 `path`参数值 加上"/"作为开头的路径；如果path未指定，则默认为“/”。不是精确匹配

    路由会匹配任何 path参数值 路径，这个路径

    * 对于`app.METHOD` 和 `app.all` 请求的路径完全符合`path` 才匹配成功。是精确匹配

        ``` javascript
        // 匹配根路径的请求
        app.get('/', function (req, res) {
            res.send('root');
        });

        // 匹配 /about 路径的请求
        app.get('/about', function (req, res) {
            res.send('about');
        });

        // 匹配 /random.txt 路径的请求
        app.get('/random.txt', function (req, res) {
            res.send('random.txt');
        });
        ```

    * 而对于 `app.use` ，请求的路径开头字符串符合 `path`加"/" 就可以了
    `app.use('/apple', ...)` 将匹配 `"/apple"`，`"/apple/images"`，`"/ apple/images/news"`等。

    所以callback可以更好地使用router（express.Router）对象也可以app（express.app）对象，虽然app.get，callback也是可以使用router对象和app对象，但是由于app.get路径是全匹配，局限性就好大了。

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

    `app.set(name, value)` 设定应用程序设置，设置当前app的`name`属性值为`value`

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

    就是通过执行函数 `express()` 后返回的应用

* req.originalUrl

    相当于原生node的`req.url`，显示完整的请求url。所以

    但是当使用`app.use()`时，express会重写`req.url`，会除去`req.url`的挂载路径。`app.use()`的挂载功能将重写req.url以除去挂载地址。

    ```
    req.originalUrl = req.baseUrl + req.url
    ```

    ```
    app.use(express.static("./")); // express.static 是根据 req.url 作为静态资源的请求路径的，所以只需要改动req.url就能改变请求的静态资源
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

    检查这个指定的Content-type是否被接受，基于HTTP请求头部的Accept字段 。这个方法返回最佳匹配，如果没有一个匹配，那么其返回undefined(在这个case下，服务器端应该返回406和"Not Acceptable")。

    type值可以是一个单的MIME type字符串(比如application/json)，一个扩展名比如json，一个逗号分隔的列表，或者一个数组。对于一个列表或者数组，这个方法返回最佳项(如果有的话)。

    就是客户端可以接受的Content-type，不是请求本身的Content-type

* req.acceptsCharsets()

    `req.acceptsCharsets(charset [, ...])`

    返回指定的字符集集合中第一个的配置的字符集，基于请求的 Accept-Charset HTTP头。如果指定的字符集没有匹配的，那么就返回false。

* req.acceptsEncodings()

    `req.acceptsEncodings(encoding [, ...])`

    返回指定的编码集合中第一个的配置的编码，基于请求的 Accept-Encoding HTTP头。如果指定的编码集没有匹配的，那么就返回false。

* req.acceptsLanguages()

    `req.acceptsLanguages(lang [, ...])`

    返回指定的语言集合中第一个的配置的语言，基于请求的 Accept-Language HTTP头。如果指定的语言集没有匹配的，那么就返回false。

* req.get()

    `req.get(field)`

    返回指定的HTTP请求头部的值(不区分大小写)

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

    如果进来的请求的 Content-type 头部值匹配参数 type 给定的 MIME type，那么其返回true。否则返回false。

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

    这个属性持有express程序实例的一个引用，其可以在中间件中使用。

    `res.app` 和请求对象中的 `req.app` 属性是相同的。

* res.headersSent

    布尔类型的属性，指示这个响应是否已经发送 HTTP头部（响应头）。

    ``` javascript
    app.get('/', function(req, res) {
        console.log(res.headersSent); // false
        res.send('OK'); // send之后就发送了头部
        console.log(res.headersSent); // true
    });
    ```

* res.locals

    一个对象，其包含了本次请求的响应中的变量，同时在本次请求响应的周期内它的变量也可以提供模板引擎用于渲染视图使用。 其他方面，其和app.locals是一样的。

    这个参数在导出请求级别的信息是很有效的，这些信息比如请求路径，已认证的用户，用户设置等等。

    ``` javascript
    app.use(function(req, res, next) {
        res.locals.user = req.user;
        res.locals.authenticated = !req.user.anonymous;
        next();
    });
    ```

#### 方法（Methods）


* res.set()

    `res.set(field [, value])`

    设置响应对象的HTTP头部的 "field" 字段为 "value"。为了一次设置多个值，那么可以传递一个对象为参数。

    设置响应头

    ``` javascript
    res.set('Content-Type', 'text/plain');
    res.set({
        'Content-Type':'text/plain',
        'Content-Length':'123',
        'ETag':'123456'
    })
    ```

* res.get()

    `res.get(field)` 返回HTTP响应头指定字段 "field" 的值。匹配是区分大小写。

* res.append()

    `res.append(field [, value])`

    res.append()方法在Expresxs4.11.0以上版本才支持。

    在HTTP响应头部的 "field" 字段追加特殊的值value。如果这个字段没有被设置，那么将用value新建这个字段。value可以是一个字符串或者数组。

    注意：在res.append()之后调用res.set()函数将重置前面设置的值。


    ``` javascript
    res.append('Lind', ['<http://localhost>', '<http://localhost:3000>']);
    res.append('Set-Cookie', 'foo=bar;Path=/;HttpOnly');
    res.append('Warning', '199 Miscellaneous warning');
    ```


* res.attachment()

    `res.attachment([filename])` 设置 HTTP响应头 Content-Disposition 内容为 "attachment"。如果提供了filename，那么将通过res.type()获得扩展名来设置Content-Type，并且设置Content-Disposition 中的"filename="参数。

    ``` javascript
    res.attachment();
    // Content-Disposition: attachment

    res.attachment('path/to/logo.png');
    // Content-Disposition: attachment; filename="logo.png"
    // Content-Type: image/png
    ```

    就是用于不是调用`res.download`来提示下载文件是。设置 "Content-Disposition" 为 "attachment"，并且设置 "filename" ，"filename" 会作为下载文件的名字

    调用`res.download`是会自动设置了头部 "Content-Disposition" 为 "attachment"

* res.type()

    `res.type(type)` 程序将设置HTTP头部 Content-Type 的MIME type，如果这个设置的type能够被mime.lookup解析成正确的Content-Type。如果type中包含了/字符，那么程序会直接设置Content-Type为type。

    是直接设置不是返回content-type

    ``` javascript
    res.type('.html');              // => 'text/html'
    res.type('html');               // => 'text/html'
    res.type('json');               // => 'application/json'
    res.type('application/json');   // => 'application/json'
    res.type('png');                // => image/png:
    ```

* res.status()

    `res.status(code)`

    使用此方法设置响应的HTTP状态。它是Node的response.statusCode的可链式别名。

* res.sendStatus()

    `res.sendStatus(statusCode)`

    设置响应对象的HTTP status code为statusCode并且发送statusCode的相应的字符串形式作为响应的Body。

    设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

    ``` javascript
    res.sendStatus(200); // 等价于 res.status(200).send('OK');
    res.sendStatus(403); // 等价于 res.status(403).send('Forbidden');
    res.sendStatus(404); // 等价于 res.status(404).send('Not Found');
    res.sendStatus(500); // 等价于 res.status(500).send('Internal Server Error')
    ```

    如果指定了不受支持的状态代码，则HTTP状态仍设置为，statusCode并且代码的字符串版本将作为响应正文发送。

    ``` javascript
    res.sendStatus(2000); // 等价于 res.status(2000).send('2000')
    ```

* res.send()

    `res.send([body])`

    发送HTTP响应。body表示响应体，自动添加响应头。

    body参数可以是一个Buffer对象，一个字符串，一个对象，或者一个数组。比如：

    ``` javascript
    res.send(new Buffer('whoop'));
    res.send({some:'json'});
    res.send('<p>some html</p>');
    res.status(404).send('Sorry, we cannot find that!');
    res.status(500).send({ error: 'something blew up' });
    ```

    对于一般的非流请求，这个方法可以执行许多有用的的任务：比如，它自动给 Content-Length HTTP响应头赋值(除非先前定义)，也支持自动的HEAD和HTTP缓存更新。

    当参数是一个Buffer对象，这个方法设置 Content-Type 响应头为 application/octet-stream，除非事先提供，如下所示:

    ``` javascript
    res.set('Content-Type', 'text/html');
    res.send(new Buffer('<p>some html</p>'));
    ```

    当参数是一个字符串，这个方法自动设置 Content-Type 响应头为 text/html：

    ``` javascript
    res.send('<p>some html</p>');
    ```

* res.render()

    `res.render(view [, locals] [, callback])`

    渲染一个视图，然后将渲染得到的HTML文档发送给客户端。可选的参数为:

    locals，定义了视图本地参数属性的一个对象。

    callback，一个回调方法。如果提供了这个参数，render方法将返回错误和渲染之后的模板，并且不自动发送响应。当有错误发生时，可以在这个回调内部，调用next(err)方法。

    ``` javascript
    // send the rendered view to the client
    res.render('index');
    // if a callback is specified, the render HTML string has to be sent explicitly
    res.render('index', function(err, html) {
        res.send(html);
    });
    // pass a local variable to  the view
    res.render('user', {name:'Tobi'}, function(err, html) {
        // ...
    });
    ```

* res.sendFile()

    `res.sendFile(path [，options] [，fn])`

    传输path指定的文件。根据文件的扩展名设置 Content-Type HTTP头部。除非在options中有关于root的设置，path一定是关于文件的绝对路径。 下面的表提供了options参数的细节

    | 属性        | 描述                                                                    | 默认    |
    |-------------|------------------------------------------------------------------------|---------|
    | maxAge      | Cache-Control以毫秒为单位设置标头的max-age属性或以ms格式设置字符串         | 0       |
    | root        | 相对文件名的根目录                                                       |         |
    | lastModified| 设置 Last-Modified 头部为此文件在系统中的最后一次修改时间。设置false来禁用它   | Enable  |
    | headers     | 一个对象，包含了文件相关的 HTTP头部。                                       |         |
    | dotfiles    | 是否支持点开头文件名的选项。可选的值"allow","deny","ignore"                | "ignore"|

    当传输完成或者发生了什么错误，这个方法调用fn回调方法。如果这个回调参数指定了和一个错误发生，回调方法必须明确地通过结束请求-响应循环或者传递控制到下个路由来处理响应过程。

    ``` javascript
    app.get('/file/:name', function(req, res, next) {
        var options = {
            root:__dirname + '/public',
            dotfile:'deny',
            headers:{
                'x-timestamp':Date.now(),
                'x-sent':true
            }
        };
        var fileName = req.params.name;
        res.sendFile(fileName, options, function(err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('sent', fileName);
            }
        });
    });
    ```

* res.download()

    提示下载文件。

    `res.download(path [, filename] [, fn])`传输path指定文件作为一个附件。通常，浏览器提示用户下载。默认情况下，http头部 Content-Disposition 中的 "filename=" 的值为path(通常会出现在浏览器的对话框中)。通过指定filename参数来覆盖默认值。

    当一个错误发生时或者传输完成，这个方法将调用fn指定的回调方法。这个方法使用res.sendFile()来传输文件。

* res.json()

    `res.json([body])` 这个方法和将一个对象或者一个数组作为参数传递给res.send()方法的效果相同。不过，你可以使用这个方法来转换其他的值到json，例如null，undefined。(虽然这些都是技术上无效的JSON)。

    发送一个 JSON 格式的响应。

* res.jsonp()

    `res.jsonp([body])` 发送一个json的响应，并且支持JSONP。这个方法和res.json()效果相同，除了其在选项中支持JSONP回调。

    发送一个支持 JSONP 的 JSON 格式的响应。

express 里面的 res.send() res.sendFile() res.download() res.json() res.jsonp() 都属于发送响应。都不能在res.end()之后调用（原生node也不可以end了之后再write）。任何一个响应后都不可以再调用别的响应。响应里面包含了res.end()，虽然可以再次调用res.end()，但是这时res.end()返回的已经是false了，没有任何效果（第一次调用res.end()的时候返回的是true）。

* res.redirect()

    `res.redirect([status,] path)`

    重定向请求。

    重定向来源于指定 `path` 的URL，以及指定的HTTP status code `status`。如果你没有指定 `status`，status code默认为"302 Found"。

    ``` javascript
    res.redirect('/foo/bar'); // 重定向可以相对于主机名的根目录。
    res.redirect('../login'); 重定向可以相对于当前URL。
    res.redirect('http://example.com'); // 重定向也可以是完整的URL，来重定向到不同的站点。
    res.redirect(301, 'http://example.com');
    ```

    重定向可以相对于当前URL。

    从http://example.com/blog/admin/（注意尾部斜杠），以下内容将重定向到URL http://example.com/blog/admin/post/new。

    重定向到post/new的http://example.com/blog/admin（没有尾随斜线），会重定向到http://example.com/blog/post/new。

    如果您发现上述行为令人困惑，请将路径段视为目录（带有尾部斜杠）和文件，它将开始有意义。

    ``` javascript
    res.redirect('post/new');
    ```

    重定向到请求头的 referer，当没有 referer 请求头的情况下，默认为‘/’

    ``` javascript
    res.redirect('back');
    ```

* res.location()

    `res.location(path)`

    设置响应的HTTP头部 Location 为指定的path参数。

    ``` javascript
    res.location('/foo/bar');
    res.location('http://example.com');
    res.location('back');
    ```

    当path参数为back时，其具有特殊的意义，其指定URL为请求对象的 Referer 头部指定的URL。如果请求中没有指定，那么其即为"/"。

    Express传递指定的URL字符串作为回复给浏览器响应中的 Location 头部的值，不检测和操作，除了back这个参数。浏览器会将用户重定向到 location 设置的url或者 Referer 的url（back参数的情况）

    要设置对应的状态码才会重定向，res.redirect 会自动设置状态码和 Location 头部，以及res.end()。

* res.end()

    `res.end([data] [, encoding])` 结束本响应的过程。这个方法实际上来自Node核心模块

    终结响应处理流程。

* res.cookie()

    `res.cookie(name, value [,options])` 设置name和value的cookie，value参数可以是一串字符或者是转化为json字符串的对象。

    options是一个对象，其可以有下列的属性。

    属性  类型  描述
    domain  String  设置cookie的域名。默认是你本app的域名。
    expires Date    cookie的过期时间，GMT格式。如果没有指定或者设置为0，则产生新的cookie。
    httpOnly    Boolean 这个cookie只能被web服务器获取的标示。
    maxAge  String  是设置过去时间的方便选项，其为过期时间到当前时间的毫秒值。
    path    String  cookie的路径。默认值是/。
    secure  Boolean 标示这个cookie只用被HTTPS协议使用。
    signed  Boolean 指示这个cookie应该是签名的。

    res.cookie()所作的都是基于提供的options参数来设置Set-Cookie头部。没有指定任何的options，那么默认值在RFC6265中指定。

    使用实例：

    ``` javascript
    res.cookie('name', 'tobi', {'domain':'.example.com', 'path':'/admin', 'secure':true});
    res.cookie('remenberme', '1', {'expires':new Date(Date.now() + 90000), 'httpOnly':true});
    ```
    maxAge 是一个方便设置过期时间的方便的选项，其以当前时间开始的毫秒数来计算。下面的示例和上面的第二条功效一样。

    ``` javascript
    res.cookie('rememberme', '1', {'maxAge':90000}, "httpOnly":true);
    ```

    你可以设置传递一个对象作为value的参数。然后其将被序列化为Json字符串，被bodyParser()中间件解析。

    ``` javascript
    res.cookie('cart', {'items':[1, 2, 3]});
    res.cookie('cart', {'items':[1, 2, 3]}, {'maxAge':90000});
    ```

    当我们使用cookie-parser中间件的时候，这个方法也支持签名的cookie。简单地，在设置options时包含signed选项为true。然后res.cookie()将使用传递给cookieParser(secret)的密钥来签名这个值。

    ``` javascript
    res.cookie('name', 'tobi', {'signed':true});
    ```

* res.clearCookie()

    `res.clearCookie(name [,options])`根据指定的name清除对应的cookie。更多关于options对象可以查阅res.cookie()。

    ``` javascript
    res.cookie('name', 'tobi', {'path':'/admin'});
    res.clearCookie('name', {'path':'admin'});
    ```

* res.format()

    `res.format(object)`

    进行内容协商，根据请求的对象中 Accept HTTP头部指定的接受内容。它使用 req.accepts()来选择一个句柄来为请求服务，这些句柄按质量值进行排序。如果这个头部没有指定，那么第一个方法默认被调用。当不匹配时，服务器将返回406"Not Acceptable"，或者调用default回调。

    Content-Type 请求头被设置，当一个回调方法被选择。然而你可以改变他，在这个方法中使用这些方法，比如res.set()或者res.type()。

    下面的例子，将回复{"message":"hey"}，当请求的对象中 Accept 头部设置成 "application/json" 或者 "*/json" (不过如果是*/*，然后这个回复就是"hey")。

    ``` javascript
    res.format({
        'text/plain':function() {
            res.send('hey');
        },
        'text/html':function() {
            res.send('<p>hey</p>');
        },
        'application/json':function() {
            res.send({message:'hey'});
        },
        'default':function() {
            res.status(406).send('Not Acceptable');
        }
    });
    ```

    除了规范化的MIME类型之外，你也可以使用拓展名来映射这些类型来避免冗长的实现：

    ``` javascript
    res.format({
        text:function() {
            res.send('hey');
        },
        html:function() {
            res.send('<p>hey</p>');
        },
        json:function() {
            res.send({message:'hey'});
        }
    });
    ```

* res.links()

    `res.links(links)` 连接这些links，links是以传入参数的属性形式提供，连接之后的内容用来填充响应的 Link HTTP头部。

    ``` javascript
    res.links({
        next:'http://api.example.com/users?page=2',
        last:'http://api.example.com/user?page=5'
    });
    ```

* res.vary()

    `res.vary(field)`

    在没有Vary应答头部时增加Vary应答头部。

    ps：vary的意义在于告诉代理服务器/缓存/CDN，如何判断请求是否一样，vary中的组合就是服务器/缓存/CDN判断的依据，比如Vary中有User-Agent，那么即使相同的请求，如果用户使用IE打开了一个页面，再用Firefox打开这个页面的时候，CDN/代理会认为是不同的页面，如果Vary中没有User-Agent，那么CDN/代理会认为是相同的页面，直接给用户返回缓存的页面，而不会再去web服务器请求相应的页面。通俗的说就相当于field作为了一个缓存的key来判断是否命中缓存








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
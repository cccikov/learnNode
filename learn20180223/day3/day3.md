# day3


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


`res.send` 自动分配Content-LengthHTTP响应头字段（除非先前已定义），并提供自动HEAD和HTTP缓存新鲜度支持。


### get

`req.query` 不需要再通过url模块去分析参数部分，直接用req.query



### post

`req.body` 使用模块`body-parser`，但是如果有复杂的内容（非字符串的图片，视频等），也是需要使用`formidable`



### router

router就像中间件，所以一般是app.use(router.use)里面使用，因为router里面有自己的路由规则

浏览器只能发出get post请求，但是程序可以发出其他请求，如put delete







req.xhr 是否是ajax请求
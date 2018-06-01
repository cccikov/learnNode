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

app.use 会匹配任何以 path参数值 作为开头的路径

app.use(function(){

})

相当于

app.use("/",function(){

})
将匹配任何路径（因为任何路径都以"/"开头）

所以使用 静态资源中间件
app.use(express.static("public"));
实际是 app.use("/",express.static("public"));
就是浏览器访问"/"的时候，就读取public的根目录

如果是app.use("/static",express.static("public"));
就是浏览器访问"/static"的时候，就读取public的根目录


其他都是要完全和 path参数值 一样才可以，才可以匹配上，才会执行该中间件

router就像中间件，所以一般是app.use(router.use)里面使用，因为router里面有自己的路由规则

浏览器只能发出get post请求，但是程序可以发出其他请求，如put delete












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
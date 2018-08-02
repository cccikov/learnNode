/**
 * session
 * Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。
 * 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。
 * 客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。
 */

/**
 *
 * express-session
 *
 * 属性：
 * name - cookie的名字（原属性名为 key）。（默认：’connect.sid’）
 * store - session存储实例
 * secret - 用它来对session cookie签名，防止篡改
 * cookie - session cookie设置 （默认：{ path: ‘/‘, httpOnly: true,secure: false, maxAge: null }）
 * genid - 生成新session ID的函数 （默认使用uid2库）
 * rolling - 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
 * resave - 强制保存session即使它并没有变化 （默认： true）
 * proxy - 当设置了secure cookies（通过 "x-forwarded-proto" header ）时信任反向代理。当设定为true时， "x-forwarded-proto" header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
 * saveUninitialized - 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
 * unset - 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储状态但忽略修改或删除的请求（默认：keep）
 *
 * 方法：
 * Session.destroy():删除session，当检测到客户端关闭时调用。
 * Session.reload():当session有修改时，刷新session。
 * Session.regenerate()：将已有session初始化。
 * Session.save()：保存session。
 */

var express = require("express");
var app = express();

var session = require('express-session');

// Use the session middleware
app.use(session({
    //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    // name: 'hhw',
    secret: 'keyboard cat',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 6000
    },
    //重新保存：强制session保存即使是未修改的。默认为true但是得写上
    resave: true,
    //强制“未初始化”的session保存到存储。
    saveUninitialized: true,
}));

/**
 * session cookie
 *
 * session 的信息是存储在服务器的
 * 但是怎么识别是哪个客户端的呢，这就用到了cookie
 * 客户端第一次访问服务器后，服务器创建了一个新的session，这里假设为session_abc
 * 响应的时候同时将一个加密的cookie发送给客户端，这个加密的cookie就作为标识
 * 客户端再次访问的时候，请求中就会带着这个加密的cookie一同发送给服务器，服务器对比后，就可以找出对应的session，就会找到session_abc
 *
 * 然后我们就可以读取这个session中存储的信息
 */


// 只需要用express app的use方法将session挂载在‘/’路径即可，这样所有的路由都可以访问到session。
// 可以给要挂载的session传递不同的option参数，来控制session的不同特性
app.get('/', function (req, res, next) {
    var session = req.session // 用这个属性获取session中保存的数据，而且返回的JSON数据
    if (!session.views) {
        session.views = 1;
        res.send('welcome to the session demo. refresh!');
    } else {
        session.views++;
        res.send('<p>欢迎第 ' + session.views + '次访问' + 'expires in:' + (session.cookie.maxAge / 1000) + 's</p>')
    }
});

app.locals.nickname = ["小红", "小明", "小刚", "小赵", "小陈"]; // 总昵称

app.get("/index", function (req, res, next) {
    var id = req.sessionID;
    console.log(req.sessionID, req.session.id);

    if (!req.session.nickname) {
        req.session.nickname = app.locals.nickname[0]; // 给session起一个昵称
        app.locals.nickname.splice(0, 1); // 在当前总昵称里面删除第一个。
    } else {
        console.log("这个session对应的客户端是: " + req.session.nickname);
    }

    req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 日 小时  分钟  秒

    res.send("这是客户端: " + req.session.nickname);
});
// http://localhost:3000/index
// 用不同的客户端(不同的浏览器，不同的设备都可以)访问上面的地址，就会发现，没个客户端都只会对应自己的session。

app.listen(3000);
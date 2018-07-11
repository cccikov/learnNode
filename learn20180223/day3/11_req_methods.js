var express = require("express");
var app = express();

app.set("trust proxy", true);

app.get("/index/admin", (req, res, next) => {
    /* req.accepts */
    req.accepts()
    // req.acceptsCharsets()
    // req.acceptsEncodings()
    // req.acceptsLanguages()
    // req.get()
    // req.is()
    // req.param()
    res.send("haha")
});

app.listen(3000);
//  http://localhost:3000/index/admin

// http://127.0.0.1:3000/index/admin ip 会显示为 ::ffff:127.0.0.1
// windows从Windows 7以后默认启用IPv6。即使我的服务器仅在IPv4上侦听，Windows 7也会将::ffff:前缀发送到IPv4，作为向IPv6过渡的一部分
// 它是IPv4地址的IPv6版本。
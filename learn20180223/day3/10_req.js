var express = require("express");
var app = express();


app.get("/index/admin", (req, res, next) => {
    console.log("\n");
    console.log("req.app:  " + req.app);
    console.log("req.originalUrl:  " + req.originalUrl);
    console.log("req.baseUrl:  " + req.baseUrl);
    console.log("req.path:  " + req.path);
    console.log("req.hostname:  " + req.hostname);
    console.log("req.query:  " + req.query);
    console.log("req.body:  " + req.body);
    console.log("req.params:  " + req.params);
    console.log("req.ip:  " + req.ip);
    console.log("req.ips:  " + req.ips);
    console.log("req.fresh:  " + req.fresh);
    console.log("req.xhr:  " + req.xhr);
    console.log("req.cookies:  " + req.cookies);
    console.log("req.protocol:  " + req.protocol);
    console.log("req.route:  " + req.route);
    console.log("req.secure:  " + req.secure);
    console.log("req.signedCookies:  " + req.signedCookies);
    console.log("req.stale:  " + req.stale);
    console.log("req.subdomains:  " + req.subdomains);
    res.send("<br> req.app:  " + req.app
    +"<br> req.originalUrl:  " + req.originalUrl
    +"<br> req.baseUrl:  " + req.baseUrl
    +"<br> req.path:  " + req.path
    +"<br> req.hostname:  " + req.hostname
    +"<br> req.query:  " + req.query
    +"<br> req.body:  " + req.body
    +"<br> req.params:  " + req.params
    +"<br> req.ip:  " + req.ip
    +"<br> req.ips:  " + req.ips
    +"<br> req.fresh:  " + req.fresh
    +"<br> req.xhr:  " + req.xhr
    +"<br> req.cookies:  " + req.cookies
    +"<br> req.protocol:  " + req.protocol
    +"<br> req.route:  " + req.route
    +"<br> req.secure:  " + req.secure
    +"<br> req.signedCookies:  " + req.signedCookies
    +"<br> req.stale:  " + req.stale
    +"<br> req.subdomains:  " + req.subdomains);
});

app.listen(3000);
//  http://localhost:3000/index/admin
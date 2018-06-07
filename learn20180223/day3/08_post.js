var express = require("express");
var app = express();

app.use(express.static("./",{
    index:"08_post.html"
}));

app.post("/me/postdata",function(req,res){
    // 不需要再通过url模块去分析参数部分，直接用req.query
    console.log(req.query);
    res.send(req.query);
});

app.listen(3000);
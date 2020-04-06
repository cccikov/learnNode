let fs = require("fs");

fs.readFile("./static/js/data.json",function(err,data){
    if(err){
        throw err;
    }
    console.log(data); // 是一个buffer类型
    console.log(JSON.parse(data));
    console.log(data.toString("utf8")); // 根据编码转化为字符串
    console.log(JSON.parse(data.toString("utf8")));
});



fs.readFile("./static/js/data.json","utf8",function(err,data){
    if(err){
        throw err;
    }
    console.log("\n增加编码格式");
    console.log(data); // 是一个buffer类型
});

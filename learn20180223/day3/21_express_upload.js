var express = require("express");
var app = express();
var path = require("path");

var multer = require('multer')

var storage = multer.diskStorage({

    // destination - 存储在哪个文件夹。可以是函数，可以是字符串
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    // destination: "uploads",

    // 存储文件名
    filename: function (req, file, cb) {
        var nameToArr = file.originalname.split(".");
        nameToArr[0] += '-' + Date.now();
        var name = nameToArr.join(".");
        cb(null, name);
    }
});

var upload = multer({
    /* dest or storage 二选一 */
    // dest: 'uploads/',
    storage: storage
});

/**
 * 上传单个文件
 * .single(fieldname)
 * 接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。
 *
 * fieldname--Field name 由表单指定的 name
 */
app.post("/single", upload.single('single'), (req, res, next) => {
    res.send({
        file: req.file,
        body: req.body,
    });
});

/**
 * 上传多个文件
 * .array(fieldname[, maxCount])
 * 接受一个以 fieldname 命名的文件数组。可以配置 maxCount 来限制上传的最大数量。这些文件的信息保存在 req.files。
 *
 * fieldname--Field name 由表单指定的 name
 */
app.post("/multiple", upload.array('files'), (req, res, next) => {
    res.send({
        files: req.files,
        body: req.body,
    });
});

/**
 * 上传混合文件
 * .fields(fields)
 * 受指定 fields 的混合文件。这些文件的信息保存在 req.files。
 * fields 应该是一个对象数组，应该具有 name 和可选的 maxCount 属性。
 */
app.post("/mix", upload.fields([{
    name: "file",
    maxCount: 1
}, {
    name: "files"
}, {
    name: "pictures"
}]), (req, res, next) => {
    res.send({
        files: req.files,
        body: req.body,
    });
});

/**
 * .any()
 * 接受一切上传的文件。文件数组将保存在 req.files。
 */
app.post("/any", upload.any(), (req, res, next) => {
    res.send({
        files: req.files,
        body: req.body,
    });
});

/**
 * .none()
 * 只接受文本域。如果任何文件上传到这个模式，将发生 "LIMIT_UNEXPECTED_FILE" 错误。这和 upload.fields([]) 的效果一样
 */
app.post("/none", upload.none(), (req, res, next) => {
    res.send({
        body: req.body,
    });
});


/**
 * 随机使用某个上传中间件 （）
 */
app.post("/file", (req, res, next) => {
    // 在中间件里面调用中间件函数。
    let middleware; // 中间件
    let ran = Math.random(); // 随机数

    if (ran < 0.25) {
        middleware = upload.single('single'); // 中间件，中间件的本质是一个函数
        req.middleware = "single";
    } else if (ran >= 0.25 && ran < 0.5) {
        middleware = upload.array('files'); // 中间件，中间件的本质是一个函数
        req.middleware = "array";
    } else if (ran >= 0.5 && ran < 0.75) {
        middleware = upload.fields([{
            name: "file",
            maxCount: 1
        }, {
            name: "files"
        }, {
            name: "pictures"
        }]); // 中间件，中间件的本质是一个函数
        req.middleware = "fields";
    } else {
        middleware = upload.any(); // 中间件，中间件的本质是一个函数
        req.middleware = "any";
    }
    middleware(req, res, next); // 调用中间件，由于中间件函数执行时，会传入req, res, next；所以传入req, res, next来调用

}, function (req, res, next) {
    res.send({
        middleware: req.middleware,
        file: req.file,
        files: req.files,
        body: req.body,
    });
});

app.get("/axios.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/axios.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.use(express.static(__dirname, {
    index: "./21_express_upload.html"
})); // 以当前文件夹作为静态资源根目录

console.log("\n 启动服务 localhost:3000 \n");
app.listen(3000);
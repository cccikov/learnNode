/* gulp 4 写法 */

/* 来源 "git@gitee.com:cccikov/guangwang.git" gulpfile.js  */

/**
"browser-sync": "^2.26.7",
"gulp": "^4.0.2",
"gulp-clean-css": "^4.2.0",
"gulp-less": "^4.0.1",
"gulp-rename": "^1.4.0"
"gulp-babel": "^8.0.0",
"gulp-imagemin": "^6.1.1",
"gulp-plumber": "^1.2.1",
"http-proxy-middleware": "^1.0.3"
 */

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let less = require('gulp-less'); //
let minicss = require("gulp-clean-css");
let imagemin = require("gulp-imagemin");
let rename = require("gulp-rename");
let browserSync = require('browser-sync').create();
let babel = require('gulp-babel');
let { createProxyMiddleware: proxy } = require('http-proxy-middleware');

let proxy_appweb = proxy('/appweb', {
    // target: 'http://192.168.0.180:8080', // chen
    target: 'https://t202.maijju.com:6082', // 202 外网
    // target: 'https://adm_t.maijju.com', // 准生产 外网
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    secure: false,
    pathRewrite: {
        '^/appweb': '/appweb'
    },
});
let proxy_services = proxy('/services', {
    // target: 'http://192.168.0.180:8118', // chen
    target: 'https://t202.maijju.com:6082', // 202 外网
    // target: 'https://mszmtest.maijju.com', // 准生产 外网
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    secure: false,
});

/**
 * 执行任务 gulp xxx
 * 因为现在node已经不建议全局安装包了，所以可能gulp不是一个命令
 * npx gulp xxx 去调用项目内部模块
 */

/**
 * 测试 任务
 */
function testFn(cb) {
    // 任务
    console.log("这是一个测试任务", cb);
    // gulp 不再支持同步任务（Synchronous tasks）了。因为同步任务常常会导致难以调试的细微错误，例如忘记从任务（task）中返回 stream。
    // 当你看到 "Did you forget to signal async completion?" 警告时，说明你并未使用前面提到的返回方式。你需要使用 callback 或返回 stream、promise、event emitter、child process、observable 来解决此问题。
    cb();
}


/**
 * 静态服务器
 */
function server() {
    return browserSync.init({
        server: {
            baseDir: "./web3",
            index: "index.html",
            middleware: [proxy_appweb, proxy_services] // 中间件
        },
        port: 3018,
        ui: { // ui的默认端口
            port: 3019,
            weinre: { // 不知道什么鬼 "weinre"好像也是用于远程调试的nodejs工具
                port: 3020
            }
        }
    });
}

/**
 * 监测 html js 变化的时候 reload
 */
function reload() {
    return gulp.watch(["web3/*.html", "web3/js/*.js"]).on("change", function (event) {
        console.log(event + " change")
        try {
            gulp.src(event).pipe(browserSync.reload({
                stream: true
            }));
        } catch (error) {
            console.error(error);
        }
    });
}

/**
 * 转化 less
 */
function less2css() {
    return gulp.src("web3/less/**/*.less", { // 这个是全部less变化且刷新
            base: "web3/less"
        })
        .pipe(plumber()) // 报错弹出，不至于导致gulp崩溃关闭
        .pipe(less())
        .pipe(gulp.dest("web3/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
}

/**
 * 转化 less watch
 */
function less2cssWatch() {
    return gulp.watch("web3/less/**/*.less").on('change', function (event) {
        console.log("实时编译css");
        less2css();
    });
}


/**
 * 转换js
 */
function js() {
    return gulp.src(["web3/js/base.js", "web3/js/index.js", "web3/js/solution2.js"]).pipe(plumber()) // 报错弹出，不至于导致gulp崩溃关闭
        .pipe(babel({
            presets: ['@babel/env'],
        }))
        .pipe(gulp.dest('web3/js/dist'))
}

/**
 * 检测js变化
 */
function jsWatch() {
    return gulp.watch(["web3/js/base.js", "web3/js/index.js", "web3/js/solution2.js"]).on("change", function (event) {
        gulp.src(event).pipe(plumber()) // 报错弹出，不至于导致gulp崩溃关闭
            .pipe(babel({
                presets: ['@babel/env'],
            }))
            .pipe(gulp.dest('web3/js/dist'))
    });
}

/**
 * 压缩图片
 */
function image() {
    return gulp.src('web3/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('web3/images/'))
}


/**
 * series 是按顺序执行，所以会等前面的任务执行完再执行，所以有watch的任务放在series里面，后面不要再放别的任务
 * parallel 是并发执行
 */

exports.test = gulp.series(testFn);
exports.server = gulp.series(server);
exports.reload = gulp.series(reload);
exports.less2css = gulp.series(less2css);
exports.less2cssWatch = gulp.series(less2cssWatch);
exports.js = gulp.series(js);
exports.jsWatch = gulp.series(jsWatch);
exports.image = gulp.series(image);
exports.web = gulp.series(js, less2css, gulp.parallel(server, reload, less2cssWatch, jsWatch));
exports.default = gulp.series(js, less2css, gulp.parallel(server, reload, less2cssWatch, jsWatch)); // 默认，直接 npx gulp 运行
# http-proxy-middleware 用法解析

[http-proxy-middleware 官方网站](https://github.com/chimurai/http-proxy-middleware)

``` javascript
    createProxyMiddleware([context,] config)
```

需要代理的路径 `context`，options选项 `config`，返回中间件



* express

    由于 `express` 可以通过 `app.use` 直接使用中间件，所以代理路径就直接写在 `app.use` 第一个参数中，第二参数就是中间件；所以使用 `createProxyMiddleware` 的时候可以忽略代理路径，只需要传入`options`，

    > ps： 为了启动服务的时候，控制台可以显示正确的代理 前->后 路径，使用 `createProxyMiddleware` 的时候最好也将代理路径填上

    [http-proxy-middleware官方例子](https://github.com/chimurai/http-proxy-middleware/blob/master/examples/express/index.js)

    ``` javascript
    // 中间件使用方式 createProxyMiddleware(config)

    const {createProxyMiddleware} = require('http-proxy-middleware');

    // ...

    app.use('/api', createProxyMiddleware({
        target: 'http://www.example.org',
        changeOrigin: true
    }));

    // or

    let apiProxy = createProxyMiddleware({
        target: 'http://www.example.org',
        changeOrigin: true
    })
    app.use('/api', apiProxy);


    // or

    let apiProxy = createProxyMiddleware('/api' ,{
        target: 'http://www.example.org',
        changeOrigin: true
    })
    app.use('/api', apiProxy);

    ```

    见例子：`./express-server.js` 使用命令 `node express-server.js` 运行

* browser-sync (gulp 插件)

    `gulp` 无法通过 `app.use` 直接使用中间件，所以是采用最全的写法，使用 `createProxyMiddleware` 的时候，需要传入代理路径和options选项；然后在`browser-sync` 初始化时，在选项 `server` 的 `middleware` 属性中引用

    [http-proxy-middleware官方例子](https://github.com/chimurai/http-proxy-middleware/blob/master/examples/browser-sync/index.js)

    ``` javascript
    // 中间件使用方式 createProxyMiddleware([context,] config)

    const {createProxyMiddleware} = require('http-proxy-middleware');
    let apiProxy = createProxyMiddleware('/api', {
        target: 'http://www.example.org',
        changeOrigin: true
    })
    ```


    在 `browser-sync` 初始化时引用中间件
    ``` javascript
    let browserSync = require('browser-sync').create();
    browserSync.init({
        server: {
            middleware: [apiProxy] // 中间件
        },
    });
    ```

    见例子：`./browser-sync-gulpfile.js`  改名为 `gulpfile.js` 使用命令 `npx gulp` 运行

* webpack

    由于 webpack 是在一个js配置文件，所以无法直接执行代理方法，通过配置方式去指定，代理路径:对应的options选项，让webpack内部处理

    [webpack官方文档](https://webpack.js.org/configuration/dev-server/#devserverproxy)

    ``` javascript
    // 使用方式 {[context]:config} [context]--为代理路径字符串，config--为options选项

    proxy: {
        "/api": {
            target: 'http://www.example.org',
            changeOrigin: true,
        }
    }
    ```

    例子见任意一个webpack项目


ps：一般不直接代理 "/" 根路径，因为代理了根路径后，其他的代理将会没用，都会进入这个根路径代理
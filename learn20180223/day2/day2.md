# day2

1. 复习
2. npm 模块的require
3. 路径
4. 封装模块
5. post请求 addListener
6. formidable 文件上传 util.inspect

express 相对于nodejs
就相当于 jquery相对于javascript
只是封装了好多东西 , 让nodejs使用起来更加简便

* module 模块

如果传递给 require() 的模块标识符不是一个核心模块，也没有以 '/' 、 '../' 或 './' 开头，则 Node.js 会从当前模块的父目录开始，尝试从它的 /node_modules 目录里加载模块。 Node.js 不会附加 node_modules 到一个已经以 node_modules 结尾的路径上。

如果还是没有找到，则移动到再上一层父目录，直到文件系统的根目录。

想要获得调用 `require()` 时加载的确切的文件名，使用 `require.resolve()` 函数。

综上所述，以下用伪代码描述的高级算法，解释 `require.resolve()` 做了些什么：

```txt
从 Y 路径的模块 require(X)
1. 如果 X 是一个核心模块，
   a. 返回核心模块
   b. 结束
2. 如果 X 是以 '/' 开头
   a. 设 Y 为文件系统根目录
3. 如果 X 是以 './' 或 '/' 或 '../' 开头
   a. 加载文件(Y + X)
   b. 加载目录(Y + X)
4. 加载Node模块(X, dirname(Y))
5. 抛出 "未找到"

加载文件(X)
1. 如果 X 是一个文件，加载 X 作为 JavaScript 文本。结束
2. 如果 X.js 是一个文件，加载 X.js 作为 JavaScript 文本。结束
3. 如果 X.json 是一个文件，解析 X.json 成一个 JavaScript 对象。结束
4. 如果 X.node 是一个文件，加载 X.node 作为二进制插件。结束

加载目录(X)
1. 如果 X/package.json 是一个文件，
   a. 解析 X/package.json，查找 "main" 字段
   b. let M = X + (json main 字段)
   c. 加载文件(M)
   d. 加载索引(M)
2. 加载索引(X)

加载索引(X)
1. 如果 X/index.js 是一个文件，加载 X/index.js 作为 JavaScript 文本。结束
3. 如果 X/index.json  是一个文件，解析 X/index.json 成一个 JavaScript 对象。结束
4. 如果 X/index.node 是一个文件，加载 X/index.node 作为二进制插件。结束

加载Node模块(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. 加载文件(DIR/X)
   b. 加载目录(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
```

就是说
```javascript
require("bar");
```

由于没有`"./" "../" "/"` , 走加载加载Node模块 , 所以是在`/node_modules` 文件夹中找到`bar` ;

先走加载文件`bar.js` , 如果`bar`不是一个文件 ;

就走加载目录 , 如果`bar`里面有`package.json`文件 , 就找到文件里面的`main`属性 , 加载对应的文件

如果没有`package.json`文件 , 就走加载索引 , 即加载`bar`里面的`index.js`文件
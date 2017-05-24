# learn20170524

主要是根据 nodejs 开发指南学习

## 学习笔记

### Node.js 介绍

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

Node.js 使用了一个**事件驱动**、**非阻塞式 I/O** 的模型

#### 异步式 I/O 与事件驱动

Node.js 最大的特点就是采用异步式 I/O 与事件驱动的架构设计

这段代码中 db.query 的第二个参数是一个函数，我们称为回调函数。

    db.query('SELECT * from some_table', function(res) {
        res.output();
    });
进程在执行到db.query 的时候，不会等待结果返回，而是直接继续执行后面的语句，直到进入事件循环。当数据库查询结果返回时，会事件发送到事件队列，等到线程进入事件循环以后，才会调用之前的回调函数继续执行后面的逻辑。

Node.js 的异步机制是基于事件的，所有的磁盘 I/O、网络通信、数据库查询都以非阻塞的方式请求，返回的结果由事件循环来处理。

#### CommonJs

Node.js采用的是CommonJS规范

#### 版本

与Ubuntu一样 分 LTS(Long Term Support)长时间支持版本 和 最新版

##### 语言 还是 平台
Node.js究竟是一门后台语言，还是一个平台。

这里说 Node.js是一个平台，而不是一门语言。Node.js是一个让JavaScript运行在浏览器之外的平台，语言是JavaScript（实际是ECMAScript，因为没有dom，bom），以前js往往只是用于浏览器（前端，客户端），Node.js把其扩展到新的应用场景，使js可以作为一本服务器语言去使用（后台）。JavaScript设计之初本来就不止止是想作为客户端语言使用，但是由于各种问题，缺少平台，少人使用，导致JavaScript成为前端开发的代名词。

所以实际，Node.js是一个平台，但是同时也常被人叫做是一门语言，一个框架。

ps：开发Node.js平台是使用c++，Node.js的语法是js(js的运行平台)。

-------------------------

### Node.js 入门

node命令(cmd或者其他终端中执行)

    node [options] [ -e script | script.js ] [arguments]
    node debug script.js [arguments]

* 运行 js文件

        node helloworld.js

* 运行js代码

        node -e "console.log('Hello World');"

* 使用 node 的 REPL 模式

    运行无参数的 node 将会启动一个 JavaScript的交互式 shell

        node

    连续两次ctrl+c退出REPL

    进入 REPL 模式以后，会出现一个“>”提示符提示你输入命令，输入后按回车，Node.js将会解析并执行命令。

#### 建立http服务器

Node.js 是为网络而诞生的平台，但又与 ASP、PHP 有很大的不同。

成功运行 PHP 之前先要配置一个功能强大而复杂的 HTTP服务器，譬如 Apache、IIS 或 Nginx，还需要将 PHP 配置为 HTTP 服务器的模块，或者使用FastCGI 协议调用 PHP 解释器。

    浏览器 - HTTP 服务器 - PHP 解释器

而node不需要HTTP服务器,本身就支持建立一个HTTP服务器

    浏览器 - Node

`learn2/index.js`为搭建服务器代码，打开浏览器访问 http://127.0.0.1:3000 或者 http://localhost:3000

。在终端中运行这个脚本时，我们会发现它并不像 Hello World 一样结束后立即退出，而是一直等待，直到按下 <kbd>Ctrl</kbd>+<kbd>C</kbd> 才会结束。这是因为 listen 函数中创建了事件监听器，使得 Node.js 进程不会退出事件
循环。
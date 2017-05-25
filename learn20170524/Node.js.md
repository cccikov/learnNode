# learn20170524

主要是根据 nodejs 开发指南学习

## 学习笔记



### Node.js 介绍

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

> Node.js 使用了一个**事件驱动**、**非阻塞式 I/O** 的模型



#### 异步式 I/O 与事件驱动

> Node.js 最大的特点就是采用异步式 I/O 与事件驱动的架构设计

这段代码中 db.query 的第二个参数是一个函数，我们称为回调函数。

    db.query('SELECT * from some_table', function(res) {
        res.output();
    });

进程在执行到db.query 的时候，不会等待结果返回，而是直接继续执行后面的语句，直到进入事件循环。当数据库查询结果返回时，会事件发送到事件队列，等到线程进入事件循环以后，才会调用之前的回调函数继续执行后面的逻辑。

> Node.js 的异步机制是基于事件的，所有的磁盘 I/O、网络通信、数据库查询都以非阻塞的方式请求，返回的结果由事件循环来处理。



#### CommonJs

Node.js采用的是CommonJS规范



#### 版本

与Ubuntu一样 分 LTS(Long Term Support)长时间支持版本 和 最新版



##### 语言 还是 平台

* Node.js究竟是一门后台语言，还是一个平台。

* 这里说 Node.js是一个平台，而不是一门语言。Node.js是一个让JavaScript运行在浏览器之外的平台，语言是JavaScript（实际是ECMAScript，因为没有dom，bom），以前js往往只是用于浏览器（前端，客户端），Node.js把其扩展到新的应用场景，使js可以作为一本服务器语言去使用（后台）。JavaScript设计之初本来就不止止是想作为客户端语言使用，但是由于各种问题，缺少平台，少人使用，导致JavaScript成为前端开发的代名词。

* 所以实际，Node.js是一个平台，但是同时也常被人叫做是一门语言，一个框架。

* ps：开发Node.js平台是使用c++，Node.js的语法是js(js的运行平台)。




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

在终端中运行这个脚本时，我们会发现它并不像 Hello World 一样结束后立即退出，而是一直等待，直到按下 <kbd>Ctrl</kbd>+<kbd>C</kbd> 才会结束。这是因为 listen 函数中创建了事件监听器，使得 Node.js 进程不会退出事件
循环。

###### 小技巧——使用 supervisor

*如果你有 PHP 开发经验，会习惯在修改 PHP 脚本后直接刷新浏览器以观察结果，而你在开发 Node.js 实现的 HTTP 应用时会发现，无论你修改了代码的哪一部份，都必须终止Node.js 再重新运行才会奏效。这是因为 Node.js 只有在第一次引用到某部份时才会去解析脚本文件，以后都会直接访问内存，避免重复载入，而 PHP 则总是重新读取并解析脚本（如果没有专门的优化配置）。Node.js的这种设计虽然有利于提高性能，却不利于开发调试，因为我们在开发过程中总是希望修改后立即看到效果，而不是每次都要终止进程并重启。supervisor 可以帮助你实现这个功能，它会监视你对代码的改动，并自动重启 Node.js。*

使用方法很简单，首先使用 npm 安装 supervisor：

    $ npm install -g supervisor


接下来，使用 supervisor 命令启动 app.js：

    $ supervisor app.js


#### 异步式 I/O 与事件式编程

> Node.js 最大的特点就是异步式 I/O（或者非阻塞 I/O）与事件紧密结合的编程模式。

> 这种模式与传统的同步式 I/O 线性的编程思路有很大的不同，因为控制流很大程度上要靠**事件**和**回调函数**来组织(事件驱动)。

##### 阻塞与线程

* 线程在执行中如果遇到磁盘读写或网络通信（统称为 I/O 操作），通常要耗费较长的时间，这时操作系统会剥夺这个线程的 CPU 控制权，使其暂停执行，同时将资源让给其他的工作线程，这种线程调度方式称为 **阻塞**。当 I/O 操作完毕时，操作系统将这个线程的阻塞状态解除，恢复其对CPU的控制权，令其继续执行。这种 I/O 模式就是通常的**同步式 I/O**（Synchronous I/O）或**阻塞式 I/O** （Blocking I/O）。

* **异步式 I/O** （Asynchronous I/O）或 **非阻塞式 I/O** （Non-blocking I/O）则针对所有 I/O 操作不采用阻塞的策略。当线程遇到 I/O 操作时，**不会以阻塞的方式等待 I/O 操作的完成或数据的返回，而只是将 I/O 请求发送给操作系统，继续执行下一条语句**。当操作系统完成 I/O 操作时，以事件的形式通知执行 I/O 操作的线程，线程会在特定时候处理这个事件。为了处理异步 I/O，线程必须有事件循环，不断地检查有没有未处理的事件，依次予以处理。

* 阻塞模式下，一个线程只能处理一项任务，要想提高吞吐量必须通过多线。

* 非阻塞模式下，一个线程永远在执行计算操作，这个线程所使用的 CPU 核心利用率永远是 100%，I/O 以事件的方式通知。

* 阻塞模式下，多线程往往能提高系统吞吐量，因为一个线程阻塞时还有其他线程在工作，多线程可以让 CPU 资源不被阻塞中的线程浪费。

* 非阻塞模式下，线程不会被 I/O 阻塞，永远在利用 CPU。

|同步式 I/O（阻塞式）               |异步式 I/O（非阻塞式）    |
|---------------------------------|-------------------------|
|利用多线程提供吞吐量               |单线程即可实现高吞吐量     |
|通过事件片分割和线程调度利用多核CPU |通过功能划分利用多核CPU    |
|需要由操作系统调度多线程使用多核 CPU|可以将单进程绑定到单核 CPU |
|难以充分利用 CPU 资源              |可以充分利用 CPU 资源     |
|内存轨迹大，数据局部性弱            |内存轨迹小，数据局部性强   |
|符合线性的编程思维                 |不符合传统编程思维         |

*事件驱动的单线程异步模型* 与 *多线程同步模型*


##### 回调函数

* 异步

        var fs = require('fs');
        fs.readFile('./theFile.txt', "utf-8", function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
        console.log('end');

    返回

        end
        我是file内容


    异步式读取文件就稍微有些违反直觉了，end先被输出。异步式 I/O 是通过回调函数来实现的。fs.readFile 接收了三个参数，第一个是文件名，第二个是编码方式，第三个是一个函数，我们称这个函数为回调函数。

    fs.readFile 调用时所做的工作只是将异步式 I/O 请求发送给了操作系统，然后立即返回并执行后面的语句，执行完以后进入事件循环监听事件。当 fs 接收到 I/O 请求完成的事件时，事件循环会主动调用回调函数以完成后续工作。因此我们会先看到 end，再看到file.txt 文件的内容。

* 同步

        var fs = require('fs');
        var data = fs.readFileSync('./theFile.txt', "utf-8");
        console.log(data);
        console.log("end");


    返回

        我是file内容
        end

    同步式读取文件的方式比较容易理解，将文件名作为参数传入 fs.readFileSync 函数，阻塞等待读取完成后，将文件的内容作为函数的返回值赋给 data 变量，接下来控制台输出 data 的值，最后输出 end。但是会造成阻塞，影响性能。



事件
    事件的监听器(接受事件的对象,事件侦听者（Event listener))
    ele.addEventListener("事件",listener,Boolean);
    这就给ele注册了一个监听器

    listener 必须是一个实现了 EventListener(事件监听器) 接口的对象,但是由于所有的JavaScript Function 对象都会自动实现这个接口。因此直接调用某个handleEvent() 的实现，就和直接调用一个函数没有差别,所以一般listener是写监听器的回调函数

    https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
    https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener
    http://developer.egret.com/cn/github/egret-docs/Engine2D/event/listener/index.html

    https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget

    监听器就是函数,还是监听器里面有函数呢.
    函数是处理事件的函数,是监听器的回调函数.

    监听器里面会有一个处理事件的回调函数,事件触发的时候会调用注册的监听器,监听器会调用处理程序的函数;由于js中函数都有监听器接口,所以调用监听器,和直接调用函数没有什么区别.所以说
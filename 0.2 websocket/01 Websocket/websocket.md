# HTML5 Websocket

* [mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

* [规范](https://html.spec.whatwg.org/multipage/web-sockets.html#the-websocket-interface)

> 以下内容均基于 mdn文档 作小部分修改

## 构造函数 Constructor

`WebSocket`

``` javascript
new WebSocket(url [, protocols])
```


``` javascript
var websocket = new WebSocket(url [, protocols])
```

返回一个 WebSocket 对象。

* 参数

    - `url`
        要连接的URL；这应该是WebSocket服务器将响应的URL。

    - `protocols` 可选
        一个协议字符串或者一个包含协议字符串的数组。这些字符串用于指定子协议，这样单个服务器可以实现多个WebSocket子协议（例如，您可能希望一台服务器能够根据指定的协议（protocol）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

* 抛出异常

    - `SECURITY_ERR`

        正在尝试连接的端口被阻止。


### 属性 property

```
binaryType
bufferedAmount
extensions
protocol
readyState
url
```

* `binaryType`

    ``` javascript
    websocket.binaryType
    ```

    返回websocket连接所传输二进制数据的类型。

    - 返回值:

        一条 `DOMString`:

        + `blob`

            如果传输的是 `Blob` 类型的数据。

        + `arraybuffer`

            如果传输的是 `ArrayBuffer` 类型的数据。

* `bufferedAmount`

    ``` javascript
    websocket.bufferedAmount
    ```

    是一个**只读**属性，用于返回已经被`send()`方法放入队列中但还没有被发送到网络中的数据的字节数。一旦队列中的所有数据被发送至网络，则该属性值将被重置为0。但是，若在发送过程中连接被关闭，则属性值不会重置为0。如果你不断地调用`send()`，则该属性值会持续增长

* `extensions`

    ``` javascript
    websocket.extensions
    ```

    是**只读**属性，返回服务器已选择的扩展值。目前，链接可以协定的扩展值只有空字符串或者一个扩展列表。

    - 返回值:

        `DOMString`.

* `protocol`

    ``` javascript
    websocket.protocol
    ```

    是个**只读**属性，用于返回服务器端选中的子协议的名字；这是一个在创建`WebSocket` 对象时，在参数`protocols`中指定的字符串。

    - 返回值:

        `DOMString`.

* `readyState`

    ``` javascript
    websocket.readyState
    ```

    返回当前 WebSocket 的链接状态，**只读**。

    - 返回值:

        以下其中之一：

        + 0 (WebSocket.CONNECTING)

            正在链接中

        + 1 (WebSocket.OPEN)

            已经链接并且可以通讯

        + 2 (WebSocket.CLOSING)

            连接正在关闭

        + 3 (WebSocket.CLOSED)

            连接已关闭或者没有链接成功


* `url`

    ``` javascript
    websocket.url
    ```

    是一个**只读**属性，返回值为当构造函数创建WebSocket实例对象时URL的绝对路径。

    - 返回值:

        A `DOMString`.

### 方法 Method

* `close()`

    ``` javascript
    websocket.close();
    ```

    关闭 WebSocket  连接或连接尝试（如果有的话）。 如果连接已经关闭,则此方法不执行任何操作。


    * 参数

        - `code` 可选

            一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用1005。CloseEvent的允许的状态码见状态码列表 。

        - `reason` 可选

            一个人类可读的字符串，它解释了连接关闭的原因。这个UTF-8编码的字符串不能超过123个字节。

    * 抛出的异常

        - `INVALID_ACCESS_ERR`

            一个无效的code

        - `SYNTAX_ERR`

            reason 字符串太长（超过123字节）

* `send()`

    ``` javascript
    websocket.send();

    websocket.send("Hello server!");
    ```

    将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的data bytes的大小来增加 bufferedAmount的值 。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。



    * 参数

        - data

            用于传输至服务器的数据。它必须是以下类型之一：

            + USVString

                文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 `bufferedAmount` 将加上该字符串以 UTF-8 格式编码时的字节数的值。

            + ArrayBuffer

                您可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，`bufferedAmount` 将加上所需字节数的值。

            + Blob

                Blob 类型将队列 blob 中的原始数据以二进制中传输。 `bufferedAmount` 将加上原始数据的字节数的值。

            + ArrayBufferView

                您可以以二进制帧的形式发送任何 JavaScript 类数组对象 ；其二进制数据内容将被队列于缓冲区中。值 `bufferedAmount` 将加上必要字节数的值。

    * 异常

        - INVALID_STATE_ERR

            当前连接未处于 OPEN 状态。

        - SYNTAX_ERR

            数据是一个包含未配对代理(unpaired surrogates)的字符串。

### 事件 Event

可采用 DOM0级`on-event` / `on<...>` 写法和 DOM2级`addEventListener()`

```
close
error
message
open
```

* `close`

    ``` javascript
    websocket.onclose = function(event){
        console.log("WebSocket is closed now.");
    }

    // or

    websocket.addEventListener("close",function(event){
        console.log("WebSocket is closed now.");
    })
    ```

    这个事件监听器将在 `WebSocket` 连接的 `readyState` 变为 `CLOSED` 时被调用，它接收一个名字为`close`的 `CloseEvent` 事件。

* `error`

    ``` javascript
    websocket.onerror = function(event){
        console.error("WebSocket error observed:", event);
    }

    // or

    websocket.addEventListener("error",function(event){
        console.error("WebSocket error observed:", event);
    })
    ```

    你可以定义一个发生错误时执行的回调函数，此事件的事件名为"error"

* `message`

    ``` javascript
    websocket.onmessage = function(event){
        console.debug("WebSocket message received:", event);
        console.log('Message from server ', event.data);
    }

    // or

    websocket.addEventListener("message",function(event){
        console.debug("WebSocket message received:", event);
        console.log('Message from server ', event.data);
    })
    ```

    是一个当收到来自服务器的消息时被调用的事件处理程序 `EventHandler` 。它由一个MessageEvent调用。

* `open`

    ``` javascript
    websocket.onopen = function(event){
        console.log("WebSocket is open now.");
    }

    // or

    websocket.addEventListener("open",function(event){
        console.log("WebSocket is open now.");
    })
    ```

    当WebSocket 的连接状态 `readyState` 变为 `OPEN` 时调用;这意味着当前连接已经准备好发送和接受数据。这个事件处理程序通过 `Event`（建立连接时）触发。


### 继承

    `EventTarget` 所以可以使用 `WebSocket` 实例可以使用 `addEventListener` 方法


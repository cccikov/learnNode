# socket.io 个人理解

socket.io 就好像"事件绑定"一样，服务端/客户端监听（on）事件，触发（emit）事件，传的数据可以不多，要是复杂的数据，可以通过 客户端=>websocket通知服务端，然后接着用ajax传输到服务端；或者服务端=>websocket通知客户端，客户端ajax去取

* [官网](https://socket.io/)
* [文档](https://socket.io/docs/)
* [服务端 API](https://socket.io/docs/server-api/)
* [客户端 API](https://socket.io/docs/client-api//)
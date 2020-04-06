# node 坑

1. 路径问题：
    express，app.use,app.all,app.METHOD 都会将路径当成目录路径处理
    node path.resolve 也会将路径当成目录路径处理
    node path.parse 无论如何都会将路径当成是文件路径处理
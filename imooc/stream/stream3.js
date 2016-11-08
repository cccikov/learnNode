/*复制图片2*/

var fs  = require('fs');

var readStream = fs.createReadStream('Fate stay night Good End Sunny day GB.mp4');
var writeStream = fs.createWriteStream('video.mp4');


//最简单的写法
/*readStream.on('data',function(chunk){
    writeStream.write(chunk)
}).on('end',function(){
    writeStream.end();
});
// 这段代码有个问题 :
// 如果readStream读文件读得快 , writeStream写得慢 , 因为i/o的读写速度不是恒定的 , 这时候数据流内部缓存可能会好大*/

var n = 0;
readStream.on('data',function(chunk){
    if(writeStream.write(chunk)==false){//说明数据还在缓存区 , 暂停读取数据
        console.log('still cached');
        readStream.pause();//暂停读取数据
    }
}).on('end',function(){
    writeStream.end();
    console.log(n);
});

writeStream.on('drain',function(){//数据已经写入到目标了
    n++;
    console.log('data drains');
    readStream.resume();//继续读取数据
});


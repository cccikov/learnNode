var fs = require('fs');
fs.readFile('man.jpg',function(err,origin_buffer){
    console.log(Buffer.isBuffer(origin_buffer));//origin_buffer是一个Buffer对象
    fs.writeFile('man_buffer.jpg',origin_buffer,function(err){//这里通过那个Buffer对象转化为文件
        if(err)
            console.log(err);
    });

    // var base64Image = new Buffer(origin_buffer).toString('base64');
    var base64Image = origin_buffer.toString('base64');//将这个buffer对象转化为base64位的字符串格式

    console.log(base64Image);

    var decodedImage = new Buffer(base64Image,'base64');//新建一个Buffer对象,内容是那个base64字符串,采用base64编码格式

    console.log(Buffer.compare(origin_buffer,decodedImage));//0 表示两个Buffer相同

    fs.writeFile('man_decoded.jpg',decodedImage,function(err){
        if(err)
            console.log(err);
    });
});
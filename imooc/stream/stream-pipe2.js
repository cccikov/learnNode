var fs = require('fs');

fs.createReadStream('Fate stay night Good End Sunny day GB.mp4').pipe(fs.createWriteStream('video_pipe.mp4'));
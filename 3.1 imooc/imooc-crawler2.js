var http = require('http');
var Promise  = require('bluebird');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';
var baseUrl = 'http://www.imooc.com/learn/'

function filterChapters(html){
    var $ = cheerio.load(html);
    $('.chapter-content').remove();
    $('.moco-btn').remove();
    var chapters = $('.chapter');
    // console.log(chapters.html());

    var courseData = [];
    chapters.each(function(item){
        var chapter = $(this);
        chapter.find('.chapter-content').remove;
        var chapterTitle = chapter.find('strong').text().trim();
        // console.log(chapterTitle);
        var videos = chapter.find('.video').children('li')

        var chapterData = {
            chapterTitle:chapterTitle,
            videos:[]
        }

       videos.each(function(item){
          var video = $(this);
          var videoTitle = video.find('.J-media-item').text().replace(/\s+/g,' ');
          // console.log(videoTitle);
          var id = video.find('.J-media-item').attr('href').split('video/')[1];

          chapterData.videos.push({
                title:videoTitle,
                id:id
          })
       })
        courseData.push(chapterData);
    })
    return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');
        item.videos.forEach(function(video){
            console.log('  【' + video.id + '】' + video.title + '\n');
        })
    })
}

function getPageAsync(url){
    return new Promise(function(resolve,reject){
        console.log("正在爬取...");
        http.get(url,function(res){
            var html = '';
            res.on('data',function(data){
                html += data;
            });
            res.on('end',function(){
                resolve(html);//把html作为这个Promise的值传给下一个Promise

                var courseData = filterChapters(html);
                printCourseInfo(courseData);
            });
        }).on('error',function(e){
            reject(e);
            console.log('获取数据出错！');
        });
    });
}

var fetchCourseArray = [];
videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})

Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var courseData = [];
        pages.forEach(function(html){
            var courseData = filterChapters(html);
            courseData.push(course);
        });
    });
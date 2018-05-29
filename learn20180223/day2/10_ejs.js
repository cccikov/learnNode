/**
 * 用法1：
 * var template = ejs.compile(str, options);
 * template(data);
 * 
 * 
 * 用法2：
 * ejs.render(str, data, options);
 *
 * 
 * 用法3：
 * ejs.renderFile(filename, data, options, function(err, str){
 * });
 */

var ejs = require("ejs");

var str =
`<% if (user) { %>
    <h2><%= user.name %></h2>
<% } %>`;
var data = {
    user: {
        name: "ccc",
        age: 18
    }
};
var options = {};

// 用法1
var template = ejs.compile(str, options);
var html1 = template(data);
console.log(html1);

// 用法2
var html2 = ejs.render(str, data, options);
console.log(html2);
//3.class 模块 这个模块需要teacher模块还有student模块
var student = require('./student.js'); //加载student模块 ./不能省略 要不就从根目录开始d:/learnNode/imooc/school/student
var teacher = require('./teacher');//加载teacher模块 .js可以省略

exports.add = function(teacherName,students){ // 可以用这种函数表达式写
	teacher.add(teacherName);

	students.forEach(function(item,index){
		student.add(item);
	});
}

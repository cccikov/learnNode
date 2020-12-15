/**
 * nodetree 以类似于Tree Command的树状格式列出目录的内容。
 */

// 命令行 npx nodetree threejs
// nodetree [-ad] [-L <level>] [--noreport] [--version] [--help] [--prune] [<directory> ...]
// nodetree -L 3 -d

var nodetree = require('nodetree');
console.log("当前Node.js进程执行时的工作目录:", process.cwd()) // 当前Node.js进程执行时的工作目录
nodetree("learn20180223", {
  all: false, // -a 打印所有文件。默认情况下，tree不打印隐藏文件（以点“.”开头的文件）
  directories: false, // -d 仅列出目录
  level: null, // -L 目录树的最大显示深度
  prune: false, // --prune 是否输出空目录
  noreport: false // --noreport 在树形列表的末尾省略了文件和目录报告的打印 "4 directories"
});


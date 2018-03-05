# 调试Node.js的工具

[英文原版地址](./inspector.md)
[英文原版网址](https://nodejs.org/en/docs/inspector/)
[英文原版github网址](https://github.com/nodejs/nodejs.org/blob/master/locale/en/docs/inspector.md)

许多工具和库可用于帮助您调试Node.js应用程序。其中一些列在下面。

要手动连接而不是使用工具，请传递 **--inspect** 标志并连接到打印的URL。

如果一个进程没有启动 `--inspect` ，用SIGUSR1发信号以激活调试器并打印连接URL。

---

## 检测工具 & 客户端

这些商业和开源工具使调试Node.js应用程序变得更加简单。

### [node-inspect](https://github.com/nodejs/node-inspect)

* 在<https://github.com/nodejs/node-inspect>开发CLI调试器.
* 与Node捆绑在一起并使用 `node inspect myscript.js`.
* 也可以独立安装 `npm install -g node-inspect`
  并用其调用 `node-inspect myscript.js`.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)

* **选项1**: Open `chrome://inspect`在基于Chromium的浏览器中打开。点击“打开专用的DevTools for Node”链接。
* **选项2**: 安装Chrome扩展程序 NIM(Node.js 调试管理工具):
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

### [VS Code](https://github.com/microsoft/vscode) 1.10+

* 在“调试”面板中，单击要打开的设置图标 `.vscode/launch.json`.
  选择“Node.js”进行初始设置。[设置文档](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)

### [Visual Studio](https://github.com/Microsoft/nodejstools)

* 从菜单中选择“调试>开始调试”或点击F5。
* [详细说明](https://github.com/Microsoft/nodejstools/wiki/Debugging).

---

## 命令行选项

下表列出了各种运行时 flags 对调试的影响:

<table cellpadding=0 cellspacing=0>
    <tr><th>Flag</th><th>Meaning</th></tr>
    <tr>
        <td>--inspect</td>
        <td>
        <ul>
            <li>启用检查代理</li>
            <li>听取默认地址和端口 (127.0.0.1:9229)</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>--inspect=<i>[host:port]</i></td>
        <td>
        <ul>
            <li>启用检查代理</li>
            <li>绑定到地址或主机名 <i>host</i> (default: 127.0.0.1)    </li>
            <li>监听端口 port <i>port</i> (default: 9229)</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>--inspect-brk</td>
        <td>
        <ul>
            <li>启用检查代理</li>
            <li>听取默认地址和端口 (127.0.0.1:9229)</li>
            <li>在用户代码开始之前中断</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td>--inspect-brk=<i>[host:port]</i></td>
        <td>
        <ul>
            <li>启用检查代理</li>
            <li>绑定到地址或主机名主机 <i>host</i> (default: 127.0.0.1)    </li>
            <li>监听端口 <i>port</i> (default: 9229)</li>
            <li>在用户代码开始之前中断</li>
        </ul>
        </td>
    </tr>
    <tr>
        <td><code>node inspect <i>script.js</i></code></td>
        <td>
        <ul>
        <li>在 --inspect flag 下产生子进程运行用户脚本;并使用主进程运行CLI调试器。</li>
        </ul>
        </td>
    </tr>
</table>


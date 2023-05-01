---
title: "解决 Clash for windows 端口为 0 导致无法使用"
categories: [ "技术" ]
tags: [ "clash" ]
draft: false
slug: "564"
date: "2021-08-30 09:58:33"
---

今天更新完 Windows 重启后发现上不了网了，检查 clash for windows 发现监听端口为 **0** 。

![https://imagehost-cdn.frytea.com/images/2021/08/30/20210830095030627b1fa801f19241.png](https://imagehost-cdn.frytea.com/images/2021/08/30/20210830095030627b1fa801f19241.png)

这就不正常了，检查了一下 `C:\Users\<username>\.config\clash\logs` 的日志，发现这行报错：

```perl
level=error msg="Start Mixed(http and socks) server error: listen tcp 127.0.0.1:7890: bind: An attempt was made to access a socket in a way forbidden by its access permissions."
```

貌似是端口无法被正常绑定，网上找了一下原因，发现遇到该问题的人不少，大致这样解决：

`CMD` 执行这行指令 `netsh int ipv4 show dynamicport tcp`  发现起始端口变成了1024。

管理员身份运行 CMD 执行这些命令：

```bash
# 这两条命令来自博客 https://blog.csdn.net/tian2342/article/details/108934646
netsh int ipv4 set dynamicport tcp start=49152 num=16383
确定。
netsh int ipv4 set dynamicport udp start=49152 num=16383
确定。

# 这条命令来自 https://github.com/Fndroid/clash_for_windows_pkg/issues/671
netsh int ipv4 set dynamic tcp start=49152 num=16384
```

然后检查结果

```bash
netsh int ipv4 show dynamicport tcp
```

端口正常后**重启计算机，恢复正常**。

## 参考文献

- [WIN10更新后端口显示为0的解决方法 #671](https://github.com/Fndroid/clash_for_windows_pkg/issues/671)
- [关于Windows端口没被占用提示An attempt was made to access a socket in a way forbidden by its access permissions](https://blog.csdn.net/tian2342/article/details/108934646)
- [Clash端口显示为0的解决方法](https://www.cnblogs.com/anyview/p/15056008.html)
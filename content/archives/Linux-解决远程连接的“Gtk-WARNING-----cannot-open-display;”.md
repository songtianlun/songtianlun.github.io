---
title: "Linux 解决远程连接的“Gtk-WARNING **: cannot open display;”"
categories: [ "技术" ]
tags: [ "linux" ]
draft: false
slug: "595"
date: "2021-11-08 18:43:30"
---

## 问题重现

在使用 libvirt 管理虚拟机时，有时会用到 virt-manager 提供的图形界面管理虚拟机，查看 vnc 输出等，但是常常会得到如下错误：

```bash
(virt-manager:25381): Gtk-WARNING **: 08:55:23.876: cannot open display:
```

## Linux 解决

如果是在 Linux 桌面环境，解决方法很简单，只需要这样连接远程服务器就可以了：

```bash
ssh -Y username@ip
```

使用 `-Y` 参数实际上是授权了 `X11` 转发，这样就可以看到来自远端的 gtk 图形窗口了。

```bash
$ man ssh
...
-Y      Enables trusted X11 forwarding.  Trusted X11 forwardings are not subjected to the X11 SECURITY extension controls.
...
```

如果您的操作系统设置为中文，远端连接过来也会继承这一配置，这时如果远端没有安装中文字库，就会出现乱码：

![https://imagehost-cdn.frytea.com/images/2021/11/05/image07addd92aee33b37.png](https://imagehost-cdn.frytea.com/images/2021/11/05/image07addd92aee33b37.png)

解决方法也很简单，只需使用以下命令，临时将远端服务器的语言配置为英文即可：

```bash
export LANG=en_US
```

再次打开窗口发现一切正常：

![https://imagehost-cdn.frytea.com/images/2021/11/05/2021-11-05-09-05-44df1374621cb605b6.png](https://imagehost-cdn.frytea.com/images/2021/11/05/2021-11-05-09-05-44df1374621cb605b6.png)

## Windows 解决

在 Windows 下不是每一个终端模拟器都支持 x11 转发，使用 [MobaXterm](https://mobaxterm.mobatek.net/) 直接可以连接，也可以使用 [Xming](https://sourceforge.net/projects/xming/?source=typ_redirect) 连接即可。

## 参考文献

- [轻松解决远程链接的“Gtk-WARNING **: cannot open display;”或“Cannot connect to display;”问题](https://blog.csdn.net/Rong_Toa/article/details/80365932)
- **[Ubuntu的中文乱码问题 [完美解决]](https://blog.csdn.net/weixin_39792252/article/details/80415550)**
---
title: "INOTIFY - 监听事件"
categories: [ "编程开发" ]
tags: [ "linux","inotify" ]
draft: false
slug: "626"
date: "2022-01-27 09:35:37"
---

Linux 2.6.13 内核中引入了新的文件系统变化通知机制 `inotify` ，使用该特性提供的用户态调用 api ，可以方便的完成文件变化监听。

各种语言基本都提供了对该接口的调用方法： `C` 不必多说， `Perl` 使用 `[Linux::Inotify2](https://metacpan.org/pod/Linux::Inotify2)` ， `Golang` 使用 `golang.org/x/sys/unix` ， `Python` 则使用 `[pyinotify](https://github.com/seb-m/pyinotify)` 即可完成调用。

这里汇总所有相关监听事件，理论上针对所有语言通用：

```bash
 *            IN_ACCESS         文件被访问
 *            IN_ATTRIB	        文件属性发生变化(文件元数据改变, 如权限, 链接计数, 扩展属性, 用户ID或组ID等)
 *            IN_CLOSE_WRITE	  关闭以write方式打开的文件
 *            IN_CLOSE_NOWRITE	关闭以非write方式打开的文件
 *            IN_CREATE	        在受监控目录内创建了文件/目录
 *            IN_DELETE	        在受监控目录内删除了文件/目录
 *            IN_DELETE_SELF  	被监测的文件/目录被删除
 *            IN_MODIFY	        文件被修改
 *            IN_MOVE_SELF	    移动受监测的文件或目录
 *            IN_MOVED_FROM	    文件移出被监测的目录
 *            IN_MOVED_TO	      文件移入被监测的目录
 *            IN_OPEN	          文件被打开
 * --------- 上述flag的集合
 *            IN_ALL_EVENTS	    以上所有flag的集合
 *            IN_MOVE	          IN_MOVED_TO + IN_MOVED_FROM
 *            IN_CLOSE	        IN_CLOSE_WRITE + IN_CLOSE_NOWRITE
 * --------- 不常用的flag
 *            IN_DONT_FOLLOW	  不对符号链接解引用, 监控符号链接自身
 *            IN_MASK_ADD	      将事件追加到pathname的当前监控掩码
 *            IN_ONESHOT	      只监测一个事件, 事件发生后, 被监控项会从监控列表中消失
 *            IN_ONLYDIR	      只监测目录
 *            IN_IGNORED	      监控项被内核或应用程序移除
 *            IN_ISDIR	        发生事件的是一个目录
 *            IN_Q_OVERFLOW	    Event队列溢出
 *            IN_UNMOUNT	      文件系统unmount
```

## 参考文献

- [Linux文件监控机制 inotify](https://blog.csdn.net/lis_12/article/details/88831638)
- [inotify原理与应用](http://www.freeoa.net/osuport/storagebak/inotify-principle-application_1621.html)
- [基于inotify实现配置文件热更新](https://segmentfault.com/a/1190000019545136)
- [seb-m](https://github.com/seb-m)/[pyinotify](https://github.com/seb-m/pyinotify) For Python
- [golang.org/x/sys/unix](https://pkg.go.dev/golang.org/x/sys/unix) For Golang
- [Linux::Inotify2](https://metacpan.org/pod/Linux::Inotify2) For Perl